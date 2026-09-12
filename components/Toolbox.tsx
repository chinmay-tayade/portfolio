import { SKILL_GROUPS } from "@/lib/resume";
import SectionLabel from "@/components/SectionLabel";

export default function Toolbox() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-14">
      <SectionLabel>Toolbox</SectionLabel>

      <dl className="mt-6 flex flex-col gap-4">
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
    </section>
  );
}
