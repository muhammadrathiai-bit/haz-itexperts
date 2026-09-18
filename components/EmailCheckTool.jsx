"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ShieldCheck, ShieldAlert, ShieldQuestion, Search, ArrowRight, Phone } from "lucide-react";
import { track } from "@/lib/track";
import { site } from "@/lib/siteConfig";

const LEVELS = {
  protected: {
    tone: "emerald",
    Icon: ShieldCheck,
    label: "Protected",
    line: "Email that pretends to be this domain is told to be rejected. This is the setup we aim for.",
  },
  mostly: {
    tone: "emerald",
    Icon: ShieldCheck,
    label: "Mostly protected",
    line: "Fake email from this domain is sent to spam or blocked. One step is left to make it airtight.",
  },
  partial: {
    tone: "amber",
    Icon: ShieldAlert,
    label: "Partly protected",
    line: "A policy exists, but it only applies to a share of the fake email. The rest still gets through.",
  },
  monitoring: {
    tone: "amber",
    Icon: ShieldAlert,
    label: "Watching, not blocking",
    line: "The domain asks for reports but tells mail servers to deliver fake email anyway. Anyone can still send as you.",
  },
  exposed: {
    tone: "rose",
    Icon: ShieldAlert,
    label: "Not protected",
    line: "There is no working policy. A scammer can send email that looks like it comes from this domain, and nothing tells mail servers to stop it.",
  },
  unknown: {
    tone: "slate",
    Icon: ShieldQuestion,
    label: "Could not read the records",
    line: "The DNS lookup did not answer in time. Try again in a minute.",
  },
};

const TONES = {
  emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
  amber: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  rose: "border-rose-400/30 bg-rose-400/10 text-rose-200",
  slate: "border-white/15 bg-white/5 text-slate-200",
};

function dmarcText(d) {
  const from = d.inheritedFrom ? ` (inherited from ${d.inheritedFrom})` : "";
  switch (d.status) {
    case "reject":
      return { ok: true, text: `Policy is "reject"${from}. Fake email is refused.` };
    case "quarantine":
      return d.pct < 100
        ? { ok: false, text: `Policy is "quarantine" but only for ${d.pct}% of mail${from}.` }
        : { ok: true, text: `Policy is "quarantine"${from}. Fake email goes to spam. The last step is "reject".` };
    case "none":
      return { ok: false, text: `Policy is "none"${from}. That means watch only: fake email is still delivered.` };
    case "multiple":
      return { ok: false, text: `${d.count} DMARC records found. Mail servers ignore all of them when there is more than one.` };
    case "invalid":
      return { ok: false, text: "A record exists but it is not valid, so mail servers ignore it." };
    default:
      return { ok: false, text: "No DMARC record found." };
  }
}

function spfText(s) {
  switch (s.status) {
    case "strict":
      return { ok: true, text: 'A sender list exists and ends in "-all" (strict).' };
    case "soft":
      return { ok: true, text: 'A sender list exists and ends in "~all" (soft fail). Fine when DMARC is enforced.' };
    case "redirect":
      return { ok: true, text: "A sender list exists (handed off to your mail provider)." };
    case "neutral":
      return { ok: false, text: 'A sender list exists but ends in "?all", which tells mail servers not to judge.' };
    case "open":
      return { ok: false, text: 'The record ends in "+all", which allows anyone to send as this domain.' };
    case "no_all":
      return { ok: false, text: "A record exists but never says what to do with other senders." };
    case "multiple":
      return { ok: false, text: `${s.count} SPF records found. More than one makes SPF fail for everyone.` };
    default:
      return { ok: false, text: "No SPF record found, so there is no list of who may send for this domain." };
  }
}

