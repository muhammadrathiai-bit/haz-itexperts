// app/api/contact/route.js
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// --- email config ---
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const MAIL_TO = process.env.MAIL_TO || "support@supremeitexperts.com";
const MAIL_CC = process.env.MAIL_CC || "";
const MAIL_FROM = process.env.MAIL_FROM || "Supreme IT Experts <onboarding@resend.dev>";

// ✅ Prefer server-only SITE_URL, fallback to NEXT_PUBLIC_SITE_URL (works on Vercel)
const SITE_URL = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://supremeitexperts.com").replace(
  /\/$/,
  ""
);

// Default landing page (absolute)
const LP = new URL("/ads/allentown-it-support", SITE_URL).toString();

// Self-booking short link (redirects to the Google Calendar booking page, see next.config.mjs)
const BOOK_URL = new URL("/book", SITE_URL).toString();

// --- utils ---
function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const cap = (s = "", n = 2000) => String(s).slice(0, n);
const norm = (s = "") => cap(String(s).trim(), 2000);
const isEmail = (s = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).trim());

function splitList(v = "") {
  return String(v)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function readBody(req) {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) return await req.json();
  try {
    const fd = await req.formData();
    return Object.fromEntries(fd.entries());
  } catch {
    return {};
  }
}

// ✅ Always redirect relative URLs on same canonical domain
function makeRedirect(req, url, params) {
  const base = req.nextUrl?.origin || SITE_URL;

  const u = new URL(url || "/", base);
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));

  // Optional: enforce non-www on redirects too
  if (u.hostname.startsWith("www.")) u.hostname = u.hostname.replace(/^www\./, "");

  // Optional: enforce https
  u.protocol = "https:";

  return Response.redirect(u.toString(), 303);
}

// ----------------------------------
// POST handler
// ----------------------------------
export async function POST(req) {
  const accept = (req.headers.get("accept") || "").toLowerCase();
  const wantsJson = accept.includes("application/json") || accept.includes("text/json");

  try {
    const body = await readBody(req);

    const redirectTo = body.redirectTo ? String(body.redirectTo) : LP;

    // honeypot
    if (body.website || body.hp) {
      if (wantsJson) return Response.json({ ok: true, spam: true }, { status: 200 });
      return makeRedirect(req, redirectTo, { sent: "1" });
    }

    const name = norm(body.name);
    const email = norm((body.email || "").toLowerCase());
    const phone = norm(body.phone);
    const message = cap(norm(body.message), 5000);

    if (!name || !email) {
      if (wantsJson) return Response.json({ ok: false, error: "missing" }, { status: 400 });
      return makeRedirect(req, redirectTo, { error: "missing" });
    }

    if (!isEmail(email)) {
      if (wantsJson) return Response.json({ ok: false, error: "invalidEmail" }, { status: 400 });
      return makeRedirect(req, redirectTo, { error: "invalidEmail" });
    }

    if (!resend) {
      if (wantsJson) return Response.json({ ok: false, error: "mailConfig" }, { status: 500 });
      return makeRedirect(req, redirectTo, { error: "mailConfig" });
    }

    const subject = `New IT Assessment lead — ${name}`;
    const text = [
      "New lead from website:",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      "",
      "Message:",
      message || "(no message)",
      "",
      `Source: ${body.source || "contact-page"}`,
      `Timestamp: ${new Date().toISOString()}`,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.5">
        <h2 style="margin:0 0 8px 0">New IT Assessment lead</h2>
        <p><strong>Name:</strong> ${esc(name)}<br/>
           <strong>Email:</strong> ${esc(email)}<br/>
           ${phone ? `<strong>Phone:</strong> ${esc(phone)}<br/>` : ""}</p>
        <p style="white-space:pre-wrap"><strong>Message</strong><br/>${esc(message || "(no message)")}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
        <p style="color:#667085;font-size:12px">Source: ${esc(body.source || "contact-page")} • Sent ${esc(
          new Date().toLocaleString()
        )}</p>
      </div>`;

    const toList = splitList(MAIL_TO);
    const ccList = splitList(MAIL_CC);

    await resend.emails.send({
      from: MAIL_FROM,
      to: toList,
      ...(ccList.length ? { cc: ccList } : {}),
      subject,
      text,
      html,
      replyTo: email,
    });

    // Auto-reply (best-effort)
    try {
      await resend.emails.send({
        from: MAIL_FROM,
        to: email,
        subject: "We received your request — Supreme IT Experts",
        text: `Hi ${name || "there"},

Thanks for reaching out. We received your message and will get back shortly.

If you would rather pick a time for your free 30-minute call yourself, early evenings and Saturday mornings are open here:
${BOOK_URL}

— Supreme IT Experts
Phone: +1 610-500-9209`,
        html: `
          <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.5">
            <p>Hi ${esc(name) || "there"},</p>
            <p>Thanks for reaching out. We received your message and will get back shortly.</p>
            <p>If you would rather pick a time for your free 30-minute call yourself, early evenings and Saturday mornings are open here:
               <a href="${esc(BOOK_URL)}">${esc(BOOK_URL.replace(/^https:\/\//, ""))}</a></p>
            <p style="margin:12px 0 0 0">— <strong>Supreme IT Experts</strong><br/>Phone: +1 610-500-9209</p>
          </div>
        `,
      });
    } catch (autoErr) {
      console.warn("Auto-reply failed (non-fatal):", autoErr);
    }

    if (wantsJson) return Response.json({ ok: true }, { status: 200 });
    return makeRedirect(req, redirectTo, { sent: "1" });
  } catch (e) {
    console.error("Contact form error:", e);
    if (wantsJson) return Response.json({ ok: false, error: "server" }, { status: 500 });
    return makeRedirect(req, LP, { error: "server" });
  }
}

export async function GET() {
  return new Response("Method Not Allowed", {
    status: 405,
    headers: { Allow: "POST" },
  });
}
