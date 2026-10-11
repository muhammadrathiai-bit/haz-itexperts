// components/Footer.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/siteConfig";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import TrackedEmailLink from "@/components/TrackedEmailLink";

function SocialLink({ href, label, children }) {
  const disabled = !href || href === "#";

  return (
    <a
      href={disabled ? "#" : href}
      aria-label={label}
      target={disabled ? undefined : "_blank"}
      rel={disabled ? undefined : "noopener noreferrer"}
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-xl",
        "border border-white/10 bg-white/[0.02] text-slate-200 transition",
        "hover:bg-white/[0.06] hover:text-cyan-300 hover:border-white/20",
        "focus:outline-none focus:ring-2 focus:ring-cyan-300/30 focus:ring-offset-0",
        disabled ? "opacity-40 pointer-events-none" : "",
      ].join(" ")}
    >
      {children}
    </a>
  );
}

function cleanTel(p) {
  const s = String(p || "").trim();
  if (!s) return "";
  const cleaned = s.replace(/[^\d+]/g, "").replace(/\++/g, "+");
  if (!cleaned) return "";
  return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
}

function isUkRolloutOn() {
  const v = String(process.env.NEXT_PUBLIC_UK_ROLLOUT || "").toLowerCase().trim();
  return v === "on" || v === "true" || v === "1";
}

export default function Footer({ className = "" }) {
  const pathname = usePathname();
  const routeIsUk = pathname === "/uk" || pathname.startsWith("/uk/");

  const UK_ENABLED = isUkRolloutOn();
  const isUk = UK_ENABLED && routeIsUk;

  const year = new Date().getFullYear();
  const s = site?.socials || {};

  // ✅ Email same for US + UK (no Gmail fallback)
  const email = site?.email || "support@supremeitexperts.com";

  // ✅ Phones: US default, UK override (only if UK enabled + on UK route)
  const hidePhone = site?.hidePhone;
  const usPhoneRaw = site?.phone || "+1 610-500-9209";
  const ukPhoneRaw = "+92 305 5249093";

  const phoneRaw = isUk ? ukPhoneRaw : usPhoneRaw;
  const phoneE164 = cleanTel(phoneRaw);

  // ✅ CTA changes per region
  const ctaHref = isUk ? "/uk/contact" : (site?.assessmentHref || "/lp/allentown#claim");
  const ctaText = isUk ? "Book a Call" : (site?.cta || "Get a Free IT Assessment");

  const tagline = isUk
    ? "UK-focused IT support & cybersecurity — clear deliverables, friendly support, and security-first coverage."
    : "Managed IT & Cybersecurity for businesses in Allentown, Macungie & Emmaus — fast, friendly, fixed-fee.";

  const hoursText = isUk
    ? "Mon–Fri 9:00 AM – 6:00 PM (UK) • Support available"
    : "Mon–Fri 9:00 AM – 6:00 PM ET • Calls answered around the clock";

  return (
    <footer className={`site-footer mt-12 bg-[#0b1220] border-t border-white/10 ${className}`}>
      <div className="h-[2px] bg-gradient-to-r from-cyan-500/40 via-fuchsia-500/30 to-cyan-500/40" />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* Left */}
          <div className="space-y-3">
            <div className="text-xl font-extrabold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400">
                Supreme
              </span>{" "}
              <span className="text-slate-100">IT</span>{" "}
              <span className="text-slate-100">Experts</span>
            </div>

            <p className="text-slate-300 max-w-xl">{tagline}</p>

            <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-4">
              <TrackedEmailLink
                email={email}
                source="footer"
                placement={isUk ? "footer_email_uk" : "footer_email_us"}
                className="text-slate-200 hover:text-cyan-300 transition"
              >
                {email}
              </TrackedEmailLink>

              {!hidePhone ? (
                <>
                  <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-slate-500/70" />

                  <TrackedPhoneLink
                    phone={phoneE164 || phoneRaw}
                    source="footer"
                    placement={isUk ? "footer_phone_uk" : "footer_phone_us"}
                    className="text-slate-200 hover:text-cyan-300 transition whitespace-nowrap"
                  >
                    {phoneRaw}
                  </TrackedPhoneLink>
                </>
              ) : null}
            </div>

            <div className="text-xs text-slate-200">{hoursText}</div>

            {!isUk ? (
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <Link href="/plans" className="text-slate-200 hover:text-cyan-300 transition">
                  Plans &amp; prices
                </Link>
                <Link href="/plans/soho" className="text-slate-200 hover:text-cyan-300 transition">
                  Small office plan
                </Link>
                <Link href="/plans/personal" className="text-slate-200 hover:text-cyan-300 transition">
                  Home computer plan
                </Link>
              </div>
            ) : null}

            {/* ✅ Footer region switch — only if UK enabled */}
            {UK_ENABLED && (
              <div className="pt-2 text-xs text-slate-300">
                {isUk ? (
                  <Link href="/" className="hover:text-cyan-300 transition">
                    Switch to US site →
                  </Link>
                ) : (
                  <Link href="/uk" className="hover:text-cyan-300 transition">
                    Switch to UK site →
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Right */}
          <div className="space-y-4 lg:text-right">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold
                         bg-gradient-to-r from-cyan-400/20 via-fuchsia-400/20 to-cyan-400/20
                         border border-white/10 text-slate-100 hover:bg-white/[0.06] transition"
            >
              {ctaText}
            </Link>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              <SocialLink href={s.linkedin} label="LinkedIn">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.27 2.3-2.6 4.73-2.6C21.6 7.6 24 10 24 14.3V24h-5v-8.4c0-2-.04-4.6-2.8-4.6-2.8 0-3.2 2.2-3.2 4.5V24H8z" />
                </svg>
              </SocialLink>

              <SocialLink href={s.facebook} label="Facebook">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.9h-2.33V22C18.34 21.2 22 17.06 22 12.07z" />
                </svg>
              </SocialLink>

              <SocialLink href={s.instagram} label="Instagram">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Z" />
                  <path d="M12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Z" />
                  <circle cx="17.2" cy="6.8" r="1.3" />
                </svg>
              </SocialLink>

              <SocialLink href={s.x} label="X">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M18.244 2H21l-6.86 7.85L22 22h-6.9l-4.86-6.47L4.7 22H3.1l7.52-8.64L2 2h6.9l4.52 6.02L18.244 2z" />
                </svg>
              </SocialLink>

              <SocialLink href={s.tiktok} label="TikTok">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M21 8.5a7.5 7.5 0 0 1-5.2-2.1V16a5.9 5.9 0 1 1-5.9-5.9c.3 0 .7 0 1 .1V13a2.9 2.9 0 1 0 2.1 2.8V2h2a5.5 5.5 0 0 0 5 3.2V8.5z" />
                </svg>
              </SocialLink>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-white/10 text-center text-xs text-slate-200">
          © {year} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
