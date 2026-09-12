import { PROFILE } from "@/lib/resume";

const LINKS = [
  { label: "Email me", href: `mailto:${PROFILE.email}` },
  { label: "LinkedIn ↗", href: PROFILE.linkedin },
  { label: "GitHub ↗", href: PROFILE.github },
  { label: "Download résumé", href: PROFILE.resumeHref },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-14">
      <h2 className="font-mono text-sm text-text-dim">Get in touch</h2>
      <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-text-dim sm:text-base">
        Open to founding and senior mobile roles — Android, Kotlin Multiplatform,
        or anything offline-first and fintech-shaped. {PROFILE.location}, open to
        relocation.
      </p>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm">
        {LINKS.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noreferrer" : undefined}
            className={
              i === 0
                ? "border border-accent px-4 py-2 text-accent transition-colors hover:bg-accent hover:text-bg"
                : "text-text-dim underline decoration-line underline-offset-4 transition-colors hover:text-text hover:decoration-accent"
            }
          >
            {l.label}
          </a>
        ))}
      </div>
    </section>
  );
}
