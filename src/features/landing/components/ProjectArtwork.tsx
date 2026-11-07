import { AssetIcon, brandToneTint } from "@/components/ui";
import { cn } from "@/lib/utils";

import { projectContent } from "../data";

/**
 * "Example project artwork" (Figma 14:16364, 592px wide): Yellow/50 panel, 32px radius,
 * 40px padding, 24px gaps — header, white "campus project preview" card (16px radius,
 * 26px padding) with browser dots, a 32px heading, three tinted solution tiles and a
 * caption line. Purely illustrative, so the preview is aria-hidden; the caption stays
 * readable.
 */
export function ProjectArtwork() {
  const { artwork } = projectContent;

  return (
    <figure className="flex w-full flex-col gap-6 rounded-panel bg-tint-yellow p-6 md:p-10 lg:w-148 lg:shrink-0">
      <div aria-hidden className="flex items-center justify-between">
        <span className="text-eyebrow text-fg-muted">{artwork.overline}</span>
        <span className="text-glyph-24 text-link">{"</>"}</span>
      </div>

      <div
        aria-hidden
        className="flex flex-col gap-6 rounded-box border border-border bg-surface p-5 md:p-6.5"
      >
        <AssetIcon name="browserChrome" />
        <span className="text-heading-28 font-bold text-fg md:text-heading-32">
          {artwork.headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
        <span className="grid grid-cols-3 gap-3">
          {artwork.tiles.map(({ label, tone }) => (
            <span
              key={label}
              className={cn(
                "rounded-tile p-3 text-caption leading-auto font-bold text-fg-strong sm:p-4",
                brandToneTint[tone],
              )}
            >
              {label}
            </span>
          ))}
        </span>
        <span className="text-caption text-fg-muted">{artwork.description}</span>
      </div>

      <figcaption className="text-overline text-fg-muted">{artwork.caption}</figcaption>
    </figure>
  );
}
