import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Logo";

// Branded 404 (root layout only, so no site header/footer).
export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-6 py-16 text-center">
      <div className="max-w-xl">
        <Link href="/" aria-label="Norrick, home" className="inline-flex text-foreground">
          <Wordmark className="h-6 w-auto" />
        </Link>
        <p className="eyebrow mt-12">404</p>
        <h1 className="mt-3 text-[clamp(2.5rem,1.5rem+4vw,4.5rem)] leading-[1] tracking-[-0.035em]">
          This page took a wrong turn.
        </h1>
        <p className="mt-5 text-lead text-muted">The page you are looking for does not exist, or it has moved. Let&rsquo;s get you back to the work.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/talent" variant="outline">
            Browse talent
          </Button>
        </div>
      </div>
    </main>
  );
}
