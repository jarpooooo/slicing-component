import { AssetIcon, brandToneBg, Card, type BrandTone } from "@/components/ui";
import type { CommunityValue } from "@/lib/api";
import type { AssetName } from "@/lib/assets";
import { cn } from "@/lib/utils";

type ValueCardProps = {
  /** From GET /api/values. */
  value: CommunityValue;
  tone: BrandTone;
  icon: AssetName;
};

/**
 * "Value" card (Figma 14:16620): 1px border, 24px radius, 26px padding, 22px gaps —
 * a 36×4 brand-colored accent bar, 24px link-blue icon, 24px title and description.
 */
export function ValueCard({ value, tone, icon }: ValueCardProps) {
  return (
    <Card className="h-full items-start gap-5.5 p-6.5">
      <span aria-hidden className={cn("h-1 w-9 rounded-xs", brandToneBg[tone])} />
      <AssetIcon name={icon} className="size-6" />
      <h3 className="text-heading-24 font-bold text-fg">{value.title}</h3>
      <p className="text-body text-fg-muted">{value.description}</p>
    </Card>
  );
}
