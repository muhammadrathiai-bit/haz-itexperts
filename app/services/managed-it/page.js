// app/services/managed-it/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";
import { BUSINESS_ID, BASE_URL } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonicalAbs = `${baseUrl}/services/managed-it`;

  const fullTitle = `Managed IT Services in Allentown, PA | Helpdesk, Monitoring & Patching | ${brand}`;

  const description =
    "Managed IT for small businesses in Allentown (Macungie, Emmaus): responsive helpdesk, proactive monitoring, patch management, endpoint baselines, onboarding/offboarding, and leadership reporting (fully managed or co-managed).";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: "/services/managed-it" },
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
          alt: `${brand} — Managed IT Services`,
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
  const canonical = `${baseUrl}/services/managed-it`;

  const faqs = [
    {
      q: "What’s included in managed IT?",
      a: "Helpdesk (email/chat/portal), monitoring, patch management, baseline security hardening, onboarding/offboarding checklists, and monthly KPI reporting. We can run everything end-to-end or co-manage with your internal IT.",
    },
    {
      q: "Do you offer co-managed IT?",
      a: "Yes. We can share tools, SOPs, escalations, and reporting with your internal IT team. You keep control; we strengthen coverage and visibility where you need it most.",
    },
    {
      q: "What are your SLA targets?",
      a: "We set SLA targets based on business hours and risk. Critical issues get rapid response targets, while standard requests follow agreed same-day/next-day handling—with monthly SLA reporting and continuous improvement.",
    },
    {
      q: "How do you handle onboarding and offboarding?",
      a: "We use checklists: accounts, MFA, device baselines, email/groups, app access, and admin rights. That reduces access mistakes and keeps audits simpler.",
    },
    {
      q: "Do you support Microsoft 365 and Google Workspace environments?",
      a: "Yes. We support identity, email, device baselines, and collaboration tooling, and we can coordinate with your vendors or manage the stack directly.",
    },
    {
      q: "How fast can you stabilize a messy environment?",
      a: "Many SMBs see noticeable improvement within the first 30 days once monitoring, patching, baselines, and ticket ownership are in place. Exact timelines depend on device count, tooling, and current risk level.",
    },
  ];

  const cfg = {
    title: "Managed IT Services",
    lede:
      "Day-to-day IT, done right—helpdesk, patching, monitoring, and secure device baselines—so your team can stay focused on the business (fully managed or co-managed).",
    hero: "/images/services/managed-hero.svg",

    // ✅ NEW: internal linking block (renders in ServiceClientPage if supported)
    localLinks: {
      eyebrow: "Start with your area",
      title: "Managed IT coverage in the Lehigh Valley",
      desc: "Open your location page for coverage details, FAQs, and the right service bundle for your business.",
      items: [
        {
          label: "Allentown, PA",
          href: "/locations/allentown-pa",
          desc: "Helpdesk + monitoring + patching for Allentown SMBs.",
        },
        {
          label: "Macungie, PA",
          href: "/locations/macungie-pa",
          desc: "Stabilization sprint + baseline hardening.",
        },
        {
          label: "Emmaus, PA",
          href: "/locations/emmaus-pa",
          desc: "Co-managed or fully managed support options.",
        },
      ],
      cta1: { label: "View all areas", href: "/areas" },
      cta2: {
        label: "Get a Free IT Assessment",
        href: "/get-quote?source=managed-it-areas",
      },
    },

    stats: [
      { kpi: "Fast", label: "P1 response targets" },
      { kpi: "Stable", label: "Patch & baseline cadence" },
      { kpi: "Clear", label: "KPIs for leadership" },
      { kpi: "30 days", label: "Typical stabilization sprint" },
    ],

    sections: [
      {
        heading: "Helpdesk that actually closes tickets",
        body:
          "Requests come in through email, chat, or portal—our triage process assigns the right priority fast and keeps clear ownership on every ticket. You get monthly SLA/KPI reporting, so leadership sees what’s working, what’s trending, and what needs attention. Less ping-pong, faster resolution, and clearer accountability.",
        image: "/images/illus/helpdesk.svg",
        imageSide: "right",
      },
      {
        heading: "Standardized endpoints = fewer surprises",
        body:
          "We implement consistent Windows/macOS baselines, automated patching, and curated app policies to reduce drift. Monitoring catches issues early, and backup verification plus restore testing makes recovery predictable—not a guess. The goal is fewer incidents and faster recovery when something breaks.",
        image: "/images/illus/devices.svg",
        imageSide: "left",
      },
      {
        heading: "Co-managed or fully managed—your choice",
        body:
          "Have internal IT? We can complement your team with shared tooling, SOPs, escalations, and reporting. Or we can run everything end-to-end. Either way, the outcome is the same: fewer repeat issues, faster resolution, better security hygiene, and better visibility for leadership.",
        image: "/images/illus/screens-2.svg",
        imageSide: "right",
      },
    ],

    problems: [
      "Tickets bounce around with no clear ownership or SLA",
      "Endpoints drift — missed patches, outdated apps, inconsistent configs",
      "On/Offboarding takes too long and access mistakes happen",
      "Leadership has no simple KPIs or risk visibility",
      "Backups exist but recovery steps aren’t tested",
      "Vendors and renewals feel reactive and expensive",
    ],

    outcomes: [
      "Consistent SLAs with clear ticket ownership and escalation",
      "Predictable patching & hardened device baselines",
      "Checklist-driven hires/leavers with fewer access errors",
      "Executive-ready reporting (tickets, assets, patch, risk)",
      "Backup verification + restore tests for recovery confidence",
      "Cleaner tooling with fewer overlaps and surprises",
    ],

    features: [
      { icon: "Wrench", title: "Helpdesk", desc: "Email/chat/portal support with triage and ownership." },
      { icon: "Server", title: "Monitoring", desc: "Endpoint/server/network health signals and alerting." },
      { icon: "Lock", title: "Baseline Security", desc: "Practical hardening + MFA guidance + endpoint protection baseline." },
      { icon: "Database", title: "Backup Checks", desc: "Verification + restore testing for predictable recovery." },
      { icon: "Users", title: "Lifecycle", desc: "Onboarding/offboarding checklists and access hygiene." },
      { icon: "LineChart", title: "Reporting", desc: "Monthly KPI pack: tickets, response, patch, and risk trends." },
    ],

    gallery: ["/images/illus/screens-1.svg", "/images/illus/screens-2.svg", "/images/illus/screens-3.svg"],

    steps: [
      {
        title: "Assess",
        desc: "Users, devices, identity, and risks. We align support hours and SLA expectations.",
        outputs: ["Access & tooling plan", "Initial risk register", "Ticket categories & priorities"],
      },
      {
        title: "Stabilize",
        desc: "Monitoring + patching + baseline hardening + backup checks to stop recurring fires.",
        outputs: ["Patch cadence/rings", "Baseline policies", "Backup verification notes"],
      },
      {
        title: "Optimize",
        desc: "SOPs, automation, and self-service improvements that reduce tickets and downtime.",
        outputs: ["Runbooks & KB", "Automation backlog", "Repeat-issue elimination plan"],
      },
      {
        title: "Grow",
        desc: "Roadmap planning and continuous improvement cadence with leadership reporting.",
        outputs: ["QBR deck", "Quarterly plan / OKRs", "Budget + refresh timeline"],
      },
    ],

    deliverables: [
      "Ticketing + SLA dashboard (monthly)",
      "Asset inventory + ownership map",
      "Patch + baseline status reporting",
      "Backup verification + restore test notes",
      "Security hygiene checklist (MFA, admin roles, device posture)",
      "Quarterly roadmap & budget view",
    ],

    tooling: ["RMM", "EDR/XDR", "Intune/Jamf", "M365/Workspace", "Ticketing + KB", "Reporting/KPI pack", "Password/MFA standards"],

    timeline: [
      { when: "Week 1", title: "Access & discovery", desc: "Tooling connected + quick wins" },
      { when: "Weeks 2–3", title: "Stabilization sprint", desc: "Patching/monitoring/baselines + backup checks" },
      { when: "Week 4", title: "Reporting + roadmap", desc: "Leadership metrics + next-steps plan" },
    ],
    compactTimeline: true,


    faqs,
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      { "@type": "ListItem", position: 3, name: "Managed IT", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Managed IT Services",
    serviceType: "Managed IT Services",
    description:
      "Helpdesk with SLAs, proactive monitoring, patch management, endpoint baselines, onboarding/offboarding, and leadership reporting for small and mid-sized businesses.",
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
    url: canonical,
    name: `Managed IT Services in Allentown, PA | ${brand}`,
    description:
      "Managed IT for SMBs: helpdesk with SLAs, patching, monitoring, endpoint baselines, and leadership reporting.",
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
