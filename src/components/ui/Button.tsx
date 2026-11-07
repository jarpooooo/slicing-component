import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { AssetIcon } from "./AssetIcon";

type ButtonVariant = "primary" | "secondary" | "link";

/**
 * Variant styles from Figma:
 * - primary: "Action" (14:16061) — Blue/500 fill, transparent 1px border, 52px tall,
 *   24px x-padding, 16px gap, 8px radius, 16px Medium white label, 20px white arrow.
 * - secondary: hero second action (14:16078) — same geometry, white fill,
 *   #DADCE0 border, link-blue label and arrow.
 * - link: "Text link" (14:16268) — 16px Medium link-blue label, 12px gap, 20px blue arrow.
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
