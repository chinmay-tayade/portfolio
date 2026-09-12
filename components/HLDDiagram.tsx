import type { Component } from "@/lib/projects";

export default function HLDDiagram({ components }: { components: Component[] }) {
  if (components.length === 0) return null;

  return (
    <div className="flex flex-col">
      {components.map((c, i) => (
        <div key={c.name}>
          <div className="border border-line bg-bg-raised px-4 py-3">
            <p className="font-mono text-sm text-accent">{c.name}</p>
            <p className="mt-1 text-sm text-text-dim">{c.detail}</p>
          </div>
          {i < components.length - 1 && (
            <p className="py-1 text-center font-mono text-xs text-text-faint">↓</p>
          )}
        </div>
      ))}
    </div>
  );
}
