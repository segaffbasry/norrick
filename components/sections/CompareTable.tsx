"use client";

import { gsap } from "gsap";
import { useRef, useState } from "react";
import { compareColumns, compareGroups } from "@/lib/pricing";
import { Check, Lock } from "@/components/ui/Icons";

// Compare features: grouped rows, one column per plan. Collapsible (native
// <details>, so keyboard and screen readers behave), open by default, and it
// eases open and shut (height + fade) with GSAP; instant for reduced motion.
// Scrolls sideways on narrow screens.
export function CompareTable() {
  const details = useRef<HTMLDetailsElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const wantOpen = useRef(true);
  const [expanded, setExpanded] = useState(true);

  const toggle = (e: React.MouseEvent) => {
    const d = details.current;
    const b = body.current;
    if (!d || !b) return;
    // Reduced motion: let the browser toggle it natively (onToggle keeps the chevron in sync).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    e.preventDefault();
    wantOpen.current = !wantOpen.current;
    setExpanded(wantOpen.current);
    tween.current?.kill();
    gsap.set(b, { overflow: "hidden" });

    if (wantOpen.current) {
      // From fully closed the body starts at 0; if a close is still running, pick up from where it is.
      const from = d.open ? { height: b.offsetHeight, opacity: +getComputedStyle(b).opacity } : { height: 0, opacity: 0 };
      d.open = true;
      tween.current = gsap.fromTo(
        b,
        from,
        {
          height: "auto",
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () =>
            void gsap.set(b, { clearProps: "height,opacity,overflow" }),
        },
      );
    } else {
      tween.current = gsap.to(b, {
        height: 0,
        opacity: 0,
        duration: 0.45,
        ease: "power3.inOut",
        onComplete: () => {
          d.open = false;
          gsap.set(b, { clearProps: "height,opacity,overflow" });
        },
      });
    }
  };

  return (
    <details
      ref={details}
      open
      onToggle={(e) => {
        // Native toggles (reduced motion) keep the chevron and state in step.
        wantOpen.current = e.currentTarget.open;
        setExpanded(e.currentTarget.open);
      }}
      className="max-w-full overflow-x-clip"
    >
      <summary
        onClick={toggle}
        className="mx-auto flex w-fit list-none items-center gap-2 py-2 [&::-webkit-details-marker]:hidden"
      >
        <span className="eyebrow !text-primary">Compare features</span>
        <svg
          viewBox="0 0 12 12"
          aria-hidden
          className={`size-3 text-primary transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" />
        </svg>
      </summary>

      <div ref={body}>
        <div className="mt-6 overflow-x-auto rounded-card border border-border">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">
              Feature comparison across plans
            </caption>
            <thead>
              <tr className="bg-surface">
                <th scope="col" className="eyebrow px-6 py-5">
                  Features
                </th>
                {compareColumns.map((c) => (
                  <th
                    key={c}
                    scope="col"
                    className="eyebrow px-4 py-5 text-center"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            {compareGroups.map((group) => (
              <tbody key={group.title}>
                <tr className="bg-primary-soft">
                  <th
                    colSpan={5}
                    scope="colgroup"
                    className="eyebrow px-6 py-3 !text-primary"
                  >
                    {group.title}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.label} className="border-t border-border">
                    <th
                      scope="row"
                      className="px-6 py-4 text-body font-normal text-foreground"
                    >
                      {row.label}
                    </th>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        className="px-4 py-4 text-center text-body text-copy"
                      >
                        {v === true ? (
                          <>
                            <Check className="mx-auto size-4 text-primary" />
                            <span className="sr-only">Included</span>
                          </>
                        ) : v === false ? (
                          <>
                            <Lock className="mx-auto size-4 text-muted" />
                            <span className="sr-only">Not included</span>
                          </>
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </details>
  );
}
