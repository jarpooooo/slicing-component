import { Button, Container, EyebrowLabel, type BrandTone } from "@/components/ui";
import { cn } from "@/lib/utils";

type Action = { label: string; href: string };

export type CommunityInvitationProps = {
  /** id for the heading; the section is labelled by it. Must be unique per page. */
  headingId: string;
  eyebrow: string;
  eyebrowTone?: BrandTone;
  heading: string;
  description?: string;
  primaryAction: Action;
  secondaryAction?: Action;
  className?: string;
};

/**
 * "Community invitation" CTA panel (Landing 14:16456, About 14:16673, Overview).
 * One component, content via props. Layout follows the Landing frame:
 * 1248px panel, 48px padding, copy (max 844px) left, actions right.
 *
 * TODO(figma): if the About/Overview frames differ visually from Landing, add a
 * `variant` prop here — the About frame could not be inspected (rate limit).
 *
 * Contrast: the panel uses the accent surface (Blue/50) with fg text
 * instead of the dark fill seen in the Figma render.
 */
export function CommunityInvitation({
  headingId,
  eyebrow,
  eyebrowTone = "blue",
  heading,
  description,
  primaryAction,
  secondaryAction,
  className,
}: CommunityInvitationProps) {
  return (
    <section aria-labelledby={headingId} className={className}>
      <Container className="py-12 lg:py-16">
        <div
          className={cn(
            "flex flex-col gap-10 rounded-card bg-surface-accent p-6 md:p-12",
            "lg:flex-row lg:items-center lg:justify-between",
          )}
        >
          <div className="flex max-w-211 flex-col items-start gap-4">
            <EyebrowLabel tone={eyebrowTone}>{eyebrow}</EyebrowLabel>
            <h2
              id={headingId}
              className="text-heading-sm font-bold text-balance text-fg md:text-heading-md"
            >
              {heading}
            </h2>
            {description && <p className="text-body-md text-fg-muted">{description}</p>}
          </div>

          <div className="flex shrink-0 flex-col items-start gap-4">
            <Button href={primaryAction.href} withArrow>
              {primaryAction.label}
            </Button>
            {secondaryAction && (
              <Button href={secondaryAction.href} variant="link" withArrow>
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
