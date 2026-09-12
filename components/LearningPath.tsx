"use client";

import { useState } from "react";
import Link from "next/link";

export type LearningTopic = {
  id: string;
  num: string;
  title: string;
  short: string;
  wiki: string;
  repo: string;
  oneLiner: string;
  theory: string;
  tags: string[];
};

export const TOPICS: LearningTopic[] = [
  {
    id: "coroutines",
    num: "01",
    title: "Kotlin Coroutines",
    short: "Coroutines",
    wiki: "kotlin-coroutines",
    repo: "Learn-Kotlin-Coroutines",
    oneLiner: "Lightweight threads — async code that reads top to bottom.",
    theory:
      "A coroutine is not a thread. It's a unit of work that can suspend, freeing its thread, and resume later. Structured concurrency organises them into a tree: cancel the scope, and every coroutine in it is cancelled.",
    tags: ["suspend", "dispatchers", "scopes", "structured-concurrency"],
  },
  {
    id: "flow",
    num: "02",
    title: "Kotlin Flow",
    short: "Flow",
    wiki: "kotlin-flow",
    repo: "Learn-Kotlin-Flow",
    oneLiner: "Reactive streams on coroutines — cold by default.",
    theory:
      "A Flow produces a sequence of values over time: a builder produces, operators transform, a collector consumes. Nothing runs until you collect — that's what 'cold' means.",
    tags: ["cold-flow", "operators", "stateflow", "backpressure"],
  },
  {
    id: "mvvm",
    num: "03",
    title: "MVVM Architecture",
    short: "MVVM",
    wiki: "mvvm-architecture",
    repo: "MVVM-Architecture-Android",
    oneLiner: "Unidirectional data flow — the View never touches the data layer.",
    theory:
      "The View observes state and dispatches events. The ViewModel owns screen state and survives rotation. The repository hides the data source. Dagger wires the graph so nothing constructs its own collaborators.",
    tags: ["viewmodel", "stateflow", "di", "unidirectional"],
  },
  {
    id: "roadmap",
    num: "04",
    title: "Android Roadmap",
    short: "Roadmap",
    wiki: "android-roadmap",
    repo: "android-developer-roadmap",
    oneLiner: "The dependency-ordered map — the order is the content.",
    theory:
      "Nine stages, each a prerequisite for the next. You can't understand a ViewModel before the Activity lifecycle, or Coroutines before what a thread is. The value is the arrows, not the boxes.",
    tags: ["foundation", "ui", "networking", "architecture"],
  },
  {
    id: "javakotlin",
    num: "05",
    title: "From Java to Kotlin",
    short: "Java → Kotlin",
    wiki: "java-to-kotlin",
    repo: "from-java-to-kotlin",
    oneLiner: "Unlearning boilerplate, not memorising syntax.",
    theory:
      "Kotlin didn't add features so much as make Java's boilerplate patterns first-class. A 30-line POJO becomes a one-line data class; null-safety makes a whole class of bugs impossible to write.",
    tags: ["data-class", "null-safety", "when", "extensions"],
  },
];

function Node({ children, tone = "plain" }: { children: React.ReactNode; tone?: "plain" | "accent" | "teal" | "amber" }) {
  const cls =
    tone === "accent"
      ? "border-accent-dim bg-bg text-accent"
      : tone === "teal"
        ? "border-teal/40 bg-bg text-teal"
        : tone === "amber"
          ? "border-amber/40 bg-bg text-amber"
          : "border-line bg-bg text-text-dim";
  return (
    <div className={`border px-3 py-2 text-center font-mono text-xs ${cls}`}>{children}</div>
  );
}

function Down() {
  return <p className="py-1 text-center font-mono text-xs text-text-faint">↓</p>;
}

function CoroutineDiagram() {
  return (
    <div className="border border-line bg-bg-raised p-4">
      <div className="border border-accent-dim bg-bg px-3 py-2.5 text-center">
        <p className="font-mono text-xs text-accent">CoroutineScope (viewModelScope)</p>
      </div>
      <Down />
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Node tone="teal">launch { "{" }…{" }" }</Node>
          <p className="text-center font-mono text-[10px] text-text-faint">suspend · resume</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Node tone="teal">async { "{" }…{" }" }</Node>
          <p className="text-center font-mono text-[10px] text-text-faint">await() → result</p>
        </div>
      </div>
      <div className="mt-3 border-t border-line pt-2.5">
        <p className="font-mono text-xs text-text-faint">cancel the scope → every child is cancelled</p>
      </div>
    </div>
  );
}

function FlowDiagram() {
  return (
    <div className="border border-line bg-bg-raised p-4">
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <Node tone="accent">builder</Node>
        <span className="font-mono text-xs text-text-faint">→</span>
        <Node>map</Node>
        <span className="font-mono text-xs text-text-faint">→</span>
        <Node>debounce</Node>
        <span className="font-mono text-xs text-text-faint">→</span>
        <Node tone="amber">collect</Node>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-line pt-2.5 text-center">
        <p className="font-mono text-[10px] text-text-faint">flow{ "{" } emit { "}" }</p>
        <p className="font-mono text-[10px] text-text-faint">operators transform</p>
        <p className="font-mono text-[10px] text-text-faint">cold — runs on collect</p>
      </div>
    </div>
  );
}

