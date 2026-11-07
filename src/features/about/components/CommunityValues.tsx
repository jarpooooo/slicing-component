"use client";

import { AsyncContent, EmptyState, ErrorState, LoadingSkeleton } from "@/components/states";
import { Container, SectionIntro } from "@/components/ui";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";

import { fallbackValueTones, valuesContent, valueVisuals } from "../data";

import { ValueCard } from "./ValueCard";

/**
 * "Community values" (Figma 14:16613): 88px padding, intro and the value cards
 * (24px gap) 40px apart. Values come from GET /api/values.
 * 4 columns on desktop, 2 on tablet, 1 on mobile.
 */
export function CommunityValues() {
  const values = useApi("values", (signal) => api.getValues({ signal }));

  return (
    <section aria-labelledby="values-heading">
      <Container className="flex flex-col gap-10 py-16 lg:py-22">
        <SectionIntro
          eyebrow={valuesContent.eyebrow}
          heading={valuesContent.heading}
          headingId="values-heading"
        />
        <AsyncContent
          state={values}
          loading={<LoadingSkeleton count={4} label="Loading community values…" />}
          empty={<EmptyState title="Values are coming soon" />}
          error={(message, retry) => (
            <ErrorState title="Couldn't load the values" message={message} onRetry={retry} />
          )}
        >
          {(data) => (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {data.map((value, index) => {
                const visual = valueVisuals[value.id];
                return (
                  <li key={value.id}>
                    <ValueCard
                      value={value}
                      tone={visual?.tone ?? fallbackValueTones[index % fallbackValueTones.length]}
                      icon={visual?.icon ?? "iconBook"}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </AsyncContent>
      </Container>
    </section>
  );
}
