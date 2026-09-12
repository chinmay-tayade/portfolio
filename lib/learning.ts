export type Concept = {
  title: string;
  body: string;
  tone?: "accent" | "teal" | "amber";
};

export type Example = {
  n: number;
  title: string;
  teaches: string;
};

export type Compare = {
  label: string;
  java: string;
  kotlin: string;
  note?: string;
};

export type Stage = {
  n: number;
  title: string;
  detail: string;
  linkLabel?: string;
  href?: string;
};

export type LearningTopic = {
  slug: string;
  emoji: string;
  title: string;
  subtitle: string;
  order: number;
  repo: string; // GitHub repo name
  wikiSlug: string; // /wiki/[slug]
  oneLiner: string;
  intro: string[];
  concepts: Concept[];
  examples?: Example[];
  stages?: Stage[];
  comparisons?: Compare[];
  takeaway: string;
};

export const LEARNING_TOPICS: LearningTopic[] = [
  {
    slug: "kotlin-coroutines",
    emoji: "🌀",
    title: "Kotlin Coroutines",
    subtitle: "Concurrency without the thread-per-task tax",
    order: 1,
    repo: "Learn-Kotlin-Coroutines",
    wikiSlug: "kotlin-coroutines",
    oneLiner: "Lightweight threads that make async code read top-to-bottom.",
    intro: [
      "A coroutine is Kotlin's answer to a problem that predates Kotlin: asynchronous work — a network call, a disk read, a timer — doesn't fit the synchronous \"do this, then this\" shape most code is written in. The old ways were callbacks (nested, error-prone) and threads (heavy, expensive, dangerous to coordinate). Coroutines are a third way: a block of code that can pause at a suspension point and resume later, without holding a thread hostage while it waits.",
      "The mental model to hold onto: a coroutine is not a thread. It's a lightweight unit of work that runs on a thread, can be moved between threads, and — critically — can suspend, freeing its thread to run something else. You can have thousands of coroutines on a handful of threads, where thousands of threads would collapse under their own weight.",
    ],
    concepts: [
      {
        title: "suspend",
        body: "A suspend function can pause and resume without blocking a thread. It carries a hidden continuation that remembers where it paused and what its locals were.",
        tone: "accent",
      },
      {
        title: "launch vs async",
        body: "launch fires a coroutine and forgets it; async fires one and hands back a Deferred you await for a result. Fire-and-forget vs. get-a-result.",
      },
      {
        title: "Dispatchers",
        body: "Decide which thread a coroutine runs on — Main for UI, IO for blocking I/O, Default for CPU-bound work.",
        tone: "teal",
      },
      {
        title: "Structured concurrency",
        body: "Work is a tree. Cancel the scope and every child is cancelled; a child's failure is reported to its parent. No orphaned coroutines.",
        tone: "accent",
      },
      {
        title: "Scopes",
        body: "viewModelScope and lifecycleScope tie work to a screen's lifetime and auto-cancel it when the screen dies.",
        tone: "teal",
      },
      {
        title: "Cooperative cancellation",
        body: "A coroutine checks a cancellation flag at every suspension point. A tight non-suspending loop must call yield() or ensureActive() to be cancellable.",
        tone: "amber",
      },
    ],
    examples: [
      { n: 1, title: "Single Network Call", teaches: "the simplest coroutine network call" },
      { n: 2, title: "Series Network Calls", teaches: "two calls where the second depends on the first" },
      { n: 3, title: "Parallel Network Calls", teaches: "independent calls running concurrently via async + awaitAll" },
      { n: 4, title: "Room DB Operation", teaches: "coroutines with Room" },
      { n: 5, title: "Long Running Task", teaches: "a background task off the main thread" },
      { n: 6, title: "Two Long Running Tasks", teaches: "two tasks in parallel" },
      { n: 7, title: "Timeout", teaches: "withTimeout — cancelling a task past a deadline" },
      { n: 8, title: "Try-Catch Error Handling", teaches: "catching exceptions inside a coroutine" },
      { n: 9, title: "CoroutineExceptionHandler", teaches: "centralized error handling" },
      { n: 10, title: "Ignore Error & Continue", teaches: "supervisorScope — one failure doesn't kill siblings" },
      { n: 11, title: "Unit Test", teaches: "testing a coroutine-based ViewModel" },
    ],
    takeaway:
      "Series vs parallel is the same operation with a different structure: withContext back-to-back waits for each call; async + awaitAll runs them together. The choice is simply which structure you write — and structured concurrency guarantees the tree of work is torn down with its owner.",
  },
  {
    slug: "kotlin-flow",
    emoji: "🌊",
    title: "Kotlin Flow",
    subtitle: "Reactive streams on coroutines",
    order: 2,
    repo: "Learn-Kotlin-Flow",
    wikiSlug: "kotlin-flow",
    oneLiner: "A sequence of values over time, produced, transformed, and collected.",
    intro: [
      "If a coroutine answers \"run this work,\" a Flow answers \"stream this data.\" A coroutine produces one result (or none, or throws); a Flow produces a sequence of values over time — a live database query, a progress tick, a search box that emits as the user types. Flow is Kotlin's reactive-streams library, rebuilt on the coroutine machinery, so it inherits cancellation and structured concurrency for free.",
      "Every Flow is three pieces wired together: a builder produces values, operators transform the stream, and a terminal operator collects it. Understand those three and every operator is just an instance of one of them.",
    ],
    concepts: [
      {
        title: "Cold by default",
        body: "A flow { } doesn't run when you build it — only when something collects it, and once per collector. No background work unless a consumer is listening.",
        tone: "accent",
      },
      {
        title: "Builders",
        body: "flow { emit(x) } for imperative logic, flowOf(1,2,3) for a fixed set, asFlow() to lift a collection, callbackFlow to bridge a callback API.",
      },
      {
        title: "Operators",
        body: "map, filter, debounce, zip, flatMapLatest, retry — transform the stream between builder and collector. Operators are themselves flows that collect upstream and emit downstream.",
        tone: "teal",
      },
      {
        title: "Terminal operators",
        body: "collect, toList, first, reduce — what ends the stream. Nothing runs until one subscribes.",
      },
      {
        title: "StateFlow / SharedFlow",
        body: "The hot flows. StateFlow holds one value for UI state and conflates updates; SharedFlow broadcasts events. Late collectors see the latest, not history.",
        tone: "accent",
      },
      {
        title: "Backpressure",
        body: "A slow collector makes the producer wait by default. Use buffer, conflate, or collectLatest to say explicitly how to handle a producer that outpaces the collector.",
        tone: "amber",
      },
    ],
    examples: [
      { n: 1, title: "Single Network Call", teaches: "the simplest Flow network call" },
      { n: 2, title: "Series Network Calls", teaches: "dependent calls in sequence" },
      { n: 3, title: "Parallel Network Calls", teaches: "independent calls combined with zip" },
      { n: 4, title: "Room DB Operation", teaches: "Flow with Room" },
      { n: 5, title: "Long Running Task", teaches: "a background task as a Flow" },
      { n: 6, title: "Two Long Running Tasks", teaches: "two tasks in parallel" },
      { n: 7, title: "Catch Error Handling", teaches: "the catch operator" },
      { n: 8, title: "EmitAll Error Handling", teaches: "recovering with a fallback flow" },
      { n: 9, title: "Completion", teaches: "onCompletion" },
      { n: 10, title: "Reduce", teaches: "the reduce operator" },
      { n: 11, title: "Map", teaches: "the map operator" },
      { n: 12, title: "Filter", teaches: "the filter operator" },
      { n: 13, title: "Search Feature", teaches: "instant search: debounce + filter + distinctUntilChanged + flatMapLatest" },
      { n: 14, title: "Retry", teaches: "the retry operator" },
      { n: 15, title: "RetryWhen", teaches: "conditional retry" },
      { n: 16, title: "Retry with Exponential Backoff", teaches: "backing off between retries" },
      { n: 17, title: "Unit Test", teaches: "testing a Flow-based ViewModel" },
    ],
    takeaway:
      "The entire instant-search feature is four operators chained: debounce (wait for a pause) + filter (drop empties) + distinctUntilChanged (dedupe) + flatMapLatest (only the latest). Once you can read a chain like that, you can read any Flow.",
  },
  {
    slug: "mvvm-architecture",
    emoji: "🏛️",
    title: "MVVM Architecture",
    subtitle: "Unidirectional data flow in a UI",
    order: 3,
    repo: "MVVM-Architecture-Android",
    wikiSlug: "mvvm-architecture",
    oneLiner: "The View observes state; the ViewModel owns it; the repository hides the data.",
    intro: [
      "MVVM — Model-View-ViewModel — is a way of structuring a screen so the rules of the UI are testable without a device, and the View is reduced to rendering. It's one of a family (MVP, MVI, MVVM) that all solve the same problem: if the interesting logic lives inside an Activity, it can't be tested except on an emulator, and it entangles business rules with Android framework code.",
      "The core discipline is one direction of travel: the View observes state and dispatches events; it never reaches past the ViewModel to the data layer. The ViewModel holds all screen state and survives configuration changes. The repository hides where data comes from. Dependency injection wires the graph so nothing constructs its own collaborators.",
    ],
    concepts: [
      {
        title: "Unidirectional data flow",
        body: "View → ViewModel (intent), ViewModel → View (immutable state), ViewModel → Model (repository). The View never calls the Model directly.",
        tone: "accent",
      },
      {
        title: "ViewModel",
        body: "A screen's state holder. Survives rotation because the framework holds it across Activity recreation. No View reference — which is what makes it testable.",
        tone: "accent",
      },
      {
        title: "UiState",
        body: "A sealed class (Loading / Success / Error) exposed as a StateFlow, so the UI can't render a state the data can't actually be in.",
        tone: "teal",
      },
      {
        title: "Repository",
        body: "The single source of truth the ViewModel calls. It hides whether data comes from network, database, or cache.",
      },
      {
        title: "Dependency injection",
        body: "Dagger modules declare how to build deps; components declare where they're available. The ViewModel is given its repository rather than instantiating it.",
        tone: "teal",
      },
      {
        title: "StateFlow",
        body: "The View collects a StateFlow<UiState> and re-renders on every emission. State is immutable and conflated — no partial-update bugs.",
        tone: "amber",
      },
    ],
    examples: [
      { n: 1, title: "data/model", teaches: "Article, Source, TopHeadlinesResponse" },
      { n: 2, title: "data/api", teaches: "the Retrofit NetworkService interface" },
      { n: 3, title: "data/repository", teaches: "TopHeadlineRepository — the single source of truth" },
      { n: 4, title: "di", teaches: "Dagger modules, components, qualifiers, scopes" },
      { n: 5, title: "ui/base", teaches: "UiState + ViewModelProviderFactory" },
      { n: 6, title: "ui/topheadline", teaches: "the Activity, ViewModel, and Adapter" },
    ],
    takeaway:
      "The rule that makes MVVM work: the View never talks to the data layer directly. It only talks to the ViewModel, which exposes immutable UiState. Dagger wires the dependencies together so nothing constructs its own collaborators — and a ViewModel that can't be given a fake repository can't be tested, which guts the reason MVVM exists.",
  },
  {
    slug: "android-roadmap",
    emoji: "🗺️",
    title: "Android Developer Roadmap",
    subtitle: "The dependency-ordered map",
    order: 4,
    repo: "android-developer-roadmap",
    wikiSlug: "android-roadmap",
    oneLiner: "Nine stages, each a prerequisite for the next — the order is the content.",
    intro: [
      "Most roadmaps for Android are a flat list of keywords: Kotlin, Compose, Coroutines, Room, Retrofit, MVVM. A flat list hides the thing that actually matters — that these topics have an order, and learning them out of order is why most people stall. You can't understand a ViewModel before the Activity lifecycle it survives; you can't understand Coroutines before what a thread is and why blocking the main one is bad.",
      "This roadmap's value is the arrows, not the boxes. Each stage assumes the ones before it, so you're never asked to understand something that builds on a topic you haven't reached yet.",
    ],
    concepts: [
      {
        title: "Foundation",
        body: "Java and Kotlin, and Android Studio — the language and the tool. Everything else is written in and built with these.",
      },
      {
        title: "Core concepts",
        body: "Activity, Service, BroadcastReceiver, ContentProvider, Intents, and the Activity lifecycle. How an app is shaped before you draw a pixel.",
      },
      {
        title: "Concurrency",
        body: "Threads, then Coroutines, then Flow, then WorkManager. The #1 crash source and the #1 interview topic.",
        tone: "accent",
      },
      {
        title: "Architecture",
        body: "MVVM/MVI, dependency injection, Clean Architecture. How code stays maintainable as it scales.",
        tone: "accent",
      },
      {
        title: "Order beats completeness",
        body: "A hundred topics in no order produces engineers who know names but not relationships. Treat each stage as a prerequisite.",
        tone: "amber",
      },
      {
        title: "Learn by building",
        body: "Each stage maps to a runnable repo — 'learn it' always means 'build and run something', not 'tick a checkbox'.",
        tone: "teal",
      },
    ],
    stages: [
      { n: 1, title: "Foundation", detail: "Java, Kotlin, Android Studio — the language and the tool.", linkLabel: "Java → Kotlin cheat sheet", href: "/learn/java-to-kotlin" },
      { n: 2, title: "Core concepts", detail: "Components, Intents, and the Activity lifecycle.", linkLabel: "How an app launches", href: "/wiki/app-launch-sequence" },
      { n: 3, title: "User interface", detail: "Views, ViewGroups, RecyclerView, Fragments." },
      { n: 4, title: "Persistence", detail: "SharedPreferences, DataStore, Room, files." },
      { n: 5, title: "Threading & concurrency", detail: "Threads, then Coroutines, then Flow, then WorkManager.", linkLabel: "Coroutines · Flow", href: "/learn/kotlin-coroutines" },
      { n: 6, title: "Networking", detail: "OkHttp, Retrofit, JSON, OAuth, status codes." },
      { n: 7, title: "Architecture", detail: "MVVM / MVI, dependency injection, Clean Architecture.", linkLabel: "MVVM sample app", href: "/learn/mvvm-architecture" },
      { n: 8, title: "Testing & quality", detail: "Unit and instrumentation tests, debugging, memory." },
      { n: 9, title: "Advanced & release", detail: "Compose, Firebase, security, signing, the Play Store." },
    ],
    takeaway:
      "Work top-to-bottom and don't skip ahead — stage N is the foundation for stage N+1, and a gap at stage 3 will quietly destabilise you at stage 7. When you hit a wall later, the wall is usually a prerequisite you glossed over, not the current topic.",
  },
  {
    slug: "java-to-kotlin",
    emoji: "☕",
    title: "From Java to Kotlin",
    subtitle: "Unlearning boilerplate, not memorising syntax",
    order: 5,
    repo: "from-java-to-kotlin",
    wikiSlug: "java-to-kotlin",
    oneLiner: "Every pairing is the same lesson: a Java pattern you typed by habit became a language feature.",
    intro: [
      "Moving from Java to Kotlin is frequently framed as \"learn the new syntax,\" which gets it backwards. The syntax is the easy part. The actual migration is unlearning the habits Java forced on you — the getters and setters, the null checks everywhere, the anonymous inner classes — and trusting a language that lets you write the intent in one line instead of thirty.",
      "The language is opinionated on purpose: it wants you to write less, and to write code where the bugs you'd normally write can't be written.",
    ],
    concepts: [
      {
        title: "Null-safety",
        body: "Types are non-null by default; opt in with ?. The compiler forces you to handle nullability before you use the value — whole classes of NPE become impossible to write.",
        tone: "accent",
      },
      {
        title: "val vs var",
        body: "Read-only vs mutable. Read-only is the default you should reach for; it's like final but the norm.",
      },
      {
        title: "data class",
        body: "A full POJO — getters, setters, equals, hashCode, toString — collapses to one line. The single biggest productivity win in the language.",
        tone: "accent",
      },
      {
        title: "when",
        body: "switch becomes an expression that returns a value and needs no break. It reads like the decision, not the control flow.",
        tone: "teal",
      },
      {
        title: "Extension functions",
        body: "fun Int.triple() means 3.triple() instead of Utils.triple(3). Add methods to types you don't own, without inheritance.",
        tone: "teal",
      },
      {
        title: "Smart casts",
        body: "if (obj is Car) { … } — the compiler already knows obj is a Car inside the block. No explicit cast.",
        tone: "amber",
      },
    ],
    comparisons: [
      { label: "Print", java: "System.out.println(\"Hi\");", kotlin: "println(\"Hi\")" },
      { label: "Variables", java: "final String name = \"John\";", kotlin: "val name = \"John\"" },
      { label: "Null-safe access", java: "if (text != null) { text.length(); }", kotlin: "text?.length", note: "or text ?: \"\" for a default" },
      { label: "POJO", java: "~30 lines of getters/setters/equals", kotlin: "data class Dev(var name: String)" },
      { label: "Switch", java: "switch (x) { case 1: …; break; }", kotlin: "when (x) { 1 -> … }" },
      { label: "For loop", java: "for (int i = 1; i <= 10; i++)", kotlin: "for (i in 1..10)" },
      { label: "Static util", java: "Utils.triple(3)", kotlin: "3.triple()", note: "extension function" },
      { label: "Type check + cast", java: "if (obj instanceof Car) { (Car) obj; }", kotlin: "if (obj is Car) { … }", note: "smart cast" },
    ],
    takeaway:
      "New Kotlin developers translate Java line-by-line and produce Kotlin that looks like Java with shorter keywords. The moment they get it is when they start reaching for the construct that expresses the intent — and the boilerplate disappears on its own.",
  },
];

export function getLearningTopic(slug: string): LearningTopic | undefined {
  return LEARNING_TOPICS.find((t) => t.slug === slug);
}

export function learningByRepo(repo: string): LearningTopic | undefined {
  return LEARNING_TOPICS.find((t) => t.repo === repo);
}

export function orderedLearning(): LearningTopic[] {
  return [...LEARNING_TOPICS].sort((a, b) => a.order - b.order);
}
