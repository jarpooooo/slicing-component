import { CircleAlert, RotateCw } from "lucide-react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  message?: string;
  /** When provided, renders a "Try again" button. */
  onRetry?: () => void;
  className?: string;
};

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center gap-4 rounded-card border border-border bg-surface px-6 py-10 text-center",
        className,
      )}
    >
      <CircleAlert aria-hidden className="size-8 text-brand-red" />
      <div className="flex flex-col gap-1">
        <p className="text-label font-bold text-fg">{title}</p>
        <p className="text-body text-fg-muted">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} className="gap-2">
          <RotateCw aria-hidden className="size-4" />
          Try again
        </Button>
      )}
    </div>
  );
}
