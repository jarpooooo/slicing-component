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
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
