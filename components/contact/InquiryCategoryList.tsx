import type { InquiryCategory, InquiryCategoryId } from "@/lib/types";
import { cn } from "@/lib/utils";

type InquiryCategoryListProps = {
  categories: InquiryCategory[];
  selected: InquiryCategoryId | "";
  onSelect: (id: InquiryCategoryId) => void;
};

/** Topic cards that work like toggle buttons (Figma 14:16758). */
export function InquiryCategoryList({ categories, selected, onSelect }: InquiryCategoryListProps) {
  return (
    <ul className="flex flex-col gap-4.5">
      {categories.map((category) => {
        const isSelected = category.id === selected;
        return (
          <li key={category.id}>
            <button
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(category.id)}
              className={cn(
                "flex w-full items-start gap-4.5 rounded-box border p-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                isSelected
                  ? "border-transparent bg-surface-accent"
                  : "border-border hover:bg-surface-muted",
              )}
            >
              <span
                aria-hidden
                className="w-6 font-inter text-glyph-25 leading-none font-medium text-link"
              >
                {category.icon}
              </span>
              <span className="flex flex-col gap-1.5">
                <span className="text-body-plus leading-auto font-medium text-fg">
                  {category.label}
                </span>
                <span className="text-small text-fg-muted">{category.description}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
