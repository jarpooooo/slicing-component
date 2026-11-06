import { Container, SectionIntro } from "@/components/ui";

import { communityValues, valuesContent } from "../data";

import { ValueCard } from "./ValueCard";

/**
 * "Community values" (Figma 14:16613): four value cards.
 * 4 columns on desktop, 2 on tablet, 1 on mobile.
 */
export function CommunityValues() {
  return (
    <section aria-labelledby="values-heading">
      <Container className="flex flex-col gap-10 py-16 lg:py-22">
        <SectionIntro
          eyebrow={valuesContent.eyebrow}
          tone="yellow"
          heading={valuesContent.heading}
          headingId="values-heading"
        />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {communityValues.map((value) => (
            <li key={value.id}>
              <ValueCard value={value} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
