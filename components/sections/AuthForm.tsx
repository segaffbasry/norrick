"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

type Mode = "login" | "signup";

// Copy per mode. Everything else (layout, fields) is shared.
const copy: Record<Mode, { title: string; submit: string; switchText: string; switchLabel: string; switchHref: string }> = {
  login: {
    title: "Welcome back to Norrick",
    submit: "Log in",
    switchText: "New to Norrick?",
    switchLabel: "Sign up",
    switchHref: "/signup",
  },
  signup: {
    title: "Join Norrick",
    submit: "Sign up",
    switchText: "Already on Norrick?",
    switchLabel: "Log in",
    switchHref: "/login",
  },
};

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.4 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.4a12 12 0 0 0 0 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
    </svg>
  );
}

// UI only. There is no auth backend yet, so submitting just shows a notice.
export function AuthForm({ mode }: { mode: Mode }) {
  const t = copy[mode];
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState(false);
  const valid = /^\S+@\S+\.\S+$/.test(email);

  return (
    <div className="flex flex-col justify-center p-8 sm:p-14">
      <h1 className="text-title">{t.title}</h1>

      <Button
        onClick={() => setNotice(true)}
        className="mt-8 w-full !border-ink !bg-ink !text-ink-foreground hover:!border-foreground hover:!bg-foreground"
      >
        <GoogleMark />
        Continue with Google
      </Button>

      <div className="my-8 flex items-center gap-4" role="separator" aria-label="or">
        <span className="eyebrow">Or</span>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) setNotice(true);
        }}
        noValidate
      >
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@work-email.com"
          className="h-14 w-full rounded-card border border-foreground bg-background px-4 text-body text-foreground placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={!valid}
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-pill bg-primary font-display text-body font-semibold text-primary-foreground transition-colors hover:bg-foreground disabled:bg-surface disabled:text-muted"
        >
          {t.submit}
        </button>
      </form>

      {notice && (
        <p role="status" className="mt-4 rounded-card bg-primary-soft p-3 text-small text-primary">
          Placeholder: authentication is not connected yet.
        </p>
      )}

      <p className="mt-8 text-center text-body text-copy">
        {t.switchText}{" "}
        <Link href={t.switchHref} className="font-medium text-foreground hover:text-primary">
          {t.switchLabel}
        </Link>
      </p>
    </div>
  );
}
