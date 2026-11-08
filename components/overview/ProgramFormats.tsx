import { AssetIcon } from "@/components/ui/AssetIcon";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { AssetName } from "@/lib/assets";
import { brandToneTint, type BrandTone } from "@/lib/brand";
import type { LearningFormat } from "@/lib/types";
import { cn, humanizeSlug } from "@/lib/utils";

// Details from Figma that the API has no field for.
const programStyles: Record<string, { icon: AssetName; tone: BrandTone; bestFor: string }> = {
  "study-groups": { icon: "iconBook", tone: "blue", bestFor: "Learning the fundamentals" },
  "hands-on-workshops": { icon: "iconCode", tone: "green", bestFor: "Trying something new" },
  "project-circles": { icon: "iconUsers", tone: "yellow", bestFor: "Putting skills into practice" },
  "knowledge-sharing": { icon: "iconLightbulb", tone: "red", bestFor: "Exchanging perspectives" },
};

type ProgramFormatsProps = {
  formats: LearningFormat[];
};

/** "The format changes. The curiosity stays." program cards (Figma 14:17087). */
export function ProgramFormats({ formats }: ProgramFormatsProps) {
  return (
    <section
      id="learning-formats"
      aria-labelledby="program-formats-heading"
      className="bg-surface-muted"
    >
      <Container className="flex flex-col gap-9 py-16 lg:py-20">
        <SectionIntro
          eyebrow="Ways to learn"
          heading="The format changes. The curiosity stays."
          headingId="program-formats-heading"
          description="Explore the kinds of experiences that help you move from understanding to doing."
        />

        {formats.length === 0 ? (
          <EmptyState title="No learning formats yet" />
        ) : (
          <ul className="grid gap-6 lg:grid-cols-2">
            {formats.map((format) => (
              <li key={format.id}>
                <ProgramCard format={format} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

function ProgramCard({ format }: { format: LearningFormat }) {
  const style = programStyles[format.id];

  return (
    <article className="flex h-full gap-6 rounded-card bg-surface p-6 sm:p-7">
      <span
        aria-hidden
        className={cn(
          "flex size-13 shrink-0 items-center justify-center rounded-icon",
          brandToneTint[style?.tone ?? "blue"],
        )}
      >
        <AssetIcon name={style?.icon ?? "iconBook"} className="size-6" />
      </span>
      <div className="flex flex-col gap-3.5">
        <h3 className="text-heading-24 font-bold text-fg sm:text-heading-27">{format.name}</h3>
        <p className="text-body text-fg-muted">{format.description}</p>
        <p className="text-caption leading-auto font-medium text-link">
          Best for • {style?.bestFor ?? humanizeSlug(format.cta)}
        </p>
      </div>
    </article>
  );
}
