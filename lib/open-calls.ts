import { previewCalls } from "./preview-calls";
import { selectOpenCalls } from "./open-calls-data";

export async function getOpenCalls() {
  if (!process.env.NORRICK_OPEN_CALLS_URL) {
    const now = Date.now();
    return { available: true, preview: true, calls: previewCalls.map((call) => ({
      ...call, status: "open" as const, url: `/collaborate/preview/${call.id}`,
      createdAt: new Date(now - call.hoursAgo * 3_600_000).toISOString(),
      expiresAt: new Date(now + 86_400_000).toISOString(),
    })) };
  }
  try {
    // A public read-only projection is needed: the existing endpoint is gated.
    // Never copy a member's session token into the public website.
    const response = await fetch(process.env.NORRICK_OPEN_CALLS_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return { calls: [], available: false };
    return { calls: selectOpenCalls(await response.json()), available: true };
  } catch {
    return { calls: [], available: false };
  }
}
