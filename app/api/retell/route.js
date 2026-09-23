// app/api/retell/route.js
// Webhook for the Retell AI front desk. After each call Retell posts "call_analyzed";
// we email the caller's details, summary and transcript to the office inbox.
import crypto from "node:crypto";
import { Resend } from "resend";
import { buildCallEmail } from "@/lib/retellCallEmail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const MAIL_TO = process.env.MAIL_TO || "support@supremeitexperts.com";
const MAIL_CC = process.env.MAIL_CC || "";
const MAIL_FROM = process.env.MAIL_FROM || "Supreme IT Experts <onboarding@resend.dev>";

// Retell sends every webhook from this address (docs.retellai.com/features/secure-webhook).
// Vercel overwrites x-forwarded-for with the real client address, so it cannot be spoofed there.
const RETELL_IPS = new Set(["100.20.5.228"]);

// Only our own agent(s). Override with a comma-separated RETELL_AGENT_ID if agents change.
const AGENT_IDS = new Set(
  (process.env.RETELL_AGENT_ID || "agent_32c0a4de00305897faf63bddad")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
);

// Optional second check: when RETELL_API_KEY is set, the x-retell-signature must match too.
const API_KEY = process.env.RETELL_API_KEY || "";
const MAX_SKEW_MS = 5 * 60 * 1000;
const MAX_BODY = 1_000_000;

// Per-instance guards: skip duplicate deliveries of the same call, and cap the email rate.
const seen = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_EMAILS_PER_WINDOW = 30;
let windowStart = 0;
let sentInWindow = 0;

function splitList(v = "") {
  return String(v)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function clientIp(req) {
  return (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || (req.headers.get("x-real-ip") || "").trim();
}

function validSignature(raw, header) {
  const m = /^v=(\d+),d=([0-9a-f]+)$/i.exec(String(header || "").trim());
  if (!m) return false;
  const ts = Number(m[1]);
  if (!Number.isFinite(ts) || Math.abs(Date.now() - ts) > MAX_SKEW_MS) return false;
  const expected = crypto.createHmac("sha256", API_KEY).update(raw + m[1]).digest("hex");
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(m[2].toLowerCase(), "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function rateLimited() {
  const now = Date.now();
  if (now - windowStart > WINDOW_MS) {
    windowStart = now;
    sentInWindow = 0;
  }
  sentInWindow += 1;
  return sentInWindow > MAX_EMAILS_PER_WINDOW;
}

const done = (status = 204) => new Response(null, { status, headers: { "cache-control": "no-store" } });

export async function POST(req) {
  if (!RETELL_IPS.has(clientIp(req))) return done(401);

  const raw = await req.text();
  if (raw.length > MAX_BODY) return done(413);
  if (API_KEY && !validSignature(raw, req.headers.get("x-retell-signature"))) return done(401);

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return done(400);
  }

  // Everything else (call_started, call_ended, ...) is acknowledged and ignored.
  if (body?.event !== "call_analyzed") return done(204);

  const call = body.call || {};
  if (!AGENT_IDS.has(String(call.agent_id || ""))) return done(204);

  const id = String(call.call_id || "");
  if (id && seen.has(id)) return done(204);

  if (!resend) {
    console.error("Retell webhook: RESEND_API_KEY is not set, call summary not emailed", id);
    return done(500);
  }
  if (rateLimited()) {
    console.warn("Retell webhook: email rate limit reached, skipped", id);
    return done(204);
  }

  const { subject, text, html, replyTo } = buildCallEmail(call);
  const cc = splitList(MAIL_CC);

  try {
    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: splitList(MAIL_TO),
      ...(cc.length ? { cc } : {}),
      subject,
      text,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) throw new Error(error.message || String(error));
  } catch (e) {
    // A 5xx makes Retell retry (up to 3 times).
    console.error("Retell webhook: email failed", id, e);
    return done(500);
  }

  if (id) {
    if (seen.size > 1000) seen.clear();
    seen.set(id, Date.now());
  }
  return done(204);
}

export async function GET() {
  return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
}
