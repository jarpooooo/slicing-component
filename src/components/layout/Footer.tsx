import Image from "next/image";
import Link from "next/link";

import { brandToneBg, Container, type BrandTone } from "@/components/ui";
import { assets, type AssetName } from "@/lib/assets";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const brandSignature: BrandTone[] = ["blue", "red", "yellow", "green"];

const socialChannels: { label: string; icon: AssetName; href: string | null }[] = [
  { label: "Instagram", icon: "instagram", href: siteConfig.social.instagram },
  { label: "YouTube", icon: "youtube", href: siteConfig.social.youtube },
];

const linkClass =
  "rounded-control text-label font-regular text-fg-muted transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/**
 * Site footer — Figma "Footer" (14:16473).
 * Desktop: identity (480px) · Explore (150px) · Connect (260px) spread across
 * 1248px, then divider, footer note and the four-color brand signature.
 * Tablet: identity on top, link groups side by side. Mobile: single column.
 */
export function Footer() {
  const { footer, social } = siteConfig;

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="pt-14 pb-7">
        <div className="grid gap-10 md:grid-cols-2 lg:flex lg:justify-between">
          <div className="flex flex-col gap-6 md:col-span-2 lg:max-w-120">
            <Link
              href="/"
              className="self-start rounded-control focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <Image
                {...assets.logoFooter}
                alt={`${siteConfig.name} — ${siteConfig.fullName}`}
                className="h-9 w-auto md:h-10.75"
              />
            </Link>
            <p className="text-body text-fg-muted">{footer.description}</p>
          </div>

          <nav aria-labelledby="footer-explore" className="flex flex-col gap-3.5 lg:w-37.5">
            <h2 id="footer-explore" className="text-label font-bold text-fg">
              {footer.exploreTitle}
            </h2>
            <ul className="flex flex-col gap-3.5">
              {siteConfig.nav.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4 lg:w-65">
            <h2 className="text-label font-bold text-fg">{footer.connectTitle}</h2>
            <p className="text-body-md font-medium text-fg">{social.handle}</p>
            <ul className="flex gap-4">
              {socialChannels.map(({ label, icon, href }) => {
                const image = <Image {...assets[icon]} alt="" className="size-6" />;
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in a new tab)`}
                        className="flex rounded-control transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        {image}
                      </a>
                    ) : (
                      <span title={`${label} — coming soon`} className="flex">
                        {image}
                        <span className="sr-only">{label} — coming soon</span>
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="text-small text-fg-muted">{footer.connectDescription}</p>
          </div>
        </div>

        <hr className="mt-10 border-border" />

        <div className="mt-10 flex flex-col gap-2 text-eyebrow text-fg-muted md:flex-row md:justify-between">
          <p>{footer.copyright}</p>
          <p>{footer.note}</p>
        </div>

        <div aria-hidden className="mt-10 flex">
          {brandSignature.map((tone) => (
            <span key={tone} className={cn("h-1 w-10", brandToneBg[tone])} />
          ))}
        </div>
      </Container>
    </footer>
  );
}
