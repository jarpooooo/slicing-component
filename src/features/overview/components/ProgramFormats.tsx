"use client";

import { AsyncContent, EmptyState, ErrorState, LoadingSkeleton } from "@/components/states";
import { AssetIcon, brandToneTint, Container, SectionIntro } from "@/components/ui";
import { useApi } from "@/hooks/useApi";
import { api, type LearningFormat } from "@/lib/api";
import { cn, humanizeSlug } from "@/lib/utils";

import { programFormatsContent, programFormatVisuals } from "../data";

/**
 * "Program formats" (Figma 14:17087): Neutrals/300 band, 80px padding, 36px gap,
 * program cards in two columns (24px gaps). Formats come from GET /api/formats.
 */
export function ProgramFormats() {
  const formats = useApi("formats", (signal) => api.getFormats({ signal }));

  return (
    <section
      id="learning-formats"
      aria-labelledby="program-formats-heading"
      className="bg-surface-muted"
    >
      <Container className="flex flex-col gap-9 py-16 lg:py-20">
        <SectionIntro
          eyebrow={programFormatsContent.eyebrow}
          heading={programFormatsContent.heading}
          headingId="program-formats-heading"
          description={programFormatsContent.description}
        />
        <AsyncContent
          state={formats}
          loading={<LoadingSkeleton count={4} label="Loading learning formats…" />}
          empty={<EmptyState title="No learning formats yet" />}
          error={(message, retry) => (
            <ErrorState title="Couldn't load the formats" message={message} onRetry={retry} />
          )}
        >
          {(data) => (
            <ul className="grid gap-6 lg:grid-cols-2">
              {data.map((format) => (
                <li key={format.id}>
                  <ProgramCard format={format} />
                </li>
              ))}
            </ul>
          )}
        </AsyncContent>
      </Container>
    </section>
  );
}

/**
 * "Program card" (14:17095): white, 24px radius, 28px padding; a 52px tinted icon tile
 * (14px radius) and the description column 24px apart — 27px name, description and a
 * 13px Medium link-blue "Best for" line, 14px apart.
 */
function ProgramCard({ format }: { format: LearningFormat }) {
  const visual = programFormatVisuals[format.id];

  return (
    <article className="flex h-full gap-6 rounded-card bg-surface p-6 sm:p-7">
      <span
        aria-hidden
        className={cn(
          "flex size-13 shrink-0 items-center justify-center rounded-icon",
          brandToneTint[visual?.tone ?? "blue"],
        )}
      >
        <AssetIcon name={visual?.icon ?? "iconBook"} className="size-6" />
      </span>
      <div className="flex flex-col gap-3.5">
        <h3 className="text-heading-24 font-bold text-fg sm:text-heading-27">{format.name}</h3>
        <p className="text-body text-fg-muted">{format.description}</p>
        <p className="text-caption leading-auto font-medium text-link">
          Best for • {visual?.bestFor ?? humanizeSlug(format.cta)}
        </p>
      </div>
    </article>
  );
}
