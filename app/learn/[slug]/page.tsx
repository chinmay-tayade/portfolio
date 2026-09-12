import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  LEARNING_TOPICS,
  getLearningTopic,
  orderedLearning,
  type Concept,
} from "@/lib/learning";
import LearningDiagram from "@/components/LearningDiagram";
import TopBar from "@/components/TopBar";

export function generateStaticParams() {
  return LEARNING_TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getLearningTopic(slug);
  if (!topic) return {};
  return {
    title: `${topic.title} — Learn Android · Chinmay Tayade`,
    description: topic.oneLiner,
  };
}

function conceptTone(tone: Concept["tone"]) {
  return tone === "accent"
    ? "text-accent-light"
    : tone === "teal"
      ? "text-teal"
      : tone === "amber"
        ? "text-amber"
        : "text-text";
}

export default async function LearnTopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getLearningTopic(slug);
  if (!topic) notFound();

  const ordered = orderedLearning();
  const index = ordered.findIndex((t) => t.slug === slug);
  const prev = index > 0 ? ordered[index - 1] : undefined;
  const next = index < ordered.length - 1 ? ordered[index + 1] : undefined;

  return (
    <>
      <TopBar />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-text-faint">
            <Link
              href="/learn"
              className="text-text-faint transition-colors hover:text-accent"
            >
              ← all topics
            </Link>
            <span>
              <span className="text-accent-light">
                {String(topic.order).padStart(2, "0")}
              </span>
              <span className="text-text-faint">
                {" "}
                / {String(ordered.length).padStart(2, "0")}
              </span>
              {" · "}
              <span className="text-text-mute">learn android</span>
            </span>
          </div>

          {/* Hero */}
          <p className="eyebrow mt-6">
            {topic.emoji} {String(topic.order).padStart(2, "0")} · learn android
          </p>
          <h1 className="font-display flex items-center gap-3 text-3xl font-medium text-text sm:text-4xl">
            <span aria-hidden>{topic.emoji}</span>
            {topic.title}
          </h1>
          <p className="mt-2 font-mono text-sm text-accent-light">{topic.subtitle}</p>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-text-dim sm:text-lg">
            {topic.oneLiner}
          </p>

          <div className="mt-5 flex flex-wrap gap-4 font-mono text-xs">
            <a
              href={`https://github.com/chinmay-tayade/${topic.repo}`}
              target="_blank"
              rel="noreferrer"
              className="text-accent-light underline decoration-line underline-offset-4 transition-colors hover:text-accent"
            >
              view on GitHub ↗
            </a>
            <Link
              href={`/wiki/${topic.wikiSlug}`}
              className="text-accent-light underline decoration-line underline-offset-4 transition-colors hover:text-accent"
            >
              read the wiki note →
            </Link>
          </div>

          {/* Intro */}
          <div className="mt-10 flex max-w-[68ch] flex-col gap-4">
            {topic.intro.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-text-dim sm:text-base">
                {p}
              </p>
            ))}
          </div>

          {/* Mental model diagram */}
          <div className="mt-12 border-t border-line pt-10">
            <p className="eyebrow">The mental model</p>
            <h2 className="font-display text-xl font-medium text-text sm:text-2xl">
              How it fits together
            </h2>
            <div className="mt-6 max-w-xl">
              <LearningDiagram slug={topic.slug} />
            </div>
          </div>

          {/* Key concepts */}
          <div className="mt-12 border-t border-line pt-10">
            <p className="eyebrow">Key concepts</p>
            <h2 className="font-display text-xl font-medium text-text sm:text-2xl">
              The ideas to internalise
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {topic.concepts.map((c) => (
                <div
                  key={c.title}
                  className="border border-line bg-bg-raised p-4 transition-colors hover:border-accent-dim"
                >
                  <p className={`font-mono text-sm ${conceptTone(c.tone)}`}>{c.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-dim">{c.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Examples (code repos) */}
          {topic.examples && (
            <div className="mt-12 border-t border-line pt-10">
              <p className="eyebrow">Example index</p>
              <h2 className="font-display text-xl font-medium text-text sm:text-2xl">
                {topic.examples.length} runnable examples
              </h2>
              <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-text-dim">
                Each is a self-contained Activity + ViewModel pair you can open, read, and run.
              </p>
              <ol className="mt-6 grid gap-2 sm:grid-cols-2">
                {topic.examples.map((e) => (
                  <li
                    key={e.n}
                    className="flex gap-3 border border-line bg-bg-raised px-4 py-3 transition-colors hover:border-accent-dim"
                  >
                    <span className="shrink-0 font-mono text-xs text-accent">
                      {String(e.n).padStart(2, "0")}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm text-text">{e.title}</span>
                      <span className="text-xs leading-relaxed text-text-dim">{e.teaches}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Stages (roadmap) */}
          {topic.stages && (
            <div className="mt-12 border-t border-line pt-10">
              <p className="eyebrow">The nine stages</p>
              <h2 className="font-display text-xl font-medium text-text sm:text-2xl">
                In dependency order
              </h2>
              <div className="mt-6">
                <ol className="relative flex flex-col">
                  {topic.stages.map((s, i) => (
                    <li key={s.n} className="relative flex gap-4 pb-5 last:pb-0">
                      {i < topic.stages!.length - 1 && (
                        <span
                          aria-hidden
                          className="absolute left-[15px] top-8 h-[calc(100%-1.25rem)] w-px bg-line"
                        />
                      )}
                      <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center border border-accent-dim bg-bg font-mono text-xs text-accent">
                        {s.n}
                      </span>
                      <div className="flex min-w-0 flex-1 flex-col gap-1 border border-line bg-bg-raised px-4 py-3 transition-colors hover:border-accent-dim">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <span className="font-mono text-sm text-text">{s.title}</span>
                          {s.href && (
                            <Link
                              href={s.href}
                              className="font-mono text-xs text-accent-light underline decoration-line underline-offset-4 hover:text-accent"
                            >
                              {s.linkLabel} →
                            </Link>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed text-text-dim">{s.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {/* Comparisons (java -> kotlin) */}
          {topic.comparisons && (
            <div className="mt-12 border-t border-line pt-10">
              <p className="eyebrow">Side by side</p>
              <h2 className="font-display text-xl font-medium text-text sm:text-2xl">
                Java → Kotlin, one pairing at a time
              </h2>
              <div className="mt-6 flex flex-col gap-3">
                {topic.comparisons.map((c) => (
                  <div key={c.label} className="border border-line bg-bg-raised p-4">
                    <p className="font-mono text-xs text-accent">{c.label}</p>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      <div className="border border-line bg-bg px-3 py-2">
                        <p className="font-mono text-[10px] text-text-faint">java</p>
                        <p className="mt-0.5 font-mono text-xs text-text-dim">{c.java}</p>
                      </div>
                      <div className="border border-teal/40 bg-bg px-3 py-2">
                        <p className="font-mono text-[10px] text-teal">kotlin</p>
                        <p className="mt-0.5 font-mono text-xs text-text">{c.kotlin}</p>
                      </div>
                    </div>
                    {c.note && <p className="mt-1.5 text-xs text-text-faint">{c.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Takeaway */}
          <div className="mt-12 border-t border-line pt-10">
            <p className="eyebrow">The takeaway</p>
            <p className="pull-quote">{topic.takeaway}</p>
          </div>

          {/* Prev / next */}
          <nav className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/learn/${prev.slug}`}
                className="group border border-line bg-bg-raised p-4 transition-colors hover:border-accent-dim"
              >
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-text-faint">
                  ← Previous
                </p>
                <p className="mt-2 font-display text-base font-medium text-text group-hover:text-accent">
                  {prev.emoji} {prev.title}
                </p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-text-faint">
                  {prev.oneLiner}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/learn/${next.slug}`}
                className="group border border-line bg-bg-raised p-4 text-right transition-colors hover:border-accent-dim"
              >
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-text-faint">
                  Next →
                </p>
                <p className="mt-2 font-display text-base font-medium text-text group-hover:text-accent">
                  {next.emoji} {next.title}
                </p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-text-faint">
                  {next.oneLiner}
                </p>
              </Link>
            )}
          </nav>
        </div>
      </main>
    </>
  );
}
