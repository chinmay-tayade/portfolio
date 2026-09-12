import Link from "next/link";
import { orderedLearning } from "@/lib/learning";
import LearningPath from "@/components/LearningPath";
import TopBar from "@/components/TopBar";

export const metadata = {
  title: "Learn Android — Chinmay Tayade",
  description:
    "Five topics that teach Android in order — Coroutines, Flow, MVVM, the roadmap, and Java to Kotlin — with diagrams and runnable examples.",
};

export default function LearnIndex() {
  const topics = orderedLearning();

  return (
    <>
      <TopBar />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <p className="eyebrow">Learn Android</p>
          <h1 className="font-display text-3xl font-medium text-text sm:text-4xl">
            Five topics, in dependency order.
          </h1>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-text-dim sm:text-lg">
            The hands-on path to becoming an Android engineer — every topic pairs a
            written explanation with a runnable repo, a diagram, and the concepts
            you need to internalise. Work top to bottom.
          </p>

          <div className="mt-10 border-t border-line pt-10">
            <h2 className="font-display text-xl font-medium text-text sm:text-2xl">
              Explore the path
            </h2>
            <div className="mt-6">
              <LearningPath />
            </div>
          </div>

          <h2 className="mt-14 font-display text-xl font-medium text-text sm:text-2xl">
            All topics
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {topics.map((t) => (
              <Link
                key={t.slug}
                href={`/learn/${t.slug}`}
                className="group flex flex-col border border-line bg-bg-raised transition-colors hover:border-accent-dim"
              >
                <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                  <span className="flex items-center gap-2 font-mono text-sm text-text">
                    <span aria-hidden>{t.emoji}</span>
                    {t.title}
                  </span>
                  <span className="font-mono text-xs text-text-faint">
                    {String(t.order).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 px-4 py-4">
                  <p className="font-mono text-xs text-accent-light">{t.subtitle}</p>
                  <p className="text-sm leading-relaxed text-text-dim">{t.oneLiner}</p>
                  <p className="mt-auto pt-2 font-mono text-xs text-text-faint transition-colors group-hover:text-accent">
                    read the topic →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
