"use server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// simple email validator
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactEmail(payload) {
  try {
    if (payload?.website) return { ok: true, skipped: "honeypot" };

    const hasEnv =
      !!process.env.RESEND_API_KEY &&
      !!process.env.MAIL_TO &&
      !!process.env.MAIL_FROM;

    if (!hasEnv) {
      console.log("[MAIL:DEV-FAKE]", payload);
      return { ok: true, dev: true };
    }

    const name = (payload?.name || "").trim();
    const workEmail = (payload?.workEmail || "").trim();
    const message = (payload?.message || "").trim();
    const source = payload?.source || "-";

    // Build a valid reply_to only if email passes basic format
    const replyTo = EMAIL_RE.test(workEmail)
      ? (name ? `${name} <${workEmail}>` : workEmail)
      : undefined;

    const subject = `New Contact — ${name || "Unknown"}`;
    const text = [
      `Name: ${name || "-"}`,
      `Work Email: ${workEmail || "-"}`,
      `Source: ${source}`,
      "",
      "Message:",
      message || "-",
      "",
      `Submitted: ${new Date().toISOString()}`,
    ].join("\n");

    const html = `
      <h2>New Contact</h2>
      <p><b>Name:</b> ${name || "-"}</p>
      <p><b>Work Email:</b> ${workEmail || "-"}</p>
      <p><b>Source:</b> ${source}</p>
      <hr/>
      <p>${(message || "-").replace(/\n/g, "<br/>")}</p>
      <hr/>
      <small>Submitted: ${new Date().toISOString()}</small>
    `;

    const res = await resend.emails.send({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      ...(replyTo ? { replyTo } : {}), // only include if valid (the SDK maps replyTo to reply_to)
      subject,
      text,
      html,
    });

    if (res?.error) {
      console.error("[MAIL ERROR]", res.error);
      return { ok: false, error: res.error };
    }
    return { ok: true, id: res?.data?.id };
  } catch (e) {
    console.error("[MAIL CRASH]", e);
    return { ok: false, error: String(e) };
  }
}
