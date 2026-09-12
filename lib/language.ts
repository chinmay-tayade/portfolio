import type { Repo } from "./github";

// Fixed categorical order, validated (adjacent CVD + contrast) against the
// site's #0a0a0f surface — see the language-mix bar. Never reorder without
// re-running the validator.
const KNOWN: Record<string, { hex: string; short: string; text: string }> = {
  Kotlin: { hex: "#A855F7", short: "K", text: "#0a0a0f" },
  "Jupyter Notebook": { hex: "#d95926", short: "Py", text: "#0a0a0f" },
  Java: { hex: "#199e70", short: "Jv", text: "#0a0a0f" },
  Swift: { hex: "#3987e5", short: "Sw", text: "#0a0a0f" },
};
// Fails the chroma floor on purpose — "other" is meant to read as neutral,
// not compete as a hue. Needs light text: it sits mid-lightness, not dark.
const OTHER = { hex: "#71717A", short: "—", text: "#ffffff" };

export function languageStyle(language: string | null) {
  return (language && KNOWN[language]) || OTHER;
}

export type LanguageSlice = {
  label: string;
  hex: string;
  count: number;
};

export function languageBreakdown(repos: Repo[]): LanguageSlice[] {
  const counts = new Map<string, number>();
  for (const r of repos) {
    const key = r.language && KNOWN[r.language] ? r.language : "Other";
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const order = ["Kotlin", "Jupyter Notebook", "Other", "Java", "Swift"];
  return order
    .filter((key) => counts.has(key))
    .map((key) => ({
      label: key,
      hex: key === "Other" ? OTHER.hex : KNOWN[key].hex,
      count: counts.get(key)!,
    }));
}

// Ordinal freshness ramp — one hue, monotone lightness, 4 discrete steps.
// Distinct from the language categorical hues on purpose (green reads as
// "how recently touched", not "which language").
const RECENCY_STEPS = ["#336650", "#2f8a5c", "#2fae74", "#34d399"];

export function recencyStep(pushedAt: string): number {
  const days = (Date.now() - +new Date(pushedAt)) / (1000 * 60 * 60 * 24);
  if (days <= 30) return 4;
  if (days <= 180) return 3;
  if (days <= 730) return 2;
  return 1;
}

export function recencyColor(step: number): string {
  return RECENCY_STEPS[step - 1];
}
