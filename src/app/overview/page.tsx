import type { Metadata } from "next";

import { CommunityInvitation } from "@/components/sections";
import {
  LearningJourney,
  OverviewHero,
  ProgramFormats,
  SectionNav,
  StartingPoint,
  TrackOverview,
} from "@/features/overview";

export const metadata: Metadata = {
  title: "Overview",
  description:
    "Programs & learning tracks at GDGoC UGM: explore research, design, and development, the ways we learn together, and where to start.",
};

/** Overview (Figma 14:16894) */
export default function OverviewPage() {
  return (
    <>
      <OverviewHero />
      <SectionNav />
      <TrackOverview />
      <ProgramFormats />
      <LearningJourney />
      <StartingPoint />
      <CommunityInvitation />
    </>
  );
}
