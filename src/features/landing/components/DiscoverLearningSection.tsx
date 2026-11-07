import { TrackGrid } from "@/components/sections";
import { Button, Chip, Container, EyebrowLabel, SectionIntro } from "@/components/ui";
import { getSiteInfo } from "@/lib/api/server";

import { introContent, learningFormatsContent, trackDiscoveryContent } from "../data";

import { FormatGrid } from "./FormatGrid";

/** Discover learning (Figma 14:16203). Tracks and formats come from the API. */
export async function DiscoverLearningSection() {
  const { university } = await getSiteInfo(); // GET /api/stats

  return (
    <>
      {/* Community introduction (14:16204) */}
      <section aria-labelledby="intro-heading">
        <Container className="grid gap-10 py-16 lg:grid-cols-[490px_1fr] lg:gap-16 lg:py-22 xl:gap-24">
          <div className="flex flex-col items-start gap-5">
            <EyebrowLabel>{introContent.eyebrow}</EyebrowLabel>
            <h2 id="intro-heading" className="text-heading-48 font-bold text-fg">
              {introContent.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <Button href={introContent.link.href} variant="link" withArrow>
              {introContent.link.label}
            </Button>
          </div>

          <div className="flex flex-col items-start gap-6">
            <p className="text-body-md text-fg-muted md:text-lead">
              Google Developer Groups on Campus, {university} brings students together around one
              simple idea: we can go <strong className="font-bold">further</strong> when we{" "}
              <strong className="font-bold">learn</strong> with each other.
            </p>
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
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionIntro
              eyebrow={trackDiscoveryContent.eyebrow}
              heading={trackDiscoveryContent.heading}
              headingId="tracks-heading"
              description={trackDiscoveryContent.description}
            />
            <Button href={trackDiscoveryContent.link.href} variant="link" withArrow>
              {trackDiscoveryContent.link.label}
            </Button>
          </div>
          <TrackGrid />
        </Container>
      </section>

      {/* Learning formats (14:16333) */}
      <section aria-labelledby="formats-heading" className="bg-surface-muted">
        <Container className="flex flex-col gap-10 py-16 lg:py-20">
          <SectionIntro
            eyebrow={learningFormatsContent.eyebrow}
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
