import Link from "next/link";
import { WIKI_GROUPS, wikiByGroup, orderedWiki, type WikiArticle } from "@/lib/wiki";
import { getLearningTopic } from "@/lib/learning";
import TopBar from "@/components/TopBar";

export const metadata = {
  title: "Android Engineering Wiki — Chinmay Tayade",
  description:
    "Notes on how Android actually works, from the Linux kernel up to app launch — plus the hands-on learning path.",
};

function ArticleCard({ a }: { a: WikiArticle }) {
  const topic = getLearningTopic(a.slug);
  return (
    <Link
      href={`/wiki/${a.slug}`}
      className="group flex gap-4 border border-line bg-bg-raised p-4 transition-colors hover:border-accent-dim"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-line bg-bg font-mono text-xs text-text-faint">
        {String(a.order).padStart(2, "0")}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-display text-lg font-medium text-text group-hover:text-accent">
            {a.emoji} {a.title}
          </span>
          <span className="font-mono text-[0.68rem] text-text-faint">
            {a.readingMinutes} min
          </span>
        </span>
        <span className="mt-1 text-sm leading-relaxed text-text-dim">
          {a.summary}
        </span>
        <span className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-text-faint">
          {a.concepts?.slice(0, 4).map((c) => (
            <span key={c} className="text-text-mute">
              {c}
            </span>
          ))}
          {topic && (
            <span className="text-accent-light underline decoration-line underline-offset-4">
              interactive topic →
            </span>
          )}
        </span>
      </span>
    </Link>
  );
}

export default function WikiIndex() {
  return (
    <>
      <TopBar />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-14 sm:py-16">
          <p className="eyebrow">Android engineering wiki</p>
          <h1 className="font-display text-3xl font-medium text-text sm:text-4xl">
            How Android actually works.
          </h1>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-text-dim sm:text-lg">
            Ten notes written for engineers, not end users. The first half goes
            from the Linux kernel up to a rendered frame; the second half is the
            hands-on path every Android engineer learns. Read in order — each note
            builds on the one before it.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/wiki/what-is-android"
              className="btn-primary rounded px-4 py-2 font-mono text-xs"
            >
              Start at the beginning →
            </Link>
            <Link
              href="/learn"
              className="rounded border border-line px-4 py-2 font-mono text-xs text-text-dim transition-colors hover:border-accent-dim hover:text-text"
            >
              Skip to the hands-on path
            </Link>
          </div>

          {/* Grouped sections */}
          {WIKI_GROUPS.map((group) => {
            const articles = wikiByGroup(group.id);
            return (
              <section key={group.id} className="mt-14">
                <div className="border-t border-line pt-8">
                  <h2 className="font-display text-xl font-medium text-text sm:text-2xl">
                    {group.label}
                  </h2>
                  <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-text-dim">
                    {group.blurb}
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    {articles.map((a) => (
                      <ArticleCard key={a.slug} a={a} />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}

          {/* Full ordered index (quick jump) */}
          <section className="mt-14">
            <div className="border-t border-line pt-8">
              <h2 className="font-display text-xl font-medium text-text sm:text-2xl">
                Full index
              </h2>
              <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-text-dim">
                Every note in order, for jumping straight to a specific topic.
              </p>
              <ol className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2">
                {orderedWiki().map((a) => (
                  <li key={a.slug} className="bg-bg">
                    <Link
                      href={`/wiki/${a.slug}`}
                      className="group flex items-baseline gap-3 px-4 py-3 transition-colors hover:bg-bg-raised"
                    >
                      <span className="font-mono text-xs text-text-faint">
                        {String(a.order).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-text-dim group-hover:text-accent">
                        {a.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
