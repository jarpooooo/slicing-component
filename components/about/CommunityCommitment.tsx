import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { assets } from "@/lib/assets";

/** Yellow band with the spark (Figma 14:16668). */
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
            A space to learn. A responsibility to care.
          </h2>
          <p className="text-body-md text-fg-muted">
            We want every conversation and learning experience to be respectful, inclusive, and
            constructive. Be kind, give credit, and make room for people who are just getting
            started.
          </p>
        </div>
      </Container>
    </section>
  );
}
