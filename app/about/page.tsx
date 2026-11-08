import type { Metadata } from "next";

import { AboutHero } from "@/components/about/AboutHero";
import { CommunityCommitment } from "@/components/about/CommunityCommitment";
import { CommunityValues } from "@/components/about/CommunityValues";
import { OurPurpose } from "@/components/about/OurPurpose";
import { WaysToBelong } from "@/components/about/WaysToBelong";
import { CommunityInvitation } from "@/components/ui/CommunityInvitation";
import { getRoles, getSiteInfo, getValues } from "@/lib/api";

export const metadata: Metadata = {
  title: "About",
  description:
    "Built by students. For what’s next. GDGoC Universitas Gadjah Mada is a community of learners and makers connected by curiosity.",
};

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
