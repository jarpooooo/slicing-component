import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/** Small uppercase section label with a blue dot (Figma 14:16068). */
export function EyebrowLabel({ className, children, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-eyebrow font-medium text-fg-muted uppercase",
        className,
      )}
      {...props}
    >
      <span aria-hidden className="size-1.75 shrink-0 rounded-full bg-brand-blue" />
      {children}
    </p>
  );
}
