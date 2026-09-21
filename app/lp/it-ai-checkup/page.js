// app/lp/it-ai-checkup/page.js
import Link from "next/link";
import { CheckCircle2, Clock, FileText, ShieldCheck, Phone } from "lucide-react";
import { site } from "@/lib/siteConfig";
import { BASE_URL } from "@/lib/seoIds";
import LeadFormSimple from "@/components/LeadFormSimple";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const canonical = `${BASE_URL}/lp/it-ai-checkup`;
  // Keep brand out (layout template already adds it)
  const title = "Free 30-Minute IT + AI Checkup for Local Businesses — Havertown, Broomall & Delaware County";
  const description =
    "A free 30-minute Checkup by video call, phone or onsite, with early-evening and Saturday times. You get a one-page report: your top 3 time and money leaks, your top 3 security gaps, and what we would fix first at a fixed price. No obligation.";
  const ogImage = `${BASE_URL}/og-image.png?v=7`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: brand,
      type: "website",
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: brand }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

const GET = [
  "Your top 3 time and money leaks: missed calls, slow follow-ups, re-typing, chasing paperwork",
  "Your top 3 security gaps: email impersonation, backups, logins, old devices",
  "What we would fix first, with a fixed price, so there are no surprises",
  "A plain one-page report within 48 hours. It is yours to keep either way",
];

const STEPS = [
  { Icon: Clock, t: "30 minutes, your way", d: "By video call, by phone, or onsite in Delaware County. Early-evening and Saturday times are available, so you do not have to stop work for it. No laptops to hand over, no passwords needed." },
  { Icon: ShieldCheck, t: "We look and we ask", d: "How calls, leads, email and paperwork flow today, plus a check of the public security records for your domain." },
  { Icon: FileText, t: "One page, in plain English", d: "Within 48 hours you get the report. If your setup is solid, it says so. If something needs fixing, you see the price first." },
];

const FAQS = [
  {
    q: "Is it really free? What is the catch?",
    a: "It is free and there is no obligation. We are building our client base in Delaware County, and the Checkup is how we meet business owners. Some of what we find will be fixes your current IT person or office manager can do without us. The report says which.",
  },
  {
    q: "Who is it for?",
    a: "Owner-run businesses with roughly 3 to 50 people: contractors and home services, auto shops, dental and veterinary offices, accounting, legal, insurance and property management.",
  },
  {
    q: "Do you need access to our systems?",
    a: "No. The Checkup is a conversation and a walk-through, plus records anyone can read publicly. We never ask for passwords at this stage.",
  },
  {
    q: "We already have an IT company. Is that a problem?",
    a: "Not at all. You can keep your IT provider and use us only for the AI and automation side, or simply use the report as a second opinion.",
  },
  {
    q: "What happens after the report?",
    a: "That is up to you. If one fix is worth doing, we quote it at a fixed price. Founding clients get our 60-day promise: we agree on one number to improve, and if it has not improved within 60 days of go-live, we keep working on it at no charge for up to 60 more days. The terms are written into the project agreement.",
  },
];

export default function ItAiCheckupLanding() {
  const source = "lp-it-ai-checkup";
  const phone = site?.phone || "+1 610-500-9209";
  const phoneShown = String(phone).replace(/^\+1\s?/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO + FORM */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 size-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-12">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Free · 30 minutes · video, phone or onsite</div>
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-[1.08]">
                The free{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">IT + AI Checkup</span>
              </h1>
              <p className="mt-4 text-slate-200 max-w-[62ch]">
                Find out where your business is losing time, losing customers, or taking a risk it does not know about.
                One short conversation, one plain page, no obligation.
              </p>

              <ul className="mt-6 space-y-3">
                {GET.map((g) => (
                  <li key={g} className="flex gap-3 text-sm md:text-base text-slate-200">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-cyan-300" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3 text-sm">
                <TrackedPhoneLink
                  phone={phone}
                  source={source}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10 transition"
                >
                  <Phone className="h-4 w-4" /> Prefer to call? {phoneShown}
                </TrackedPhoneLink>
                <Link href="/tools/email-security-check" className="text-cyan-300 hover:underline">
                  Or check your email security now (10 seconds) →
                </Link>
              </div>
            </div>

            <div id="book" className="scroll-mt-28">
              <LeadFormSimple
                source={source}
                title="Book your free Checkup"
                sub="Tell us the best day and time. Early evenings and Saturdays are fine. We confirm by email or phone within one business day."
                cta="Request my Checkup"
                defaultSubject="Free IT + AI Checkup request"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">How it works</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {STEPS.map(({ Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Icon className="h-6 w-6 text-cyan-300" />
              <div className="mt-3 font-semibold text-slate-100">{t}</div>
              <p className="mt-2 text-sm text-slate-300">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE USUALLY FIND */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">What we usually find</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-wide text-cyan-300/80">Time and money</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-300 list-disc pl-5">
              <li>Calls that go to voicemail while everyone is on a job, and the caller tries the next company</li>
              <li>Estimates and inquiries that never get a second follow-up</li>
              <li>Happy customers who were never asked for a review</li>
              <li>Staff re-typing the same details from forms, invoices and emails into another system</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-wide text-cyan-300/80">Security</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-300 list-disc pl-5">
              <li>A domain anyone can send email as. About nine in ten local domains we reviewed had this gap</li>
              <li>Backups nobody has tested by restoring a file</li>
              <li>Shared passwords and no two-step login on email</li>
              <li>Staff pasting customer details into free AI tools with no policy in place</li>
            </ul>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Source for “nine in ten”: our review of public DNS records for 135 local business domains, September 2026. No business is ever named.
        </p>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">Fair questions</h2>
        <div className="mt-6 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/5 p-5">
              <summary className="cursor-pointer list-none font-semibold text-slate-100 flex items-center justify-between gap-4">
                {f.q}
                <span className="text-cyan-300 transition group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8">
          <a
            href="#book"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2.5 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
          >
            Book the free Checkup ↑
          </a>
        </div>
      </section>
    </main>
  );
}
