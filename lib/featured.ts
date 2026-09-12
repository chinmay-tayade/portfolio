export type Flagship = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  tags: string[];
  status: "wip" | "shipped";
};

// Curated by hand — the projects worth a closer look, not just a recent push.
export const FLAGSHIPS: Flagship[] = [
  {
    slug: "argent-android",
    title: "argent-android",
    tagline: "retail digital banking",
    summary:
      "Multi-module Kotlin/Compose banking app. Foundation shipped: convention plugins, a currency-safe domain layer with tests, Hilt-wired app, green CI. Next up: the offline transfer state machine behind WorkManager, biometric Keystore, cert pinning.",
    tags: ["kotlin", "compose", "multi-module", "offline-first", "fintech"],
    status: "wip",
  },
  {
    slug: "basis-kmp",
    title: "basis-kmp",
    tagline: "shared Kotlin core, Android + iOS",
    summary:
      "One financial core (valuation, cost basis, allocation) shared via Koin, with fully native Compose and SwiftUI UIs. Domain and tests done, Android app runs, iOS framework links. Ships SHARING.md — the module-by-module share-vs-native argument.",
    tags: ["kmp", "compose", "swiftui", "koin", "ios"],
    status: "wip",
  },
  {
    slug: "slate-ai",
    title: "slate-ai",
    tagline: "on-device + cloud notes assistant",
    summary:
      "A real RAG pipeline in pure Kotlin — sentence-aware chunking, embeddings, cosine retrieval — and a routing policy that keeps short lookups on-device and only escalates to the cloud when the task needs it. 12 tests, Compose app.",
    tags: ["on-device-ai", "litert", "rag", "compose"],
    status: "shipped",
  },
  {
    slug: "modulith",
    title: "modulith",
    tagline: "Android architecture template",
    summary:
      "Gradle convention plugins so a module build file is ~2 lines, plus a checkModuleGraph task that fails the build on module-graph violations — verified against a real core-to-feature edge.",
    tags: ["gradle", "convention-plugins", "architecture", "ci"],
    status: "shipped",
  },
];

export const FLAGSHIP_SLUGS = new Set(FLAGSHIPS.map((f) => f.slug));
