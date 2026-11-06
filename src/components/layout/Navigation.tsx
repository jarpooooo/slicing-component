"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useId, useState, type KeyboardEvent } from "react";

import { Button } from "@/components/ui";
import { assets } from "@/lib/assets";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

type NavLinksProps = {
  pathname: string;
  className?: string;
  linkClassName?: string;
  onNavigate?: () => void;
};

/** Page links. Figma 14:16052: pill items, 20/14px padding, 8px gap. */
function NavLinks({ pathname, className, linkClassName, onNavigate }: NavLinksProps) {
  return (
    <ul className={className}>
      {siteConfig.nav.map(({ label, href }) => {
        const isActive = isActivePath(pathname, href);
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "inline-flex rounded-pill px-5 py-3.5 text-label transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                isActive
                  ? "bg-surface-accent font-bold text-link"
                  : "text-fg-muted hover:bg-surface-muted hover:text-fg",
                linkClassName,
              )}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Site navigation — Figma "Navigation" (14:16048).
 * Desktop (lg+): logo · page links · primary action in one 104px row.
 * Below lg: logo + hamburger toggling a disclosure panel with the same links.
 */
export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  const close = () => setIsOpen(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && isOpen) {
      close();
    }
  };

  return (
    <header className="relative border-b border-border bg-surface" onKeyDown={handleKeyDown}>
      <nav
        aria-label="Main"
        className="flex h-16 items-center justify-between gap-6 px-4 md:h-20 md:px-8 lg:h-nav-h xl:px-nav-x"
      >
        <Link
          href="/"
          onClick={close}
          className="shrink-0 rounded-control focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Image
            {...assets.logo}
            alt={`${siteConfig.name} — ${siteConfig.fullName}`}
            priority
            className="h-7 w-auto md:h-8 xl:h-9.75"
          />
        </Link>

        <NavLinks pathname={pathname} className="hidden items-center gap-2 lg:flex" />

        <Button href={siteConfig.navAction.href} withArrow className="hidden lg:inline-flex">
          {siteConfig.navAction.label}
        </Button>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex size-11 items-center justify-center rounded-pill text-fg transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-primary lg:hidden"
        >
          {isOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
        </button>
      </nav>

      <div
        id={menuId}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full z-40 border-b border-border bg-surface px-4 pt-2 pb-6 md:px-8 lg:hidden"
      >
        <NavLinks
          pathname={pathname}
          onNavigate={close}
          className="flex flex-col gap-1"
          linkClassName="w-full"
        />
        <Button href={siteConfig.navAction.href} withArrow onClick={close} className="mt-4 w-full">
          {siteConfig.navAction.label}
        </Button>
      </div>
    </header>
  );
}
