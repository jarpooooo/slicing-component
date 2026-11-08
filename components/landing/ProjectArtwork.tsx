import { AssetIcon } from "@/components/ui/AssetIcon";
import { brandToneTint, type BrandTone } from "@/lib/brand";
import { cn } from "@/lib/utils";

const tiles: { label: string; tone: BrandTone }[] = [
  { label: "Discover", tone: "blue" },
  { label: "Connect", tone: "green" },
  { label: "Share", tone: "red" },
];

/**
 * Example project brief (Figma 14:16364). Only decoration, so the preview card is
 * hidden from screen readers and they get the caption instead.
 */
export function ProjectArtwork() {
  return (
    <figure className="flex w-full flex-col gap-6 rounded-panel bg-tint-yellow p-6 md:p-10 lg:w-148 lg:shrink-0">
      <div aria-hidden className="flex items-center justify-between">
        <span className="text-eyebrow text-fg-muted">IDEA → PROTOTYPE</span>
        <span className="text-glyph-24 text-link">{"</>"}</span>
      </div>

      <div
        aria-hidden
        className="flex flex-col gap-6 rounded-box border border-border bg-surface p-5 md:p-6.5"
      >
        <AssetIcon name="browserChrome" />
        <span className="text-heading-28 font-bold text-fg md:text-heading-32">
          <span className="block">A little less friction.</span>
          <span className="block">A better campus day.</span>
        </span>
        <span className="grid grid-cols-3 gap-3">
          {tiles.map(({ label, tone }) => (
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
        <span className="text-caption text-fg-muted">
          Start with a student need. Build a small, useful solution.
        </span>
      </div>

      <figcaption className="text-overline text-fg-muted">
        EXAMPLE PROJECT BRIEF • NOT A LAUNCHED PRODUCT
      </figcaption>
    </figure>
  );
}
