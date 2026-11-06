"use client";

import { useId, useState, type KeyboardEvent } from "react";

import { AsyncContent, EmptyState, ErrorState, LoadingSkeleton } from "@/components/states";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";

import { FaqItem } from "./FaqItem";

/**
 * FAQ list from GET /api/faqs as an accessible accordion.
 * - Each item toggles independently; the first one starts open (the Figma
 *   frame shows answers expanded).
 * - Arrow Up/Down move focus between questions, Home/End jump to the ends
 *   (WAI-ARIA accordion pattern).
 */
export function FaqAccordion() {
  const faqs = useApi("faqs", (signal) => api.getFaqs(undefined, { signal }));
  const baseId = useId();
  // Track explicit toggles; undefined = default (first item open).
  const [openState, setOpenState] = useState<Record<string, boolean>>({});

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;

    const triggers = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>("[data-faq-trigger]"),
    );
    const current = triggers.indexOf(document.activeElement as HTMLButtonElement);
    if (current === -1) return;

    event.preventDefault();
    const last = triggers.length - 1;
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? last
          : event.key === "ArrowDown"
            ? (current + 1) % triggers.length
            : (current - 1 + triggers.length) % triggers.length;
    triggers[next]?.focus();
  };

  return (
    <AsyncContent
      state={faqs}
      loading={<LoadingSkeleton count={6} label="Loading questions…" />}
      empty={
        <EmptyState title="No questions yet" description="Ask us directly via the contact page." />
      }
      error={(message, retry) => (
        <ErrorState title="Couldn't load the FAQ" message={message} onRetry={retry} />
      )}
    >
      {(items) => (
        <div className="flex flex-col gap-6" onKeyDown={handleKeyDown}>
          {items.map((faq, index) => {
            const isOpen = openState[faq.id] ?? index === 0;
            return (
              <FaqItem
                key={faq.id}
                id={`${baseId}-${faq.id}`}
                faq={faq}
                isOpen={isOpen}
                onToggle={() => setOpenState((prev) => ({ ...prev, [faq.id]: !isOpen }))}
              />
            );
          })}
        </div>
      )}
    </AsyncContent>
  );
}
