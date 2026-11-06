import type { Metadata } from "next";

import { AboutHero } from "@/features/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who we are: GDGoC Universitas Gadjah Mada is a student-led community to learn, build, and share technology together — our purpose, values, and ways to belong.",
};

/** About page (Figma 14:16510). Navigation and Footer come from the root layout. */
export default function AboutPage() {
  return <AboutHero />;
}
