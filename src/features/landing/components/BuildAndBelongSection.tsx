import Image from "next/image";

import { Button, Container, EyebrowLabel, SectionIntro } from "@/components/ui";
import { assets } from "@/lib/assets";

import {
  belongingContent,
  faqContent,
  invitationContent,
  journeyContent,
  projectContent,
} from "../data";

import { FaqAccordion } from "./FaqAccordion";
import { JourneySteps } from "./JourneySteps";
import { ProjectArtwork } from "./ProjectArtwork";

/**
 * "Build and belong" (Figma 14:16362): project possibility, getting started
 * journey, belonging statement, FAQ and the community invitation.
 *
 * Contrast: the Figma render shows parts of this section on dark fills with
 * near-invisible headings. Those fills could not be read, so every block here
 * uses light surface tokens with fg / fg-muted text (≥ 4.5:1).
 */
export function BuildAndBelongSection() {
  return (
    <>
      {/* Project possibility (14:16363): two 592px columns, 64px gap */}
      <section aria-labelledby="project-heading">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-22">
          <ProjectArtwork />

          <div className="flex flex-col items-start gap-6">
            <SectionIntro
              eyebrow={projectContent.eyebrow}
              tone="green"
              heading={projectContent.heading}
              headingId="project-heading"
            />
            <p className="text-body-md text-fg">{projectContent.lead}</p>
            <p className="text-body text-fg-muted">{projectContent.body}</p>
            <Button href={projectContent.link.href} variant="link" withArrow>
              {projectContent.link.label}
            </Button>
          </div>
        </Container>
      </section>

      {/* Getting started (14:16397) */}
      <section aria-labelledby="journey-heading">
        <Container className="flex flex-col gap-10 pt-2 pb-16 lg:pb-22">
          <SectionIntro
            eyebrow={journeyContent.eyebrow}
            tone="blue"
            heading={journeyContent.heading}
            headingId="journey-heading"
          />
          <JourneySteps />
        </Container>
      </section>

      {/* Belonging statement (14:16419): 100px spark, 64px gap, copy */}
      <section aria-labelledby="belonging-heading">
        <Container className="flex flex-col gap-6 py-12 md:flex-row md:items-center md:gap-16 lg:py-16">
          <Image {...assets.sparkGreen} alt="" className="size-16 shrink-0 md:size-25" />
          <div className="flex flex-col gap-4">
            <h2
              id="belonging-heading"
              className="text-heading-sm font-bold text-balance text-fg md:text-heading-md"
            >
              {belongingContent.heading}
            </h2>
            <p className="text-body-md text-fg-muted">{belongingContent.description}</p>
          </div>
        </Container>
      </section>

      {/* Frequently asked questions (14:16424): 400px intro column, 752px list, 96px gap */}
      <section aria-labelledby="faq-heading">
        <Container className="grid gap-10 py-16 lg:grid-cols-[400fr_752fr] lg:gap-24 lg:py-22">
          <div className="flex flex-col items-start gap-5">
            <SectionIntro
              eyebrow={faqContent.eyebrow}
              tone="red"
              heading={faqContent.heading}
              headingId="faq-heading"
            />
            <Button href={faqContent.link.href} variant="link" withArrow>
              {faqContent.link.label}
            </Button>
          </div>
          <FaqAccordion />
        </Container>
      </section>

      {/* Community invitation (14:16456): 1248px panel, 48px padding */}
      <section aria-labelledby="invitation-heading">
        <Container className="py-12 lg:py-16">
          <div className="flex flex-col gap-10 rounded-card bg-surface-accent p-6 md:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex max-w-211 flex-col items-start gap-4">
              <EyebrowLabel tone="blue">{invitationContent.eyebrow}</EyebrowLabel>
              <h2
                id="invitation-heading"
                className="text-heading-sm font-bold text-balance text-fg md:text-heading-md"
              >
                {invitationContent.heading}
              </h2>
              <p className="text-body-md text-fg-muted">{invitationContent.description}</p>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-4">
              <Button href={invitationContent.primaryAction.href} withArrow>
                {invitationContent.primaryAction.label}
              </Button>
              <Button href={invitationContent.secondaryAction.href} variant="link" withArrow>
                {invitationContent.secondaryAction.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
