import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { assets } from "@/lib/assets";
import { siteConfig } from "@/lib/site";

type AboutHeroProps = {
  university: string;
};

/** About page introduction (Figma 14:16529). */
export function AboutHero({ university }: AboutHeroProps) {
  return (
    <section aria-labelledby="about-heading">
      <Container className="flex flex-col items-center gap-12 py-12 md:py-16 lg:flex-row lg:justify-between lg:gap-16 lg:py-20">
        <div className="flex max-w-180 flex-col items-start gap-6.5">
          <EyebrowLabel>About GDGoC UGM</EyebrowLabel>
          <h1 id="about-heading" className="text-display-72 font-bold text-fg">
            <span className="block">Built by students.</span>
            <span className="block text-link">For what’s next.</span>
          </h1>
          <p className="text-body-md text-fg-muted md:text-lead-lg">
            We’re a community of learners and makers at {university}, connected by curiosity and the
            belief that technology can do good.
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
