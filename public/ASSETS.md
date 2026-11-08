# Assets

Assets are exported from Figma (file `3ZBkhvV8tXj90xxro7LhTC`, page "Design System") and committed
here. Vector art is **SVG**; the two glass-tile panels use background blur, which SVG can't express,
so they are exported as **2x PNG → WebP** (canvas background masked out with the 32px panel radius).
No placeholders are generated.

## How assets are referenced

Components never hard-code asset paths. Every file is registered once in
[`lib/assets.ts`](../lib/assets.ts) with its path and intrinsic size:

```tsx
import { assets } from "@/lib/assets";

<Image {...assets.logo} alt="GDGoC UGM" />;
```

**Renaming or adding a file:** update `lib/assets.ts`, then run

```bash
npm run check:assets
```

The check (also run automatically before `npm run build`) fails when a registered file is missing,
when its **letter case** differs from the file on disk (Windows doesn't care, Vercel does), or when
its width/height no longer match the SVG root. It also lists files that aren't registered yet.

## Export settings

- Export as **SVG** and keep the root `width`/`height` attributes; `assets.ts` mirrors them.
- SVG files cover the node's **render bounds** (shadows included). Components place them by
  those bounds (read with the Plugin API), not by the node box.
- WebP files are 2x; `assets.ts` lists their CSS size (half the pixel size).
- `next/image` serves `.svg` files unoptimized automatically.

## Inventory

| Key in `assets.ts` | File                              | Used in                                 | Figma node |
| ------------------ | --------------------------------- | --------------------------------------- | ---------- |
| `logo`             | `icons/logo-gdgoc-ugm.svg`        | Navigation                              | 14:16049   |
| `logoFooter`       | `icons/logo-gdgoc-ugm-footer.svg` | Footer                                  | 14:16476   |
| `instagram`        | `icons/Instagram.svg`             | Footer → Social channels                | 14:16490   |
| `youtube`          | `icons/YouTube.svg`               | Footer → Social channels                | 14:16495   |
| `sparkGreen`       | `images/spark-green.svg`          | Landing → Belonging ("Community spark") | 14:16420   |
| `heroGlassBg`      | `images/hero-glass-bg.webp`       | Landing hero, glass tile background     | 14:16130   |
| `heroResearch`     | `images/hero-research.svg`        | Landing hero, research artwork          | 14:16107   |
| `heroDevelopment`  | `images/hero-development.svg`     | Landing hero, development artwork       | 14:16095   |
| `trackResearch`    | `images/track-research.svg`       | Track card: Research & discovery        | 14:16239   |
| `trackDesign`      | `images/track-design.svg`         | Track card: Design & creativity         | 14:16274   |
| `trackDevelopment` | `images/track-development.svg`    | Track card: Development                 | 14:16311   |
| `aboutHeroArtwork` | `images/about-hero-artwork.webp`  | About hero artwork                      | 14:16537   |
| `overviewResearch` | `images/overview-research.svg`    | Overview hero artwork                   | 14:16921   |
| `sparkYellow`      | `icons/spark-yellow.svg`          | About → Community commitment            | 14:16668   |
| `arrowRightWhite`  | `icons/arrow-right-white.svg`     | Primary button arrow                    | 14:16063   |
| `arrowRightBlue`   | `icons/arrow-right-blue.svg`      | Secondary button / text link arrow      | 14:16080   |
| `chevronDown`      | `icons/chevron-down.svg`          | FAQ disclosure                          | 14:16438   |
| `selectChevron`    | `icons/select-chevron.svg`        | Contact form select indicator           | 14:16814   |
| `iconBook`         | `icons/icon-book.svg`             | Format / value / program icon           | 14:16342   |
| `iconCode`         | `icons/icon-code.svg`             | Format / value / program icon           | 14:16349   |
| `iconUsers`        | `icons/icon-users.svg`            | Format / value / program icon           | 14:16356   |
| `iconLightbulb`    | `icons/icon-lightbulb.svg`        | Overview program icon                   | 14:17122   |
| `iconHeart`        | `icons/icon-heart.svg`            | About value icon                        | 14:16640   |
| `communityColors`  | `icons/community-colors.svg`      | Landing hero welcome note               | 14:16083   |
| `browserChrome`    | `icons/browser-chrome.svg`        | Landing project artwork                 | 14:16369   |

Icons that appear in Figma are exported files (above). `lucide-react` is only used for UI that has no
Figma counterpart (mobile menu toggle, empty/error states, form checkmarks).
