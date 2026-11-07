import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/** Attribute chip (Figma 14:16218) */
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
