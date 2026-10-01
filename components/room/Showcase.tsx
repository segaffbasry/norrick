"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { assetKind, CAPTION_MAX, linkHost, normalizeLink, type Asset, type Room, type RoomAction, type ShowcasePiece } from "@/lib/room";
import { newId } from "./useRoom";
import { Avatar, field, Modal, primaryPill, quietPill } from "./Primitives";
import { Eye, KindIcon, Plus, Star, UploadIcon } from "./RoomIcons";

// One piece of work as a tile: the room's showcase tab and the public page share it.
export function PieceCard({ room, piece, children }: { room: Room; piece: ShowcasePiece; children?: React.ReactNode }) {
  const member = room.members.find((m) => m.id === piece.memberId);
  const kind = piece.source.type === "link" ? "link" : piece.source.kind;
  const label = piece.source.type === "link" ? linkHost(piece.source.url) : piece.source.name;
  const tile = (
    <span className="relative grid aspect-[16/10] place-items-center overflow-hidden rounded-[12px] bg-[radial-gradient(120%_90%_at_20%_0%,#2a1b55_0%,#16131c_55%,#0b0a0d_100%)] text-[#c4b0ff]">
      <KindIcon kind={kind} className="size-9" />
      <span className="absolute inset-x-3 bottom-3 truncate text-left text-[12px] text-muted">{label}</span>
    </span>
  );
  return (
    <article className={`grid gap-3 rounded-card border border-border bg-surface/50 p-3 ${piece.featured ? "" : "opacity-60"}`}>
      {piece.source.type === "link" ? (
        <a href={piece.source.url} target="_blank" rel="noopener noreferrer nofollow" aria-label={`${piece.caption}, opens ${label}`} className="block rounded-[12px] transition-opacity hover:opacity-85">{tile}</a>
      ) : tile}
      <div className="grid gap-2 px-1 pb-1">
        <p className="font-medium leading-snug">{piece.caption}</p>
        <p className="flex items-center gap-2 text-small text-muted">
          {member && <Avatar name={member.name} className="size-6 text-[10px] ring-0" />}
          {member ? `${member.name}, ${member.role.toLowerCase()}` : "Former member"}
        </p>
        {children}
      </div>
    </article>
  );
}

