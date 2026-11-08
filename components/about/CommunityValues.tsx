import { AssetIcon } from "@/components/ui/AssetIcon";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { AssetName } from "@/lib/assets";
import { brandToneBg, type BrandTone } from "@/lib/brand";
import type { CommunityValue } from "@/lib/types";
import { cn } from "@/lib/utils";

// The API sends an emoji and a hex color per value; the design uses line icons and
// brand tokens instead.
const valueStyles: Record<string, { tone: BrandTone; icon: AssetName }> = {
  "stay-curious": { tone: "blue", icon: "iconBook" },
  "make-room": { tone: "red", icon: "iconUsers" },
  "learn-by-building": { tone: "yellow", icon: "iconCode" },
  "give-something-back": { tone: "green", icon: "iconHeart" },
};

type CommunityValuesProps = {
  values: CommunityValue[];
};

/** "What guides us" value cards (Figma 14:16613). */
export function CommunityValues({ values }: CommunityValuesProps) {
  return (
    <section aria-labelledby="values-heading">
      <Container className="flex flex-col gap-10 py-16 lg:py-22">
        <SectionIntro
          eyebrow="What guides us"
          heading="Good technology starts with good company."
          headingId="values-heading"
        />

        {values.length === 0 ? (
          <EmptyState title="Values are coming soon" />
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <li key={value.id}>
                <ValueCard value={value} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

function ValueCard({ value }: { value: CommunityValue }) {
  const style = valueStyles[value.id] ?? { tone: "blue", icon: "iconBook" };

  return (
    <Card className="h-full items-start gap-5.5 p-6.5">
      <span aria-hidden className={cn("h-1 w-9 rounded-xs", brandToneBg[style.tone])} />
      <AssetIcon name={style.icon} className="size-6" />
      <h3 className="text-heading-24 font-bold text-fg">{value.title}</h3>
      <p className="text-body text-fg-muted">{value.description}</p>
    </Card>
  );
}
