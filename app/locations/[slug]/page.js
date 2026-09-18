// app/locations/[slug]/page.js
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/siteConfig";
import { LOCATIONS, getLocationBySlug } from "@/lib/locations";
import { SERVICES } from "@/lib/services";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Mail,
  Database,
  ShieldCheck,
  PhoneCall,
  BadgeCheck,
  Sparkles,
  Laptop2,
  BriefcaseBusiness,
  Building2,
  Network,
} from "lucide-react";
import { BUSINESS_ID, BASE_URL } from "@/lib/seoIds";

function normalizeSlug(raw) {
  if (!raw) return "";
  return Array.isArray(raw) ? String(raw[0] || "") : String(raw || "");
}

export async function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

/**
 * ✅ Query-aligned snippets (GSC intent pack)
 */
function getQueryPack(slug, city, state) {
  const packs = {
    "allentown-pa": {
      headline: `Popular searches in ${city}`,
      items: [
        {
          term: `Managed IT services ${city}`,
          desc: "Proactive monitoring, patching, and helpdesk support.",
          href: "/services/managed-it",
        },
        {
          term: `Cybersecurity near ${city}`,
          desc: "MFA, endpoint protection, and security baselines.",
          href: "/services/cybersecurity",
        },
        {
          term: `IT support ${city}`,
          desc: "Fast remote support for daily issues and outages.",
          href: "/services/managed-it",
        },
        {
          term: `Help desk solutions in ${city}`,
          desc: "Ticketing + response process designed for SMB teams.",
          href: "/services/managed-it",
        },
        {
          term: `Backup planning services ${city}`,
          desc: "Backup + test restores + disaster recovery planning.",
          href: "/services/projects-consulting",
        },
        {
          term: `Microsoft 365 support ${city}`,
          desc: "Email setup, security, and troubleshooting.",
          href: "/services/cloud-workspace",
        },
      ],
      metaBoost:
        "Managed IT services, cybersecurity, help desk solutions, IT support, Microsoft 365 support, backup planning in Allentown, PA.",
    },

    "macungie-pa": {
      headline: `Popular searches in ${city}`,
      items: [
        {
          term: `Business IT support near ${city} ${state}`,
          desc: "Reliable helpdesk + proactive IT management.",
          href: "/services/managed-it",
        },
        {
          term: `Managed IT services ${city}`,
          desc: "Monthly managed support for SMBs.",
          href: "/services/managed-it",
        },
        {
          term: `Cybersecurity services ${city}`,
          desc: "Reduce risk with MFA + endpoint protection.",
          href: "/services/cybersecurity",
        },
        {
          term: `Microsoft 365 support ${city}`,
          desc: "Email issues, setup, security and troubleshooting.",
          href: "/services/cloud-workspace",
        },
        {
          term: `Device management (MDM) ${city}`,
          desc: "Enrollment, security baselines, and compliance checks.",
          href: "/services/device-management",
        },
      ],
      metaBoost:
        "Business IT support near Macungie, PA + managed IT, cybersecurity, Microsoft 365 and device management.",
    },

    "emmaus-pa": {
      headline: `Popular searches in ${city}`,
      items: [
        {
          term: `Tech support in ${city} ${state}`,
          desc: "Fast remote troubleshooting for teams.",
          href: "/services/managed-it",
        },
        {
          term: `IT support ${city}`,
          desc: "Helpdesk + proactive maintenance.",
          href: "/services/managed-it",
        },
        {
          term: `Cybersecurity near ${city}`,
          desc: "Identity + endpoint + patching to reduce downtime.",
          href: "/services/cybersecurity",
        },
        {
          term: `Business IT support near ${city}`,
          desc: "Small-business friendly managed support.",
          href: "/services/managed-it",
        },
        {
          term: `Microsoft 365 support ${city}`,
          desc: "Security, sign-in, and email reliability help.",
          href: "/services/cloud-workspace",
        },
      ],
      metaBoost:
        "Tech support in Emmaus, PA + managed IT, help desk, cybersecurity, and Microsoft 365 support.",
    },
  };

  return (
    packs[slug] || {
      headline: `Popular searches in ${city}`,
      items: [
        {
          term: `Managed IT services ${city}`,
          desc: "Helpdesk, monitoring, patching, and proactive support.",
          href: "/services/managed-it",
        },
        {
          term: `Cybersecurity services ${city}`,
          desc: "MFA, endpoint protection, and security best practices.",
          href: "/services/cybersecurity",
        },
      ],
      metaBoost: `Managed IT services and cybersecurity in ${city}, ${state}.`,
    }
  );
}

