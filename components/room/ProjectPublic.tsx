"use client";

import Link from "next/link";
import { publicShowcase } from "@/lib/room";
import { authLinks } from "@/lib/auth-links";
import { useRoom } from "./useRoom";
import { Avatar } from "./Primitives";
import { PieceCard } from "./Showcase";

// The project's public page: what someone thinking of joining sees first.
// The showcase is the proof: work the team has chosen to show as it goes.
// Wrapped in a div so the site's scroll reveals (which run before this
// browser-stored content exists) leave it alone.
export function ProjectPublic({ slug }: { slug: string }) {
  const { room } = useRoom(slug);
  if (!room) return <div aria-busy="true" className="shell min-h-[70vh] py-16" />;
  const pieces = publicShowcase(room);
  return (
    <div>
      <section className="shell pb-12 pt-14 sm:pt-20">
        <p className="eyebrow !text-primary-light">{room.format} · in production</p>
        <h1 className="mt-4 font-display text-hero font-semibold">{room.title}</h1>
        <p className="mt-5 max-w-2xl text-lead text-copy">{room.logline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={authLinks.signUp} className="inline-flex h-12 items-center rounded-pill bg-primary px-6 font-display font-semibold text-white transition-colors hover:bg-foreground hover:text-background">Ask to join</Link>
          <Link href={`/projects/${room.slug}/room`} className="inline-flex h-12 items-center rounded-pill border border-copy px-6 font-display font-semibold text-copy transition-colors hover:bg-surface">Open the production room</Link>
        </div>
      </section>

      <section aria-labelledby="work-title" className="shell py-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="work-title" className="font-display text-heading font-semibold">The work so far</h2>
          <p className="text-small text-muted">{pieces.length} {pieces.length === 1 ? "piece" : "pieces"} shared by the team</p>
        </div>
        {pieces.length ? (
          <ul role="list" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pieces.map((p) => <li key={p.id}><PieceCard room={room} piece={p} /></li>)}
          </ul>
        ) : (
          <p className="mt-6 rounded-card border border-dashed border-border p-10 text-center text-muted">Nothing shared yet. The team will show work here as the project comes together.</p>
        )}
      </section>

      <section aria-labelledby="team-title" className="shell py-12 pb-24">
        <h2 id="team-title" className="font-display text-heading font-semibold">The team</h2>
        <ul role="list" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {room.members.map((m) => (
            <li key={m.id} className="flex items-center gap-3 rounded-card border border-border p-4">
              <Avatar name={m.name} className="size-11 text-[13px]" />
              <span>
                <span className="block font-medium">{m.name}</span>
                <span className="block text-small text-muted">{m.role}{m.id === room.ownerId ? ", project owner" : ""}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
