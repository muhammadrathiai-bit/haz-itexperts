// app/services/vcio-strategy/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";
import { BUSINESS_ID, BASE_URL } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonicalAbs = `${baseUrl}/services/vcio-strategy`;

  const fullTitle = `vCIO & IT Strategy in Allentown, PA | Roadmaps, Budgets & KPI Reporting | ${brand}`;

  const description =
    "vCIO / IT strategy for SMBs in Allentown, Macungie & Emmaus: quarterly roadmaps, budget planning, vendor reviews, risk register, executive reporting, and measurable KPIs for leadership.";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: "/services/vcio-strategy" },
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
      title: fullTitle,
      description,
      type: "website",
      url: canonicalAbs,
      siteName: brand,
      images: [
        {
          url: "/og-image.png?v=7",
          width: 1200,
          height: 630,
          alt: `${brand} — vCIO / Strategy`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.png?v=7"],
    },
  };
}

export default function Page() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services/vcio-strategy`;

  const faqs = [
    {
      q: "What does a vCIO do?",
      a: "A vCIO aligns IT with business goals by building a roadmap, forecasting budgets, managing vendors, and reporting KPIs and risk in a leadership-friendly format.",
    },
    {
      q: "How often do we review progress?",
      a: "We run regular check-ins and formal QBR-style reviews quarterly, including KPIs, risks, initiatives, and next-quarter priorities.",
    },
    {
      q: "Do you help with vendor consolidation and renewals?",
      a: "Yes. We evaluate overlap, right-size licensing, build a renewal calendar, and provide simple scorecards so decisions are data-driven.",
    },
    {
      q: "Can you help plan device refresh and budgeting?",
      a: "Yes. We can build a realistic refresh plan and budget forecast so device replacements and licensing aren’t last-minute surprises.",
    },
    {
      q: "Do you create policies and standards?",
      a: "Yes. We help define practical standards that your team can follow—identity/admin hygiene, device baselines, backup expectations, and reporting cadence.",
    },
    {
      q: "Is this only for bigger companies?",
      a: "No. SMBs benefit heavily from clarity: what to fix first, what to defer, and how to reduce risk while staying cost-efficient.",
    },
  ];

  const cfg = {
    title: "vCIO / Strategy",
    lede:
      "Turn IT into a plan you can run: roadmaps, budgets, vendor decisions, and KPIs presented in a leadership-friendly format.",
    hero: "/images/services/vcio-hero.svg",

    // ✅ Optional internal-link block (safe even if your component ignores it)
    localLinks: {
      eyebrow: "Local leadership support",
      title: "Strategy support across Allentown + nearby",
      desc: "Open a location page for coverage details and a simple “start here” path.",
      items: [
        {
          label: "Allentown, PA",
          href: "/locations/allentown-pa",
          desc: "Roadmaps, vendor reviews, KPI dashboards, QBR cadence.",
        },
        {
          label: "Macungie, PA",
          href: "/locations/macungie-pa",
          desc: "Budget planning, refresh cycles, risk register + mitigation.",
        },
        {
          label: "Emmaus, PA",
          href: "/locations/emmaus-pa",
          desc: "Executive reporting + prioritized initiative sequencing.",
        },
      ],
      cta1: { label: "View all areas", href: "/areas" },
      cta2: { label: "Request a Strategy Call", href: "/get-quote?source=vcio-areas" },
    },

    stats: [
      { kpi: "Roadmap", label: "Prioritized initiatives" },
      { kpi: "Budget", label: "Forecast + refresh planning" },
      { kpi: "KPIs", label: "Operational visibility" },
      { kpi: "QBR", label: "Leadership reviews" },
    ],

    sections: [
      {
        heading: "A roadmap that matches business reality",
        body:
          "We translate goals into a clear sequence of initiatives—what to do first, what to defer, and why. Each initiative is tied to outcomes like risk reduction, reliability, efficiency, or growth. The roadmap becomes the source of truth for priorities instead of random urgent requests.",
        image: "/images/illus/roadmap.svg",
        imageSide: "right",
      },
      {
        heading: "Budget and vendor decisions without surprises",
        body:
          "We create a practical forecast for licensing, device refresh, and security needs. Vendor reviews reduce overlap, and a renewal calendar keeps decisions proactive instead of last-minute. You get simple scorecards so leadership can choose tools based on value, not noise.",
        image: "/images/illus/vendors.svg",
        imageSide: "left",
      },
      {
        heading: "KPIs leadership can actually use",
        body:
          "We report on service health, security posture, projects, and risks in a simple dashboard format. You get the context behind the numbers and the next actions—so meetings end with decisions, not confusion.",
        image: "/images/illus/screens-2.svg",
        imageSide: "right",
      },
    ],

    problems: [
      "IT decisions feel reactive and urgent instead of planned",
      "Licensing and renewals surprise leadership at the last minute",
      "No clear refresh cycle for devices or infrastructure",
      "KPIs don’t exist, or they’re too technical to act on",
      "Tool overlap increases cost without improving outcomes",
      "Risk is discussed but not tracked in a practical register",
    ],

    outcomes: [
      "A prioritized roadmap tied to business outcomes",
      "Budget forecast + refresh plan that reduces surprises",
      "Vendor consolidation and renewal planning",
      "Leadership-friendly KPIs with clear next actions",
      "Risk register with practical mitigation steps",
      "Quarterly review cadence that drives decisions",
    ],

    features: [
      { icon: "LineChart", title: "QBRs", desc: "KPIs, risks, and health reviews with leadership." },
      {
        icon: "BookOpen",
        title: "Standards & Governance",
        desc: "Practical policies and an operating model your team can follow.",
      },
      { icon: "BarChart3", title: "Budget & Forecast", desc: "12–18 month view of spend, refresh cycles, and licensing." },
      { icon: "Network", title: "Vendor Management", desc: "Right-size tools, reduce overlap, and manage renewals." },
      { icon: "Sparkles", title: "Pilot Before You Commit", desc: "Small, low-risk trials to validate value." },
      { icon: "Building2", title: "Exec Reporting", desc: "Clear summaries that work for owners and leadership teams." },
    ],

    gallery: ["/images/illus/screens-1.svg", "/images/illus/screens-2.svg", "/images/illus/screens-3.svg"],

    steps: [
      {
        title: "Baseline",
        desc: "Review current tooling, risks, and priorities with leadership.",
        outputs: ["Current-state summary", "Risk register draft", "Quick-win shortlist"],
      },
      {
        title: "Roadmap",
        desc: "Build the initiative plan with sequencing and business rationale.",
        outputs: ["Roadmap v1", "Dependencies map", "Success metrics per initiative"],
      },
      {
        title: "Budget",
        desc: "Forecast licensing, refresh cycles, and planned initiatives.",
        outputs: ["12–18 month forecast", "Renewal calendar", "Refresh plan"],
      },
      {
        title: "Operate",
        desc: "Run KPI reporting and quarterly reviews to keep momentum.",
        outputs: ["KPI dashboard", "QBR deck", "Next-quarter priorities"],
      },
    ],

    deliverables: [
      "Roadmap with priorities and sequencing",
      "Budget forecast + refresh cycle planning",
      "Vendor renewal calendar + consolidation recommendations",
      "Risk register with mitigation actions",
      "Leadership KPI dashboard (service, security, projects)",
      "Quarterly review deck + action items",
    ],

    tooling: [
      "KPI dashboard/reporting",
      "Risk register and review cadence",
      "Vendor renewal calendar",
      "Roadmap planning templates",
      "Policy/standards docs",
      "Asset + refresh planning notes",
    ],

    timeline: [
      { when: "Month 1", title: "Baseline & priorities", desc: "Current-state review, risks, and first roadmap draft" },
      { when: "Month 2", title: "Budget + vendor review", desc: "Forecast, renewals, and consolidation recommendations" },
      { when: "Quarterly", title: "QBR / leadership review", desc: "KPIs, progress, and next-quarter plan" },
    ],


    faqs,
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      { "@type": "ListItem", position: 3, name: "vCIO / Strategy", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "vCIO & IT Strategy",
    serviceType: "Virtual CIO & IT Strategy",
    description:
      "Roadmaps, budget planning, vendor reviews, governance, and executive reporting with measurable KPIs for small and mid-sized businesses.",
    url: canonical,
    provider: { "@id": BUSINESS_ID },
    areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA"],
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/get-quote`,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    name: `vCIO / Strategy | ${brand}`,
    url: canonical,
    description: "Roadmaps, budgets, vendor decisions, executive reporting, and measurable KPIs—built for SMBs.",
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    publisher: { "@id": BUSINESS_ID },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    mainEntity: { "@id": `${canonical}#service` },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: faqs.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, webPageSchema, serviceSchema, faqSchema]),
        }}
      />
      <ServiceClientPage cfg={cfg} canonical={canonical} />
    </>
  );
}
