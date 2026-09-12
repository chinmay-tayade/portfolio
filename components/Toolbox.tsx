import { SKILL_GROUPS } from "@/lib/resume";
import Section from "@/components/Section";

export default function Toolbox() {
  return (
    <Section eyebrow="Stack" title="Toolbox.">
      <dl className="flex flex-col gap-4">
        {SKILL_GROUPS.map((g) => (
          <div key={g.label} className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <dt className="shrink-0 font-mono text-xs text-text-faint sm:w-28">
              {g.label}
            </dt>
            <dd className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-text-dim">
              {g.items.map((item) => (
                <span key={item} className="transition-colors hover:text-accent">
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
