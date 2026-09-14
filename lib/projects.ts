export type Component = { name: string; detail: string };

export type ProjectDoc = {
  slug: string;
  oneLiner: string;
  stack: string[];
  hld: { summary: string; components: Component[] };
  lld?: { summary: string; points: string[] };
};

export const PROJECTS: ProjectDoc[] = [
  {
    slug: "Learn-Kotlin-Coroutines",
    oneLiner:
      "Learn-by-example Android project teaching Kotlin Coroutines through runnable network, Room, timeout, and error-handling examples.",
    stack: ["Kotlin", "Coroutines", "Retrofit", "Room", "MVVM"],
    hld: {
      summary:
        "A teaching app structured as a menu of self-contained examples — each concept is an Activity + ViewModel pair you can open, read, and run in isolation, so theory is always backed by a runnable screen.",
      components: [
        { name: "data/api", detail: "Retrofit ApiHelper, ApiService, RetrofitBuilder for network examples" },
        { name: "data/local", detail: "Room AppDatabase, UserDao, DatabaseHelper for the DB example" },
        { name: "ui/retrofit", detail: "single, series, and parallel network calls" },
        { name: "ui/task", detail: "one and two long-running background tasks" },
        { name: "ui/timeout", detail: "withTimeout — cancelling a task past a deadline" },
        { name: "ui/errorhandling", detail: "try/catch, CoroutineExceptionHandler, supervisorScope" },
        { name: "ui/base", detail: "shared UiState, adapters, and a ViewModelFactory" },
      ],
    },
    lld: {
      summary: "The teaching thesis: series vs parallel is the same operation with a different structure — and the repo makes you read both.",
      points: [
        "Series calls = withContext back-to-back; parallel = async + awaitAll — the example index links both side by side",
        "Every ViewModel exposes a sealed UiState (Loading / Success / Error) so the UI can't render an invalid state",
        "supervisorScope example shows one failing child not killing its siblings — the exception model in a runnable form",
      ],
    },
  },
  {
    slug: "Learn-Kotlin-Flow",
    oneLiner:
      "Master Kotlin Flow through real Android examples — operators, network, Room, instant search, retry, and error handling.",
    stack: ["Kotlin", "Flow", "Retrofit", "Room", "Coroutines"],
    hld: {
      summary:
        "A menu of 17 runnable Flow examples, each isolating one operator or pattern — the same learn-by-example shape as the Coroutines repo, applied to reactive streams.",
      components: [
        { name: "data/api", detail: "Retrofit ApiHelper/ApiService, RetrofitBuilder" },
        { name: "data/local", detail: "Room AppDatabase, UserDao, DatabaseHelper" },
        { name: "ui/retrofit", detail: "single / series / parallel network calls via Flow" },
        { name: "ui/search", detail: "instant search: debounce + filter + distinctUntilChanged + flatMapLatest" },
        { name: "ui/retry", detail: "retry / retryWhen / exponential backoff" },
        { name: "ui/operators", detail: "map, filter, reduce, completion, flowOn" },
        { name: "ui/errorhandling", detail: "catch and emitAll fallbacks" },
      ],
    },
    lld: {
      summary: "Each example is a self-contained Activity + ViewModel pair; the index table links straight to the source.",
      points: [
        "Instant search is the flagship: debounce + distinctUntilChanged + flatMapLatest collapse the whole 'search as you type' recipe into one screen",
        "Parallel network calls via zip — two independent flows combined pairwise",
        "Retry with exponential backoff is shown as a runnable example, not a paragraph",
      ],
    },
  },
  {
    slug: "MVVM-Architecture-Android",
    oneLiner:
      "A minimal but complete MVVM sample — Dagger for DI, Retrofit for networking, Coroutines + Flow + StateFlow for reactive UI state.",
    stack: ["Kotlin", "MVVM", "Dagger", "Retrofit", "StateFlow"],
    hld: {
      summary:
        "One screen fetching news headlines, wired with the tools a production app uses — deliberately small so the entire architecture can be held in your head at once.",
      components: [
        { name: "data/model", detail: "Article, Source, TopHeadlinesResponse" },
        { name: "data/api", detail: "Retrofit NetworkService interface" },
        { name: "data/repository", detail: "TopHeadlineRepository — the single source of truth the ViewModel calls" },
        { name: "di", detail: "Dagger ApplicationModule/ActivityModule, components, qualifiers, scopes" },
        { name: "ui/base", detail: "UiState + ViewModelProviderFactory" },
        { name: "ui/topheadline", detail: "Activity, ViewModel, Adapter" },
      ],
    },
    lld: {
      summary: "The load-bearing idea is the unidirectional data flow: View → ViewModel → Repository, with Dagger wiring the graph.",
      points: [
        "View observes a StateFlow<UiState>; it never talks to the data layer directly",
        "Dagger modules declare how to build deps, components declare where they're available — nothing constructs its own collaborators",
        "A sealed UiState (Loading / Success / Error) keeps the UI out of invalid states",
      ],
    },
  },
  {
    slug: "android-developer-roadmap",
    oneLiner:
      "The complete, stage-by-stage map to becoming an Android engineer — from Hello World to shipping on the Play Store.",
    stack: ["Android", "Kotlin", "Roadmap", "Docs"],
    hld: {
      summary:
        "A dependency-ordered roadmap rather than a flat topic list — every stage assumes the ones before it, so you're never asked to understand a ViewModel before the Activity lifecycle.",
      components: [
        { name: "Foundation", detail: "Java, Kotlin, Android Studio, project structure" },
        { name: "Core concepts", detail: "components, Intents, lifecycles" },
        { name: "UI", detail: "Views, ViewGroups, RecyclerView, Fragments" },
        { name: "Persistence", detail: "SharedPrefs, DataStore, Room, files" },
        { name: "Threading", detail: "threads, Coroutines, Flow, WorkManager" },
        { name: "Networking", detail: "Retrofit, OkHttp, JSON, OAuth2" },
        { name: "Architecture", detail: "MVVM/MVI, DI, Clean Architecture" },
        { name: "Testing & release", detail: "unit/instrumentation, debugging, signing, Play Store" },
      ],
    },
    lld: {
      summary: "The roadmap's value is the arrows, not the boxes — the order is the content.",
      points: [
        "Nine stages in strict dependency order, each rendered as a collapsible topic table",
        "A timeline diagram maps the stages onto a week-by-week progression",
        "The repos in this collection map one-to-one onto stages 1–7, so 'learn it' always means 'build and run it'",
      ],
    },
  },
  {
    slug: "from-java-to-kotlin",
    oneLiner:
      "Your interactive cheat sheet for the Java → Kotlin transition — every concept, side by side, with the 'why' noted.",
    stack: ["Kotlin", "Java", "Docs"],
    hld: {
      summary:
        "A Java → Kotlin reference organised as a cheat sheet — each row shows the Java way next to the idiomatic Kotlin way, so the migration is a lookup, not a memorisation exercise.",
      components: [
        { name: "Basics", detail: "printing, variables, null-safety" },
        { name: "Strings", detail: "templates, multiline, substring" },
        { name: "Control flow", detail: "when, ranges, for-loops, smart casts" },
        { name: "Collections", detail: "listOf, filter, sorting, destructuring" },
        { name: "Classes & objects", detail: "data class, object, companion, lateinit" },
        { name: "Advanced", detail: "generics, extension functions" },
      ],
    },
    lld: {
      summary: "The thesis: Kotlin didn't add features so much as make Java's boilerplate patterns first-class.",
      points: [
        "A ~30-line POJO becomes a one-line data class — the single biggest productivity win",
        "Null-safety is the headline: non-null by default, opt in with ?, so whole classes of NPEs become impossible to write",
        "switch → when (an expression), instanceof + cast → is + smart cast, static utils → extension functions",
      ],
    },
  },
  {
    slug: "argent-android",
    oneLiner:
      "Multi-module Android banking app — offline-first sync, mobile security, built to demonstrate production mobile architecture.",
    stack: ["Kotlin", "Compose", "Hilt", "MVI", "WorkManager"],
    hld: {
      summary:
        "A retail banking client split into independent Gradle modules behind one app shell, so payments, accounts, and auth can be built, tested, and released independently.",
      components: [
        { name: "app shell", detail: "Hilt-wired composition root, nav graph, Play Console release config" },
        { name: "feature modules", detail: "accounts, transfers, auth — each owns its Compose UI and ViewModels" },
        { name: "domain module", detail: "currency-safe money math and use cases, no Android dependency" },
        { name: "data module", detail: "repositories, Room + SQLDelight, Ktor networking" },
        { name: "offline-sync-engine (external)", detail: "the durable queue + backoff/jitter engine, wired in behind WorkManager" },
      ],
    },
    lld: {
      summary:
        "The offline transfer path is the load-bearing piece — see the dedicated state-machine section above for the full spec.",
      points: [
        "Idempotency key (opId) generated client-side before any network attempt",
        "MVI unidirectional data flow — one Intent -> one State reducer per feature",
        "Biometric Keystore + cert pinning isolated behind a security module so it's swappable in tests",
        "Baseline Profiles generated from real androidTest journeys, not guessed",
      ],
    },
  },
  {
    slug: "basis-kmp",
    oneLiner:
      "Kotlin Multiplatform investment tracker — one shared core (valuation, cost basis, allocation), fully native Compose and SwiftUI UIs.",
    stack: ["Kotlin", "KMP", "Compose", "SwiftUI", "Koin"],
    hld: {
      summary:
        "One Kotlin module owns the numbers — valuation, cost basis, allocation. Android and iOS each own their own rendering, sharing nothing at the UI layer.",
      components: [
        { name: "shared/domain", detail: "valuation, cost-basis, allocation math — pure Kotlin, tested on JVM and Kotlin/Native" },
        { name: "shared/data", detail: "repository interfaces + Koin DI graph, implemented once" },
        { name: "androidApp", detail: "Jetpack Compose + Material 3" },
        { name: "iosApp", detail: "SwiftUI, calling the shared module through a generated Swift interface" },
      ],
    },
    lld: {
      summary: "SHARING.md documents the module-by-module share-vs-native call. The short version:",
      points: [
        "Share: anything expensive to get wrong twice — math, validation, persistence schema",
        "Keep native: charts (Vico on Android, Swift Charts on iOS), navigation, biometrics",
        "expect/actual only at the one or two seams where a platform API is unavoidable (secure storage)",
      ],
    },
  },
  {
    slug: "argent-track-sdk",
    oneLiner:
      "Kotlin Multiplatform analytics & attribution SDK — event pipeline, push/in-app campaigns, install attribution. Built to replace CleverTap + AppsFlyer.",
    stack: ["Kotlin", "KMP", "SQLDelight", "Ktor"],
    hld: {
      summary:
        "A self-contained KMP SDK a host app drops in for product analytics, push, and attribution — every call is queued locally and flushed in batches, so it never blocks the host or loses an event on a dead network.",
      components: [
        { name: "event pipeline", detail: "durable queue + batched flush, surviving process death" },
        { name: "identity & consent", detail: "hashed user id, consent-gated collection" },
        { name: "push / in-app", detail: "token registration + routing, campaign message host-render hook" },
        { name: "attribution", detail: "install referrer (Android) + SKAN (iOS) plumbing" },
        { name: "PII denylist", detail: "property keys shaped like token/otp/pan/aadhaar are stripped client-side" },
      ],
    },
    lld: {
      summary: "The SDK is designed to never crash or block the host app — correctness over reach.",
      points: [
        "Every call before initialize() is a logged no-op, so ordering mistakes can't crash the host",
        "A sensitive-property denylist redacts by shape (token/otp/password/pan/…) rather than a maintained blocklist",
        "Queue + batching live on the SDK's own scope; all public calls return immediately",
      ],
    },
  },
  {
    slug: "argent-ios",
    oneLiner:
      "Native Swift (MVVM) fintech customer app — SIP/investment, KYC, bank-account & mandate flows, with a generic token-refreshing network layer.",
    stack: ["Swift", "UIKit", "SwiftUI", "MVVM"],
    hld: {
      summary:
        "A native iOS client organised feature-first around MVVM — authentication, investment (SIP/lumpsum), account and mandate domains each own their ViewModels and services behind one network layer.",
      components: [
        { name: "Core", detail: "AuthManager, SessionManager (keychain token + refresh), onboarding & localization state" },
        { name: "Services", detail: "generic NetworkService with automatic token refresh, per-domain API services" },
        { name: "ViewModels", detail: "Authentication, Investment, Order, Home, Onboarding — each an ObservableObject" },
        { name: "Views", detail: "SwiftUI screens plus UIKit-backed web/Lottie/M3U8 media components" },
      ],
    },
    lld: {
      summary: "The load-bearing piece is the network layer: token expiry is handled once, not per call site.",
      points: [
        "SessionManager holds access/refresh tokens in the Keychain, keyed by app domain",
        "NetworkService centralises auth headers and refresh-on-401, so services stay thin",
        "Codable models mirror the API contract; ViewModels expose plain published state",
      ],
    },
  },
  {
    slug: "argent-rag",
    oneLiner:
      "Production-ready bilingual RAG backend — FastAPI + ChromaDB + MongoDB + Gemini. Language-detecting retrieval, grounded generation, multimodal image queries.",
    stack: ["Python", "FastAPI", "ChromaDB", "Gemini"],
    hld: {
      summary:
        "A retrieval-augmented generation service that detects Hindi/English, retrieves from the matching vector collection, and grounds a Gemini response in the retrieved docs — never letting the model answer from memory.",
      components: [
        { name: "ingestion", detail: "FAQ chunking + embedding (Gemini embeddings) into per-language ChromaDB collections" },
        { name: "retrieval", detail: "relevance search scoped to the detected language" },
        { name: "generation", detail: "Gemini Flash 2.0, grounded in retrieved context; multimodal image path" },
        { name: "language detection", detail: "routes a query to the correct collection, so Hindi never pulls English context" },
      ],
    },
    lld: {
      summary: "The pipeline is a straight line — detect → retrieve → generate — with each stage independently swappable.",
      points: [
        "Language detection runs first and scopes retrieval, so cross-language contamination is impossible",
        "Generation is always grounded in retrieved docs; the model is not trusted to answer from pretraining",
        "JWT-auth'd endpoints, MongoDB-backed config, deployed as a multi-stage Docker image",
      ],
    },
  },
  {
    slug: "slate-ai",
    oneLiner:
      "A private notes assistant — on-device LLM for offline summarisation, a cloud model for deep synthesis, local embeddings + retrieval over your own notes.",
    stack: ["Kotlin", "LiteRT", "RAG", "Compose"],
    hld: {
      summary: "A notes assistant that treats 'ask the cloud' as an escalation, not the default — most queries never leave the device.",
      components: [
        { name: "chunker", detail: "sentence-aware splitting so retrieval doesn't cut mid-thought" },
        { name: "embedding + cosine retrieval", detail: "pure Kotlin, runs on-device" },
        { name: "router", detail: "decides on-device vs cloud based on query shape and retrieval confidence" },
        { name: "on-device model (LiteRT)", detail: "handles short lookups and summarisation" },
        { name: "cloud escalation", detail: "only for queries the router can't confidently answer locally" },
      ],
    },
    lld: {
      summary: "12 tests cover the retrieval pipeline and the routing policy specifically — the router is what's most likely to silently regress.",
      points: [
        "Routing decision is a pure function of query length, retrieval confidence, and latency budget — testable without a real model loaded",
        "Compose UI observes a single sealed-class UI state, so there's no partial-update bugs",
      ],
    },
  },
  {
    slug: "modulith",
    oneLiner:
      "An opinionated Android architecture template: Gradle convention plugins and a CI check that fails the build on module-graph violations.",
    stack: ["Gradle", "Convention plugins", "CI"],
    hld: {
      summary: "A Gradle template where the enforcement lives in the build, not in a wiki page nobody reads.",
      components: [
        { name: "convention plugins", detail: "one plugin per module type (android-feature, kotlin-library) — a build.gradle.kts is ~2 lines" },
        { name: "checkModuleGraph task", detail: "parses module dependencies and fails the build on a disallowed edge" },
        { name: "sample modules", detail: ":core, :feature-a, :feature-b — prove the check actually catches violations" },
      ],
    },
    lld: {
      summary: "The graph check is a real static-analysis task, not a lint suggestion:",
      points: [
        "Reads the resolved project dependency graph via the Gradle API, not string-matching build files",
        "Fails the build on violation — verified with a red-then-green test case for a feature -> feature edge",
      ],
    },
  },
  {
    slug: "ledger-core",
    oneLiner: "A double-entry accounting ledger for Kotlin Multiplatform — balanced journal entries, idempotent postings, currency-safe money.",
    stack: ["Kotlin", "KMP"],
    hld: {
      summary: "A KMP library modeling money the way an accountant would: every transaction is a balanced journal entry, not a single debit floating in a table.",
      components: [
        { name: "Money", detail: "currency-safe value type — no raw floating point for amounts" },
        { name: "JournalEntry", detail: "a set of balanced postings (debits == credits) or the entry is rejected" },
        { name: "Ledger", detail: "append-only store of confirmed entries, exposes balance-as-of queries" },
      ],
    },
    lld: {
      summary: "12 tests, running on both JVM and iOS (Kotlin/Native) targets.",
      points: [
        "Postings are idempotent by a caller-supplied key — replaying the same posting twice is a no-op, not a double-count",
        "Balance validation happens at entry-construction time, not as a post-hoc reconciliation job",
      ],
    },
  },
  {
    slug: "pay-sheet",
    oneLiner:
      "A drop-in Jetpack Compose payment sheet: card input with Luhn + card-brand detection, tokenization, a 3-D-Secure-style step-up state machine, PCI-conscious notes.",
    stack: ["Kotlin", "Compose", "PCI"],
    hld: {
      summary: "A self-contained Compose module a host app can drop in without touching raw card data itself.",
      components: [
        { name: "card input", detail: "Luhn check + brand detection as the user types" },
        { name: "tokenization client", detail: "raw PAN never leaves this module — only a token crosses the boundary" },
        { name: "step-up state machine", detail: "models the 3-D-Secure-style challenge flow as explicit states" },
      ],
    },
    lld: {
      summary: "11 tests, plus a sample app exercising the full flow end to end.",
      points: [
        "Card number is redacted in every log line by construction — the type itself refuses a raw toString()",
        "Step-up flow is a sealed class state machine, not boolean flags standing in for state",
      ],
    },
  },
  {
    slug: "offline-sync-engine",
    oneLiner: "A small, tested engine for offline-first mutations: durable operation queue, exponential backoff with jitter, pluggable per-operation conflict resolution.",
    stack: ["Kotlin", "WorkManager"],
    hld: {
      summary: "The general-purpose version of the sync engine wired into argent-android — a durable queue that assumes the network will fail.",
      components: [
        { name: "operation queue", detail: "durable, survives process death" },
        { name: "backoff policy", detail: "exponential with full jitter, so a whole fleet doesn't retry in lockstep" },
        { name: "conflict resolver", detail: "pluggable per operation type — no single global merge rule" },
      ],
    },
    lld: {
      summary: "9 tests, standalone — no Android dependency in the core.",
      points: [
        "Retry ceiling is explicit — an operation moves to Failed rather than retrying forever",
        "Conflict strategy is chosen by operation type at registration time, not inferred at runtime",
      ],
    },
  },
  {
    slug: "mobile-security-notes",
    oneLiner: "Android mobile-security building blocks with writeups: Keystore-backed encryption, BiometricPrompt + CryptoObject, log/PII redaction, certificate pinning, HMAC signed deep links.",
    stack: ["Kotlin", "Keystore", "Biometrics", "HMAC"],
    hld: {
      summary: "A library plus the threat-model writeups explaining why each piece exists.",
      components: [
        { name: "Keystore AES-GCM", detail: "hardware-backed key storage, no key material in app memory longer than needed" },
        { name: "BiometricPrompt + CryptoObject", detail: "biometric auth bound to the actual crypto operation, not just a yes/no gate" },
        { name: "redaction", detail: "deny-by-shape — logs are redacted by structure, not a maintained blocklist of field names" },
        { name: "signed deep links", detail: "HMAC-SHA256 over the raw deep link, constant-time compare, staged strictMode rollout (VAPT CWE-472)" },
      ],
    },
    lld: {
      summary: "8 tests, plus a written threat model.",
      points: [
        "Redaction is deny-by-shape: anything matching a PII-shaped pattern is redacted by default; an allowlist opts fields back in",
        "A certificate pinning failure is a hard stop, not a warning log",
      ],
    },
  },
  {
    slug: "argent-http-core",
    oneLiner: "A production Ktor HttpClient factory built around token refresh: refresh-on-401 with careful failure classification, optional-bearer auth, and a pure unit-tested refresh policy.",
    stack: ["Kotlin", "Ktor", "Auth"],
    hld: {
      summary: "Three client builders over one shared base config, with the refresh policy extracted as a pure function.",
      components: [
        { name: "authenticated client", detail: "bearer token + refresh-on-401 with retry and exponential backoff" },
        { name: "optional-bearer client", detail: "token attached only when present, read fresh each request — for pre/post-login endpoints" },
        { name: "decideRefresh", detail: "pure status→decision mapping: 401/403 expire the session, 5xx/network keep it" },
      ],
    },
    lld: {
      summary: "9 unit tests over the refresh policy; JVM module, Apache-2.0, CI.",
      points: [
        "A 5xx on refresh keeps the user logged in — logging out on a backend blip would turn a transient outage into a support-ticket storm",
        "Tokens are read fresh from a TokenStore on every request and refresh, so a logout is reflected immediately with no memoised-token cache to invalidate",
      ],
    },
  },
  {
    slug: "argent-checkout",
    oneLiner: "A pure-Kotlin payment-checkout state machine (three MVI reducers) from a production fintech app — centralized type config, runtime SIP bank-switch resolution, zero Android/Compose deps.",
    stack: ["Kotlin", "MVI", "State Machine"],
    hld: {
      summary: "Three reducers (checkout, processing, status) drive every UPI flow as reduce(state, intent) -> Pair<state, effects>.",
      components: [
        { name: "CheckoutStateMachine", detail: "UPI app/QR/collect selection, VPA validation, and runtime SIP bank-switch resolution" },
        { name: "ProcessingStateMachine", detail: "timer + progress, UPI-app launch/return lifecycle, poll-result handling" },
        { name: "StatusStateMachine", detail: "countdown → navigation, TPV sheet, SIP-creation overlay, analytics/meta events" },
      ],
    },
    lld: {
      summary: "Type-specific behavior lives in one CheckoutTypeConfigFactory; 9 unit tests; JVM module, Apache-2.0, CI.",
      points: [
        "A when(checkoutType) that was scattered across 50+ places collapses into a single config object the reducers only read, never branch on",
        "For a SIP bank switch the reducer re-derives the flow from the selected bank's mandates — reuse only a valid, sufficient mandate, else create/upsize",
      ],
    },
  },
  {
    slug: "argent-risk-engine",
    oneLiner: "A pure-Python credit-underwriting policy core from a production fintech scoring service — loan-amount policy, score eligibility, and decile-direction-aware risk banding, zero I/O.",
    stack: ["Python", "Credit Risk", "Decision Engine"],
    hld: {
      summary: "Pure functions over plain dicts/lists: SMS-income waterfall, bureau servicing history, risk segmentation, and a FOIR cap combine into a pre-approved amount.",
      components: [
        { name: "loan policy", detail: "income estimation waterfall → proven bureau amount → risk multiplier → FOIR 0.55 cap → 5k rounding" },
        { name: "eligibility", detail: "partner-facing /score fields (eligible / amount / rejection source + reason)" },
        { name: "risk banding", detail: "decile → low/medium/high with per-model decile-direction conventions" },
      ],
    },
    lld: {
      summary: "26 unit tests; the decile-direction gotcha is threaded through every comparison. Apache-2.0, CI on 3.10/3.11/3.12.",
      points: [
        "Ascending (1 = lowest risk) and descending (1 = highest risk) scorecards coexist in production; mixing them silently inverts the loan grid, so direction is declared per model and the multiplier is injected, never guessed",
        "Approval keyed off a decile cut can decline a 'medium' user — so the rejection reason follows eligibility, not the risk band, or the partner gets a rejection with no attribution",
      ],
    },
  },
  {
    slug: "android-perf-lab",
    oneLiner: "Android performance measurement infrastructure: Baseline Profiles + Macrobenchmark with a methodology that reports device, build type and iteration count.",
    stack: ["Baseline Profiles", "Macrobenchmark"],
    hld: {
      summary: "Performance infrastructure, not a one-off benchmark script — the point is numbers that are still reproducible months later.",
      components: [
        { name: "Baseline Profile module", detail: "generates and validates the profile as part of CI" },
        { name: "Macrobenchmark module", detail: "cold-start and scroll-jank benchmarks on a managed device" },
        { name: "pixel6Api34 managed device", detail: "a fixed, reproducible target so numbers aren't device-noise" },
      ],
    },
    lld: {
      summary: "Every reported number carries its device, build type, and iteration count — a number without those three is treated as not measured.",
      points: ["Benchmarks run against a release build, not debug — debug numbers are structurally misleading"],
    },
  },
  {
    slug: "compose-lab",
    oneLiner: "Small, honest Jetpack Compose experiments — a custom layout, a recomposition study with real counts, a gesture component.",
    stack: ["Compose"],
    hld: {
      summary: "A set of small, independent experiments rather than one cohesive app — each isolates a single Compose mechanism.",
      components: [
        { name: "custom Layout", detail: "a wrapping-flow layout, with the wrapping math unit-tested directly" },
        { name: "recomposition study", detail: "instruments real recomposition counts to show @Immutable skipping, not just claim it" },
      ],
    },
    lld: {
      summary: "5 tests, focused on the layout math specifically.",
      points: ["The recomposition study reports a real counter, not a screenshot — the claim is checkable"],
    },
  },
  {
    slug: "Kaleido",
    oneLiner: "Offline-first product catalog for Android, iOS & Web — one Compose Multiplatform codebase (Fake Store API).",
    stack: ["Kotlin", "Compose Multiplatform"],
    hld: {
      summary: "One Compose Multiplatform codebase targeting three platforms, with local persistence so the catalog browses fine offline.",
      components: [
        { name: "Compose Multiplatform UI", detail: "shared across Android, iOS, and Web (Wasm/JS) targets" },
        { name: "local cache", detail: "catalog persisted locally, so a lost connection doesn't blank the screen" },
        { name: "Fake Store API client", detail: "the remote data source, treated as unreliable by design" },
      ],
    },
    lld: {
      summary: "Ships with a CI workflow and versioned releases (APK + web build).",
      points: ["UI reads from the local cache first; network is a background refresh, not the other way around"],
    },
  },
  {
    slug: "Youtube-Video-Downloader",
    oneLiner: "Android video/audio downloader — Compose UI, foreground download service, yt-dlp engine via Chaquopy.",
    stack: ["Kotlin", "Compose", "Room"],
    hld: {
      summary: "A single-Activity Compose app built around a foreground service, since downloads have to survive the user leaving the screen.",
      components: [
        { name: "Compose UI", detail: "single-Activity, observes download state" },
        { name: "foreground download service", detail: "keeps the download alive, shows live progress in the notification" },
        { name: "Room-backed download library", detail: "persists what's been downloaded and its state" },
        { name: "yt-dlp via Chaquopy", detail: "the extraction engine, embedded as Python running on-device" },
      ],
    },
    lld: {
      summary: "The interesting constraint here is running a Python engine (yt-dlp) inside an Android process via Chaquopy.",
      points: ["Download state survives process death via the Room-backed queue, not an in-memory list"],
    },
  },
  {
    slug: "Number-Plate-detection",
    oneLiner: "Automatic license plate recognition using computer vision and machine learning.",
    stack: ["Python", "OpenCV", "ML"],
    hld: {
      summary: "A classic ALPR pipeline: locate the plate region, then read the characters.",
      components: [
        { name: "plate localization", detail: "OpenCV-based region detection" },
        { name: "character recognition", detail: "OCR/ML model over the localized plate crop" },
      ],
    },
  },
  {
    slug: "Task-App",
    oneLiner: "A productivity task manager app built with Kotlin and Jetpack Compose.",
    stack: ["Kotlin", "Compose"],
    hld: {
      summary: "A straightforward CRUD task manager — the point of this one is clean Compose state management, not novel architecture.",
      components: [
        { name: "Compose UI", detail: "task list, add/edit" },
        { name: "local persistence", detail: "tasks survive app restarts" },
      ],
    },
  },
  {
    slug: "Expense-Manager",
    oneLiner: "A personal finance and expense management app built with Kotlin and Jetpack Compose.",
    stack: ["Kotlin", "Compose"],
    hld: {
      summary: "Tracks expenses locally with a Compose UI — a smaller sibling of the money-handling problems tackled properly in ledger-core.",
      components: [
        { name: "Compose UI", detail: "entry, categorization, summary views" },
        { name: "local storage", detail: "expenses persisted on-device" },
      ],
    },
  },
  {
    slug: "network-security",
    oneLiner: "Coursework assignments in network security from IIIT Allahabad.",
    stack: ["Coursework"],
    hld: {
      summary: "A set of independent assignment folders, not a single system — each covers a distinct network-security topic.",
      components: [{ name: "assignments 1–5", detail: "independent exercises, graded separately" }],
    },
  },
  {
    slug: "E-TRASH-APP",
    oneLiner: "An e-sanitization app initiative for clean and ideal cities.",
    stack: ["Java", "Android"],
    hld: {
      summary: "An app concept for making municipal garbage collection transparent and scheduled, rather than ad hoc.",
      components: [{ name: "Android client", detail: "Java-based app for reporting and tracking collection" }],
    },
  },
  {
    slug: "Programming-Robotics-Arm-using-Newton-Raphson",
    oneLiner: "Newton-Raphson-based inverse kinematics for a 3-link planar robot manipulator.",
    stack: ["Robotics", "Numerical methods"],
    hld: {
      summary: "An early coursework repo — currently a placeholder (license only, no code pushed yet).",
      components: [],
    },
  },
  {
    slug: "Implementation-of-Computer-Vision-in-Robotics",
    oneLiner: "Camera-based object visualization and template matching for a robot's view of the world, with a written report.",
    stack: ["Python", "OpenCV", "Jupyter"],
    hld: {
      summary: "A notebook-driven CV pipeline: capture, preprocess, then locate the objects the robot needs to see, with recorded video test cases.",
      components: [
        { name: "capture / preprocessing", detail: "camera frames normalized for detection" },
        { name: "template matching / min-area detection", detail: "locates objects of interest in frame" },
      ],
    },
  },
  {
    slug: "Object-Detection-and-Grasping-by-Robots",
    oneLiner: "CNN-based object detection to decide where a robot should grasp an object.",
    stack: ["Python", "CNN", "Jupyter"],
    hld: {
      summary: "A CNN detector feeding a grasp-point decision, documented in an accompanying IEEE-style report.",
      components: [
        { name: "CNN detector", detail: "locates the object in frame" },
        { name: "grasp-point selection", detail: "turns a detection into a grasp target" },
      ],
    },
  },
  {
    slug: "Data-Mining-Project-on-Prediction-of-Diabetes",
    oneLiner: "Data Mining Project on Prediction of Diabetes.",
    stack: ["Python", "Data mining"],
    hld: {
      summary: "A coursework notebook applying classic data-mining/classification techniques to a diabetes dataset.",
      components: [
        { name: "data prep + feature selection", detail: "cleans and selects predictive features" },
        { name: "classifier", detail: "predicts diabetes risk from patient features" },
      ],
    },
  },
  {
    slug: "Hardware-trojan-detection-using-ML-and-deep-learning-models",
    oneLiner: "Hardware trojan detection in IC designs using ML and deep-learning models, with an IEEE-style report.",
    stack: ["Python", "ML", "Deep learning"],
    hld: {
      summary: "Detects malicious modifications (hardware trojans) in IC netlists using ML/deep-learning classifiers.",
      components: [
        { name: "netlist feature extraction", detail: "structural features pulled from the circuit netlist" },
        { name: "ML/DL classifier", detail: "flags trojan-inserted circuits" },
      ],
    },
  },
  {
    slug: "Data_mining_supply_chain_model",
    oneLiner: "A data mining model for supply chain analysis, with a literature review and report.",
    stack: ["Python", "Data mining"],
    hld: {
      summary: "A coursework project applying data-mining techniques to a supply-chain dataset, backed by a literature review.",
      components: [
        { name: "dataset + code", detail: "supply-chain data and analysis scripts" },
        { name: "model", detail: "surfaces patterns in the supply-chain data" },
      ],
    },
  },
  {
    slug: "Iris-recognition",
    oneLiner: "Iris Recognition using deep learning methods on jpeg compressed images.",
    stack: ["Python", "Deep learning"],
    hld: {
      summary:
        "A biometric recognition pipeline: extract the iris region, then classify it with a deep learning model — trained specifically on JPEG-compressed input, a harder and more realistic case than raw sensor images.",
      components: [
        { name: "iris segmentation", detail: "isolates the iris region from the eye image" },
        { name: "deep learning classifier", detail: "matches/recognizes the iris — 98%+ accuracy" },
      ],
    },
  },
  {
    slug: "Kryptografi",
    oneLiner: "A Library for rsa-encryption and decryption for native application development.",
    stack: ["Swift", "Security framework"],
    hld: {
      summary: "A small Swift library wrapping Apple's Security framework so RSA encrypt/decrypt is a clean Swift API, with no external crypto dependency.",
      components: [
        { name: "key handling", detail: "via Apple's Security framework" },
        { name: "encrypt / decrypt API", detail: "a native Swift surface over the underlying C API" },
      ],
    },
    lld: {
      summary: "No external dependencies — deliberately built directly on Apple's Security framework.",
      points: ["Keeps the crypto surface minimal and auditable rather than pulling in a general-purpose crypto package"],
    },
  },
];

export function getProject(slug: string): ProjectDoc | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
