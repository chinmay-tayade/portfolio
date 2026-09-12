import Section from "@/components/Section";
import StateMachineSpec from "@/components/StateMachineSpec";

export default function OfflineStateMachine() {
  return (
    <Section
      eyebrow="A closer look"
      title="The offline transfer state machine."
      intro="The user taps Send with no signal. A serious banking client doesn't spin, and doesn't lie — it persists the intent, shows the truth, and reconciles later."
    >
      <StateMachineSpec />
      <p className="pull-quote mt-10">
        Idempotency key generated <b>before</b> any network attempt, backoff
        with full jitter on retry, conflict resolution decided per operation
        type — not one global rule.
      </p>
      <p className="mt-6 font-mono text-xs text-text-faint">
        {"// offline-sync-engine (9 tests, standalone) -> wired into argent-android behind WorkManager"}
      </p>
    </Section>
  );
}
