import Link from "next/link";
import { notFound } from "next/navigation";
import {
  WIKI_ARTICLES,
  WIKI_GROUPS,
  getWikiArticle,
  orderedWiki,
  articleHeadings,
  type WikiResource,
} from "@/lib/wiki";
import { getLearningTopic } from "@/lib/learning";
import TableOfContents from "@/components/TableOfContents";
import TopBar from "@/components/TopBar";

export function generateStaticParams() {
  return WIKI_ARTICLES.map((a) => ({ slug: a.slug }));
}

const RESOURCE_KIND: Record<
  WikiResource["kind"],
  { label: string; cls: string }
> = {
  repo: { label: "repo", cls: "text-accent-light border-accent-dim/50" },
  learn: { label: "learn", cls: "text-teal border-teal/40" },
  wiki: { label: "wiki", cls: "text-amber border-amber/40" },
  external: { label: "docs", cls: "text-text-mute border-line" },
};

function ResourceCard({ r }: { r: WikiResource }) {
  const kind = RESOURCE_KIND[r.kind];
  const external = r.href.startsWith("http");
  return (
    <a
      href={r.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group flex items-center gap-3 border border-line bg-bg-raised px-3.5 py-3 transition-colors hover:border-accent-dim"
    >
      <span
        className={`shrink-0 border px-1.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider ${kind.cls}`}
      >
        {kind.label}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm text-text group-hover:text-accent">
          {r.label}
        </span>
        {r.note && <span className="truncate text-xs text-text-faint">{r.note}</span>}
      </span>
      <span className="font-mono text-xs text-text-faint transition-colors group-hover:text-accent">
        {external ? "↗" : "→"}
      </span>
    </a>
  );
}

export default async function WikiArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getWikiArticle(slug);
  if (!article) notFound();

  const ordered = orderedWiki();
  const index = ordered.findIndex((a) => a.slug === slug);
  const prev = index > 0 ? ordered[index - 1] : undefined;
  const next = index < ordered.length - 1 ? ordered[index + 1] : undefined;
  const group = WIKI_GROUPS.find((g) => g.id === article.group);
  const headings = articleHeadings(article);
  const topic = getLearningTopic(slug);

  return (
    <>
      <TopBar />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
          {/* Breadcrumb + position */}
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-text-faint">
            <Link
              href="/wiki"
              className="text-text-faint transition-colors hover:text-accent"
            >
              ← wiki index
            </Link>
            <span>
              <span className="text-accent-light">
                {String(article.order).padStart(2, "0")}
              </span>
              <span className="text-text-faint"> / {String(ordered.length).padStart(2, "0")}</span>
              {" · "}
              <span className="text-text-mute">{group?.label}</span>
            </span>
          </div>

          {/* Hero */}
          <header className="mt-8">
            <p className="eyebrow">
              {article.emoji} {group?.label}
            </p>
            <h1 className="font-display text-3xl font-medium text-text sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-text-dim sm:text-lg">
              {article.summary}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-text-faint">
              <span>{article.readingMinutes} min read</span>
              {article.concepts && (
                <span>{article.concepts.length} key concepts</span>
              )}
            </div>
          </header>

          {/* Two-column body */}
          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem]">
            <article className="min-w-0 max-w-[68ch]">
              <div className="flex flex-col gap-10">
                {article.sections.map((section, i) => (
                  <section key={i} id={`section-${i}`} className="scroll-mt-24">
                    {section.heading && (
                      <h2 className="font-display text-xl font-medium text-text sm:text-2xl">
                        {section.heading}
                      </h2>
                    )}
                    {section.paragraphs && (
                      <div className="mt-3 flex flex-col gap-4">
                        {section.paragraphs.map((p, j) => (
                          <p key={j} className="text-sm leading-relaxed text-text-dim sm:text-base">
                            {p}
                          </p>
                        ))}
                      </div>
                    )}
                    {section.list && (
                      <ul className="mt-4 flex flex-col gap-3">
                        {section.list.map((item, j) => (
                          <li
                            key={j}
                            className="flex gap-2 text-sm leading-relaxed text-text-dim sm:text-base"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              {/* Concepts */}
              {article.concepts && (
                <div className="mt-12 border-t border-line pt-8">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-faint">
                    In this note
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {article.concepts.map((c) => (
                      <span
                        key={c}
                        className="border border-line bg-bg-raised px-2.5 py-1 font-mono text-xs text-text-dim"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Cross-link to the interactive topic / repo */}
              {topic && (
                <div className="mt-8 border border-accent-dim/40 bg-accent-dim/10 p-4">
                  <p className="font-mono text-xs text-accent-light">
                    Prefer it hands-on?
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-text-dim">
                    This note has a matching interactive topic with diagrams and a
                    runnable repo.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs">
                    <Link
                      href={`/learn/${topic.slug}`}
                      className="text-accent-light underline decoration-line underline-offset-4 hover:text-accent"
                    >
                      interactive topic + diagrams →
                    </Link>
                    <Link
                      href={`/projects/${topic.repo}`}
                      className="text-accent-light underline decoration-line underline-offset-4 hover:text-accent"
                    >
                      browse the repo ↗
                    </Link>
                  </div>
                </div>
              )}

              {/* References & resources */}
              {article.resources && article.resources.length > 0 && (
                <div className="mt-12 border-t border-line pt-8">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-text-faint">
                    References & resources
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {article.resources.map((r) => (
                      <ResourceCard key={r.label + r.href} r={r} />
                    ))}
                  </div>
                </div>
              )}

              {/* Prev / next */}
              <nav className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
                {prev ? (
                  <Link
                    href={`/wiki/${prev.slug}`}
                    className="group border border-line bg-bg-raised p-4 transition-colors hover:border-accent-dim"
                  >
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-text-faint">
                      ← Previous
                    </p>
                    <p className="mt-2 font-display text-base font-medium text-text group-hover:text-accent">
                      {prev.emoji} {prev.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-text-faint">
                      {prev.summary}
                    </p>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link
                    href={`/wiki/${next.slug}`}
                    className="group border border-line bg-bg-raised p-4 text-right transition-colors hover:border-accent-dim"
                  >
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-text-faint">
                      Next →
                    </p>
                    <p className="mt-2 font-display text-base font-medium text-text group-hover:text-accent">
                      {next.emoji} {next.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-text-faint">
                      {next.summary}
                    </p>
                  </Link>
                )}
              </nav>
            </article>

            {/* Sticky TOC */}
            <aside className="hidden lg:block">
              <TableOfContents headings={headings} />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
