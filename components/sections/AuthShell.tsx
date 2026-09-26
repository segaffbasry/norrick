import type { ReactNode } from "react";
import Link from "next/link";
import { trustedBy } from "@/lib/partnerships";
import { Wordmark } from "@/components/ui/Logo";

// Shared layout for /login and /signup (no site header/footer): logo top-left,
// one centred card, form on the left and a trust panel on the right.
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-svh bg-surface">
      <div className="px-4 pt-6 sm:px-9">
        <Link href="/" aria-label="Norrick, home" className="inline-flex text-primary">
          <Wordmark className="h-[22px] w-auto" />
        </Link>
      </div>

      <div className="shell py-10 md:py-14">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-panel bg-background md:grid-cols-2 md:divide-x md:divide-border">
          {children}

          <aside aria-label="Trusted by" className="hidden flex-col justify-between p-14 md:flex">
            {/* Placeholder brand art: swap for the Norrick mark render. */}
            <div aria-hidden className="relative mx-auto aspect-[4/3] w-full max-w-xs">
              <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 grid-cols-2 gap-2">
                {["rounded-tl-[2rem]", "rounded-tr-[2rem]", "rounded-bl-[2rem]", "rounded-br-[2rem]"].map((corner) => (
                  <span
                    key={corner}
                    className={`size-16 rounded-tag bg-placeholder ${corner}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4">
                <span aria-hidden className="h-px flex-1 bg-border" />
                <p className="eyebrow text-center">Trusted by 1K+ creatives and 50+ teams</p>
                <span aria-hidden className="h-px flex-1 bg-border" />
              </div>
              <ul className="mt-8 grid grid-cols-3 gap-x-4 gap-y-6 text-center">
                {trustedBy.names.slice(0, 9).map((n) => (
                  <li key={n} className="font-display text-small font-semibold uppercase tracking-[0.05em] text-foreground/45">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
