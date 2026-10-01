// Production Room: the shared workspace a team uses to make one project.
// Everything here is pure data and logic (no React, no imports), so the tests
// in tests/room.test.mjs can run it directly with node --test.
//
// Three areas, from the user feedback in Malcolm's Production Room brief:
// - Assets: folders nested to any depth, assets moved into them, breadcrumbs.
// - Tasks: start/finish dates and a colour per task, subtasks nested to any
//   depth, progress that follows ticked subtasks, a month calendar of bars.
// - Showcase: members put their own work on the project's public page; the
//   owner can take any piece down or put it back up.

export interface Member {
  id: string;
  name: string;
  role: string;
}

export interface Folder {
  id: string;
  name: string;
  /** null = the top level of the Assets tab */
  parentId: string | null;
  createdBy: string;
  createdAt: string;
}

export type AssetKind = "image" | "video" | "audio" | "document" | "other";

export interface Asset {
  id: string;
  name: string;
  kind: AssetKind;
  size: number;
  folderId: string | null;
  addedBy: string;
  addedAt: string;
}

export interface Task {
  id: string;
  /** null = a top-level task with its own dates and colour */
  parentId: string | null;
  title: string;
  /** Only read for tasks with no subtasks; a parent's state comes from its subtasks. */
  done: boolean;
  /** Top-level tasks only: YYYY-MM-DD, inclusive. */
  start?: string;
  end?: string;
  color?: TaskColorId;
  createdAt: string;
}

export type ShowcaseSource =
  | { type: "asset"; assetId: string; name: string; kind: AssetKind }
  | { type: "link"; url: string };

export interface ShowcasePiece {
  id: string;
  memberId: string;
  caption: string;
  source: ShowcaseSource;
  /** Shown on the public project page. The owner can switch this off and on. */
  featured: boolean;
  addedAt: string;
}

export interface Room {
  slug: string;
  title: string;
  logline: string;
  format: string;
  ownerId: string;
  members: Member[];
  folders: Folder[];
  assets: Asset[];
  tasks: Task[];
  showcase: ShowcasePiece[];
}

/* -------------------------------------------------------------------------- */
/* Task colours                                                                */
/* -------------------------------------------------------------------------- */

// A fixed palette so colours stay distinct from one another on the calendar.
// Light enough on the dark page that a bar can visibly darken as work lands.
export const taskColors = [
  { id: "violet", label: "Violet", hex: "#b197ff" },
  { id: "sky", label: "Sky", hex: "#74bdff" },
  { id: "mint", label: "Mint", hex: "#5fd8b8" },
  { id: "lime", label: "Lime", hex: "#bde36b" },
  { id: "sun", label: "Sun", hex: "#ffd36e" },
  { id: "coral", label: "Coral", hex: "#ff9474" },
  { id: "rose", label: "Rose", hex: "#ff85b0" },
  { id: "sand", label: "Sand", hex: "#dcc6a4" },
] as const;

export type TaskColorId = (typeof taskColors)[number]["id"];

export function colorHex(id: TaskColorId | undefined): string {
  return (taskColors.find((c) => c.id === id) ?? taskColors[0]).hex;
}

/** Mix a colour toward black: 0% done is the palette colour, 100% done is 60% darker. */
export function shadeForProgress(hex: string, ratio: number): string {
  const amount = Math.min(1, Math.max(0, ratio)) * 0.6;
  const n = parseInt(hex.slice(1), 16);
  const channel = (shift: number) => Math.round(((n >> shift) & 255) * (1 - amount));
  return "#" + [16, 8, 0].map((s) => channel(s).toString(16).padStart(2, "0")).join("");
}

/** Dark or white label text, whichever reads better on the bar. */
export function inkOn(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const lin = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const l = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return l > 0.2 ? "#0b0a0d" : "#ffffff";
}

/* -------------------------------------------------------------------------- */
/* Dates (YYYY-MM-DD strings, compared as text, computed in UTC)               */
/* -------------------------------------------------------------------------- */

