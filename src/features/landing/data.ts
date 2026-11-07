import type { BrandTone } from "@/components/ui";
import type { AssetName } from "@/lib/assets";
import { siteConfig } from "@/lib/site";

/*
 * Landing page copy — read from Figma frame "Landing - GDGoC UGM" (14:16047).
 *
 * Repeating content (tracks, formats, journey, FAQ) is fetched from the GDGoC UGM API
 * at runtime; this file holds the static copy around it and visual mappings by id.
 *
 * Multi-line headings keep the explicit line breaks from Figma as arrays.
 */

// ---------- Hero (14:16065) ----------

export const heroContent = {
  eyebrow: `GDGoC UGM • ${siteConfig.academicYear}`,
  headlineLines: ["Big ideas.", "Built together."],
  /** The university name between these comes from GET /api/stats. */
  description: {
    before: "A place for curious minds at ",
    after: " to learn, connect, and build technology that matters.",
  },
  primaryAction: { label: "Find your learning track", href: "/overview" },
  secondaryAction: { label: "Get to know us", href: "/about" },
  welcomeNote: "Different backgrounds. A shared curiosity.",
  sticker: "hello, possibilities_",
} as const;

/** "Community promise" strip under the hero (14:16193). */
export const communityPromises: { title: string; tone: BrandTone }[] = [
  { title: "Learn by doing", tone: "blue" },
  { title: "Connect across disciplines", tone: "red" },
  { title: "Build with purpose", tone: "green" },
];

// ---------- Discover learning (14:16203) ----------

export const introContent = {
  eyebrow: "A campus. A community.",
  headingLines: ["Not just learning tech.", "Finding your people."],
  link: { label: "More about GDGoC UGM", href: "/about" },
  attributes: ["Student-led", "Peer-powered", "Curiosity-first"],
  body: "From your first line of code to your next product idea, there’s room to ask questions, share what you know, and try something new.",
} as const;

export const trackDiscoveryContent = {
  eyebrow: "Find your starting point",
  heading: "Many interests. One shared journey.",
  description: "Follow what excites you. Explore a track, then connect the dots with others.",
  link: { label: "See the overview", href: "/overview" },
} as const;

export const learningFormatsContent = {
  eyebrow: "More than a classroom",
  heading: "Less watching. More making.",
  description: "Learn in a way that turns a new concept into something you can actually use.",
} as const;

/** Figma format icon per format id from GET /api/formats (fallback: book). */
export const formatIcons: Record<string, AssetName> = {
  "study-groups": "iconBook",
  "hands-on-workshops": "iconCode",
  "project-circles": "iconUsers",
  "knowledge-sharing": "iconLightbulb",
};

// ---------- Build and belong (14:16362) ----------

export const projectContent = {
  eyebrow: "Build something that matters",
  heading: "Your next project could start on campus.",
  lead: "What if finding a study partner, sharing resources, or navigating campus felt easier? Small, familiar problems can be the beginning of meaningful work.",
  body: "Bring research, design, and development together. Try an idea, get feedback, and make the next version better.",
  link: { label: "Explore project-based learning", href: "/overview" },
  artwork: {
    overline: "IDEA → PROTOTYPE",
    headingLines: ["A little less friction.", "A better campus day."],
    tiles: [
      { label: "Discover", tone: "blue" },
      { label: "Connect", tone: "green" },
      { label: "Share", tone: "red" },
    ] satisfies { label: string; tone: BrandTone }[],
    description: "Start with a student need. Build a small, useful solution.",
    caption: "EXAMPLE PROJECT BRIEF • NOT A LAUNCHED PRODUCT",
  },
} as const;

export const journeyContent = {
  eyebrow: "Make your first move",
  heading: "You don’t need to have it all figured out.",
} as const;

export const belongingContent = {
  headingLines: ["Different majors. Different starting points.", "A place for all of them."],
  description:
    "You don’t have to be the most experienced person in the room. Curiosity, kindness, and a willingness to learn are a good place to start.",
} as const;

export const faqContent = {
  eyebrow: "A few good questions",
  headingLines: ["Wondering where", "to begin?"],
  link: { label: "Ask us a question", href: "/contact" },
} as const;
