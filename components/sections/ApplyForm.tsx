"use client";

import { useState } from "react";

const field =
  "h-14 w-full rounded-card border border-border bg-background px-4 text-body text-foreground placeholder:text-muted focus:border-foreground";

// UI only. There is no backend yet, so submitting just shows a notice.
export function ApplyForm() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState(false);
  const valid = first.trim() !== "" && last.trim() !== "" && /^\S+@\S+\.\S+$/.test(email);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) setNotice(true);
      }}
      className="mt-6"
    >
      <div className="grid grid-cols-2 gap-3">
        <label>
          <span className="sr-only">First name</span>
          <input className={field} value={first} onChange={(e) => setFirst(e.target.value)} placeholder="First name" autoComplete="given-name" />
        </label>
        <label>
          <span className="sr-only">Last name</span>
          <input className={field} value={last} onChange={(e) => setLast(e.target.value)} placeholder="Last name" autoComplete="family-name" />
        </label>
      </div>
      <label className="mt-3 block">
        <span className="sr-only">Email</span>
        <input type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@work-email.com" autoComplete="email" />
      </label>

      <button
        type="submit"
        disabled={!valid}
        className="mt-5 inline-flex h-14 w-full items-center justify-center rounded-pill bg-ink font-display text-lead font-semibold text-ink-foreground transition-colors hover:bg-foreground disabled:bg-surface disabled:text-muted"
      >
        Start application
      </button>

      {notice && (
        <p role="status" className="mt-4 rounded-card bg-primary-soft p-3 text-small text-primary">
          Placeholder: applications are not connected yet.
        </p>
      )}
    </form>
  );
}
