/**
 * Site config for the layout, navigation and footer. Navigation links, university
 * name, tagline and Instagram handle are read from the API (`src/lib/api/server.ts`);
 * `nav` and `fallback` are only used when the API can't be reached.
 */
export const siteConfig = {
  name: "GDGoC UGM",
  fullName: "Google Developer Groups on Campus Universitas Gadjah Mada",
  description:
    "Google Developer Groups on Campus Universitas Gadjah Mada — learn together, build together.",
  /** Fallback for GET /api/navigation. Order and labels follow Figma (14:16052). */
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Overview", href: "/overview" },
    { label: "Contact", href: "/contact" },
  ],
  /** Primary navigation action ("Find your track", 14:16061). */
  navAction: { label: "Find your track", href: "/overview" },

  /** Academic year shown next to the community name across the design. */
  academicYear: "2026/2027",

  /** Footer copy (Figma 14:16473) */
  footer: {
    description:
      "A student community for curious minds, shared learning, and technology with purpose.",
    exploreTitle: "Explore",
    connectTitle: "Keep in the loop",
    note: "Made for the campus. Open to possibilities.",
  },

  /** Fallbacks for GET /api/stats. */
  fallback: {
    university: "Universitas Gadjah Mada",
    tagline: "Learn together. Build together.",
    instagramHandle: "@gdgoc.ugm",
  },

  /** YouTube is in the Figma footer but no URL exists in the API; the icon renders unlinked. */
  youtubeUrl: null as string | null,
} as const;

export type NavItem = { label: string; href: string };
