import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TrackList } from "@/components/ui/TrackList";
import type { Track } from "@/lib/types";

import { OutcomesTable } from "./OutcomesTable";

type TrackOverviewProps = {
  tracks: Track[];
};

/** Track cards followed by the comparison table (Figma 14:16957 and 14:17061). */
export function TrackOverview({ tracks }: TrackOverviewProps) {
  return (
    <section id="learning-tracks" aria-labelledby="track-overview-heading">
      <Container className="flex flex-col gap-9 py-16 lg:py-20">
        <SectionIntro
          eyebrow="Explore your interests"
          heading="Three ways in. Plenty of ways forward."
          headingId="track-overview-heading"
          description="These pathways are starting points, not boxes. Follow one deeply or bring different skills together."
        />
        <TrackList tracks={tracks} />
      </Container>

      {tracks.length > 0 && (
        <Container className="flex flex-col gap-8 pb-16 lg:pb-20">
          <h3 id="outcomes-heading" className="text-heading-36 font-bold text-fg">
            From an interest to something you can show.
          </h3>
          <OutcomesTable tracks={tracks} labelledBy="outcomes-heading" />
          <p className="text-caption text-fg-muted">
            Illustrative learning outcomes. Topics and opportunities are shared through community
            updates.
          </p>
        </Container>
      )}
    </section>
  );
}
