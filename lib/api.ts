import { cacheLife } from "next/cache";

import { siteConfig, type NavItem } from "@/lib/site";
import type {
  ApiResponse,
  CommunityStats,
  CommunityValue,
  ContributionRole,
  Faq,
  InquiryCategory,
  JourneyStep,
  LearningFormat,
  NavigationLink,
  Track,
} from "@/lib/types";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://gdgoc-ugm-api.vercel.app/api").replace(
  /\/+$/,
  "",
);

export class ApiError extends Error {
  readonly status: number | null;

  constructor(message: string, status: number | null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** GET an endpoint and return its `data`. Throws ApiError on any failure. */
async function get<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, { headers: { Accept: "application/json" } });
  } catch {
    throw new ApiError("Could not reach the server.", null);
  }

  const body = (await response.json().catch(() => null)) as ApiResponse<T> | null;
  if (!body) throw new ApiError(`Unexpected response (HTTP ${response.status}).`, response.status);
  if (!body.success) throw new ApiError(body.error, response.status);
  return body.data;
}

// Page data. Pages call these on every request; a failure shows app/error.tsx.

export const getTracks = () => get<Track[]>("/tracks");
export const getFormats = () => get<LearningFormat[]>("/formats");
export const getJourney = () => get<JourneyStep[]>("/journey");
export const getFaqs = () => get<Faq[]>("/faqs");
export const getValues = () => get<CommunityValue[]>("/values");
export const getRoles = () => get<ContributionRole[]>("/roles");
export const getInquiryCategories = () => get<InquiryCategory[]>("/inquiry-categories");

// App shell data (navigation, footer, community name). Cached so the header and
// footer are part of the static page; falls back to siteConfig if the API is down.

export type SiteInfo = {
  university: string;
  tagline: string;
  instagramHandle: string;
  instagramUrl: string;
};

function toSiteInfo(stats: Pick<CommunityStats, "university" | "tagline"> & { instagram: string }) {
  return {
    university: stats.university,
    tagline: stats.tagline,
    instagramHandle: stats.instagram,
    instagramUrl: `https://www.instagram.com/${stats.instagram.replace(/^@/, "")}`,
  };
}

export async function getSiteInfo(): Promise<SiteInfo> {
  "use cache";
  try {
    const stats = await get<CommunityStats>("/stats");
    cacheLife("hours");
    return toSiteInfo({ ...stats, instagram: stats.social.instagram });
  } catch {
    cacheLife("minutes");
    return toSiteInfo({ ...siteConfig.fallback, instagram: siteConfig.fallback.instagramHandle });
  }
}

export async function getNavigation(): Promise<NavItem[]> {
  "use cache";
  try {
    const links = await get<NavigationLink[]>("/navigation");
    cacheLife("hours");
    return links.length > 0 ? links : [...siteConfig.nav];
  } catch {
    cacheLife("minutes");
    return [...siteConfig.nav];
  }
}
