import { AssetIcon } from "@/components/ui";
import type { Faq } from "@/lib/api";
import { cn } from "@/lib/utils";

type FaqItemProps = {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
  /** Base id used to link the trigger and its panel. */
  id: string;
};

/**
 * "FAQ item" (Figma 14:16435): 20px Medium question with a 24px link-blue disclosure
 * chevron (24px gap), 16px answer and a divider, 14px apart.
 * Accessible accordion item: a real <button> with aria-expanded/aria-controls and a
 * labelled region; native Enter/Space toggle it.
 */
export function FaqItem({ faq, isOpen, onToggle, id }: FaqItemProps) {
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;

  return (
    <div className="flex flex-col gap-3.5">
      <h3>
        <button
          id={triggerId}
          type="button"
          data-faq-trigger
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 rounded-control text-left text-title-sm font-medium text-fg transition-colors hover:text-link focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          {faq.question}
          <AssetIcon
            name="chevronDown"
            // Figma shows the expanded state with the chevron pointing down;
            // collapsed items point right.
            className={cn("size-6 transition-transform", !isOpen && "-rotate-90")}
          />
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen}>
        <p className="text-body text-fg-muted">{faq.answer}</p>
      </div>
      <hr className="border-border" />
    </div>
  );
}
