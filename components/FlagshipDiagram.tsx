import type { ComponentType, ReactNode } from "react";

function Chip({
  tone,
  children,
}: {
  tone: "teal" | "amber" | "accent";
  children: ReactNode;
}) {
  const cls =
    tone === "teal" ? "tag-shipped" : tone === "amber" ? "tag-wip" : "border-accent-dim text-accent";
  return (
    <span className={`border px-1.5 py-0.5 font-mono text-[10px] tracking-wide ${cls}`}>
      {children}
    </span>
  );
}

function Node({ children }: { children: ReactNode }) {
  return (
    <div className="border border-line bg-bg px-3 py-2 text-center font-mono text-xs text-text-dim">
      {children}
    </div>
  );
}

function Row({
  label,
  tone,
  status,
}: {
  label: string;
  tone: "teal" | "amber";
  status: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-text-dim">{label}</span>
      <Chip tone={tone}>{status}</Chip>
    </div>
  );
}

function ArgentDiagram() {
  return (
    <div className="border border-line bg-bg-raised p-4">
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-text-faint">Balance</span>
        <span className="font-mono text-sm text-text">₹48,210.00</span>
      </div>
      <div className="mt-3 flex gap-2">
        <span className="border border-line px-3 py-1 font-mono text-xs text-text-dim">Send</span>
        <span className="border border-line px-3 py-1 font-mono text-xs text-text-dim">Request</span>
      </div>
      <div className="mt-4 flex flex-col gap-2 border-t border-line pt-3">
        <Row label="Rent" tone="teal" status="confirmed" />
        <Row label="Groceries" tone="teal" status="confirmed" />
        <Row label="To Ravi" tone="amber" status="pending" />
      </div>
      <p className="mt-3 text-xs text-text-faint">
        No signal — queued, retrying with backoff + jitter.
      </p>
    </div>
  );
}

function BasisDiagram() {
  return (
    <div className="border border-line bg-bg-raised p-4">
      <div className="grid grid-cols-2 gap-3">
        <Node>Android — Compose UI</Node>
        <Node>iOS — SwiftUI</Node>
      </div>
      <p className="my-2 text-center font-mono text-sm text-text-faint">↓</p>
      <div className="border border-accent-dim bg-bg px-3 py-2.5 text-center">
        <p className="font-mono text-xs text-accent">shared core (Kotlin)</p>
        <p className="mt-1 text-xs text-text-dim">valuation · cost basis · allocation</p>
        <div className="mt-2 flex justify-center gap-2">
          <Chip tone="teal">jvm ✓</Chip>
          <Chip tone="teal">kotlin/native ✓</Chip>
        </div>
      </div>
    </div>
  );
}

function SlateDiagram() {
  return (
    <div className="border border-line bg-bg-raised p-4">
      <div className="border-l-2 border-line pl-3">
        <p className="text-sm text-text-dim">&ldquo;Summarize my meeting notes&rdquo;</p>
        <p className="mt-1 font-mono text-xs text-teal">
          → on-device (litert) <span className="text-text-faint">· 40ms</span>
        </p>
      </div>
      <div className="mt-3 border-l-2 border-line pl-3">
        <p className="text-sm text-text-dim">&ldquo;Synthesize last quarter&rdquo;</p>
        <p className="mt-1 font-mono text-xs text-amber">
          → cloud escalation <span className="text-text-faint">· queued</span>
        </p>
      </div>
      <p className="mt-3 text-xs text-text-faint">
        rag: chunk → embed → retrieve · 12 tests
      </p>
    </div>
  );
}

function ModulithDiagram() {
  return (
    <div className="border border-line bg-bg-raised p-4">
      <div className="flex justify-center">
        <Node>:core</Node>
      </div>
      <p className="my-1.5 text-center font-mono text-xs text-text-faint">↑ ↑</p>
      <div className="grid grid-cols-2 gap-3">
        <Node>:feature-a</Node>
        <Node>:feature-b</Node>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs">
        <span className="font-mono text-text-faint">:feature-b → :feature-a</span>
        <Chip tone="amber">blocked</Chip>
      </div>
      <p className="mt-3 text-xs text-text-faint">
        checkModuleGraph fails the build on that edge.
      </p>
    </div>
  );
}

const DIAGRAMS: Record<string, ComponentType> = {
  "argent-android": ArgentDiagram,
  "basis-kmp": BasisDiagram,
  "slate-ai": SlateDiagram,
  modulith: ModulithDiagram,
};

export default function FlagshipDiagram({ slug }: { slug: string }) {
  const Diagram = DIAGRAMS[slug];
  if (!Diagram) return null;
  return <Diagram />;
}
