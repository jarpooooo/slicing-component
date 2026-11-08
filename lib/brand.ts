/** The four Google brand colors used for markers, accents and tinted panels. */
export type BrandTone = "blue" | "red" | "yellow" | "green";

export const brandToneBg: Record<BrandTone, string> = {
  blue: "bg-brand-blue",
  red: "bg-brand-red",
  yellow: "bg-brand-yellow",
  green: "bg-brand-green",
};

export const brandToneTint: Record<BrandTone, string> = {
  blue: "bg-tint-blue",
  red: "bg-tint-red",
  yellow: "bg-tint-yellow",
  green: "bg-tint-green",
};
