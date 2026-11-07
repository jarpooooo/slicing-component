import { Container, EyebrowLabel } from "@/components/ui";

import { contactHeroContent } from "../data";

/** Contact intro (Figma 14:16746). The headline ends in a blue "hello." */
export function ContactHero() {
  return (
    <section aria-labelledby="contact-heading">
      <Container className="flex flex-col items-start gap-6 pt-12 pb-10 md:pt-16 lg:pt-18 lg:pb-14">
        <EyebrowLabel>{contactHeroContent.eyebrow}</EyebrowLabel>
        <h1 id="contact-heading" className="text-display-72 font-bold text-fg">
          {contactHeroContent.headingLead}{" "}
          <span className="text-link">{contactHeroContent.headingAccent}</span>
        </h1>
        <p className="max-w-192.5 text-body-md text-fg-muted md:text-lead-lg">
          {contactHeroContent.description}
        </p>
      </Container>
    </section>
  );
}
