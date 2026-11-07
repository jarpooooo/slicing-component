import type { Metadata } from "next";
import { Google_Sans, Inter } from "next/font/google";

import { Footer, Navigation } from "@/components/layout";
import { getNavigation, getSiteInfo } from "@/lib/api/server";
import { siteConfig } from "@/lib/site";

import "./globals.css";

// Google Sans is the Figma font. It's exposed as --font-google-sans and mapped to
// --font-sans in globals.css.
const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  // Next.js has no metric overrides for Google Sans, so set the fallback stack
  // here instead of letting it try to generate one (and warn).
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});

// Figma sets step numerals ("01") and decorative glyphs (↓ ↗ + ◇ ?) in Inter.
const inter = Inter({
  variable: "--font-inter-family",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: "/icons/logo-gdgoc.svg",
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Cached API reads (GET /api/navigation, /api/stats), prerendered with the shell.
  const [navItems, siteInfo] = await Promise.all([getNavigation(), getSiteInfo()]);

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${googleSans.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Navigation items={navItems} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer navItems={navItems} siteInfo={siteInfo} />
      </body>
    </html>
  );
}
