import type { Metadata } from "next";

import { Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
};

/** Placeholder — sections from Figma node 14:16510 are built in the next phase. */
export default function AboutPage() {
  return (
    <Section className="py-16">
      <h1 className="text-heading-sm font-bold">About</h1>
      <p className="mt-4 text-fg-muted">Page placeholder (Figma node 14:16510).</p>
    </Section>
  );
}
