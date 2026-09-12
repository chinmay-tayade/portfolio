import { PROFILE, IMPACT } from "@/lib/resume";

export default function ImpactBlock() {
  return (
    <pre className="overflow-x-auto border border-line bg-bg-raised px-5 py-4 font-mono text-[13px] leading-relaxed text-text-dim">
      <code>
        <span className="text-accent">object</span> Chinmay {"{"}
        {"\n"}
        {"    "}
        <span className="text-accent">val</span> role{"    "}= &quot;{PROFILE.role}&quot;
        {"\n"}
        {"    "}
        <span className="text-accent">val</span> company{" "}= &quot;Bachatt — Trusave Fintech&quot;
        {"\n"}
        {"    "}
        <span className="text-accent">val</span> impact{"  "}= listOf(
        {"\n"}
        {IMPACT.map((s) => (
          <span key={s.label}>
            {"        "}&quot;{s.value} {s.label}&quot;,{"\n"}
          </span>
        ))}
        {"    "})
        {"\n"}
        {"    "}
        <span className="text-accent">val</span> since{"   "}= 2022{" "}
        <span className="text-text-faint">{"// zero to production fintech"}</span>
        {"\n"}
        {"}"}
      </code>
    </pre>
  );
}
