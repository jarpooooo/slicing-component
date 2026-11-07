import Image from "next/image";

import { Button, Card } from "@/components/ui";
import type { Track } from "@/lib/api";
import { assets, type AssetName } from "@/lib/assets";
import { cn } from "@/lib/utils";

/**
 * Artwork and tint per track id. The text comes from GET /api/tracks.
 *
 * Each artwork file starts at the left/top edge of a 400px card, so anchoring it at
 * 50% - 200px keeps it where Figma has it when the card is wider or narrower.
 */
const trackVisuals: Record<string, { image: AssetName; tint: string; position: string }> = {
  "research-discovery": {
    image: "trackResearch",
    tint: "bg-tint-blue",
    position: "top-0 left-[calc(50%-200px)]",
  },
  "design-creativity": {
    image: "trackDesign",
    tint: "bg-tint-yellow",
    position: "top-0 left-[calc(50%-200px)]",
  },
  development: {
    image: "trackDevelopment",
    tint: "bg-tint-green",
    position: "top-0 left-[calc(50%-200px)]",
  },
};

export const TRACK_CARD_LINK_LABEL = "Explore this track";

/** Track card (Figma 14:16237) */
export function TrackCard({ track }: { track: Track }) {
  const visual = trackVisuals[track.id];
  const image = visual ? assets[visual.image] : null;

  return (
    <Card className="h-full">
      <div
        className={cn("relative h-58 shrink-0 overflow-hidden", visual?.tint ?? "bg-surface-muted")}
      >
        {image && visual && (
          <Image {...image} alt="" className={cn("absolute max-w-none", visual.position)} />
        )}
      </div>

      <div className="flex flex-col items-start gap-4.5 p-7">
        <p className="text-overline font-medium text-link uppercase">{track.tagline}</p>
        <h3 className="text-heading-28 font-bold text-fg">{track.name}</h3>
        <p className="text-body text-fg-muted">{track.description}</p>
        <hr className="w-full border-border" />
        <p className="text-caption text-fg-muted">{track.skills.join(" · ")}</p>
        <Button href={track.explore_link} variant="link" withArrow>
          {TRACK_CARD_LINK_LABEL}
          <span className="sr-only">: {track.name}</span>
        </Button>
      </div>
    </Card>
  );
}
