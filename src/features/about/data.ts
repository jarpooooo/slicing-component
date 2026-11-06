import { BookOpen, CodeXml, Heart, Users, type LucideIcon } from "lucide-react";

import type { BrandTone } from "@/components/ui";
import type { CommunityValue, ContributionRole } from "@/lib/api";

/*
 * About page content (Figma frame 14:16510).
 *
 * Source tags:
 *   [brief] text given in the task brief
 *   [api]   text from the GDGoC UGM API (/values, /roles, /stats) — the API
 *           serves the same content as the design, so these are the best
 *           available match to the Figma copy
 *   TODO(copy) placeholder — the Figma MCP was rate-limited and no
 *              design-ref/about screenshots exist; replace with exact copy.
 *
 * Repeating content is typed with the API types, so switching a list to
 * `useApi(...)` later only changes where the array comes from.
 */

// ---------- About introduction (14:16529) ----------

export const aboutHeroContent = {
  eyebrow: "About GDGoC UGM", // TODO(copy)
  /** Two-line heading; the second line renders in blue. [brief: structure] */
  headingLines: ["A community built", "on curiosity"], // TODO(copy)
  description:
    "Google Developer Groups on Campus Universitas Gadjah Mada is a student-led community where people from every faculty learn, build, and share technology together.", // TODO(copy)
  yearLabel: "Since 2023", // [api] /stats founded_year
} as const;

// ---------- Our purpose (14:16603) ----------

export const purposeContent = {
  eyebrow: "Our purpose", // [brief: section name]
  headingLead: "We believe", // TODO(copy)
  /** Rendered as a blue quote inside the heading. [brief: structure] */
  quote: "Learn together. Build together.", // [api] /stats tagline
  paragraphs: [
    "GDGoC UGM exists so that anyone curious about technology has a place to start — regardless of major, year, or experience.", // TODO(copy)
    "We learn in small groups, build real projects, and share what we find, so every member leaves a little further than where they began.", // TODO(copy)
  ],
} as const;

// ---------- Community values (14:16613) ----------

export const valuesContent = {
  eyebrow: "Community values", // [brief: section name]
  heading: "What we value", // TODO(copy)
} as const;

export type AboutValue = Pick<CommunityValue, "id" | "title" | "description"> & {
  tone: BrandTone;
  icon: LucideIcon;
};

/** Order, accent colors and icons follow the brief: blue/red/yellow/green; book-open/users/code-xml/heart. */
export const communityValues: AboutValue[] = [
  {
    id: "stay-curious",
    title: "Stay curious", // [api]
    description: "Ask the extra question. Be willing to learn something outside your comfort zone.", // [api]
    tone: "blue",
    icon: BookOpen,
  },
  {
    id: "make-room",
    title: "Make room", // [api]
    description:
      "Welcome different perspectives, respect each other, and help people find their voice.", // [api]
    tone: "red",
    icon: Users,
  },
  {
    id: "learn-by-building",
    title: "Learn by building", // [api]
    description:
      "Try a small experiment. Share the rough version. Let feedback guide what comes next.", // [api]
    tone: "yellow",
    icon: CodeXml,
  },
  {
    id: "give-something-back",
    title: "Give something back", // [api]
    description: "Share a resource, explain what clicked, or help someone take their next step.", // [api]
    tone: "green",
    icon: Heart,
  },
];

// ---------- Ways to belong (14:16644) ----------

export const waysToBelongContent = {
  eyebrow: "Ways to belong", // [brief: section name]
  heading: "There's more than one way to be part of it", // TODO(copy)
  link: { label: "Let's talk about getting involved", href: "/contact" }, // [brief]
} as const;

export type WayToBelong = Pick<ContributionRole, "id" | "title" | "description">;

export const waysToBelong: WayToBelong[] = [
  {
    id: "learner",
    title: "Come as a learner", // [api]
    description:
      "Explore a topic, join a discussion, and ask the question that's been on your mind.", // [api]
  },
  {
    id: "collaborator",
    title: "Grow as a collaborator", // [api]
    description:
      "Work with people whose skills complement yours. Discover what you can build together.", // [api]
  },
  {
    id: "contributor",
    title: "Give back as a contributor", // [api]
    description: "Share knowledge, support a learning session, or bring an idea for the community.", // [api]
  },
];

// ---------- Community commitment (14:16668) ----------

export const commitmentContent = {
  heading: "A space where everyone can grow", // TODO(copy)
  description:
    "We keep the community welcoming, respectful, and open — so the first question is never the last one.", // TODO(copy)
} as const;

// ---------- Community invitation (14:16673) ----------

export const aboutInvitationContent = {
  eyebrow: "Join the community", // TODO(copy)
  heading: "Curious where to start?", // TODO(copy)
  description: "Find the track that fits you, or reach out and we'll help you take the first step.", // TODO(copy)
  primaryAction: { label: "Find your track", href: "/overview" }, // nav action label
  secondaryAction: { label: "Contact the team", href: "/contact" }, // TODO(copy)
} as const;
