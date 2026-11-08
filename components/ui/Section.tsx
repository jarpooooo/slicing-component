import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

import { Container } from "./Container";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** Extra classes for the inner Container. */
  containerClassName?: string;
};

/**
 * Full-width <section> with a Container inside. Vertical padding differs per
 * section, so it comes in through className.
 */
export function Section({ className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn("w-full", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
