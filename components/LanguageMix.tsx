import { languageBreakdown } from "@/lib/language";
import type { Repo } from "@/lib/github";

export default function LanguageMix({ repos }: { repos: Repo[] }) {
  const slices = languageBreakdown(repos);
  const total = repos.length;

  return (
    <div className="mt-6">
      <div className="flex h-2.5 w-full overflow-hidden rounded-[3px]">
        {slices.map((s, i) => (
          <div
            key={s.label}
            style={{
              width: `${(s.count / total) * 100}%`,
              background: s.hex,
              marginLeft: i === 0 ? 0 : "2px",
            }}
            title={`${s.label} — ${s.count}`}
          />
        ))}
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs">
        {slices.map((s) => (
          <li key={s.label} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 shrink-0 rounded-sm"
              style={{ background: s.hex }}
              aria-hidden
            />
            <span className="text-text-dim">{s.label}</span>
            <span className="text-text-faint">{s.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
