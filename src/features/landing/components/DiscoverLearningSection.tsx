import { Button, Chip, Container, SectionIntro } from "@/components/ui";

import { introContent, learningFormatsContent, trackDiscoveryContent } from "../data";

import { FormatGrid } from "./FormatGrid";
import { TrackGrid } from "./TrackGrid";

/**
 * "Discover learning" (Figma 14:16203): community introduction, track discovery
 * (cards from the API) and learning formats (cards from the API).
 */
export function DiscoverLearningSection() {
  return (
    <>
      {/* Community introduction (14:16204): 490px heading column, 662px story column, 96px gap */}
      <section aria-labelledby="intro-heading">
        <Container className="grid gap-10 py-16 lg:grid-cols-[490fr_662fr] lg:gap-24 lg:py-22">
          <div className="flex flex-col items-start">
            <SectionIntro
              eyebrow={introContent.eyebrow}
              tone="red"
              heading={introContent.heading}
              headingId="intro-heading"
            />
            <Button href={introContent.link.href} variant="link" withArrow className="mt-5">
              {introContent.link.label}
            </Button>
          </div>

          <div className="flex flex-col items-start gap-6">
            <p className="text-body-md text-fg md:text-body-lg">{introContent.lead}</p>
            <p className="text-body-md text-fg-muted">{introContent.body}</p>
            <ul className="flex flex-wrap gap-3">
              {introContent.attributes.map((attribute) => (
                <li key={attribute}>
                  <Chip>{attribute}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Track discovery (14:16224) */}
      <section aria-labelledby="tracks-heading">
        <Container className="flex flex-col gap-9 pt-4 pb-16 lg:pb-22">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionIntro
              eyebrow={trackDiscoveryContent.eyebrow}
              tone="blue"
              heading={trackDiscoveryContent.heading}
              headingId="tracks-heading"
              description={trackDiscoveryContent.description}
            />
            <Button
              href={trackDiscoveryContent.link.href}
              variant="link"
              withArrow
              className="self-start lg:self-auto"
            >
              {trackDiscoveryContent.link.label}
            </Button>
          </div>
          <TrackGrid />
        </Container>
      </section>

      {/* Learning formats (14:16333) */}
      <section aria-labelledby="formats-heading">
        <Container className="flex flex-col gap-10 py-16 lg:py-20">
          <SectionIntro
            eyebrow={learningFormatsContent.eyebrow}
            tone="yellow"
            heading={learningFormatsContent.heading}
            headingId="formats-heading"
            description={learningFormatsContent.description}
          />
          <FormatGrid />
        </Container>
      </section>
    </>
  );
}
