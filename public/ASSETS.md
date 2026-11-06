# Assets

Assets are exported **manually** from Figma (file `3ZBkhvV8tXj90xxro7LhTC`, page "Design System")
as **SVG** and committed here. No placeholders are generated.

## How assets are referenced

Components never hard-code asset paths. Every file is registered once in
[`src/lib/assets.ts`](../src/lib/assets.ts) with its path and intrinsic size:

```tsx
import { assets } from "@/lib/assets";

<Image {...assets.logo} alt="GDGoC UGM" />;
```

**Renaming or adding a file:** update `src/lib/assets.ts`, then run

```bash
npm run check:assets
```

The check (also run automatically before `npm run build`) fails when a registered file is missing,
when its **letter case** differs from the file on disk (Windows doesn't care, Vercel does), or when
its width/height no longer match the SVG root. It also lists files that aren't registered yet.

## Export settings

- Export as **SVG** and keep the root `width`/`height` attributes; `assets.ts` mirrors them.
- `next/image` serves `.svg` files unoptimized automatically.

## Inventory

| Key in `assets.ts` | File                              | Used in                                 | Figma node |
| ------------------ | --------------------------------- | --------------------------------------- | ---------- |
| `logo`             | `icons/logo-gdgoc-ugm.svg`        | Navigation                              | 14:16049   |
| `logoFooter`       | `icons/logo-gdgoc-ugm-footer.svg` | Footer                                  | 14:16476   |
| `instagram`        | `icons/Instagram.svg`             | Footer → Social channels                | 14:16490   |
| `youtube`          | `icons/YouTube.svg`               | Footer → Social channels                | 14:16495   |
| `sparkGreen`       | `images/spark-green.svg`          | Landing → Belonging ("Community spark") | 14:16420   |
| `heroGlassBg`      | `images/hero-glass-bg.svg`        | Landing hero, glass tile background     | 14:16130   |
| `heroResearch`     | `images/hero-research.svg`        | Landing hero, research artwork          | 14:16107   |
| `heroDevelopment`  | `images/hero-development.svg`     | Landing hero, development artwork       | 14:16095   |
| `trackResearch`    | `images/track-research.svg`       | Track card: Research & discovery        | 14:16239   |
| `trackDesign`      | `images/track-design.svg`         | Track card: Design & creativity         | 14:16274   |
| `trackDevelopment` | `images/track-development.svg`    | Track card: Development                 | 14:16311   |
| `aboutHeroArtwork` | `images/about-hero-artwork.svg`   | About hero artwork                      | 14:16529   |
| `sparkYellow`      | `icons/spark-yellow.svg`          | About → Community commitment            | 14:16668   |

UI icons (arrows, chevrons, menu, format icons) come from `lucide-react`, not from files.
