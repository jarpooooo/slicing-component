import { TrackGrid } from "@/components/sections";
import { Container, SectionIntro } from "@/components/ui";

import { outcomesContent, trackOverviewContent } from "../data";

import { OutcomesTable } from "./OutcomesTable";

/**
 * Track overview (Figma 14:16957) and learning outcomes (14:17061): track cards and
 * a comparison table, both from GET /api/tracks.
 */
export function TrackOverview() {
  return (
    <section id="learning-tracks" aria-labelledby="track-overview-heading">
      <Container className="flex flex-col gap-9 py-16 lg:py-20">
        <SectionIntro
          eyebrow={trackOverviewContent.eyebrow}
          heading={trackOverviewContent.heading}
          headingId="track-overview-heading"
          description={trackOverviewContent.description}
        />
        <TrackGrid />
      </Container>

      <Container className="flex flex-col gap-8 pb-16 lg:pb-20">
        <h3 id="outcomes-heading" className="text-heading-36 font-bold text-fg">
          {outcomesContent.heading}
        </h3>
        <OutcomesTable labelledBy="outcomes-heading" />
        <p className="text-caption text-fg-muted">{outcomesContent.footnote}</p>
      </Container>
    </section>
  );
}
