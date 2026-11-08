import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { ContributionRole } from "@/lib/types";

type WaysToBelongProps = {
  roles: ContributionRole[];
};

/** "There’s more than one way to contribute." (Figma 14:16644). */
export function WaysToBelong({ roles }: WaysToBelongProps) {
  return (
    <section aria-labelledby="belong-heading">
      <Container className="grid gap-10 pb-16 lg:grid-cols-[400px_1fr] lg:gap-16 lg:pb-22 xl:gap-24">
        <SectionIntro
          eyebrow="People, not labels"
          heading="There’s more than one way to contribute."
          headingId="belong-heading"
          description="You can be learning one day and helping someone else the next. A community grows through both."
          className="gap-5.5"
        />

        <div className="flex flex-col items-start gap-7">
          {roles.length === 0 ? (
            <EmptyState title="Roles are coming soon" className="w-full" />
          ) : (
            <ul className="flex w-full flex-col gap-7">
              {roles.map((role) => (
                <li key={role.id} className="flex flex-col gap-3.5">
                  <h3 className="text-heading-28 font-bold text-fg">{role.title}</h3>
                  <p className="text-body-plus text-fg-muted">{role.description}</p>
                  <hr className="border-border" />
                </li>
              ))}
            </ul>
          )}
          <Button href="/contact" variant="link" withArrow>
            Let’s talk about getting involved
          </Button>
        </div>
      </Container>
    </section>
  );
}
