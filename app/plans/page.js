// app/plans/page.js
import Link from "next/link";
import { ArrowRight, Building2, Briefcase, Home, Sparkles, ShieldCheck, ClipboardCheck } from "lucide-react";
import { site } from "@/lib/siteConfig";
import { BASE_URL } from "@/lib/seoIds";
import { SOHO, PERSONAL, SERVICE_TERMS, PLAN_ROUTES } from "@/lib/plans";
import { Glow, PlainList } from "./_components/PlanParts";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const canonical = `${BASE_URL}${PLAN_ROUTES.hub}`;
  // Keep brand out (layout template already adds it)
  const title = "IT Plans and Prices — Offices, Home Offices and Home Computers";
  const description =
    "Monthly IT plans with the prices in plain sight: small offices and home businesses from $50 per computer, home computers from $36, and a lower price for retired seniors and students.";
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

function PlanCard({ icon: Icon, kicker, name, price, priceNote, lines, href, cta, highlight = false }) {
  return (
    <div
      className={`rounded-2xl border p-6 flex flex-col ${
        highlight ? "border-cyan-300/30 bg-cyan-400/5" : "border-white/10 bg-white/5"
      }`}
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-cyan-300/80">
        <Icon className="h-4 w-4" aria-hidden="true" /> {kicker}
      </div>
      <h2 className="mt-3 text-xl font-bold text-slate-100">{name}</h2>
      <div className="mt-3 text-3xl font-extrabold text-slate-100">{price}</div>
      <div className="text-sm text-slate-300">{priceNote}</div>
      <PlainList items={lines} className="mt-5 flex-1" />
      <Link
        href={href}
        className="mt-6 inline-flex items-center justify-center gap-2 text-sm rounded-lg px-4 py-2.5 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
      >
        {cta} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default function PlansHubPage() {
  const sohoBasic = SOHO.tiers[0];
  const sohoRemote = SOHO.tiers[1];
  const persBasic = PERSONAL.tiers[0];
  const persRemote = PERSONAL.tiers[1];

  return (
    <main>
      <section className="relative overflow-hidden">
        <Glow />
        <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Plans and prices</div>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-[1.08]">
            Pick the plan that fits{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">how you work</span>
          </h1>
          <p className="mt-4 text-slate-200 max-w-[68ch]">
            Every plan keeps your computers watched, updated and protected, with a real person to call. The prices are
            on this site, and nothing is charged until you have approved a written agreement.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid lg:grid-cols-3 gap-6">
          <PlanCard
            icon={Briefcase}
            kicker="Up to 9 people"
            name={SOHO.name}
            price={`From $${sohoBasic.price}`}
            priceNote={sohoBasic.unit}
            lines={[
              "For small offices and home-based businesses",
              `With remote help included: $${sohoRemote.price} ${sohoRemote.unit}`,
              "Antivirus, threat detection, web filtering and updates on every computer",
              "Add backup, email security or firewall management as you need them",
            ]}
            href={PLAN_ROUTES.soho}
            cta="See the SOHO plan"
            highlight
          />
          <PlanCard
            icon={Home}
            kicker="Home computers"
            name={PERSONAL.name}
            price={`From $${persBasic.price}`}
            priceNote={persBasic.unit}
            lines={[
              `${PERSONAL.reducedLabel}: from $${persBasic.reduced} ${persBasic.unit}`,
              `With remote help included: $${persRemote.price} ($${persRemote.reduced} reduced)`,
              "Patient help in plain words, from the same person every time",
              "Families can arrange it for a parent",
            ]}
            href={PLAN_ROUTES.personal}
            cta="See the Personal plan"
          />
          <PlanCard
            icon={Building2}
            kicker="10 or more people"
            name="SupremeCare"
            price="From $47"
            priceNote="per user, per month"
            lines={[
              "Fully managed IT for a growing office",
              "Helpdesk, monitoring, security and Microsoft 365 looked after",
              "Quoted after a free 30-minute IT + AI Checkup, so the price fits what you have",
            ]}
            href="/lp/it-ai-checkup"
            cta="Book the free Checkup"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">Not a monthly plan</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <Link href="/services/ai-workflows" className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-cyan-300/30 transition">
            <Sparkles className="h-5 w-5 text-cyan-300" aria-hidden="true" />
            <div className="mt-3 font-semibold text-slate-100">AI front desk and automation</div>
            <p className="mt-2 text-sm text-slate-300">
              Missed-call text-back, after-hours answering, booking and follow-ups, set up safely for your business.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm text-cyan-300 group-hover:underline">
              How it works <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <Link href="/lp/email-security-fix" className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-cyan-300/30 transition">
            <ShieldCheck className="h-5 w-5 text-cyan-300" aria-hidden="true" />
            <div className="mt-3 font-semibold text-slate-100">Email Security Fix-in-a-Day</div>
            <p className="mt-2 text-sm text-slate-300">
              SPF, DKIM and DMARC set up properly so nobody can send email as your business. $300, one time.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm text-cyan-300 group-hover:underline">
              See what is included <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <Link href="/lp/it-ai-checkup" className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-cyan-300/30 transition">
            <ClipboardCheck className="h-5 w-5 text-cyan-300" aria-hidden="true" />
            <div className="mt-3 font-semibold text-slate-100">Free IT + AI Checkup</div>
            <p className="mt-2 text-sm text-slate-300">
              Thirty minutes and a one-page report on where your business stands. No charge and no obligation.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm text-cyan-300 group-hover:underline">
              Book a Checkup <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">The same for every plan</h2>
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <PlainList
            twoCols
            items={[
              SERVICE_TERMS.response,
              SERVICE_TERMS.hours,
              SERVICE_TERMS.remote,
              "On-site visits from the Lehigh Valley through Philadelphia and down to Wilmington, Delaware.",
              "Subscribers pay 20% less for any work a plan does not cover.",
              SERVICE_TERMS.tax,
            ]}
          />
        </div>
      </section>
    </main>
  );
}
