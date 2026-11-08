import type { Metadata } from "next";

import { ContactHero } from "@/components/contact/ContactHero";
import { ContactWorkspace } from "@/components/contact/ContactWorkspace";
import { InquiryGuidance } from "@/components/contact/InquiryGuidance";
import { getInquiryCategories, getSiteInfo } from "@/lib/api";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Good things start with hello. Send GDGoC UGM a question, a collaboration idea, or an idea for the community.",
};

export default async function ContactPage() {
  const [siteInfo, categories] = await Promise.all([getSiteInfo(), getInquiryCategories()]);

  return (
    <>
      <ContactHero />
      <ContactWorkspace
        categories={categories}
        instagramHandle={siteInfo.instagramHandle}
        instagramUrl={siteInfo.instagramUrl}
      />
      <InquiryGuidance categories={categories} />
    </>
  );
}
