import { ChevronDown } from "lucide-react";

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
 * "FAQ item" (Figma 14:16435): question row with a 24px disclosure chevron,
 * answer 14px below, divider 14px under the answer.
 * Accessible accordion item: a real <button> with aria-expanded/aria-controls
 * and a labelled region; native Enter/Space toggle it.
 */
export function FaqItem({ faq, isOpen, onToggle, id }: FaqItemProps) {
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;

  return (
    <div className="border-b border-border pb-3.5">
      <h3>
        <button
          id={triggerId}
          type="button"
          data-faq-trigger
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-6 rounded-control py-1 text-left text-title-sm font-medium text-fg transition-colors hover:text-link focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          {faq.question}
          <ChevronDown
            aria-hidden
            className={cn(
              "mt-0.5 size-6 shrink-0 text-fg-muted transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className="pt-3.5 pr-12"
      >
        <p className="text-body text-fg-muted">{faq.answer}</p>
      </div>
    </div>
  );
}
