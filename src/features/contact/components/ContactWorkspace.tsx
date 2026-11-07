"use client";

import { useState } from "react";

import { Button, Container, EyebrowLabel } from "@/components/ui";
import { useApi } from "@/hooks/useApi";
import { api, type InquiryCategoryId } from "@/lib/api";

import { communityUpdatesContent, inquiryContent } from "../data";

import { ContactForm } from "./ContactForm";
import { InquiryCategoryList } from "./InquiryCategoryList";

/**
 * "Contact workspace" (Figma 14:16753): 80px bottom padding; a 456px inquiry guidance
 * column (32px gaps) and the contact form, 64px apart. The category cards and the
 * form's category select share one state, loaded from GET /api/inquiry-categories.
 * Figma shows the first category selected, so it is preselected once loaded.
 */
type ContactWorkspaceProps = {
  /** From GET /api/stats → social.instagram */
  instagramHandle: string;
  instagramUrl: string;
};

export function ContactWorkspace({ instagramHandle, instagramUrl }: ContactWorkspaceProps) {
  const categories = useApi("inquiry-categories", (signal) => api.getInquiryCategories({ signal }));
  const [picked, setPicked] = useState<InquiryCategoryId | null>(null);

  const options = categories.status === "success" ? categories.data : [];
  const selected = picked ?? options[0]?.id ?? "";

  return (
    <section aria-labelledby="inquiry-heading">
      <Container className="flex flex-col gap-12 pb-16 lg:flex-row lg:items-start lg:gap-16 lg:pb-20">
        <div className="flex flex-col gap-8 lg:w-114 lg:shrink-0">
          <div className="flex flex-col gap-4.5">
            <h2 id="inquiry-heading" className="text-heading-28 font-bold text-fg">
              {inquiryContent.heading}
            </h2>
            <p className="text-body text-fg-muted">{inquiryContent.description}</p>
            <InquiryCategoryList state={categories} selected={selected} onSelect={setPicked} />
          </div>

          {/* Community updates (14:16778): Yellow/50 card, 24px radius, 26px padding */}
          <aside
            aria-labelledby="updates-heading"
            className="flex flex-col items-start gap-4 rounded-card bg-tint-yellow p-6.5"
          >
            <EyebrowLabel>{communityUpdatesContent.eyebrow}</EyebrowLabel>
            <h2 id="updates-heading" className="text-heading-26 font-bold text-fg">
              {communityUpdatesContent.heading}
            </h2>
            <p className="text-body text-fg-muted">
              Follow <strong className="font-bold">{instagramHandle}</strong> for learning
              opportunities and what’s happening in the community.
            </p>
            <Button
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="link"
              withArrow
            >
              Find {instagramHandle}
              <span className="sr-only"> on Instagram (opens in a new tab)</span>
            </Button>
          </aside>
        </div>

        <ContactForm
          categories={options}
          category={selected}
          onCategoryChange={setPicked}
          categoriesReady={categories.status === "success"}
          instagramHandle={instagramHandle}
          instagramUrl={instagramUrl}
        />
      </Container>
    </section>
  );
}
