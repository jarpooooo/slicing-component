"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { ErrorState } from "@/components/states";
import { Section } from "@/components/ui";

/**
 * Route-level error boundary for every page under the root layout.
 * Next.js 16 passes `retry` (re-fetches and re-renders the segment).
 */
export default function RouteError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="py-16">
      <ErrorState
        title="This page failed to load"
        message="An unexpected error occurred. You can try loading it again."
        onRetry={retry}
      />
    </Section>
  );
}
