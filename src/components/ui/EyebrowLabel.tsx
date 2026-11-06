import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type Tone = "blue" | "red" | "yellow" | "green";

const markerTone: Record<Tone, string> = {
  blue: "bg-brand-blue",
  red: "bg-brand-red",
  yellow: "bg-brand-yellow",
  green: "bg-brand-green",
};

type EyebrowLabelProps = ComponentPropsWithoutRef<"p"> & {
  tone?: Tone;
};

/**
 * "Section label" from Figma (e.g. 14:16068): a 7px round marker, 10px gap, then
 * an uppercase label.
 *
 * TODO(figma): confirm the label font size/color and the marker color per
 * section — those nodes were not read before the MCP rate limit. Uses the
 * overline token for now.
 */
export function EyebrowLabel({ tone = "blue", className, children, ...props }: EyebrowLabelProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-overline font-medium text-fg-muted uppercase",
        className,
      )}
      {...props}
    >
      <span aria-hidden className={cn("size-1.75 shrink-0 rounded-full", markerTone[tone])} />
      {children}
    </p>
  );
}
