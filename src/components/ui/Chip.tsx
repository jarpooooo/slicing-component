import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/**
 * "Attribute" chip from Figma "Community attributes" (14:16218): 32px tall,
 * 14px x-padding, pill shape.
 *
 * TODO(figma): confirm fill/border color and label size for 14:16218 — only its
 * geometry was read before the MCP rate limit.
 */
export function Chip({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center rounded-pill border border-border px-3.5 text-caption text-fg-muted",
        className,
      )}
      {...props}
    />
  );
}
