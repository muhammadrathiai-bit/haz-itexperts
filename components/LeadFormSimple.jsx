"use client";

import { useMemo, useState } from "react";
import { Mail, Phone, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { site } from "@/lib/siteConfig";
import { track as gaTrack } from "@/lib/track";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

function cleanTel(p) {
  const s = String(p || "").trim();
  if (!s) return "";
  const cleaned = s.replace(/[^\d+]/g, "").replace(/\++/g, "+");
  if (!cleaned) return "";
  return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
}

const buildMailtoHref = (toEmail, subject, bodyText) => {
  const s = encodeURIComponent(subject || "");
  const b = encodeURIComponent(bodyText || "");
  return `mailto:${toEmail}?subject=${s}&body=${b}`;
};

export default function LeadFormSimple({
  source = "unknown",
  title = "Tell us what’s going on",
  sub = "We’ll reply with clear next steps — no pressure.",
  cta = "Send request",
  compact = false,
  className = "",
  defaultSubject = "Website Contact",
  personal = false, // a private person, not a company: no company field, plain "Email" label
  messagePlaceholder = "",
}) {
  const hidePhone = site?.hidePhone;
  const email = site?.email ?? "support@supremeitexperts.com";
  const phone = site?.phone ?? "+1 610-500-9209";
  const telE164 = cleanTel(phone);

  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const [fallbackMailto, setFallbackMailto] = useState(null); // { href, subject, bodyText }

  const [form, setForm] = useState({
    name: "",
    company: "",
    workEmail: "",
    phone: "",
    message: "",
    website: "", // honeypot
  });

  const [errors, setErrors] = useState({});

  const update = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!personal && !form.company.trim()) next.company = "Enter company name.";
    if (!form.workEmail.trim()) next.workEmail = "Enter your email.";
    else if (!/\S+@\S+\.\S+/.test(form.workEmail.trim())) next.workEmail = "Enter a valid email.";
    if (!form.message.trim()) next.message = "Write 1–2 lines about what you need.";

    setErrors((e) => ({ ...e, ...next }));
    return Object.keys(next).length === 0;
  };

  const payload = useMemo(() => {
    return {
      name: form.name,
      company: personal ? "Home user" : form.company,
      email: form.workEmail,
      phone: form.phone,
      message: form.message,
      source,
      page: typeof window !== "undefined" ? window.location.href : "",
      tz: "America/New_York",
    };
  }, [form, source, personal]);

  const onSubmit = async (e) => {
    e?.preventDefault();
    if (!validate()) return;

    // bot trap
    if (form.website?.trim()) {
      setDone(true);
      return;
    }

    setSending(true);
    setFallbackMailto(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok || res.status === 303) {
        gaTrack("contact_submit", { source, form: "simple" });
        setDone(true);
        setSending(false);
        return;
      }
      throw new Error("api failed");
    } catch {
      gaTrack("contact_submit", { source, form: "simple", fallback: "mailto" });

      const subject = personal ? `${defaultSubject} — ${form.name}` : `${defaultSubject} — ${form.company}`;
      const bodyLines = [
        `Name: ${form.name}`,
        `Company: ${personal ? "Home user" : form.company}`,
        `Email: ${form.workEmail}`,
        `Phone: ${form.phone || "-"}`,
        "",
        "Message:",
        form.message,
      ];
      const bodyText = bodyLines.join("\n");
      const href = buildMailtoHref(email, subject, bodyText);

      setFallbackMailto({ href, subject, bodyText });
      setDone(true);
      setSending(false);
    }
  };

  return (
    <div
      className={cx(
        "rounded-2xl border border-white/10 bg-white/5",
        compact ? "p-5" : "p-6 md:p-7",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={cx("font-semibold", compact ? "text-base" : "text-lg")}>{title}</h3>
          <p className="text-sm text-slate-300 mt-1">{sub}</p>
        </div>

        {/* small trust hint */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
          <CheckCircle2 className="h-4 w-4 text-cyan-300" />
          Reply during business hours
        </div>
      </div>

      {/* success / fallback */}
      {done ? (
        fallbackMailto ? (
          <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm">
            <div className="font-medium text-slate-100 inline-flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-200" />
              Couldn’t submit automatically
            </div>
            <p className="text-slate-300 mt-1">
              Click to email us (or copy details into an email).
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={fallbackMailto.href}
                className="rounded-lg px-4 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center gap-2"
              >
                <Mail className="h-4 w-4" /> Email us
              </a>
              {!hidePhone && telE164 ? (
                <a
                  href={`tel:${telE164}`}
                  className="rounded-lg px-4 py-2 text-sm bg-white/10 ring-1 ring-white/20 hover:bg-white/20 inline-flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" /> Call {phone}
                </a>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm">
            <div className="font-medium text-slate-100">Thanks — received.</div>
            <p className="text-slate-300 mt-1">We’ll reply with next steps.</p>
          </div>
        )
      ) : (
        <form onSubmit={onSubmit} className="mt-5 grid gap-4">
          {/* honeypot */}
          <input
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">Your name</label>
              <input
                className={cx(
                  "mt-1 w-full rounded-lg bg-transparent border px-3 py-2 text-sm outline-none",
                  errors.name ? "border-red-500/70" : "border-white/20 focus:border-cyan-300/50"
                )}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your full name"
                autoComplete="name"
              />
              {errors.name ? <p className="mt-1 text-xs text-red-400">{errors.name}</p> : null}
            </div>

            {!personal ? (
              <div>
                <label className="text-xs text-slate-400">Company</label>
                <input
                  className={cx(
                    "mt-1 w-full rounded-lg bg-transparent border px-3 py-2 text-sm outline-none",
                    errors.company ? "border-red-500/70" : "border-white/20 focus:border-cyan-300/50"
                  )}
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="Company name"
                  autoComplete="organization"
                />
                {errors.company ? <p className="mt-1 text-xs text-red-400">{errors.company}</p> : null}
              </div>
            ) : null}

            <div>
              <label className="text-xs text-slate-400">{personal ? "Email" : "Work email"}</label>
              <input
                className={cx(
                  "mt-1 w-full rounded-lg bg-transparent border px-3 py-2 text-sm outline-none",
                  errors.workEmail ? "border-red-500/70" : "border-white/20 focus:border-cyan-300/50"
                )}
                value={form.workEmail}
                onChange={(e) => update("workEmail", e.target.value)}
                placeholder={personal ? "you@example.com" : "you@company.com"}
                autoComplete="email"
                type="email"
              />
              {errors.workEmail ? <p className="mt-1 text-xs text-red-400">{errors.workEmail}</p> : null}
            </div>

            {!hidePhone ? (
              <div>
                <label className="text-xs text-slate-400">Phone (optional)</label>
                <input
                  className="mt-1 w-full rounded-lg bg-transparent border border-white/20 focus:border-cyan-300/50 px-3 py-2 text-sm outline-none"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="e.g. +1 (610) 555-1234"
                  autoComplete="tel"
                />
              </div>
            ) : null}
          </div>

          <div>
            <label className="text-xs text-slate-400">Message</label>
            <textarea
              className={cx(
                "mt-1 w-full rounded-lg bg-transparent border px-3 py-2 text-sm outline-none",
                errors.message ? "border-red-500/70" : "border-white/20 focus:border-cyan-300/50"
              )}
              rows={5}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder={
                messagePlaceholder ||
                "Example: Email security + backups + helpdesk. Users ~40. Want a quick audit and 90-day plan."
              }
            />
            {errors.message ? <p className="mt-1 text-xs text-red-400">{errors.message}</p> : null}
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs text-slate-400">
              We’ll never sell or share your data.
            </div>

            <button
              type="submit"
              disabled={sending}
              className={cx(
                "rounded-lg px-5 py-2.5 text-sm font-semibold border transition inline-flex items-center gap-2",
                sending
                  ? "border-white/10 text-slate-400"
                  : "border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              )}
            >
              {sending ? "Sending…" : cta} {!sending && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
