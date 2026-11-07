import Image from "next/image";

import { Container, EyebrowLabel } from "@/components/ui";
import { assets } from "@/lib/assets";

import { overviewHeroContent } from "../data";

/**
 * "Overview introduction" (Figma 14:16913): 64px top / 56px bottom padding, a 920px
 * headline column (24px gaps) and the 264×280 research glass artwork, 64px apart.
 *
 * The research artwork (14:16921) is exported at its render bounds (451×496, shadow
 * included), which start 164.6px left of and 12px above the 264×280 artwork box.
 */
export function OverviewHero() {
  const [firstLine, secondLine] = overviewHeroContent.headingLines;

  return (
    <section aria-labelledby="overview-heading" className="overflow-x-clip">
      <Container className="flex flex-col gap-10 pt-12 pb-10 md:pt-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:pb-14">
        <div className="flex max-w-230 flex-col items-start gap-6">
          <EyebrowLabel>{overviewHeroContent.eyebrow}</EyebrowLabel>
          <h1 id="overview-heading" className="text-display-72 font-bold text-fg">
            <span className="block">{firstLine}</span>
            <span className="block text-link">{secondLine}</span>
          </h1>
          <p className="text-body-md text-fg-muted md:text-lead">
            {overviewHeroContent.description}
          </p>
        </div>

        <div aria-hidden className="relative hidden h-70 w-66 shrink-0 md:block">
          <Image
            {...assets.overviewResearch}
            alt=""
            priority
            className="absolute top-[-4.29%] left-[-62.35%] h-auto w-[170.83%] max-w-none"
          />
        </div>
      </Container>
    </section>
  );
}
