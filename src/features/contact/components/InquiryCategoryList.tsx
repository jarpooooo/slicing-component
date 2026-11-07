"use client";

import { AsyncContent, EmptyState, ErrorState, LoadingSkeleton } from "@/components/states";
import type { ApiState } from "@/hooks/useApi";
import type { InquiryCategory, InquiryCategoryId } from "@/lib/api";
import { cn } from "@/lib/utils";

type InquiryCategoryListProps = {
  state: ApiState<InquiryCategory[]>;
  selected: InquiryCategoryId | "";
  onSelect: (id: InquiryCategoryId) => void;
};

/**
 * "Inquiry category" cards (Figma 14:16758): 16px radius, 20px padding, 18px gap —
 * a 25px link-blue glyph, 17px Medium label and 14px description.
 * The selected card has the Blue/50 fill (as in Figma), the others a #DADCE0 border.
 * Picking a card sets the form's category; it behaves as a toggle button group.
 */
export function InquiryCategoryList({ state, selected, onSelect }: InquiryCategoryListProps) {
  return (
    <AsyncContent
      state={state}
      loading={<LoadingSkeleton count={4} label="Loading inquiry topics…" />}
      empty={<EmptyState title="No topics yet" description="Choose General inquiry in the form." />}
      error={(message, retry) => (
        <ErrorState title="Couldn't load the topics" message={message} onRetry={retry} />
      )}
    >
      {(categories) => (
        <ul className="flex flex-col gap-4.5">
          {categories.map((category) => {
            const isSelected = category.id === selected;
            return (
              <li key={category.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSelect(category.id)}
                  className={cn(
                    "flex w-full items-start gap-4.5 rounded-box border p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    isSelected
                      ? "border-transparent bg-surface-accent"
                      : "border-border hover:bg-surface-muted",
                  )}
                >
                  <span
                    aria-hidden
                    className="w-6 font-inter text-glyph-25 leading-none font-medium text-link"
                  >
                    {category.icon}
                  </span>
                  <span className="flex flex-col gap-1.5">
                    <span className="text-body-plus leading-auto font-medium text-fg">
                      {category.label}
                    </span>
                    <span className="text-small text-fg-muted">{category.description}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </AsyncContent>
  );
}
