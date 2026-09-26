import Image from "next/image";
import Link from "next/link";
import { closingHero, roleLabel, type RoleId } from "@/lib/data";
import { Button } from "@/components/ui/Button";

// Closing call to action: a headline, one line of copy, two buttons and a few
// popular roles on the left, a real photo on the right, and the three figures
// in a tidy row underneath.
const popular: RoleId[] = [
  "director",
  "producer",
  "screenwriter",
  "actor",
  "editor",
  "cinematographer",
  "animator",
  "concept-artist",
  "sound-designer",
  "composer",
];

export function ClosingHero() {
  return (
    <section id="explore" className="section-y bg-surface">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <h2 className="max-w-[12ch] text-[clamp(2.75rem,1.5rem+5vw,5.5rem)] leading-[0.98] tracking-[-0.04em]">
              {closingHero.title}
            </h2>
            <p className="mt-6 max-w-md text-[clamp(1.125rem,1rem+0.55vw,1.5rem)] leading-snug text-copy">{closingHero.body}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/signup">Join for free</Button>
              <Button href="/talent" variant="outline">
                Browse talent <span aria-hidden>&rarr;</span>
              </Button>
            </div>

            <ul aria-label="Popular roles" className="mt-10 flex max-w-xl flex-wrap gap-2">
              {popular.map((id) => (
                <li key={id}>
                  <Link
                    href={`/talent?role=${id}`}
                    className="inline-flex h-9 items-center rounded-pill border border-foreground/15 bg-background px-3.5 text-small text-copy transition-colors hover:border-foreground/50 hover:text-foreground"
                  >
                    {roleLabel(id)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/talent"
                  className="inline-flex h-9 items-center px-2 font-display text-small font-medium text-primary hover:text-foreground"
                >
                  and more <span aria-hidden className="ml-1">&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="group relative aspect-[4/3] overflow-hidden rounded-panel bg-placeholder shadow-[0_24px_48px_-24px_rgb(20_23_31/0.35)] lg:aspect-[5/4]">
            <Image
              src="/about/about2.jpg"
              alt="Five members of the team laughing together for a group photo"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-1 overflow-hidden rounded-panel border border-border bg-background sm:grid-cols-3">
          {closingHero.stats.map((s, i) => (
            <div key={s.label} className={`px-4 py-8 text-center md:py-10 ${i > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""}`}>
              <dd className="font-display text-[clamp(2rem,1.4rem+2vw,3.25rem)] leading-none tracking-[-0.03em]">{s.value}</dd>
              <dt className="mt-3 text-body text-muted">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
