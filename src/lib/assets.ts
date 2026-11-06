/**
 * Single source of truth for static assets in /public.
 *
 * Paths must match the file names on disk EXACTLY (including letter case):
 * Vercel runs on a case-sensitive filesystem, so `/icons/instagram.svg` would
 * 404 there even though it works on Windows. If a file is renamed, update it
 * here only — components reference assets through this map.
 *
 * `npm run check:assets` verifies every path below exists with the same casing.
 * Intrinsic width/height come from each SVG's root attributes.
 */
export const assets = {
  logo: { src: "/icons/logo-gdgoc-ugm.svg", width: 346, height: 39 },
  logoFooter: { src: "/icons/logo-gdgoc-ugm-footer.svg", width: 382, height: 43 },
  instagram: { src: "/icons/Instagram.svg", width: 24, height: 24 },
  youtube: { src: "/icons/YouTube.svg", width: 24, height: 24 },
  sparkGreen: { src: "/images/spark-green.svg", width: 100, height: 100 },
  heroGlassBg: { src: "/images/hero-glass-bg.svg", width: 620, height: 530 },
  heroResearch: { src: "/images/hero-research.svg", width: 384, height: 421 },
  heroDevelopment: { src: "/images/hero-development.svg", width: 650, height: 696 },
  trackResearch: { src: "/images/track-research.svg", width: 342, height: 443 },
  trackDesign: { src: "/images/track-design.svg", width: 337, height: 389 },
  trackDevelopment: { src: "/images/track-development.svg", width: 347, height: 452 },
  aboutHeroArtwork: { src: "/images/about-hero-artwork.svg", width: 464, height: 400 },
  sparkYellow: { src: "/icons/spark-yellow.svg", width: 72, height: 72 },
} as const satisfies Record<string, StaticAsset>;

export type StaticAsset = {
  /** Absolute path from /public. */
  src: `/${string}.svg`;
  width: number;
  height: number;
};

export type AssetName = keyof typeof assets;