function MvvmDiagram() {
  return (
    <div className="border border-line bg-bg-raised p-4">
      <div className="grid grid-cols-1 gap-1.5">
        <Node>View (Activity) — observes StateFlow</Node>
        <Down />
        <Node tone="accent">ViewModel — owns UiState</Node>
        <Down />
        <Node>Repository — single source of truth</Node>
        <Down />
        <Node tone="teal">NetworkService (Retrofit)</Node>
      </div>
      <div className="mt-3 border-t border-line pt-2.5">
        <p className="font-mono text-xs text-text-faint">Dagger provides the graph — one direction of travel</p>
      </div>
    </div>
  );
}

function RoadmapDiagram() {
  const stages = [
    "Foundation",
    "Core concepts",
    "UI",
    "Persistence",
    "Threading",
    "Networking",
    "Architecture",
    "Testing",
    "Release",
  ];
  return (
    <div className="border border-line bg-bg-raised p-4">
      <div className="flex flex-col gap-1">
        {stages.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className="w-7 shrink-0 font-mono text-[10px] text-text-faint">{i + 1}</span>
            <div
              className={`flex-1 border px-3 py-1.5 font-mono text-xs ${
                i === stages.length - 1 ? "border-accent-dim bg-bg text-accent" : "border-line bg-bg text-text-dim"
              }`}
            >
              {s}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 border-t border-line pt-2.5 font-mono text-xs text-text-faint">
        each stage assumes the ones before it
      </p>
    </div>
  );
}

function JavaKotlinDiagram() {
  const rows: [string, string, string][] = [
    ["POJO → data class", "~30 lines + getters/setters", "data class Dev(var name: String)"],
    ["null handling", "if (x != null) { … }", "x?.length  ·  x ?: \"\""],
    ["switch → when", "switch + break", "when (score) { 9, 10 -> … }"],
    ["static utils → extensions", "Utils.triple(3)", "3.triple()"],
  ];
  return (
    <div className="border border-line bg-bg-raised p-4">
      <div className="grid grid-cols-[1fr_1fr] gap-px border border-line bg-line font-mono text-[10px] text-text-faint">
        <span className="bg-bg-raised px-2 py-1.5">Java</span>
        <span className="bg-bg-raised px-2 py-1.5">Kotlin</span>
      </div>
      <div className="flex flex-col gap-2 pt-3">
        {rows.map(([label, java, kotlin]) => (
          <div key={label} className="flex flex-col gap-1">
            <p className="font-mono text-[10px] text-accent">{label}</p>
            <div className="grid grid-cols-2 gap-2">
              <Node>{java}</Node>
              <Node tone="teal">{kotlin}</Node>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const DIAGRAMS: Record<string, () => React.ReactElement> = {
  coroutines: CoroutineDiagram,
  flow: FlowDiagram,
  mvvm: MvvmDiagram,
  roadmap: RoadmapDiagram,
  javakotlin: JavaKotlinDiagram,
};

export default function LearningPath() {
  const [active, setActive] = useState(TOPICS[0].id);
  const topic = TOPICS.find((t) => t.id === active)!;
  const Diagram = DIAGRAMS[topic.id];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {TOPICS.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 border px-3 py-2 font-mono text-xs transition-colors ${
                isActive
                  ? "border-accent bg-accent-dim text-accent-light"
                  : "border-line bg-bg-raised text-text-dim hover:border-accent-dim hover:text-text"
              }`}
            >
              <span className={isActive ? "text-accent-light" : "text-text-faint"}>{t.num}</span>
              {t.short}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-display text-xl font-medium text-text sm:text-2xl">{topic.title}</h3>
            <p className="mt-1 font-mono text-xs text-accent-light">{topic.oneLiner}</p>
          </div>
          <p className="text-sm leading-relaxed text-text-dim sm:text-base">{topic.theory}</p>

          <div className="mt-auto flex flex-wrap gap-4 pt-2 font-mono text-xs">
            <Link
              href={`/wiki/${topic.wiki}`}
              className="text-accent-light underline decoration-line underline-offset-4 transition-colors hover:text-accent"
            >
              read the wiki note →
            </Link>
            <Link
              href={`/projects/${topic.repo}`}
              className="text-accent-light underline decoration-line underline-offset-4 transition-colors hover:text-accent"
            >
              browse the code ↗
            </Link>
          </div>

          <p className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-text-faint">
            {topic.tags.map((t) => (
              <span key={t}>#{t}</span>
            ))}
          </p>
        </div>

        <div>{Diagram && <Diagram />}</div>
      </div>
    </div>
  );
}
