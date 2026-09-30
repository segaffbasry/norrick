import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { competitionSlugs, getCompetition } from "@/lib/competitions";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CompetitionTabs } from "@/components/sections/CompetitionTabs";
import { authLinks } from "@/lib/auth-links";

export function generateStaticParams() {
  return competitionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/competitions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompetition(slug);
  return c ? { title: `${c.title} | Norrick`, description: c.summary } : {};
}

const perks = [
  "Meet creatives who share your craft",
  "Meet collaborators and productions, and get discovered",
  "Creating a profile is free, and so is hiring",
];

// Competition page (Contra "challenge" layout): the cover art, the title with
// headline numbers and a join button, tabs, and a sidebar with a sign-up card, a
// link to all competitions, and the judges.
export default async function CompetitionPage({ params }: PageProps<"/competitions/[slug]">) {
  const { slug } = await params;
  const c = getCompetition(slug);
  if (!c) notFound();

  return (
    <main id="main-content">
      <div className="shell py-8 md:py-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10">
          {/* Main column */}
          <div className="min-w-0">
            <section>
              <Image
                src={c.cover.src}
                alt={c.cover.alt}
                width={c.cover.width}
                height={c.cover.height}
                sizes="(min-width: 1024px) 45rem, 100vw"
                priority
                className="h-auto w-full rounded-card border border-border"
              />

              <div className="mt-6">
                <Badge tone="soft">{c.status}</Badge>
                <h1 className="mt-3 text-[clamp(2rem,1.2rem+3vw,3.25rem)] leading-[1.04] tracking-[-0.035em]">{c.title}</h1>
                <p className="mt-2 max-w-xl text-lead text-copy">{c.tagline}</p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">

                  <Button href={authLinks.signUp} className="sm:self-stretch !h-auto min-h-12 !border-foreground !bg-foreground !text-background px-8 hover:!border-primary hover:!bg-primary hover:!text-primary-foreground">
                    {c.cta}
                  </Button>
                </div>
              </div>
            </section>

            <CompetitionTabs competition={c} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-panel border border-border p-6">
              <h2 className="text-[1.75rem] leading-tight tracking-[-0.02em]">Where ideas become real</h2>
              <ul className="mt-5 space-y-4">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-body text-copy">
                    <Check className="mt-1 size-4 shrink-0 text-primary-light" />
                    {perk}
                  </li>
                ))}
              </ul>
              <Button href={authLinks.signUp} className="mt-6 w-full">
                Sign up to join
              </Button>
            </div>

            <Link
              href="/competitions"
              className="group flex items-center justify-between rounded-card bg-surface px-5 py-4 font-display text-lead font-medium"
            >
              View all competitions
              <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">&rarr;</span>
            </Link>

            <section aria-labelledby="judges" className="px-1 pt-2">
              <h2 id="judges" className="eyebrow">
                Judges
              </h2>
              {c.judges ? (
                <ul className="mt-4 space-y-5">
                  {c.judges.map((j, i) => (
                    <li key={i}>
                      <div className="flex items-center gap-3 font-display text-body font-medium">
                        <ImagePlaceholder glyph={false} className="size-8 shrink-0 rounded-pill" />
                        {j.name}
                      </div>
                      <p className="mt-1 text-body text-muted">{j.role}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-body text-muted">{c.votedNote}</p>
              )}
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
