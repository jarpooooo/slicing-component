import type { BrandTone } from "@/components/ui";
import type { AssetName } from "@/lib/assets";

/*
 * About page copy (Figma 14:16510). Values and roles come from the API; this file
 * has the copy around them and the visuals per id. Headings that break over
 * several lines in Figma are stored as arrays.
 */

// About introduction (14:16529)

export const aboutHeroContent = {
  eyebrow: "About GDGoC UGM",
  /** Second line renders in link blue. */
  headingLines: ["Built by students.", "For what’s next."],
  /** The university name between these comes from GET /api/stats. */
  description: {
    before: "We’re a community of learners and makers at ",
    after: ", connected by curiosity and the belief that technology can do good.",
  },
} as const;

// Our purpose (14:16603)

export const purposeContent = {
  eyebrow: "Why we come together",
  lead: "Learning feels different when there’s someone to exchange ideas with, a problem you care about, and the space to give it a try.",
  paragraphs: [
    "That’s the spirit of Google Developer Groups on Campus at UGM. We create room for students to explore technology, develop practical skills, and learn from one another.",
    "Our campus is the starting point. The questions we ask and the things we build can reach beyond it.",
  ],
} as const;

// Community values (14:16613)

export const valuesContent = {
  eyebrow: "What guides us",
  heading: "Good technology starts with good company.",
} as const;

/**
 * Accent color and icon per value id (Figma 14:16620 to 14:16638). The API also
 * sends a hex color and an emoji, but the design uses brand tokens and line icons.
 */
export const valueVisuals: Record<string, { tone: BrandTone; icon: AssetName }> = {
  "stay-curious": { tone: "blue", icon: "iconBook" },
  "make-room": { tone: "red", icon: "iconUsers" },
  "learn-by-building": { tone: "yellow", icon: "iconCode" },
  "give-something-back": { tone: "green", icon: "iconHeart" },
};

/** Used for values the mapping above doesn't know yet, in order. */
export const fallbackValueTones: BrandTone[] = ["blue", "red", "yellow", "green"];

// Ways to belong (14:16644)

export const waysToBelongContent = {
  eyebrow: "People, not labels",
  heading: "There’s more than one way to contribute.",
  description:
    "You can be learning one day and helping someone else the next. A community grows through both.",
  link: { label: "Let’s talk about getting involved", href: "/contact" },
} as const;

// Community commitment (14:16668)

export const commitmentContent = {
  heading: "A space to learn. A responsibility to care.",
  description:
    "We want every conversation and learning experience to be respectful, inclusive, and constructive. Be kind, give credit, and make room for people who are just getting started.",
} as const;
