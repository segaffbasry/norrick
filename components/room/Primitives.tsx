"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Close, More } from "./RoomIcons";

// Native <dialog>: focus trap, Esc and the top layer for free.
export function Modal({ title, onClose, children, side = false, wide = false }: { title: string; onClose: () => void; children: ReactNode; side?: boolean; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    return () => {
      html.style.overflow = previous;
      if (dialog.open) dialog.close();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={title}
      data-lenis-prevent
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={`m-0 max-h-none max-w-none bg-transparent p-0 text-foreground backdrop:bg-ink/70 ${
        side
          ? "fixed inset-y-0 left-auto right-0 h-dvh w-full sm:w-[min(560px,100vw)] animate-[sheet-in_320ms_cubic-bezier(0.2,0.8,0.2,1)_both]"
          : "fixed inset-0 grid h-dvh w-full place-items-center p-4"
      }`}
    >
      <div
        className={`flex flex-col overflow-hidden border border-border bg-background ${
          side ? "h-full sm:rounded-l-panel" : `max-h-[calc(100dvh-32px)] w-full ${wide ? "max-w-[640px]" : "max-w-[460px]"} rounded-panel animate-[fade-in_200ms_ease_both]`
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
          <h2 className="font-display text-lead font-semibold">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="grid size-10 place-items-center rounded-full text-muted hover:bg-surface hover:text-foreground">
            <Close />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </div>
    </dialog>
  );
}

export interface MenuItem {
  label: string;
  onSelect: () => void;
  danger?: boolean;
  hidden?: boolean;
}

// A small "more" menu: opens below its button, closes on outside click or Esc.
export function Menu({ label, items }: { label: string; items: MenuItem[] }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    wrap.current?.querySelector<HTMLElement>("[role=menuitem]")?.focus();
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const shown = items.filter((i) => !i.hidden);
  return (
    <div ref={wrap} className="relative">
      <button ref={button} type="button" aria-label={label} aria-haspopup="menu" aria-expanded={open} onClick={(e) => { e.stopPropagation(); setOpen(!open); }} className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface hover:text-foreground">
        <More />
      </button>
      {open && (
        <div
          role="menu"
          onKeyDown={(e) => {
            if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
            e.preventDefault();
            const all = [...(wrap.current?.querySelectorAll<HTMLElement>("[role=menuitem]") ?? [])];
            const i = all.indexOf(document.activeElement as HTMLElement);
            all[(i + (e.key === "ArrowDown" ? 1 : -1) + all.length) % all.length]?.focus();
          }}
          className="absolute right-0 top-full z-30 mt-1 min-w-48 overflow-hidden rounded-card border border-border bg-surface py-1 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.8)]"
        >
          {shown.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                item.onSelect();
              }}
              className={`block w-full px-4 py-2.5 text-left text-small hover:bg-primary-soft focus-visible:bg-primary-soft focus-visible:outline-none ${item.danger ? "text-[#ff8a8a]" : "text-copy"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Avatar({ name, className = "size-8 text-[12px]" }: { name: string; className?: string }) {
  const initials = name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <span aria-hidden className={`grid shrink-0 place-items-center rounded-full bg-primary-soft font-display font-semibold text-foreground ring-2 ring-background ${className}`}>
      {initials}
    </span>
  );
}

export const field =
  "h-11 w-full rounded-[12px] border border-border bg-surface px-3.5 text-body text-foreground placeholder:text-muted focus:border-primary focus:outline-none";
export const pillButton =
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-pill px-4 text-small font-semibold transition-colors disabled:opacity-50";
export const primaryPill = `${pillButton} bg-primary text-white hover:bg-foreground hover:text-background`;
export const quietPill = `${pillButton} border border-border text-copy hover:border-copy hover:text-foreground`;
