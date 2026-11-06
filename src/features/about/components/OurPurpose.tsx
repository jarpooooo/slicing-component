import { Container, EyebrowLabel } from "@/components/ui";

import { purposeContent } from "../data";

/**
 * "Our purpose" (Figma 14:16603): heading with a blue quote on the left,
 * supporting paragraphs on the right. Stacks below lg.
 *
 * The quote uses `text-primary` (Blue/500): ≥ 3:1 on white, valid for large text.
 */
export function OurPurpose() {
  return (
    <section aria-labelledby="purpose-heading" className="border-t border-border">
      <Container className="grid gap-10 py-16 lg:grid-cols-2 lg:gap-24 lg:py-22">
        <div className="flex flex-col items-start gap-5">
          <EyebrowLabel tone="red">{purposeContent.eyebrow}</EyebrowLabel>
          <h2
            id="purpose-heading"
            className="text-heading-sm font-bold text-balance text-fg md:text-heading-md lg:text-heading-lg"
          >
            {purposeContent.headingLead} <q className="text-primary">{purposeContent.quote}</q>
          </h2>
        </div>

        <div className="flex flex-col gap-6 lg:pt-10">
          {purposeContent.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0 ? "text-body-md text-fg md:text-body-lg" : "text-body-md text-fg-muted"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
