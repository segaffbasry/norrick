"use client";

import Image from "next/image";
import { useState } from "react";
import { howItWorks, type Competition, type Script, type Winner } from "@/lib/competitions";
import { Faq } from "@/components/ui/Faq";
import { LogoMark } from "@/components/ui/Logo";

// Tabs under the cover (Contra: Trending / Recent / Social / Guidelines):
// Overview (an update post with the key facts), then Winners, Scripts and Stages
// when the competition has them, then Rules and FAQ.
type TabId = "overview" | "winners" | "scripts" | "stages" | "rules" | "faq";

export function CompetitionTabs({ competition: c }: { competition: Competition }) {
  const tabs: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    ...(c.winners ? [{ id: "winners" as const, label: "Winners" }] : []),
    ...(c.scripts ? [{ id: "scripts" as const, label: "Scripts" }] : []),
    ...(c.stages ? [{ id: "stages" as const, label: "Stages" }] : []),
    { id: "rules", label: "Rules" },
    ...(c.faq ? [{ id: "faq" as const, label: "FAQ" }] : []),
  ];
  const [active, setActive] = useState<TabId>("overview");

  return (
    <div className="mt-6">
      <div role="tablist" aria-label="Competition details" className="flex overflow-x-auto border-b border-border [scrollbar-width:none]">
        {tabs.map((t) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              id={`comp-tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`comp-panel-${t.id}`}
              onClick={() => setActive(t.id)}
              className={`-mb-px flex-none whitespace-nowrap border-b-2 px-5 py-4 font-display text-body font-medium transition-colors sm:px-8 ${
                selected ? "border-foreground text-foreground" : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div id={`comp-panel-${active}`} role="tabpanel" aria-labelledby={`comp-tab-${active}`} className="pt-6">
        {active === "overview" && (
          <article className="rounded-card border border-border p-5 sm:p-6">
            <header className="flex items-center gap-3">
              <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-pill bg-primary text-white">
                <LogoMark className="w-5" />
              </span>
              <p className="font-display text-body font-medium">
                Norrick <span className="font-normal text-muted">&middot; Team</span>
              </p>
            </header>

            <div className="mt-5 space-y-4 text-body text-copy">
              {c.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {c.timeline && (
              <dl className="mt-6 divide-y divide-border rounded-card border border-border">
                {c.timeline.map((t) => (
                  <div key={t.label} className="grid gap-1 px-4 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-4 sm:px-5">
                    <dt className="text-small text-muted">{t.label}</dt>
                    <dd className="text-body font-medium text-foreground">{t.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {c.prizes && (
              <div className="mt-6">
                <h3 className="text-lead font-medium">Prize breakdown</h3>
                <ul className="mt-3 divide-y divide-border rounded-card border border-border">
                  {c.prizes.map((p) => (
                    <li key={p.rank} className="grid gap-1 px-4 py-3.5 sm:grid-cols-[11rem_6rem_1fr] sm:items-baseline sm:gap-4 sm:px-5">
                      <span className="text-small text-muted">{p.rank}</span>
                      <span className="font-display text-lead font-medium">{p.cash}</span>
                      <span className="text-body text-copy">{p.extras}</span>
                    </li>
                  ))}
                </ul>
                {c.prizeNote && <p className="mt-2 text-small text-muted">{c.prizeNote}</p>}
              </div>
            )}

            {c.eligibility && (
              <div className="mt-6">
                <h3 className="text-lead font-medium">Who can participate</h3>
                <p className="mt-2 text-body text-copy">{c.eligibility.text}</p>
                {c.eligibility.categories && (
                  <ul aria-label="Categories" className="mt-3 flex flex-wrap gap-2">
                    {c.eligibility.categories.map((cat) => (
                      <li key={cat} className="rounded-pill border border-border px-3 py-1 text-small text-copy">
                        {cat}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-lead font-medium">How it works</h3>
              <ol className="mt-3 grid gap-3 sm:grid-cols-2">
                {howItWorks.map((step, i) => (
                  <li key={step.title} className="rounded-card bg-surface p-4">
                    <span className="grid size-7 place-items-center rounded-pill bg-background font-display text-small font-semibold text-primary-light">
                      {i + 1}
                    </span>
                    <p className="mt-3 font-display text-body font-medium">{step.title}</p>
                    <p className="mt-1 text-small text-muted">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              <li className="rounded-pill bg-surface px-3.5 py-2 text-body text-copy">
                <span className="text-muted">#</span> {c.hashtag}
              </li>
              <li className="rounded-pill bg-surface px-3.5 py-2 text-body text-copy">Norrick</li>
            </ul>

            {c.video && (
              <figure className="mt-6">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={c.video.poster}
                  className="aspect-video w-full rounded-card bg-placeholder object-cover"
                >
                  <source src={c.video.src} type="video/mp4" />
                </video>
                <figcaption className="mt-2 text-small text-muted">{c.video.caption}</figcaption>
              </figure>
            )}
          </article>
        )}

        {active === "winners" && c.winners && (
          <ol className="grid gap-4 sm:grid-cols-2">
            {c.winners.map((w, i) => (
              <WinnerCard key={w.name} winner={w} featured={i === 0} />
            ))}
          </ol>
        )}

        {active === "scripts" && c.scripts && (
          <div className="space-y-4">
            {c.scripts.map((sc) => (
              <ScriptCard key={sc.title} script={sc} />
            ))}
          </div>
        )}

        {active === "stages" && c.stages && (
          <ol className="divide-y divide-border rounded-card border border-border">
            {c.stages.map((stage, i) => (
              <li key={stage} className="flex items-center gap-4 px-5 py-4 sm:px-6">
                <span className="grid size-9 shrink-0 place-items-center rounded-pill bg-primary-soft font-display text-small font-semibold text-foreground">
                  {i + 1}
                </span>
                <span className="font-display text-lead">{stage}</span>
              </li>
            ))}
          </ol>
        )}

        {active === "rules" && (
          <ul className="list-disc space-y-3 rounded-card border border-border py-6 pl-10 pr-6 text-lead text-copy marker:text-muted">
            {c.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        )}

        {active === "faq" && c.faq && <Faq items={c.faq} />}
      </div>
    </div>
  );
}


// First place spans the full row with the portrait beside the text; the others
// sit side by side beneath it.
function WinnerCard({ winner: w, featured }: { winner: Winner; featured: boolean }) {
  return (
    <li
      className={`card-hover overflow-hidden rounded-card border border-border ${
        featured ? "grid sm:col-span-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]" : "flex flex-col"
      }`}
    >
      <div className={`relative bg-placeholder ${featured ? "aspect-[4/3] sm:aspect-auto sm:min-h-[22rem]" : "aspect-[4/5]"}`}>
        <Image
          src={w.image.src}
          alt={w.image.alt}
          fill
          sizes={featured ? "(min-width: 640px) 26rem, 100vw" : "(min-width: 640px) 22rem, 100vw"}
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-col p-5 sm:p-6">
        <p className="eyebrow !text-primary-light">{w.place}</p>
        <h3 className={`mt-2 leading-tight tracking-[-0.02em] ${featured ? "text-title" : "text-[1.5rem]"}`}>{w.name}</h3>
        {(w.prize || w.location) && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {[w.prize, w.location].filter(Boolean).map((tag) => (
              <li key={tag} className="rounded-pill bg-surface px-3 py-1.5 text-small text-copy">
                {tag}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-body text-copy">{w.blurb}</p>
      </div>
    </li>
  );
}

function ScriptCard({ script: sc }: { script: Script }) {
  return (
    <article className="rounded-card border border-border p-5 sm:p-6">
      <p className="eyebrow !text-primary-light">{sc.category}</p>
      <h3 className="mt-2 text-[1.5rem] leading-tight tracking-[-0.02em]">{sc.title}</h3>
      <p className="mt-3 rounded-card bg-surface px-4 py-3 text-small text-copy">{sc.note}</p>
      <div className="mt-5 space-y-1.5 text-body text-copy">
        {sc.lines.map((line, i) =>
          line.startsWith("(") ? (
            <p key={i} className="pt-2 text-small italic text-muted">
              {line}
            </p>
          ) : (
            <p key={i}>{line}</p>
          ),
        )}
      </div>
    </article>
  );
}