/**
 * helper: attempt to find service href from SERVICES list
 */
function findServiceHref(match, fallback) {
  const list = Array.isArray(SERVICES) ? SERVICES : [];
  const hit = list.find((s) => {
    const t = String(s?.title || "").toLowerCase();
    return match.some((m) => t.includes(String(m).toLowerCase()));
  });
  return hit?.href || fallback;
}

/**
 * ✅ City-specific pain points (more genuine + local)
 * You can tune these later per your experience/GSC.
 */
function getIssuesByCity(slug, city) {
  const map = {
    "allentown-pa": [
      "Microsoft 365 sign-in, mailbox syncing, and email deliverability issues",
      "Slow PCs and recurring crashes that kill productivity",
      "Wi-Fi dead zones + unstable connectivity (office + back rooms)",
      "Phishing / invoice scams targeting local SMB inboxes",
      "Outdated devices and patching gaps causing repeat outages",
      "Backups that exist but haven’t been restore-tested",
    ],
    "macungie-pa": [
      "Wi-Fi instability and inconsistent coverage across the workspace",
      "Email access problems and Microsoft 365 configuration issues",
      "Printers and shared devices breaking workflows",
      "Password resets and account lockouts slowing teams down",
      "No clear device standards (everyone set up differently)",
      "Security basics missing (MFA not enforced, devices not hardened)",
    ],
    "emmaus-pa": [
      "Remote work access issues (VPN / login / device compliance)",
      "Microsoft 365 and email interruptions during busy hours",
      "Recurring printer + scanner issues in daily operations",
      "Weak identity security (no MFA, risky shared access)",
      "Performance bottlenecks and old hardware slowing staff",
      "Unclear disaster recovery plan when systems go down",
    ],
  };

  return (
    map[slug] || [
      `Downtime from recurring IT issues in ${city}`,
      "Wi-Fi/network instability and reliability problems",
      "Email and Microsoft 365 setup/security issues",
      "Security gaps (MFA, patching, endpoint protection)",
      "Backup and recovery uncertainty",
      "Slow PCs and inconsistent device setups",
    ]
  );
}

/**
 * ✅ Automotive / dealership section (local niche)
 * Shows only if we are in one of the 3 target cities
 */
