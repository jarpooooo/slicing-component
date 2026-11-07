import type { BrandTone } from "@/components/ui";
import type { AssetName } from "@/lib/assets";

/*
 * Overview page copy — read from Figma frame "Overview - GDGoC UGM" (14:16894).
 *
 * Tracks, formats and the learning journey come from the API (/tracks, /formats,
 * /journey). Figma-only details that the API has no field for (format "Best for"
 * line, icon tint, the outcomes table) are mapped here by id.
 */

// ---------- Overview introduction (14:16913) ----------

export const overviewHeroContent = {
  eyebrow: "Overview • Programs & learning tracks",
  /** Second line renders in link blue. */
  headingLines: ["Find your spark.", "Build your own path."],
  description:
    "Explore how research, creativity, and development connect. Start with one interest. Grow through practice and the people around you.",
} as const;

// ---------- Section navigation (14:16944) ----------

export const overviewSections = [
  { id: "learning-tracks", label: "Learning tracks" },
  { id: "learning-formats", label: "Learning formats" },
  { id: "learning-journey", label: "Your learning journey" },
  { id: "starting-point", label: "Find a starting point" },
] as const;

export type OverviewSectionId = (typeof overviewSections)[number]["id"];

// ---------- Learning track overview (14:16957) ----------

export const trackOverviewContent = {
  eyebrow: "Explore your interests",
  heading: "Three ways in. Plenty of ways forward.",
  description:
    "These pathways are starting points, not boxes. Follow one deeply or bring different skills together.",
} as const;

// ---------- Learning outcomes (14:17061) ----------
// Rows come from GET /api/tracks: name, skills and what_you_do.

export const outcomesContent = {
  heading: "From an interest to something you can show.",
  columns: ["Pathway", "What you can practice", "A possible outcome"],
  footnote:
    "Illustrative learning outcomes. Topics and opportunities are shared through community updates.",
} as const;

// ---------- Program formats (14:17087) ----------

export const programFormatsContent = {
  eyebrow: "Ways to learn",
  heading: "The format changes. The curiosity stays.",
  description: "Explore the kinds of experiences that help you move from understanding to doing.",
} as const;

/** Figma "Program card" details per format id from GET /api/formats. */
export const programFormatVisuals: Record<
  string,
  { icon: AssetName; tone: BrandTone; bestFor: string }
> = {
  "study-groups": { icon: "iconBook", tone: "blue", bestFor: "Learning the fundamentals" },
  "hands-on-workshops": { icon: "iconCode", tone: "green", bestFor: "Trying something new" },
  "project-circles": { icon: "iconUsers", tone: "yellow", bestFor: "Putting skills into practice" },
  "knowledge-sharing": { icon: "iconLightbulb", tone: "red", bestFor: "Exchanging perspectives" },
};

// ---------- Learning journey (14:17128) ----------

export const learningJourneyContent = {
  eyebrow: "Progress, not perfection",
  heading: "A journey you can keep building on.",
} as const;

// ---------- Starting point guidance (14:17163) ----------

export const startingPointContent = {
  eyebrow: "Start where you are",
  headingLines: ["New to tech?", "That’s a starting point, too."],
  description:
    "You don’t need a finished portfolio or the perfect track choice. Pick a topic you’re curious about. If you’re unsure, tell us what interests you and we can start a conversation.",
  link: { label: "Ask about getting started", href: "/contact" },
} as const;