export function ShowcaseTab({ room, viewerId, dispatch, onAdd }: { room: Room; viewerId: string; dispatch: (a: RoomAction) => boolean; onAdd: () => void }) {
  const isOwner = viewerId === room.ownerId;
  const pieces = [...room.showcase].sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  const live = pieces.filter((p) => p.featured).length;
  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <h2 className="font-display text-heading font-semibold">Showcase</h2>
          <p className="mt-1 text-copy">
            Work from the room, shown on the project&apos;s public page so people thinking of joining can see what you&apos;re making. {live} {live === 1 ? "piece is" : "pieces are"} live.
          </p>
          {isOwner && <p className="mt-2 text-small text-muted">As the project owner you can take any piece down from the public page, and put it back up.</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/projects/${room.slug}`} className={quietPill}><Eye /> View public page</Link>
          <button type="button" onClick={onAdd} className={primaryPill}><Plus /> Add to showcase</button>
        </div>
      </div>

      {pieces.length === 0 ? (
        <p className="rounded-card border border-dashed border-border p-10 text-center text-muted">Nothing showcased yet. Add a file you made or paste a link to your work.</p>
      ) : (
        <ul role="list" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pieces.map((p) => (
            <li key={p.id}>
              <PieceCard room={room} piece={p}>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[12px] font-medium ${p.featured ? "bg-primary-soft text-[#c4b0ff]" : "bg-border text-muted"}`}>
                    <Star filled={p.featured} className="size-3.5" /> {p.featured ? "On the public page" : "Taken down"}
                  </span>
                  <span className="ml-auto flex gap-1">
                    {isOwner && (
                      <button type="button" onClick={() => dispatch({ type: "showcase/feature", id: p.id, featured: !p.featured, by: viewerId })} className="rounded-pill px-3 py-1.5 text-small text-copy hover:bg-background">
                        {p.featured ? "Take down" : "Put back up"}
                      </button>
                    )}
                    {(isOwner || p.memberId === viewerId) && (
                      <button type="button" onClick={() => dispatch({ type: "showcase/remove", id: p.id, by: viewerId })} className="rounded-pill px-3 py-1.5 text-small text-muted hover:bg-background hover:text-[#ff8a8a]">
                        Remove
                      </button>
                    )}
                  </span>
                </div>
              </PieceCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Add to showcase: pick one of your own files (or upload one), or paste a
// link, then a one-line caption.
export function AddToShowcase({ room, viewerId, initialAssetId, dispatch, onClose, onAdded }: { room: Room; viewerId: string; initialAssetId?: string; dispatch: (a: RoomAction) => boolean; onClose: () => void; onAdded: () => void }) {
  const mine = room.assets.filter((a) => a.addedBy === viewerId);
  const [mode, setMode] = useState<"file" | "link">(initialAssetId || mine.length ? "file" : "link");
  const [assetId, setAssetId] = useState(initialAssetId ?? "");
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [touched, setTouched] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const link = normalizeLink(url);
  const ready = caption.trim() && (mode === "file" ? !!assetId : !!link);

  const submit = () => {
    setTouched(true);
    if (!ready) return;
    const source = mode === "file" ? { type: "asset" as const, assetId, name: "", kind: "other" as const } : { type: "link" as const, url: link! };
    if (dispatch({ type: "showcase/add", piece: { id: newId("s"), memberId: viewerId, caption, source, featured: true, addedAt: new Date().toISOString() } })) onAdded();
  };

  return (
    <Modal title="Add to showcase" onClose={onClose} wide>
      <form
        noValidate
        className="grid gap-5 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div role="radiogroup" aria-label="What to show" className="grid grid-cols-2 gap-1 rounded-pill bg-surface p-1">
          {(["file", "link"] as const).map((m) => (
            <button key={m} type="button" role="radio" aria-checked={mode === m} onClick={() => setMode(m)} className={`h-10 rounded-pill text-small font-semibold transition-colors ${mode === m ? "bg-foreground text-background" : "text-muted hover:text-foreground"}`}>
              {m === "file" ? "One of my files" : "Paste a link"}
            </button>
          ))}
        </div>

        {mode === "file" ? (
          <fieldset className="grid gap-2">
            <legend className="mb-2 text-small font-medium text-copy">Your files in this room</legend>
            {mine.length === 0 && <p className="text-small text-muted">You haven&apos;t added any files yet. Upload one below.</p>}
            <div data-lenis-prevent className="grid max-h-64 gap-1 overflow-y-auto">
              {mine.map((a: Asset) => (
                <label key={a.id} className={`flex items-center gap-3 rounded-[12px] border px-3 py-2.5 ${assetId === a.id ? "border-primary bg-primary-soft" : "border-border hover:bg-surface"}`}>
                  <input type="radio" name="asset" checked={assetId === a.id} onChange={() => setAssetId(a.id)} className="accent-primary" />
                  <KindIcon kind={a.kind} className="size-4 text-muted" />
                  <span className="truncate">{a.name}</span>
                </label>
              ))}
            </div>
            <button type="button" onClick={() => fileInput.current?.click()} className={`${quietPill} mt-1 justify-self-start`}><UploadIcon className="size-4" /> Upload a new file</button>
            <input
              ref={fileInput}
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                const id = newId("a");
                dispatch({ type: "asset/add", assets: [{ id, name: file.name, kind: assetKind(file.name, file.type), size: file.size, folderId: null, addedBy: viewerId, addedAt: new Date().toISOString() }] });
                setAssetId(id);
              }}
            />
            {touched && !assetId && <p className="text-small text-[#ff8a8a]">Choose a file to show.</p>}
          </fieldset>
        ) : (
          <label className="grid gap-2">
            <span className="text-small font-medium text-copy">Link to your work</span>
            <input type="text" inputMode="url" autoComplete="url" autoFocus value={url} onChange={(e) => setUrl(e.target.value)} placeholder="vimeo.com/… or your portfolio" className={field} aria-invalid={touched && !link} />
            {touched && !link && <span className="text-small text-[#ff8a8a]">Paste a full web address, like vimeo.com/123456.</span>}
          </label>
        )}

        <label className="grid gap-2">
          <span className="flex justify-between text-small font-medium text-copy">
            Caption <span className="font-normal tabular-nums text-muted">{caption.length}/{CAPTION_MAX}</span>
          </span>
          <input value={caption} maxLength={CAPTION_MAX} onChange={(e) => setCaption(e.target.value.replace(/[\r\n]/g, ""))} placeholder="One line about this piece" className={field} aria-invalid={touched && !caption.trim()} />
          {touched && !caption.trim() && <span className="text-small text-[#ff8a8a]">Add a one-line caption.</span>}
        </label>

        <p className="text-small text-muted">It goes on the project&apos;s public page straight away. The project owner can take it down at any time.</p>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className={quietPill}>Cancel</button>
          <button type="submit" className={primaryPill}>Add to showcase</button>
        </div>
      </form>
    </Modal>
  );
}
