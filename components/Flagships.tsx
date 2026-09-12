import { FLAGSHIPS } from "@/lib/featured";
import Section from "@/components/Section";

export default function Flagships() {
  return (
    <Section
      id="flagship"
      eyebrow="Selected work"
      title="Four builds worth a closer look."
      intro="All original, all with tests and CI — the rest of the 25 repos are further down the page."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {FLAGSHIPS.map((f) => (
          <a
            key={f.slug}
            href={`https://github.com/chinmay-tayade/${f.slug}`}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col border border-line bg-bg-raised transition-colors hover:border-accent-dim"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="font-mono text-sm text-text">{f.title}</span>
              <span
                className={`border px-1.5 py-0.5 font-mono text-[10px] tracking-wider uppercase ${
                  f.status === "shipped" ? "tag-shipped" : "tag-wip"
                }`}
              >
                {f.status === "shipped" ? "shipped" : "in progress"}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 px-4 py-4">
              <p className="font-mono text-xs text-text-dim">{f.tagline}</p>
              <p className="text-sm leading-relaxed text-text-dim">
                {f.summary}
              </p>
              <p className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-2 font-mono text-xs text-text-faint">
                {f.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </p>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
