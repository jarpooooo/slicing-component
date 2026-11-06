"use client";

import { AsyncContent, EmptyState, ErrorState, LoadingSkeleton } from "@/components/states";
import { brandToneText } from "@/components/ui";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

import { journeyTones } from "../data";

/**
 * "Participation journey" (Figma 14:16403): numbered steps with a divider,
 * heading and description, 40px apart. Steps come from GET /api/journey
 * (4 steps; Figma shows 3), so the grid is 2 columns on md and 4 on lg.
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
          {steps.map((step, index) => (
            <li key={step.id} className="flex flex-col gap-5">
              <span
                aria-hidden
                className={cn(
                  "text-heading-md font-bold lg:text-heading-lg",
                  brandToneText[journeyTones[index % journeyTones.length]],
                )}
              >
                {String(step.step).padStart(2, "0")}
              </span>
              <hr className="border-border" />
              <h3 className="text-title-md font-bold text-fg">
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
