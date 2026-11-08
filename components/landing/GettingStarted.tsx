import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { JourneyStep } from "@/lib/types";

type GettingStartedProps = {
  steps: JourneyStep[];
};

/** "Make your first move" journey steps (Figma 14:16397). */
export function GettingStarted({ steps }: GettingStartedProps) {
  return (
    <section aria-labelledby="journey-heading">
      <Container className="flex flex-col gap-10 pt-2 pb-16 lg:pb-22">
        <SectionIntro
          eyebrow="Make your first move"
          heading="You don’t need to have it all figured out."
          headingId="journey-heading"
        />

        {steps.length === 0 ? (
          <EmptyState title="Journey steps are coming soon" />
        ) : (
          <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.id} className="flex flex-col gap-5">
                <span aria-hidden className="font-inter text-numeral-44 font-bold text-link">
                  {String(step.step).padStart(2, "0")}
                </span>
                <hr className="border-border" />
                <h3 className="text-heading-25 font-bold text-fg">
                  <span className="sr-only">Step {step.step}: </span>
                  {step.title}
                </h3>
                <p className="text-body text-fg-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        )}
      </Container>
    </section>
  );
}