function shouldShowAutomotive(slug) {
  return ["allentown-pa", "macungie-pa", "emmaus-pa"].includes(slug);
}

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const slug = normalizeSlug(awaitedParams?.slug);

  const loc = getLocationBySlug(slug);
  if (!loc) return {};

  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(
    /\/$/,
    ""
  );
  const path = `/locations/${loc.slug}`;
  const canonical = `${baseUrl}${path}`;

  const pack = getQueryPack(loc.slug, loc.city, loc.state);

  const title = `Managed IT Services ${loc.city}, ${loc.state} | Help Desk + Cybersecurity — ${brand}`;
  const description =
    `Need business IT support in ${loc.city}, ${loc.state}? Managed IT, help desk, cybersecurity, Microsoft 365, backups & disaster recovery. ` +
    `Book a free 20-min IT assessment.`;

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: title },
    description,
    keywords: [
      `managed IT services ${loc.city}`,
      `business IT support ${loc.city}`,
      `IT support ${loc.city} ${loc.state}`,
      `help desk ${loc.city}`,
      `help desk solutions in ${loc.city}`,
      `cybersecurity near ${loc.city}`,
      `Microsoft 365 support ${loc.city}`,
      `backup planning services ${loc.city}`,
      `device management ${loc.city}`,
      `managed service provider ${loc.city}`,
    ],
    alternates: { canonical },
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
      description: `${description} ${pack.metaBoost}`,
      type: "website",
      url: canonical,
      siteName: brand,
      images: [
        {
          url: "/og-image.png?v=7",
          width: 1200,
          height: 630,
          alt: `${brand} — Managed IT Services in ${loc.city}, ${loc.state}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `${description} ${pack.metaBoost}`,
      images: ["/og-image.png?v=7"],
    },
  };
}

export default async function LocationPage({ params }) {
  const awaitedParams = await params;
  const slug = normalizeSlug(awaitedParams?.slug);

  const loc = getLocationBySlug(slug);
  // Delaware County pages book the IT + AI Checkup; Lehigh Valley pages keep the IT assessment form
  const DELCO_SLUGS = ["broomall-pa", "newtown-square-pa", "havertown-pa", "springfield-pa", "media-pa"];
  const bookHref = (src) =>
    DELCO_SLUGS.includes(loc?.slug) ? `/lp/it-ai-checkup?source=${src}` : `/contact?type=assessment&source=${src}`;
  if (!loc) notFound();

  const brand = site?.name || "Supreme IT Experts";

  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(
    /\/$/,
    ""
  );
  const canonical = `${baseUrl}/locations/${loc.slug}`;

  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const SERVICE_ID = `${canonical}#service`;
  const WEBPAGE_ID = `${canonical}#webpage`;
  const FAQ_ID = `${canonical}#faq`;

  const faqs = Array.isArray(loc.faqs) ? loc.faqs : [];
  const localParas =
    Array.isArray(loc?.copy?.paragraphs) && loc.copy.paragraphs.length ? loc.copy.paragraphs : [];
  const serviceSections = Array.isArray(loc?.serviceSections) ? loc.serviceSections : [];

  const pack = getQueryPack(loc.slug, loc.city, loc.state);
  const issues = getIssuesByCity(loc.slug, loc.city);

  // ✅ JSON-LD graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${baseUrl}/`,
        name: brand,
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
          { "@type": "ListItem", position: 2, name: "Areas we serve", item: `${baseUrl}/areas` },
          { "@type": "ListItem", position: 3, name: `${loc.city}, ${loc.state}`, item: canonical },
        ],
      },
      {
        "@type": "Service",
        "@id": SERVICE_ID,
        name: `Managed IT Services in ${loc.city}, ${loc.state}`,
        serviceType: "Managed IT Services",
        description: loc.lede,
        url: canonical,
        provider: { "@id": BUSINESS_ID },
        areaServed: { "@type": "City", name: `${loc.city}, ${loc.state}` },
      },
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: canonical,
        name: `Managed IT Services in ${loc.city}, ${loc.state} | ${brand}`,
        description: loc.lede,
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": BREADCRUMB_ID },
        about: { "@id": BUSINESS_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: new URL("/og-image.png?v=7", baseUrl).toString(),
        },
        mainEntity: [
          { "@id": SERVICE_ID },
          ...(faqs.length ? [{ "@id": FAQ_ID }] : []), // ✅ link FAQ entity to main page entity
        ],
      },
      ...(faqs.length
        ? [
            {
              "@type": "FAQPage",
              "@id": FAQ_ID,
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
              isPartOf: { "@id": WEBPAGE_ID },
            },
          ]
        : []),
    ],
  };

  // ✅ 6 services coverage on the location page
  const focusCards = [
    {
      icon: CheckCircle2,
      title: "Managed IT Services",
      desc: "Helpdesk, monitoring, patching, and proactive IT management with clear ownership.",
      link: findServiceHref(["managed it"], "/services/managed-it"),
      cta: "Managed IT services",
    },
    {
      icon: ShieldCheck,
      title: "Cybersecurity",
      desc: "MFA, endpoint protection, baselines, and monitoring to reduce risk and downtime.",
      link: findServiceHref(["cyber"], "/services/cybersecurity"),
      cta: "Cybersecurity options",
    },
    {
      icon: Mail,
      title: "Cloud & Microsoft 365",
      desc: "Microsoft 365 setup, troubleshooting, tenant security, and ongoing support.",
      link: findServiceHref(["microsoft 365", "cloud"], "/services/cloud-workspace"),
      cta: "Microsoft 365 help",
    },
    {
      icon: Database,
      title: "IT Projects & Consulting",
      desc: "Backup/DR planning, audits, refresh projects, network improvements, and cleanup.",
      link: findServiceHref(["projects", "consult"], "/services/projects-consulting"),
      cta: "Projects & consulting",
    },
    {
      icon: Laptop2,
      title: "Device Management (MDM)",
      desc: "Standard configs, device enrollment, compliance checks, and policy-based control.",
      link: findServiceHref(["mdm", "device"], "/services/device-management"),
      cta: "MDM options",
    },
    {
      icon: BriefcaseBusiness,
      title: "vCIO / IT Strategy",
      desc: "Roadmaps, budget planning, vendor alignment, and measurable IT leadership KPIs.",
      link: findServiceHref(["vcio", "strategy"], "/services/vcio-strategy"),
      cta: "IT strategy",
    },
  ];

  const otherLocations = (LOCATIONS || []).filter((l) => l.slug !== loc.slug).slice(0, 2);

  return (
    <>
      <Script
        id={`location-jsonld-${loc.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Areas we serve"
        title={`Managed IT Services in ${loc.city}, ${loc.state}`}
        sub={`Business IT support, help desk & cybersecurity in ${loc.city}, ${loc.state} — plus Microsoft 365, backups/DR, MDM and IT strategy.`}
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {/* badges */}
        <Reveal className="mt-4">
          <div className="flex flex-wrap gap-2">
            {[
              { icon: BadgeCheck, text: "Business-first support" },
              { icon: Sparkles, text: "Security-first mindset" },
              { icon: PhoneCall, text: "Fast response times" },
              { icon: MapPin, text: `Serving ${loc.city} + nearby` },
            ].map((b) => (
              <div
                key={b.text}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
              >
                <b.icon className="h-3.5 w-3.5 text-cyan-300" />
                {b.text}
              </div>
            ))}
          </div>
        </Reveal>

        {/* intro */}
        <Reveal className="mt-4">
          <p className="text-sm text-slate-300">
            Looking for{" "}
            <span className="text-slate-100 font-medium">
              business IT support near {loc.city}, {loc.state}
            </span>
            ? We provide{" "}
            <span className="text-slate-100 font-medium">managed IT services</span>,{" "}
            <span className="text-slate-100 font-medium">help desk support</span>,{" "}
            <span className="text-slate-100 font-medium">cybersecurity</span>,{" "}
            <span className="text-slate-100 font-medium">Microsoft 365 support</span>,{" "}
            <span className="text-slate-100 font-medium">backup/DR planning</span>,{" "}
            <span className="text-slate-100 font-medium">MDM</span> and{" "}
            <span className="text-slate-100 font-medium">IT strategy</span>.{" "}
            <span className="text-slate-400">
              (If you searched “IT support near me” in {loc.city}, this page is designed for that intent.)
            </span>{" "}
            <Link
              href={bookHref(`location-intent-${loc.slug}`)}
              className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
            >
              Get a free 20-min assessment
            </Link>{" "}
            or browse{" "}
            <Link
              href="/services"
              className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
            >
              service options
            </Link>
            .
          </p>
        </Reveal>

        {/* queries */}
        <Reveal className="mt-7">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/6 to-white/3 p-6 md:p-7">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-semibold">{pack.headline}</h2>
                <p className="mt-2 text-sm text-slate-300 max-w-3xl">
                  These are common “intent” searches we see for {loc.city}. If you’re searching any of these, this page is for you.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href={bookHref(`location-queries-${loc.slug}`)}
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Free assessment <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/get-quote"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  Pricing & quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-5 grid md:grid-cols-2 gap-3">
              {pack.items.map((it) => (
                <Link
                  key={it.term}
                  href={it.href}
                  className="rounded-2xl border border-white/10 bg-black/15 p-4 hover:border-cyan-300/30 hover:bg-cyan-400/10 transition"
                >
                  <div className="font-semibold text-slate-100">{it.term}</div>
                  <div className="mt-1 text-sm text-slate-300">{it.desc}</div>
                  <div className="mt-2 text-sm text-cyan-300 inline-flex items-center gap-2">
                    Explore <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA band */}
        <Reveal className="mt-7">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/12 to-fuchsia-500/12 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Supporting teams in {loc.city} and nearby areas
              </div>

              <p className="text-slate-300 mt-2 max-w-2xl">{loc.lede}</p>

              {!!loc.nearby?.length && (
                <p className="mt-2 text-sm text-slate-400">Nearby coverage focus: {loc.nearby.join(", ")}.</p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={bookHref(`location-${loc.slug}`)}
                className="rounded-xl px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Free 20-min assessment
              </Link>
              <Link
                href="/contact"
                className="rounded-xl px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20"
              >
                Contact us
              </Link>
            </div>
          </div>
        </Reveal>

        {/* local paragraphs */}
        {localParas.length > 0 && (
          <Reveal className="mt-10">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7">
              <h2 className="text-xl font-semibold">
                Local IT support for {loc.city}, {loc.state}
              </h2>

              <div className="mt-3 space-y-3 text-slate-300 leading-7">
                {localParas.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={bookHref(`location-${loc.slug}`)}
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  {loc?.copy?.primaryCtaText || "Free 20-min IT assessment"} <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/get-quote"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  Pricing & quote <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  {loc?.copy?.secondaryCtaText || "Contact us"} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {!!loc?.copy?.microTrust && <p className="mt-3 text-xs text-slate-400">{loc.copy.microTrust}</p>}
            </div>
          </Reveal>
        )}

        {/* services coverage */}
        <Reveal className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7">
            <h2 className="text-xl font-semibold">IT services we provide in {loc.city}</h2>
            <p className="text-slate-300 mt-2 max-w-3xl">
              These map directly to the core services listed on our Services page, with local intent for {loc.city}.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {focusCards.map((c) => (
                <div key={c.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 hover:bg-white/7 transition">
                  <div className="flex items-start gap-3">
                    <c.icon className="h-5 w-5 text-cyan-300 mt-0.5" />
                    <div>
                      <div className="font-extrabold">{c.title}</div>
                      <p className="mt-2 text-sm text-slate-300 leading-6">{c.desc}</p>
                      <Link href={c.link} className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-300 hover:underline">
                        {c.cta} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* service sections (SEO headings) */}
        {serviceSections.length > 0 && (
          <Reveal className="mt-10">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7">
              <h2 className="text-xl font-semibold">Managed IT, help desk, cybersecurity & more — in {loc.city}</h2>
              <p className="mt-2 text-slate-300 max-w-3xl">
                Sections below are aligned with real search intent (like “IT support”, “help desk solutions”, “cybersecurity near me”, and “backup planning”).
              </p>

              <div className="mt-6 space-y-6">
                {serviceSections.map((sec) => (
                  <div key={sec.id} id={sec.id} className="rounded-3xl border border-white/10 bg-black/10 p-5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-100">{sec.title}</h3>
                        {!!sec.sub && <p className="mt-1 text-sm text-slate-300">{sec.sub}</p>}
                      </div>

                      {!!sec.href && (
                        <Link
                          href={sec.href}
                          className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                        >
                          Learn more <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>

                    {!!sec.text && <p className="mt-3 text-slate-300 leading-7">{sec.text}</p>}

                    {Array.isArray(sec.bullets) && sec.bullets.length > 0 && (
                      <div className="mt-4 grid md:grid-cols-2 gap-3 text-slate-200">
                        {sec.bullets.map((x) => (
                          <div key={x} className="flex gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5" />
                            {x}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={bookHref(`location-sections-${loc.slug}`)}
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Free assessment <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  View services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        )}

        {/* ✅ UPDATED: Common issues (city-specific) */}
        <Reveal className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7">
            <h3 className="text-xl font-semibold">Common issues we fix in {loc.city}</h3>
            <div className="mt-4 grid md:grid-cols-2 gap-3 text-slate-200">
              {issues.map((x) => (
                <div key={x} className="flex gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5" />
                  {x}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ✅ NEW: Automotive / Dealerships block */}
        {shouldShowAutomotive(loc.slug) && (
          <Reveal className="mt-10">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-6 md:p-7">
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-emerald-300 mt-0.5" />
                <div>
                  <h3 className="text-xl font-semibold">
                    Automotive & dealership IT support near {loc.city}
                  </h3>
                  <p className="mt-2 text-slate-300 leading-7 max-w-4xl">
                    Dealerships, service centers, and auto repair teams depend on stable networks.
                    If the service bay Wi-Fi drops, printers fail, or shared PCs act up, the entire workflow slows down.
                    We help stabilize connectivity, tighten security, and keep devices predictable — without getting in the way of day-to-day operations.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid md:grid-cols-2 gap-3 text-slate-200">
                {[
                  "Service-bay Wi-Fi coverage improvements (dead zones → stable signal)",
                  "Network segmentation (staff vs guest vs cameras/IoT/printers)",
                  "Shared PC baseline + safer sign-in practices",
                  "Printer + scanner stability for paperwork-heavy workflows",
                  "Backup + restore testing so recovery isn’t guesswork",
                  "Security basics (MFA guidance + endpoint protection) for fewer incidents",
                ].map((x) => (
                  <div key={x} className="flex gap-2 text-sm">
                    <Network className="h-4 w-4 text-emerald-300 mt-0.5" />
                    {x}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/services/managed-it"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-emerald-300/30 text-emerald-300 bg-emerald-400/10 hover:bg-emerald-400/20"
                >
                  Managed IT for operations <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services/cybersecurity"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Cybersecurity options <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        )}

        {/* services list */}
        <Reveal className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-xl font-semibold">Popular services</h3>
                <p className="text-slate-300 mt-2 max-w-3xl">
                  Browse deliverables, process, and what’s included — designed for fast comparison.
                </p>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                View all services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {Array.isArray(SERVICES) &&
                SERVICES.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
                  >
                    {s.title}
                  </Link>
                ))}
            </div>
          </div>
        </Reveal>

        {/* nearby */}
        {otherLocations.length ? (
          <Reveal className="mt-10">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7">
              <h3 className="text-xl font-semibold">Nearby areas</h3>
              <p className="mt-2 text-slate-300">
                If you’re close to {loc.city}, these nearby locations are also covered:
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {otherLocations.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/locations/${l.slug}`}
                    className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                  >
                    {l.city}, {l.state} <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
                <Link
                  href="/areas"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  View all areas <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        ) : null}

        {/* FAQs */}
        {faqs.length > 0 && (
          <Reveal className="mt-10">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7">
              <h3 className="text-xl font-semibold">
                FAQs — {loc.city}, {loc.state}
              </h3>

              <div className="mt-4 space-y-3">
                {faqs.map((f) => (
                  <details key={f.q} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <summary className="cursor-pointer font-semibold text-slate-200">{f.q}</summary>
                    <p className="mt-2 text-sm text-slate-300 leading-6">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* next steps */}
        <Reveal className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7">
            <h3 className="text-xl font-semibold">Next steps</h3>
            <p className="text-slate-300 mt-2">
              Compare options from our{" "}
              <Link href="/services" className="text-cyan-300 hover:underline">
                Services overview
              </Link>{" "}
              or review{" "}
              <Link href="/faqs" className="text-cyan-300 hover:underline">
                FAQs
              </Link>
              .
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                Explore services <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/areas"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                Areas we serve <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={bookHref(`location-${loc.slug}`)}
                className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Request an assessment <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/get-quote"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                Get a quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
