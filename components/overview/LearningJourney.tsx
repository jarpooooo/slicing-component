import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { JourneyStep } from "@/lib/types";

type LearningJourneyProps = {
  stages: JourneyStep[];
};

/** "A journey you can keep building on." learning stages (Figma 14:17128). */
export function LearningJourney({ stages }: LearningJourneyProps) {
  return (
    <section id="learning-journey" aria-labelledby="learning-journey-heading">
      <Container className="flex flex-col gap-10 py-16 lg:py-20">
        <SectionIntro
          eyebrow="Progress, not perfection"
          heading="A journey you can keep building on."
          headingId="learning-journey-heading"
          className="max-w-203"
        />

        {stages.length === 0 ? (
          <EmptyState title="Journey stages are coming soon" />
        ) : (
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage) => (
              <li key={stage.id} className="flex flex-col gap-5">
                <span aria-hidden className="text-numeral-38 font-bold text-link">
                  {String(stage.step).padStart(2, "0")}
                </span>
                <hr className="border-border" />
                <h3 className="text-heading-26 font-bold text-fg">
                  <span className="sr-only">Stage {stage.step}: </span>
                  {stage.title}
                </h3>
                <p className="text-body text-fg-muted">{stage.description}</p>
              </li>
            ))}
          </ol>
        )}
      </Container>
    </section>
  );
}
