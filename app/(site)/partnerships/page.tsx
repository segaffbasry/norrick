import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/ui/Faq";
import { Film } from "@/components/home/Film";
import { SceneFx } from "@/components/home/SceneFx";
import { heroFilm } from "@/lib/home";
import { testimonials } from "@/lib/data";
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

  return (
    <main id="main-content" data-scenes className={s.home}>
      <SceneFx />
      <section data-header="dark" className={c.top} aria-labelledby="partners-title">
        <Film clip={heroFilm} eager className={c.film} />
        <div className={c.topInner}>
          <p className={c.label}>{partnerHero.label}</p>
          <h1 id="partners-title" className={c.wide}>
            {partnerHero.title} <span>{partnerHero.accent}</span>
          </h1>
          <p className={c.lede}>{partnerHero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup" className={s.pill}>
              Post a role for free 
            </Link>
            <Link href="/pricing" className={`${s.pill} ${s.pillLight}`}>
              See production rooms 
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
            Make it together
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

      <section className={s.faq} aria-labelledby="partner-faq-title">
        <div>
          <p className={s.label} data-rise>
            Before we talk
          </p>
          <h2 id="partner-faq-title" className={s.wide} data-lines>
            <span>Good</span>
            <span>questions.</span>
          </h2>
        </div>
        <div data-rise>
          <Faq items={partnerFaq} />
        </div>
      </section>
    </main>
  );
}
