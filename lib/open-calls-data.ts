export interface OpenCall {
  status: "open";
  id: string;
  role: string;
  project: string;
  url: string;
  createdAt: string;
  expiresAt: string;
}

/** Only complete, public, currently Open posts can become homepage links. */
export function selectOpenCalls(payload: unknown, now = Date.now()): OpenCall[] {
  const data = payload && typeof payload === "object" && "data" in payload ? payload.data : payload;
  if (!Array.isArray(data)) return [];
  const seen = new Set<string>();
  return data.flatMap((row): OpenCall[] => {
    if (!row || typeof row !== "object" || typeof row.status !== "string" || row.status.toLowerCase() !== "open") return [];
    const fields = ["id", "role", "project", "url", "createdAt", "expiresAt"] as const;
    if (fields.some((key) => typeof row[key] !== "string" || !row[key].trim())) return [];
    const created = Date.parse(row.createdAt);
    const expires = Date.parse(row.expiresAt);
    if (!Number.isFinite(created) || !Number.isFinite(expires) || created > now || expires <= now || seen.has(row.id)) return [];
    try {
      const url = new URL(row.url);
      if (url.protocol !== "https:" || !["umdb.org", "www.umdb.org"].includes(url.hostname) || url.username || url.password) return [];
    } catch { return []; }
    seen.add(row.id);
    return [{ status: "open", id: row.id, role: row.role.trim(), project: row.project.trim(), url: row.url, createdAt: row.createdAt, expiresAt: row.expiresAt }];
  }).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 6);
}

export function postedAgo(createdAt: string, now: number): string {
  const minutes = Math.max(0, Math.floor((now - Date.parse(createdAt)) / 60_000));
  if (minutes < 1) return "Posted just now";
  if (minutes < 60) return `Posted ${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Posted ${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  const days = Math.floor(hours / 24);
  return `Posted ${days} ${days === 1 ? "day" : "days"} ago`;
}
