// app/areas/page.js
import Link from "next/link";
import Script from "next/script";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { BUSINESS_ID, BASE_URL } from "@/lib/seoIds";
import { site } from "@/lib/siteConfig";
import {
  MapPin,
  ShieldCheck,
  Search,
  ArrowRight,
  ChevronDown,
  Clock,
  Laptop2,
  Server,
  Shield,
  ExternalLink,
  ChevronRight,
  Lock,
  Wrench,
  LineChart,
  CheckCircle2,
} from "lucide-react";

// --- SEO (server-side)
export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/areas`;

  const title = "Areas We Serve: Allentown, Macungie & Emmaus, PA";
  const description =
    "Areas we serve for business IT support and managed IT services across Allentown, Macungie & Emmaus, PA. Remote-first helpdesk, cybersecurity, clear SLAs and fast response.";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: `${title} | ${brand}` },
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: brand,
      images: [{ url: "/og-image.png?v=7", width: 1200, height: 630, alt: `${brand} — Areas We Serve` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png?v=7"],
    },
  };
}

const REGIONS = [
  {
    key: "lehigh",
    name: "Allentown, Macungie & Emmaus, PA",
    color: "#34d399",
    cities: [
      { name: "Allentown, PA", slug: "allentown-pa", tier: "A", sla: "P1 ≤ 15 min", pin: [60, 34] },
      { name: "Macungie, PA", slug: "macungie-pa", tier: "A", sla: "P1 ≤ 15 min", pin: [62, 36] },
      { name: "Emmaus, PA", slug: "emmaus-pa", tier: "A", sla: "P1 ≤ 15 min", pin: [61, 35] },
    ],
  },
];

const TIER = {
  A: { label: "Tier A", note: "Fastest remote response", bg: "bg-emerald-500/15", ring: "ring-emerald-400/30" },
  B: { label: "Tier B", note: "Fast remote response", bg: "bg-cyan-500/15", ring: "ring-cyan-400/30" },
  C: { label: "Tier C", note: "Standard remote response", bg: "bg-fuchsia-500/15", ring: "ring-fuchsia-400/30" },
};

// ✅ Stronger “Services Hub” (internal linking boost)
const SERVICE_HUB = [
  {
    key: "managed",
    title: "Managed IT (SupremeCare™)",
    desc: "Helpdesk + monitoring + patching with SLA-backed response times.",
    bullets: ["Helpdesk (P1 ≤ 15 min)", "Monitoring & patching", "Asset & license tracking"],
    href: "/services/managed-it",
    icon: ShieldCheck,
    tags: ["Helpdesk", "Monitoring", "Patching"],
  },
  {
    key: "security",
    title: "Cybersecurity",
    desc: "Identity-first hardening, EDR/XDR protection, email security & recovery.",
    bullets: ["MFA/SSO hardening", "EDR/XDR + policies", "Backup/DR + drills"],
    href: "/services/cybersecurity",
    icon: Lock,
    tags: ["EDR/XDR", "MFA", "Backup/DR"],
  },
  {
    key: "cloud",
    title: "Cloud & Microsoft 365",
    desc: "Tenant governance, migrations, security baselines and cost control.",
    bullets: ["Security baselines", "Migrations & tuning", "M365 backups & restores"],
    href: "/services/cloud-workspace",
    icon: Server,
    tags: ["M365", "Governance", "Migrations"],
  },
  {
    key: "mdm",
    title: "Device Management (MDM)",
    desc: "Enrollment, compliance, app management & device hardening at scale.",
    bullets: ["Zero-touch enrollment", "Patch & app mgmt", "Compliance policies"],
    href: "/services/device-management",
    icon: Laptop2,
    tags: ["MDM", "Compliance", "Hardening"],
  },
  {
    key: "projects",
    title: "Projects & Consulting",
    desc: "Network refresh, migrations, office moves, and modernization projects.",
    bullets: ["Network refresh", "Migrations/rebrands", "Clean decommissions"],
    href: "/services/projects-consulting",
    icon: Wrench,
    tags: ["Network", "Migrations", "Modernization"],
  },
  {
    key: "vcio",
    title: "vCIO / Strategy",
    desc: "Roadmaps, budgets, vendor consolidation and KPI reporting.",
    bullets: ["Roadmaps & budgets", "Vendor consolidation", "Exec-ready KPIs"],
    href: "/services/vcio-strategy",
    icon: LineChart,
    tags: ["Roadmaps", "Budgets", "KPIs"],
  },
];

const FAQS = [
  {
    q: "Do you provide IT support across Allentown, Macungie, and Emmaus?",
    a: "Yes — we support SMBs across Allentown, Macungie, and Emmaus with remote-first help desk support and onsite visits when needed.",
  },
  {
    q: "Should this Areas page rank, or the city Location page?",
    a: "The city Location pages are built to rank for city-specific searches. This Areas page is a hub that strengthens crawl paths and helps users reach the correct city page fast.",
  },
  {
    q: "Do you offer managed IT services and cybersecurity together?",
    a: "Yes — we combine managed IT (monitoring, patching, helpdesk) with security-first baselines, identity hardening, endpoint protection, and backup/recovery planning.",
  },
  {
    q: "What’s the fastest way to get started?",
    a: "Book a free 20-minute assessment or request a quote. We’ll confirm scope and share a practical 30–90 day stabilization plan.",
  },
];

const normalize = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-[12px] border border-white/10 bg-white/5">
    {children}
  </span>
);

function TierBadge({ tier }) {
  const t = TIER[tier] || TIER.C;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] text-slate-100 ring ${t.bg} ${t.ring}`}
      title={t.note}
    >
      {t.label}
    </span>
  );
}

