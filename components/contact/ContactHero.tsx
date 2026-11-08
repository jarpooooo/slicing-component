import { Container } from "@/components/ui/Container";
import { EyebrowLabel } from "@/components/ui/EyebrowLabel";

/** Contact page introduction (Figma 14:16746). */
export function ContactHero() {
  return (
    <section aria-labelledby="contact-heading">
      <Container className="flex flex-col items-start gap-6 pt-12 pb-10 md:pt-16 lg:pt-18 lg:pb-14">
        <EyebrowLabel>Contact • Let’s connect</EyebrowLabel>
        <h1 id="contact-heading" className="text-display-72 font-bold text-fg">
          Good things start with <span className="text-link">hello.</span>
        </h1>
        <p className="max-w-192.5 text-body-md text-fg-muted md:text-lead-lg">
          A question, a collaboration, or an idea for the community? Tell us what’s on your mind.
        </p>
      </Container>
    </section>
  );
}
