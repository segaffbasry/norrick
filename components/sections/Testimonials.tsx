import { testimonials } from "@/lib/data";

export interface Quote {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** Optional portrait. Falls back to the member’s initials. */
  photo?: string;
}

// Staggered two-column quote cards (The Hub style): soft cards, a square photo
// tile overlapping each card's top edge, oversized tight-tracked quote text.
function QuoteCard({ q }: { q: Quote }) {
  return (
    <figure className="pt-12">
      <div className="relative rounded-card bg-surface px-6 pb-10 pt-20 md:px-10 md:pb-14">
        <div className="absolute -top-12 left-6 size-24 overflow-hidden rounded-tag bg-placeholder md:left-10">
          {q.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={q.photo} alt="" className="size-full object-cover" />
          ) : (
            <span aria-hidden className="grid size-full place-items-center bg-primary-soft font-display text-3xl text-primary">{q.name.split(" ").map((part) => part[0]).join("")}</span>
          )}
        </div>
        <blockquote className="font-display text-quote font-medium text-foreground">
          &ldquo;{q.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-8">
          <span className="block font-display text-body font-semibold">{q.name},</span>
          <span className="text-body text-muted">{q.role}</span>
        </figcaption>
      </div>
    </figure>
  );
}

export function Testimonials({
  title = "Why creatives love us",
  subtitle = "Hear from our community",
  items = testimonials,
  maxWidth = "max-w-6xl",
}: {
  title?: string;
  subtitle?: string;
  items?: Quote[];
  /** Optional width cap (e.g. "max-w-6xl") to match a page's own container. */
  maxWidth?: string;
}) {
  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);

  return (
    <section id="testimonials" className="section-y">
      <div className="shell">
        <div className="text-center">
          <h2 className="text-hero">{title}</h2>
          <p className="mt-3 text-lead text-copy">{subtitle}</p>
        </div>

        {/* Mobile: single column in reading order. Desktop: staggered columns. */}
        <div className={`mx-auto mt-[4.5rem] flex flex-col gap-14 md:hidden ${maxWidth}`}>
          {items.map((q) => (
            <QuoteCard key={q.id} q={q} />
          ))}
        </div>
        <div className={`mx-auto mt-[4.5rem] hidden grid-cols-2 gap-x-16 md:grid ${maxWidth}`}>
          <div className="flex flex-col gap-16">
            {left.map((q) => (
              <QuoteCard key={q.id} q={q} />
            ))}
          </div>
          <div className="mt-24 flex flex-col gap-16">
            {right.map((q) => (
              <QuoteCard key={q.id} q={q} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
