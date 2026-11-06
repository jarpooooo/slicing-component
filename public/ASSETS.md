# Assets

Assets are exported **manually** from Figma (file `3ZBkhvV8tXj90xxro7LhTC`, page "Design System")
and committed here. No placeholders are generated — a missing file below simply means it has not
been exported yet.

Reference them from code with absolute paths, e.g. `src="/icons/logo-gdgoc-ugm.svg"`.

## Export settings

- **SVG**: export as SVG, keep the root `width`/`height` attributes (do not strip them).
- **PNG**: export at **2x** for crisp rendering on high-DPI screens; `next/image` scales them down.

## Icons — `public/icons/`

| File                 | Used in                                         | Figma node          | Status     |
| -------------------- | ----------------------------------------------- | ------------------- | ---------- |
| `logo-gdgoc-ugm.svg` | Navigation + Footer logo ("GDGoC UGM identity") | 14:16049 / 14:16476 | ⬜ missing |
| `instagram.svg`      | Footer → Social channels                        | 14:16490            | ⬜ missing |
| `youtube.svg`        | Footer → Social channels                        | 14:16495            | ⬜ missing |
| `spark-green.svg`    | "Community" spark (Landing → Belonging)         | 14:16420            | ⬜ missing |
| `spark-yellow.svg`   | "Commitment" spark                              | TBD                 | ⬜ missing |

> The logo node is one instance used at two sizes (nav 345×39, footer 382×43); export once
> as SVG and size it in code.
>
> UI icons such as the arrow in actions/links and the FAQ disclosure chevron use
> `lucide-react` instead of exported files.

## Images — `public/images/`

| File                             | Used in                                        | Figma node | Status     |
| -------------------------------- | ---------------------------------------------- | ---------- | ---------- |
| `hero-ideas-coming-together.png` | Landing hero artwork ("Ideas coming together") | 14:16089   | ⬜ missing |
| `track-research.png`             | Track card — Research & Discovery              | 14:16239   | ⬜ missing |
| `track-design.png`               | Track card — Design & Creativity               | 14:16274   | ⬜ missing |
| `track-development.png`          | Track card — Development                       | 14:16311   | ⬜ missing |
| `about-community-mark.png`       | About page community mark                      | 14:16537   | ⬜ missing |

When adding a file, flip its status to ✅.
