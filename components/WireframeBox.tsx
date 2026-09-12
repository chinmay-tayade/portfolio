import type { Row } from "@/lib/wireframes";

const TONE: Record<string, string> = {
  accent: "text-accent",
  teal: "text-teal",
  amber: "text-amber",
};

function textLen(row: Extract<Row, { segs: unknown[] }>) {
  return row.segs.reduce((n, s) => n + s.t.length, 0);
}

export default function WireframeBox({ rows, width = 46 }: { rows: Row[]; width?: number }) {
  const inner = width - 2;

  return (
    <pre className="overflow-x-auto border border-line bg-bg-raised p-4 font-mono text-[12px] leading-[1.7] text-text-faint">
      <code>
        {"┌" + "─".repeat(inner) + "┐"}
        {"\n"}
        {rows.map((row, i) =>
          row === "div" ? (
            <span key={i}>
              {"├" + "─".repeat(inner) + "┤"}
              {"\n"}
            </span>
          ) : (
            <span key={i}>
              {"│ "}
              {row.segs.map((s, j) => (
                <span key={j} className={s.c ? TONE[s.c] : undefined}>
                  {s.t}
                </span>
              ))}
              {" ".repeat(Math.max(0, inner - 1 - textLen(row)))}
              {"│\n"}
            </span>
          )
        )}
        {"└" + "─".repeat(inner) + "┘"}
      </code>
    </pre>
  );
}
