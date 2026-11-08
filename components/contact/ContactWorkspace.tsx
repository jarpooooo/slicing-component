"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";
import type { InquiryCategory, InquiryCategoryId } from "@/lib/types";

import { ContactForm } from "./ContactForm";
import { InquiryCategoryList } from "./InquiryCategoryList";

type ContactWorkspaceProps = {
  categories: InquiryCategory[];
  instagramHandle: string;
  instagramUrl: string;
};

/**
 * Topic cards, community updates and the contact form (Figma 14:16753).
 * The selected topic lives here so the cards and the form's select stay in sync.
 */
export function ContactWorkspace({
  categories,
  instagramHandle,
  instagramUrl,
}: ContactWorkspaceProps) {
  const [selected, setSelected] = useState<InquiryCategoryId | "">(categories[0]?.id ?? "");

  return (
    <section aria-labelledby="inquiry-heading">
      <Container className="flex flex-col gap-12 pb-16 lg:flex-row lg:items-start lg:gap-16 lg:pb-20">
        <div className="flex flex-col gap-8 lg:w-114 lg:shrink-0">
          <div className="flex flex-col gap-4.5">
            <h2 id="inquiry-heading" className="text-heading-28 font-bold text-fg">
              What brings you here?
            </h2>
            <p className="text-body text-fg-muted">
              Pick the closest topic in the form. We’ll take it from there.
            </p>
            {categories.length === 0 ? (
              <EmptyState title="No topics yet" description="Choose General inquiry in the form." />
            ) : (
              <InquiryCategoryList
                categories={categories}
                selected={selected}
                onSelect={setSelected}
              />
            )}
          </div>

          <aside
            aria-labelledby="updates-heading"
            className="flex flex-col items-start gap-4 rounded-card bg-tint-yellow p-6.5"
          >
            <EyebrowLabel>Stay curious, stay connected</EyebrowLabel>
            <h2 id="updates-heading" className="text-heading-26 font-bold text-fg">
              Looking for community updates?
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
          categories={categories}
          category={selected}
          onCategoryChange={setSelected}
          instagramHandle={instagramHandle}
          instagramUrl={instagramUrl}
        />
      </Container>
    </section>
  );
}
