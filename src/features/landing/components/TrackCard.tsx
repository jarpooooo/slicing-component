import Image from "next/image";

import { Button, Card } from "@/components/ui";
import type { Track } from "@/lib/api";
import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

import { trackDiscoveryContent, trackVisuals } from "../data";

type TrackCardProps = {
  track: Track;
};

/**
 * "Track card" (Figma 14:16237): 232px illustration panel, then details with
 * 28px padding and 18px gaps. Text comes from GET /api/tracks; the illustration
 * and panel tint are mapped by track id in data.ts.
 */
export function TrackCard({ track }: TrackCardProps) {
  const visual = trackVisuals[track.id];
  const image = visual ? assets[visual.image] : null;

  return (
    <Card className="h-full">
      <div
        className={cn(
          "relative h-58 shrink-0 overflow-hidden",
          visual?.illustrationClass ?? "bg-surface-muted",
        )}
      >
        {image && (
          <Image
            {...image}
            alt=""
            // Tile center sits ~208px from the SVG left edge (shadow bleeds left/down);
            // align it with the card center like the Figma instance (14:16239).
            className="absolute -top-1 left-[calc(50%-208px)] max-w-none"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4.5 p-7">
        <p className="text-overline font-medium text-link uppercase">{track.tagline}</p>
        <h3 className="text-heading-sm font-bold text-fg">{track.name}</h3>
        <p className="text-body text-fg-muted">{track.description}</p>
        <hr className="border-border" />
        <p className="text-caption text-fg-muted">{track.skills.join(" · ")}</p>
        <Button href={track.explore_link} variant="link" withArrow className="mt-auto self-start">
          {trackDiscoveryContent.cardLinkLabel}
          <span className="sr-only">: {track.name}</span>
        </Button>
      </div>
    </Card>
  );
}
