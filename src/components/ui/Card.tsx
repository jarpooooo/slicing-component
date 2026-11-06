import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type CardProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Bordered card from Figma "Track card" (14:16237): 1px neutral border,
 * 24px radius, white surface, content clipped to the radius.
 * Inner padding differs per card type, so it is set by the caller.
 */
export function Card<T extends ElementType = "article">({ as, className, ...props }: CardProps<T>) {
  const Component = as ?? "article";
  return (
    <Component
      className={cn(
        "flex flex-col overflow-hidden rounded-card border border-border bg-surface",
        className,
      )}
      {...props}
    />
  );
}
