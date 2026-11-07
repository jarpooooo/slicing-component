import Image from "next/image";
import Link from "next/link";

import { brandToneBg, Container, type BrandTone } from "@/components/ui";
import type { SiteInfo } from "@/lib/api/server";
import { assets, type AssetName } from "@/lib/assets";
import { siteConfig, type NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

const brandSignature: BrandTone[] = ["blue", "red", "yellow", "green"];

const focusRing =
  "rounded-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

type FooterProps = {
  /** GET /api/navigation */
  navItems: NavItem[];
  /** GET /api/stats — handle, tagline and university name. */
  siteInfo: SiteInfo;
};

/**
 * Site footer — Figma "Footer" (14:16473).
 * Neutrals/300 band, 56px top / 28px bottom padding, rows 40px apart.
 * Desktop: identity (480px) · Explore (150px) · Keep in the loop (260px) spread
 * across 1248px, then divider, footer note and the four-color brand signature.
 * Tablet: identity on top, link groups side by side. Mobile: single column.
 */
export function Footer({ navItems, siteInfo }: FooterProps) {
  const { footer } = siteConfig;
  const socialChannels: { label: string; icon: AssetName; href: string | null }[] = [
    { label: "Instagram", icon: "instagram", href: siteInfo.instagramUrl },
    { label: "YouTube", icon: "youtube", href: siteConfig.youtubeUrl },
  ];

  return (
    <footer className="bg-surface-muted">
      <Container className="flex flex-col gap-10 pt-14 pb-7">
        <div className="grid gap-10 md:grid-cols-2 lg:flex lg:justify-between">
          <div className="flex flex-col gap-6 md:col-span-2 lg:w-120">
            <Link href="/" className={cn("self-start", focusRing)}>
              <Image
                {...assets.logoFooter}
                alt={`${siteConfig.name} — ${siteConfig.fullName}`}
                className="h-9 w-auto md:h-10.75"
              />
            </Link>
            <p className="text-body text-fg-muted">{footer.description}</p>
          </div>

          <nav aria-labelledby="footer-explore" className="flex flex-col gap-3.5 lg:w-37.5">
            <h2 id="footer-explore" className="text-label font-bold text-fg-strong">
              {footer.exploreTitle}
            </h2>
            <ul className="flex flex-col gap-3.5 text-control">
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn("text-fg-muted transition-colors hover:text-fg", focusRing)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start gap-4 lg:w-65">
            <h2 className="text-label font-bold text-fg-strong">{footer.connectTitle}</h2>
            <a
              href={siteInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("text-body-md leading-auto text-link hover:underline", focusRing)}
            >
              {siteInfo.instagramHandle}
              <span className="sr-only"> on Instagram (opens in a new tab)</span>
            </a>
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
                        className={cn("flex transition-opacity hover:opacity-70", focusRing)}
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
            <p className="text-small text-fg-muted">{siteInfo.tagline}</p>
          </div>
        </div>

        <hr className="border-border" />

        <div className="flex flex-col gap-2 text-eyebrow text-fg-muted md:flex-row md:justify-between">
          <p>
            © GDGoC {siteInfo.university} • {siteConfig.academicYear}
          </p>
          <p>{footer.note}</p>
        </div>

        <div aria-hidden className="flex w-40">
          {brandSignature.map((tone) => (
            <span key={tone} className={cn("h-1 flex-1", brandToneBg[tone])} />
          ))}
        </div>
      </Container>
    </footer>
  );
}
