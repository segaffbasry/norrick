import Link from "next/link";
import { meet } from "@/lib/data";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

// "Meet Norrick" (Contra Labs "Meet the ecosystem" layout): big heading, one
// paragraph, then two large image cards with a small uppercase label. On large
// screens the section is exactly one screen tall (100svh minus the 5rem
// header): the heading and paragraph keep their size and the cards take the
// remaining height. The images are flat grey placeholders.
export function MeetSection() {
  return (
    <section
      id="meet"
      className="bg-surface py-10 md:py-14 lg:flex lg:h-[calc(100svh-5rem)] lg:min-h-[38rem] lg:flex-col lg:py-[clamp(1.5rem,5vh,4rem)]"
    >
      <div className="shell lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
        <h2 className="text-[clamp(2.5rem,min(9vh,5vw),5.5rem)] leading-[1] tracking-[-0.035em]">{meet.title}</h2>
        <p className="mt-[clamp(0.75rem,2.5vh,1.5rem)] max-w-3xl text-[clamp(1.0625rem,min(2.6vh,1.5vw),1.625rem)] leading-snug text-copy">
          {meet.body}
        </p>

        <ul data-stagger className="mt-[clamp(1.25rem,4vh,3rem)] grid gap-4 md:grid-cols-2 lg:min-h-0 lg:flex-1">
          {meet.cards.map((card) => (
            <li key={card.label} className="lg:min-h-0">
              <Link
                href={card.href}
                className="group relative block aspect-[4/5] overflow-hidden rounded-card sm:aspect-[5/4] lg:aspect-auto lg:h-full"
              >
                <ImagePlaceholder className="absolute inset-0" />
                <span className="eyebrow absolute left-6 top-6 !text-foreground/70 sm:left-8 sm:top-8">{card.label}</span>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="max-w-md text-[clamp(1.375rem,1rem+1vw,2.25rem)] leading-tight tracking-[-0.02em]">{card.title}</h3>
                  <p className="mt-2 max-w-md text-body text-copy">{card.body}</p>
                  <span className="mt-3 inline-flex items-center gap-2 font-display text-body font-medium text-primary">
                    {card.cta}
                    <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">&rarr;</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
