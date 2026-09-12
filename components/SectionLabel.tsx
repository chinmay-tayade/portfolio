import type { ReactNode } from "react";

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 font-mono text-sm text-text-dim">
      <span className="section-dot h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden />
      {children}
    </h2>
  );
}
