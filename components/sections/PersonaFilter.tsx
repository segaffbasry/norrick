"use client";

import { useRef, useState } from "react";
import { jobs, talents, trending, type Talent, type JobPost } from "@/lib/data";
import { CategoryChips, type Category } from "@/components/ui/CategoryChips";
import { TalentGrid } from "@/components/sections/TalentGrid";
import { JobCard } from "@/components/ui/JobCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type View = "talents" | "jobs";

const views: { id: View; label: string }[] = [
  { id: "talents", label: "Talents" },
  { id: "jobs", label: "Job posts" },
];

// Section 2 of the homepage: trending row, Talents / Job posts toggle, category
// chips, then the matching grid. Modelled on the Contra projects feed, with
// The Hub's card style for job posts. The persona list doubles as the category
// filter, which is why this lives in PersonaFilter.tsx.
export function PersonaFilter() {
  const [view, setView] = useState<View>("talents");
  const [category, setCategory] = useState<Category>("all");

  const visibleTalents = category === "all" ? talents : talents.filter((t) => t.roles.includes(category));
  const visibleJobs = category === "all" ? jobs : jobs.filter((j) => j.roles.includes(category));

  return (
    <section id="discover" className="section-y">
      <TrendingRow />

      <div className="shell mt-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          {/* Segmented track: Talents | Job posts */}
          <div
            role="tablist"
            aria-label="Browse"
            className="inline-flex shrink-0 gap-1 self-start rounded-pill bg-surface p-1"
          >
            {views.map((v) => {
              const selected = v.id === view;
              return (
                <button
                  key={v.id}
                  role="tab"
                  id={`discover-tab-${v.id}`}
                  aria-selected={selected}
                  aria-controls="discover-panel"
                  onClick={() => setView(v.id)}
                  className={`h-11 rounded-pill px-6 font-display text-lead font-medium transition-colors ${
                    selected
                      ? "bg-background text-foreground shadow-float"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>

          <CategoryChips value={category} onChange={setCategory} />
        </div>

        <div
          id="discover-panel"
          role="tabpanel"
          aria-labelledby={`discover-tab-${view}`}
          className="mt-10"
        >
          {view === "talents" ? (
            <TalentsPanel items={visibleTalents} />
          ) : (
            <JobsPanel items={visibleJobs} />
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Trending topics: horizontal row of dark image cards ---------- */

function TrendingRow() {
  const track = useRef<HTMLUListElement>(null);
  const scroll = () =>
    track.current?.scrollBy({ left: track.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div>
      <div className="shell mb-4 flex items-center justify-between">
        <h2 className="eyebrow">Trending topics</h2>
        <Button href="#work" variant="ghost" className="text-body">
          View community
        </Button>
      </div>

      <div className="relative">
        <ul
          ref={track}
          className="flex snap-x scroll-px-4 gap-4 overflow-x-auto scroll-smooth px-4 pb-2 sm:scroll-px-9 sm:px-9 [scrollbar-width:none]"
        >
          {trending.map((t) => (
            <li key={t.id} className="snap-start">
              <Card
                as="article"
                variant="flat"
                className="relative flex h-[13.75rem] w-[min(82vw,26.5rem)] flex-col justify-between overflow-hidden !bg-tile p-5"
              >
                <div className="relative">
                  <h3 className="flex items-center gap-2 text-lead font-medium">
                    <span className="text-muted">#</span>
                    {t.title}
                    <span aria-hidden className="ml-auto text-muted">
                      &rarr;
                    </span>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-body text-copy">{t.body}</p>
                </div>
                <div className="relative flex items-end justify-between">
                  <dl className="flex gap-4">
                    {t.stats.map((s) => (
                      <div key={s.label}>
                        <dt className="sr-only">{s.label}</dt>
                        <dd className="font-display text-body font-medium">{s.value}</dd>
                        <span aria-hidden className="text-small text-muted">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </dl>
                  <div aria-hidden className="flex -space-x-2">
                    {[0, 1, 2].map((n) => (
                      <span key={n} className="size-8 rounded-pill border-2 border-tile bg-placeholder" />
                    ))}
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={scroll}
          aria-label="Scroll trending topics"
          className="absolute right-4 top-1/2 hidden size-10 -translate-y-1/2 place-items-center rounded-pill bg-background text-foreground shadow-float transition-colors hover:bg-surface sm:grid"
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
}

/* ---------- Talents: tight edge-to-edge tiles, stats over the media ------- */

function SectionHead({
  title,
  body,
  verified,
  moreHref = "#",
}: {
  title: string;
  body: string;
  verified?: boolean;
  moreHref?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h3 className="flex items-center gap-2 text-heading">
          {verified && (
            <svg viewBox="0 0 24 24" className="size-6 text-primary" fill="currentColor" aria-hidden>
              <path d="M12 2l2.4 1.7 2.9-.2 1.1 2.7 2.5 1.5-.6 2.9 1.1 2.7-2 2.1-.4 2.9-2.9.7L12 22l-2.4-1.7-2.9.2-1.1-2.7L3 16.3l.6-2.9L2.5 10.7l2-2.1.4-2.9 2.9-.7L12 2zm-1.1 12.6l4.6-4.6-1.1-1.1-3.5 3.5-1.7-1.7-1.1 1.1 2.8 2.8z" />
            </svg>
          )}
          {title}
        </h3>
        <p className="text-body text-muted">{body}</p>
      </div>
      <Button href={moreHref} variant="ghost" className="shrink-0 text-body">
        View more
      </Button>
    </div>
  );
}

function Empty({ what }: { what: string }) {
  return <p className="rounded-card bg-surface p-8 text-center text-body text-muted">No {what} in this category yet.</p>;
}

function TalentsPanel({ items }: { items: Talent[] }) {
  return (
    <>
      <SectionHead verified moreHref="/talent" title="Verified talent" body="Hand-picked filmmakers, actors, animators and crew trusted to show up and finish." />
      {items.length === 0 ? (
        <Empty what="talent" />
      ) : (
        <TalentGrid items={items.slice(0, 6)} />
      )}
    </>
  );
}

/* ---------- Job posts: The Hub style cards on a soft panel ---------------- */

function JobsPanel({ items }: { items: JobPost[] }) {
  return (
    <>
      <SectionHead moreHref="/jobs" title="Latest job posts" body="Productions hiring now. Apply directly, no cold job board." />
      {items.length === 0 ? (
        <Empty what="job posts" />
      ) : (
        <ul className="grid gap-4 rounded-card bg-surface p-4 sm:p-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((j) => (
            <li key={j.id}>
              <JobCard job={j} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
