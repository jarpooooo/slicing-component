import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { EyebrowLabel } from "./EyebrowLabel";

type SectionIntroProps = {
  eyebrow: string;
  heading: ReactNode;
  /** id for the heading so the parent <section> can use aria-labelledby. */
  headingId: string;
  description?: ReactNode;
  /** Heading level; sections use h2 by default. */
  as?: "h1" | "h2";
  /** Classes for the heading (defaults to the 48px section heading). */
  headingClassName?: string;
  className?: string;
};

/**
 * "Section introduction" from Figma (e.g. 14:16226, 14:16334): section label,
 * 48px Bold heading and an optional 18px description, 18px apart. Width 800px.
 * Callers can change the gap (some intros use 20–22px) through className.
 */
export function SectionIntro({
  eyebrow,
  heading,
  headingId,
  description,
  as: Heading = "h2",
  headingClassName,
  className,
}: SectionIntroProps) {
  return (
    <div className={cn("flex max-w-200 flex-col items-start gap-4.5", className)}>
      <EyebrowLabel>{eyebrow}</EyebrowLabel>
      <Heading id={headingId} className={cn("text-heading-48 font-bold text-fg", headingClassName)}>
        {heading}
      </Heading>
      {description && <p className="text-body-md text-fg-muted">{description}</p>}
    </div>
  );
}
