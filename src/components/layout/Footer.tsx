import Link from "next/link";

import { Container } from "@/components/ui";
import { siteConfig } from "@/lib/site";

/**
 * Site footer — structural skeleton following the Figma Footer (14:16473):
 * identity · "Explore" page links · "Connect" socials, then divider + footer note.
 *
 * TODO(component phase): logo, Instagram/YouTube icons (public/icons), social
 * handle from GET /api/stats, final copy and the brand signature bar.
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="flex flex-col gap-10 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex max-w-120 flex-col gap-4">
            <p className="text-label font-bold text-fg">{siteConfig.name}</p>
            <p className="text-body text-fg-muted">{siteConfig.fullName}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <p className="text-label font-medium text-fg">Explore</p>
            <ul className="flex flex-col gap-3">
              {siteConfig.nav.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-body text-fg-muted hover:text-fg">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3">
            <p className="text-label font-medium text-fg">Connect</p>
            {/* TODO: social handle + Instagram / YouTube links */}
          </div>
        </div>

        <div className="border-t border-border pt-10">
          <p className="text-caption text-fg-muted">
            {/* TODO: confirm copyright copy from Figma (14:16502) */}© {siteConfig.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
