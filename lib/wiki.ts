export type WikiSection = { heading?: string; paragraphs?: string[]; list?: string[] };

export type WikiResourceKind = "repo" | "learn" | "wiki" | "external";

export type WikiResource = {
  label: string;
  href: string;
  kind: WikiResourceKind;
  note?: string;
};

export type WikiGroup = "foundations" | "learning-path";

export type WikiArticle = {
  slug: string;
  title: string;
  summary: string;
  order: number;
  emoji: string;
  group: WikiGroup;
  readingMinutes: number;
  concepts?: string[];
  sections: WikiSection[];
  resources?: WikiResource[];
};

export const WIKI_GROUPS: { id: WikiGroup; label: string; blurb: string }[] = [
  {
    id: "foundations",
    label: "Foundations",
    blurb: "How Android actually works under the hood — the OS, the kernel, and how an app comes to life.",
  },
  {
    id: "learning-path",
    label: "The learning path",
    blurb: "The hands-on topics every Android engineer learns, each backed by a runnable repo.",
  },
];

export const WIKI_ARTICLES: WikiArticle[] = [
  {
    slug: "what-is-android",
    title: "What is Android?",
    summary: "Not just an app framework — an OS, a runtime, and a set of platform services, all shipped together.",
    order: 1,
    emoji: "🤖",
    group: "foundations",
    readingMinutes: 4,
    concepts: ["AOSP", "Linux kernel", "ART", "Binder IPC", "app sandbox"],
    resources: [
      { label: "AOSP source", href: "https://source.android.com/", kind: "external" },
      { label: "Platform architecture", href: "https://developer.android.com/guide/platform", kind: "external", note: "Google's own four-layer diagram" },
    ],
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
    emoji: "🐧",
    group: "foundations",
    readingMinutes: 4,
    concepts: ["kernel", "process & UID", "file permissions", "signals", "HAL"],
    resources: [
      { label: "The Linux kernel", href: "https://www.kernel.org/", kind: "external" },
    ],
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
    emoji: "🧩",
    group: "foundations",
    readingMinutes: 5,
    concepts: ["Bionic", "Binder", "Low Memory Killer", "wakelocks", "init"],
    resources: [
      { label: "Binder IPC overview", href: "https://source.android.com/docs/core/architecture/hidl/binder-ipc", kind: "external" },
    ],
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
    emoji: "🏗️",
    group: "foundations",
    readingMinutes: 4,
    concepts: ["AOSP", "Soong / Bazel", "DEX bytecode", "APK / AAB", "Verified Boot"],
    resources: [
      { label: "Building Android", href: "https://source.android.com/docs/setup/build/building", kind: "external" },
    ],
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
    emoji: "🚀",
    group: "foundations",
    readingMinutes: 5,
    concepts: ["Zygote", "fork", "ActivityThread", "main Looper", "cold vs warm start"],
    resources: [
      { label: "App startup time", href: "https://developer.android.com/topic/performance/vitals/launch-time", kind: "external", note: "cold / warm / hot start definitions" },
    ],
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
  {
    slug: "kotlin-coroutines",
    title: "Kotlin Coroutines",
    summary: "Lightweight threads that make async code read top-to-bottom — and the structured-concurrency rules that keep them from leaking.",
    order: 6,
    emoji: "🌀",
    group: "learning-path",
    readingMinutes: 7,
    concepts: ["suspend", "launch vs async", "dispatchers", "structured concurrency", "cooperative cancellation"],
    resources: [
      { label: "Learn-Kotlin-Coroutines", href: "/projects/Learn-Kotlin-Coroutines", kind: "repo", note: "11 runnable examples" },
      { label: "Interactive topic + diagrams", href: "/learn/kotlin-coroutines", kind: "learn" },
      { label: "Official coroutines guide", href: "https://kotlinlang.org/docs/coroutines-guide.html", kind: "external" },
    ],
    sections: [
      {
        paragraphs: [
          "A coroutine is Kotlin's answer to a problem that predates Kotlin: asynchronous work — a network call, a disk read, a timer — doesn't fit the synchronous, \"do this, then this\" shape that most code is written in. The old ways to cope were callbacks (nested, error-prone) and threads (heavy, expensive to spin up, dangerous to coordinate). Coroutines are a third way: a block of code that can pause at a suspension point and resume later, without holding a thread hostage while it waits.",
          "The mental model to hold onto: a coroutine is not a thread. It's a lightweight unit of work that runs on a thread, can be moved between threads, and — critically — can suspend, freeing the thread it was on to run something else. You can have thousands of coroutines running on a handful of threads, where thousands of threads would collapse under their own memory and scheduling weight.",
        ],
      },
      {
        heading: "suspend functions are the whole trick",
        paragraphs: [
          "The entire coroutine mechanism reduces to one keyword: `suspend`. A suspend function is an ordinary function that happens to be allowed to pause. When it pauses, it doesn't block the thread — it yields control back so the thread can run other coroutines, and it carries a hidden continuation that remembers where it paused and what its local variables were.",
        ],
        list: [
          "A suspend function can only be called from another suspend function or from a coroutine builder — the compiler enforces this, which is why async code can't silently infect synchronous code",
          "`launch` fires a coroutine and forgets it (fire-and-forget); `async` fires one and hands back a `Deferred` you can `await` to get a result",
          "`withContext(Dispatchers.IO)` switches the thread a block runs on and switches back when it returns — this is how you move slow work off the main thread",
          "A suspend function that does blocking work is still blocking its thread — suspending only helps when the thing you're waiting on cooperates",
        ],
      },
      {
        heading: "Structured concurrency: the tree that owns your work",
        paragraphs: [
          "The single most important idea in coroutines is that work is organised as a tree. Every coroutine has a parent, and the parent's scope owns the lifetime of its children. When a scope is cancelled, every coroutine in it is cancelled; when a child throws, its siblings and parent learn about it. There is no such thing as a fire-and-forget coroutine that leaks past the thing that created it — that's the point.",
        ],
        list: [
          "Cancellation is cooperative: a coroutine checks a cancellation flag at every suspension point. A coroutine stuck in a tight non-suspending loop will not be cancelled until it suspends — which is why long CPU loops must call `yield()` or `ensureActive()`",
          "`coroutineScope` fails fast: if one child throws, the whole scope cancels and the exception propagates. `supervisorScope` isolates children — one failing child doesn't take down its siblings",
          "A `Job` is the handle to a coroutine's lifecycle; a `CoroutineContext` is the bundle of `Job` + `Dispatcher` (and any other elements) every coroutine carries",
          "Exception handling is deliberate: an uncaught exception in a root `launch` goes to a `CoroutineExceptionHandler` (or crashes the app); inside `async`, it surfaces at `await()` instead",
        ],
      },
      {
        heading: "Dispatchers and scopes: where, and for how long",
        paragraphs: [
          "A `Dispatcher` decides which thread a coroutine runs on; a `Scope` decides when the whole tree of coroutines gets torn down. Mixing the two up is where most coroutine bugs come from.",
        ],
        list: [
          "`Dispatchers.Main` — the UI thread, where you touch views and where state that drives the UI must be mutated",
          "`Dispatchers.IO` — a shared pool tuned for blocking I/O (network, disk); use it for anything that waits on the outside world",
          "`Dispatchers.Default` — CPU-bound work, sized to the number of cores",
          "`viewModelScope` / `lifecycleScope` — scopes tied to a screen's lifetime. The ViewModel is destroyed on rotation or when the screen closes, and the scope auto-cancels every coroutine it launched — this is what stops a network call from updating a dead screen",
          "`GlobalScope` is the escape hatch that leaks work past its owner — it exists, and you almost never want it",
        ],
      },
    ],
  },
  {
    slug: "kotlin-flow",
    title: "Kotlin Flow",
    summary: "Reactive streams on top of coroutines — how a stream of values is produced, transformed, and collected, and what 'cold' actually means.",
    order: 7,
    emoji: "🌊",
    group: "learning-path",
    readingMinutes: 7,
    concepts: ["cold flow", "builders & operators", "StateFlow / SharedFlow", "backpressure", "terminal operators"],
    resources: [
      { label: "Learn-Kotlin-Flow", href: "/projects/Learn-Kotlin-Flow", kind: "repo", note: "17 runnable examples" },
      { label: "Interactive topic + diagrams", href: "/learn/kotlin-flow", kind: "learn" },
      { label: "Official Flow guide", href: "https://kotlinlang.org/docs/flow.html", kind: "external" },
    ],
    sections: [
      {
        paragraphs: [
          "If a coroutine answers \"run this work,\" a Flow answers \"stream this data.\" A coroutine produces one result (or none, or throws); a Flow produces a sequence of values over time — a live database query, a progress tick, a search box that emits as the user types. Flow is Kotlin's reactive-streams library, rebuilt on the coroutine machinery you already know, so it inherits cancellation and structured concurrency for free.",
        ],
      },
      {
        heading: "The three parts of every Flow",
        paragraphs: ["Every Flow is the same three pieces wired together. Understand these and every operator is just an instance of one of them:"],
        list: [
          "A builder produces values — `flow { emit(x) }` for imperative logic, `flowOf(1, 2, 3)` for a fixed set, `asFlow()` to lift a collection, `callbackFlow` to bridge a callback API that doesn't know about suspend",
          "Operators transform the stream between builder and collector — `map`, `filter`, `flatMapLatest`, `debounce`, `zip`, `retry`. Operators are themselves just flows that collect the upstream and emit downstream",
          "A terminal operator collects — `collect { }`, `toList()`, `first()`, `reduce()`. Nothing runs until a terminal operator subscribes",
        ],
      },
      {
        heading: "Cold vs hot: why nothing happens until you collect",
        paragraphs: [
          "A `flow { }` is cold: the block inside doesn't run when you build the flow, only when something collects it — and it runs once per collector. This is the property that makes Flow easy to reason about: no values are being produced in the background unless a consumer is actually listening.",
        ],
        list: [
          "Cold flow — the producer starts fresh for each collector, so two collectors get two independent runs (and two independent network calls, if the flow does one)",
          "`StateFlow` and `SharedFlow` are hot — they emit whether or not anyone is collecting, and late collectors see only the latest value, not a replay of history",
          "`StateFlow` is the hot flow for UI state: it holds one value, conflates rapid updates, and always has a current value. A ViewModel exposes `StateFlow<UiState>` and the UI collects it",
          "Backpressure is the default: a slow collector makes the producer wait. Use `buffer`, `conflate`, or `collectLatest` to say explicitly how you want to handle a producer that outpaces the collector",
        ],
      },
      {
        heading: "Operators you'll actually reach for",
        paragraphs: ["Flow ships a large operator set; a small handful covers almost everything real apps need, and they map cleanly onto the async problems of an Android app:"],
        list: [
          "`map` / `filter` — transform and filter each value (the same shape as collections, which is the point)",
          "`zip` — combine two flows pairwise; the standard way to run two independent network calls in parallel and act when both return",
          "`flatMapConcat` / `flatMapLatest` — flatten a flow-of-flows: concat runs them in series, latest cancels the previous when a new value arrives (the engine behind instant search)",
          "`debounce` + `distinctUntilChanged` — wait for a pause in input, then drop consecutive duplicates; together with `flatMapLatest` this is the entire \"search as you type\" recipe",
          "`catch` — intercept an upstream exception and emit a fallback instead of letting it propagate",
          "`retry` / `retryWhen` — re-subscribe to the upstream on failure, with optional exponential backoff",
          "`onCompletion` — run cleanup or a final side effect whether the flow completes normally or with an error",
        ],
      },
      {
        heading: "Why Flow over RxJava (and when not to bother)",
        paragraphs: [
          "RxJava has its own scheduler, its own cancellation model, and its own concept of a stream — a whole parallel universe layered on top of Kotlin. Flow deliberately reuses coroutines for all of that, so a Flow is cancelled the same way a coroutine is, run on the same dispatchers, and understood by the same tools. For greenfield Kotlin, that cohesion is the entire argument. The counter-argument: if a codebase already commits to RxJava's ecosystem (composed operators, a specific scheduler model, a large operator surface), ripping it out is a cost with no immediate payoff — Flow isn't strictly more capable, just more native.",
        ],
      },
    ],
  },
  {
    slug: "mvvm-architecture",
    title: "MVVM Architecture",
    summary: "Unidirectional data flow in a UI — why the View never talks to the data layer, and what the ViewModel actually is.",
    order: 8,
    emoji: "🏛️",
    group: "learning-path",
    readingMinutes: 6,
    concepts: ["ViewModel", "UiState", "repository", "unidirectional flow", "dependency injection"],
    resources: [
      { label: "MVVM-Architecture-Android", href: "/projects/MVVM-Architecture-Android", kind: "repo", note: "full Dagger + Retrofit sample" },
      { label: "Interactive topic + diagrams", href: "/learn/mvvm-architecture", kind: "learn" },
      { label: "App architecture guide", href: "https://developer.android.com/topic/architecture", kind: "external" },
    ],
    sections: [
      {
        paragraphs: [
          "MVVM — Model-View-ViewModel — is a way of structuring a screen so that the rules of the UI are testable without a device, and the View is reduced to rendering. It's one of a family of \"the View is dumb, the logic lives somewhere else\" patterns (MVP, MVI, MVVM) that all solve the same problem: if the interesting logic lives inside an Activity or Fragment, it can't be tested except on an emulator, and it entangles business rules with Android framework code.",
        ],
      },
      {
        heading: "The unidirectional data flow rule",
        paragraphs: [
          "The core discipline of MVVM is one direction of travel. The View (Activity/Fragment/Composable) observes state and dispatches events; it never reaches past the ViewModel to touch the data layer. The ViewModel holds all screen state and translates events into changes to that state. The data layer (repositories, network, database) is another step removed, behind the ViewModel.",
        ],
        list: [
          "View → ViewModel: user intent, expressed as method calls or events (\"user tapped refresh\")",
          "ViewModel → View: immutable state, exposed as a `StateFlow<UiState>` (or LiveData in older code) the View collects",
          "ViewModel → Model: calls into a repository, which hides where data actually comes from",
          "The View never constructs or calls the Model directly — that single rule is what keeps the layers from collapsing into a ball of mud",
        ],
      },
      {
        heading: "What the ViewModel actually is",
        paragraphs: [
          "Despite the name, a ViewModel is not a model and it isn't a view. It's a screen's state holder: it owns the screen's state, survives configuration changes (like rotation) because the framework holds it across Activity recreation, and dies when the screen is truly finished. Its real value is that it has no Android View dependency — it can be unit-tested on the JVM with fake data sources, which is why \"move logic to the ViewModel\" is the most profitable refactor in Android.",
        ],
        list: [
          "Survives rotation — the ViewModel is scoped to the ViewModelStore, which outlives the Activity, so a rotated screen re-binds to the same state instead of refetching it",
          "No View reference — it never holds a Context or View, only state and dependencies, which is what makes it testable",
          "Exposes a single `UiState` — a sealed class (`Loading` / `Success` / `Error`) so the UI can't render a state the data can't actually be in",
          "Runs work in a coroutine scope (`viewModelScope`) that's auto-cancelled when the ViewModel is cleared, so no orphaned work updates a dead screen",
        ],
      },
      {
        heading: "Where dependency injection fits",
        paragraphs: [
          "MVVM says the ViewModel needs a repository; it doesn't say how it gets one. Dependency injection (Dagger, Hilt, Koin, or manual wiring) is what constructs the object graph — the ViewModel is given its repository rather than instantiating it. This is not decorative: a ViewModel that constructs its own repository can't be given a fake in a test, which guts the reason MVVM exists. DI and MVVM are a matched pair.",
        ],
      },
      {
        heading: "MVVM vs MVI vs MVP, in one breath",
        list: [
          "MVP — the View exposes an interface the Presenter drives; the View is passive but the interface tends to grow huge",
          "MVVM — the View observes state; the ViewModel exposes it; two-way data binding optional",
          "MVI — a stricter MVVM: a single immutable state, and events reduced through a pure function, so state changes are a deterministic `(state, event) -> state` — the most testable, and the most ceremony",
          "They're points on a spectrum of \"how much of the screen is a pure function\"; MVVM is the pragmatic middle that most production Android lands on",
        ],
      },
    ],
  },
  {
    slug: "android-roadmap",
    title: "The Android Engineer Roadmap",
    summary: "The dependency-ordered map of everything an Android engineer learns — and why the order matters more than the topics.",
    order: 9,
    emoji: "🗺️",
    group: "learning-path",
    readingMinutes: 6,
    concepts: ["foundation", "lifecycle", "concurrency", "architecture", "release"],
    resources: [
      { label: "android-developer-roadmap", href: "/projects/android-developer-roadmap", kind: "repo" },
      { label: "Interactive roadmap", href: "/learn/android-roadmap", kind: "learn" },
    ],
    sections: [
      {
        paragraphs: [
          "Most \"roadmaps\" for Android are a flat list of keywords: Kotlin, Compose, Coroutines, Room, Retrofit, MVVM. A flat list hides the thing that actually matters — that these topics have an order, and learning them out of order is why most people stall. You can't understand a `ViewModel` before you understand the `Activity` lifecycle it survives. You can't understand `Coroutines` before you understand what a thread is and why blocking the main one is bad. The roadmap's value is the arrows, not the boxes.",
        ],
      },
      {
        heading: "The stages, in dependency order",
        list: [
          "1 · Foundation — Java and Kotlin, and Android Studio. The language and the tool; everything else is written in and built with these",
          "2 · Core concepts — Activity, Service, BroadcastReceiver, ContentProvider, Intents, and the Activity lifecycle. This is how an Android app is *shaped*, before you ever draw a pixel",
          "3 · UI — Views/ViewGroups, RecyclerView, Fragments, and (later) Compose. How pixels get on screen and how lists stay smooth",
          "4 · Persistence — SharedPreferences, DataStore, Room, files. How data survives process death",
          "5 · Threading & concurrency — threads, then Coroutines, then Flow, then WorkManager. The #1 crash source and the #1 interview topic",
          "6 · Networking — OkHttp, Retrofit, JSON, OAuth, status codes. Talking to the outside world reliably",
          "7 · Architecture — MVVM/MVI, dependency injection, Clean Architecture. How code stays maintainable as it scales",
          "8 · Testing & quality — unit vs instrumentation tests, debugging, memory leaks. Code you can trust tomorrow",
          "9 · Advanced & release — Compose, Firebase, security, signing, the Play Store. The final mile to production",
        ],
      },
      {
        heading: "Why order beats completeness",
        paragraphs: [
          "A roadmap that lists a hundred topics in no particular order produces engineers who know the names of things but not the relationships between them — who can write a `when` expression but not explain why a `Service` got killed. The fix is to treat each stage as a prerequisite: you are never asked to understand something that assumes a topic you haven't reached yet. That's what makes the path survivable and, more importantly, what makes each new stage feel like an unlock rather than a fresh wall.",
        ],
      },
      {
        heading: "How to actually use it",
        list: [
          "Work top-to-bottom; don't skip ahead — stage N is the foundation for stage N+1, and a gap at stage 3 will quietly destabilise you at stage 7",
          "Revisit a stage when you hit a wall later — the wall is usually a prerequisite you glossed over, not the current topic",
          "Each stage has a small, runnable example associated with it (the repos in this collection map one-to-one onto stages 1–7), so 'learn it' always means 'build and run something'",
          "Measure progress by what you can build, not by how many checkboxes are ticked",
        ],
      },
    ],
  },
  {
    slug: "java-to-kotlin",
    title: "From Java to Kotlin",
    summary: "The migration isn't memorising new syntax — it's unlearning boilerplate, and letting null-safety remove a whole class of bugs.",
    order: 10,
    emoji: "☕",
    group: "learning-path",
    readingMinutes: 5,
    concepts: ["data class", "null-safety", "when", "extension functions", "smart casts"],
    resources: [
      { label: "from-java-to-kotlin", href: "/projects/from-java-to-kotlin", kind: "repo", note: "the full side-by-side cheat sheet" },
      { label: "Interactive cheat sheet", href: "/learn/java-to-kotlin", kind: "learn" },
      { label: "Official Kotlin docs", href: "https://kotlinlang.org/docs/home.html", kind: "external" },
    ],
    sections: [
      {
        paragraphs: [
          "Moving from Java to Kotlin is frequently framed as \"learn the new syntax,\" which gets it backwards. The syntax is the easy part. The actual migration is unlearning the habits Java forced on you — the getters and setters, the null checks everywhere, the anonymous inner classes — and learning to trust a language that lets you write the intent in one line instead of thirty. Every Java → Kotlin pairing on the cheat sheet is really the same lesson: Kotlin took a pattern you typed out of habit and made it a language feature.",
        ],
      },
      {
        heading: "Null-safety is the headline feature",
        paragraphs: [
          "The single biggest, and the one that genuinely changes how you design. In Java, `null` is a silent landmine — any reference can be null, so you either check everywhere or crash sometimes. Kotlin makes null an opt-in: a type is non-null by default, and only a type marked `String?` can hold null. The compiler then forces you to handle nullability before you can use the value.",
        ],
        list: [
          "`val` vs `var` — read-only vs mutable, and read-only is the default you should reach for",
          "`?` on a type — declares nullability explicitly; the compiler now knows what to check",
          "`?.` safe call, `?:` Elvis operator — the two operators that replace entire `if (x != null)` forests",
          "`!!` — the explicit \"I know better\" that throws if it's null; treat every `!!` in a codebase as a suspect, because it's a NPE you chose",
          "The pay-off: whole classes of NPE crashes become impossible to write, not merely \"caught in review\"",
        ],
      },
      {
        heading: "The migrations that actually matter",
        paragraphs: ["Not every Java construct has a dramatic Kotlin equivalent — but the ones that do are worth learning first, because they're where the productivity comes from:"],
        list: [
          "A full POJO (getters, setters, equals, hashCode, toString) → a `data class` on one line. This is the single biggest win in the language",
          "`switch` → `when`, which is an expression that returns a value and needs no `break`",
          "Static utility methods → extension functions, so you can add `fun Int.triple()` and call `3.triple()` instead of `Utils.triple(3)`",
          "`instanceof` + cast → `is` + smart cast, where the compiler already knows the type inside the block",
          "Anonymous inner classes → object expressions / lambdas; boilerplate ceremony collapses into `it ->`",
          "The ternary `? :` → `if` as an expression, or the Elvis `?:` for the null-default case",
        ],
      },
      {
        heading: "The mindset shift, not the syntax shift",
        paragraphs: [
          "The real transition isn't learning that `data class` exists — it's learning to *expect* that the thing you're about to type 30 lines of has a one-line form. New Kotlin developers translate Java line-by-line and produce Kotlin that looks like Java with shorter keywords; the moment they get it is when they start reaching for the construct that expresses the intent, and the boilerplate disappears on its own. The language is opinionated on purpose: it wants you to write less, and to write code where the bugs you'd normally write can't be written.",
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

export function wikiByGroup(group: WikiGroup): WikiArticle[] {
  return orderedWiki().filter((a) => a.group === group);
}

// The headings an article actually renders, in order — feeds the table of contents.
export function articleHeadings(article: WikiArticle): { id: string; label: string }[] {
  const out: { id: string; label: string }[] = [];
  article.sections.forEach((s, i) => {
    if (s.heading) out.push({ id: `section-${i}`, label: s.heading });
  });
  return out;
}
