import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import type { InquiryCategory } from "@/lib/types";

// Tip titles from Figma. Categories not listed here either open with their own
// question ("Not sure which category fits? ...") or fall back to their label.
const tipTitles: Record<string, string> = {
  "joining-learning": "For learning questions",
  collaboration: "For collaborations",
};

function toTip(category: InquiryCategory) {
  const question = category.guidance.match(/^([^.?!]+\?)\s+([\s\S]+)$/);
  if (question) return { title: question[1], description: question[2] };
  return { title: tipTitles[category.id] ?? category.label, description: category.guidance };
}

type InquiryGuidanceProps = {
  categories: InquiryCategory[];
};

/** "Help us understand your idea." tips, one per topic (Figma 14:16834). */
export function InquiryGuidance({ categories }: InquiryGuidanceProps) {
  return (
    <section aria-labelledby="guidance-heading" className="border-t border-border">
      <Container className="grid gap-10 py-14 lg:grid-cols-[420px_1fr] lg:gap-16 lg:py-18 xl:gap-20">
        <div className="flex flex-col items-start gap-5">
          <EyebrowLabel>A little guidance</EyebrowLabel>
          <h2 id="guidance-heading" className="text-heading-40 font-bold text-fg">
            <span className="block">Help us understand</span>
            <span className="block">your idea.</span>
          </h2>
          <Button href="/overview" variant="link" withArrow>
            Explore the programs first
          </Button>
        </div>

        {categories.length === 0 ? (
          <EmptyState title="Guidance is coming soon" />
        ) : (
          <ul className="flex flex-col gap-6.5">
            {categories.map((category) => {
              const tip = toTip(category);
              return (
                <li key={category.id} className="flex flex-col gap-2.5">
                  <h3 className="text-heading-21 font-bold text-fg">{tip.title}</h3>
                  <p className="text-body text-fg-muted">{tip.description}</p>
                  <hr className="border-border" />
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </section>
  );
}
