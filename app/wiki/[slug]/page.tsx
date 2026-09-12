import Link from "next/link";
import { notFound } from "next/navigation";
import { WIKI_ARTICLES, getWikiArticle, orderedWiki } from "@/lib/wiki";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return WIKI_ARTICLES.map((a) => ({ slug: a.slug }));
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

  return (
    <>
      <TopBar />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <Link
            href="/wiki"
            className="font-mono text-xs text-text-faint transition-colors hover:text-accent"
          >
            ← wiki index
          </Link>

          <p className="eyebrow mt-6">
            {String(article.order).padStart(2, "0")} · android engineering wiki
          </p>
          <h1 className="font-display text-3xl font-medium text-text sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-text-dim sm:text-lg">
            {article.summary}
          </p>

          <div className="mt-10 flex flex-col gap-10">
            {article.sections.map((section, i) => (
              <div key={i} className="max-w-[68ch]">
                {section.heading && (
                  <h2 className="text-lg font-semibold text-text sm:text-xl">
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
                      <li key={j} className="flex gap-2 text-sm leading-relaxed text-text-dim sm:text-base">
                        <span className="shrink-0 text-accent">–</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 flex items-center justify-between border-t border-line pt-6 font-mono text-sm">
            {prev ? (
              <Link href={`/wiki/${prev.slug}`} className="text-text-dim transition-colors hover:text-accent">
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/wiki/${next.slug}`} className="text-text-dim transition-colors hover:text-accent">
                {next.title} →
              </Link>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
