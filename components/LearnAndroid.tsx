import Link from "next/link";
import LearningPath from "@/components/LearningPath";
import Section from "@/components/Section";

export default function LearnAndroid() {
  return (
    <Section
      id="learn"
      eyebrow="Learn Android"
      title="Five repos that teach Android, in order."
      intro="A wiki + a runnable example for every stage — pick a topic to see how it fits together."
    >
      <LearningPath />
      <p className="mt-8 font-mono text-xs">
        <Link
          href="/learn"
          className="text-accent-light underline decoration-line underline-offset-4 transition-colors hover:text-accent"
        >
          browse the full learning path →
        </Link>
      </p>
    </Section>
  );
}
