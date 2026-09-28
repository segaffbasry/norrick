import { plans } from "@/lib/pricing";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
export function PricingPlans() {
  return <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{plans.map((plan) => (
    <article key={plan.id} className="flex flex-col rounded-card border border-border bg-surface p-6">
      <h2 className="whitespace-nowrap text-[clamp(1rem,1.4vw,1.3rem)] font-semibold">{plan.name}</h2>
      <p className="mt-6 font-display text-3xl">{plan.monthly === null ? "Let’s talk" : plan.monthly === 0 ? "Free" : <>${plan.monthly}<span className="text-sm text-muted"> / month</span></>}</p>
      <p className="mt-4 text-body text-muted">{plan.blurb}</p>
      <ul className="my-6 flex-1 space-y-3">{plan.features.map((feature) => <li key={feature} className="flex gap-2 text-small text-copy"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{feature}</li>)}</ul>
      <Button href={plan.cta.href} className="w-full !px-3 !text-sm">{plan.cta.label}</Button>
    </article>
  ))}</div>;
}
