# GDGoC UGM — Open Recruitment Website

Front-end task for **Google Developer Groups on Campus Universitas Gadjah Mada**: slice the
GDGoC UGM Figma design into a responsive web app and consume the
[GDGoC UGM REST API](https://gdgoc-ugm-api.vercel.app/api).

- **Design:** Figma file `3ZBkhvV8tXj90xxro7LhTC`, page "Design System" (desktop 1440px)
- **Live demo:** TODO (Vercel URL)
- **Pages implemented:** Landing, About, Overview and Contact — static copy taken verbatim from Figma

| Page     | Route       | Figma node | Status   |
| -------- | ----------- | ---------- | -------- |
| Landing  | `/`         | 14:16047   | ✅ built |
| About    | `/about`    | 14:16510   | ✅ built |
| Overview | `/overview` | 14:16894   | ✅ built |
| Contact  | `/contact`  | 14:16727   | ✅ built |

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components) + React 19
- TypeScript (strict mode)
- Tailwind CSS v4 (CSS-first `@theme` design tokens)
- [lucide-react](https://lucide.dev) for UI icons
- `clsx` + `tailwind-merge` via a `cn()` helper
- ESLint (`eslint-config-next`) + Prettier (`prettier-plugin-tailwindcss`)

## Getting started

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env.local   # optional — the public API URL is used by default
npm run dev                  # http://localhost:3000
```

> The build downloads the **Google Sans** font from Google Fonts via `next/font`, so
> `npm run build` needs internet access.

### Scripts

| Script                 | Description                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| `npm run dev`          | Start the dev server                                                        |
| `npm run build`        | Production build                                                            |
| `npm run start`        | Serve the production build                                                  |
| `npm run lint`         | ESLint                                                                      |
| `npm run lint:fix`     | ESLint with autofix                                                         |
| `npm run format`       | Format everything with Prettier                                             |
| `npm run format:check` | Check formatting (CI)                                                       |
| `npm run typecheck`    | Generate Next.js route types, then `tsc --noEmit`                           |
| `npm run check:assets` | Verify files in `lib/assets.ts` exist with exact casing (runs before build) |

### Environment variables

| Name                  | Default                                | Description               |
| --------------------- | -------------------------------------- | ------------------------- |
| `NEXT_PUBLIC_API_URL` | `https://gdgoc-ugm-api.vercel.app/api` | Base URL of the REST API. |

## Project structure

```
app/                     # Routes. Each page.tsx fetches its data and passes it down.
  layout.tsx             # Fonts, metadata, Navigation + Footer
  page.tsx               # Landing (/)
  about/page.tsx
  overview/page.tsx
  contact/page.tsx
  loading.tsx            # Shown while a page is fetching
  error.tsx              # Shown when a fetch fails, with a "Try again" button
  globals.css            # Tailwind + design tokens (@theme)
components/
  layout/                # Navigation, Footer
  landing/               # Sections of the Landing page, in page order
  about/                 # Sections of the About page
  overview/              # Sections of the Overview page
  contact/               # Sections of the Contact page (+ the contact form)
  ui/                    # Shared pieces: Button, Card, Container, EmptyState, TrackCard, ...
lib/
  api.ts                 # One function per API endpoint
  types.ts               # Types of the API responses
  site.ts                # Site name, nav links, footer copy
  assets.ts              # Paths and sizes of the files in /public
  brand.ts               # Brand color helpers (blue/red/yellow/green)
  utils.ts               # cn() and small helpers
public/
  icons/ images/         # Assets exported from Figma (see public/ASSETS.md)
```

## How data flows

Every page follows the same pattern: `page.tsx` fetches, components display.

```tsx
// app/about/page.tsx
export default async function AboutPage() {
  const [siteInfo, values, roles] = await Promise.all([getSiteInfo(), getValues(), getRoles()]);

  return (
    <>
      <AboutHero university={siteInfo.university} />
      <OurPurpose />
      <CommunityValues values={values} />
      <WaysToBelong roles={roles} />
      <CommunityCommitment />
      <CommunityInvitation />
    </>
  );
}
```

- Components get API data through props and never fetch on their own, so reading a `page.tsx`
  tells you which data each section uses.
- Loading: while the page fetches, Next.js shows `app/loading.tsx` (a skeleton). The header and
  footer stay visible.
- Error: if a request fails, `lib/api.ts` throws an `ApiError` and `app/error.tsx` shows a message
  with a "Try again" button that refetches the page.
- Empty: each list checks its own array (`tracks.length === 0`) and shows `EmptyState`.
- The navigation links and community facts (university, tagline, Instagram) are fetched in
  `app/layout.tsx` with `"use cache"`, so the header and footer are part of the static page. If
  the API is down they fall back to the values in `lib/site.ts`.
- Static copy from the design is written directly in each component. Per-item details the API has
  no field for (icons, colors) are a constant at the top of the component file.

## Architecture decisions

- Design tokens live in CSS (`app/globals.css`). Tailwind v4's `@theme` turns every token into a
  utility (`bg-primary`, `text-fg-muted`, `rounded-card`, ...). The default Tailwind palette and
  radius scale are reset, so only Figma tokens can be used and components contain no raw hex
  values.
- Semantic color aliases (`surface`, `fg`, `fg-muted`, `border`, `primary`, `link`, `brand-*`) sit
  on top of the raw palette, so components describe intent rather than shades.
- Breakpoints: the design is desktop 1440px, styles are written mobile-first. `sm` 640, `md` 768
  (tablet), `lg` 1024 (desktop), `xl` 1440 (Figma frame width).
- The API returns colors such as `#4285F4` that differ slightly from the Figma tokens (`#4284F4`),
  so colors are mapped to tokens by id instead of taken from the API.

## API

Base URL: `https://gdgoc-ugm-api.vercel.app/api` (override with `NEXT_PUBLIC_API_URL`)

| Endpoint                  | Function in `lib/api.ts`   | Used on           |
| ------------------------- | -------------------------- | ----------------- |
| `GET /tracks`             | `getTracks()`              | Landing, Overview |
| `GET /formats`            | `getFormats()`             | Landing, Overview |
| `GET /journey`            | `getJourney()`             | Landing, Overview |
| `GET /faqs`               | `getFaqs()`                | Landing           |
| `GET /values`             | `getValues()`              | About             |
| `GET /roles`              | `getRoles()`               | About             |
| `GET /inquiry-categories` | `getInquiryCategories()`   | Contact           |
| `GET /stats`              | `getSiteInfo()` (cached)   | Layout, all pages |
| `GET /navigation`         | `getNavigation()` (cached) | Layout            |

## Additional challenges

TODO — list the optional challenges attempted, e.g.:

- [ ] TODO
- [ ] TODO

## Known gaps / TODO

- [ ] Every text the API provides is rendered from the API; it differs from the Figma
      placeholder copy in places (e.g. the API returns 4 formats where Figma shows 3).
- [ ] The glass puzzle artworks are SVG exports; Figma's background-blur "glass" can't be
      expressed in SVG, so their frosted rims render slightly differently than in Figma.
- [ ] The API has no endpoint for contact messages, so the Contact form validates on the client
      and then says plainly that online sending isn't available yet (pointing to Instagram).
- [ ] Deploy to Vercel and add the live URL.
