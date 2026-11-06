import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { Container } from "./Container";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** Extra classes for the inner Container. */
  containerClassName?: string;
};

/**
 * Page section wrapper: full-bleed <section> with a centered Container inside.
 * Vertical spacing differs per section in Figma, so it is passed via className.
 */
export function Section({ className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn("w-full", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
