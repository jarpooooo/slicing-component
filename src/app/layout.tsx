import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";

// Figma font family: "Google Sans" (Regular / Medium / Bold).
// Exposed as --font-google-sans and mapped to --font-sans in globals.css.
const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GDGoC UGM",
  description: "Google Developer Groups on Campus Universitas Gadjah Mada",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${googleSans.variable} h-full`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
