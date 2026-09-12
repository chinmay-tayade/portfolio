import Section from "@/components/Section";
import ProcessLoop from "@/components/ProcessLoop";

export default function HowIShip() {
  return (
    <Section
      first
      eyebrow="Process"
      title="Every repo, the same six steps."
      intro="No exceptions — including the ones nobody's grading."
    >
      <ProcessLoop />
    </Section>
  );
}
