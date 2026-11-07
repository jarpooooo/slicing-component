import { Button, Container, EyebrowLabel } from "@/components/ui";

import { startingPointContent } from "../data";

/** Starting point guidance (Figma 14:17163) */
export function StartingPoint() {
  return (
    <section
      id="starting-point"
      aria-labelledby="starting-point-heading"
      className="bg-tint-yellow"
    >
      <Container className="flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:gap-16 lg:py-14">
        <div className="flex flex-col items-start gap-4 lg:w-115 lg:shrink-0">
          <EyebrowLabel>{startingPointContent.eyebrow}</EyebrowLabel>
          <h2 id="starting-point-heading" className="text-heading-36 font-bold text-fg">
            {startingPointContent.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div className="flex flex-1 flex-col items-start gap-5">
          <p className="text-body-md text-fg-muted">{startingPointContent.description}</p>
          <Button href={startingPointContent.link.href} variant="link" withArrow>
            {startingPointContent.link.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
