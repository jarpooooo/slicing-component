import { Button } from "./Button";
import { Container } from "./Container";
import { EyebrowLabel } from "./EyebrowLabel";

/** Closing call-to-action panel, same on Landing, About and Overview (Figma 14:16456). */
export function CommunityInvitation() {
  return (
    <section aria-labelledby="invitation-heading">
      <Container className="py-12 lg:py-16">
        <div className="flex flex-col gap-8 rounded-panel bg-surface-accent p-6 md:p-12 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex flex-1 flex-col items-start gap-4">
            <EyebrowLabel>Your next chapter</EyebrowLabel>
            <h2 id="invitation-heading" className="text-heading-44 font-bold text-fg">
              <span className="block">Bring your curiosity.</span>
              <span className="block">We’ll build from there.</span>
            </h2>
            <p className="text-body-md text-fg-muted">
              Find a learning track, meet a collaborator, or start a conversation.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-4 lg:w-65">
            <Button href="/overview" withArrow>
              Explore the overview
            </Button>
            <Button href="/contact" variant="link" withArrow>
              Talk to the community
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
