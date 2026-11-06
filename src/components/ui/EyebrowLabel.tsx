import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export type BrandTone = "blue" | "red" | "yellow" | "green";

/** Background class per brand tone — shared by markers, dots and accents. */
export const brandToneBg: Record<BrandTone, string> = {
  blue: "bg-brand-blue",
  red: "bg-brand-red",
  yellow: "bg-brand-yellow",
  green: "bg-brand-green",
};

type EyebrowLabelProps = ComponentPropsWithoutRef<"p"> & {
  tone?: BrandTone;
};

/**
 * "Section label" from Figma (e.g. 14:16068): a 7px round marker, 10px gap, then
 * an uppercase label in a 15px line box.
 *
 * TODO(figma): confirm label color and per-section marker color (geometry only
 * was available).
 */
export function EyebrowLabel({ tone = "blue", className, children, ...props }: EyebrowLabelProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-eyebrow font-medium tracking-wide text-fg-muted uppercase",
        className,
      )}
      {...props}
    >
      <span aria-hidden className={cn("size-1.75 shrink-0 rounded-full", brandToneBg[tone])} />
      {children}
    </p>
  );
}
