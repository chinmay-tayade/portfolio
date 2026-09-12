const GROUPS: { label: string; items: string[] }[] = [
  {
    label: "core",
    items: ["Kotlin", "Jetpack Compose", "Kotlin Multiplatform", "Swift / SwiftUI"],
  },
  {
    label: "also ship",
    items: ["Flutter", "React Native", "TypeScript"],
  },
  {
    label: "data & sync",
    items: ["Coroutines / Flow", "Room", "SQLDelight", "WorkManager", "Ktor", "Retrofit"],
  },
  {
    label: "di & testing",
    items: ["Hilt", "Koin", "JUnit", "MockK", "Turbine"],
  },
  {
    label: "under the hood",
    items: ["Gradle convention plugins", "Baseline Profiles", "Macrobenchmark", "GitHub Actions", "Firebase"],
  },
];

export default function Toolbox() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-14">
      <h2 className="font-mono text-sm text-text-dim">Toolbox</h2>

      <dl className="mt-6 flex flex-col gap-4">
        {GROUPS.map((g) => (
          <div key={g.label} className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <dt className="shrink-0 font-mono text-xs text-text-faint sm:w-32">
              {g.label}
            </dt>
            <dd className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-text-dim">
              {g.items.map((item) => (
                <span key={item} className="transition-colors hover:text-accent">
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
