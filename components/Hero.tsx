const LINES: { text: string; className: string }[] = [
  { text: "Chinmay Tayade", className: "text-3xl sm:text-4xl font-semibold" },
  {
    text: "Mobile engineer — Android · Kotlin · Compose · Kotlin Multiplatform",
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
        className="rise-in mt-6 max-w-[42ch] font-sans text-base leading-relaxed text-text-dim sm:text-lg"
        style={{ animationDelay: "260ms" }}
      >
        I build B2C fintech-grade Android apps — the kind where a dropped
        connection mid-transfer or a stolen unlocked phone is a design input,
        not an afterthought. IIIT Allahabad.
      </p>

      <div
        className="rise-in mt-8 flex flex-wrap items-center gap-5 font-mono text-sm"
        style={{ animationDelay: "340ms" }}
      >
        <a
          href="#flagship"
          className="border border-accent px-4 py-2 text-accent transition-colors hover:bg-accent hover:text-bg"
        >
          See flagship work
        </a>
        <a
          href="https://www.linkedin.com/in/chinmaytayade"
          target="_blank"
          rel="noreferrer"
          className="text-text-dim underline decoration-line underline-offset-4 transition-colors hover:text-text hover:decoration-accent"
        >
          Résumé on LinkedIn ↗
        </a>
      </div>
    </section>
  );
}
