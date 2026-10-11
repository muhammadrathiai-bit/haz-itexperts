// app/plans/personal/page.js
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck, XCircle } from "lucide-react";
import { site } from "@/lib/siteConfig";
import { BASE_URL } from "@/lib/seoIds";
import { PERSONAL, SERVICE_TERMS, PLAN_ROUTES } from "@/lib/plans";
import LeadFormSimple from "@/components/LeadFormSimple";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { Glow, TierCard, PlainList, PriceRows, Faqs, TermsBlock } from "../_components/PlanParts";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const canonical = `${BASE_URL}${PLAN_ROUTES.personal}`;
  // Keep brand out (layout template already adds it)
  const title = "Home Computer Care Plan — From $36 a Month, $32 for Retired Seniors";
  const description =
    "A monthly care plan for your home PC or Mac: watched, updated and protected, with patient remote help from a real local person. Lower price for retired seniors and students.";
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

// What we will never do, and what we always do. These are promises about our own conduct.
const NEVER = [
  "We never phone you out of the blue to say your computer has a problem",
  "We never put a warning on your screen that tells you to call a number",
  "We never ask to be paid with gift cards, a wire transfer or cryptocurrency",
  "We never connect to your computer unless you asked us to, and you can watch and end the session at any moment",
  "We never ask for your bank password or the code your bank texts you",
];

const ALWAYS = [
  "Written prices, before any work starts",
  "The same person every time: Muhammad, our founder, here in Havertown",
  "A code word that you choose. When we call you, we say it first. If a caller does not know it, hang up",
  "A son, daughter or friend is welcome on any call, and can be the one we talk to if you prefer",
  "Plain words and patience. No question is too small",
];

const FAQS = [
  {
    q: "I am not good with computers. Is this for me?",
    a: "Yes. Most of the work happens quietly in the background: updates, protection and health checks. When you need help, you call or email, we connect while you watch, and we explain what we are doing in plain words.",
  },
  {
    q: "Can I set this up for my mother or father?",
    a: "Yes, and many families do. You can be the contact and the one who pays, and we help your parent directly. With their permission we tell you when something needs attention.",
  },
  {
    q: "Who gets the lower price?",
    a: "Retired seniors and students. Tell us when you ask about the plan. The lower price applies to the monthly plan and to the backup add-ons.",
  },
  {
    q: "What is the difference between the two plans?",
    a: "Basic looks after the computer itself: monitoring, updates, antivirus and web filtering. When you want hands-on help you pay your subscriber rate. Basic + Remote Help also covers the labor for anything we can do remotely, including everyday how-to questions.",
  },
  {
    q: "Is there a contract?",
    a: "The plan runs month to month. If you pay for a year up front, you get one month free.",
  },
  {
    q: "Do you help with phones, tablets and printers?",
    a: "The plan covers PCs and Macs. We do help with phones, tablets, printers and Wi-Fi as separate work at your subscriber rate, and we tell you the cost first.",
  },
  {
    q: "Someone called and said they were from Microsoft. What should I do?",
    a: "Hang up. Microsoft, Apple and your bank do not call to say your computer is infected. Do not let the caller connect to your computer and do not pay anything. If you already did, call your bank right away, then call us and we will help you check the computer.",
  },
];

