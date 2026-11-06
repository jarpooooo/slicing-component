import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge needs to know about the custom font-size tokens defined in
 * globals.css; otherwise it treats `text-body` and `text-fg` as the same group
 * (text color) and drops one of them.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "overline",
            "eyebrow",
            "caption",
            "small",
            "label",
            "body",
            "body-md",
            "body-lg",
            "title-sm",
            "title-md",
            "heading-sm",
            "heading-md",
            "heading-lg",
            "display",
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