function RegionMap({ regions, active }) {
  const buildHref = (key) => {
    const params = new URLSearchParams();
    params.set("region", key);
    return `/areas?${params.toString()}`;
  };

  return (
    <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.02]">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.18),transparent_60%)]" />

      <svg viewBox="0 0 100 100" className="w-full h-[360px] md:h-[500px]" aria-label="Service area map">
        <g className="fill-white/6 stroke-white/10">
          <path d="M28,20 C34,16 46,14 58,18 C68,21 76,28 82,36 C88,44 92,54 88,64 C84,72 76,78 66,82 C58,84 48,85 40,82 C28,78 22,70 18,60 C14,50 16,40 20,32 C22,26 24,22 28,20 Z" />
        </g>

        {regions.map((r) =>
          r.cities.map((c) => (
            <a key={r.key + c.name} href={buildHref(r.key)} aria-label={`View ${r.name} cities`}>
              <circle cx={c.pin[0]} cy={c.pin[1]} r="1.15" fill={r.color} className="opacity-90" />
              <circle
                cx={c.pin[0]}
                cy={c.pin[1]}
                r="2.3"
                fill="none"
                stroke={r.color}
                strokeWidth="0.2"
                className="opacity-40"
              />
            </a>
          ))
        )}
      </svg>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <a
              key={r.key}
              href={buildHref(r.key)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition ${
                active === r.key
                  ? "border-cyan-300/40 text-cyan-300 bg-cyan-400/10"
                  : "border-white/10 text-slate-300 hover:bg-white/5"
              }`}
            >
              {r.name}
            </a>
          ))}
        </div>

        <Link
          href="/contact?type=assessment&source=areas"
          className="text-xs rounded-lg px-3 py-1.5 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
        >
          Book a 20-min Assessment
        </Link>
      </div>
    </div>
  );
}

function ServiceCard({ s }) {
  const Icon = s.icon;
  return (
    <Link
      href={s.href}
      className="group block rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-cyan-300/30 hover:bg-cyan-400/10 transition"
      aria-label={`Open ${s.title}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="mt-0.5 grid place-items-center size-10 rounded-xl bg-white/10 border border-white/10 shrink-0">
            <Icon className="h-5 w-5 text-cyan-200" />
          </div>

          <div className="min-w-0">
            <div className="font-semibold">{s.title}</div>
            <p className="mt-1 text-sm text-slate-300 leading-6">{s.desc}</p>
          </div>
        </div>

        <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-cyan-200 transition shrink-0" />
      </div>

      {Array.isArray(s.tags) && s.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {s.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
              {t}
            </span>
          ))}
        </div>
      )}

      {Array.isArray(s.bullets) && s.bullets.length > 0 && (
        <ul className="mt-4 space-y-1 text-sm text-slate-300">
          {s.bullets.slice(0, 3).map((b) => (
            <li key={b}>• {b}</li>
          ))}
        </ul>
      )}

      <div className="mt-4 h-1 w-0 bg-cyan-400/70 group-hover:w-full transition-all rounded-full" />
    </Link>
  );
}

