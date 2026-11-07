import Image from "next/image";

import { assets } from "@/lib/assets";
import { cn } from "@/lib/utils";

import { heroContent } from "../data";

/**
 * Hero artwork (Figma 14:16089, 620×530). The layers are placed in percentages of
 * the frame, so the whole piece scales with its container.
 *
 * Each file covers its node's render bounds, drop shadows included, and is placed
 * by those bounds (measured in the Plugin API, relative to the frame):
 *   glass tile   (0, 0)        620 × 530   2x WebP, since SVG can't do background blur
 *   research     (-109.7, 2)   383 × 421
 *   development  (-41.4, 85)   649 × 696
 */
export function HeroArtwork({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-620/530 w-full max-w-155", className)}>
      <Image
        {...assets.heroGlassBg}
        alt=""
        priority
        unoptimized
        className="absolute inset-0 size-full rounded-panel"
      />
      <Image
        {...assets.heroResearch}
        alt=""
        priority
        className="absolute top-[0.38%] left-[-17.7%] h-auto w-[61.94%] max-w-none"
      />
      <Image
        {...assets.heroDevelopment}
        alt=""
        priority
        className="absolute top-[16.04%] left-[-6.67%] h-auto w-[104.84%] max-w-none"
      />

      {/* Learning sticker (14:16090), rotated -7° and centered in its 252×87 box
          at (24, 326) */}
      <p className="absolute top-[69.65%] left-[24.2%] -translate-1/2 -rotate-7 rounded-control border border-border bg-surface px-2.5 py-1.5 text-small leading-auto font-bold whitespace-nowrap text-fg sm:px-5 sm:py-3.5 sm:text-sticker">
        {heroContent.sticker}
      </p>

      {/* Campus label (14:16092) at (300, 455) */}
      <p className="absolute top-[85.85%] left-[48.4%] inline-flex items-center gap-2 rounded-pill bg-surface px-4 py-2.5 text-eyebrow whitespace-nowrap text-fg-muted max-sm:right-[3%] max-sm:left-auto">
        <span aria-hidden className="size-2 shrink-0 rounded-full bg-brand-green" />
        <span>
          Built on <strong className="font-bold">curiosity.</strong> Rooted in{" "}
          <strong className="font-bold">UGM.</strong>
        </span>
      </p>
    </div>
  );
}
