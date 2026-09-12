export type SpecRow = {
  state: string;
  means: string;
  transition: string;
  tone?: "teal" | "amber";
};

// The offline transfer state machine from offline-sync-engine / argent-android.
export const TRANSFER_STATES: SpecRow[] = [
  {
    state: "Pending",
    means: "Local intent recorded. opId assigned before any network attempt.",
    transition: "created on submit, once local validation passes",
  },
  {
    state: "Syncing",
    means: "Worker is attempting the request against the server.",
    transition: "picked up by WorkManager once network is available",
  },
  {
    state: "Confirmed",
    means: "Server accepted the operation — 2xx with a server id.",
    transition: "terminal success",
    tone: "teal",
  },
  {
    state: "Conflict",
    means: "Server returned 409 — two writers touched the same state.",
    transition: "user re-applies -> Pending, or cancels -> Failed",
    tone: "amber",
  },
  {
    state: "Failed",
    means: "Terminal, non-retryable.",
    transition: "4xx immediately, or 5xx/IO once the backoff ceiling is hit",
  },
];
