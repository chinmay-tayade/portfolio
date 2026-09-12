import { PROFILE } from "@/lib/resume";
import Section from "@/components/Section";

const LINKS = [
  { label: "View résumé", href: PROFILE.resumeHref },
  { label: "Email me", href: `mailto:${PROFILE.email}` },
  { label: "LinkedIn ↗", href: PROFILE.linkedin },
  { label: "GitHub ↗", href: PROFILE.github },
];

export default function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title="Open to founding and senior mobile roles."
      intro={`Android, Kotlin Multiplatform, or anything offline-first and fintech-shaped. ${PROFILE.location} — open to relocation, available immediately.`}
    >
      <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-sm">
        {LINKS.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noreferrer" : undefined}
            className={
              i === 0
                ? "btn-primary px-5 py-2.5 transition-colors"
                : "text-text-dim underline decoration-line underline-offset-4 transition-colors hover:text-text hover:decoration-accent"
            }
          >
            {l.label}
          </a>
        ))}
      </div>
    </Section>
  );
}