export default async function AreasPage({ searchParams }) {
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const brand = site?.name || "Supreme IT Experts";

  // ✅ keep this await (Next 15 sync-dynamic-apis warning)
  const sp = (await searchParams) || {};
  const regionParam = Array.isArray(sp.region) ? sp.region[0] : sp.region;
  const qParam = Array.isArray(sp.q) ? sp.q[0] : sp.q;

  const regionKey = (regionParam ?? "lehigh").toString();
  const q = (qParam ?? "").toString();

  const region =
    REGIONS.find((r) => r.key === regionKey) ??
    REGIONS.find((r) => r.key === "lehigh") ??
    REGIONS[0];

  const nq = normalize(q);
  const order = { A: 0, B: 1, C: 2 };

  const filtered = region.cities
    .filter((c) => !nq || normalize(c.name).includes(nq))
    .sort((a, b) => order[a.tier] - order[b.tier] || a.name.localeCompare(b.name));

  const popularLocations = [
    { name: "Allentown, PA", slug: "allentown-pa" },
    { name: "Macungie, PA", slug: "macungie-pa" },
    { name: "Emmaus, PA", slug: "emmaus-pa" },
    { name: "Broomall, PA", slug: "broomall-pa" },
    { name: "Newtown Square, PA", slug: "newtown-square-pa" },
    { name: "Havertown, PA", slug: "havertown-pa" },
    { name: "Springfield, PA", slug: "springfield-pa" },
    { name: "Media, PA", slug: "media-pa" },
  ];

  // ✅ JSON-LD (Best practice: single @graph)
  const CANONICAL = `${baseUrl}/areas`;
  const WEBSITE_ID = `${baseUrl}/#website`;
  const WEBPAGE_ID = `${CANONICAL}#webpage`;
  const BREADCRUMB_ID = `${CANONICAL}#breadcrumb`;
  const POPULAR_ID = `${CANONICAL}#popular-locations`;
  const REGION_ID = `${CANONICAL}#region-${region.key}`;
  const FAQ_ID = `${CANONICAL}#faq`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${baseUrl}/`,
        name: brand,
        publisher: { "@id": BUSINESS_ID },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: CANONICAL,
        name: "Areas We Serve",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": BUSINESS_ID },
        breadcrumb: { "@id": BREADCRUMB_ID },
      },
      {
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
          { "@type": "ListItem", position: 2, name: "Areas We Serve", item: CANONICAL },
        ],
      },
      {
        "@type": "ItemList",
        "@id": POPULAR_ID,
        name: "Popular IT Support Locations",
        itemListElement: popularLocations.map((x, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: x.name,
          url: `${baseUrl}/locations/${x.slug}`,
        })),
      },
      {
        "@type": "ItemList",
        "@id": REGION_ID,
        name: `Service cities — ${region.name}`,
        itemListElement: region.cities.map((c, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: c.name,
          url: `${baseUrl}/locations/${c.slug}`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": FAQ_ID,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
        isPartOf: { "@id": WEBPAGE_ID },
      },
    ],
  };

  return (
    <>
      <Script id="areas-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        eyebrow="Areas we serve"
        title="Remote-first IT support in Allentown, Macungie & Emmaus"
        sub="We support SMBs across Allentown, Macungie, and Emmaus with fast remote response, clear SLAs, and consistent service."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {/* ✅ Intent line */}
        <Reveal className="mt-4">
          <p className="text-sm text-slate-300">
            Looking for{" "}
            <span className="text-slate-100 font-medium">business IT support near Macungie, PA</span> or{" "}
            <span className="text-slate-100 font-medium">managed IT services in Allentown</span>? Start here, then open
            your local page:{" "}
            <Link href="/locations/macungie-pa" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
              Macungie
            </Link>
            {", "}
            <Link href="/locations/allentown-pa" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
              Allentown
            </Link>
            {", "}
            <Link href="/locations/emmaus-pa" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
              Emmaus
            </Link>
            .
          </p>
        </Reveal>

        {/* ✅ City mini-sections (unique text) — important hub content */}
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">City coverage highlights</div>
            <div className="mt-4 grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Allentown, PA",
                  href: "/locations/allentown-pa",
                  text: "Managed IT services + help desk support for teams that need fast response, proactive monitoring, and practical security hardening.",
                },
                {
                  title: "Macungie, PA",
                  href: "/locations/macungie-pa",
                  text: "Business IT support near Macungie with remote-first troubleshooting, onsite support when required, and predictable fixed-fee options.",
                },
                {
                  title: "Emmaus, PA",
                  href: "/locations/emmaus-pa",
                  text: "IT support and cybersecurity-focused baselines for SMBs that want fewer recurring issues and stable day-to-day operations.",
                },
              ].map((x) => (
                <div key={x.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="font-semibold">{x.title}</div>
                  <p className="mt-2 text-sm text-slate-300 leading-6">{x.text}</p>
                  <Link
                    href={x.href}
                    className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-300 hover:underline"
                  >
                    View location page <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Popular locations pills */}
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Popular locations</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {popularLocations.map((x) => (
                <Link
                  key={x.slug}
                  href={`/locations/${x.slug}`}
                  className="inline-flex items-center gap-2 text-xs rounded-lg px-3 py-1.5 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10"
                >
                  <MapPin className="h-3.5 w-3.5 text-cyan-300" />
                  {x.name}
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Services hub */}
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Services hub</div>
                <h2 className="text-xl md:text-2xl font-semibold">Explore the services our team bundles together</h2>
                <p className="mt-2 text-slate-300 max-w-3xl">
                  Services → Areas → Location Pages. Better crawl paths and topical relevance.
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  View all services <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact?type=assessment&source=areas-services-hub"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Book a 20-min Assessment <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICE_HUB.map((s) => (
                <ServiceCard key={s.key} s={s} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Map + Region list */}
        <div className="grid md:grid-cols-2 gap-6 items-start mt-6">
          <Reveal>
            <RegionMap regions={REGIONS} active={region.key} />
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Region</div>
                  <h2 className="text-xl font-semibold">{region.name}</h2>
                </div>
                <Pill>
                  <ShieldCheck className="h-4 w-4 text-cyan-300" /> SLA-backed
                </Pill>
              </div>

              <form action="/areas" method="get" className="mt-4">
                <input type="hidden" name="region" value={region.key} />
                <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2">
                  <Search className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                  <input
                    name="q"
                    defaultValue={q}
                    placeholder="Find a city in this region…"
                    className="w-full bg-transparent outline-none text-sm"
                    aria-label={`Search cities in ${region.name}`}
                  />
                </label>
                <div className="mt-2">
                  <button className="text-xs rounded-lg px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10">
                    Apply
                  </button>
                </div>
              </form>

              <div className="mt-4 grid gap-3">
                {filtered.map((c) => (
                  <div
                    key={c.name}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-cyan-300/30 hover:-translate-y-0.5 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 grid place-items-center size-8 rounded-lg bg-white/5 border border-white/10">
                          <MapPin className="h-4 w-4 text-cyan-300" />
                        </span>
                        <div>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2 mt-1">
                            <TierBadge tier={c.tier} />
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" /> {c.sla}
                            </span>
                            <span className="text-slate-500">• Remote support</span>
                          </div>

                          {c.slug && (
                            <div className="mt-3">
                              <Link
                                href={`/locations/${c.slug}`}
                                className="inline-flex items-center gap-2 text-xs rounded-lg px-3 py-1.5 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                                aria-label={`Open ${c.name} location page`}
                              >
                                View location page <ExternalLink className="h-3.5 w-3.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>

                      <Pill>
                        <ShieldCheck className="h-4 w-4 text-cyan-300" /> Coverage
                      </Pill>
                    </div>
                  </div>
                ))}

                {filtered.length === 0 && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
                    No matches — try a different name.
                  </div>
                )}
              </div>

              <div className="mt-5 flex gap-2">
                <Link
                  href="/contact?type=assessment&source=areas-region"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Book a 20-min Assessment <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  Contact
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* How we deliver */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">How we deliver</div>
            <h3 className="text-lg font-semibold">Consistent, security-first stack (remote)</h3>

            <div className="grid sm:grid-cols-3 gap-4 mt-4 text-sm">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 font-medium">
                  <Laptop2 className="h-4 w-4 text-cyan-300" /> Endpoints
                </div>
                <ul className="mt-2 space-y-1 text-slate-300">
                  <li>• Patching &amp; health</li>
                  <li>• Device baselines</li>
                  <li>• App catalogs</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 font-medium">
                  <Server className="h-4 w-4 text-cyan-300" /> Cloud &amp; Identity
                </div>
                <ul className="mt-2 space-y-1 text-slate-300">
                  <li>• Monitoring &amp; backups</li>
                  <li>• IAM / MFA / SSO</li>
                  <li>• Governance</li>
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 font-medium">
                  <Shield className="h-4 w-4 text-cyan-300" /> Security
                </div>
                <ul className="mt-2 space-y-1 text-slate-300">
                  <li>• EDR/XDR</li>
                  <li>• Email security</li>
                  <li>• Recovery drills</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Regions accordion */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5">
            {REGIONS.map((r) => {
              const href = `/areas?region=${r.key}${q ? `&q=${encodeURIComponent(q)}` : ""}`;

              return (
                <details
                  key={r.key}
                  className="border-b border-white/10 last:border-none group open:bg-white/[0.03]"
                  open={r.key === region.key}
                >
                  <summary className="cursor-pointer list-none px-4 md:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="inline-block size-3 rounded-full" style={{ background: r.color }} />
                      <div className="font-medium">{r.name}</div>
                      <span className="text-xs text-slate-400">{r.cities.length} cities</span>
                    </div>
                    <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                  </summary>

                  <div className="px-4 md:px-6 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {r.cities.map((c) => (
                        <div key={c.name} className="flex flex-wrap gap-2">
                          <span className="text-sm rounded-lg px-3 py-1.5 border border-white/10 bg-white/5">
                            {c.name} • <span className="text-slate-400">{c.sla}</span>
                          </span>

                          {c.slug && (
                            <Link
                              href={`/locations/${c.slug}`}
                              className="text-sm rounded-lg px-3 py-1.5 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                            >
                              Location page
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-3">
                      <a
                        href={href}
                        className="inline-block text-xs rounded-lg px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10"
                      >
                        View this region
                      </a>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </Reveal>

        {/* ✅ NEW: FAQ section (matches FAQ schema) */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">FAQs</div>
            <h2 className="text-xl font-semibold mt-1">Quick answers</h2>

            <div className="mt-4 space-y-3">
              {FAQS.map((f) => (
                <details key={f.q} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <summary className="cursor-pointer font-semibold text-slate-200">{f.q}</summary>
                  <p className="mt-2 text-sm text-slate-300 leading-6">{f.a}</p>
                </details>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact?type=assessment&source=areas-faq"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Book a 20-min Assessment <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/get-quote"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                Pricing & quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Footer CTA */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Not seeing your exact city?</h3>
              <p className="text-slate-300">
                We’re remote-first and can support businesses anywhere in the US — reach out and we’ll confirm fit.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/contact?type=assessment&source=areas-footer"
                className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Book a 20-min Assessment
              </Link>
              <Link
                href="/contact"
                className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
