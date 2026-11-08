/**
 * Paths and sizes of the files in /public. Components only reference assets
 * through this map, so renaming a file means changing one line here.
 *
 * Paths must match the file names exactly, including case: Vercel's filesystem is
 * case-sensitive, so `/icons/instagram.svg` would 404 there even though it works on
 * Windows. `npm run check:assets` checks this. width/height are the SVG root
 * attributes, or half the pixel size for 2x WebP exports.
 */
export const assets = {
  logo: { src: "/icons/logo-gdgoc-ugm.svg", width: 346, height: 39 },
  logoFooter: { src: "/icons/logo-gdgoc-ugm-footer.svg", width: 382, height: 43 },
  instagram: { src: "/icons/Instagram.svg", width: 24, height: 24 },
  youtube: { src: "/icons/YouTube.svg", width: 24, height: 24 },

  // UI icons exported from Figma (1.5px stroke)
  arrowRightWhite: { src: "/icons/arrow-right-white.svg", width: 20, height: 20 },
  arrowRightBlue: { src: "/icons/arrow-right-blue.svg", width: 20, height: 20 },
  chevronDown: { src: "/icons/chevron-down.svg", width: 24, height: 24 },
  selectChevron: { src: "/icons/select-chevron.svg", width: 20, height: 20 },
  iconBook: { src: "/icons/icon-book.svg", width: 24, height: 24 },
  iconCode: { src: "/icons/icon-code.svg", width: 24, height: 24 },
  iconUsers: { src: "/icons/icon-users.svg", width: 24, height: 24 },
  iconLightbulb: { src: "/icons/icon-lightbulb.svg", width: 24, height: 24 },
  iconHeart: { src: "/icons/icon-heart.svg", width: 24, height: 24 },
  communityColors: { src: "/icons/community-colors.svg", width: 55, height: 16 },
  browserChrome: { src: "/icons/browser-chrome.svg", width: 36, height: 8 },

  // Illustrations
  sparkGreen: { src: "/images/spark-green.svg", width: 100, height: 100 },
  sparkYellow: { src: "/icons/spark-yellow.svg", width: 72, height: 72 },
  heroGlassBg: { src: "/images/hero-glass-bg.webp", width: 620, height: 530 },
  heroResearch: { src: "/images/hero-research.svg", width: 384, height: 421 },
  heroDevelopment: { src: "/images/hero-development.svg", width: 650, height: 696 },
  trackResearch: { src: "/images/track-research.svg", width: 342, height: 443 },
  trackDesign: { src: "/images/track-design.svg", width: 337, height: 389 },
  trackDevelopment: { src: "/images/track-development.svg", width: 347, height: 452 },
  aboutHeroArtwork: { src: "/images/about-hero-artwork.webp", width: 464, height: 400 },
  overviewResearch: { src: "/images/overview-research.svg", width: 451, height: 496 },
} as const satisfies Record<string, StaticAsset>;

export type StaticAsset = {
  /** Absolute path from /public. */
  src: `/${string}.svg` | `/${string}.webp`;
  width: number;
  height: number;
};

export type AssetName = keyof typeof assets;
