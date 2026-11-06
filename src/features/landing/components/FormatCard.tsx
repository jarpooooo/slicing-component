import { Sparkles } from "lucide-react";

import { Card } from "@/components/ui";
import type { LearningFormat } from "@/lib/api";
import { humanizeSlug } from "@/lib/utils";

import { formatIcons } from "../data";

/**
 * "Program format" card (Figma 14:16341): 32px padding, 24px icon, heading,
 * description, divider and a small detail line, 20px apart.
 * Text from GET /api/formats; the detail line shows the format's `cta`.
 */
export function FormatCard({ format }: { format: LearningFormat }) {
  const Icon = formatIcons[format.id] ?? Sparkles;

  return (
    <Card className="h-full gap-5 p-8">
      <Icon aria-hidden className="size-6 text-link" />
      <h3 className="text-heading-sm font-bold text-fg">{format.name}</h3>
      <p className="text-body text-fg-muted">{format.description}</p>
      <hr className="border-border" />
      <p className="text-caption font-medium text-fg-muted">{humanizeSlug(format.cta)}</p>
    </Card>
  );
}
