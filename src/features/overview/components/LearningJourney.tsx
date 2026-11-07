"use client";

import { AsyncContent, EmptyState, ErrorState, LoadingSkeleton } from "@/components/states";
import { Container, SectionIntro } from "@/components/ui";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";

import { learningJourneyContent } from "../data";

/**
 * "Learning journey" (Figma 14:17128): 80px padding, 40px gap; four learning stages
 * 32px apart — 38px Bold link-blue numeral, divider, 26px stage name and description,
 * 20px apart. Stages come from GET /api/journey.
 */
export function LearningJourney() {
  const journey = useApi("journey", (signal) => api.getJourney({ signal }));

  return (
    <section id="learning-journey" aria-labelledby="learning-journey-heading">
      <Container className="flex flex-col gap-10 py-16 lg:py-20">
        <SectionIntro
          eyebrow={learningJourneyContent.eyebrow}
          heading={learningJourneyContent.heading}
          headingId="learning-journey-heading"
          className="max-w-203"
        />
        <AsyncContent
          state={journey}
          loading={<LoadingSkeleton count={4} label="Loading the learning journey…" />}
          empty={<EmptyState title="Journey stages are coming soon" />}
          error={(message, retry) => (
            <ErrorState title="Couldn't load the journey" message={message} onRetry={retry} />
          )}
        >
          {(stages) => (
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
        </AsyncContent>
      </Container>
    </section>
  );
}