export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

export function daysBetween(a: string, b: string): number {
  const ms = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((ms(b) - ms(a)) / 86_400_000);
}

export function isISODate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && addDays(value, 0) === value;
}

/** The weeks (Monday first) that cover a month, as 7 ISO dates each. */
export function monthWeeks(year: number, month: number): string[][] {
  const first = new Date(Date.UTC(year, month, 1));
  const offset = (first.getUTCDay() + 6) % 7;
  const start = addDays(first.toISOString().slice(0, 10), -offset);
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const weeks = Math.ceil((offset + daysInMonth) / 7);
  return Array.from({ length: weeks }, (_, w) => Array.from({ length: 7 }, (_, d) => addDays(start, w * 7 + d)));
}

/* -------------------------------------------------------------------------- */
/* Folders                                                                     */
/* -------------------------------------------------------------------------- */

/** Root first, the folder itself last. Empty for the top level. */
export function folderPath(folders: Folder[], id: string | null): Folder[] {
  const byId = new Map(folders.map((f) => [f.id, f]));
  const path: Folder[] = [];
  const seen = new Set<string>();
  let current = id ? byId.get(id) : undefined;
  while (current && !seen.has(current.id)) {
    seen.add(current.id);
    path.unshift(current);
    current = current.parentId ? byId.get(current.parentId) : undefined;
  }
  return path;
}

/** The folder and every folder inside it, at any depth. */
export function folderSubtree(folders: Folder[], id: string): Set<string> {
  const ids = new Set([id]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const f of folders) {
      if (f.parentId && ids.has(f.parentId) && !ids.has(f.id)) {
        ids.add(f.id);
        grew = true;
      }
    }
  }
  return ids;
}

/** How much a folder holds, counting everything nested inside it. */
export function folderContents(room: Pick<Room, "folders" | "assets">, id: string) {
  const ids = folderSubtree(room.folders, id);
  return {
    folders: ids.size - 1,
    assets: room.assets.filter((a) => a.folderId && ids.has(a.folderId)).length,
  };
}

export function canMoveFolder(folders: Folder[], id: string, targetId: string | null): boolean {
  if (targetId === null) return true;
  return !folderSubtree(folders, id).has(targetId);
}

/** "Storyboards" → "Storyboards 2" when the name is taken at that level. */
export function uniqueName(taken: string[], wanted: string): string {
  const names = new Set(taken.map((n) => n.toLowerCase()));
  if (!names.has(wanted.toLowerCase())) return wanted;
  let i = 2;
  while (names.has(`${wanted} ${i}`.toLowerCase())) i++;
  return `${wanted} ${i}`;
}

