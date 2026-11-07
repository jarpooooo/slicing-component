import { Button, Container, EyebrowLabel } from "@/components/ui";

import { guidanceContent } from "../data";

import { InquiryTips } from "./InquiryTips";

/**
 * "Before you send" (Figma 14:16834): top border, 72px padding; a 420px "helpful
 * information" column (20px gaps, 40px heading) and the inquiry tips from
 * GET /api/inquiry-categories, 80px apart.
 */
export function InquiryGuidance() {
  return (
    <section aria-labelledby="guidance-heading" className="border-t border-border">
      <Container className="grid gap-10 py-14 lg:grid-cols-[420px_1fr] lg:gap-16 lg:py-18 xl:gap-20">
        <div className="flex flex-col items-start gap-5">
          <EyebrowLabel>{guidanceContent.eyebrow}</EyebrowLabel>
          <h2 id="guidance-heading" className="text-heading-40 font-bold text-fg">
            {guidanceContent.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <Button href={guidanceContent.link.href} variant="link" withArrow>
            {guidanceContent.link.label}
          </Button>
        </div>

        <InquiryTips />
      </Container>
    </section>
  );
}
