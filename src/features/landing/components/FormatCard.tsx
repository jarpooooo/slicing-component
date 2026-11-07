import { AssetIcon } from "@/components/ui";
import type { LearningFormat } from "@/lib/api";
import { humanizeSlug } from "@/lib/utils";

import { formatIcons } from "../data";

/**
 * "Program format" card (Figma 14:16341): white, 24px radius, 32px padding, 20px gaps —
 * 24px icon, 28px name, description, divider and a 13px Medium link-blue detail line.
 * Text from GET /api/formats; the detail line shows the format's `cta`.
 */
export function FormatCard({ format }: { format: LearningFormat }) {
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
