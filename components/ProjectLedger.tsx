import { formatUpdated, type Repo } from "@/lib/github";
import { languageStyle, recencyStep, recencyColor } from "@/lib/language";
import { FLAGSHIP_SLUGS } from "@/lib/featured";
import LanguageMix from "@/components/LanguageMix";
import SectionLabel from "@/components/SectionLabel";

function LanguageChip({ language }: { language: string | null }) {
  const style = languageStyle(language);
  return (
    <span
      className="flex h-4 w-6 shrink-0 items-center justify-center rounded-[3px] text-[10px] font-semibold"
      style={{ background: style.hex, color: style.text }}
      title={language ?? "Other"}
    >
      {style.short}
    </span>
  );
}

function RecencyMeter({ repo }: { repo: Repo }) {
  const step = recencyStep(repo.pushedAt);
  return (
    <span
      className="flex shrink-0 items-center gap-[2px]"
      title={`last push ${formatUpdated(repo.pushedAt)}`}
    >
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="h-2.5 w-[5px]"
          style={{
            background: i <= step ? recencyColor(step) : "var(--line)",
            borderRadius: i === 1 ? "2px 0 0 2px" : i === 4 ? "0 2px 2px 0" : 0,
          }}
        />
      ))}
    </span>
  );
}

export default function ProjectLedger({ repos }: { repos: Repo[] }) {
  return (
    <section id="projects" className="mx-auto max-w-4xl px-6 py-14">
      <div className="flex items-baseline justify-between">
        <SectionLabel>All projects ({repos.length})</SectionLabel>
        <span className="font-mono text-xs text-text-faint">
          sorted by last push
        </span>
      </div>

      <LanguageMix repos={repos} />

      <div className="mt-8 border-t border-line">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-2 border-b border-line py-3 transition-colors hover:bg-bg-raised sm:flex-row sm:items-center sm:gap-4 sm:py-2.5"
          >
            <span className="flex shrink-0 items-center gap-2 font-mono text-sm sm:w-48">
              <LanguageChip language={repo.language} />
              {FLAGSHIP_SLUGS.has(repo.name) && (
                <span className="text-accent" title="flagship" aria-hidden>
                  ★
                </span>
              )}
              <span className="truncate text-text group-hover:text-accent">
                {repo.name}
              </span>
            </span>

            <span className="min-w-0 flex-1 text-sm text-text-dim sm:truncate">
              {repo.description ?? "—"}
            </span>

            <span className="flex shrink-0 items-center gap-3 font-mono text-xs text-text-faint sm:w-32 sm:justify-end">
              <RecencyMeter repo={repo} />
              <span className="w-14 text-right">
                {formatUpdated(repo.pushedAt)}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
