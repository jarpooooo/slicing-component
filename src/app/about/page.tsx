import type { Metadata } from "next";

import { CommunityInvitation } from "@/components/sections";
import {
  AboutHero,
  CommunityCommitment,
  CommunityValues,
  OurPurpose,
  WaysToBelong,
} from "@/features/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Built by students. For what’s next. GDGoC Universitas Gadjah Mada is a community of learners and makers connected by curiosity.",
};

/** About (Figma 14:16510) */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurPurpose />
      <CommunityValues />
      <WaysToBelong />
      <CommunityCommitment />
      <CommunityInvitation />
    </>
  );
}
