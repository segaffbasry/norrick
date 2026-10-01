"use client";

import { useRef, useState, type DragEvent } from "react";
import { assetKind, canMoveFolder, folderContents, folderPath, formatSize, type Asset, type Folder, type Room, type RoomAction } from "@/lib/room";
import { newId } from "./useRoom";
import { field, Menu, Modal, primaryPill, quietPill } from "./Primitives";
import { ChevronRight, FolderIcon, FolderPlus, Grip, KindIcon, UploadIcon } from "./RoomIcons";

type Item = { kind: "asset" | "folder"; id: string };
const DRAG_TYPE = "application/x-norrick-item";

interface Props {
  room: Room;
  viewerId: string;
  dispatch: (action: RoomAction) => boolean;
  folderId: string | null;
  openFolder: (id: string | null) => void;
  onShowcase: (assetId: string) => void;
}

// Assets: folders inside folders to any depth. Every member can make folders,
// drag assets (or whole folders) into them, and upload straight into the
// folder they are looking at. The breadcrumb leads back up in one click and
// each step of it is also a place to drop things.
export function AssetsTab({ room, viewerId, dispatch, folderId, openFolder, onShowcase }: Props) {
  const [naming, setNaming] = useState(false);
  const [renaming, setRenaming] = useState<Item | null>(null);
  const [moving, setMoving] = useState<Item | null>(null);
  const [deleting, setDeleting] = useState<Item | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [dragging, setDragging] = useState<Item | null>(null);
  const [notice, setNotice] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const uploadTo = useRef<string | null>(null);

  const path = folderPath(room.folders, folderId);
  const here = path.at(-1);
  const folders = room.folders.filter((f) => f.parentId === folderId).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  const assets = room.assets.filter((a) => a.folderId === folderId).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  const memberName = (id: string) => room.members.find((m) => m.id === id)?.name.split(" ")[0] ?? "Someone";
  const folderName = (id: string | null) => (id ? room.folders.find((f) => f.id === id)?.name ?? "folder" : "All assets");
  const say = (text: string) => {
    setNotice("");
    requestAnimationFrame(() => setNotice(text));
  };

  const upload = (files: FileList | File[], to: string | null) => {
    const list = [...files];
    if (!list.length) return;
    const at = new Date().toISOString();
    const added: Asset[] = list.map((file) => ({ id: newId("a"), name: file.name, kind: assetKind(file.name, file.type), size: file.size, folderId: to, addedBy: viewerId, addedAt: at }));
    dispatch({ type: "asset/add", assets: added });
    say(`${list.length === 1 ? list[0].name : `${list.length} files`} added to ${folderName(to)}`);
  };

  const move = (item: Item, to: string | null) => {
    if (item.kind === "asset") {
      const asset = room.assets.find((a) => a.id === item.id);
      if (!asset || asset.folderId === to) return;
      dispatch({ type: "asset/move", ids: [item.id], to });
      say(`Moved ${asset.name} to ${folderName(to)}`);
    } else {
      if (item.id === to) return;
      if (!canMoveFolder(room.folders, item.id, to)) return say("A folder can't go inside itself");
      if (dispatch({ type: "folder/move", id: item.id, to })) say(`Moved ${folderName(item.id)} to ${folderName(to)}`);
    }
  };

  // Drop handling shared by folder rows, breadcrumb steps and the list itself.
  const dropProps = (target: string | null, key: string) => ({
    onDragOver: (e: DragEvent) => {
      const types = [...e.dataTransfer.types];
      if (!types.includes(DRAG_TYPE) && !types.includes("Files")) return;
      if (dragging?.kind === "folder" && !canMoveFolder(room.folders, dragging.id, target)) return;
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = types.includes("Files") ? "copy" : "move";
      setDropTarget(key);
    },
    onDragLeave: (e: DragEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropTarget((k) => (k === key ? null : k));
    },
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDropTarget(null);
      setDragging(null);
      if (e.dataTransfer.files.length) return upload(e.dataTransfer.files, target);
      try {
        move(JSON.parse(e.dataTransfer.getData(DRAG_TYPE)) as Item, target);
      } catch {}
    },
  });

  const dragProps = (item: Item) => ({
    draggable: true,
    onDragStart: (e: DragEvent) => {
      e.dataTransfer.setData(DRAG_TYPE, JSON.stringify(item));
      e.dataTransfer.effectAllowed = "move";
      setDragging(item);
    },
    onDragEnd: () => {
      setDragging(null);
      setDropTarget(null);
    },
  });

  const chooseFiles = (to: string | null) => {
    uploadTo.current = to;
    fileInput.current?.click();
  };

  return (
    <div className="grid gap-5">
      {/* Breadcrumb: the whole path, every level one click (and one drop) away. */}
      {path.length > 0 && <nav aria-label="Folder path" className="-mx-2 flex min-w-0 flex-wrap items-center gap-0.5 text-small">
        {[{ id: null as string | null, name: "All assets" }, ...path].map((step, i, all) => {
          const current = i === all.length - 1;
          const key = `crumb:${step.id ?? "root"}`;
          return (
            <span key={key} className="flex min-w-0 items-center gap-0.5">
              {i > 0 && <ChevronRight className="size-4 shrink-0 text-muted" />}
              <button
                type="button"
                aria-current={current ? "location" : undefined}
                onClick={() => openFolder(step.id)}
                {...dropProps(step.id, key)}
                className={`max-w-56 truncate rounded-pill px-2.5 py-1.5 transition-colors ${current ? "font-semibold text-foreground" : "text-muted hover:bg-surface hover:text-foreground"} ${dropTarget === key ? "bg-primary text-white" : ""}`}
              >
                {step.name}
              </button>
            </span>
          );
        })}
      </nav>}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-heading font-semibold">{here?.name ?? "All assets"}</h2>
          <p className="text-small text-muted">
            {folders.length} {folders.length === 1 ? "folder" : "folders"}, {assets.length} {assets.length === 1 ? "file" : "files"}
            {here ? ` · made by ${memberName(here.createdBy)}` : " · everyone in the room can organise these"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setNaming(true)} className={quietPill}>
            <FolderPlus className="size-4" /> New folder
          </button>
          <button type="button" onClick={() => chooseFiles(folderId)} className={primaryPill}>
            <UploadIcon className="size-4" /> {folderId ? "Upload here" : "Upload"}
          </button>
          <input
            ref={fileInput}
            type="file"
            multiple
            hidden
            onChange={(e) => {
              if (e.target.files) upload(e.target.files, uploadTo.current);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      <div
        {...dropProps(folderId, "list")}
        className={`overflow-hidden rounded-card border transition-colors ${dropTarget === "list" ? "border-primary bg-primary-soft/40" : "border-border"}`}
      >
        <ul role="list">
          {naming && (
            <li className="border-b border-border p-3">
              <NameForm
                label="Folder name"
                placeholder="Name this folder"
                submit="Create"
                onCancel={() => setNaming(false)}
                onSubmit={(name) => {
                  dispatch({ type: "folder/create", id: newId("f"), name, parentId: folderId, by: viewerId, at: new Date().toISOString() });
                  setNaming(false);
                  say(`Folder ${name} created`);
                }}
              />
            </li>
          )}

          {folders.map((f) => {
            const key = `folder:${f.id}`;
            const { folders: sub, assets: files } = folderContents(room, f.id);
            const item: Item = { kind: "folder", id: f.id };
            return (
              <li key={f.id} {...dropProps(f.id, key)} className={`group border-b border-border last:border-b-0 transition-colors ${dropTarget === key ? "bg-primary-soft" : "hover:bg-surface"} ${dragging?.id === f.id ? "opacity-40" : ""}`}>
                {renaming?.id === f.id ? (
                  <div className="p-3">
                    <NameForm label="Folder name" initial={f.name} submit="Save" onCancel={() => setRenaming(null)} onSubmit={(name) => { dispatch({ type: "folder/rename", id: f.id, name }); setRenaming(null); }} />
                  </div>
                ) : (
                  <div className="flex items-center gap-1 pr-2" {...dragProps(item)}>
                    <span className="hidden cursor-grab pl-2 text-muted opacity-0 group-hover:opacity-100 sm:block" aria-hidden><Grip /></span>
                    <button type="button" onClick={() => openFolder(f.id)} className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3.5 text-left">
                      <span className={`grid size-10 shrink-0 place-items-center rounded-[10px] ${dropTarget === key ? "bg-primary text-white" : "bg-primary-soft text-[#c4b0ff]"}`}><FolderIcon /></span>
                      <span className="min-w-0">
                        <span className="block truncate font-medium">{f.name}</span>
                        <span className="block text-small text-muted">
                          {sub + files === 0 ? "Empty" : [sub && `${sub} ${sub === 1 ? "folder" : "folders"}`, files && `${files} ${files === 1 ? "file" : "files"}`].filter(Boolean).join(", ")}
                        </span>
                      </span>
                    </button>
                    <button type="button" onClick={() => chooseFiles(f.id)} className="hidden rounded-pill px-3 py-2 text-small text-muted hover:bg-background hover:text-foreground md:block">
                      Upload here
                    </button>
                    <Menu
                      label={`More for ${f.name}`}
                      items={[
                        { label: "Open", onSelect: () => openFolder(f.id) },
                        { label: "Upload here", onSelect: () => chooseFiles(f.id) },
                        { label: "Rename", onSelect: () => setRenaming(item) },
                        { label: "Move to…", onSelect: () => setMoving(item) },
                        { label: "Delete folder", danger: true, onSelect: () => setDeleting(item) },
                      ]}
                    />
                  </div>
                )}
              </li>
            );
          })}

          {assets.map((a) => {
            const item: Item = { kind: "asset", id: a.id };
            const mine = a.addedBy === viewerId;
            const shown = room.showcase.some((p) => p.source.type === "asset" && p.source.assetId === a.id);
            return (
              <li key={a.id} className={`group border-b border-border last:border-b-0 hover:bg-surface ${dragging?.id === a.id ? "opacity-40" : ""}`}>
                {renaming?.id === a.id ? (
                  <div className="p-3">
                    <NameForm label="File name" initial={a.name} submit="Save" onCancel={() => setRenaming(null)} onSubmit={(name) => { dispatch({ type: "asset/rename", id: a.id, name }); setRenaming(null); }} />
                  </div>
                ) : (
                  <div className="flex items-center gap-1 pr-2" {...dragProps(item)}>
                    <span className="hidden cursor-grab pl-2 text-muted opacity-0 group-hover:opacity-100 sm:block" aria-hidden><Grip /></span>
                    <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3.5">
                      <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-tile text-muted"><KindIcon kind={a.kind} /></span>
                      <span className="min-w-0">
                        <span className="block truncate">{a.name}</span>
                        <span className="block text-small text-muted">
                          {formatSize(a.size)} · {mine ? "added by you" : `added by ${memberName(a.addedBy)}`}
                          {shown && <span className="ml-2 rounded-tag bg-primary-soft px-1.5 py-0.5 text-[11px] font-medium text-[#c4b0ff]">In showcase</span>}
                        </span>
                      </span>
                    </div>
                    {mine && !shown && (
                      <button type="button" onClick={() => onShowcase(a.id)} className="hidden rounded-pill px-3 py-2 text-small text-muted hover:bg-background hover:text-foreground md:block">
                        Add to showcase
                      </button>
                    )}
                    <Menu
                      label={`More for ${a.name}`}
                      items={[
                        { label: "Add to showcase", hidden: !mine || shown, onSelect: () => onShowcase(a.id) },
                        { label: "Rename", onSelect: () => setRenaming(item) },
                        { label: "Move to…", onSelect: () => setMoving(item) },
                        { label: "Delete file", danger: true, onSelect: () => setDeleting(item) },
                      ]}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {!naming && folders.length + assets.length === 0 && (
          <div className="grid place-items-center gap-3 px-6 py-16 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-surface text-muted"><FolderIcon className="size-6" /></span>
            <p className="font-medium">{here ? `${here.name} is empty` : "No assets yet"}</p>
            <p className="max-w-sm text-small text-muted">Drop files here, upload, or make a folder inside it. You can also drag files in from any other folder.</p>
          </div>
        )}
      </div>

      <p className="text-small text-muted">Tip: drag a file onto a folder or onto any step of the path above to move it there. Drop files from your computer to upload them.</p>
      <p role="status" aria-live="polite" className="sr-only">{notice}</p>

      {notice && <Toast text={notice} onDone={() => setNotice("")} />}

      {moving && (
        <MoveDialog
          room={room}
          item={moving}
          onClose={() => setMoving(null)}
          onMove={(to) => {
            move(moving, to);
            setMoving(null);
          }}
        />
      )}

      {deleting && (
        <ConfirmDelete
          room={room}
          item={deleting}
          onClose={() => setDeleting(null)}
          onConfirm={() => {
            if (deleting.kind === "folder") dispatch({ type: "folder/delete", id: deleting.id });
            else dispatch({ type: "asset/delete", id: deleting.id });
            setDeleting(null);
          }}
        />
      )}
    </div>
  );
}

function NameForm({ label, placeholder, initial = "", submit, onSubmit, onCancel }: { label: string; placeholder?: string; initial?: string; submit: string; onSubmit: (name: string) => void; onCancel: () => void }) {
  const [value, setValue] = useState(initial);
  return (
    <form
      className="flex flex-wrap items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) onSubmit(value.trim());
      }}
    >
      <label className="min-w-0 flex-1">
        <span className="sr-only">{label}</span>
        <input autoFocus value={value} maxLength={80} placeholder={placeholder} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => e.key === "Escape" && (e.stopPropagation(), onCancel())} onFocus={(e) => e.target.select()} className={field} />
      </label>
      <button type="submit" disabled={!value.trim()} className={primaryPill}>{submit}</button>
      <button type="button" onClick={onCancel} className={quietPill}>Cancel</button>
    </form>
  );
}

function MoveDialog({ room, item, onClose, onMove }: { room: Room; item: Item; onClose: () => void; onMove: (to: string | null) => void }) {
  const currentParent = item.kind === "asset" ? room.assets.find((a) => a.id === item.id)?.folderId ?? null : room.folders.find((f) => f.id === item.id)?.parentId ?? null;
  const [choice, setChoice] = useState<string | null>(currentParent);
  const name = item.kind === "asset" ? room.assets.find((a) => a.id === item.id)?.name : room.folders.find((f) => f.id === item.id)?.name;

  const rows: { folder: Folder | null; depth: number }[] = [{ folder: null, depth: 0 }];
  const walk = (parentId: string | null, depth: number) => {
    room.folders
      .filter((f) => f.parentId === parentId)
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
      .forEach((f) => {
        rows.push({ folder: f, depth });
        walk(f.id, depth + 1);
      });
  };
  walk(null, 1);

  return (
    <Modal title={`Move ${name ?? ""}`} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onMove(choice);
        }}
      >
        <fieldset className="grid gap-0.5 p-3">
          <legend className="sr-only">Choose a folder</legend>
          {rows.map(({ folder, depth }) => {
            const id = folder?.id ?? null;
            const blocked = item.kind === "folder" && !canMoveFolder(room.folders, item.id, id);
            return (
              <label key={id ?? "root"} style={{ paddingLeft: 12 + depth * 18 }} className={`flex items-center gap-3 rounded-[10px] py-2.5 pr-3 ${blocked ? "opacity-40" : "hover:bg-surface"} ${choice === id ? "bg-primary-soft" : ""}`}>
                <input type="radio" name="target" disabled={blocked} checked={choice === id} onChange={() => setChoice(id)} className="accent-primary" />
                <FolderIcon className="size-4 text-muted" />
                <span className="truncate">{folder?.name ?? "All assets"}</span>
                {id === currentParent && <span className="ml-auto text-small text-muted">Here now</span>}
              </label>
            );
          })}
        </fieldset>
        <div className="sticky bottom-0 flex justify-end gap-2 border-t border-border bg-background px-6 py-4">
          <button type="button" onClick={onClose} className={quietPill}>Cancel</button>
          <button type="submit" disabled={choice === currentParent} className={primaryPill}>Move here</button>
        </div>
      </form>
    </Modal>
  );
}

function ConfirmDelete({ room, item, onClose, onConfirm }: { room: Room; item: Item; onClose: () => void; onConfirm: () => void }) {
  const folder = item.kind === "folder" ? room.folders.find((f) => f.id === item.id) : null;
  const asset = item.kind === "asset" ? room.assets.find((a) => a.id === item.id) : null;
  const inside = folder ? folderContents(room, folder.id) : null;
  return (
    <Modal title={folder ? "Delete folder?" : "Delete file?"} onClose={onClose}>
      <div className="grid gap-6 p-6">
        <p className="text-copy">
          {folder
            ? inside && inside.folders + inside.assets > 0
              ? `${folder.name} and everything in it (${inside.folders} ${inside.folders === 1 ? "folder" : "folders"}, ${inside.assets} ${inside.assets === 1 ? "file" : "files"}) will be removed for the whole team.`
              : `${folder.name} is empty and will be removed.`
            : `${asset?.name} will be removed for the whole team.`}
        </p>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className={quietPill}>Cancel</button>
          <button type="button" onClick={onConfirm} className={`${primaryPill} !bg-[#d93b3b] hover:!bg-[#ff5c5c] hover:!text-white`}>Delete</button>
        </div>
      </div>
    </Modal>
  );
}

export function Toast({ text, onDone }: { text: string; onDone: () => void }) {
  return (
    <div
      aria-hidden
      onAnimationEnd={onDone}
      className="pointer-events-none fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-pill border border-border bg-surface px-5 py-3 text-small shadow-[0_16px_40px_-12px_rgb(0_0_0/0.8)] animate-[toast_2.6s_ease_forwards]"
    >
      {text}
    </div>
  );
}
