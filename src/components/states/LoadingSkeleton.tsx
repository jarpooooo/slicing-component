import { cn } from "@/lib/utils";

type LoadingSkeletonProps = {
  /** "text": stacked lines. "cards": a responsive grid of card-shaped blocks. */
  variant?: "text" | "cards";
  /** Number of lines (text) or cards (cards). */
  count?: number;
  /** Accessible label announced to screen readers. */
  label?: string;
  className?: string;
};

function Bone({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-control bg-surface-muted", className)} />;
}

export function LoadingSkeleton({
  variant = "text",
  count = 3,
  label = "Loading…",
  className,
}: LoadingSkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <div role="status" aria-live="polite" aria-busy="true" className={className}>
      <span className="sr-only">{label}</span>

      {variant === "text" ? (
        <div className="flex flex-col gap-3" aria-hidden>
          {items.map((i) => (
            <Bone key={i} className={cn("h-4", i === count - 1 ? "w-2/3" : "w-full")} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-hidden>
          {items.map((i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-card border border-border"
            >
              <Bone className="h-58 rounded-none" />
              <div className="flex flex-col gap-4 p-7">
                <Bone className="h-3 w-1/3" />
                <Bone className="h-7 w-3/4" />
                <Bone className="h-4 w-full" />
                <Bone className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
