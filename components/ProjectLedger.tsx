import Link from "next/link";
import { formatUpdated, type Repo } from "@/lib/github";
import { languageStyle, recencyStep, recencyColor } from "@/lib/language";
import { FLAGSHIP_SLUGS } from "@/lib/featured";
import { PROJECTS } from "@/lib/projects";
import LanguageMix from "@/components/LanguageMix";
import Section from "@/components/Section";

const DOCUMENTED = new Set(PROJECTS.map((p) => p.slug));

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
            background: i <= step ? recencyColor(step) : "var(--hairline)",
            borderRadius: i === 1 ? "2px 0 0 2px" : i === 4 ? "0 2px 2px 0" : 0,
          }}
        />
      ))}
    </span>
  );
}

export default function ProjectLedger({ repos }: { repos: Repo[] }) {
  return (
    <Section
      id="projects"
      eyebrow="Everything else"
      title={`All ${repos.length} public repos.`}
      intro="Fetched live from the GitHub API, sorted by last push — nothing curated out."
    >
      <LanguageMix repos={repos} />

      {/* Clickability legend */}
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border border-line bg-bg-raised px-4 py-3 font-mono text-xs text-text-dim">
        <span className="text-text-mute">Every row is a link:</span>
        <span className="flex items-center gap-1.5">
          <span className="border border-accent-dim/50 px-1.5 py-0.5 text-accent-light">case study</span>
          <span>opens here</span>
          <span aria-hidden className="text-accent">→</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="border border-line px-1.5 py-0.5 text-text-dim">repo</span>
          <span>opens on GitHub</span>
          <span aria-hidden className="text-text-faint">↗</span>
        </span>
      </div>

      <div className="mt-4 border-t border-line">
        {repos.map((repo) => {
          const isDocumented = DOCUMENTED.has(repo.name);
          const isFlagship = FLAGSHIP_SLUGS.has(repo.name);
          const rowClass =
            "group flex flex-col gap-2 border-b border-line py-3 transition-colors hover:bg-bg-raised sm:flex-row sm:items-center sm:gap-4 sm:py-2.5";

          const content = (
            <>
              <span className="flex shrink-0 items-center gap-2 font-mono text-sm sm:w-52">
                <LanguageChip language={repo.language} />
                {isFlagship && (
                  <span className="text-accent" title="flagship" aria-hidden>
                    ★
                  </span>
                )}
                <span className="truncate text-text group-hover:text-accent">
                  {repo.name}
                </span>
                {isDocumented && (
                  <span className="hidden shrink-0 border border-accent-dim/50 px-1.5 py-0.5 font-mono text-[10px] text-accent-light lg:inline">
                    case study
                  </span>
                )}
              </span>

              <span className="min-w-0 flex-1 text-sm text-text-dim sm:truncate">
                {repo.description ?? "—"}
              </span>

              <span className="flex shrink-0 items-center gap-3 font-mono text-xs text-text-faint sm:w-40 sm:justify-end">
                <RecencyMeter repo={repo} />
                <span className="w-14 text-right">
                  {formatUpdated(repo.pushedAt)}
                </span>
                <span
                  aria-hidden
                  className={`w-4 text-right transition-all duration-200 ${
                    isDocumented
                      ? "text-text-faint group-hover:translate-x-0.5 group-hover:text-accent"
                      : "text-text-faint group-hover:text-accent"
                  }`}
                >
                  {isDocumented ? "→" : "↗"}
                </span>
              </span>
            </>
          );

          return isDocumented ? (
            <Link key={repo.name} href={`/projects/${repo.name}`} className={rowClass}>
              {content}
            </Link>
          ) : (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className={rowClass}
            >
              {content}
            </a>
          );
        })}
      </div>
    </Section>
  );
}
