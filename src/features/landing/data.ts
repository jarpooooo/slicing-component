import { BookOpen, CodeXml, Lightbulb, Users, type LucideIcon } from "lucide-react";

import type { BrandTone } from "@/components/ui";
import type { AssetName } from "@/lib/assets";

/*
 * Landing page content (Figma frame 14:16047).
 *
 * Source tags:
 *   [node]  read from Figma design context
 *   [layer] Figma layer/frame name (text content itself was not readable)
 *   [api]   text taken from the GDGoC UGM API (stats, FAQs, values)
 *   TODO(copy) placeholder written to fit the design's text box — replace with
 *              the exact Figma copy once design-ref screenshots are available.
 *
 * Repeating content that the API provides (tracks, formats, journey, FAQ) is
 * fetched at runtime; this file only holds static copy and visual mappings.
 */

export type CommunityPromise = { title: string; tone: BrandTone };

// ---------- Hero (14:16065) ----------

export const heroContent = {
  eyebrow: "Welcome to the community", // [layer]
  headline: "Learn together. Build together.", // [api] /stats tagline — TODO(copy)
  description:
    "A student community at Universitas Gadjah Mada for anyone curious about research, design, and development. No entry test — just bring your curiosity.", // TODO(copy)
  primaryAction: { label: "Explore learning tracks", href: "/overview" }, // TODO(copy)
  secondaryAction: { label: "Meet the community", href: "/about" }, // TODO(copy)
  welcomeNote: "Open to students from every faculty at UGM", // TODO(copy)
  campusLabel: "Universitas Gadjah Mada · Yogyakarta", // [api] /stats university + city
  sticker: "You don't need to be a coding prodigy. You just need curiosity.", // [api] /faqs
} as const;

/** "Community promise" strip under the hero (14:16193). */
export const communityPromises: CommunityPromise[] = [
  { title: "Open to all majors", tone: "blue" }, // TODO(copy)
  { title: "No experience needed to start", tone: "red" }, // TODO(copy)
  { title: "Learn by building", tone: "green" }, // [api] /values
];

/** Overlapping dots in the hero welcome note (14:16083). */
export const communityDots: BrandTone[] = ["blue", "red", "yellow", "green"];

// ---------- Discover learning (14:16203) ----------

export const introContent = {
  eyebrow: "Discover learning", // [layer]
  heading: "A place to learn, build, and grow with others", // TODO(copy)
  link: { label: "Get to know the community", href: "/about" }, // TODO(copy)
  lead: "GDGoC UGM is open to all students from any faculty or department. Different majors and different starting points — that's the point.", // [api] /faqs
  body: "Study groups, project circles and workshops run by students, for students. Start small, learn with people around you, and share what you find.", // TODO(copy)
  attributes: ["All faculties", "Peer-led learning", "Project-based"], // TODO(copy)
} as const;

export const trackDiscoveryContent = {
  eyebrow: "Learning tracks", // TODO(copy)
  heading: "Find the track that makes you curious", // TODO(copy)
  description:
    "Three paths, one community. Pick a place to start — you can explore the rest anytime.", // TODO(copy)
  link: { label: "Compare all tracks", href: "/overview" }, // TODO(copy)
  cardLinkLabel: "Explore this track", // [node] 14:16269
} as const;

/** Visual mapping per track id; text comes from GET /api/tracks. */
export const trackVisuals: Record<
  string,
  { image: AssetName; illustrationClass: string; label: string }
> = {
  "research-discovery": {
    image: "trackResearch",
    illustrationClass: "bg-surface-accent", // [node] 14:16238
    label: "Research & discovery track illustration",
  },
  "design-creativity": {
    image: "trackDesign",
    illustrationClass: "bg-yellow-300/30", // inferred from Yellow/300 token
    label: "Design & creativity track illustration",
  },
  development: {
    image: "trackDevelopment",
    illustrationClass: "bg-green-500/10", // inferred from Green/500 token
    label: "Development track illustration",
  },
};

export const learningFormatsContent = {
  eyebrow: "Learning formats", // [layer]
  heading: "Different ways to learn, together", // TODO(copy)
  description: "Join what fits your schedule — from weekly study groups to one-off workshops.", // TODO(copy)
} as const;

/** lucide icon per format id from GET /api/formats. */
export const formatIcons: Record<string, LucideIcon> = {
  "study-groups": BookOpen,
  "project-circles": Users,
  "hands-on-workshops": CodeXml,
  "knowledge-sharing": Lightbulb,
};

// ---------- Build and belong (14:16362) ----------

export const projectContent = {
  eyebrow: "Build something real", // TODO(copy)
  heading: "Turn a campus problem into a project you can show", // TODO(copy)
  lead: "Project circles bring research, design and development together. You'll frame a real problem, shape a solution, and ship a first version with a small team.", // TODO(copy)
  body: "No portfolio needed to start — the project becomes your portfolio.", // TODO(copy)
  link: { label: "See how project circles work", href: "/overview" }, // TODO(copy)
  artwork: {
    overline: "Example project", // TODO(copy)
    heading: "Campus lost & found, made simple", // TODO(copy)
    tiles: ["Research", "Design", "Code"], // TODO(copy)
    description: "From interviews to a working prototype.", // TODO(copy)
    caption: "Concept illustration — not a real project", // TODO(copy)
  },
} as const;

export const journeyContent = {
  eyebrow: "Getting started", // [layer]
  heading: "From curious to contributing, one step at a time", // TODO(copy)
} as const;

/** Number color per journey step (cycles through brand tones). */
export const journeyTones: BrandTone[] = ["blue", "red", "yellow", "green"];

export const belongingContent = {
  heading: "Different majors and different starting points — that's the point.", // [api] /faqs
  description: "Bring the question that's been on your mind. We'll figure out the rest together.", // TODO(copy)
} as const;

export const faqContent = {
  eyebrow: "Frequently asked questions", // [layer]
  heading: "Questions before you join?", // TODO(copy)
  link: { label: "Ask us anything", href: "/contact" }, // TODO(copy)
} as const;

export const invitationContent = {
  eyebrow: "Join the community", // TODO(copy)
  heading: "Start with curiosity. We'll take it from there.", // [api] /faqs
  description: "Pick a track, join a study group, or come see what we're building.", // TODO(copy)
  primaryAction: { label: "Find your track", href: "/overview" }, // [node] nav action label
  secondaryAction: { label: "Contact the team", href: "/contact" }, // TODO(copy)
} as const;
