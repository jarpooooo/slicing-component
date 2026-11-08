import { AssetIcon } from "@/components/ui/AssetIcon";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { AssetName } from "@/lib/assets";
import type { LearningFormat } from "@/lib/types";
import { humanizeSlug } from "@/lib/utils";

const formatIcons: Record<string, AssetName> = {
  "study-groups": "iconBook",
  "hands-on-workshops": "iconCode",
  "project-circles": "iconUsers",
  "knowledge-sharing": "iconLightbulb",
};

type LearningFormatsProps = {
  formats: LearningFormat[];
};

/** "Less watching. More making." format cards (Figma 14:16333). */
export function LearningFormats({ formats }: LearningFormatsProps) {
  return (
    <section aria-labelledby="formats-heading" className="bg-surface-muted">
      <Container className="flex flex-col gap-10 py-16 lg:py-20">
        <SectionIntro
          eyebrow="More than a classroom"
          heading="Less watching. More making."
          headingId="formats-heading"
          description="Learn in a way that turns a new concept into something you can actually use."
        />

        {formats.length === 0 ? (
          <EmptyState title="No learning formats yet" />
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {formats.map((format) => (
              <li key={format.id}>
                <FormatCard format={format} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

function FormatCard({ format }: { format: LearningFormat }) {
  return (
    <article className="flex h-full flex-col items-start gap-5 rounded-card bg-surface p-8">
      <AssetIcon name={formatIcons[format.id] ?? "iconBook"} className="size-6" />
      <h3 className="text-heading-28 font-bold text-fg">{format.name}</h3>
      <p className="text-body text-fg-muted">{format.description}</p>
      <hr className="w-full border-border" />
      <p className="text-caption leading-auto font-medium text-link">{humanizeSlug(format.cta)}</p>
    </article>
  );
}
