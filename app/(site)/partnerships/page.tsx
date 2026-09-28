import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/ui/Faq";
import { Film } from "@/components/home/Film";
import { SceneFx } from "@/components/home/SceneFx";
import { crafts } from "@/lib/home";
import { partners, testimonials } from "@/lib/data";
import { offers, partnerFaq, partnerHero } from "@/lib/partnerships";
import s from "../home.module.css";
import c from "../collaborate/collaborate.module.css";

export const metadata: Metadata = {
  title: "For productions | Norrick",
  description: "Post a role and hear from filmmakers, actors, animators and crew who want to make the work.",
};

// For productions: a film-led opener, three things partners can do, Mark's own
// words about hiring here, the companies behind Norrick, and questions.
export default function PartnershipsPage() {
  const mark = testimonials.find((t) => t.id === "mark-wilhelm");
  const crew = crafts.find((x) => x.title === "Crew")!;

  return (
    <main id="main-content" data-scenes className={s.home}>
      <SceneFx />
      <section data-header="dark" className={c.top} aria-labelledby="partners-title">
        <Film clip={crew.clip} eager className={c.film} />
        <div className={c.topInner}>
          <p className={c.label}>{partnerHero.label}</p>
          <h1 id="partners-title" className={c.wide}>
            {partnerHero.title} <em>{partnerHero.accent}</em>
          </h1>
          <p className={c.lede}>{partnerHero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className={s.pill}>
              Post a role for free <span aria-hidden>↗</span>
            </Link>
            <Link href="/pricing" className={`${s.pill} ${s.pillLight}`}>
              See production rooms <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className={s.faq} aria-labelledby="offer-title">
        <div>
          <p className={s.label} data-rise>
            What we do together
          </p>
          <h2 id="offer-title" className={s.wide} data-lines>
            <span>Bring the project.</span>
            <em>We’ll bring the people.</em>
          </h2>
        </div>
        <ul className="divide-y divide-border border-y border-border" data-rise="children">
          {offers.map((o) => (
            <li key={o.title} className="py-8">
              <h3 className="font-display text-[clamp(1.4rem,2vw,2rem)] font-semibold tracking-[-0.02em]">{o.title}</h3>
              <p className="mt-2 max-w-xl text-lead text-copy">{o.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {mark && (
        <section className={s.voices} aria-labelledby="proof-title">
          <p className={s.label} data-rise>
            From someone who hires here
          </p>
          <h2 id="proof-title" className="sr-only">
            What a production says
          </h2>
          <figure className={`${s.quote} mt-10 max-w-4xl`} data-rise>
            <span className={s.quoteMark} aria-hidden>
              “
            </span>
            <blockquote className="!text-[clamp(1.6rem,3vw,3rem)]">{mark.quote}</blockquote>
            <figcaption>
              <span className={s.initials} aria-hidden>
                MW
              </span>
              <span>
                <strong>{mark.name}</strong>
                <small>{mark.role}</small>
              </span>
            </figcaption>
          </figure>
        </section>
      )}

      <section className="px-[clamp(20px,5.5vw,96px)] py-16" aria-label="Partners">
        <p className={`${s.label} text-muted`}>In good company</p>
        <ul className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-6">
          {partners.map((p) => (
            <li key={p.name}>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity hover:opacity-100">
                {p.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.logo} alt={p.name} className="h-5 w-auto brightness-0 sm:h-6" />
                ) : (
                  p.name
                )}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.faq} aria-labelledby="partner-faq-title">
        <div>
          <p className={s.label} data-rise>
            Before we talk
          </p>
          <h2 id="partner-faq-title" className={s.wide} data-lines>
            <span>Good</span>
            <em>questions.</em>
          </h2>
        </div>
        <div data-rise>
          <Faq items={partnerFaq} />
        </div>
      </section>
    </main>
  );
}
