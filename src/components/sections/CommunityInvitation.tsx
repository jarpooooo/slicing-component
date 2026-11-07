import { Button, Container, EyebrowLabel } from "@/components/ui";

/** Copy is identical on Landing (14:16456), About (14:16673) and Overview (14:17175). */
const invitation = {
  eyebrow: "Your next chapter",
  headingLines: ["Bring your curiosity.", "We’ll build from there."],
  description: "Find a learning track, meet a collaborator, or start a conversation.",
  primaryAction: { label: "Explore the overview", href: "/overview" },
  secondaryAction: { label: "Talk to the community", href: "/contact" },
} as const;

type CommunityInvitationProps = {
  /** id for the heading; the section is labelled by it. */
  headingId?: string;
};

/**
 * "Community invitation" (Figma 14:16456): 64px vertical padding around a Blue/50
 * panel — 32px radius, 48px padding, copy on the left, a 260px action column on the
 * right with 48px between them. Stacks below lg.
 */
export function CommunityInvitation({
  headingId = "invitation-heading",
}: CommunityInvitationProps) {
  return (
    <section aria-labelledby={headingId}>
      <Container className="py-12 lg:py-16">
        <div className="flex flex-col gap-8 rounded-panel bg-surface-accent p-6 md:p-12 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex flex-1 flex-col items-start gap-4">
            <EyebrowLabel>{invitation.eyebrow}</EyebrowLabel>
            <h2 id={headingId} className="text-heading-44 font-bold text-fg">
              {invitation.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="text-body-md text-fg-muted">{invitation.description}</p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-4 lg:w-65">
            <Button href={invitation.primaryAction.href} withArrow>
              {invitation.primaryAction.label}
            </Button>
            <Button href={invitation.secondaryAction.href} variant="link" withArrow>
              {invitation.secondaryAction.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
