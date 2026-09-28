"use client";

import { useEffect, useState } from "react";
import { selectOpenCalls, type OpenCall } from "@/lib/open-calls-data";

/** Live Open calls from /api/open-calls, refreshed every minute while the tab is visible. */
export function useOpenCalls() {
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
    const clock = window.setInterval(tick, 30_000);
    const poll = window.setInterval(() => { if (!document.hidden) void refresh(); }, 60_000);
    const resume = () => { if (!document.hidden) { tick(); void refresh(); } };
    document.addEventListener("visibilitychange", resume);
    return () => { controller.abort(); clearInterval(clock); clearInterval(poll); document.removeEventListener("visibilitychange", resume); };
  }, []);
  const visible = calls.filter((call) => Date.parse(call.expiresAt) > now);
  return { calls: visible, available, preview, now };
}
