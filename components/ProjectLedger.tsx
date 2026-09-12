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

      <div className="mt-8 border-t border-line">
        {repos.map((repo) => {
          const rowClass =
            "group flex flex-col gap-2 border-b border-line py-3 transition-colors hover:bg-bg-raised sm:flex-row sm:items-center sm:gap-4 sm:py-2.5";
          const content = (
            <>
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
            </>
          );

          return DOCUMENTED.has(repo.name) ? (
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
