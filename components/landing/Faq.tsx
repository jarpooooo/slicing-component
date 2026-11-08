import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import type { Faq as FaqItem } from "@/lib/types";

import { FaqAccordion } from "./FaqAccordion";

type FaqProps = {
  faqs: FaqItem[];
};

/** "Wondering where to begin?" questions (Figma 14:16424). */
export function Faq({ faqs }: FaqProps) {
  return (
    <section aria-labelledby="faq-heading">
      <Container className="grid gap-10 py-16 lg:grid-cols-[400px_1fr] lg:gap-16 lg:py-22 xl:gap-24">
        <div className="flex flex-col items-start gap-5">
          <EyebrowLabel>A few good questions</EyebrowLabel>
          <h2 id="faq-heading" className="text-heading-48 font-bold text-fg">
            <span className="block">Wondering where</span>
            <span className="block">to begin?</span>
          </h2>
          <Button href="/contact" variant="link" withArrow>
            Ask us a question
          </Button>
        </div>

        {faqs.length === 0 ? (
          <EmptyState
            title="No questions yet"
            description="Ask us directly via the contact page."
          />
        ) : (
          <FaqAccordion faqs={faqs} />
        )}
      </Container>
    </section>
  );
}
