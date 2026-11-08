import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";

/** "New to tech? That’s a starting point, too." (Figma 14:17163). */
export function StartingPoint() {
  return (
    <section
      id="starting-point"
      aria-labelledby="starting-point-heading"
      className="bg-tint-yellow"
    >
      <Container className="flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:gap-16 lg:py-14">
        <div className="flex flex-col items-start gap-4 lg:w-115 lg:shrink-0">
          <EyebrowLabel>Start where you are</EyebrowLabel>
          <h2 id="starting-point-heading" className="text-heading-36 font-bold text-fg">
            <span className="block">New to tech?</span>
            <span className="block">That’s a starting point, too.</span>
          </h2>
        </div>

        <div className="flex flex-1 flex-col items-start gap-5">
          <p className="text-body-md text-fg-muted">
            You don’t need a finished portfolio or the perfect track choice. Pick a topic you’re
            curious about. If you’re unsure, tell us what interests you and we can start a
            conversation.
          </p>
          <Button href="/contact" variant="link" withArrow>
            Ask about getting started
          </Button>
        </div>
      </Container>
    </section>
  );
}
