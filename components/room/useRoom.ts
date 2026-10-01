"use client";

import { useCallback, useSyncExternalStore } from "react";
import { exampleRoom, roomReducer, toISODate, type Room, type RoomAction } from "@/lib/room";

// The room lives in this browser (localStorage) until the room API ships.
// Both the room and its public page read the same copy, so a piece added to
// the showcase shows up on the public page straight away.
const key = (slug: string) => `norrick-room:${slug}:v1`;
const viewerKey = (slug: string) => `norrick-room:${slug}:viewer`;

const cache = new Map<string, Room>();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function read(slug: string): Room {
  const hit = cache.get(slug);
  if (hit) return hit;
  let room: Room | null = null;
  try {
    const raw = localStorage.getItem(key(slug));
    const parsed = raw ? (JSON.parse(raw) as Room) : null;
    if (parsed && parsed.slug === slug && Array.isArray(parsed.folders) && Array.isArray(parsed.tasks)) room = parsed;
  } catch {}
  room ??= exampleRoom(toISODate(new Date()));
  cache.set(slug, room);
  return room;
}

function write(slug: string, room: Room) {
  cache.set(slug, room);
  try {
    localStorage.setItem(key(slug), JSON.stringify(room));
  } catch {}
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Another tab changed the room: drop the cached copy and re-read it.
  const onStorage = (e: StorageEvent) => {
    if (e.key?.startsWith("norrick-room:")) {
      cache.clear();
      viewers.clear();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const viewers = new Map<string, string>();
function readViewer(slug: string, fallback: string): string {
  const hit = viewers.get(slug);
  if (hit) return hit;
  let id = fallback;
  try {
    id = localStorage.getItem(viewerKey(slug)) ?? fallback;
  } catch {}
  viewers.set(slug, id);
  return id;
}

/** null while rendering on the server, before the browser copy is read. */
export function useRoom(slug: string) {
  const room = useSyncExternalStore(subscribe, () => read(slug), () => null);
  const storedViewer = useSyncExternalStore(subscribe, () => (room ? readViewer(slug, room.ownerId) : ""), () => "");

  const dispatch = useCallback((action: RoomAction) => {
    const current = read(slug);
    const next = roomReducer(current, action);
    if (next !== current) write(slug, next);
    return next !== current;
  }, [slug]);

  const setViewer = useCallback((id: string) => {
    viewers.set(slug, id);
    try {
      localStorage.setItem(viewerKey(slug), id);
    } catch {}
    emit();
  }, [slug]);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(key(slug));
    } catch {}
    cache.delete(slug);
    emit();
  }, [slug]);

  const viewerId = room && room.members.some((m) => m.id === storedViewer) ? storedViewer : room?.ownerId ?? "";
  return { room, viewerId, dispatch, setViewer, reset };
}

export function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}
