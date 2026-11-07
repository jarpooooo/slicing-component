/*
 * Contact page copy (Figma 14:16727). Inquiry categories come from
 * GET /api/inquiry-categories.
 */

// Contact introduction (14:16746)

export const contactHeroContent = {
  eyebrow: "Contact • Let’s connect",
  headingLead: "Good things start with",
  /** Rendered in link blue after the lead. */
  headingAccent: "hello.",
  description:
    "A question, a collaboration, or an idea for the community? Tell us what’s on your mind.",
} as const;

// Inquiry guidance (14:16754)

export const inquiryContent = {
  heading: "What brings you here?",
  description: "Pick the closest topic in the form. We’ll take it from there.",
} as const;

export const communityUpdatesContent = {
  eyebrow: "Stay curious, stay connected",
  heading: "Looking for community updates?",
} as const;

// Contact form (14:16788)

export const contactFormContent = {
  heading: "Send us a message",
  requiredNote: "Fields marked * are required.",
  fields: {
    firstName: { label: "First name", placeholder: "Your first name", required: true },
    lastName: { label: "Last name", placeholder: "Your last name", required: false },
    email: { label: "Email address", placeholder: "Where we can reply to you", required: true },
    organization: {
      label: "University / organization",
      placeholder: "Where you study or work (optional)",
      required: false,
    },
    category: { label: "Inquiry category", required: true },
    subject: {
      label: "Subject",
      placeholder: "A short introduction to your question",
      required: true,
    },
    message: {
      label: "Your message",
      placeholder: "Tell us a little about your question or idea…",
      required: true,
    },
  },
  consent: "I agree that the information I share can be used to respond to this inquiry.",
  submit: "Send message",
  privacyNote: "Please don’t include passwords or sensitive personal information.",
} as const;

// Before you send (14:16834)

export const guidanceContent = {
  eyebrow: "A little guidance",
  headingLines: ["Help us understand", "your idea."],
  link: { label: "Explore the programs first", href: "/overview" },
  /**
   * Tip titles per category id, from Figma. The tip text is the category's
   * `guidance`; if it opens with its own question ("Not sure which category
   * fits?"), that question becomes the title.
   */
  tipTitles: {
    "joining-learning": "For learning questions",
    collaboration: "For collaborations",
  } as Record<string, string>,
} as const;
