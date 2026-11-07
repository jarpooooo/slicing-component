"use client";

import { useEffect, useState } from "react";

import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";

import { overviewSections, type OverviewSectionId } from "../data";

/**
 * In-page section links (Figma 14:16944). The link for the section in view is bold
 * and blue; Figma shows the first one active.
 */
export function SectionNav() {
  const [active, setActive] = useState<OverviewSectionId>(overviewSections[0].id);

  useEffect(() => {
    const targets = overviewSections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // A section is "current" once it crosses the upper third of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id as OverviewSectionId);
      },
      { rootMargin: "0px 0px -66% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="On this page" className="border-y border-border">
      <Container
        as="ul"
        className="flex gap-x-12 gap-y-3 overflow-x-auto py-6 whitespace-nowrap max-md:flex-wrap"
      >
        {overviewSections.map(({ id, label }) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "inline-flex items-start gap-2.5 rounded-control text-control transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
                  isActive ? "font-bold text-link" : "text-fg-muted hover:text-fg",
                )}
              >
                {label}
                <span aria-hidden className="font-inter text-label font-regular text-link">
                  ↓
                </span>
              </a>
            </li>
          );
        })}
      </Container>
    </nav>
  );
}
