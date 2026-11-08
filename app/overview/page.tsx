import type { Metadata } from "next";

import { LearningJourney } from "@/components/overview/LearningJourney";
import { OverviewHero } from "@/components/overview/OverviewHero";
import { ProgramFormats } from "@/components/overview/ProgramFormats";
import { SectionNav } from "@/components/overview/SectionNav";
import { StartingPoint } from "@/components/overview/StartingPoint";
import { TrackOverview } from "@/components/overview/TrackOverview";
import { CommunityInvitation } from "@/components/ui/CommunityInvitation";
import { getFormats, getJourney, getTracks } from "@/lib/api";

export const metadata: Metadata = {
  title: "Overview",
  description:
    "Programs & learning tracks at GDGoC UGM: explore research, design, and development, the ways we learn together, and where to start.",
};

export default async function OverviewPage() {
  const [tracks, formats, journey] = await Promise.all([getTracks(), getFormats(), getJourney()]);

  return (
    <>
      <OverviewHero />
      <SectionNav />
      <TrackOverview tracks={tracks} />
      <ProgramFormats formats={formats} />
      <LearningJourney stages={journey} />
      <StartingPoint />
      <CommunityInvitation />
    </>
  );
}
