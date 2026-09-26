import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type Variant = "flat" | "outline" | "dark";

interface CardProps<T extends ElementType> {
  as?: T;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

// 16px radius (Contra card spec). Flat soft panel, hairline outline, or ink.
const variants: Record<Variant, string> = {
  flat: "bg-surface",
  outline: "border border-border bg-background",
  dark: "bg-ink text-ink-foreground",
};

export function Card<T extends ElementType = "div">({
  as,
  variant = "flat",
  className = "",
  children,
  ...props
}: CardProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CardProps<T>>) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag className={`rounded-card ${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
