import Image from "next/image";
import { PROFILE } from "@/lib/resume";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="glow-breathe pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent-dim opacity-40 blur-[120px]"
      />

      <div className="relative mx-auto max-w-2xl px-6 pt-20 pb-16 text-center sm:pt-28 sm:pb-20">
        <div
          className="rise-in mx-auto h-24 w-24 overflow-hidden rounded-full border border-line"
          style={{ animationDelay: "0ms" }}
        >
          <Image
            src="/chinmay.png"
            alt="Portrait of Chinmay Tayade"
            width={336}
            height={360}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <h1
          className="rise-in text-gradient mt-7 font-display text-4xl font-medium tracking-tight sm:text-5xl"
          style={{ animationDelay: "100ms" }}
        >
          {PROFILE.name}
        </h1>

        <p
          className="rise-in mt-3 font-display text-xl text-text italic sm:text-2xl"
          style={{ animationDelay: "180ms" }}
        >
          &ldquo;I design for the failure case first.&rdquo;
        </p>

        <p
          className="rise-in mt-4 font-mono text-sm text-accent-light"
          style={{ animationDelay: "240ms" }}
        >
          Founding Mobile Engineer — Android · Kotlin · Compose · Kotlin Multiplatform
        </p>

        <p
          className="rise-in mx-auto mt-6 max-w-[42ch] text-base leading-relaxed text-text-dim"
          style={{ animationDelay: "300ms" }}
        >
          {PROFILE.summary}
        </p>

        <div
          className="rise-in mt-9 flex flex-wrap items-center justify-center gap-5 font-mono text-sm"
          style={{ animationDelay: "360ms" }}
        >
          <a href={PROFILE.resumeHref} className="btn-primary px-5 py-2.5 transition-colors">
            View résumé
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
      </div>
    </section>
  );
}
