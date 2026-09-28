"use client";

import Link from "next/link";
import { useState } from "react";
import { personas, roles, type RoleId } from "@/lib/data";
import s from "@/app/(site)/collaborate/collaborate.module.css";

export type Intent = "make" | "join" | "explore";

const intentions: { id: Intent; label: string; title: string; body: string; ask: string; cta: string }[] = [
  {
    id: "make",
    label: "I have an idea.",
    title: "Every idea needs its people.",
    body: "A writer to shape the story. An actor to bring it to life. A crew to make it happen. Start with the person your project needs next.",
    ask: "Who does your project need?",
    cta: "Find collaborators",
  },
  {
    id: "join",
    label: "I want to be part of something.",
    title: "Someone’s next chapter needs you.",
    body: "Bring what you do best to a story that’s taking shape. Look for projects in your craft and find a place to begin.",
    ask: "What’s your craft?",
    cta: "See open projects",
  },
  {
    id: "explore",
    label: "I’m finding my people.",
    title: "Follow your curiosity.",
    body: "You don’t need a finished script or a perfect plan. Meet the crafts that come together to make something, and the people behind them.",
    ask: "Who would you like to meet?",
    cta: "Meet the community",
  },
];

// The collaboration page as a conversation: Norrick asks what brings you here,
// you answer in a bubble, Norrick answers back and asks who you're looking for,
// then points you to the right place with that craft already chosen.
export function CollaborationStart({ initialIntent }: { initialIntent: Intent }) {
  const [intent, setIntent] = useState<Intent>(initialIntent);
  const [role, setRole] = useState<RoleId | "all">("all");
  const selected = intentions.find((item) => item.id === intent)!;
  const href = `${intent === "join" ? "/jobs" : "/talent"}${role === "all" ? "" : `?role=${role}`}`;

  return (
    <div className={s.chat}>
      <p className={s.them}>
        <span className={s.who}>Norrick</span>
        <span className={s.msg}>Hey. What brings you here?</span>
      </p>

      <fieldset className={s.replies}>
        <legend className="sr-only">What brings you here?</legend>
        {intentions.map((item) => (
          <label key={item.id} className={s.reply}>
            <input
              type="radio"
              name="intent"
              value={item.id}
              checked={intent === item.id}
              onChange={() => {
                setIntent(item.id);
                setRole("all");
              }}
            />
            <span>{item.label}</span>
          </label>
        ))}
      </fieldset>

      <div key={intent} className={s.answer} aria-live="polite">
        <p className={s.them}>
          <span className={s.who}>Norrick</span>
          <span className={`${s.msg} ${s.big}`}>
            <strong>{selected.title}</strong> {selected.body}
          </span>
        </p>
        <p className={s.them}>
          <span className={`${s.msg} ${s.follow}`}>{selected.ask}</span>
        </p>

        <div className={s.crafts}>
          {personas.map((craft) => (
            <fieldset key={craft.id} className={s.craft}>
              <legend>{craft.label}</legend>
              <div>
                {roles
                  .filter((r) => r.craft === craft.id)
                  .map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      aria-pressed={role === r.id}
                      onClick={() => setRole(role === r.id ? "all" : r.id)}
                      className={s.chip}
                    >
                      {r.label}
                    </button>
                  ))}
              </div>
            </fieldset>
          ))}
        </div>

        <div className={s.go}>
          <Link href={href} className={s.pill}>
            {selected.cta}
            {role !== "all" && <em> · {roles.find((r) => r.id === role)?.label}</em>} <span aria-hidden>↗</span>
          </Link>
          <p className={s.note}>
            Preview: the directories behind this link show sample profiles and projects while member listings are prepared.
          </p>
        </div>
      </div>
    </div>
  );
}
