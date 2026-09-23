// lib/retellCallEmail.js
// Turns a Retell "call_analyzed" call object into the summary email for the office inbox.
// Kept free of Next.js imports so it can be tested on its own.

const TZ = "America/New_York";

export function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Callers sometimes read out card or ID numbers even when asked not to. Retell redacts these in storage;
// this is a second pass so they never land in the inbox. Phone numbers (10-11 digits) are left alone.
export function scrub(s = "") {
  return String(s)
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[number removed]")
    .replace(/\b\d(?:[ -]?\d){11,18}\b/g, "[number removed]");
}

const str = (v, n = 500) => scrub(v == null ? "" : String(v).trim()).slice(0, n);
const yes = (v) => v === true || String(v).toLowerCase() === "true" || String(v).toLowerCase() === "yes";
const oneLine = (s) => String(s).replace(/[\r\n]+/g, " ").trim();

export function formatPhone(p = "") {
  const d = String(p).replace(/\D/g, "");
  const ten = d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
  if (ten.length !== 10) return String(p || "").trim();
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;
}

function telHref(p = "") {
  const d = String(p).replace(/\D/g, "");
  if (d.length === 10) return `tel:+1${d}`;
  if (d.length === 11 && d.startsWith("1")) return `tel:+${d}`;
  return "";
}

function when(ms) {
  if (!ms) return "";
  return new Date(Number(ms)).toLocaleString("en-US", {
    timeZone: TZ,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function duration(call) {
  const ms = Number(call.duration_ms) || (Number(call.end_timestamp) - Number(call.start_timestamp)) || 0;
  if (!(ms > 0)) return "";
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function buildCallEmail(call = {}) {
  const a = call.call_analysis || {};
  const c = a.custom_analysis_data || {};

  const urgent = yes(c.urgent);
  const wantsCheckup = yes(c.wants_checkup);
  const name = str(c.caller_name, 120);
  const business = str(c.business_name, 160);
  const fromNumber = String(call.from_number || "").trim();
  const callback = str(c.callback_number, 40) || fromNumber;
  const email = str(c.email, 160).toLowerCase();
  const reason = str(c.reason, 1000);
  const bestTime = str(c.best_time, 200);
  const callerType = str(c.caller_type, 40);
  const summary = str(a.call_summary, 2000);
  const transcript = str(call.transcript, 12000);
  const started = when(call.start_timestamp);
  const length = duration(call);

  const who = name || (fromNumber ? formatPhone(fromNumber) : "Unknown caller");
  const subject = oneLine(
    `${urgent ? "URGENT - " : ""}AI front desk call: ${who}${business ? ` (${business})` : ""}${wantsCheckup ? " - wants the Checkup" : ""}`
  ).slice(0, 160);

  const rows = [
    ["Name", name],
    ["Business", business],
    ["Call back on", callback ? formatPhone(callback) : ""],
    ["Email", email],
    ["What they need", reason],
    ["Best time", bestTime],
    ["Wants the Checkup", wantsCheckup ? "Yes" : "No"],
    ["Urgent", urgent ? "YES" : "No"],
    ["Caller type", callerType],
    ["Called from", fromNumber ? formatPhone(fromNumber) : ""],
    ["When (ET)", started],
    ["Length", length],
    ["Ended because", str(call.disconnection_reason, 80)],
    ["Sentiment", str(a.user_sentiment, 20)],
    ["In voicemail", a.in_voicemail === true ? "Yes" : ""],
    ["Retell call ID", str(call.call_id, 80)],
  ]
    .map(([k, v]) => [k, oneLine(v)])
    .filter(([, v]) => v);

  const text = [
    urgent ? "URGENT: the caller reported an urgent problem. Call back as soon as you can." : "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Summary:",
    summary || "(no summary)",
    "",
    "Transcript:",
    transcript || "(no transcript)",
    "",
    "Recording and full log: dashboard.retellai.com > Call History (search the call ID).",
  ]
    .filter((l, i) => l !== "" || i > 0)
    .join("\n");

  const tel = telHref(callback);
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.5;color:#101828">
      ${urgent ? `<p style="margin:0 0 12px 0;padding:10px 12px;border-radius:8px;background:#fef3f2;color:#b42318;font-weight:700">URGENT: the caller reported an urgent problem. Call back as soon as you can.</p>` : ""}
      <h2 style="margin:0 0 8px 0">AI front desk call: ${esc(who)}</h2>
      ${tel ? `<p style="margin:0 0 12px 0"><a href="${esc(tel)}" style="display:inline-block;padding:8px 14px;border-radius:8px;background:#0e7490;color:#fff;text-decoration:none;font-weight:600">Call back ${esc(formatPhone(callback))}</a></p>` : ""}
      <table style="border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:3px 12px 3px 0;color:#667085;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:3px 0">${esc(v)}</td></tr>`
          )
          .join("")}
      </table>
      <h3 style="margin:16px 0 4px 0;font-size:15px">Summary</h3>
      <p style="margin:0;white-space:pre-wrap">${esc(summary || "(no summary)")}</p>
      <h3 style="margin:16px 0 4px 0;font-size:15px">Transcript</h3>
      <pre style="margin:0;white-space:pre-wrap;font-family:inherit;font-size:13px;color:#344054">${esc(transcript || "(no transcript)")}</pre>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
      <p style="color:#667085;font-size:12px;margin:0">Recording and full log: dashboard.retellai.com &gt; Call History (search the call ID).</p>
    </div>`;

  const replyTo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined;
  return { subject, text, html, replyTo };
}
