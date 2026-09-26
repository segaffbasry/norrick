import type { Metadata } from "next";
import {
  partnerHero,
  trustedBy,
  intro,
  story,
  features,
  reach,
  partnerQuotes,
  partnerFaq,
  type Feature,
} from "@/lib/partnerships";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FaqSection } from "@/components/sections/FaqSection";
import { Check } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Partnerships | Norrick",
  description: "Connect your production with proven talent and turn the work into promotional content.",
};

// Decorative hero composition: floating stat card, avatar tiles and a badge.
function HeroVisual() {
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute right-4 top-6 size-28 rounded-pill bg-placeholder" />
      <div className="absolute bottom-8 right-16 size-32 rounded-pill bg-placeholder" />
      <Card variant="outline" className="absolute left-0 top-1/3 w-56 p-5 shadow-float">
        <p className="eyebrow">Roles filled</p>
        <p className="mt-2 font-display text-[2.5rem] font-medium leading-none">804</p>
        <p className="mt-2 text-small font-medium text-primary">+55% this month</p>
      </Card>
      <Badge tone="soft" className="absolute bottom-24 left-10">
        Verified crew
      </Badge>
    </div>
  );
}

function FeatureBlock({ feature, flip }: { feature: Feature; flip: boolean }) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className={flip ? "md:order-2" : ""}>
        <h2 className="text-title">{feature.title}</h2>
        <p className="mt-3 text-lead text-muted">{feature.body}</p>
        <ul className="mt-6 space-y-3">
          {feature.points.map((p) => (
            <li key={p} className="flex items-start gap-3 text-body text-copy">
              <Check className="mt-1 size-4 shrink-0 text-primary" />
              {p}
            </li>
          ))}
        </ul>
      </div>
      {/* Placeholder visual: swap for a real product still. */}
      <Card
        variant="flat"
        className={`relative flex aspect-[4/3] flex-wrap content-center items-center justify-center gap-3 overflow-hidden !bg-placeholder p-8 ${flip ? "md:order-1" : ""}`}
      >
        {feature.badges.map((b) => (
          <Badge key={b} tone="soft" className="relative !bg-background">
            {b}
          </Badge>
        ))}
      </Card>
    </div>
  );
}

export default function PartnershipsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="section-y">
        <div className="shell">
          <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="eyebrow">{partnerHero.eyebrow}</p>
              <h1 className="mt-4 text-hero">{partnerHero.title}</h1>
              <p className="mt-5 max-w-lg text-lead text-muted">{partnerHero.body}</p>
              <Button href="#request" className="mt-8">
                {partnerHero.cta}
              </Button>
            </div>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <section aria-label="Trusted by" className="pb-16">
        <div className="shell">
          <p className="text-center text-small text-muted">{trustedBy.label}</p>
          <ul className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-x-10 gap-y-4">
            {trustedBy.names.map((n) => (
              <li key={n} className="font-display text-body font-semibold uppercase tracking-[0.05em] text-foreground/45">
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Intro */}
      <section className="section-y pt-0 md:pt-0">
        <div className="shell text-center">
          <h2 className="mx-auto max-w-3xl text-hero">{intro.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lead text-muted">{intro.body}</p>
        </div>
      </section>

      {/* Success story */}
      <section className="section-y pt-0 md:pt-0">
        <div className="shell">
          <Card className="mx-auto grid max-w-6xl gap-10 p-8 md:grid-cols-2 md:p-12">
            <div>
              <p className="eyebrow text-primary">{story.eyebrow}</p>
              <h2 className="mt-3 text-title">{story.title}</h2>
              <figure className="mt-8">
                <blockquote className="font-display text-lead">&ldquo;{story.quote}&rdquo;</blockquote>
                <figcaption className="mt-4">
                  <span className="block font-display text-body font-semibold">{story.name}</span>
                  <span className="text-small text-muted">{story.role}</span>
                </figcaption>
              </figure>
            </div>
            <dl className="grid content-center gap-8">
              {story.stats.map((s) => (
                <div key={s.label} className="border-b border-border pb-6 last:border-0 last:pb-0">
                  <dd className="font-display text-[3rem] font-medium leading-none">{s.value}</dd>
                  <dt className="mt-2 text-body text-muted">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </section>

      {/* Feature blocks */}
      <section className="section-y pt-0 md:pt-0">
        <div className="shell">
          <div className="mx-auto max-w-6xl space-y-20 md:space-y-28">
            {features.map((f, i) => (
              <FeatureBlock key={f.title} feature={f} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Reach stats */}
      <section className="section-y pt-0 md:pt-0">
        <div className="shell">
          <dl className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
            {reach.map((r) => (
              <Card key={r.label} variant="outline" className="p-8">
                <dd className="font-display text-[3rem] font-medium leading-none text-primary">{r.value}</dd>
                <dt className="mt-2 text-body text-muted">{r.label}</dt>
              </Card>
            ))}
          </dl>
        </div>
      </section>

      {/* Partner quotes */}
      <section className="section-y pt-0 md:pt-0">
        <div className="shell">
          <h2 className="mx-auto max-w-3xl text-center text-hero">
            Partnerships that fuel forward-thinking productions
          </h2>
          <ul className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2">
            {partnerQuotes.map((q) => (
              <li key={q.id}>
                <Card as="figure" className="flex h-full flex-col justify-between gap-8 p-8">
                  <blockquote className="font-display text-lead text-foreground">&ldquo;{q.quote}&rdquo;</blockquote>
                  <div>
                    <dl className="mb-6 flex gap-10">
                      {q.stats.map((s) => (
                        <div key={s.label}>
                          <dd className="font-display text-[2rem] font-medium leading-none">{s.value}</dd>
                          <dt className="mt-1 text-small text-muted">{s.label}</dt>
                        </div>
                      ))}
                    </dl>
                    <figcaption>
                      <span className="block font-display text-body font-semibold">{q.name}</span>
                      <span className="text-small text-muted">{q.role}</span>
                    </figcaption>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FaqSection items={partnerFaq} className="section-y pt-0 md:pt-0" />

      {/* Final CTA */}
      <section id="request" className="section-y pt-0 md:pt-0">
        <div className="shell">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-card bg-primary p-8 text-primary-foreground md:flex-row md:items-center md:p-12">
            <h2 className="max-w-xl text-hero">Connect with the creative current on Norrick</h2>
            <Button href="#" className="!border-background !bg-background !text-primary hover:!bg-primary-soft">
              Request partnership
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
