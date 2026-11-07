import type { Metadata } from "next";

import { ContactHero, ContactWorkspace, InquiryGuidance } from "@/features/contact";
import { getSiteInfo } from "@/lib/api/server";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Good things start with hello. Send GDGoC UGM a question, a collaboration idea, or an idea for the community.",
};

/** Contact (Figma 14:16727) */
export default async function ContactPage() {
  const siteInfo = await getSiteInfo(); // GET /api/stats

  return (
    <>
      <ContactHero />
      <ContactWorkspace
        instagramHandle={siteInfo.instagramHandle}
        instagramUrl={siteInfo.instagramUrl}
      />
      <InquiryGuidance />
    </>
  );
}
