export type ProcessNode = {
  n: string;
  title: string;
  detail: string;
  done?: boolean;
};

// The actual sequence every repo follows — from the closing line of the
// GitHub profile README: "scaffold -> build green -> feature commits ->
// tests -> CI -> README. Honest history, no big-bang dumps."
export const PROCESS: ProcessNode[] = [
  { n: "01", title: "Scaffold", detail: "Repo, convention plugins, CI wired before feature code." },
  { n: "02", title: "Build green", detail: "./gradlew build passes before a single feature lands." },
  { n: "03", title: "Feature commits", detail: "Small, honest history — no big-bang dumps." },
  { n: "04", title: "Tests", detail: "Ships with the feature, not bolted on after." },
  { n: "05", title: "CI", detail: "GitHub Actions gate on every push." },
  { n: "06", title: "README", detail: "Documented before it counts as done.", done: true },
];
