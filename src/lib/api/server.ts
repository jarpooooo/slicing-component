import { cacheLife } from "next/cache";

import { siteConfig, type NavItem } from "@/lib/site";

import { api } from "./client";

/*
 * Server-side reads for the app shell (navigation, footer, hero copy). They're cached
 * with `use cache`, so the text is part of the prerendered shell and the header
 * doesn't flash. If the API is down, the fallback in `siteConfig` is used and that
 * result is only cached for a few minutes.
 */

export type SiteInfo = {
  /** e.g. "Universitas Gadjah Mada", from GET /api/stats → university */
  university: string;
  /** e.g. "Learn together. Build together.", from GET /api/stats → tagline */
  tagline: string;
  /** e.g. "@gdgoc.ugm", from GET /api/stats → social.instagram */
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
