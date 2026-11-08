"use client";

import { useId, useState, type KeyboardEvent } from "react";

import { AssetIcon } from "@/components/ui/AssetIcon";
import type { Faq } from "@/lib/types";
import { cn } from "@/lib/utils";

// Figma shows the first three questions expanded.
const OPEN_BY_DEFAULT = 3;

type FaqAccordionProps = {
  faqs: Faq[];
};

/**
 * Accessible accordion: each question is a button with aria-expanded/aria-controls.
 * Arrow Up/Down move between questions, Home/End jump to the first/last one.
 */
export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const baseId = useId();
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

  const isOpen = (faq: Faq, index: number) => toggled[faq.id] ?? index < OPEN_BY_DEFAULT;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

    const buttons = Array.from(event.currentTarget.querySelectorAll("button"));
    const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (current === -1) return;

    event.preventDefault();
    const last = buttons.length - 1;
    const next = {
      Home: 0,
      End: last,
      ArrowDown: current === last ? 0 : current + 1,
      ArrowUp: current === 0 ? last : current - 1,
    }[event.key]!;
    buttons[next]?.focus();
  };

  return (
    <div className="flex flex-col gap-6" onKeyDown={handleKeyDown}>
      {faqs.map((faq, index) => {
        const open = isOpen(faq, index);
        const buttonId = `${baseId}-${faq.id}-button`;
        const panelId = `${baseId}-${faq.id}-panel`;

        return (
          <div key={faq.id} className="flex flex-col gap-3.5">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setToggled((prev) => ({ ...prev, [faq.id]: !open }))}
                className="flex w-full items-center justify-between gap-6 rounded-control text-left text-title-sm font-medium text-fg transition-colors hover:text-link focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {faq.question}
                <AssetIcon
                  name="chevronDown"
                  className={cn("size-6 transition-transform", !open && "-rotate-90")}
                />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
              <p className="text-body text-fg-muted">{faq.answer}</p>
            </div>
            <hr className="border-border" />
          </div>
        );
      })}
    </div>
  );
}
