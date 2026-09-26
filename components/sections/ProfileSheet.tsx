"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { roleLabel, type Talent } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Lock } from "@/components/ui/Icons";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

const iconProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, className: "size-5" } as const;

// Progressive blur: stacked backdrop-filter layers, each masked to a band, so
// blur strength ramps up from the top of the region to the bottom.
const LAYERS = 6;
const STEP = 15;
const blurLayers = Array.from({ length: LAYERS }, (_, i) => {
  const start = i * STEP;
  const first = i === 0;
  const last = i === LAYERS - 1;
  const rise = first ? "#000 0%" : `transparent ${start}%, #000 ${start + STEP}%`;
  const fall = last ? "#000 100%" : `#000 ${start + 2 * STEP}%, transparent ${start + 3 * STEP}%`;
  const mask = `linear-gradient(to bottom, ${rise}, ${fall})`;
  const blur = `${0.5 * 2 ** i}px`;
  return { blur, mask };
});

// Member profile as a right-hand side sheet (Contra member sheet layout) with
// the UMDB profile content. Opened from the public landing page, so everything
// below the identity block is behind a progressive blur and a sign-in wall.
// Images are grey placeholders.
export function ProfileSheet({ talent, onClose }: { talent: Talent; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const sheet = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  // Lock page scroll, move focus into the sheet, restore focus on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => {
      html.style.overflow = previous;
      opener?.focus?.();
    };
  }, []);

  // Keyboard: Esc closes, Tab stays inside the sheet.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setClosing(true);
      } else if (e.key === "Tab" && sheet.current) {
        const focusable = Array.from(
          sheet.current.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, [tabindex]:not([tabindex="-1"])'),
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (!sheet.current.contains(active)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Safety net: if the slide-out animation never reports its end (throttled
  // tab, animations off), still close shortly after.
  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(onClose, 450);
    return () => window.clearTimeout(timer);
  }, [closing, onClose]);

  const label = roleLabel(talent.roles[0]).toLowerCase();
  const posts = [
    `Placeholder: open to new ${label} projects this season. Message me with a brief.`,
    `Placeholder: sharing a rough cut and looking for feedback from other ${label}s.`,
    `Placeholder: wrapped a collaboration this month and already looking for the next team.`,
    `Placeholder: behind the scenes from the last production room, and what I learned.`,
  ];
  const counts = [
    { value: talent.connections, label: "Connections" },
    { value: talent.posts, label: "Posts" },
    { value: talent.followers, label: "Followers" },
    { value: talent.following, label: "Following" },
  ];

  return createPortal(
    <div data-lenis-prevent className="fixed inset-0 z-[90]">
      <div
        aria-hidden
        onClick={() => setClosing(true)}
        className={`absolute inset-0 bg-foreground/40 ${
          closing ? "animate-[fade-out_260ms_ease_forwards]" : "animate-[fade-in_260ms_ease_both]"
        }`}
      />

      <div
        ref={sheet}
        role="dialog"
        aria-modal="true"
        aria-label={`${talent.name}, profile`}
        onAnimationEnd={(e) => {
          if (closing && e.target === e.currentTarget) onClose();
        }}
        className={`absolute inset-y-0 right-0 flex w-full flex-col overflow-hidden bg-background lg:w-[86vw] lg:rounded-l-panel ${
          closing
            ? "animate-[sheet-out_300ms_cubic-bezier(0.4,0,1,1)_forwards]"
            : "animate-[sheet-in_360ms_cubic-bezier(0.2,0.8,0.2,1)_both]"
        }`}
      >
        {/* Sizes scale with the window height (svh) so that on a short screen the
            identity block stays compact and the sign-in wall below it is in view. */}
        <div
          style={{ "--av": "clamp(4rem, 13svh, 9rem)" } as React.CSSProperties}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain"
        >
          {/* Cover + avatar + close */}
          <div className="relative shrink-0">
            <ImagePlaceholder className="h-[clamp(4.5rem,16svh,16rem)]" />
            <button
              ref={closeButton}
              type="button"
              aria-label="Close profile"
              onClick={() => setClosing(true)}
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-pill border border-border bg-background text-foreground transition-colors hover:bg-surface sm:right-6 sm:top-6"
            >
              <svg {...iconProps}><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            <ImagePlaceholder
              glyph={false}
              className="absolute -bottom-[calc(var(--av)/2)] left-6 size-[var(--av)] rounded-pill border-4 border-background sm:left-10"
            />
          </div>

          <div className="flex flex-1 flex-col px-6 pb-6 pt-[calc(var(--av)/2+1rem)] sm:px-10">
            {/* Identity: always visible */}
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <h2 className="text-[clamp(1.75rem,0.5rem+5.2svh,3.75rem)] leading-[1.02] tracking-[-0.03em]">{talent.name}</h2>
                <p className="mt-[clamp(0.25rem,1.2svh,0.75rem)] flex items-center gap-2 text-lead text-muted">
                  <svg {...iconProps} className="size-5 shrink-0"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.2" /></svg>
                  {talent.location}
                </p>
                <p className="mt-2 text-lead text-copy">{talent.headline}</p>
                <ul aria-label="Categories" className="mt-[clamp(0.5rem,2svh,1.25rem)] flex flex-wrap gap-2">
                  {talent.roles.map((r) => (
                    <li key={r} className="rounded-pill border border-border px-3.5 py-1.5 text-body text-copy">
                      {roleLabel(r)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex shrink-0 gap-3">
                <Button href="/login" className="!border-ink !bg-ink hover:!border-foreground hover:!bg-foreground">
                  Message
                </Button>
                <Button href="/login" variant="outline">
                  Follow
                </Button>
              </div>
            </div>

            {/* Members-only region: progressive blur + sign-in wall */}
            <div className="relative mt-[clamp(1rem,3svh,2.5rem)] min-h-[15rem] flex-1">
              {/* Teaser content is clipped to the region, so the wall centers in the space that is left. */}
              <div aria-hidden inert className="absolute inset-0 select-none overflow-hidden">
                <dl className="grid max-w-2xl grid-cols-2 gap-y-6 rounded-card border border-border p-6 sm:grid-cols-4">
                  {counts.map((c) => (
                    <div key={c.label} className="text-center">
                      <dd className="font-display text-[1.75rem] font-medium leading-none tracking-[-0.02em]">{c.value}</dd>
                      <dt className="mt-2 text-small text-muted">{c.label}</dt>
                    </div>
                  ))}
                </dl>

                <section className="mt-12 rounded-panel border border-border p-6 sm:p-8">
                  <h3 className="text-heading">Work for collaboration</h3>
                  <p className="mt-2 text-body text-muted">A quick look at this creator&rsquo;s reel, editing, writing, and project updates.</p>
                  <ul className="mt-6 grid gap-3 md:grid-cols-2">
                    {posts.map((text) => (
                      <li key={text} className="rounded-card border border-border p-5">
                        <p className="text-small text-muted">Project post</p>
                        <p className="mt-1 text-body text-foreground">{text}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Blur strength ramps up top to bottom */}
              {blurLayers.map((l, i) => (
                <div
                  key={i}
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backdropFilter: `blur(${l.blur})`,
                    WebkitBackdropFilter: `blur(${l.blur})`,
                    maskImage: l.mask,
                    WebkitMaskImage: l.mask,
                  }}
                />
              ))}
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background/80" />

              {/* Sign-in wall, centered on the blur */}
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="w-full max-w-sm rounded-panel border border-border bg-background p-[clamp(1rem,3svh,1.75rem)] text-center">
                  <span className="mx-auto grid size-[clamp(2.25rem,6svh,3rem)] place-items-center rounded-pill bg-surface text-copy">
                    <Lock className="size-5" />
                  </span>
                  <h3 className="mt-[clamp(0.5rem,2svh,1.25rem)] text-[1.5rem] leading-tight tracking-[-0.02em]">Sign in to see the full profile</h3>
                  <p className="mt-2 text-body text-muted [@media(max-height:720px)]:hidden">
                    Connections, posts and collaboration work are visible to Norrick members. It&rsquo;s free to join.
                  </p>
                  <div className="mt-[clamp(0.75rem,2.5svh,1.5rem)] flex flex-wrap justify-center gap-3">
                    <Button href="/login" className="!border-ink !bg-ink hover:!border-foreground hover:!bg-foreground">
                      Sign in
                    </Button>
                    <Button href="/signup" variant="outline">
                      Create free account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
