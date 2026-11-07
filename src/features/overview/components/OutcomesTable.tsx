"use client";

import { AsyncContent, EmptyState, ErrorState, LoadingSkeleton } from "@/components/states";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";

import { outcomesContent } from "../data";

const listFormat = new Intl.ListFormat("en", { style: "long", type: "conjunction" });

/**
 * "Track comparison" (Figma 14:17063), filled from GET /api/tracks:
 * Pathway = name, What you can practice = skills, A possible outcome = what_you_do.
 *
 * 1px border, 20px radius; Neutrals/300 header row (20/28px padding, 12px Medium
 * labels), body rows with a top border and 28px padding. Column widths 250 / 448 /
 * rest with 28px gaps (cell widths below include padding). Below md each row stacks
 * and repeats its column label.
 */
export function OutcomesTable({ labelledBy }: { labelledBy: string }) {
  const tracks = useApi("tracks", (signal) => api.getTracks({ signal }));
  const [pathwayLabel, practiceLabel, outcomeLabel] = outcomesContent.columns;
  const cellLabel = "text-eyebrow font-medium text-fg-muted md:hidden";

  return (
    <AsyncContent
      state={tracks}
      loading={<LoadingSkeleton count={4} label="Loading learning outcomes…" />}
      empty={<EmptyState title="No pathways to compare yet" />}
      error={(message, retry) => (
        <ErrorState title="Couldn't load the pathways" message={message} onRetry={retry} />
      )}
    >
      {(data) => (
        <div className="overflow-hidden rounded-table border border-border">
          <table aria-labelledby={labelledBy} className="w-full border-collapse text-left">
            <thead className="max-md:sr-only">
              <tr className="bg-surface-muted text-eyebrow font-medium text-fg-muted">
                <th scope="col" className="w-73 py-5 pr-3.5 pl-7 font-medium">
                  {pathwayLabel}
                </th>
                <th scope="col" className="w-119 px-3.5 py-5 font-medium">
                  {practiceLabel}
                </th>
                <th scope="col" className="py-5 pr-7 pl-3.5 font-medium">
                  {outcomeLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((track, index) => (
                <tr
                  key={track.id}
                  className={
                    index === 0
                      ? "max-md:flex max-md:flex-col max-md:gap-3 max-md:p-6 md:border-t md:border-border"
                      : "border-t border-border max-md:flex max-md:flex-col max-md:gap-3 max-md:p-6"
                  }
                >
                  <th
                    scope="row"
                    className="text-body-md leading-auto font-medium text-fg md:py-7 md:pr-3.5 md:pl-7 md:align-top"
                  >
                    {track.name}
                  </th>
                  <td className="text-body text-fg-muted md:px-3.5 md:py-7 md:align-top">
                    <span className={cellLabel}>{practiceLabel}: </span>
                    {listFormat.format(track.skills)}
                  </td>
                  <td className="text-body text-fg-muted md:py-7 md:pr-7 md:pl-3.5 md:align-top">
                    <span className={cellLabel}>{outcomeLabel}: </span>
                    {track.what_you_do}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AsyncContent>
  );
}
