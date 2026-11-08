import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TrackList } from "@/components/ui/TrackList";
import type { Track } from "@/lib/types";

type TrackDiscoveryProps = {
  tracks: Track[];
};

/** "Find your starting point" with the three track cards (Figma 14:16224). */
export function TrackDiscovery({ tracks }: TrackDiscoveryProps) {
  return (
    <section aria-labelledby="tracks-heading">
      <Container className="flex flex-col gap-9 pt-4 pb-16 lg:pb-22">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="Find your starting point"
            heading="Many interests. One shared journey."
            headingId="tracks-heading"
            description="Follow what excites you. Explore a track, then connect the dots with others."
          />
          <Button href="/overview" variant="link" withArrow>
            See the overview
          </Button>
        </div>
        <TrackList tracks={tracks} />
      </Container>
    </section>
  );
}
