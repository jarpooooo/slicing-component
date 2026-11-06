/**
 * Static site configuration shared by the layout, Navigation and Footer.
 *
 * Navigation links mirror GET /api/navigation (same labels/hrefs) but are kept
 * static so the shell renders instantly and never depends on the network.
 * Order and labels follow the Figma Navigation (14:16052).
 */
export const siteConfig = {
  name: "GDGoC UGM",
  fullName: "Google Developer Groups on Campus Universitas Gadjah Mada",
  description:
    "Google Developer Groups on Campus Universitas Gadjah Mada — learn together, build together.",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Overview", href: "/overview" },
    { label: "Contact", href: "/contact" },
  ],
  /** Primary navigation action ("Find your track", 14:16061). */
  navAction: { label: "Find your track", href: "/overview" },

  /**
   * Footer (Figma 14:16473). Source tags as in features/landing/data.ts:
   * [layer] layer name, [api] API text, TODO(copy) placeholder to replace.
   */
  footer: {
    description:
      "Google Developer Groups on Campus Universitas Gadjah Mada. A student community to learn together and build together.", // TODO(copy)
    exploreTitle: "Explore", // [layer]
    connectTitle: "Connect with us", // TODO(copy)
    connectDescription: "Follow along for events and updates.", // TODO(copy)
    copyright: "© GDGoC Universitas Gadjah Mada · 2026/2027", // [api] docs page footer
    note: "Made for the campus. Open to possibilities.", // [api] docs page footer
  },

  /** Social channels. Handle from GET /api/stats → social.instagram. */
  social: {
    handle: "@gdgoc.ugm",
    instagram: "https://www.instagram.com/gdgoc.ugm",
    /** TODO: YouTube URL is not provided by the API or the design; icon renders unlinked. */
    youtube: null as string | null,
  },
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
