"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { typeOptions } from "@/lib/type-options";

const KEY = "norrick-type";
const root = () => document.documentElement;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributes: true, attributeFilter: ["data-type"] });
  return () => observer.disconnect();
}

function choose(id: string | null) {
  try {
    if (id) localStorage.setItem(KEY, id);
    else localStorage.removeItem(KEY);
  } catch {}
  if (id) root().setAttribute("data-type", id);
  else root().removeAttribute("data-type");
}

/** Floating bar shown only while someone is previewing a typeface option. */
export function TypeSwitcher() {
  const active = useSyncExternalStore(subscribe, () => root().getAttribute("data-type"), () => null);
  if (!active) return null;
  const current = typeOptions.find((option) => option.id === active);
  return (
    <div role="region" aria-label="Typeface preview" className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-pill border border-white/15 bg-ink/90 p-1.5 pl-4 text-small text-white shadow-float backdrop-blur">
      <Link href="/type-options" className="mr-2 whitespace-nowrap text-white/70 hover:text-white">
        Type preview · <span className="text-white">{current?.name ?? "Option"}</span>
      </Link>
      {typeOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => choose(option.id)}
          aria-pressed={option.id === active}
          className="grid size-9 place-items-center rounded-pill font-semibold uppercase transition-colors hover:bg-white/10 aria-pressed:bg-primary"
        >
          {option.id}
        </button>
      ))}
      <button type="button" onClick={() => choose(null)} className="ml-1 rounded-pill px-3 py-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white">
        Current
      </button>
    </div>
  );
}
