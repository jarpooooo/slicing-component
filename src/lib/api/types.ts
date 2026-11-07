/**
 * Types for https://gdgoc-ugm-api.vercel.app/api, written from real responses
 * (2026-11-06). Field names match the API.
 */

// Envelope

/** Every endpoint wraps its payload as `{ success: true, data, ... }`. */
export type ApiSuccess<T> = {
  success: true;
  data: T;
  /** Present on list endpoints. */
  count?: number;
  /** Present on /faqs: the `?category=` value, or null when unfiltered. */
  filter?: string | null;
};

/** Error shape, e.g. GET /tracks/unknown → 404. */
export type ApiFailure = {
  success: false;
  error: string;
  /** Present on /tracks/:id 404. */
  available_ids?: string[];
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

// Resources

/** Known ids. `string & {}` keeps the type open so new tracks still type-check. */
export type TrackId = "research-discovery" | "design-creativity" | "development" | (string & {});

/** GET /tracks, GET /tracks/:id */
export type Track = {
  id: TrackId;
  name: string;
  tagline: string;
  description: string;
  /** Emoji, e.g. "🔍". */
  icon: string;
  /**
   * Hex color, e.g. "#4285F4". It's slightly off from the Figma tokens (Blue/500 is
   * #4284F4, Yellow/500 is #F9AB00), so style with tokens instead.
   */
  color: string;
  skills: string[];
  what_you_do: string;
  /** Relative link, e.g. "/overview?track=development". */
  explore_link: string;
  open: boolean;
};

/** GET /values */
export type CommunityValue = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
};

/** GET /formats */
export type LearningFormat = {
  id: string;
  name: string;
  description: string;
  icon: string;
  /** Slug, e.g. "join-a-group". */
  cta: string;
};

/** GET /journey */
export type JourneyStep = {
  step: number;
  id: string;
  title: string;
  description: string;
};

/** GET /roles */
export type ContributionRole = {
  id: string;
  title: string;
  description: string;
  icon: string;
  /** Slug, e.g. "find-a-track". */
  cta: string;
};

export type InquiryCategoryId =
  "joining-learning" | "collaboration" | "speaking-sharing" | "general-inquiry" | (string & {});

/** GET /inquiry-categories */
export type InquiryCategory = {
  id: InquiryCategoryId;
  label: string;
  description: string;
  /** Short glyph, e.g. "↗", "+", "◇", "?". */
  icon: string;
  guidance: string;
};

/** GET /faqs (optional ?category=<InquiryCategoryId>) */
export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: InquiryCategoryId;
};

/** GET /stats */
export type CommunityStats = {
  community_members: number;
  workshops_held: number;
  projects_shipped: number;
  active_tracks: number;
  university: string;
  city: string;
  country: string;
  founded_year: number;
  social: {
    /** Handle including "@", e.g. "@gdgoc.ugm". */
    instagram: string;
    linkedin: string;
    github: string;
  };
  tagline: string;
};

/** GET /navigation */
export type NavigationLink = {
  label: string;
  href: string;
};
