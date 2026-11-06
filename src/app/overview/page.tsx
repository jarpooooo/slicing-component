import type { Metadata } from "next";

import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Overview",
};

/** Placeholder — sections from Figma node 14:16894 are built in the next phase. */
export default function OverviewPage() {
  return (
    <Section className="py-16">
      <h1 className="text-heading-sm font-bold">Overview</h1>
      <p className="mt-4 text-fg-muted">Page placeholder (Figma node 14:16894).</p>
    </Section>
  );
}
