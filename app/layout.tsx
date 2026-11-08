import type { Metadata } from "next";
import { Google_Sans, Inter } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { getNavigation, getSiteInfo } from "@/lib/api";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",

  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});

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
        <Navigation items={navItems} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer navItems={navItems} siteInfo={siteInfo} />
      </body>
    </html>
  );
}
