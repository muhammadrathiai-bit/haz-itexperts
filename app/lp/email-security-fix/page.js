// app/lp/email-security-fix/page.js
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Phone } from "lucide-react";
import { site } from "@/lib/siteConfig";
import { BASE_URL } from "@/lib/seoIds";
import LeadFormSimple from "@/components/LeadFormSimple";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const canonical = `${BASE_URL}/lp/email-security-fix`;
  // Keep brand out (layout template already adds it)
  const title = "Email Security Fix-in-a-Day — SPF, DKIM & DMARC Set Up Properly, Fixed Price";
  const description =
    "Stop scammers sending email as your business. We set up SPF, DKIM and DMARC properly and take the policy to full enforcement in safe steps. Fixed price, done remotely anywhere in the US.";
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

const INCLUDED = [
  "One email domain, plus a free lock-down of up to 3 parked domains in the same DNS account",
  "A full list of every system that sends email as you: mailboxes, website forms, invoicing, scheduling, newsletters",
  "One correct SPF record, and DKIM signing switched on for your mailbox provider and up to 3 other senders",
  "A DMARC record with reporting, taken from watch-only to quarantine to reject in safe steps",
  "A before-and-after page, a log of every DNS change, and a rollback snapshot",
];

const STEPS = [
  { t: "Day 1: the hands-on work", d: "Four to six hours on our side, usually about 30 minutes of yours to grant access. We list every sender, fix SPF, switch on DKIM, publish DMARC in watch-only mode, test, and document." },
  { t: "About two weeks later", d: "We read the reports. If every real sender passes, we move the policy to quarantine: fake email starts landing in spam." },
  { t: "Two to four weeks after that", d: "We read the reports again and move to reject: fake email is refused. You get the final before-and-after page." },
];

const FAQS = [
  {
    q: "Why does full protection take a few weeks if the work is one day?",
    a: "Because jumping straight to a strict policy can block your own real email if one sender was missed. The hands-on work is one day. Then we watch the reports and tighten the policy in two short follow-ups. Both follow-ups are included in the price.",
  },
  {
    q: "What access do you need?",
    a: "Temporary access to your DNS (where your domain is managed) and admin access to your email system to switch on signing. We use the least access that gets the job done, log every change, and you can remove our access the moment we finish.",
  },
  {
    q: "What is not included?",
    a: "More than 3 third-party senders, senders that need their vendor's support to enable signing, rebuilding a website form that sends email the wrong way, copier or scanner scan-to-email changes, spam-filter tuning, and moving to a different email provider. We tell you up front if any of these apply and quote them separately.",
  },
  {
    q: "Will this stop all phishing?",
    a: "No, and anyone who says so is overselling. It stops other people sending email that uses your exact domain. It does not stop look-alike domains or scam emails sent to your staff. Those need training, two-step login and filtering, which we cover in managed IT.",
  },
  {
    q: "Can you do this if we are not in Pennsylvania?",
    a: "Yes. The whole job is done remotely, so we do it for businesses anywhere in the United States.",
  },
];

export default function EmailSecurityFixLanding() {
  const source = "lp-email-security-fix";
  const phone = site?.phone || "+1 610-500-9209";
  const phoneShown = String(phone).replace(/^\+1\s?/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Email Security Fix-in-a-Day",
        serviceType: "SPF, DKIM and DMARC setup to enforcement",
        provider: { "@type": "Organization", name: site?.name || "Supreme IT Experts", url: BASE_URL },
        areaServed: { "@type": "Country", name: "United States" },
        offers: { "@type": "Offer", price: "300", priceCurrency: "USD" },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 size-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-12">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Fixed price · done remotely · anywhere in the US</div>
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-[1.08]">
                Email Security{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">Fix-in-a-Day</span>
              </h1>
              <p className="mt-4 text-slate-200 max-w-[62ch]">
                Stop scammers sending email that looks like it comes from your business. We set up SPF, DKIM and DMARC
                properly, then take the policy to full enforcement in safe steps so your real email never gets lost.
              </p>

              <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-400/5 p-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <div className="text-3xl font-extrabold text-slate-100">$300</div>
                  <div className="text-sm text-slate-300">founding-client price · regular price $450</div>
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  One fixed price per email domain. Both follow-up steps are included. No monthly fee and no contract.
                </p>
              </div>

              <ul className="mt-6 space-y-3">
                {INCLUDED.map((g) => (
                  <li key={g} className="flex gap-3 text-sm md:text-base text-slate-200">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-cyan-300" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3 text-sm">
                <Link
                  href="/tools/email-security-check"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10 transition"
                >
                  <ShieldCheck className="h-4 w-4" /> Not sure you need it? Check your domain free
                </Link>
                <TrackedPhoneLink phone={phone} source={source} className="inline-flex items-center gap-2 text-cyan-300 hover:underline">
                  <Phone className="h-4 w-4" /> {phoneShown}
                </TrackedPhoneLink>
              </div>
            </div>

            <div id="book" className="scroll-mt-28">
              <LeadFormSimple
                source={source}
                title="Request the fix"
                sub="Tell us your domain and who hosts your email, if you know. We reply within one business day with next steps. Nothing is charged until you approve a written scope."
                cta="Request the fix"
                defaultSubject="Email Security Fix-in-a-Day request"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">How it works</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {STEPS.map((s, i) => (
            <div key={s.t} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-cyan-300 text-sm font-semibold">Step {i + 1}</div>
              <div className="mt-1 font-semibold text-slate-100">{s.t}</div>
              <p className="mt-2 text-sm text-slate-300">{s.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400">We ran these same steps on our own domain before offering them to anyone else.</p>
      </section>

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
            Request the fix ↑
          </a>
        </div>
      </section>
    </main>
  );
}
