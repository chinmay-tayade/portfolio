import Link from "next/link";

type StageLink = { label: string; href: string };

type Stage = {
  n: number;
  title: string;
  detail: string;
  links?: StageLink[];
};

const STAGES: Stage[] = [
  {
    n: 1,
    title: "Foundation",
    detail: "Java, Kotlin, Android Studio — the language and the tool.",
    links: [{ label: "Java → Kotlin cheat sheet", href: "/projects/from-java-to-kotlin" }],
  },
  {
    n: 2,
    title: "Core concepts",
    detail: "Components, Intents, and the Activity lifecycle.",
    links: [{ label: "How an app launches", href: "/wiki/app-launch-sequence" }],
  },
  {
    n: 3,
    title: "User interface",
    detail: "Views, ViewGroups, RecyclerView, Fragments.",
  },
  {
    n: 4,
    title: "Persistence",
    detail: "SharedPreferences, DataStore, Room, files.",
  },
  {
    n: 5,
    title: "Threading & concurrency",
    detail: "Threads, then Coroutines, then Flow, then WorkManager.",
    links: [
      { label: "Learn Coroutines", href: "/projects/Learn-Kotlin-Coroutines" },
      { label: "Learn Flow", href: "/projects/Learn-Kotlin-Flow" },
    ],
  },
  {
    n: 6,
    title: "Networking",
    detail: "OkHttp, Retrofit, JSON, OAuth, status codes.",
  },
  {
    n: 7,
    title: "Architecture",
    detail: "MVVM / MVI, dependency injection, Clean Architecture.",
    links: [{ label: "MVVM sample app", href: "/projects/MVVM-Architecture-Android" }],
  },
  {
    n: 8,
    title: "Testing & quality",
    detail: "Unit and instrumentation tests, debugging, memory.",
  },
  {
    n: 9,
    title: "Advanced & release",
    detail: "Compose, Firebase, security, signing, the Play Store.",
  },
];

export default function RoadmapStages() {
  return (
    <ol className="relative flex flex-col">
      {STAGES.map((s, i) => (
        <li key={s.n} className="relative flex gap-4 pb-6 last:pb-0">
          {i < STAGES.length - 1 && (
            <span
              aria-hidden
              className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px bg-line"
            />
          )}
          <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center border border-accent-dim bg-bg font-mono text-xs text-accent">
            {s.n}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5 border border-line bg-bg-raised px-4 py-3 transition-colors hover:border-accent-dim">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <span className="font-mono text-sm text-text">{s.title}</span>
              {s.links && (
                <span className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
                  {s.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="text-accent-light underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                    >
                      {l.label} →
                    </Link>
                  ))}
                </span>
              )}
            </div>
            <p className="text-sm leading-relaxed text-text-dim">{s.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
