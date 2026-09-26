import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "chip" | "ghost";

interface BaseProps {
  variant?: Variant;
  /** chip only: renders the selected state */
  active?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & { href?: undefined };

type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof BaseProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

// Pill buttons, 48px tall, 24px side padding, 600 weight (Contra CTA spec).
const base =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-pill font-display " +
  "transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "h-12 px-6 text-body font-semibold bg-primary text-primary-foreground border border-primary hover:bg-foreground hover:border-foreground",
  outline:
    "h-12 px-6 text-body font-semibold bg-background text-copy border border-copy hover:bg-surface",
  // Category chip (Contra filter row): 44px, 16px text, borderless; the active
  // chip gets a soft filled pill.
  chip:
    "h-11 px-4 text-body font-normal bg-transparent text-muted border border-transparent hover:text-foreground",
  ghost: "text-body font-medium text-copy hover:text-primary",
};

const chipActive = "!bg-surface !text-foreground !font-medium";

export function Button({
  variant = "primary",
  active = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${variant === "chip" && active ? chipActive : ""} ${className}`;

  if ("href" in props && props.href !== undefined) {
    return (
      <Link className={classes} {...(props as ComponentPropsWithoutRef<typeof Link>)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as ComponentPropsWithoutRef<"button">)}
    >
      {children}
    </button>
  );
}
