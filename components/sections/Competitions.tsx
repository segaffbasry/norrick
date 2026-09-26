import Image from "next/image";
import Link from "next/link";
import { competitions, competitionsSection } from "@/lib/competitions";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { LogoMark } from "@/components/ui/Logo";

// Homepage competitions (Contra "challenge" layout): a heading line, one big
// featured card (cover plus details), the stages, more competitions, and a
// "hiring" banner. Cover art comes from umdb.org.
function Cta({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-display text-body font-medium text-foreground">
      <span aria-hidden className="grid size-6 place-items-center rounded-tag bg-primary text-white">
        <LogoMark className="w-3.5" />
      </span>
      {label}
      <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">&rarr;</span>
    </span>
  );
}

export function Competitions() {
  const [featured, ...others] = competitions;
  const href = `/competitions/${featured.slug}`;
  const { hiring } = competitionsSection;

  return (
    <section id="competitions" className="section-y">
      <div className="shell">
        <h2 className="text-heading">Join the {featured.title} competition</h2>
        <p className="text-small text-muted">
          {featured.tagline}{" "}
          <Link href={href} className="text-foreground underline underline-offset-2 hover:text-primary">
            Learn more.
          </Link>
        </p>

        {/* One big featured card: cover on the left, the details on the right */}
        <Link
          href={href}
          className="group mt-6 grid overflow-hidden rounded-card bg-tile card-hover lg:grid-cols-[1.3fr_1fr]"
        >
          <span className="relative block aspect-[4/3] bg-placeholder lg:aspect-auto lg:min-h-[30rem]">
            <Image
              src={featured.cover.src}
              alt={featured.cover.alt}
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
            />
          </span>
          <span className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
            <span>
              <Badge tone="soft">{featured.status}</Badge>
              <span className="mt-5 block font-display text-[clamp(2rem,1.2rem+2.6vw,3.75rem)] leading-[1.02] tracking-[-0.035em]">
                {featured.title}
              </span>
              <span className="mt-3 block max-w-md text-lead text-copy">{featured.summary}</span>
            </span>

            <span className="grid grid-cols-2 gap-4 border-t border-border pt-6">
              {featured.stats.map((s) => (
                <span key={s.label} className="block">
                  <span className="block font-display text-[clamp(1.75rem,1.2rem+1.6vw,2.75rem)] font-medium leading-none tracking-[-0.03em]">{s.value}</span>
                  <span className="mt-2 block text-small text-muted">{s.label}</span>
                </span>
              ))}
            </span>

            <Cta label={featured.cta} />
          </span>
        </Link>

        {/* The stages */}
        {featured.stages && (
          <ol aria-label="The seven stages" className="mt-4 flex flex-wrap gap-2">
            {featured.stages.map((stage, i) => (
              <li key={stage} className="flex items-center gap-2 rounded-pill bg-surface py-1.5 pl-2 pr-3.5 text-small text-copy">
                <span className="grid size-5 place-items-center rounded-pill bg-background font-display text-[0.6875rem] font-semibold text-primary">
                  {i + 1}
                </span>
                {stage}
              </li>
            ))}
          </ol>
        )}

        {/* More competitions */}
        <div className="mb-6 mt-12 flex items-end justify-between gap-4 md:mt-16">
          <h3 className="text-heading">{competitionsSection.moreTitle}</h3>
          <Button href="/competitions" variant="ghost" className="text-small">
            {competitionsSection.viewAll}
          </Button>
        </div>
        <ul data-stagger className="grid gap-4 md:grid-cols-2">
          {others.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/competitions/${c.slug}`}
                className="group flex h-full overflow-hidden rounded-card border border-border bg-background card-hover"
              >
                <span className="relative block w-[38%] shrink-0 bg-placeholder">
                  <Image src={c.cover.src} alt={c.cover.alt} fill sizes="(min-width: 768px) 20vw, 38vw" className="object-cover" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                  <Badge tone="soft" className="self-start">
                    {c.status}
                  </Badge>
                  <span className="mt-3 text-lead font-medium leading-tight">{c.title}</span>
                  <span className="mt-1.5 line-clamp-2 text-small text-muted">{c.summary}</span>
                  <span className="mt-auto pt-3 font-display text-small font-medium text-primary">
                    {c.cta} <span aria-hidden>&rarr;</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Hiring banner */}
        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-panel bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <div className="flex items-center gap-4">
              <h3 className="text-[clamp(1.375rem,1rem+1.2vw,2rem)] leading-tight tracking-[-0.02em]">{hiring.title}</h3>
              <span aria-hidden className="hidden -space-x-2 sm:flex">
                {[0, 1, 2].map((n) => (
                  <ImagePlaceholder key={n} glyph={false} className="size-9 rounded-pill border-2 border-surface" />
                ))}
              </span>
            </div>
            <p className="mt-1 text-body text-muted">{hiring.body}</p>
          </div>
          <Button href={hiring.href} className="!border-ink !bg-ink hover:!border-foreground hover:!bg-foreground">
            {hiring.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
