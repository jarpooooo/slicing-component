import Image from "next/image";

import { Chip, Container, EyebrowLabel } from "@/components/ui";
import { assets } from "@/lib/assets";

import { aboutHeroContent } from "../data";

/**
 * "About introduction" (Figma 14:16529): two-line heading (second line blue),
 * description, year label, and the GDGoC artwork on the right.
 * Below lg the artwork stacks under the copy.
 *
 * Blue line uses `text-primary` (Blue/500, ~3.6:1 on white) — allowed because the
 * heading is large text (≥ 24px bold, WCAG 3:1).
 */
export function AboutHero() {
  const [firstLine, secondLine] = aboutHeroContent.headingLines;

  return (
    <section aria-labelledby="about-heading">
      <Container className="grid items-center gap-12 py-12 md:py-16 lg:grid-cols-2 lg:gap-10 lg:py-22">
        <div className="flex max-w-155 flex-col items-start gap-7">
          <EyebrowLabel tone="blue">{aboutHeroContent.eyebrow}</EyebrowLabel>
          <h1
            id="about-heading"
            className="text-heading-md font-bold text-balance text-fg md:text-heading-lg lg:text-display"
          >
            <span className="block">{firstLine}</span>
            <span className="block text-primary">{secondLine}</span>
          </h1>
          <p className="text-body-md text-fg-muted md:text-body-lg">
            {aboutHeroContent.description}
          </p>
          <Chip className="gap-2 font-medium text-fg">
            <span aria-hidden className="size-2 rounded-full bg-brand-green" />
            {aboutHeroContent.yearLabel}
          </Chip>
        </div>

        <Image
          {...assets.aboutHeroArtwork}
          alt=""
          priority
          className="mx-auto h-auto w-full max-w-116 lg:mr-0 lg:ml-auto"
        />
      </Container>
    </section>
  );
}
