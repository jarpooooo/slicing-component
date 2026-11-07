import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type CardProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/** Bordered card (Figma 14:16237). Padding differs per card, so callers set it. */
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
