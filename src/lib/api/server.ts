import { cacheLife } from "next/cache";

import { siteConfig, type NavItem } from "@/lib/site";

import { api } from "./client";

/*
 * Server-side reads for the app shell (Navigation, Footer, hero copy).
 *
 * These are cached with `use cache`, so the API text is part of the prerendered
 * static shell — no loading flash in the header or footer. If the API is
 * unreachable, the static fallback in `siteConfig` is used and the miss is cached
 * only briefly (`minutes`), so the real data comes back on its own.
 */

export type SiteInfo = {
  /** "Universitas Gadjah Mada" — GET /api/stats → university */
  university: string;
  /** "Learn together. Build together." — GET /api/stats → tagline */
  tagline: string;
  /** "@gdgoc.ugm" — GET /api/stats → social.instagram */
  instagramHandle: string;
  /** Profile URL built from the handle. */
  instagramUrl: string;
};

const fallbackSiteInfo: SiteInfo = {
  university: siteConfig.fallback.university,
  tagline: siteConfig.fallback.tagline,
  instagramHandle: siteConfig.fallback.instagramHandle,
  instagramUrl: instagramUrl(siteConfig.fallback.instagramHandle),
};

function instagramUrl(handle: string) {
  return `https://www.instagram.com/${handle.replace(/^@/, "")}`;
}

/** Community facts from GET /api/stats used across the shell and page copy. */
export async function getSiteInfo(): Promise<SiteInfo> {
  "use cache";
  try {
    const stats = await api.getStats();
    cacheLife("hours");
    return {
      university: stats.university,
      tagline: stats.tagline,
      instagramHandle: stats.social.instagram,
      instagramUrl: instagramUrl(stats.social.instagram),
    };
  } catch {
    cacheLife("minutes");
    return fallbackSiteInfo;
  }
}

/** Page links from GET /api/navigation (labels + hrefs). */
export async function getNavigation(): Promise<NavItem[]> {
  "use cache";
  try {
    const links = await api.getNavigation();
    cacheLife("hours");
    return links.length > 0 ? links : [...siteConfig.nav];
  } catch {
    cacheLife("minutes");
    return [...siteConfig.nav];
  }
}
