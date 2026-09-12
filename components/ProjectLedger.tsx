import { formatUpdated, monthsSince, type Repo } from "@/lib/github";
import { FLAGSHIP_SLUGS } from "@/lib/featured";

function StatusDot({ repo }: { repo: Repo }) {
  if (FLAGSHIP_SLUGS.has(repo.name)) {
    return <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-label="flagship" />;
  }
  if (monthsSince(repo.pushedAt) < 2) {
    return <span className="h-1.5 w-1.5 rounded-full bg-status-live" aria-label="active" />;
  }
  return <span className="h-1.5 w-1.5 rounded-full bg-status-quiet" aria-label="stable" />;
}

export default function ProjectLedger({ repos }: { repos: Repo[] }) {
  return (
    <section id="projects" className="mx-auto max-w-4xl px-6 py-14">
      <div className="flex items-baseline justify-between">
        <h2 className="font-mono text-sm text-text-dim">
          All projects ({repos.length})
        </h2>
        <span className="font-mono text-xs text-text-faint">
          sorted by last push
        </span>
      </div>

      <div className="mt-6 border-t border-line">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-1.5 border-b border-line py-3 transition-colors hover:bg-bg-raised sm:flex-row sm:items-baseline sm:gap-4 sm:py-2.5"
          >
            <span className="flex shrink-0 items-center gap-2 font-mono text-sm sm:w-48">
              <StatusDot repo={repo} />
              <span className="truncate text-text group-hover:text-accent">
                {repo.name}
              </span>
            </span>

            <span className="min-w-0 flex-1 text-sm text-text-dim sm:truncate">
              {repo.description ?? "—"}
            </span>

            <span className="flex shrink-0 gap-4 font-mono text-xs text-text-faint sm:w-40 sm:justify-end">
              {repo.language && <span>{repo.language}</span>}
              <span>{formatUpdated(repo.pushedAt)}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
