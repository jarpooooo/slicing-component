import { Button, Container, SectionIntro } from "@/components/ui";

import { waysToBelong, waysToBelongContent } from "../data";

/**
 * "Ways to belong" (Figma 14:16644): heading and link on the left, a list of
 * three divided rows on the right. Same 400/752 split as the Landing FAQ.
 */
export function WaysToBelong() {
  return (
    <section aria-labelledby="belong-heading">
      <Container className="grid gap-10 py-16 lg:grid-cols-[400fr_752fr] lg:gap-24 lg:py-22">
        <div className="flex flex-col items-start gap-5">
          <SectionIntro
            eyebrow={waysToBelongContent.eyebrow}
            tone="green"
            heading={waysToBelongContent.heading}
            headingId="belong-heading"
          />
          <Button href={waysToBelongContent.link.href} variant="link" withArrow>
            {waysToBelongContent.link.label}
          </Button>
        </div>

        <ol className="flex flex-col border-t border-border">
          {waysToBelong.map((way, index) => (
            <li
              key={way.id}
              className="grid gap-2 border-b border-border py-6 md:grid-cols-[3.5rem_1fr] md:gap-6 md:py-8"
            >
              <span aria-hidden className="text-title-md font-bold text-fg-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-title-md font-bold text-fg">{way.title}</h3>
                <p className="text-body text-fg-muted">{way.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
