import Image from "next/image";

import { Container, EyebrowLabel } from "@/components/ui";
import { getSiteInfo } from "@/lib/api/server";
import { assets } from "@/lib/assets";
import { siteConfig } from "@/lib/site";

import { aboutHeroContent } from "../data";

/** About intro (Figma 14:16529). The artwork drops below the copy under lg. */
export async function AboutHero() {
  const [firstLine, secondLine] = aboutHeroContent.headingLines;
  const { university } = await getSiteInfo(); // GET /api/stats

  return (
    <section aria-labelledby="about-heading">
      <Container className="flex flex-col items-center gap-12 py-12 md:py-16 lg:flex-row lg:justify-between lg:gap-16 lg:py-20">
        <div className="flex max-w-180 flex-col items-start gap-6.5">
          <EyebrowLabel>{aboutHeroContent.eyebrow}</EyebrowLabel>
          <h1 id="about-heading" className="text-display-72 font-bold text-fg">
            <span className="block">{firstLine}</span>
            <span className="block text-link">{secondLine}</span>
          </h1>
          <p className="text-body-md text-fg-muted md:text-lead-lg">
            {aboutHeroContent.description.before}
            {university}
            {aboutHeroContent.description.after}
          </p>
          <p className="text-caption leading-auto text-fg-muted uppercase">
            {university} • {siteConfig.academicYear}
          </p>
        </div>

        <Image
          {...assets.aboutHeroArtwork}
          alt=""
          priority
          unoptimized
          className="h-auto w-full max-w-116 shrink-0 rounded-panel"
        />
      </Container>
    </section>
  );
}
