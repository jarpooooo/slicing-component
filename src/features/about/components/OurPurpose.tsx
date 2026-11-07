import { Container, EyebrowLabel } from "@/components/ui";

import { purposeContent } from "../data";

/**
 * "Our purpose" (Figma 14:16603): Neutrals/300 band, 80px padding, 400px title column
 * and the story column 96px apart. The heading's second line has a link-blue quote and
 * the third line a top-to-bottom gradient (#1967D2 from 58.654% → #6FACFF).
 */
export function OurPurpose() {
  return (
    <section aria-labelledby="purpose-heading" className="bg-surface-muted">
      <Container className="grid gap-10 py-16 lg:grid-cols-[400px_1fr] lg:gap-16 lg:py-20 xl:gap-24">
        <div className="flex flex-col items-start gap-5">
          <EyebrowLabel>{purposeContent.eyebrow}</EyebrowLabel>
          <h2 id="purpose-heading" className="text-heading-48 font-bold text-fg">
            <span className="block">A bridge from</span>
            <span className="block">
              <span className="text-link">“I wonder”</span> to
            </span>
            <span className="block w-fit bg-linear-to-b from-link from-[58.654%] to-accent-soft bg-clip-text text-transparent">
              “I made this.”
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-body-md text-fg md:text-lead-xl">{purposeContent.lead}</p>
          {purposeContent.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-body-md text-fg-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
