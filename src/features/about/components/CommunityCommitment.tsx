import Image from "next/image";

import { Container } from "@/components/ui";
import { assets } from "@/lib/assets";

import { commitmentContent } from "../data";

/**
 * "Community commitment" (Figma 14:16668): Yellow/50 band, 56px vertical padding,
 * 72px yellow spark, 64px gap, 32px heading and an 18px paragraph 14px apart.
 */
export function CommunityCommitment() {
  return (
    <section aria-labelledby="commitment-heading" className="bg-tint-yellow">
      <Container className="flex flex-col items-start gap-6 py-12 md:flex-row md:items-center md:gap-16 lg:py-14">
        <Image {...assets.sparkYellow} alt="" className="size-14 shrink-0 md:size-18" />
        <div className="flex flex-col gap-3.5">
          <h2
            id="commitment-heading"
            className="text-heading-28 font-bold text-fg md:text-heading-32"
          >
            {commitmentContent.heading}
          </h2>
          <p className="text-body-md text-fg-muted">{commitmentContent.description}</p>
        </div>
      </Container>
    </section>
  );
}
