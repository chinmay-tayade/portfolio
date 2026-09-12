export type WikiSection = { heading?: string; paragraphs?: string[]; list?: string[] };

export type WikiArticle = {
  slug: string;
  title: string;
  summary: string;
  order: number;
  sections: WikiSection[];
};

export const WIKI_ARTICLES: WikiArticle[] = [
  {
    slug: "what-is-android",
    title: "What is Android?",
    summary: "Not just an app framework — an OS, a runtime, and a set of platform services, all shipped together.",
    order: 1,
    sections: [
      {
        paragraphs: [
          "Android is a mobile operating system built on the Linux kernel, maintained by Google and the Android Open Source Project (AOSP). Calling it \"an app framework\" undersells it — Android is the full stack: a modified Linux kernel at the bottom, a set of native libraries and a runtime in the middle, and the Java/Kotlin application framework most engineers actually write code against on top.",
          "The reason this matters for an app developer: almost every Android quirk — why a Service can get killed, why permissions are enforced the way they are, why an app can't just read another app's files — traces back to a decision made at the OS layer, not the framework layer.",
        ],
      },
      {
        heading: "The four layers, top to bottom",
        paragraphs: [
          "Android is usually drawn as four layers. Each one exists because the layer above it needs something the layer below can't provide directly.",
        ],
        list: [
          "Applications — the apps themselves, system apps and third-party apps treated almost identically",
          "Application Framework — ActivityManager, PackageManager, WindowManager, ContentResolver — the APIs you actually call",
          "Native libraries + Android Runtime (ART) — libc (Bionic), SQLite, OpenGL, and the runtime that executes your compiled app code",
          "Linux kernel — process isolation, memory management, drivers, power management, and Binder IPC",
        ],
      },
      {
        heading: "Why this is one project, not a Linux distro with apps bolted on",
        paragraphs: [
          "A regular Linux desktop distro assumes a shared, mostly-trusting multi-user system. Android assumes every app is a stranger: no two apps trust each other by default, every app runs as its own Linux user ID, and inter-app communication happens through narrow, mediated channels (Binder, Content Providers) instead of shared memory or files. That single assumption — apps are mutually distrusting — shapes almost everything else on this page and the ones that follow.",
        ],
      },
    ],
  },
  {
    slug: "what-is-linux",
    title: "What is Linux?",
    summary: "The kernel Android is built on — and the handful of kernel concepts that actually matter for app engineers.",
    order: 2,
    sections: [
      {
        paragraphs: [
          "Linux is a kernel — the piece of software that talks directly to hardware and decides which process gets the CPU, which process can touch which memory, and which process is allowed to do what. It was written by Linus Torvalds starting in 1991 and today runs everything from servers to routers to, since 2008, phones.",
          "A kernel by itself isn't an operating system a person can use — Linux distros (Ubuntu, Debian, Android) add a userland (shells, libraries, apps) on top. Android's userland looks almost nothing like a desktop Linux distro's, but the kernel underneath is recognizably the same Linux kernel, patched for mobile.",
        ],
      },
      {
        heading: "The kernel concepts that explain Android behavior",
        paragraphs: ["Four Linux primitives, specifically, are worth understanding because Android's app model is built directly on top of them:"],
        list: [
          "Processes and UIDs — every process runs as some user ID, and the kernel enforces what that UID can access. Android gives every app its own UID, so kernel-level file permissions are the actual sandbox boundary between apps.",
          "Permissions on files and resources — the classic Unix read/write/execute model. Android's runtime permission dialogs are a userland layer on top of this; the kernel-level enforcement is what makes the sandbox non-optional even if the userland layer had a bug.",
          "Signals and process lifecycle — SIGKILL, SIGSTOP, fork/exec. Android's app process model (see the next article) is built by forking a template process rather than starting each app from a cold JVM.",
          "Drivers and the HAL boundary — camera, radio, GPU, sensors — vendor code lives below a stable interface (the Hardware Abstraction Layer) so a kernel/driver update doesn't require every app to be recompiled.",
        ],
      },
    ],
  },
  {
    slug: "android-on-linux",
    title: "How Android was built on Linux",
    summary: "Same kernel, almost nothing else the same — Bionic instead of glibc, Binder instead of pipes, ART instead of a JVM.",
    order: 3,
    sections: [
      {
        paragraphs: [
          "Google didn't write a new kernel for Android — it patched Linux. But almost everything Linux normally ships with above the kernel was replaced, because a phone in 2008 had a fraction of a desktop's memory and battery, and because Android needed the mutual-distrust security model described in the first article.",
        ],
      },
      {
        heading: "What Android replaced or added on top of stock Linux",
        list: [
          "Bionic instead of glibc — a smaller, faster C library, because glibc was too large and (at the time) too GPL-licensed for Google's needs",
          "Binder IPC — a kernel driver Google wrote specifically for Android, giving processes a fast, security-checked way to call into each other. Almost every cross-app and cross-process call on Android — startActivity, a ContentProvider query, a system service call — is Binder underneath.",
          "The Low Memory Killer (and later, in-kernel memory-pressure signals) — a phone can't swap to disk the way a server does, so the kernel needed a way to kill background processes under memory pressure before the system stalls",
          "Wakelocks — a mechanism for a process to tell the kernel \"don't let the CPU sleep right now\" and, just as importantly, a mechanism for the system to yank a wakelock back if an app misbehaves and drains the battery",
          "No traditional init/systemd — Android's init is a much smaller Android-specific process that parses .rc files and starts the small number of native daemons Android actually needs (zygote, servicemanager, surfaceflinger) before Java code ever runs",
        ],
      },
      {
        heading: "Why this is worth knowing as an app engineer",
        paragraphs: [
          "Every one of these isn't trivia — it's the reason for a real, everyday Android behavior. Binder's per-call security check is why permissions can be enforced even across process boundaries. The Low Memory Killer is why a Service you didn't mark as foreground can vanish without warning. Wakelocks are why an app that forgets to release one gets flagged in battery stats — the OS is designed to assume apps will misbehave and to contain the damage when they do.",
        ],
      },
    ],
  },
  {
    slug: "how-android-is-built",
    title: "How Android is built",
    summary: "From kernel source to a signed system image — what AOSP's build actually produces.",
    order: 4,
    sections: [
      {
        paragraphs: [
          "\"Building Android\" doesn't mean compiling one app — it means producing a full system image: kernel, native daemons, system server, framework classes, and the pre-installed apps, all packaged into partitions a device can boot from.",
        ],
      },
      {
        heading: "The pieces that get assembled",
        list: [
          "Kernel — built separately (often by the SoC vendor), producing the boot image's kernel + ramdisk",
          "HAL + native daemons — vendor-specific code implementing Android's hardware interfaces, packaged into the vendor partition so it can update on its own cadence from the OS itself",
          "AOSP platform source — the Soong/Make-based build (migrating to Bazel) compiles the framework, system server, and core services into the system partition",
          "ART pre-compilation — as much of the framework and system apps as possible is ahead-of-time compiled to native code at build time, so the device doesn't have to interpret bytecode for its own OS on every boot",
          "Signing — every partition image is signed; a device with Verified Boot refuses to boot an image whose signature doesn't chain back to a trusted key",
        ],
      },
      {
        heading: "Where a normal Android app build fits into this",
        paragraphs: [
          "An app built in Android Studio never touches any of the above — Gradle compiles Kotlin/Java to DEX bytecode, packages it with resources into an APK (or an AAB for the Play Store, which the Store then splits into per-device APKs), and signs it with the developer's own key, not a platform key. The app then runs inside the system image described above, but as a guest — sandboxed the same way as every other app, with no more platform trust than that.",
        ],
      },
    ],
  },
  {
    slug: "app-launch-sequence",
    title: "How an Android app launches",
    summary: "Tap the icon to first frame: Zygote, the fork, ActivityThread, and the handful of lifecycle calls in between.",
    order: 5,
    sections: [
      {
        paragraphs: [
          "Starting a JVM-like process from scratch for every app launch would be too slow for a phone. Android's answer is Zygote: a process that starts at boot, pre-loads the framework classes and resources every app will need, and then just forks a copy of itself per app launch — a fork is fast; a cold interpreter start is not.",
        ],
      },
      {
        heading: "The sequence, step by step",
        list: [
          "1. Tap — the Launcher calls startActivity(), which is a Binder call into the system server's ActivityTaskManager, not a local function call",
          "2. Process lookup — the system server checks whether the target app's process already exists; if it does, launch skips straight to step 5",
          "3. Zygote fork — if the process doesn't exist, the system server asks Zygote to fork a new process. The child inherits Zygote's pre-loaded classes copy-on-write, so it starts with a warm framework instead of a cold one",
          "4. ActivityThread.main() — the forked process's entry point. It sets up the app's main Looper/Handler (the thread every UI callback on Android actually runs on) and binds to the system server over Binder",
          "5. Application.onCreate() — the app's Application subclass is instantiated and its onCreate() runs once per process, before any Activity exists",
          "6. Activity created — the target Activity is instantiated and moved through onCreate -> onStart -> onResume, at which point it's the one visible, interactive screen",
          "7. First frame — the Activity's View hierarchy is measured, laid out, and drawn; the frame is handed to SurfaceFlinger for compositing, and only then does the user actually see anything",
        ],
      },
      {
        heading: "Why \"cold start\" and \"warm start\" mean different things",
        paragraphs: [
          "A cold start runs the full sequence above, including the Zygote fork and a fresh Application.onCreate(). A warm start reuses an existing process (step 2 finds it already running) and skips straight to recreating the Activity. This is exactly what android-perf-lab's Baseline Profile and Macrobenchmark setup measures — and why a cold-start number is only meaningful if it says which of these two paths it measured.",
        ],
      },
    ],
  },
];

export function getWikiArticle(slug: string): WikiArticle | undefined {
  return WIKI_ARTICLES.find((a) => a.slug === slug);
}

export function orderedWiki(): WikiArticle[] {
  return [...WIKI_ARTICLES].sort((a, b) => a.order - b.order);
}
