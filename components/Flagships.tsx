import Link from "next/link";
import { FLAGSHIPS } from "@/lib/featured";
import Section from "@/components/Section";
import FlagshipDiagram from "@/components/FlagshipDiagram";

export default function Flagships() {
  return (
    <Section
      id="flagship"
      eyebrow="Selected work"
      title="Four builds worth a closer look."
      intro="All original, all with tests and CI. Each card opens a full case study — the rest of my public repos are listed further down the page."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {FLAGSHIPS.map((f) => (
          <Link
            key={f.slug}
            href={`/projects/${f.slug}`}
            className="group relative flex flex-col border border-line bg-bg-raised transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_16px_50px_-24px_var(--accent)]"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <span className="font-mono text-sm text-text group-hover:text-accent">
                {f.title}
              </span>
              <span className="flex items-center gap-2">
                <span
                  className={`border px-1.5 py-0.5 font-mono text-[10px] tracking-wider uppercase ${
                    f.status === "shipped" ? "tag-shipped" : "tag-wip"
                  }`}
                >
                  {f.status === "shipped" ? "shipped" : "in progress"}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-xs text-text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                >
                  ↗
                </span>
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-3 px-4 py-4">
              <p className="font-mono text-xs text-text-dim">{f.tagline}</p>
              <p className="text-sm leading-relaxed text-text-dim">{f.summary}</p>
              <FlagshipDiagram slug={f.slug} />
              <p className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-2 font-mono text-xs text-text-faint">
                {f.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </p>

              <span className="mt-3 flex items-center justify-between border-t border-line pt-3 font-mono text-xs text-accent-light">
                <span>Read the case study</span>
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-8 flex flex-wrap items-center gap-4 font-mono text-xs">
        <a
          href="#projects"
          className="btn-primary rounded px-4 py-2 transition-colors"
        >
          View all public repos ↓
        </a>
        <span className="text-text-faint">
          every repo below is clickable too — case studies open here, the rest open on GitHub.
        </span>
      </p>
    </Section>
  );
}
