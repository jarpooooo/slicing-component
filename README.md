# Website Open Recruitment GDGoC UGM

link video : https://drive.google.com/file/d/12yNwGMVVrRxE6zeICVm9mKJePBV7YT65/view?usp=sharing
link vercel : https://slicing-component.vercel.app/


Proyek ini adalah tugas front-end untuk Google Developer Groups on Campus Universitas Gadjah Mada. Isinya slicing desain Figma GDGoC UGM menjadi web app yang responsif, lalu mengambil datanya dari [REST API GDGoC UGM](https://gdgoc-ugm-api.vercel.app/api).

- Desain: file Figma `3ZBkhvV8tXj90xxro7LhTC`, halaman "Design System" (desktop 1440px)
- Demo: TODO (URL Vercel)
- Halaman yang sudah dibuat: Landing, About, Overview, dan Contact. Teks statisnya diambil persis dari Figma.

| Halaman  | Route       | Node Figma | Status  |
| -------- | ----------- | ---------- | ------- |
| Landing  | `/`         | 14:16047   | Selesai |
| About    | `/about`    | 14:16510   | Selesai |
| Overview | `/overview` | 14:16894   | Selesai |
| Contact  | `/contact`  | 14:16727   | Selesai |

## Teknologi

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components) dan React 19
- TypeScript (strict mode)
- Tailwind CSS v4, dengan design token di CSS lewat `@theme`
- [lucide-react](https://lucide.dev) untuk ikon
- `clsx` dan `tailwind-merge`, digabung dalam helper `cn()`
- ESLint (`eslint-config-next`) dan Prettier (`prettier-plugin-tailwindcss`)

## Cara menjalankan

Butuh Node.js 20 ke atas dan npm.

```bash
npm install
cp .env.example .env.local   # opsional, URL API publik dipakai secara default
npm run dev                  # http://localhost:3000
```

> Saat build, font Google Sans diunduh dari Google Fonts lewat `next/font`. Jadi `npm run build` perlu koneksi internet.

### Script

| Script                 | Fungsi                                                                                    |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `npm run dev`          | Menjalankan dev server                                                                    |
| `npm run build`        | Build untuk production                                                                    |
| `npm run start`        | Menjalankan hasil build production                                                        |
| `npm run lint`         | Cek kode dengan ESLint                                                                    |
| `npm run lint:fix`     | ESLint sekaligus memperbaiki otomatis                                                     |
| `npm run format`       | Merapikan semua file dengan Prettier                                                      |
| `npm run format:check` | Cek format saja (untuk CI)                                                                |
| `npm run typecheck`    | Membuat type route Next.js, lalu menjalankan `tsc --noEmit`                               |
| `npm run check:assets` | Memastikan file di `lib/assets.ts` ada dan huruf besar-kecilnya sama (jalan sebelum build) |

### Environment variable

| Nama                  | Default                                | Keterangan          |
| --------------------- | -------------------------------------- | ------------------- |
| `NEXT_PUBLIC_API_URL` | `https://gdgoc-ugm-api.vercel.app/api` | Base URL REST API.  |

## Struktur folder

```
app/                     # Route. Tiap page.tsx mengambil datanya sendiri lalu meneruskannya ke komponen.
  layout.tsx             # Font, metadata, Navigation dan Footer
  page.tsx               # Landing (/)
  about/page.tsx
  overview/page.tsx
  contact/page.tsx
  loading.tsx            # Tampil saat halaman sedang mengambil data
  error.tsx              # Tampil kalau fetch gagal, ada tombol "Try again"
  globals.css            # Tailwind dan design token (@theme)
components/
  layout/                # Navigation, Footer
  landing/               # Section halaman Landing, urut sesuai halaman
  about/                 # Section halaman About
  overview/              # Section halaman Overview
  contact/               # Section halaman Contact (termasuk form kontak)
  ui/                    # Komponen bersama: Button, Card, Container, EmptyState, TrackCard, ...
lib/
  api.ts                 # Satu fungsi untuk tiap endpoint API
  types.ts               # Type untuk respons API
  site.ts                # Nama situs, link navigasi, teks footer
  assets.ts              # Path dan ukuran file di /public
  brand.ts               # Helper warna brand (biru/merah/kuning/hijau)
  utils.ts               # cn() dan helper kecil lainnya
public/
  icons/ images/         # Aset hasil export dari Figma (lihat public/ASSETS.md)
```

## Alur data

Semua halaman memakai pola yang sama: `page.tsx` mengambil data, komponen menampilkannya.

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

- Komponen menerima data API lewat props dan tidak pernah fetch sendiri. Dengan membaca `page.tsx`, kamu langsung tahu data apa yang dipakai tiap section.
- Loading: selama halaman mengambil data, Next.js menampilkan `app/loading.tsx` (skeleton). Header dan footer tetap terlihat.
- Error: kalau request gagal, `lib/api.ts` melempar `ApiError`, lalu `app/error.tsx` menampilkan pesan dan tombol "Try again" untuk memuat ulang halaman.
- Data kosong: tiap list mengecek array-nya sendiri (`tracks.length === 0`) dan menampilkan `EmptyState`.
- Link navigasi dan info komunitas (universitas, tagline, Instagram) diambil di `app/layout.tsx` dengan `"use cache"`, jadi header dan footer ikut menjadi bagian halaman statis. Kalau API mati, nilainya diambil dari `lib/site.ts`.
- Teks statis dari desain ditulis langsung di komponen. Detail yang tidak ada di API (ikon, warna) disimpan sebagai konstanta di bagian atas file komponen.

## Keputusan arsitektur

- Design token disimpan di CSS (`app/globals.css`). `@theme` di Tailwind v4 mengubah setiap token menjadi utility class (`bg-primary`, `text-fg-muted`, `rounded-card`, ...). Palet warna dan skala radius bawaan Tailwind di-reset, jadi hanya token dari Figma yang bisa dipakai dan tidak ada nilai hex mentah di komponen.
- Ada alias warna semantik (`surface`, `fg`, `fg-muted`, `border`, `primary`, `link`, `brand-*`) di atas palet dasar. Komponen cukup menyebut fungsi warnanya, bukan kode warnanya.
- Breakpoint: desainnya untuk desktop 1440px, tapi style ditulis mobile-first. `sm` 640, `md` 768 (tablet), `lg` 1024 (desktop), `xl` 1440 (lebar frame Figma).
- Warna dari API, misalnya `#4285F4`, sedikit berbeda dari token Figma (`#4284F4`). Karena itu warna dipetakan ke token berdasarkan id, tidak diambil langsung dari API.

## API

Base URL: `https://gdgoc-ugm-api.vercel.app/api` (bisa diganti lewat `NEXT_PUBLIC_API_URL`)

| Endpoint                  | Fungsi di `lib/api.ts`     | Dipakai di              |
| ------------------------- | -------------------------- | ----------------------- |
| `GET /tracks`             | `getTracks()`              | Landing, Overview       |
| `GET /formats`            | `getFormats()`             | Landing, Overview       |
| `GET /journey`            | `getJourney()`             | Landing, Overview       |
| `GET /faqs`               | `getFaqs()`                | Landing                 |
| `GET /values`             | `getValues()`              | About                   |
| `GET /roles`              | `getRoles()`               | About                   |
| `GET /inquiry-categories` | `getInquiryCategories()`   | Contact                 |
| `GET /stats`              | `getSiteInfo()` (cached)   | Layout, semua halaman   |
| `GET /navigation`         | `getNavigation()` (cached) | Layout                  |