export function assetKind(name: string, mime = ""): AssetKind {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (mime.startsWith("image/") || ["jpg", "jpeg", "png", "gif", "webp", "heic", "psd", "tif", "tiff", "exr"].includes(ext)) return "image";
  if (mime.startsWith("video/") || ["mp4", "mov", "m4v", "webm", "mxf", "avi", "prores"].includes(ext)) return "video";
  if (mime.startsWith("audio/") || ["wav", "mp3", "aif", "aiff", "flac", "m4a", "ogg"].includes(ext)) return "audio";
  if (["pdf", "doc", "docx", "txt", "fdx", "fountain", "md", "rtf", "pages", "xls", "xlsx", "csv", "key", "ppt", "pptx"].includes(ext)) return "document";
  return "other";
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value < 10 ? value.toFixed(1) : Math.round(value)} ${units[i]}`;
}

/* -------------------------------------------------------------------------- */
/* Tasks                                                                       */
/* -------------------------------------------------------------------------- */

export function subtasksOf(tasks: Task[], id: string | null): Task[] {
  return tasks.filter((t) => t.parentId === id);
}

/** The task and every subtask under it, at any depth. */
export function taskSubtree(tasks: Task[], id: string): Set<string> {
  const ids = new Set([id]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const t of tasks) {
      if (t.parentId && ids.has(t.parentId) && !ids.has(t.id)) {
        ids.add(t.id);
        grew = true;
      }
    }
  }
  return ids;
}

/** The top-level task a subtask belongs to. */
export function rootTask(tasks: Task[], id: string): Task | undefined {
  const byId = new Map(tasks.map((t) => [t.id, t]));
  let current = byId.get(id);
  const seen = new Set<string>();
  while (current?.parentId && !seen.has(current.id)) {
    seen.add(current.id);
    current = byId.get(current.parentId);
  }
  return current;
}

// Progress counts the smallest pieces of work: every subtask that has no
// subtasks of its own. "3 of 8 done" means 3 of those 8 are ticked, however
// deep they sit. A task with no subtasks is one piece: done or not.
export function taskProgress(tasks: Task[], id: string): { done: number; total: number; ratio: number } {
  const ids = taskSubtree(tasks, id);
  const hasChildren = new Set(tasks.filter((t) => t.parentId && ids.has(t.parentId)).map((t) => t.parentId as string));
  let done = 0;
  let total = 0;
  for (const t of tasks) {
    if (!ids.has(t.id) || hasChildren.has(t.id)) continue;
    total++;
    if (t.done) done++;
  }
  return { done, total, ratio: total ? done / total : 0 };
}

export function isTaskComplete(tasks: Task[], id: string): boolean {
  const { done, total } = taskProgress(tasks, id);
  return total > 0 && done === total;
}

/* -------------------------------------------------------------------------- */
/* Calendar                                                                    */
/* -------------------------------------------------------------------------- */

export interface WeekBar {
  task: Task;
  /** 0 = Monday */
  col: number;
  span: number;
  lane: number;
  /** The task started before this week / carries on after it. */
  fromBefore: boolean;
  toAfter: boolean;
}

// Lays the scheduled tasks out across one week. Tasks that share a day go in
// separate lanes, so every bar is always visible: the week's bar area is split
// between however many lanes that week needs.
export function layoutWeek(tasks: Task[], week: string[]): { bars: WeekBar[]; lanes: number } {
  const first = week[0];
  const last = week[week.length - 1];
  const scheduled = tasks
    .filter((t) => t.parentId === null && isISODate(t.start) && isISODate(t.end) && t.start! <= last && t.end! >= first)
    .sort((a, b) => (a.start! < b.start! ? -1 : a.start! > b.start! ? 1 : daysBetween(b.start!, b.end!) - daysBetween(a.start!, a.end!) || a.createdAt.localeCompare(b.createdAt)));

  const laneEnds: number[] = [];
  const bars: WeekBar[] = scheduled.map((task) => {
    const col = task.start! < first ? 0 : daysBetween(first, task.start!);
    const endCol = task.end! > last ? week.length - 1 : daysBetween(first, task.end!);
    let lane = laneEnds.findIndex((end) => end < col);
    if (lane === -1) lane = laneEnds.length;
    laneEnds[lane] = endCol;
    return { task, col, span: endCol - col + 1, lane, fromBefore: task.start! < first, toAfter: task.end! > last };
  });
  return { bars, lanes: laneEnds.length };
}

/* -------------------------------------------------------------------------- */
/* Showcase                                                                    */
/* -------------------------------------------------------------------------- */

/** Accepts http(s) links only, adding https:// when someone pastes "vimeo.com/…". */
export function normalizeLink(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(withScheme);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (!url.hostname.includes(".") || url.username || url.password) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function linkHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export const CAPTION_MAX = 120;

/** What potential collaborators see: featured pieces, newest first. */
export function publicShowcase(room: Pick<Room, "showcase">): ShowcasePiece[] {
  return room.showcase.filter((p) => p.featured).sort((a, b) => b.addedAt.localeCompare(a.addedAt));
}

/* -------------------------------------------------------------------------- */
/* Changes                                                                     */
/* -------------------------------------------------------------------------- */

export type RoomAction =
  | { type: "folder/create"; id: string; name: string; parentId: string | null; by: string; at: string }
  | { type: "folder/rename"; id: string; name: string }
  | { type: "folder/delete"; id: string }
  | { type: "folder/move"; id: string; to: string | null }
  | { type: "asset/add"; assets: Asset[] }
  | { type: "asset/rename"; id: string; name: string }
  | { type: "asset/move"; ids: string[]; to: string | null }
  | { type: "asset/delete"; id: string }
  | { type: "task/create"; task: Task }
  | { type: "task/update"; id: string; patch: Partial<Pick<Task, "title" | "start" | "end" | "color">> }
  | { type: "task/toggle"; id: string }
  | { type: "task/delete"; id: string }
  | { type: "showcase/add"; piece: ShowcasePiece }
  | { type: "showcase/feature"; id: string; featured: boolean; by: string }
  | { type: "showcase/remove"; id: string; by: string };

const clean = (name: string) => name.replace(/\s+/g, " ").trim().slice(0, 80);

export function roomReducer(room: Room, action: RoomAction): Room {
  switch (action.type) {
    case "folder/create": {
      // Anyone in the room can make folders: it is shared organisation.
      const name = clean(action.name);
      if (!name || !room.members.some((m) => m.id === action.by)) return room;
      if (action.parentId && !room.folders.some((f) => f.id === action.parentId)) return room;
      const siblings = room.folders.filter((f) => f.parentId === action.parentId).map((f) => f.name);
      const folder: Folder = { id: action.id, name: uniqueName(siblings, name), parentId: action.parentId, createdBy: action.by, createdAt: action.at };
      return { ...room, folders: [...room.folders, folder] };
    }
    case "folder/rename": {
      const name = clean(action.name);
      const folder = room.folders.find((f) => f.id === action.id);
      if (!name || !folder || folder.name === name) return room;
      const siblings = room.folders.filter((f) => f.parentId === folder.parentId && f.id !== folder.id).map((f) => f.name);
      return { ...room, folders: room.folders.map((f) => (f.id === action.id ? { ...f, name: uniqueName(siblings, name) } : f)) };
    }
    case "folder/delete": {
      const ids = folderSubtree(room.folders, action.id);
      return { ...room, folders: room.folders.filter((f) => !ids.has(f.id)), assets: room.assets.filter((a) => !a.folderId || !ids.has(a.folderId)) };
    }
    case "folder/move": {
      const folder = room.folders.find((f) => f.id === action.id);
      if (!folder || folder.parentId === action.to || !canMoveFolder(room.folders, action.id, action.to)) return room;
      if (action.to && !room.folders.some((f) => f.id === action.to)) return room;
      const siblings = room.folders.filter((f) => f.parentId === action.to).map((f) => f.name);
      return { ...room, folders: room.folders.map((f) => (f.id === action.id ? { ...f, parentId: action.to, name: uniqueName(siblings, f.name) } : f)) };
    }
    case "asset/add": {
      const valid = action.assets.filter((a) => !a.folderId || room.folders.some((f) => f.id === a.folderId));
      return valid.length ? { ...room, assets: [...room.assets, ...valid] } : room;
    }
    case "asset/rename": {
      const name = clean(action.name);
      if (!name) return room;
      return { ...room, assets: room.assets.map((a) => (a.id === action.id ? { ...a, name } : a)) };
    }
    case "asset/move": {
      if (action.to && !room.folders.some((f) => f.id === action.to)) return room;
      const ids = new Set(action.ids);
      return { ...room, assets: room.assets.map((a) => (ids.has(a.id) ? { ...a, folderId: action.to } : a)) };
    }
    case "asset/delete":
      return { ...room, assets: room.assets.filter((a) => a.id !== action.id) };

    case "task/create": {
      const t = action.task;
      const title = clean(t.title);
      if (!title) return room;
      if (t.parentId === null) {
        if (!isISODate(t.start) || !isISODate(t.end) || t.end < t.start) return room;
        if (!taskColors.some((c) => c.id === t.color)) return room;
      } else if (!room.tasks.some((x) => x.id === t.parentId)) return room;
      const task: Task = t.parentId === null ? { ...t, title } : { id: t.id, parentId: t.parentId, title, done: false, createdAt: t.createdAt };
      return { ...room, tasks: [...room.tasks, task] };
    }
    case "task/update": {
      const task = room.tasks.find((t) => t.id === action.id);
      if (!task) return room;
      const next = { ...task };
      if (action.patch.title !== undefined) {
        const title = clean(action.patch.title);
        if (title) next.title = title;
      }
      if (task.parentId === null) {
        if (isISODate(action.patch.start)) next.start = action.patch.start;
        if (isISODate(action.patch.end)) next.end = action.patch.end;
        // Keep the range valid whichever end moved.
        if (next.start && next.end && next.end < next.start) {
          if (action.patch.start !== undefined) next.end = next.start;
          else next.start = next.end;
        }
        if (action.patch.color && taskColors.some((c) => c.id === action.patch.color)) next.color = action.patch.color;
      }
      return { ...room, tasks: room.tasks.map((t) => (t.id === action.id ? next : t)) };
    }
    case "task/toggle": {
      // Ticking a task with subtasks ticks everything under it (or unticks it all
      // when it was already complete). Its own progress then follows.
      const ids = taskSubtree(room.tasks, action.id);
      if (!room.tasks.some((t) => t.id === action.id)) return room;
      const next = !isTaskComplete(room.tasks, action.id);
      return { ...room, tasks: room.tasks.map((t) => (ids.has(t.id) ? { ...t, done: next } : t)) };
    }
    case "task/delete": {
      const ids = taskSubtree(room.tasks, action.id);
      return { ...room, tasks: room.tasks.filter((t) => !ids.has(t.id)) };
    }

    case "showcase/add": {
      const p = action.piece;
      const caption = p.caption.replace(/\s+/g, " ").trim().slice(0, CAPTION_MAX);
      if (!caption || !room.members.some((m) => m.id === p.memberId)) return room;
      if (p.source.type === "link") {
        const url = normalizeLink(p.source.url);
        if (!url) return room;
        return { ...room, showcase: [...room.showcase, { ...p, caption, featured: true, source: { type: "link", url } }] };
      }
      // Members showcase their own contributions.
      const assetId = p.source.assetId;
      const asset = room.assets.find((a) => a.id === assetId);
      if (!asset || asset.addedBy !== p.memberId) return room;
      return { ...room, showcase: [...room.showcase, { ...p, caption, featured: true, source: { type: "asset", assetId: asset.id, name: asset.name, kind: asset.kind } }] };
    }
    case "showcase/feature":
      if (action.by !== room.ownerId) return room;
      return { ...room, showcase: room.showcase.map((p) => (p.id === action.id ? { ...p, featured: action.featured } : p)) };
    case "showcase/remove": {
      const piece = room.showcase.find((p) => p.id === action.id);
      if (!piece || (piece.memberId !== action.by && action.by !== room.ownerId)) return room;
      return { ...room, showcase: room.showcase.filter((p) => p.id !== action.id) };
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Example room                                                                */
/* -------------------------------------------------------------------------- */

// A worked example so the room opens with something in it. Dates are set
// around the day it is first opened, so the calendar always has work on it.
export function exampleRoom(today: string): Room {
  const at = `${today}T09:00:00.000Z`;
  const d = (n: number) => addDays(today, n);
  const members: Member[] = [
    { id: "m-ava", name: "Ava Mensah", role: "Director" },
    { id: "m-jun", name: "Jun Park", role: "Editor" },
    { id: "m-lena", name: "Lena Ruiz", role: "Concept artist" },
    { id: "m-theo", name: "Theo Grant", role: "Sound designer" },
  ];
  const folder = (id: string, name: string, parentId: string | null, by: string): Folder => ({ id, name, parentId, createdBy: by, createdAt: at });
  const asset = (id: string, name: string, folderId: string | null, by: string, size: number): Asset => ({ id, name, kind: assetKind(name), size, folderId, addedBy: by, addedAt: at });
  const task = (id: string, parentId: string | null, title: string, done = false, extra: Partial<Task> = {}): Task => ({ id, parentId, title, done, createdAt: at, ...extra });

  return {
    slug: "last-bus-home",
    title: "Last Bus Home",
    logline: "Two strangers miss the last bus out of town and walk the long way home. A 12 minute short, shooting this month.",
    format: "Short film",
    ownerId: "m-ava",
    members,
    folders: [
      folder("f-script", "Script", null, "m-ava"),
      folder("f-boards", "Storyboards", null, "m-lena"),
      folder("f-act1", "Act 1", "f-boards", "m-lena"),
      folder("f-sc3", "Scene 3: Bus stop", "f-act1", "m-lena"),
      folder("f-act2", "Act 2", "f-boards", "m-lena"),
      folder("f-mood", "Mood board", null, "m-lena"),
      folder("f-sound", "Sound", null, "m-theo"),
    ],
    assets: [
      asset("a-draft", "Last Bus Home, draft 4.pdf", "f-script", "m-ava", 412_000),
      asset("a-notes", "Table read notes.docx", "f-script", "m-ava", 48_000),
      asset("a-sc3-1", "Sc3 frame 01.png", "f-sc3", "m-lena", 2_400_000),
      asset("a-sc3-2", "Sc3 frame 02.png", "f-sc3", "m-lena", 2_100_000),
      asset("a-act1", "Act 1 animatic.mp4", "f-act1", "m-jun", 88_000_000),
      asset("a-mood", "Night palette.jpg", "f-mood", "m-lena", 1_300_000),
      asset("a-amb", "Rain on the shelter roof.wav", "f-sound", "m-theo", 31_000_000),
      asset("a-recce", "Location recce, Harbour Rd.mov", null, "m-jun", 640_000_000),
      asset("a-sched", "Shooting schedule.xlsx", null, "m-ava", 36_000),
    ],
    tasks: [
      task("t-pre", null, "Pre-production", false, { start: d(-9), end: d(2), color: "violet" }),
      task("t-pre-cast", "t-pre", "Cast both leads", true),
      task("t-pre-loc", "t-pre", "Lock locations", false),
      task("t-pre-loc-1", "t-pre-loc", "Bus shelter permit", true),
      task("t-pre-loc-2", "t-pre-loc", "Night walk route", false),
      task("t-pre-boards", "t-pre", "Finish storyboards", true),
      task("t-shoot", null, "Shoot", false, { start: d(3), end: d(6), color: "coral" }),
      task("t-shoot-1", "t-shoot", "Day 1: bus stop", false),
      task("t-shoot-2", "t-shoot", "Day 2: the walk", false),
      task("t-shoot-3", "t-shoot", "Day 3: pickups", false),
      task("t-sound", null, "Sound design", false, { start: d(-2), end: d(12), color: "mint" }),
      task("t-sound-1", "t-sound", "Record rain ambience", true),
      task("t-sound-2", "t-sound", "Foley list", false),
      task("t-edit", null, "Edit", false, { start: d(7), end: d(18), color: "sky" }),
      task("t-edit-1", "t-edit", "Assembly", false),
      task("t-edit-2", "t-edit", "Rough cut", false),
      task("t-edit-3", "t-edit", "Picture lock", false),
    ],
    showcase: [
      { id: "s-boards", memberId: "m-lena", caption: "First look at the bus stop scene", source: { type: "asset", assetId: "a-sc3-1", name: "Sc3 frame 01.png", kind: "image" }, featured: true, addedAt: at },
      { id: "s-rain", memberId: "m-theo", caption: "Rain ambience recorded on location", source: { type: "asset", assetId: "a-amb", name: "Rain on the shelter roof.wav", kind: "audio" }, featured: true, addedAt: at },
    ],
  };
}
