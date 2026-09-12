import Link from "next/link";
import { orderedWiki } from "@/lib/wiki";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Android Engineering Wiki — Chinmay Tayade",
  description: "Notes on how Android actually works, from the Linux kernel up to app launch.",
};

export default function WikiIndex() {
  const articles = orderedWiki();

  return (
    <>
      <TopBar />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <p className="eyebrow">Android engineering wiki</p>
          <h1 className="font-display text-3xl font-medium text-text sm:text-4xl">
            How Android actually works.
          </h1>
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-text-dim sm:text-lg">
            Notes written for engineers, not end users — starting from the Linux
            kernel and working up to how a tap on an icon becomes a rendered
            frame. Grows one section at a time.
          </p>

          <ol className="mt-10 flex flex-col border-t border-line">
            {articles.map((a, i) => (
              <li key={a.slug} className="border-b border-line">
                <Link
                  href={`/wiki/${a.slug}`}
                  className="group flex items-baseline gap-4 py-4 transition-colors hover:bg-bg-raised"
                >
                  <span className="font-mono text-xs text-text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block text-base text-text group-hover:text-accent sm:text-lg">
                      {a.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-text-dim">
                      {a.summary}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
}
