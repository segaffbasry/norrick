"use client";

import { useEffect, useState } from "react";
import { postedAgo, selectOpenCalls, type OpenCall } from "@/lib/open-calls-data";
import s from "@/app/(site)/home.module.css";

export function LiveCalls() {
  const [calls, setCalls] = useState<OpenCall[]>([]);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [preview, setPreview] = useState(false);
  const [now, setNow] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const refresh = async () => {
      try {
        const response = await fetch("/api/open-calls", { cache: "no-store", signal: controller.signal });
        if (!response.ok) throw new Error("Feed unavailable");
        const data = await response.json();
        if (controller.signal.aborted) return;
        setCalls(data.preview === true ? data.calls : selectOpenCalls(data.calls));
        setPreview(data.preview === true);
        setAvailable(data.available === true);
      } catch {
        if (!controller.signal.aborted) { setCalls([]); setAvailable(false); }
      }
    };
    const tick = () => { setNow(Date.now()); };
    tick();
    void refresh();
    const clock = window.setInterval(tick, 1000);
    const poll = window.setInterval(() => { if (!document.hidden) void refresh(); }, 60_000);
    const resume = () => { if (!document.hidden) { tick(); void refresh(); } };
    document.addEventListener("visibilitychange", resume);
    return () => { controller.abort(); clearInterval(clock); clearInterval(poll); document.removeEventListener("visibilitychange", resume); };
  }, []);
  const visible = calls.filter((call) => Date.parse(call.expiresAt) > now);
  return (
    <section className={s.calls} aria-labelledby="calls-title">
      <div className={s.sectionHeader}>
        <h2 id="calls-title" className={s.sectionTitle}>Find your people</h2>
        <a href="https://umdb.org/collaborate" className={s.textLink}>All open calls</a>
      </div>
      {preview && <p className={s.previewNote}>Preview calls · example content for this design pass</p>}
      {visible.length > 0 ? (
        <ul className={s.callGrid}>
          {visible.map((call) => (
            <li key={call.id}>
              <a href={call.url} className={s.callCard}>
                <span className={s.callStatus}>{preview ? "Preview" : "Open"}</span>
                <p><strong>{call.role}</strong> for <span>{call.project}</span></p>
                <time dateTime={call.createdAt}>{postedAgo(call.createdAt, now)}</time>
              </a>
            </li>
          ))}
        </ul>
      ) : <p className={s.emptyCalls} role="status">{available === null ? "Looking for open calls…" : available ? "No open calls right now. Yours could be next." : "Explore open calls in the creative hub."}</p>}
    </section>
  );
}
