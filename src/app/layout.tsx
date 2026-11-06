import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";

import { Footer, Navigation } from "@/components/layout";
import { siteConfig } from "@/lib/site";

import "./globals.css";

// Figma font family: "Google Sans" (Regular / Medium / Bold).
// Exposed as --font-google-sans and mapped to --font-sans in globals.css.
const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  // Next.js has no metric overrides for Google Sans, so declare the fallback
  // stack explicitly instead of letting it try (and warn) to generate one.
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${googleSans.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-surface focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
