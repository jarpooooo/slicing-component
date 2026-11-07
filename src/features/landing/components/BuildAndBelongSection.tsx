import Image from "next/image";

import { CommunityInvitation } from "@/components/sections";
import { Button, Container, EyebrowLabel, SectionIntro } from "@/components/ui";
import { assets } from "@/lib/assets";

import { belongingContent, faqContent, journeyContent, projectContent } from "../data";

import { FaqAccordion } from "./FaqAccordion";
import { JourneySteps } from "./JourneySteps";
import { ProjectArtwork } from "./ProjectArtwork";

/** Build and belong (Figma 14:16362) */
export function BuildAndBelongSection() {
  return (
    <>
      {/* Project possibility (14:16363) */}
      <section aria-labelledby="project-heading">
        <Container className="flex flex-col items-center gap-12 py-16 lg:flex-row lg:gap-16 lg:py-22">
          <ProjectArtwork />

          <div className="flex flex-1 flex-col items-start gap-6">
            <EyebrowLabel>{projectContent.eyebrow}</EyebrowLabel>
            <h2 id="project-heading" className="text-heading-48 font-bold text-fg">
              {projectContent.heading}
            </h2>
            <p className="text-body-md text-fg-muted">{projectContent.lead}</p>
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
            heading={journeyContent.heading}
            headingId="journey-heading"
          />
          <JourneySteps />
        </Container>
      </section>

      {/* Belonging statement (14:16419) */}
      <section aria-labelledby="belonging-heading" className="bg-tint-green">
        <Container className="flex flex-col items-start gap-6 py-12 md:flex-row md:items-center md:gap-16 lg:py-16">
          <Image {...assets.sparkGreen} alt="" className="size-16 shrink-0 md:size-25" />
          <div className="flex flex-col gap-4">
            <h2 id="belonging-heading" className="text-heading-40 font-bold text-fg">
              {belongingContent.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="text-body-md text-fg-muted">{belongingContent.description}</p>
          </div>
        </Container>
      </section>

      {/* FAQ (14:16424) */}
      <section aria-labelledby="faq-heading">
        <Container className="grid gap-10 py-16 lg:grid-cols-[400px_1fr] lg:gap-16 lg:py-22 xl:gap-24">
          <div className="flex flex-col items-start gap-5">
            <EyebrowLabel>{faqContent.eyebrow}</EyebrowLabel>
            <h2 id="faq-heading" className="text-heading-48 font-bold text-fg">
              {faqContent.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <Button href={faqContent.link.href} variant="link" withArrow>
              {faqContent.link.label}
            </Button>
          </div>
          <FaqAccordion />
        </Container>
      </section>

      {/* Community invitation (14:16456), shared with About and Overview */}
      <CommunityInvitation />
    </>
  );
}
