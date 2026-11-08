import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/**
 * Centers content at 1248px. With `box-content` the side padding sits outside that
 * width, so at 1440px the inset is 96px, as in Figma.
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
