import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/lib/projects";
import { getRepos, formatUpdated } from "@/lib/github";
import { languageStyle } from "@/lib/language";
import HLDDiagram from "@/components/HLDDiagram";
import TopBar from "@/components/TopBar";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const repos = await getRepos();
  const repo = repos.find((r) => r.name === slug);

  return (
    <>
      <TopBar />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <Link
            href="/#projects"
            className="font-mono text-xs text-text-faint transition-colors hover:text-accent"
          >
            ← all projects
          </Link>

          <h1 className="font-display mt-4 text-3xl font-medium text-text sm:text-4xl">
            {slug}
          </h1>
          <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-text-dim sm:text-lg">
            {project.oneLiner}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-text-faint">
            <a
              href={`https://github.com/chinmay-tayade/${slug}`}
              target="_blank"
              rel="noreferrer"
              className="text-accent-light underline decoration-line underline-offset-4 hover:text-accent"
            >
              View on GitHub ↗
            </a>
            {repo?.language && (
              <span
                className="border px-1.5 py-0.5"
                style={{
                  color: languageStyle(repo.language).hex,
                  borderColor: languageStyle(repo.language).hex,
                }}
              >
                {repo.language}
              </span>
            )}
            {repo && <span>updated {formatUpdated(repo.pushedAt)}</span>}
          </div>

          <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-text-faint">
            {project.stack.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>

          <div className="mt-12 border-t border-line pt-10">
            <p className="eyebrow">High-level design</p>
            <p className="max-w-[60ch] text-sm leading-relaxed text-text-dim sm:text-base">
              {project.hld.summary}
            </p>
            {project.hld.components.length > 0 && (
              <div className="mt-6 max-w-lg">
                <HLDDiagram components={project.hld.components} />
              </div>
            )}
          </div>

          {project.lld && (
            <div className="mt-12 border-t border-line pt-10">
              <p className="eyebrow">Low-level design</p>
              <p className="max-w-[60ch] text-sm leading-relaxed text-text-dim sm:text-base">
                {project.lld.summary}
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {project.lld.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-relaxed text-text-dim">
                    <span className="shrink-0 text-text-faint">–</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
