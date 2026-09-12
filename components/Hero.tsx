import Image from "next/image";
import { PROFILE } from "@/lib/resume";
import ImpactBlock from "@/components/ImpactBlock";

const LINES: { text: string; className: string }[] = [
  { text: "Chinmay Tayade", className: "text-3xl sm:text-4xl font-semibold" },
  {
    text: "Founding Mobile Engineer — Android · Kotlin · Compose · Kotlin Multiplatform",
    className: "text-lg sm:text-xl text-accent",
  },
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
      <div className="font-mono">
        {LINES.map((line, i) => (
          <p
            key={line.text}
            className={`rise-in ${line.className}`}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {line.text}
          </p>
        ))}
      </div>

      <p
        className="rise-in mt-6 max-w-[58ch] font-sans text-base leading-relaxed text-text-dim sm:text-lg"
        style={{ animationDelay: "260ms" }}
      >
        {PROFILE.summary}
      </p>

      <div
        className="rise-in mt-8 flex flex-wrap items-center gap-5 font-mono text-sm"
        style={{ animationDelay: "340ms" }}
      >
        <a
          href={PROFILE.resumeHref}
          className="border border-accent px-4 py-2 text-accent transition-colors hover:bg-accent hover:text-bg"
        >
          Download résumé
        </a>
        <a
          href="#flagship"
          className="text-text-dim underline decoration-line underline-offset-4 transition-colors hover:text-text hover:decoration-accent"
        >
          See flagship work
        </a>
        <a
          href={`mailto:${PROFILE.email}`}
          className="text-text-dim underline decoration-line underline-offset-4 transition-colors hover:text-text hover:decoration-accent"
        >
          Email me
        </a>
      </div>

      <div
        className="rise-in mt-12 flex flex-col gap-6 md:flex-row-reverse md:items-start"
        style={{ animationDelay: "420ms" }}
      >
        <figure className="w-full shrink-0 md:w-48">
          <div className="border border-line">
            <Image
              src="/chinmay.png"
              alt="Portrait of Chinmay Tayade"
              width={336}
              height={360}
              className="h-auto w-full grayscale-[15%]"
              priority
            />
          </div>
          <figcaption className="mt-2 font-mono text-xs text-text-faint">
            {PROFILE.location}
          </figcaption>
        </figure>

        <div className="min-w-0 flex-1">
          <ImpactBlock />
        </div>
      </div>
    </section>
  );
}
