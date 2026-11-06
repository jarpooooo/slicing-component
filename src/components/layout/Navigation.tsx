"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Site navigation — structural skeleton.
 * Confirmed from Figma (14:16048): 104px tall, 64px x-padding, bottom border,
 * pill nav items (20/14px padding), active item = accent surface + bold link color.
 *
 * TODO(component phase): logo asset (public/icons/logo-gdgoc-ugm.svg) and the
 * mobile/tablet menu.
 */
export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-surface">
      <nav
        aria-label="Main"
        className="flex min-h-nav-h flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-8 xl:px-nav-x"
      >
        <Link href="/" className="text-label font-bold text-fg">
          {/* TODO: replace with logo-gdgoc-ugm.svg once exported (see public/ASSETS.md) */}
          {siteConfig.name}
        </Link>

        <ul className="flex flex-wrap items-center gap-2">
          {siteConfig.nav.map(({ label, href }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "inline-flex rounded-pill px-5 py-3.5 text-label transition-colors",
                    isActive
                      ? "bg-surface-accent font-bold text-link"
                      : "text-fg-muted hover:text-fg",
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Button href={siteConfig.navAction.href} withArrow>
          {siteConfig.navAction.label}
        </Button>
      </nav>
    </header>
  );
}
