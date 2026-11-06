import { brandToneBg, type BrandTone } from "@/components/ui";
import { cn } from "@/lib/utils";

import { projectContent } from "../data";

const windowDots: BrandTone[] = ["red", "yellow", "green"];

/**
 * "Example project artwork" (Figma 14:16364, 592×444): a decorative card showing
 * a mock campus project — header, browser-like preview with solution tiles,
 * and a caption. Purely illustrative, so the preview is aria-hidden except for
 * its caption.
 *
 * The Figma screenshot renders this panel dark; the fill could not be read
 * (rate limit), so it uses the muted surface token to keep text contrast high.
 */
export function ProjectArtwork() {
  const { artwork } = projectContent;

  return (
    <figure className="flex flex-col gap-6 rounded-card bg-surface-muted p-6 md:p-10">
      <div aria-hidden className="flex items-center justify-between">
        <span className="text-overline font-medium text-fg-muted uppercase">
          {artwork.overline}
        </span>
        <span className="text-title-sm font-bold text-link">{"</>"}</span>
      </div>

      <div
        aria-hidden
        className="flex flex-col gap-6 rounded-card border border-border bg-surface p-5 md:p-6.5"
      >
        <span className="flex gap-1.5">
          {windowDots.map((tone) => (
            <span key={tone} className={cn("size-2 rounded-full", brandToneBg[tone])} />
          ))}
        </span>
        <span className="text-heading-sm font-bold text-fg">{artwork.heading}</span>
        <span className="grid grid-cols-3 gap-3">
          {artwork.tiles.map((tile) => (
            <span
              key={tile}
              className="flex h-12 items-center rounded-control bg-surface-muted px-3 text-caption font-medium text-fg md:px-4"
            >
              {tile}
            </span>
          ))}
        </span>
        <span className="text-small text-fg-muted">{artwork.description}</span>
      </div>

      <figcaption className="text-caption text-fg-muted">{artwork.caption}</figcaption>
    </figure>
  );
}
