import { brandToneBg, brandToneText, Card } from "@/components/ui";
import { cn } from "@/lib/utils";

import type { AboutValue } from "../data";

/**
 * Community value card: brand-colored accent bar on top, icon, title and
 * description. Icons are decorative (aria-hidden), so the brand tone is used
 * even for yellow; all text stays fg / fg-muted for contrast.
 */
export function ValueCard({ value }: { value: AboutValue }) {
  const Icon = value.icon;

  return (
    <Card className="h-full">
      <span aria-hidden className={cn("h-1.5 w-full shrink-0", brandToneBg[value.tone])} />
      <div className="flex flex-1 flex-col gap-5 p-7 md:p-8">
        <Icon aria-hidden className={cn("size-6", brandToneText[value.tone])} />
        <h3 className="text-title-md font-bold text-fg">{value.title}</h3>
        <p className="text-body text-fg-muted">{value.description}</p>
      </div>
    </Card>
  );
}
