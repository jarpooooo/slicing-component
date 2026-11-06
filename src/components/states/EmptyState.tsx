import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title?: string;
  description?: string;
  /** Optional call to action, e.g. a Button that clears a filter. */
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  title = "Nothing here yet",
  description = "There's no content to show right now. Check back soon.",
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-card border border-dashed border-border bg-surface px-6 py-10 text-center",
        className,
      )}
    >
      <Inbox aria-hidden className="size-8 text-fg-muted" />
      <div className="flex flex-col gap-1">
        <p className="text-label font-bold text-fg">{title}</p>
        <p className="text-body text-fg-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}
