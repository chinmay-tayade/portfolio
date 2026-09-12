import { FLAGSHIPS } from "@/lib/featured";
import SectionLabel from "@/components/SectionLabel";

export default function Flagships() {
  return (
    <section id="flagship" className="mx-auto max-w-4xl px-6 py-14">
      <SectionLabel>Flagship work</SectionLabel>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {FLAGSHIPS.map((f) => (
          <a
            key={f.slug}
            href={`https://github.com/chinmay-tayade/${f.slug}`}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col border border-line bg-bg-raised transition-colors hover:border-accent-dim"
          >
            <div
              className="h-[2px] w-full opacity-70 transition-opacity group-hover:opacity-100"
              style={{ background: "var(--gradient-brand)" }}
              aria-hidden
            />
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="flex items-center gap-2 font-mono text-sm text-text">
                <span className="section-dot h-1.5 w-1.5 rounded-full" aria-hidden />
                {f.title}
              </span>
              <span className="font-mono text-xs text-text-faint transition-colors group-hover:text-accent">
                ↗
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
    </section>
  );
}
