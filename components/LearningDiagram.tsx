type Tone = "plain" | "accent" | "teal" | "amber";

function toneClass(tone: Tone) {
  switch (tone) {
    case "accent":
      return "border-accent-dim bg-bg text-accent";
    case "teal":
      return "border-teal/40 bg-bg text-teal";
    case "amber":
      return "border-amber/40 bg-bg text-amber";
    default:
      return "border-line bg-bg text-text-dim";
  }
}

function Box({ children, tone = "plain", className = "" }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return (
    <div className={`border px-3 py-2 text-center font-mono text-xs ${toneClass(tone)} ${className}`}>
      {children}
    </div>
  );
}

function VArrow() {
  return <p className="py-1 text-center font-mono text-xs text-text-faint">↓</p>;
}

function RArrow() {
  return <span className="font-mono text-xs text-text-faint">→</span>;
}

function Foot({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 border-t border-line pt-2.5">
      <p className="font-mono text-xs text-text-faint">{children}</p>
    </div>
  );
}

function CoroutinesDiagram() {
  return (
    <div className="flex flex-col gap-3">
      <div className="border border-line bg-bg-raised p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-faint">
          Dispatchers — which thread
        </p>
        <div className="grid grid-cols-3 gap-2">
          <Box tone="accent">Main · UI</Box>
          <Box tone="teal">IO · blocking I/O</Box>
          <Box>Default · CPU</Box>
        </div>
      </div>

      <div className="border border-line bg-bg-raised p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-faint">
          Structured concurrency — the tree
        </p>
        <Box tone="accent" className="mx-auto max-w-[16rem]">
          CoroutineScope (viewModelScope)
        </Box>
        <VArrow />
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Box tone="teal">launch { "{" } … { "}" }</Box>
            <p className="text-center font-mono text-[10px] text-text-faint">suspend → resume</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Box tone="teal">async { "{" } … { "}" }</Box>
            <p className="text-center font-mono text-[10px] text-text-faint">await() → result</p>
          </div>
        </div>
        <Foot>cancel the scope → every child is cancelled</Foot>
      </div>
    </div>
  );
}

function FlowDiagram() {
  return (
    <div className="flex flex-col gap-3">
      <div className="border border-line bg-bg-raised p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-faint">
          The pipeline — producer → transformer → consumer
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <Box tone="accent">builder</Box>
          <RArrow />
          <Box>map</Box>
          <RArrow />
          <Box>filter</Box>
          <RArrow />
          <Box>debounce</Box>
          <RArrow />
          <Box tone="amber">collect</Box>
        </div>
        <Foot>nothing runs until the terminal operator subscribes</Foot>
      </div>

      <div className="border border-line bg-bg-raised p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-faint">
          Cold vs hot
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-line bg-bg p-3">
            <p className="font-mono text-xs text-accent">cold — flow{ "{" } { "}" }</p>
            <p className="mt-1 text-xs text-text-dim">runs once per collector, from the start</p>
          </div>
          <div className="border border-line bg-bg p-3">
            <p className="font-mono text-xs text-teal">hot — StateFlow</p>
            <p className="mt-1 text-xs text-text-dim">emits regardless; late collectors see latest</p>
          </div>
        </div>
        <Foot>instant search = debounce + filter + distinctUntilChanged + flatMapLatest</Foot>
      </div>
    </div>
  );
}

function MvvmDiagram() {
  return (
    <div className="flex flex-col gap-3">
      <div className="border border-line bg-bg-raised p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-faint">
          Unidirectional data flow
        </p>
        <Box>View (Activity) — observes StateFlow</Box>
        <VArrow />
        <Box tone="accent">ViewModel — owns UiState</Box>
        <VArrow />
        <Box>Repository — single source of truth</Box>
        <VArrow />
        <div className="grid grid-cols-2 gap-2">
          <Box tone="teal">NetworkService (Retrofit)</Box>
          <Box>Room / cache</Box>
        </div>
        <Foot>the View never reaches past the ViewModel</Foot>
      </div>

      <div className="border border-line bg-bg-raised p-4">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-faint">
          Dependency injection
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <Box tone="amber">Dagger module</Box>
          <RArrow />
          <Box>provides</Box>
          <RArrow />
          <Box tone="accent">ViewModel</Box>
        </div>
        <Foot>nothing constructs its own collaborators</Foot>
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
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-faint">
        The nine stages, in dependency order
      </p>
      <div className="flex flex-col gap-1">
        {stages.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className="w-6 shrink-0 text-right font-mono text-[10px] text-text-faint">{i + 1}</span>
            <div
              className={`flex-1 border px-3 py-1.5 font-mono text-xs ${
                i === stages.length - 1
                  ? "border-accent-dim bg-bg text-accent"
                  : "border-line bg-bg text-text-dim"
              }`}
            >
              {s}
            </div>
            {[0, 4, 6].includes(i) && (
              <span className="shrink-0 font-mono text-[10px] text-teal">↳ repo</span>
            )}
          </div>
        ))}
      </div>
      <Foot>stages 1, 5 and 7 map to the runnable repos in this collection</Foot>
    </div>
  );
}

function JavaKotlinDiagram() {
  const rows: [string, string, string][] = [
    ["POJO → data class", "~30 lines + getters/setters", "data class Dev(var name: String)"],
    ["null handling", "if (x != null) { … }", "x?.length  ·  x ?: \"\""],
    ["switch → when", "switch + break", "when (score) { 9, 10 -> … }"],
    ["static utils → extensions", "Utils.triple(3)", "3.triple()"],
    ["type check + cast", "(Car) obj", "if (obj is Car) { … }  // smart cast"],
  ];
  return (
    <div className="border border-line bg-bg-raised p-4">
      <div className="grid grid-cols-[1fr_1fr] gap-px border border-line bg-line font-mono text-[10px] text-text-faint">
        <span className="bg-bg-raised px-2 py-1.5">Java</span>
        <span className="bg-bg-raised px-2 py-1.5">Kotlin</span>
      </div>
      <div className="flex flex-col gap-2.5 pt-3">
        {rows.map(([label, java, kotlin]) => (
          <div key={label} className="flex flex-col gap-1">
            <p className="font-mono text-[10px] text-accent">{label}</p>
            <div className="grid grid-cols-2 gap-2">
              <Box>{java}</Box>
              <Box tone="teal">{kotlin}</Box>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const DIAGRAMS: Record<string, () => React.ReactElement> = {
  "kotlin-coroutines": CoroutinesDiagram,
  "kotlin-flow": FlowDiagram,
  "mvvm-architecture": MvvmDiagram,
  "android-roadmap": RoadmapDiagram,
  "java-to-kotlin": JavaKotlinDiagram,
};

export default function LearningDiagram({ slug }: { slug: string }) {
  const Diagram = DIAGRAMS[slug];
  if (!Diagram) return null;
  return <Diagram />;
}
