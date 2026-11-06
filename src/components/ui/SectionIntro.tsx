import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { EyebrowLabel, type BrandTone } from "./EyebrowLabel";

type SectionIntroProps = {
  eyebrow: string;
  tone?: BrandTone;
  heading: ReactNode;
  /** id for the heading so the parent <section> can use aria-labelledby. */
  headingId: string;
  description?: ReactNode;
  /** "lg" = section headings (48px on desktop), "md" = statement headings (40px). */
  size?: "lg" | "md";
  className?: string;
};

/**
 * "Section introduction" pattern from Figma (e.g. 14:16226, 14:16334):
 * section label → heading (18–20px below) → optional description (18px below).
 * Headings step down on smaller screens.
 */
export function SectionIntro({
  eyebrow,
  tone = "blue",
  heading,
  headingId,
  description,
  size = "lg",
  className,
}: SectionIntroProps) {
  return (
    <div className={cn("flex max-w-200 flex-col items-start", className)}>
      <EyebrowLabel tone={tone}>{eyebrow}</EyebrowLabel>
      <h2
        id={headingId}
        className={cn(
          "mt-5 font-bold text-balance text-fg",
          size === "lg"
            ? "text-heading-sm md:text-heading-md lg:text-heading-lg"
            : "text-heading-sm md:text-heading-md",
        )}
      >
        {heading}
      </h2>
      {description && <p className="mt-4.5 text-body-md text-fg-muted">{description}</p>}
    </div>
  );
}
