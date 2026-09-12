const USERNAME = "chinmay-tayade";

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  pushedAt: string;
  homepage: string | null;
  topics: string[];
};

type GhRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  topics?: string[];
};

// Falls back to this snapshot if the GitHub API is unreachable or rate-limited
// at build time, so the site still builds.
const FALLBACK: Repo[] = [];

export async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data: GhRepo[] = await res.json();
    return data
      .filter((r) => !r.fork && !r.archived && r.name !== USERNAME)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count,
        pushedAt: r.pushed_at,
        homepage: r.homepage,
        topics: r.topics ?? [],
      }))
      .sort((a, b) => +new Date(b.pushedAt) - +new Date(a.pushedAt));
  } catch {
    return FALLBACK;
  }
}

export function monthsSince(iso: string): number {
  return (Date.now() - +new Date(iso)) / (1000 * 60 * 60 * 24 * 30);
}

export function formatUpdated(iso: string): string {
  const days = (Date.now() - +new Date(iso)) / (1000 * 60 * 60 * 24);
  if (days < 1) return "today";
  if (days < 2) return "yesterday";
  if (days < 30) return `${Math.floor(days)}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}
