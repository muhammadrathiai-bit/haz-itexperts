// app/uk/services/page.js
import Link from "next/link";
import { site } from "@/lib/siteConfig";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";
import { UK_SERVICES as SERVICES } from "@/lib/services";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/services`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  const title = `UK IT Services & Cybersecurity | ${brand}`;
  const description =
    "Remote-first managed IT support and cybersecurity services for UK businesses — clear scope, measurable outcomes, and reliable support.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-GB": canonical,
        "en-US": `${baseUrl}/services`,
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — UK Services` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// ✅ Convert US service href -> UK service href
function toUkServiceHref(href) {
  if (!href) return "/uk/services";
  if (href.startsWith("/uk/")) return href;
  if (href.startsWith("/services/")) return href.replace("/services/", "/uk/services/");
  if (href === "/services") return "/uk/services";
  return `/uk${href.startsWith("/") ? href : `/${href}`}`;
}

export default function UKServicesPage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/services`;

  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const WEBPAGE_ID = `${canonical}#webpage`;
  const SERVICES_LIST_ID = `${canonical}#services`;

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": BREADCRUMB_ID,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "UK", item: `${baseUrl}/uk` },
      { "@type": "ListItem", position: 3, name: "Services", item: canonical },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": WEBPAGE_ID,
    url: canonical,
    name: `UK Services | ${brand}`,
    description:
      "Remote-first managed IT support and cybersecurity services for UK businesses — clear scope, measurable outcomes, and reliable support.",
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    about: { "@id": BUSINESS_ID },
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

  // shared bullets (safe + useful)
  const bullets = [
    "Clear scope and deliverables",
    "Security-first best practices",
    "Proactive monitoring and updates",
    "Friendly support with fast response",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, webPageSchema, servicesItemListSchema]),
        }}
      />

      <PageHero
        eyebrow="United Kingdom"
        title="UK Services"
        sub="Remote-first managed IT support and cybersecurity services for UK businesses — choose the service you need and we’ll scope it clearly."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-xl font-semibold">Browse our UK services</h2>
            <p className="mt-2 text-slate-300 max-w-3xl">
              Pick a service below to see what’s included, how delivery works, and what the first 30 days typically looks like.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/uk"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                UK Home <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/uk/contact"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Book a Call <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((s) => {
              const ukHref = toUkServiceHref(s.href);

              return (
                <Link
                  key={s.key || s.href}
                  href={ukHref}
                  className="group block rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-cyan-300/30 transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-lg font-extrabold">{s.title}</div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-cyan-200 transition" />
                  </div>

                  <p className="mt-2 text-sm text-slate-300 leading-6">
                    {s.blurb || "UK-focused service overview with clear scope and outcomes."}
                  </p>

                  <ul className="mt-4 space-y-2 text-slate-200">
                    {bullets.map((x) => (
                      <li key={x} className="flex gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5" />
                        {x}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 h-1 w-0 bg-cyan-400/70 group-hover:w-full transition-all rounded-full" />
                </Link>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">Not sure what you need?</h3>
            <p className="text-slate-300 mt-2">
              Tell us what you’re running today (Microsoft 365, endpoints, backups, security) and we’ll recommend the safest next step.
            </p>

            <div className="mt-5">
              <Link
                href="/uk/contact"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
              >
                Book a Call <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
