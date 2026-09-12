import Image from "next/image";
import { PROFILE } from "@/lib/resume";
import ImpactBlock from "@/components/ImpactBlock";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="glow-breathe pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent opacity-60 blur-[100px]"
      />
      <div
        aria-hidden
        className="glow-breathe pointer-events-none absolute -top-10 right-0 h-64 w-64 rounded-full bg-gold opacity-40 blur-[110px]"
        style={{ animationDelay: "2.5s" }}
      />

      <div className="relative mx-auto max-w-4xl px-6 pt-16 pb-14 sm:pt-24 sm:pb-20">
        <div className="font-mono">
          <p
            className="rise-in text-gradient text-4xl font-bold tracking-tight sm:text-6xl"
            style={{ animationDelay: "0ms" }}
          >
            Chinmay Tayade
          </p>
          <p
            className="rise-in mt-2 text-lg text-accent sm:text-xl"
            style={{ animationDelay: "120ms" }}
          >
            Founding Mobile Engineer — Android · Kotlin · Compose · Kotlin Multiplatform
          </p>
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
            className="btn-gradient px-5 py-2.5 font-semibold transition-all"
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
            <div className="gradient-ring shadow-[0_0_40px_-12px_rgba(168,85,247,0.5)]">
              <div className="bg-bg p-[2px]">
                <Image
                  src="/chinmay.png"
                  alt="Portrait of Chinmay Tayade"
                  width={336}
                  height={360}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
            <figcaption className="mt-2 font-mono text-xs text-text-faint">
              {PROFILE.location}
            </figcaption>
          </figure>

          <div className="min-w-0 flex-1">
            <ImpactBlock />
          </div>
        </div>
      </div>
    </section>
  );
}
