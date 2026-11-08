import { AssetIcon } from "@/components/ui/AssetIcon";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import { brandToneBg, type BrandTone } from "@/lib/brand";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

import { HeroArtwork } from "./HeroArtwork";

const promises: { title: string; tone: BrandTone }[] = [
  { title: "Learn by doing", tone: "blue" },
  { title: "Connect across disciplines", tone: "red" },
  { title: "Build with purpose", tone: "green" },
];

type HeroProps = {
  university: string;
};

/** Landing hero with the artwork and the "community promise" strip (Figma 14:16065). */
export function Hero({ university }: HeroProps) {
  return (
    <section aria-labelledby="hero-heading" className="overflow-clip">
      <Container className="pt-12 pb-12 md:pt-16 lg:pt-18 lg:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:-mr-8">
          <div className="flex flex-col items-start gap-7">
            <EyebrowLabel>GDGoC UGM • {siteConfig.academicYear}</EyebrowLabel>

            <h1 id="hero-heading" className="text-display-80 font-bold text-fg">
              <span className="block">Big ideas.</span>
              <span className="block text-link">Built together.</span>
            </h1>

            <p className="text-body-md text-fg-muted md:text-lead">
              A place for curious minds at <strong className="font-bold">{university}</strong> to
              learn, connect, and build technology that matters.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href="/overview" withArrow>
                Find your learning track
              </Button>
              <Button href="/about" variant="secondary" withArrow>
                Get to know us
              </Button>
            </div>

            <p className="flex items-center gap-2.5 text-small leading-auto text-fg-muted">
              <AssetIcon name="communityColors" />
              Different backgrounds. A shared curiosity.
            </p>
          </div>

          <HeroArtwork className="mx-auto lg:mx-0 lg:ml-auto" />
        </div>
      </Container>

      <div className="border-y border-border">
        <Container
          as="ul"
          className="flex flex-col gap-3 py-6.5 md:flex-row md:items-center md:justify-between md:gap-6"
        >
          {promises.map(({ title, tone }) => (
            <li
              key={title}
              className="flex items-center gap-3.5 text-body-md leading-auto font-medium text-fg"
            >
              <span aria-hidden className={cn("size-2 shrink-0", brandToneBg[tone])} />
              {title}
            </li>
          ))}
        </Container>
      </div>
    </section>
  );
}
