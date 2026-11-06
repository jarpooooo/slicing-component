import Image from "next/image";

import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

import { heroContent } from "../data";

/**
 * "Ideas coming together" artwork (Figma 14:16089, 620×530).
 *
 * This is a layered illustration, so its pieces are absolutely positioned —
 * but in percentages of the 620×530 frame, so the whole composition scales
 * with its container instead of being fixed to desktop pixels.
 *
 * The exported SVGs include a drop-shadow/glow that bleeds down and left, so the
 * visible tile sits near the top-right of each SVG. Positions align the tile
 * center (measured in the SVG) with the Figma instance center:
 *   research    tile center (260, 126) in SVG → instance center (139, 123)
 *   development tile center (435, 207) in SVG → instance center (382, 281)
 */
export function HeroArtwork({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-620/530 w-full max-w-155", className)}>
      <Image {...assets.heroGlassBg} alt="" priority className="absolute inset-0 size-full" />
      <Image
        {...assets.heroResearch}
        alt=""
        priority
        className="absolute top-[-0.5%] left-[-19.5%] h-auto w-[61.9%] max-w-none"
      />
      <Image
        {...assets.heroDevelopment}
        alt=""
        priority
        className="absolute top-[14%] left-[-8.5%] h-auto w-[104.8%] max-w-none"
      />

      {/* Learning sticker (14:16090) — 252×87 @ (24, 356), slightly rotated */}
      <p className="absolute top-[50%] left-[3.9%] w-[46%] -rotate-2 rounded-control bg-yellow-300 px-4 py-3 text-small font-medium text-fg sm:top-[67.2%] sm:w-[40.6%] sm:px-5 sm:py-3.5">
        {heroContent.sticker}
      </p>

      {/* Campus label (14:16092) — 237×35 pill @ (300, 455) */}
      <p className="absolute top-[88%] right-[3%] inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-4 py-2.5 text-eyebrow font-medium whitespace-nowrap text-fg sm:top-[85.8%] sm:right-auto sm:left-[48.4%]">
        <span aria-hidden className="size-2 shrink-0 rounded-full bg-brand-green" />
        {heroContent.campusLabel}
      </p>
    </div>
  );
}
