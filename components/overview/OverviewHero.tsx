import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { assets } from "@/lib/assets";

/**
 * Overview page introduction (Figma 14:16913). The artwork file includes its drop
 * shadow, so it's larger than its 264×280 box and offset to line up with Figma.
 */
export function OverviewHero() {
  return (
    <section aria-labelledby="overview-heading" className="overflow-x-clip">
      <Container className="flex flex-col gap-10 pt-12 pb-10 md:pt-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:pb-14">
        <div className="flex max-w-230 flex-col items-start gap-6">
          <EyebrowLabel>Overview • Programs & learning tracks</EyebrowLabel>
          <h1 id="overview-heading" className="text-display-72 font-bold text-fg">
            <span className="block">Find your spark.</span>
            <span className="block text-link">Build your own path.</span>
          </h1>
          <p className="text-body-md text-fg-muted md:text-lead">
            Explore how research, creativity, and development connect. Start with one interest. Grow
            through practice and the people around you.
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
