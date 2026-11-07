"use client";

import { AsyncContent, EmptyState, ErrorState, LoadingSkeleton } from "@/components/states";
import { Button, Container, SectionIntro } from "@/components/ui";
import { useApi } from "@/hooks/useApi";
import { api } from "@/lib/api";

import { waysToBelongContent } from "../data";

/**
 * "Ways to belong" (Figma 14:16644): no top padding (follows the values section),
 * 88px bottom; 400px introduction (22px gaps) and the participation roles 96px apart.
 * Roles come from GET /api/roles. Each role: 28px title, 17px description, divider,
 * 14px apart; roles 28px apart, followed by the text link.
 */
export function WaysToBelong() {
  const roles = useApi("roles", (signal) => api.getRoles({ signal }));

  return (
    <section aria-labelledby="belong-heading">
      <Container className="grid gap-10 pb-16 lg:grid-cols-[400px_1fr] lg:gap-16 lg:pb-22 xl:gap-24">
        <SectionIntro
          eyebrow={waysToBelongContent.eyebrow}
          heading={waysToBelongContent.heading}
          headingId="belong-heading"
          description={waysToBelongContent.description}
          className="gap-5.5"
        />

        <div className="flex flex-col items-start gap-7">
          <AsyncContent
            state={roles}
            loading={<LoadingSkeleton count={6} label="Loading ways to contribute…" />}
            empty={<EmptyState title="Roles are coming soon" />}
            error={(message, retry) => (
              <ErrorState title="Couldn't load the roles" message={message} onRetry={retry} />
            )}
          >
            {(data) => (
              <ul className="flex w-full flex-col gap-7">
                {data.map((role) => (
                  <li key={role.id} className="flex flex-col gap-3.5">
                    <h3 className="text-heading-28 font-bold text-fg">{role.title}</h3>
                    <p className="text-body-plus text-fg-muted">{role.description}</p>
                    <hr className="border-border" />
                  </li>
                ))}
              </ul>
            )}
          </AsyncContent>
          <Button href={waysToBelongContent.link.href} variant="link" withArrow>
            {waysToBelongContent.link.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
