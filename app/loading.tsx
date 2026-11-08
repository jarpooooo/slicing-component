import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { Section } from "@/components/ui/Section";

/** Route-level loading UI shown while a page segment streams in. */
export default function Loading() {
  return (
    <Section className="py-16">
      <LoadingSkeleton count={4} label="Loading page…" />
    </Section>
  );
}
