# GDGoC UGM — Open Recruitment Website

Front-end task for **Google Developer Groups on Campus Universitas Gadjah Mada**: slice the
GDGoC UGM Figma design into a responsive web app and consume the
[GDGoC UGM REST API](https://gdgoc-ugm-api.vercel.app/api).

- **Design:** Figma file `3ZBkhvV8tXj90xxro7LhTC`, page "Design System" (desktop 1440px)
- **Live demo:** TODO (Vercel URL)
- **Pages implemented:** Landing (copy partly provisional, see `TODO(copy)` in `src/features/landing/data.ts`); second page TODO

| Page     | Route       | Figma node | Status                  |
| -------- | ----------- | ---------- | ----------------------- |
| Landing  | `/`         | 14:16047   | ✅ built (copy pending) |
| About    | `/about`    | 14:16510   | 🚧 placeholder          |
| Overview | `/overview` | 14:16894   | 🚧 placeholder          |
| Contact  | `/contact`  | 14:16727   | 🚧 placeholder          |

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

| Script                 | Description                                                                     |
| ---------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`          | Start the dev server                                                            |
| `npm run build`        | Production build                                                                |
| `npm run start`        | Serve the production build                                                      |
| `npm run lint`         | ESLint                                                                          |
| `npm run lint:fix`     | ESLint with autofix                                                             |
| `npm run format`       | Format everything with Prettier                                                 |
| `npm run format:check` | Check formatting (CI)                                                           |
| `npm run typecheck`    | Generate Next.js route types, then `tsc --noEmit`                               |
| `npm run check:assets` | Verify files in `src/lib/assets.ts` exist with exact casing (runs before build) |

### Environment variables

| Name                  | Default                                | Description               |
| --------------------- | -------------------------------------- | ------------------------- |
| `NEXT_PUBLIC_API_URL` | `https://gdgoc-ugm-api.vercel.app/api` | Base URL of the REST API. |

## Project structure

```
src/
  app/                  # Routes (App Router)
    layout.tsx          # Root layout: font, metadata, Navigation + Footer
    page.tsx            # Landing  (/)
    about/ overview/ contact/
    error.tsx           # Route error boundary (retry)
    loading.tsx         # Route loading UI
    globals.css         # Tailwind import + design tokens (@theme)
  components/
    ui/                 # Design-system primitives: Button, Card, Chip, Container, EyebrowLabel, Section
    layout/             # Navigation, Footer
    states/             # LoadingSkeleton, ErrorState, EmptyState, AsyncContent
  features/             # Page-specific sections + hooks, one folder per page
  hooks/                # Shared hooks (useApi)
  lib/
    api/                # Typed API client + response types
    assets.ts           # Registry of /public assets (paths + sizes)
    site.ts             # Site config (name, nav links, metadata)
    utils.ts            # cn() helper
public/
  icons/ images/        # Assets exported from Figma — see public/ASSETS.md
```

## Architecture decisions

- **Design tokens live in CSS (`src/app/globals.css`).** Tailwind v4's `@theme` turns every token
  into a utility (`bg-primary`, `text-fg-muted`, `rounded-card`, `text-heading-sm`, …). The default
  Tailwind palette and radius scale are reset, so only tokens from Figma can be used, and no raw
  hex values appear in components. Each token is tagged with where it came from (Figma variable
  vs. value on a Figma node).
- **Semantic color aliases** (`surface`, `fg`, `fg-muted`, `border`, `primary`, `link`,
  `brand-*`) sit on top of the raw palette (`blue-500`, `neutral-700`, …), so components describe
  intent instead of specific shades.
- **Breakpoints:** the design is desktop 1440px, styles are written mobile-first. `sm` 640,
  `md` 768 (tablet), `lg` 1024 (desktop), `xl` 1440 (Figma frame width).
- **Typed API layer (`src/lib/api`).** Types are derived from real API responses. Every
  request unwraps the `{ success, data }` envelope and throws a typed `ApiError` for network
  errors, non-2xx responses and `{ success: false }` bodies.
- **One async status per request.** `useApi` returns `loading | error | success | empty` plus
  `retry()`, and `AsyncContent` maps each status to `LoadingSkeleton` / `ErrorState` /
  `EmptyState`. Sections only describe the success case.
- **Static navigation.** Nav links match `GET /api/navigation`, but they're kept in
  `src/lib/site.ts` so the app shell renders instantly and never depends on the network.
- **API colors are not used for styling.** The API returns colors such as `#4285F4` / `#FBBC05`
  that differ slightly from the Figma tokens (`#4284F4` / `#F9AB00`), so track colors are mapped
  to tokens by id.

## API

Base URL: `https://gdgoc-ugm-api.vercel.app/api`

| Endpoint                  | Client function              |
| ------------------------- | ---------------------------- |
| `GET /tracks`             | `api.getTracks()`            |
| `GET /tracks/:id`         | `api.getTrack(id)`           |
| `GET /values`             | `api.getValues()`            |
| `GET /formats`            | `api.getFormats()`           |
| `GET /journey`            | `api.getJourney()`           |
| `GET /roles`              | `api.getRoles()`             |
| `GET /inquiry-categories` | `api.getInquiryCategories()` |
| `GET /faqs?category=`     | `api.getFaqs(category?)`     |
| `GET /stats`              | `api.getStats()`             |
| `GET /navigation`         | `api.getNavigation()`        |

```tsx
"use client";
const tracks = useApi("tracks", (signal) => api.getTracks({ signal }));

<AsyncContent state={tracks} loading={<LoadingSkeleton variant="cards" />}>
  {(data) => data.map((track) => <TrackCard key={track.id} track={track} />)}
</AsyncContent>;
```

## Additional challenges

TODO — list the optional challenges attempted, e.g.:

- [ ] TODO
- [ ] TODO

## Known gaps / TODO

- [ ] Gradient tokens (`Gradient/Blue 1`, `Green 1`, `Yellow 1`), shadows and the large type scale
      (hero/section headings) still need to be read from Figma.
- [ ] Export assets listed in `public/ASSETS.md`.
- [ ] Build page sections and the mobile navigation menu.
- [ ] Deploy to Vercel and add the live URL.
