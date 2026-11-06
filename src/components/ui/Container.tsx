import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Centers content at the Figma content width (1248px). `box-content` keeps the
 * content box at 1248px while the side padding only matters below ~1440px, so at
 * the design width the inset is exactly 96px like the Figma frame.
 */
export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn("mx-auto box-content max-w-content px-4 md:px-8 lg:px-12", className)}
      {...props}
    />
  );
}
