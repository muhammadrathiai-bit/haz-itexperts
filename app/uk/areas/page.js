// app/uk/areas/page.js
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/siteConfig";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";
import { UK_SERVICES as SERVICES } from "@/lib/services";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/areas`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  const title = `UK Areas We Serve | ${brand}`;
  const description =
    "Remote-first managed IT support and cybersecurity coverage across the United Kingdom — clear deliverables, security-first operations, and predictable support.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-GB": canonical,
        "en-US": `${baseUrl}/areas`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: brand,
      locale: "en_GB",
      alternateLocale: ["en_US"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — UK Areas` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

function toUkServiceHref(href) {
  if (!href) return "/uk/services";
  if (href.startsWith("/uk/")) return href;
  if (href.startsWith("/services/")) return href.replace("/services/", "/uk/services/");
  if (href === "/services") return "/uk/services";
  return `/uk${href.startsWith("/") ? href : `/${href}`}`;
}

export default function UKAreasPage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/areas`;

  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const WEBPAGE_ID = `${canonical}#webpage`;
  const REGIONS_LIST_ID = `${canonical}#regions`;
  const SERVICES_LIST_ID = `${canonical}#services`;

  const ukCoverage = [
    { title: "England", desc: "Remote-first coverage for growing teams and modern workplaces." },
    { title: "Scotland", desc: "Security-first support for distributed teams and hybrid operations." },
    { title: "Wales", desc: "Managed IT and Microsoft 365 support with clear reporting and ownership." },
    { title: "Northern Ireland", desc: "Proactive monitoring, baseline hardening, and predictable support." },
  ];

  const operatingModel = [
    "Remote-first support across the UK (ticketing + secure remote tools)",
    "Clear onboarding: documentation, baselines, access, and priorities",
    "Security-first controls: identity hardening, endpoint protection, backups",
    "Monthly reporting and roadmap for decision-makers",
  ];

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": BREADCRUMB_ID,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "UK", item: `${baseUrl}/uk` },
      { "@type": "ListItem", position: 3, name: "Areas We Serve", item: canonical },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": WEBPAGE_ID,
    url: canonical,
    name: `UK Areas We Serve | ${brand}`,
    description:
      "Remote-first managed IT support and cybersecurity coverage across the United Kingdom — clear deliverables, security-first operations, and predictable support.",
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    about: { "@id": BUSINESS_ID },
  };

  const regionsItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": REGIONS_LIST_ID,
    name: "UK Regions Covered",
    itemListElement: ukCoverage.map((r, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: r.title,
    })),
  };

  const servicesItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": SERVICES_LIST_ID,
    name: "UK Services",
    itemListElement: SERVICES.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: s.title,
      url: `${baseUrl}${toUkServiceHref(s.href)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, webPageSchema, regionsItemListSchema, servicesItemListSchema]),
        }}
      />

      <PageHero
        eyebrow="United Kingdom"
        title="UK Areas We Serve"
        sub="Remote-first managed IT and cybersecurity coverage across the United Kingdom — with clear deliverables and predictable support."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {/* Coverage cards */}
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-cyan-300" />
                  Coverage snapshot
                </h2>
                <p className="mt-2 text-slate-300 max-w-3xl">
                  We support UK businesses remotely, UK-wide. If your team is distributed or hybrid, we’ll help you standardise support,
                  security, and collaboration across locations.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/uk/services"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  UK Services <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/uk/contact"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Contact <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {ukCoverage.map((x) => (
                <div key={x.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="font-extrabold text-lg">{x.title}</div>
                  <p className="mt-2 text-sm text-slate-300 leading-7">{x.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Operating model */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-xl font-semibold">How UK coverage works</h2>
            <p className="mt-2 text-slate-300 max-w-3xl">
              Our UK delivery model is remote-first: proactive monitoring, patching, and security baselines — with clear ownership and reporting.
            </p>

            <ul className="mt-5 space-y-2 text-slate-200">
              {operatingModel.map((x) => (
                <li key={x} className="flex gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Services block (internal linking) */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-xl font-semibold">Explore UK services</h3>
                <p className="text-slate-300 mt-2 max-w-3xl">
                  Choose the service you need — from managed IT to security hardening and Microsoft 365 support.
                </p>
              </div>
              <Link
                href="/uk/services"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                View UK Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {SERVICES.map((s) => (
                <Link
                  key={s.key || s.href}
                  href={toUkServiceHref(s.href)}
                  className="group block rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-cyan-300/30 transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-extrabold">{s.title}</div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-cyan-200 transition" />
                  </div>
                  <p className="mt-2 text-sm text-slate-300 leading-6">
                    {s.blurb || "UK-focused service overview with clear scope and outcomes."}
                  </p>
                  <div className="mt-4 h-1 w-0 bg-cyan-400/70 group-hover:w-full transition-all rounded-full" />
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-6 md:p-8">
            <h3 className="text-xl font-semibold">Need UK coverage details?</h3>
            <p className="mt-2 text-slate-300 max-w-3xl">
              Tell us your team size and current tools (Microsoft 365 / Google Workspace). We’ll recommend the safest next step and a clear scope.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/uk/contact"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-5 py-3 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Contact us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/uk/faqs"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-5 py-3 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                UK FAQs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
