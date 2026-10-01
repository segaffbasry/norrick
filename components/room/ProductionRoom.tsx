"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRoom } from "./useRoom";
import { AssetsTab, Toast } from "./AssetsTab";
import { TasksTab } from "./TasksTab";
import { AddToShowcase, ShowcaseTab } from "./Showcase";
import { Avatar } from "./Primitives";

export type RoomTab = "assets" | "tasks" | "showcase";
const tabs: { id: RoomTab; label: string }[] = [
  { id: "assets", label: "Assets" },
  { id: "tasks", label: "Tasks" },
  { id: "showcase", label: "Showcase" },
];

export function ProductionRoom({ slug, initialTab, initialFolder }: { slug: string; initialTab: RoomTab; initialFolder: string | null }) {
  const { room, viewerId, dispatch, setViewer, reset } = useRoom(slug);
  const [tab, setTab] = useState<RoomTab>(initialTab);
  const [folderId, setFolderId] = useState<string | null>(initialFolder);
  const [showcasing, setShowcasing] = useState<{ assetId?: string } | null>(null);
  const [notice, setNotice] = useState("");

  // Keep the tab and folder in the address, so a link or a refresh lands on the same place.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    if (tab === "assets" && folderId) url.searchParams.set("folder", folderId);
    else url.searchParams.delete("folder");
    window.history.replaceState(window.history.state, "", url);
  }, [tab, folderId]);

  if (!room) return <RoomSkeleton />;

  const viewer = room.members.find((m) => m.id === viewerId);
  const owner = room.members.find((m) => m.id === room.ownerId);
  // A folder deleted elsewhere (another tab) falls back to the top level.
  const folder = folderId && room.folders.some((f) => f.id === folderId) ? folderId : null;

  return (
    <div>
      <section className="shell pb-8 pt-12 sm:pt-16">
        <p className="eyebrow !text-primary-light">Production room · {room.format}</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="font-display text-title font-semibold">{room.title}</h1>
            <p className="mt-3 text-copy">{room.logline}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex -space-x-2" aria-label={`${room.members.length} members`}>
              {room.members.map((m) => (
                <span key={m.id} title={`${m.name}, ${m.role}${m.id === room.ownerId ? " (owner)" : ""}`}>
                  <Avatar name={m.name} className="size-9 text-[12px]" />
                </span>
              ))}
            </div>
            {/* No sign-in behind the room yet: this picks whose eyes you're seeing it through. */}
            <label className="flex min-w-0 items-center gap-2 text-small text-muted">
              <span>Viewing as</span>
              <select
                value={viewerId}
                onChange={(e) => setViewer(e.target.value)}
                className="h-9 max-w-44 truncate rounded-pill border border-border bg-surface px-3 text-small text-foreground [color-scheme:dark] focus:border-primary focus:outline-none"
                aria-label="Viewing as"
              >
                {room.members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}{m.id === room.ownerId ? " (owner)" : ""}
                  </option>
                ))}
              </select>
            </label>
            <Link href={`/projects/${room.slug}`} className="text-small font-medium text-copy underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-copy">
              Public page
            </Link>
          </div>
        </div>
      </section>

      <div className="sticky top-20 z-40 border-y border-border bg-background/95 backdrop-blur">
        <div className="shell flex h-16 items-center">
          <div role="tablist" aria-label="Production room" className="-ml-3 flex h-full items-stretch">
            {tabs.map((t) => (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={tab === t.id}
                aria-controls={`panel-${t.id}`}
                tabIndex={tab === t.id ? 0 : -1}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                  const i = tabs.findIndex((x) => x.id === tab);
                  const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
                  setTab(next.id);
                  document.getElementById(`tab-${next.id}`)?.focus();
                }}
                className={`relative px-3 font-display text-body font-semibold transition-colors sm:px-4 ${tab === t.id ? "text-foreground" : "text-muted hover:text-foreground"}`}
              >
                {t.label}
                {t.id === "showcase" && room.showcase.length > 0 && <span className="ml-1.5 text-small font-normal text-muted">{room.showcase.length}</span>}
                <span aria-hidden className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary transition-opacity sm:inset-x-4 ${tab === t.id ? "opacity-100" : "opacity-0"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <section id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="shell pb-24 pt-8">
        {tab === "assets" && <AssetsTab room={room} viewerId={viewerId} dispatch={dispatch} folderId={folder} openFolder={setFolderId} onShowcase={(assetId) => setShowcasing({ assetId })} />}
        {tab === "tasks" && <TasksTab room={room} dispatch={dispatch} />}
        {tab === "showcase" && <ShowcaseTab room={room} viewerId={viewerId} dispatch={dispatch} onAdd={() => setShowcasing({})} />}
      </section>

      <aside className="shell pb-16">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-6 text-small text-muted">
          Example room. Changes are saved in this browser only{viewer ? `; you're viewing as ${viewer.name}` : ""}{owner ? `, and ${owner.name.split(" ")[0]} owns the project` : ""}.
          <button type="button" onClick={() => { reset(); setFolderId(null); }} className="underline underline-offset-4 hover:text-foreground">Start over</button>
        </p>
      </aside>

      {showcasing && (
        <AddToShowcase
          room={room}
          viewerId={viewerId}
          initialAssetId={showcasing.assetId}
          dispatch={dispatch}
          onClose={() => setShowcasing(null)}
          onAdded={() => {
            setShowcasing(null);
            setNotice("Added to the showcase and the public page");
          }}
        />
      )}
      {notice && <Toast text={notice} onDone={() => setNotice("")} />}
      <p role="status" aria-live="polite" className="sr-only">{notice}</p>
    </div>
  );
}

function RoomSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading the room" className="shell pb-24 pt-16">
      <div className="h-4 w-40 rounded-full bg-surface" />
      <div className="mt-5 h-10 w-80 max-w-full rounded-full bg-surface" />
      <div className="mt-4 h-4 w-[32rem] max-w-full rounded-full bg-surface" />
      <div className="mt-14 h-96 rounded-panel bg-surface/60" />
    </div>
  );
}
