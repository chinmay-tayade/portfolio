import { PROCESS } from "@/lib/process";

export default function ProcessLoop() {
  return (
    <div
      className="grid gap-px overflow-hidden border border-line bg-line"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(9rem, 1fr))" }}
    >
      {PROCESS.map((step) => (
        <div key={step.n} className="bg-bg-raised p-4">
          <p className="font-mono text-[11px] tracking-widest text-text-faint">
            {step.n}
          </p>
          <p
            className={`mt-1 text-sm font-medium ${
              step.done ? "text-teal" : "text-text"
            }`}
          >
            {step.title}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-text-mute">
            {step.detail}
          </p>
        </div>
      ))}
    </div>
  );
}
