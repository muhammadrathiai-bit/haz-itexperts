// app/api/email-check/route.js
import { checkDomain, normalizeDomain } from "@/lib/emailCheck";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// --- light abuse guard (per server instance) ---
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 30;
const hits = new Map();

function limited(ip) {
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const row = hits.get(ip);
  if (!row || now - row.start > WINDOW_MS) {
    hits.set(ip, { start: now, n: 1 });
    return false;
  }
  row.n += 1;
  return row.n > MAX_PER_WINDOW;
}

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "x-robots-tag": "noindex", ...extra },
  });
}

export async function GET(req) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return json({ error: "Too many checks from this connection. Please try again in a few minutes." }, 429, { "cache-control": "no-store" });

  const domain = normalizeDomain(req.nextUrl.searchParams.get("domain") || "");
  if (!domain) return json({ error: "Enter a business domain like yourcompany.com (or a work email address)." }, 400, { "cache-control": "no-store" });

  try {
    const result = await checkDomain(domain);
    // DNS records change rarely; let the CDN absorb repeat checks of the same domain for 5 minutes
    return json(result, 200, { "cache-control": "public, s-maxage=300, stale-while-revalidate=600" });
  } catch {
    return json({ error: "We could not complete the lookup. Please try again." }, 502, { "cache-control": "no-store" });
  }
}
