"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

import { ErrorState } from "@/components/ui/ErrorState";
import { Section } from "@/components/ui/Section";

/** Error boundary for every route under the root layout. `retry` re-renders the segment. */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="py-16">
      <ErrorState
        title="This page failed to load"
        message="An unexpected error occurred. You can try loading it again."
        onRetry={reset}
      />
    </Section>
  );
}
