// app/plans/soho/page.js
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/siteConfig";
import { BASE_URL } from "@/lib/seoIds";
import { SOHO, SERVICE_TERMS, PLAN_ROUTES } from "@/lib/plans";
import LeadFormSimple from "@/components/LeadFormSimple";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { Glow, TierCard, PlainList, CheckList, PriceRows, Faqs, TermsBlock } from "../_components/PlanParts";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const canonical = `${BASE_URL}${PLAN_ROUTES.soho}`;
  // Keep brand out (layout template already adds it)
  const title = "IT Plan for Small Offices and Home Businesses — From $50 per Computer";
  const description =
    "A monthly IT plan for offices of up to 9 people: every computer monitored, patched and protected, with remote help when you need it. Clear prices, no long contract.";
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

const FAQS = [
  {
    q: "Which plan should a small office pick?",
    a: "Basic keeps every computer watched, updated and protected, and you pay your subscriber rate when you need hands-on help. Basic + Remote Help suits an office that asks for help most weeks: the remote labor for covered requests is already in the monthly price.",
  },
  {
    q: "What counts as a covered request on Remote Help?",
    a: "Day-to-day problems with the computers and people on your agreement that we can fix remotely, such as sign-in trouble, a slow or misbehaving PC, failed updates and security alerts. Projects, moves, new equipment, on-site visits and your industry software are quoted or billed separately, at your subscriber rate. The written agreement lists exactly what is covered.",
  },
  {
    q: "Is there a long contract?",
    a: "No. Basic runs month to month. Basic + Remote Help has a 3-month minimum and a $150 minimum monthly bill, then runs month to month.",
  },
  {
    q: "Do you come on-site?",
    a: "Yes, inside our on-site area, which runs from the Lehigh Valley through Philadelphia and down to Wilmington, Delaware. Most work is done remotely because it is faster for you. On-site visits are billed at your subscriber rate plus a dispatch fee, unless you add on-site coverage.",
  },
  {
    q: "We have 10 or more people. What then?",
    a: "Then you need SupremeCare, our managed IT plan for larger offices. We quote it after a free 30-minute IT + AI Checkup, so the price fits what you actually have.",
  },
  {
    q: "Can you also answer our phones or automate paperwork?",
    a: "Yes. Our AI front desk and automation services are separate from this plan and work alongside it. See AI Workflows & Automation under Services.",
  },
];

export default function SohoPlanPage() {
  const source = "plans-soho";
  const phone = site?.phone || "+1 610-500-9209";
  const phoneShown = String(phone).replace(/^\+1\s?/, "");
  const [basic, remote] = SOHO.tiers;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: SOHO.name,
        serviceType: "Managed IT plan for small offices and home-based businesses",
        provider: { "@type": "Organization", name: site?.name || "Supreme IT Experts", url: BASE_URL },
        areaServed: { "@type": "Country", name: "United States" },
        offers: SOHO.tiers.map((t) => ({
          "@type": "Offer",
          name: `${SOHO.name} ${t.name}`,
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
              <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">
                Small office · home office · up to 9 people
              </div>
              <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-[1.08]">
                SupremeCare{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">SOHO</span>
              </h1>
              <p className="mt-4 text-slate-200 max-w-[62ch]">
                A monthly IT plan for small offices and home-based businesses. Every computer is watched, updated and
                protected in the background, and help is a phone call or an email away. You see every price before
                you sign anything.
              </p>

              <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-400/5 p-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <div className="text-3xl font-extrabold text-slate-100">From ${basic.price}</div>
                  <div className="text-sm text-slate-300">{basic.unit}</div>
                </div>
                <p className="mt-2 text-sm text-slate-300">
                  With remote help included: ${remote.price} {remote.unit}. {SOHO.biggerNote}
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3 text-sm">
                <a
                  href="#plans"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10 transition"
                >
                  Compare the two plans <ArrowRight className="h-4 w-4" />
                </a>
                <TrackedPhoneLink phone={phone} source={source} className="inline-flex items-center gap-2 text-cyan-300 hover:underline">
                  <Phone className="h-4 w-4" /> {phoneShown}
                </TrackedPhoneLink>
              </div>
            </div>

            <div id="start" className="scroll-mt-28">
              <LeadFormSimple
                source={source}
                title="Ask about SupremeCare SOHO"
                sub="Tell us how many people and computers you have. We reply within one business day with a written price. Nothing is charged until you approve a written agreement."
                cta="Get my price"
                defaultSubject="SupremeCare SOHO request"
                messagePlaceholder="Example: 4 people, 5 Windows PCs and 1 Mac, Microsoft 365 email. We want updates and security handled, and someone to call."
              />
            </div>
          </div>
        </div>
      </section>

      <section id="plans" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-extrabold">Two plans</h2>
        <p className="mt-2 text-slate-300 max-w-3xl">{SOHO.audience}.</p>
        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <TierCard tier={basic}>
            <h4 className="mt-6 text-sm font-semibold text-slate-100">Also yours as a subscriber</h4>
            <CheckList items={basic.perks} className="mt-3" />
            <h4 className="mt-6 text-sm font-semibold text-slate-100">Not in the monthly price (billed at your subscriber rate)</h4>
            <PlainList items={basic.notIncluded} className="mt-3" />
          </TierCard>

          <TierCard tier={remote} highlight>
            <h4 className="mt-6 text-sm font-semibold text-slate-100">More devices on the same agreement</h4>
            <div className="mt-3">
              <PriceRows rows={remote.extraDevices} />
            </div>
            <h4 className="mt-6 text-sm font-semibold text-slate-100">Not in the monthly price</h4>
            <PlainList items={remote.notIncluded} className="mt-3" />
          </TierCard>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">One-time fees</h2>
        <div className="mt-6">
          <PriceRows rows={SOHO.fees} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">Add-ons</h2>
        <p className="mt-2 text-slate-300 max-w-3xl">Add only what your office needs. Each one can be added or dropped later.</p>
        <div className="mt-6">
          <PriceRows rows={SOHO.addOns} />
        </div>
        <h3 className="mt-10 text-xl font-bold">Backup</h3>
        <div className="mt-4">
          <PriceRows rows={SOHO.backup} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">Labor rates</h2>
        <p className="mt-2 text-slate-300 max-w-3xl">For work the plans do not cover. Subscribers pay 20% less.</p>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {SOHO.labor.map((l) => (
            <div key={l.name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="font-semibold text-slate-100">{l.name}</div>
              <div className="mt-2 text-sm text-slate-300">
                Standard: <span className="text-slate-100">{l.standard}</span>
              </div>
              <div className="text-sm text-slate-300">
                Subscribers: <span className="text-cyan-200 font-semibold">{l.subscriber}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400">{SOHO.laborNote}</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">How billing and scheduling work</h2>
        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold text-slate-100">Billing</h3>
            <PlainList items={SOHO.billing} className="mt-3" />
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold text-slate-100">Response and hours</h3>
            <div className="mt-3">
              <TermsBlock
                terms={SERVICE_TERMS}
                extra={SERVICE_TERMS.zones.map((z) => `On-site ${z.name}: ${z.detail}.`)}
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
            Get my price ↑
          </a>
          <Link
            href={PLAN_ROUTES.personal}
            className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2.5 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10 transition"
          >
            Looking for a home computer plan? <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/services/ai-workflows"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2.5 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10 transition"
          >
            AI front desk and automation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
