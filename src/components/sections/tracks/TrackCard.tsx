import Image from "next/image";

import { Button, Card } from "@/components/ui";
import type { Track } from "@/lib/api";
import { assets, type AssetName } from "@/lib/assets";
import { cn } from "@/lib/utils";

/**
 * Visual mapping per track id; all text comes from GET /api/tracks.
 *
 * Each artwork file covers the instance's render bounds as clipped by the card in
 * Figma (measured in the Plugin API): it starts at the card's left/top edge of a
 * 400px card. Anchoring it at 50% − 200px keeps the artwork where Figma has it
 * (≈ centered) when the card is wider or narrower than 400px.
 */
const trackVisuals: Record<string, { image: AssetName; tint: string; position: string }> = {
  "research-discovery": {
    image: "trackResearch",
    tint: "bg-tint-blue", // [node] 14:16238 #EAF2FF
    position: "top-0 left-[calc(50%-200px)]",
  },
  "design-creativity": {
    image: "trackDesign",
    tint: "bg-tint-yellow", // [node] 14:16273 #FFF7DF
    position: "top-0 left-[calc(50%-200px)]",
  },
  development: {
    image: "trackDevelopment",
    tint: "bg-tint-green", // [node] 14:16310 #EAF5ED
    position: "top-0 left-[calc(50%-200px)]",
  },
};

export const TRACK_CARD_LINK_LABEL = "Explore this track";

/**
 * "Track card" (Figma 14:16237): 1px border, 24px radius, 232px tinted illustration
 * panel, then details with 28px padding and 18px gaps — theme overline, 28px name,
 * description, divider, topics and a text link.
 */
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
