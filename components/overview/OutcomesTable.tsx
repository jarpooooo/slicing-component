import type { Track } from "@/lib/types";

const listFormat = new Intl.ListFormat("en", { style: "long", type: "conjunction" });

const columns = {
  pathway: "Pathway",
  practice: "What you can practice",
  outcome: "A possible outcome",
};

type OutcomesTableProps = {
  tracks: Track[];
  /** id of the heading that names this table. */
  labelledBy: string;
};

/**
 * Compares the tracks: name, skills and `what_you_do` (Figma 14:17063).
 * Below md each row stacks and shows its column labels inline.
 */
export function OutcomesTable({ tracks, labelledBy }: OutcomesTableProps) {
  const mobileLabel = "text-eyebrow font-medium text-fg-muted md:hidden";

  return (
    <div className="overflow-hidden rounded-table border border-border">
      <table aria-labelledby={labelledBy} className="w-full border-collapse text-left">
        <thead className="max-md:sr-only">
          <tr className="bg-surface-muted text-eyebrow font-medium text-fg-muted">
            <th scope="col" className="w-73 py-5 pr-3.5 pl-7 font-medium">
              {columns.pathway}
            </th>
            <th scope="col" className="w-119 px-3.5 py-5 font-medium">
              {columns.practice}
            </th>
            <th scope="col" className="py-5 pr-7 pl-3.5 font-medium">
              {columns.outcome}
            </th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
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
                <span className={mobileLabel}>{columns.practice}: </span>
                {listFormat.format(track.skills)}
              </td>
              <td className="text-body text-fg-muted md:py-7 md:pr-7 md:pl-3.5 md:align-top">
                <span className={mobileLabel}>{columns.outcome}: </span>
                {track.what_you_do}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
