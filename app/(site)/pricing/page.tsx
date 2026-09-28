import type { Metadata } from "next";
import { pricingFaq, pricingHero, summaryCards } from "@/lib/pricing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CompareTable } from "@/components/sections/CompareTable";
import { FaqSection } from "@/components/sections/FaqSection";
import { PricingPlans } from "@/components/sections/PricingPlans";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Pricing | Norrick",
  description: "Hiring is free. You pay to run your team.",
};

export default function PricingPage() {
  return (
    <main id="main-content">
      <section className="section-y pb-0 md:pb-0">
        <div className="shell">
          <div className="mx-auto max-w-[88rem]">
            <div className="text-center">
              <h1 className="text-title font-semibold">{pricingHero.title}</h1>
              <p className="mx-auto mt-6 max-w-2xl text-lead text-muted">{pricingHero.body}</p>
            </div>

            <div className="mt-12">
              <PricingPlans />
            </div>

            <ul className="mt-16 grid gap-4 md:grid-cols-2">
              {summaryCards.map((c) => (
                <li key={c.title}>
                  <Card className="flex h-full flex-col p-8">
                    <h2 className="text-heading">{c.title}</h2>
                    <p className="mt-4 text-lead text-copy">
                      {c.lead.map((part, i) => (
                        <span key={part.bold}>
                          {i > 0 && <span aria-hidden> &middot; </span>}
                          <strong className="font-semibold text-foreground">{part.bold}</strong>
                          {part.rest}
                        </span>
                      ))}
                    </p>
                    <p className="mt-3 text-body text-muted">{c.body}</p>
                    <Button
                      href={c.cta.href}
                      variant={c.cta.main ? "primary" : "outline"}
                      className={`mt-8 w-full ${c.cta.main ? "" : "!border-border !text-primary-light"}`}
                    >
                      {c.cta.label}
                      {!c.cta.main && <span aria-hidden>&rarr;</span>}
                    </Button>
                  </Card>
                </li>
              ))}
            </ul>

            <div className="mt-16">
              <CompareTable />
            </div>
          </div>
        </div>
      </section>

      <Testimonials title="The people make the place" subtitle="In our community’s own words" />

      <FaqSection items={pricingFaq} className="section-y pt-0 md:pt-0" />

      <section className="section-y pt-0 md:pt-0">
        <div className="shell">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-card bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:p-12">
            <div className="max-w-xl">
              <h2 className="text-heading">Hiring is free. Start today.</h2>
              <p className="mt-3 text-lead opacity-80">
                Post a role, search talent and message creatives at no cost.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/signup" className="!border-background !bg-background !text-primary-light hover:!bg-primary-soft">
                Start hiring
              </Button>
              <Button href="/partnerships" variant="outline" className="!border-primary-foreground !bg-transparent !text-primary-foreground hover:!bg-primary-foreground/10">
                Talk to us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
