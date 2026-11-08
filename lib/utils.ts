import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to know the custom font-size tokens from globals.css. Otherwise
 * it puts `text-body` and `text-fg` in the same group (text color) and drops one.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      leading: [{ leading: ["auto"] }],
      "font-size": [
        {
          text: [
            "overline",
            "eyebrow",
            "caption",
            "small",
            "control",
            "label",
            "body",
            "body-plus",
            "body-md",
            "title-sm",
            "lead",
            "lead-lg",
            "lead-xl",
            "heading-21",
            "heading-24",
            "heading-25",
            "heading-26",
            "heading-27",
            "heading-28",
            "heading-30",
            "heading-32",
            "heading-36",
            "heading-40",
            "heading-44",
            "heading-48",
            "display-72",
            "display-80",
            "numeral-38",
            "numeral-44",
            "glyph-24",
            "glyph-25",
            "glyph-28",
            "sticker",
          ],
        },
      ],
    },
  },
});

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** "join-a-group" → "Join a group" (for slugs returned by the API). */
export function humanizeSlug(slug: string) {
  const text = slug.replace(/[-_]+/g, " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}
