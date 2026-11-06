import Image from "next/image";

import { Container } from "@/components/ui";
import { assets } from "@/lib/assets";

import { commitmentContent } from "../data";

/**
 * "Community commitment" (Figma 14:16668): full-width band with the yellow
 * spark, a heading and a paragraph.
 *
 * Contrast: the band fill could not be read from Figma (rate limit) and the
 * design render looks dark with low-contrast text, so it uses the muted
 * surface token with fg / fg-muted text instead.
 */
export function CommunityCommitment() {
  return (
    <section aria-labelledby="commitment-heading" className="bg-surface-muted">
      <Container className="flex flex-col gap-6 py-12 md:flex-row md:items-center md:gap-10 lg:py-16">
        <Image {...assets.sparkYellow} alt="" className="size-14 shrink-0 md:size-18" />
        <div className="flex flex-col gap-3">
          <h2
            id="commitment-heading"
            className="text-heading-sm font-bold text-balance text-fg md:text-heading-md"
          >
            {commitmentContent.heading}
          </h2>
          <p className="max-w-200 text-body-md text-fg-muted">{commitmentContent.description}</p>
        </div>
      </Container>
    </section>
  );
}
