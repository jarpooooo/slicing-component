import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { AssetIcon } from "./AssetIcon";

type ButtonVariant = "primary" | "secondary" | "link";

/**
 * Variants from Figma: primary is "Action" (14:16061), secondary is the second hero
 * action (14:16078) and link is "Text link" (14:16268).
 */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "h-control-h gap-4 rounded-control border border-transparent bg-primary px-6 text-primary-fg hover:bg-link",
  secondary:
    "h-control-h gap-4 rounded-control border border-border bg-surface px-6 text-link hover:bg-surface-accent",
  link: "gap-3 rounded-control text-link hover:underline underline-offset-4",
};

const baseClasses =
  "inline-flex shrink-0 items-center justify-center text-label font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50";

type CommonProps = {
  variant?: ButtonVariant;
  /** Adds the trailing arrow. */
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
      {withArrow && (
        <AssetIcon name={variant === "primary" ? "arrowRightWhite" : "arrowRightBlue"} />
      )}
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
