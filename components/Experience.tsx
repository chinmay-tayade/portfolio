import { EXPERIENCE, EDUCATION, LANGUAGES_SPOKEN, AVAILABILITY } from "@/lib/resume";
import Section from "@/components/Section";
import ImpactBlock from "@/components/ImpactBlock";

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Track record"
      title="Four years, one product taken to millions."
      intro="Sole mobile engineer on a fintech app that went from an empty repository to 5M+ downloads. Before that, payments infrastructure for a live network of 10,000+ merchants."
    >
      <ImpactBlock />

      <div className="relative mt-10 border-l border-line pl-6">
        {EXPERIENCE.map((role) => (
          <div key={role.org} className="relative pb-10 last:pb-0">
            <span className="absolute top-1.5 -left-[29px] h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="font-mono text-xs text-text-faint">
              {role.start} — {role.end}
            </p>
            <h3 className="mt-1 text-base font-semibold text-text sm:text-lg">
              {role.title} <span className="text-text-dim">— {role.org}</span>
            </h3>
            <p className="mt-1 text-sm text-text-faint">{role.orgContext}</p>

            <ul className="mt-4 flex flex-col gap-2">
              {role.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm leading-relaxed text-text-dim">
                  <span className="shrink-0 text-text-faint">–</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-text-faint">
              {role.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </p>
          </div>
        ))}

        <div className="relative">
          <span className="absolute top-1.5 -left-[29px] h-2.5 w-2.5 rounded-full border-2 border-text-faint bg-bg" />
          <p className="font-mono text-xs text-text-faint">
            {EDUCATION.start} — {EDUCATION.end}
          </p>
          <h3 className="mt-1 text-base font-semibold text-text sm:text-lg">
            {EDUCATION.degree} <span className="text-text-dim">— {EDUCATION.school}</span>
          </h3>
          <p className="mt-1 text-sm text-text-faint">{EDUCATION.note}</p>
        </div>
      </div>

      <p className="mt-8 font-mono text-xs text-text-faint">
        {`// ${AVAILABILITY} · ${LANGUAGES_SPOKEN}`}
      </p>
    </Section>
  );
}
