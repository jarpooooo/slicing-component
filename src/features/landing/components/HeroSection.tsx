import { AssetIcon, brandToneBg, Button, Container, EyebrowLabel } from "@/components/ui";
import { getSiteInfo } from "@/lib/api/server";
import { cn } from "@/lib/utils";

import { communityPromises, heroContent } from "../data";

import { HeroArtwork } from "./HeroArtwork";

/**
 * "Welcome to the community" (Figma 14:16065).
 * Desktop: hero copy (620px) and artwork (620×530) with a 40px gap; padding
 * 72/64/64/96px, so the row is 32px wider than the 1248px content column on the
 * right. Then the "Community promise" strip between two borders.
 * Below lg the artwork stacks under the copy.
 */
export async function HeroSection() {
  const { description } = heroContent;
  const { university } = await getSiteInfo(); // GET /api/stats

  return (
    <section aria-labelledby="hero-heading" className="overflow-clip">
      <Container className="pt-12 pb-12 md:pt-16 lg:pt-18 lg:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10 xl:-mr-8">
          <div className="flex flex-col items-start gap-7">
            <EyebrowLabel>{heroContent.eyebrow}</EyebrowLabel>

            <h1 id="hero-heading" className="text-display-80 font-bold text-fg">
              <span className="block">{heroContent.headlineLines[0]}</span>
              <span className="block text-link">{heroContent.headlineLines[1]}</span>
            </h1>

            <p className="text-body-md text-fg-muted md:text-lead">
              {description.before}
              <strong className="font-bold">{university}</strong>
              {description.after}
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href={heroContent.primaryAction.href} withArrow>
                {heroContent.primaryAction.label}
              </Button>
              <Button href={heroContent.secondaryAction.href} variant="secondary" withArrow>
                {heroContent.secondaryAction.label}
              </Button>
            </div>

            {/* Welcome note (14:16082) */}
            <p className="flex items-center gap-2.5 text-small leading-auto text-fg-muted">
              <AssetIcon name="communityColors" />
              {heroContent.welcomeNote}
            </p>
          </div>

          <HeroArtwork className="mx-auto lg:mx-0 lg:ml-auto" />
        </div>
      </Container>

      {/* Community promise (14:16193): 26px vertical padding, 8px square accents */}
      <div className="border-y border-border">
        <Container
          as="ul"
          className="flex flex-col gap-3 py-6.5 md:flex-row md:items-center md:justify-between md:gap-6"
        >
          {communityPromises.map(({ title, tone }) => (
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
