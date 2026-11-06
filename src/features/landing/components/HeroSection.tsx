import { brandToneBg, Button, Container, EyebrowLabel } from "@/components/ui";
import { cn } from "@/lib/utils";

import { communityDots, communityPromises, heroContent } from "../data";

import { HeroArtwork } from "./HeroArtwork";

/**
 * "Welcome to the community" (Figma 14:16065).
 * Desktop: copy (620px) and artwork (620px) side by side with a 40px gap, then the
 * "Community promise" strip. Below lg the artwork stacks under the copy.
 */
export function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="overflow-clip">
      <Container className="grid items-center gap-12 py-12 md:py-16 lg:grid-cols-2 lg:gap-10 lg:py-18">
        <div className="flex max-w-155 flex-col items-start">
          <EyebrowLabel tone="blue">{heroContent.eyebrow}</EyebrowLabel>

          <h1
            id="hero-heading"
            className="mt-7 text-heading-lg font-bold text-balance text-fg lg:text-display"
          >
            {heroContent.headline}
          </h1>

          <p className="mt-7 text-body-md text-fg-muted md:text-body-lg">
            {heroContent.description}
          </p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={heroContent.primaryAction.href} withArrow>
              {heroContent.primaryAction.label}
            </Button>
            <Button href={heroContent.secondaryAction.href} variant="secondary" withArrow>
              {heroContent.secondaryAction.label}
            </Button>
          </div>

          {/* Welcome note (14:16082): four overlapping community dots + message */}
          <p className="mt-7 flex items-center gap-2.5 text-small text-fg-muted">
            <span aria-hidden className="flex -space-x-0.75">
              {communityDots.map((tone) => (
                <span
                  key={tone}
                  className={cn("size-4 rounded-full ring-2 ring-surface", brandToneBg[tone])}
                />
              ))}
            </span>
            {heroContent.welcomeNote}
          </p>
        </div>

        {/* Below lg the research artwork bleeds ~16% above its frame; pad so it can't cover the copy. */}
        <div className="pt-[14%] lg:pt-0">
          <HeroArtwork className="mx-auto lg:mx-0 lg:ml-auto" />
        </div>
      </Container>

      {/* Community promise (14:16193) */}
      <div className="border-y border-border">
        <Container
          as="ul"
          className="flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between md:gap-6"
        >
          {communityPromises.map(({ title, tone }) => (
            <li key={title} className="flex items-center gap-3.5 text-body-md font-medium text-fg">
              <span aria-hidden className={cn("size-2 shrink-0 rounded-xs", brandToneBg[tone])} />
              {title}
            </li>
          ))}
        </Container>
      </div>
    </section>
  );
}
