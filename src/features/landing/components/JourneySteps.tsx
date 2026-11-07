"use client";

import { AsyncContent, EmptyState, ErrorState, LoadingSkeleton } from "@/components/states";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";

/**
 * Journey steps from GET /api/journey (Figma 14:16403). The API has four steps and
 * Figma shows three, so the grid is two columns on tablet and four on desktop.
 */
export function JourneySteps() {
  const journey = useApi("journey", (signal) => api.getJourney({ signal }));

  return (
    <AsyncContent
      state={journey}
      loading={<LoadingSkeleton count={4} label="Loading the learning journey…" />}
      empty={<EmptyState title="Journey steps are coming soon" />}
      error={(message, retry) => (
        <ErrorState title="Couldn't load the journey" message={message} onRetry={retry} />
      )}
    >
      {(steps) => (
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
    </AsyncContent>
  );
}