export default function PersonalPlanPage() {
  const source = "plans-personal";
  const phone = site?.phone || "+1 610-500-9209";
  const phoneShown = String(phone).replace(/^\+1\s?/, "");
  const [basic, remote] = PERSONAL.tiers;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: PERSONAL.name,
        serviceType: "Home computer care plan",
        provider: { "@type": "Organization", name: site?.name || "Supreme IT Experts", url: BASE_URL },
        areaServed: { "@type": "Country", name: "United States" },
        offers: PERSONAL.tiers.map((t) => ({
          "@type": "Offer",
          name: `${PERSONAL.name} ${t.name}`,
          price: String(t.price),
          priceCurrency: "USD",
          description: t.unit,
        })),
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
        <Glow />
        <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-10">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Home computers · PC and Mac</div>
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-[1.08]">
                SupremeCare{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">Personal</span>
              </h1>
              <p className="mt-4 text-lg text-slate-200 max-w-[62ch]">
                Your home computer, looked after by a real person nearby. We keep it updated and protected, we watch
                for trouble, and when you need a hand we are patient and we speak plainly.
              </p>

              <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-400/5 p-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <div className="text-3xl font-extrabold text-slate-100">From ${basic.price}</div>
                  <div className="text-sm text-slate-300">{basic.unit}</div>
                </div>
                <p className="mt-2 text-base text-cyan-200">
                  {PERSONAL.reducedLabel}: from ${basic.reduced} {basic.unit}.
                </p>
                <p className="mt-2 text-sm text-slate-300">{PERSONAL.annual}</p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <TrackedPhoneLink
                  phone={phone}
                  source={source}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-base border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
                >
                  <Phone className="h-5 w-5" /> Call {phoneShown}
                </TrackedPhoneLink>
                <a
                  href="#plans"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10 transition"
                >
                  See the two plans <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div id="start" className="scroll-mt-28">
              <LeadFormSimple
                personal
                source={source}
                title="Ask about SupremeCare Personal"
                sub="Tell us about the computer, or about the person you are arranging this for. We reply within one business day. Nothing is charged until you approve a written agreement."
                cta="Send my question"
                defaultSubject="SupremeCare Personal request"
                messagePlaceholder="Example: One Windows laptop, about 5 years old. It is slow and I worry about scam pop-ups. I am retired."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">How to tell real help from a scam</h2>
        <p className="mt-2 text-slate-300 max-w-3xl">
          Fake “tech support” callers go after older people more than anyone. So here is exactly how we work. If
          anyone using our name does otherwise, it is not us.
        </p>
        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold text-slate-100">What we never do</h3>
            <ul className="mt-4 space-y-3">
              {NEVER.map((n) => (
                <li key={n} className="flex gap-3 text-sm md:text-base text-slate-200">
                  <XCircle className="h-5 w-5 mt-0.5 shrink-0 text-rose-300" aria-hidden="true" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/5 p-6">
            <h3 className="font-semibold text-slate-100">What we always do</h3>
            <ul className="mt-4 space-y-3">
              {ALWAYS.map((n) => (
                <li key={n} className="flex gap-3 text-sm md:text-base text-slate-200">
                  <ShieldCheck className="h-5 w-5 mt-0.5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="plans" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-extrabold">Two plans</h2>
        <p className="mt-2 text-slate-300 max-w-3xl">
          {PERSONAL.audience}. {PERSONAL.setup}
        </p>
        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <TierCard tier={basic} reducedLabel={PERSONAL.reducedLabel} />
          <TierCard tier={remote} reducedLabel={PERSONAL.reducedLabel} highlight />
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-semibold text-slate-100">Not in the monthly price (billed at your subscriber rate, and we tell you the cost first)</h3>
          <PlainList items={PERSONAL.notIncluded} className="mt-3" twoCols />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">Add-ons</h2>
        <p className="mt-2 text-slate-300 max-w-3xl">
          Photos, letters and tax papers are worth protecting. A backup means a dead or stolen computer does not
          take them with it.
        </p>
        <div className="mt-6">
          <PriceRows rows={PERSONAL.addOns} showReduced reducedLabel={PERSONAL.reducedLabel} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">Rates, billing and hours</h2>
        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold text-slate-100">Hands-on help outside the plan</h3>
            <div className="mt-3 text-sm text-slate-300">
              Standard rate: <span className="text-slate-100">{PERSONAL.labor.standard}</span>
            </div>
            <div className="text-sm text-slate-300">
              Subscribers: <span className="text-cyan-200 font-semibold">{PERSONAL.labor.subscriber}</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">{PERSONAL.laborNote}</p>
            <h3 className="mt-6 font-semibold text-slate-100">Billing</h3>
            <PlainList items={PERSONAL.billing} className="mt-3" />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold text-slate-100">Response and hours</h3>
            <div className="mt-3">
              <TermsBlock
                terms={SERVICE_TERMS}
                extra={["Home visits are possible from the Lehigh Valley through Philadelphia and down to Wilmington, Delaware."]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">Fair questions</h2>
        <div className="mt-6">
          <Faqs items={FAQS} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#start"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2.5 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
          >
            Send my question ↑
          </a>
          <Link
            href={PLAN_ROUTES.soho}
            className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2.5 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10 transition"
          >
            Running a business from home? See the SOHO plan <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
