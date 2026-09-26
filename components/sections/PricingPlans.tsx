"use client";

import { useState } from "react";
import { plans, pricingHero, type Plan } from "@/lib/pricing";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimatedPrice } from "@/components/ui/AnimatedPrice";
import { Check } from "@/components/ui/Icons";

type Billing = "monthly" | "yearly";

const money = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;

// Monthly / Yearly toggle over the four plan cards.
export function PricingPlans() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <>
      <div className="flex justify-center">
        <div role="group" aria-label="Billing period" className="inline-flex gap-1 rounded-pill bg-surface p-1">
          <button
            type="button"
            aria-pressed={billing === "monthly"}
            onClick={() => setBilling("monthly")}
            className={`h-11 rounded-pill px-6 font-display text-body font-medium transition-colors ${
              billing === "monthly" ? "bg-background text-foreground shadow-float" : "text-muted hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            aria-pressed={billing === "yearly"}
            onClick={() => setBilling("yearly")}
            className={`flex h-11 items-center gap-2 rounded-pill px-6 font-display text-body font-medium transition-colors ${
              billing === "yearly" ? "bg-background text-foreground shadow-float" : "text-muted hover:text-foreground"
            }`}
          >
            Yearly
            <Badge tone="soft" className="!px-2 !py-0.5">
              {pricingHero.yearlySaving}
            </Badge>
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billing={billing} />
        ))}
      </div>
    </>
  );
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const hi = plan.highlight;
  const yearly = billing === "yearly" && plan.yearly;

  // Big price + a fixed-height note line, so cards do not jump on toggle.
  let price: string;
  let priceValue: number | null = null;
  let unit = "";
  let note = "";
  if (plan.monthly === null) {
    price = plan.priceLabel ?? "Custom";
  } else if (plan.monthly === 0) {
    price = "$0";
  } else if (yearly && plan.yearly) {
    price = money(plan.yearly.perMonth);
    priceValue = plan.yearly.perMonth;
    unit = "/mo";
    note = `${money(plan.yearly.total)} billed yearly`;
  } else {
    price = money(plan.monthly);
    priceValue = plan.monthly;
    unit = "/mo";
    note = "Billed monthly";
  }

  return (
    <article className="flex flex-col">
      <div
        className={`flex h-[19.5rem] flex-col rounded-card p-6 ${hi ? "bg-primary text-primary-foreground" : "bg-surface"}`}
      >
        <div className="flex items-start justify-between gap-3">
          <p className={`eyebrow ${hi ? "!text-primary-foreground/80" : ""}`}>{plan.eyebrow}</p>
          {hi && (
            <Badge tone="soft" className="!bg-background !text-primary">
              Most popular
            </Badge>
          )}
        </div>

        <h2 className="mt-3 font-display text-heading font-medium leading-tight">{plan.name}</h2>

        <div className="mt-auto">
          <p className="font-display text-[2.5rem] font-medium leading-none tracking-[-0.02em]">
            {priceValue !== null ? <AnimatedPrice value={priceValue} /> : price}
            {unit && <span className={`ml-1 text-body font-normal ${hi ? "opacity-80" : "text-muted"}`}>{unit}</span>}
          </p>
          <p className={`mt-1 h-5 text-small ${hi ? "opacity-80" : "text-muted"}`}>{note}</p>
          <p className={`mt-3 text-body ${hi ? "opacity-90" : "text-copy"}`}>{plan.blurb}</p>
        </div>
      </div>

      <Button
        href={plan.cta.href}
        variant={plan.id === "free" ? "outline" : "primary"}
        className={`mt-3 w-full ${plan.id === "studio" ? "!border-ink !bg-ink hover:!border-foreground hover:!bg-foreground" : ""}`}
      >
        {plan.cta.label}
      </Button>

      <ul className="space-y-3 px-2 pt-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-small text-copy">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            {f}
          </li>
        ))}
      </ul>
    </article>
  );
}
