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
    </Section>
  );
}
