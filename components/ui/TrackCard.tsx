import Image from "next/image";

import { assets, type AssetName } from "@/lib/assets";
import type { Track } from "@/lib/types";
import { cn } from "@/lib/utils";

import { Button } from "./Button";
import { Card } from "./Card";

// Artwork and background tint per track id. The artwork files start at the left
// edge of a 400px card, so `50% - 200px` keeps them in place at other widths.
const trackArt: Record<string, { image: AssetName; tint: string }> = {
  "research-discovery": { image: "trackResearch", tint: "bg-tint-blue" },
  "design-creativity": { image: "trackDesign", tint: "bg-tint-yellow" },
  development: { image: "trackDevelopment", tint: "bg-tint-green" },
};

/** One learning track (Figma 14:16237). */
export function TrackCard({ track }: { track: Track }) {
  const art = trackArt[track.id];

  return (
    <Card className="h-full">
      <div
        className={cn("relative h-58 shrink-0 overflow-hidden", art?.tint ?? "bg-surface-muted")}
      >
        {art && (
          <Image
            {...assets[art.image]}
            alt=""
            className="absolute top-0 left-[calc(50%-200px)] max-w-none"
          />
        )}
      </div>

      <div className="flex flex-col items-start gap-4.5 p-7">
        <p className="text-overline font-medium text-link uppercase">{track.tagline}</p>
        <h3 className="text-heading-28 font-bold text-fg">{track.name}</h3>
        <p className="text-body text-fg-muted">{track.description}</p>
        <hr className="w-full border-border" />
        <p className="text-caption text-fg-muted">{track.skills.join(" · ")}</p>
        <Button href={track.explore_link} variant="link" withArrow>
          Explore this track
          <span className="sr-only">: {track.name}</span>
        </Button>
      </div>
    </Card>
  );
}
