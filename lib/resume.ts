export const PROFILE = {
  name: "Chinmay Tayade",
  role: "Founding Mobile Engineer",
  location: "New Delhi, India",
  email: "chinmaytayade@outlook.com",
  linkedin: "https://www.linkedin.com/in/chinmaytayade",
  github: "https://github.com/chinmay-tayade",
  resumeHref: "/resume",
  summary:
    "Founding mobile engineer with 4+ years taking consumer fintech from an empty repository to millions of users. Sole Android engineer at Bachatt — architected and shipped the app end to end through public launch and a $12M Series A. Deep Android/Kotlin/Compose expertise with production Kotlin Multiplatform, offline-first architecture, and mobile security.",
};

export const IMPACT = [
  { label: "downloads", value: "5M+" },
  { label: "users", value: "3M+" },
  { label: "rating", value: "4.6★" },
  { label: "raised", value: "$12M Series A" },
  { label: "experience", value: "4+ yrs" },
];

export type Role = {
  title: string;
  org: string;
  orgContext: string;
  start: string;
  end: string;
  bullets: string[];
  tags: string[];
};

export const EXPERIENCE: Role[] = [
  {
    title: "Founding Mobile Engineer",
    org: "Bachatt (Trusave Fintech Pvt Ltd)",
    orgContext: "Gurugram · consumer savings & wealth platform · backed by Accel, Lightspeed, Info Edge Ventures",
    start: "Mar 2025",
    end: "Present",
    bullets: [
      "Sole mobile engineer: built and own the Android app from an empty repository through public launch, seed round, and a $12M Series A — now 5M+ downloads, 3M+ users, 4.6-star rating.",
      "Own the full mobile stack end to end: Kotlin, Jetpack Compose, multi-module Clean Architecture, MVVM/MVI, Coroutines/Flow, Hilt, Room — plus Play Console releases, Crashlytics monitoring, and production on-call.",
      "Introduced Kotlin Multiplatform into the live product: moved domain, data, and repository layers into a shared module across Android and iOS, cutting duplicated logic and feature delivery time by ~40%.",
      "Designed the offline-first architecture — local relational schema (SQLDelight) and sync engine (Ktor) — keeping the app fully usable on unreliable networks.",
      "Acted as de facto product manager: ran customer discovery with 100+ merchants, wrote the specs, and set the roadmap with no dedicated PM.",
      "Built CI/CD from scratch (GitHub Actions + Fastlane), held 85%+ automated test coverage, and hired and mentored the first engineers.",
    ],
    tags: ["Kotlin", "Compose", "KMP", "offline-first", "SQLDelight", "Ktor"],
  },
  {
    title: "Product Engineer, Android & iOS",
    org: "Indepay (Setara Networks)",
    orgContext: "Gurugram · enterprise payments network · promoted from intern to full-time within 3 months",
    start: "Apr 2022",
    end: "Feb 2025",
    bullets: [
      "Designed and built a cross-platform Payment SDK (Android + iOS) for a live network of 10,000+ merchants — improved transaction success rate by ~35%.",
      "Led a shared encryption library (Kotlin, Swift, Flutter): Keystore/Keychain-backed key handling, certificate pinning, OAuth 2.0/JWT.",
      "Cut crash rate by ~60% and improved app performance by ~45% through systematic profiling and memory analysis; owned Firebase Crashlytics and Analytics.",
      "Optimised authentication (OAuth, biometric, JWT) and added WebSocket real-time updates, cutting transaction processing time by ~20%.",
    ],
    tags: ["Payment SDK", "Swift", "Flutter", "encryption", "OAuth"],
  },
];

export const EDUCATION = {
  degree: "B.Tech, Information Technology",
  school: "Indian Institute of Information Technology (IIIT) Allahabad",
  note: "ANABIN H+ (equivalent to a German Bachelor) · coursework: Machine Learning, Computer Vision",
  start: "2018",
  end: "2022",
};

export const LANGUAGES_SPOKEN = "English (full professional), German (A2, in progress)";
export const AVAILABILITY = "Open to relocation · immediate availability";

export const SKILL_GROUPS: { label: string; items: string[] }[] = [
  { label: "languages", items: ["Kotlin", "Java", "Swift", "Dart", "Python", "SQL"] },
  {
    label: "android",
    items: [
      "Jetpack Compose",
      "Coroutines / Flow",
      "ViewModel",
      "Room",
      "DataStore",
      "WorkManager",
      "Navigation",
      "Paging 3",
      "Retrofit",
      "OkHttp",
      "Hilt / Dagger",
      "Material 3",
    ],
  },
  {
    label: "kmp & ios",
    items: ["KMP/KMM", "Ktor", "SQLDelight", "Koin", "Compose Multiplatform", "SwiftUI", "Swift Concurrency", "SKIE"],
  },
  {
    label: "architecture",
    items: ["Clean Architecture", "MVVM", "MVI", "multi-module", "offline-first", "Repository pattern", "SOLID"],
  },
  {
    label: "testing & ci/cd",
    items: ["JUnit", "MockK", "Turbine", "Espresso", "Compose UI Test", "TDD", "GitHub Actions", "Fastlane"],
  },
  {
    label: "security",
    items: ["Android Keystore", "BiometricPrompt", "certificate pinning", "OAuth 2.0", "JWT", "AES-GCM"],
  },
  { label: "ai & cv", items: ["on-device LLM inference", "RAG / embeddings", "YOLO", "OpenCV", "TensorFlow", "PyTorch"] },
];
