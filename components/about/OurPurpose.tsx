import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";

/** "A bridge from I wonder to I made this." (Figma 14:16603). */
export function OurPurpose() {
  return (
    <section aria-labelledby="purpose-heading" className="bg-surface-muted">
      <Container className="grid gap-10 py-16 lg:grid-cols-[400px_1fr] lg:gap-16 lg:py-20 xl:gap-24">
        <div className="flex flex-col items-start gap-5">
          <EyebrowLabel>Why we come together</EyebrowLabel>
          <h2 id="purpose-heading" className="text-heading-48 font-bold text-fg">
            <span className="block">A bridge from</span>
            <span className="block">
              <span className="text-link">“I wonder”</span> to
            </span>
            <span className="block w-fit bg-linear-to-b from-link from-[58.654%] to-accent-soft bg-clip-text text-transparent">
              “I made this.”
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-body-md text-fg md:text-lead-xl">
            Learning feels different when there’s someone to exchange ideas with, a problem you care
            about, and the space to give it a try.
          </p>
          <p className="text-body-md text-fg-muted">
            That’s the spirit of Google Developer Groups on Campus at UGM. We create room for
            students to explore technology, develop practical skills, and learn from one another.
          </p>
          <p className="text-body-md text-fg-muted">
            Our campus is the starting point. The questions we ask and the things we build can reach
            beyond it.
          </p>
        </div>
      </Container>
    </section>
  );
}
