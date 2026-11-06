import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "link";

/**
 * Variant styles from Figma:
 * - primary: "Action" (14:16061) — Blue/500 fill, 52px tall, 24px x-padding,
 *   16px gap, 8px radius, 16px Medium white label, 20px arrow.
 * - link: "Text link" (14:16268) — 16px Medium link-blue label, 12px gap, 20px arrow.
 *
 * - secondary: hero second action (14:16078) — same geometry as primary; fill/border not
 *   inspected (Figma rate limit), rendered as an outlined neutral button. TODO(figma): verify.
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "h-control-h gap-4 rounded-control border border-transparent bg-primary px-6 text-primary-fg hover:bg-blue-700",
  secondary:
    "h-control-h gap-4 rounded-control border border-border bg-surface px-6 text-fg hover:bg-surface-muted",
  link: "gap-3 text-link hover:underline",
};

const baseClasses =
  "inline-flex shrink-0 items-center justify-center text-label font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50";

type CommonProps = {
  variant?: ButtonVariant;
  /** Show the trailing arrow used by every action in the design. */
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  withArrow = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], className);
  const content = (
    <>
      {children}
      {withArrow && <ArrowRight aria-hidden className="size-5 shrink-0" />}
    </>
  );

  if (typeof rest.href === "string") {
    const linkProps = rest as Omit<ButtonAsLink, keyof CommonProps>;
    return (
      <Link className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
