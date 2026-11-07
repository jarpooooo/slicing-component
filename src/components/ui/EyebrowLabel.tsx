import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export type BrandTone = "blue" | "red" | "yellow" | "green";

/** Background class per brand tone (markers, dots, accents). */
export const brandToneBg: Record<BrandTone, string> = {
  blue: "bg-brand-blue",
  red: "bg-brand-red",
  yellow: "bg-brand-yellow",
  green: "bg-brand-green",
};

/** Light tint per brand tone (illustration panels, program icons, solution tiles). */
export const brandToneTint: Record<BrandTone, string> = {
  blue: "bg-tint-blue",
  red: "bg-tint-red",
  yellow: "bg-tint-yellow",
  green: "bg-tint-green",
};

/** Section label (Figma 14:16068): blue marker and uppercase label. */
export function EyebrowLabel({ className, children, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-eyebrow font-medium text-fg-muted uppercase",
        className,
      )}
      {...props}
    >
      <span aria-hidden className="size-1.75 shrink-0 rounded-full bg-brand-blue" />
      {children}
    </p>
  );
}
