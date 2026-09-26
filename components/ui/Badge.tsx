import type { ReactNode } from "react";

type Tone = "tag" | "primary" | "soft";

interface BadgeProps {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}

// "tag" mirrors Contra's PRO/MAX marker: 8px, 600 weight, 4px radius, hairline.
const tones: Record<Tone, string> = {
  tag: "rounded-tag border border-surface bg-background px-1 py-1 text-[8px] leading-none font-semibold text-ink",
  primary:
    "rounded-pill bg-primary px-3 py-1.5 text-eyebrow font-medium uppercase text-primary-foreground",
  soft: "rounded-pill bg-primary-soft px-3 py-1.5 text-eyebrow font-medium uppercase text-primary",
};

export function Badge({ tone = "tag", className = "", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-display tracking-[0.05em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
