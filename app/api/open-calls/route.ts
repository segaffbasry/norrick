import { getOpenCalls } from "@/lib/open-calls";

export async function GET() {
  return Response.json(await getOpenCalls(), { headers: { "Cache-Control": "no-store" } });
}
