"use client";

import { AsyncContent, EmptyState, ErrorState, LoadingSkeleton } from "@/components/states";
import { useApi } from "@/hooks/useApi";
import { api, type InquiryCategory } from "@/lib/api";

import { guidanceContent } from "../data";

/** Splits "Question? Answer..." into a title and a description. */
const LEADING_QUESTION = /^([^.?!]+\?)\s+([\s\S]+)$/;

function toTip(category: InquiryCategory) {
  const question = category.guidance.match(LEADING_QUESTION);
  if (question) return { title: question[1], description: question[2] };
  return {
    title: guidanceContent.tipTitles[category.id] ?? category.label,
    description: category.guidance,
  };
}

/**
 * Inquiry tips (Figma 14:16844): one per category, using its `guidance` from
 * GET /api/inquiry-categories.
 */
export function InquiryTips() {
  const categories = useApi("inquiry-categories", (signal) => api.getInquiryCategories({ signal }));

  return (
    <AsyncContent
      state={categories}
      loading={<LoadingSkeleton count={6} label="Loading guidance…" />}
      empty={<EmptyState title="Guidance is coming soon" />}
      error={(message, retry) => (
        <ErrorState title="Couldn't load the guidance" message={message} onRetry={retry} />
      )}
    >
      {(data) => (
        <ul className="flex flex-col gap-6.5">
          {data.map((category) => {
            const tip = toTip(category);
            return (
              <li key={category.id} className="flex flex-col gap-2.5">
                <h3 className="text-heading-21 font-bold text-fg">{tip.title}</h3>
                <p className="text-body text-fg-muted">{tip.description}</p>
                <hr className="border-border" />
              </li>
            );
          })}
        </ul>
      )}
    </AsyncContent>
  );
}
