import { BuildAndBelongSection, DiscoverLearningSection, HeroSection } from "@/features/landing";

/**
 * Landing page (Figma 14:16047). Navigation and Footer come from the root layout.
 */
export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <DiscoverLearningSection />
      <BuildAndBelongSection />
    </>
  );
}
