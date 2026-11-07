import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/**
 * "Attribute" chip from Figma "Community attributes" (14:16218): Neutrals/300 fill,
 * 14px × 8px padding, pill shape, 13px Bold muted label.
 */
export function Chip({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill bg-surface-muted px-3.5 py-2 text-caption leading-auto font-bold whitespace-nowrap text-fg-muted",
        className,
      )}
      {...props}
    />
  );
}
