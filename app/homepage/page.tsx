import { BelongingStatement } from "@/components/landing/BelongingStatement";
import { CommunityIntro } from "@/components/landing/CommunityIntro";
import { Faq } from "@/components/landing/Faq";
import { GettingStarted } from "@/components/landing/GettingStarted";
import { Hero } from "@/components/landing/Hero";
import { LearningFormats } from "@/components/landing/LearningFormats";
import { ProjectPossibility } from "@/components/landing/ProjectPossibility";
import { TrackDiscovery } from "@/components/landing/TrackDiscovery";
import { CommunityInvitation } from "@/components/ui/CommunityInvitation";
import { getFaqs, getFormats, getJourney, getSiteInfo, getTracks } from "@/lib/api";

export default async function LandingPage() {
  const [siteInfo, tracks, formats, journey, faqs] = await Promise.all([
    getSiteInfo(),
    getTracks(),
    getFormats(),
    getJourney(),
    getFaqs(),
  ]);

  return (
    <>
      <Hero university={siteInfo.university} />
      <CommunityIntro university={siteInfo.university} />
      <TrackDiscovery tracks={tracks} />
      <LearningFormats formats={formats} />
      <ProjectPossibility />
      <GettingStarted steps={journey} />
      <BelongingStatement />
      <Faq faqs={faqs} />
      <CommunityInvitation />
    </>
  );
}