// Only the domain ever leaves the browser, even if someone types a full email address
function toDomain(input) {
  let d = String(input || "").trim().toLowerCase();
  if (d.includes("@")) d = d.split("@").pop();
  return d
    .replace(/^[a-z][a-z0-9+.-]*:\/\//, "")
    .split(/[/?#:\s]/)[0]
    .replace(/^www\./, "")
    .replace(/\.$/, "");
}

function Row({ name, ok, text, record }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="font-semibold text-slate-100">{name}</div>
        <span
          className={`text-xs rounded-full px-2 py-0.5 border whitespace-nowrap shrink-0 ${
            ok ? "border-emerald-400/30 text-emerald-300 bg-emerald-400/10" : "border-amber-400/30 text-amber-200 bg-amber-400/10"
          }`}
        >
          {ok ? "OK" : "Needs attention"}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-300">{text}</p>
      {record ? (
        <code className="mt-2 block text-xs text-slate-400 break-all rounded-lg bg-black/30 border border-white/5 p-2">{record}</code>
      ) : null}
    </div>
  );
}

export default function EmailCheckTool({ source = "email-check" }) {
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const ran = useRef(false);

  const phone = site?.phone || "+1 610-500-9209";
  const phoneTel = site?.phoneTel || `tel:${String(phone).replace(/[^\d+]/g, "")}`;

  async function run(input) {
    const q = toDomain(input);
    if (!q || busy) return;
    setValue(q);
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/email-check?domain=${encodeURIComponent(q)}`, { headers: { Accept: "application/json" } });
      const data = await res.json();
      if (!res.ok || data?.error) {
        setError(data?.error || "We could not complete the lookup. Please try again.");
      } else {
        setResult(data);
        track("email_check", { source, result_level: data.level, page_location: window.location.origin + window.location.pathname });
      }
    } catch {
      setError("We could not complete the lookup. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  // Shareable links: /tools/email-security-check?domain=yourcompany.com
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    const d = new URLSearchParams(window.location.search).get("domain");
    if (d) {
      setValue(d);
      run(d);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lvl = result ? LEVELS[result.level] || LEVELS.unknown : null;
  const needsHelp = result && !["protected", "unknown"].includes(result.level);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(value);
        }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <label htmlFor="ec-domain" className="sr-only">
          Your business domain or work email
        </label>
        <input
          id="ec-domain"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="yourcompany.com"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          inputMode="url"
          className="flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 outline-none focus:border-cyan-300/50"
        />
        <button
          type="submit"
          disabled={busy || !value.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-200 bg-cyan-400/10 hover:bg-cyan-400/20 transition disabled:opacity-50"
        >
          <Search className="h-4 w-4" />
          {busy ? "Checking…" : "Check my domain"}
        </button>
      </form>
      <p className="mt-2 text-xs text-slate-400">
        Reads public DNS records only. Nothing is installed and nothing is sent to your domain or your mailboxes.
      </p>

      {error ? (
        <div role="alert" className="mt-5 rounded-xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-100">
          {error}
        </div>
      ) : null}

      {result && lvl ? (
        <div className="mt-6" aria-live="polite">
          <div className={`rounded-2xl border p-5 ${TONES[lvl.tone]}`}>
            <div className="flex items-center gap-3">
              <lvl.Icon className="h-7 w-7 shrink-0" />
              <div>
                <div className="text-xs uppercase tracking-wide opacity-80">{result.domain}</div>
                <div className="text-xl md:text-2xl font-extrabold">{lvl.label}</div>
              </div>
            </div>
            <p className="mt-3 text-sm md:text-base text-slate-100/90">{lvl.line}</p>
          </div>

          <div className="mt-4 grid md:grid-cols-3 gap-4">
            <Row name="DMARC (the policy)" {...dmarcText(result.dmarc)} record={result.dmarc.record} />
            <Row name="SPF (who may send)" {...spfText(result.spf)} record={result.spf.record} />
            <Row
              name="Mail provider"
              ok={true}
              text={
                result.receivesMail
                  ? result.provider
                    ? `Email for this domain is handled by ${result.provider}.`
                    : `Email for this domain is handled by ${result.mailHost}.`
                  : "This domain does not receive email. It can still be impersonated, so it should publish a reject policy."
              }
            />
          </div>

          <p className="mt-4 text-xs text-slate-400">
            Not checked here: DKIM signing keys (they cannot be listed from outside) and your spam-filter settings. Both are part of the free Checkup.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="font-semibold text-slate-100">
              {needsHelp ? "This is usually a same-day fix." : "Want a second pair of eyes on the rest?"}
            </div>
            <p className="mt-1 text-sm text-slate-300">
              {needsHelp
                ? "We list every system that sends email for you, switch on signing for each one, then turn the policy up in safe steps so real email never gets lost. The free 30-minute IT + AI Checkup covers this and your top time-wasters, and you keep the one-page report."
                : "The free 30-minute IT + AI Checkup looks at backups, logins, devices and the busywork AI can take off your team. You keep the one-page report."}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={`/lp/it-ai-checkup?source=${encodeURIComponent(source)}`}
                onClick={() =>
                  track("email_check_cta", { source, result_level: result.level, page_location: window.location.origin + window.location.pathname })
                }
                className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
              >
                Book the free Checkup <ArrowRight className="h-4 w-4" />
              </Link>
              {!site?.hidePhone ? (
                <a
                  href={phoneTel}
                  onClick={() => track("call_click", { source, page_location: window.location.origin + window.location.pathname })}
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10 transition"
                >
                  <Phone className="h-4 w-4" /> Call {String(phone).replace(/^\+1\s?/, "")}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
