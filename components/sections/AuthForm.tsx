"use client";

import { useState } from "react";
import Link from "next/link";
import { authLinks } from "@/lib/auth-links";

type Mode = "login" | "signup";

// Copy per mode. Everything else (layout, fields) is shared.
const copy: Record<Mode, { title: string; submit: string; switchText: string; switchLabel: string; switchHref: string; passwordAutocomplete: string }> = {
  login: {
    title: "Welcome back to Norrick",
    submit: "Log in",
    switchText: "New to Norrick?",
    switchLabel: "Sign up",
    switchHref: "/signup",
    passwordAutocomplete: "current-password",
  },
  signup: {
    title: "Join Norrick",
    submit: "Sign up",
    switchText: "Already on Norrick?",
    switchLabel: "Log in",
    switchHref: "/login",
    passwordAutocomplete: "new-password",
  },
};

function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M16.37 12.63c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.97.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.65zM14.1 5.88c.63-.77 1.06-1.83.94-2.88-.91.04-2.01.61-2.66 1.37-.58.67-1.09 1.75-.96 2.78 1.02.08 2.05-.51 2.68-1.27z" />
    </svg>
  );
}

const field = "h-12 w-full rounded-card border border-white/20 bg-ink px-4 text-body text-foreground placeholder:text-white/35 transition-colors hover:border-white/35 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40";
const label = "text-small font-medium text-foreground";

// Design preview of Norrick's own sign-in. There is no auth backend yet, so
// submitting shows a notice pointing to the live sign-in. The site links to
// the live sign-in (lib/auth-links.ts), not to these pages, until auth ships.
export function AuthForm({ mode }: { mode: Mode }) {
  const t = copy[mode];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState(false);
  const valid = /^\S+@\S+\.\S+$/.test(email) && password.length >= (mode === "signup" ? 8 : 1);

  return (
    <div className="flex flex-col justify-center p-8 sm:p-14">
      <h1 className="text-title">{t.title}</h1>
      <p className="mt-3 text-small text-muted">
        Preview of the new sign-in. To use your account today,{" "}
        <a href={mode === "login" ? authLinks.signIn : authLinks.signUp} className="text-foreground underline underline-offset-4 hover:text-primary-light">
          {mode === "login" ? "log in on the creative hub" : "sign up on the creative hub"}
        </a>
        .
      </p>

      <button
        type="button"
        onClick={() => setNotice(true)}
        className="mt-8 inline-flex h-12 w-full items-center justify-center gap-3 rounded-pill bg-white font-display text-body font-semibold text-ink transition-colors hover:bg-white/85"
      >
        <AppleMark />
        Continue with Apple
      </button>

      <div className="my-7 flex items-center gap-4" role="separator" aria-label="or">
        <span aria-hidden className="h-px flex-1 bg-border" />
        <span className="eyebrow text-muted">or</span>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) setNotice(true);
        }}
        noValidate
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={field} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor="password" className={label}>Password</label>
            {mode === "login" && (
              <a href={authLinks.forgotPassword} className="text-small text-muted underline-offset-4 hover:text-foreground hover:underline">
                Forgot password?
              </a>
            )}
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete={t.passwordAutocomplete}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby={mode === "signup" ? "password-hint" : undefined}
              className={`${field} pr-20`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-controls="password"
              aria-pressed={showPassword}
              className="absolute inset-y-1.5 right-1.5 rounded-[10px] px-3 text-small font-medium text-muted transition-colors hover:bg-white/10 hover:text-foreground"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {mode === "signup" && <p id="password-hint" className="text-small text-muted">At least 8 characters.</p>}
        </div>

        <button
          type="submit"
          disabled={!valid}
          className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-pill bg-primary font-display text-body font-semibold text-primary-foreground transition-colors hover:bg-foreground hover:text-background disabled:bg-surface disabled:text-muted"
        >
          {t.submit}
        </button>

        {mode === "signup" && (
          <p className="text-center text-small text-muted">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-foreground underline underline-offset-4 hover:text-primary-light">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-foreground underline underline-offset-4 hover:text-primary-light">Privacy Policy</Link>.
          </p>
        )}
      </form>

      {notice && (
        <p role="status" className="mt-5 rounded-card bg-primary-soft p-4 text-small text-foreground">
          This page is a preview, so nothing was sent and no account was created.{" "}
          <a href={mode === "login" ? authLinks.signIn : authLinks.signUp} className="font-medium underline underline-offset-4">
            Continue on the creative hub
          </a>
          .
        </p>
      )}

      <p className="mt-8 text-center text-body text-copy">
        {t.switchText}{" "}
        <Link href={t.switchHref} className="font-medium text-foreground hover:text-primary-light">
          {t.switchLabel}
        </Link>
      </p>
    </div>
  );
}
