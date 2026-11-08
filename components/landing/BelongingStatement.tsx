import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { assets } from "@/lib/assets";

/** Green band with the spark (Figma 14:16419). */
export function BelongingStatement() {
  return (
    <section aria-labelledby="belonging-heading" className="bg-tint-green">
      <Container className="flex flex-col items-start gap-6 py-12 md:flex-row md:items-center md:gap-16 lg:py-16">
        <Image {...assets.sparkGreen} alt="" className="size-16 shrink-0 md:size-25" />
        <div className="flex flex-col gap-4">
          <h2 id="belonging-heading" className="text-heading-40 font-bold text-fg">
            <span className="block">Different majors. Different starting points.</span>
            <span className="block">A place for all of them.</span>
          </h2>
          <p className="text-body-md text-fg-muted">
            You don’t have to be the most experienced person in the room. Curiosity, kindness, and a
            willingness to learn are a good place to start.
          </p>
        </div>
      </Container>
    </section>
  );
}
