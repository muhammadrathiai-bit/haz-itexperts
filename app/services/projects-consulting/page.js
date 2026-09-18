// app/services/projects-consulting/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";
import { BUSINESS_ID, BASE_URL } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonicalAbs = `${baseUrl}/services/projects-consulting`;

  const fullTitle = `IT Projects & Consulting in Allentown, PA | Migrations, Audits & Network Refresh | ${brand}`;

  const description =
    "Fixed-scope IT projects for SMBs in Allentown, Macungie & Emmaus: IT audits, office moves, network refresh, cloud migrations, directory cleanup, decommissions, and automation — with runbooks, rollback plans, and clean handover documentation.";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: "/services/projects-consulting" },
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
          alt: `${brand} — Projects & Consulting`,
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
  const canonical = `${baseUrl}/services/projects-consulting`;

  const faqs = [
    {
      q: "Do you offer fixed-scope projects?",
      a: "Yes. We can deliver fixed-scope projects with defined deliverables, milestones, and acceptance checks. Time-and-materials is available when scope is evolving.",
    },
    {
      q: "Can projects be done after-hours or on weekends?",
      a: "Yes. We plan change windows to reduce business disruption, including evenings and weekends, with rollback steps documented in advance.",
    },
    {
      q: "What does the handover include?",
      a: "As-built documentation, runbooks, admin notes/training, and a short post-project support path so the environment is easy to operate.",
    },
    {
      q: "Do you handle network refresh projects?",
      a: "Yes. We can plan and implement switch/Wi-Fi refresh, segmentation, and standard configurations with validation and rollback steps.",
    },
    {
      q: "Can you help with tenant migrations or rebrands?",
      a: "Yes. We can plan cutovers, staged moves, and validation so business disruption stays low and handover stays clean.",
    },
    {
      q: "Do you coordinate with vendors?",
      a: "Yes. We can coordinate ISPs, SaaS vendors, VoIP, and hardware suppliers as part of the project plan and change windows.",
    },
  ];

  const cfg = {
    title: "Projects & Consulting",
    lede:
      "Fixed-scope IT projects with clear timelines, acceptance checks, and clean handovers—so upgrades happen without business disruption.",
    hero: "/images/services/projects-hero.svg",

    // ✅ NEW: internal linking block (same style as the Managed IT update)
    localLinks: {
      eyebrow: "Start with your area",
      title: "Projects delivered across Allentown + nearby",
      desc: "Open your location page for coverage details, common project types, and next steps.",
      items: [
        {
          label: "Allentown, PA",
          href: "/locations/allentown-pa",
          desc: "Audits, migrations, refreshes, and after-hours change windows.",
        },
        {
          label: "Macungie, PA",
          href: "/locations/macungie-pa",
          desc: "Network/Wi-Fi refresh, office moves, and clean handover packs.",
        },
        {
          label: "Emmaus, PA",
          href: "/locations/emmaus-pa",
          desc: "Tenant moves, rebrands, and staged cutovers with rollback plans.",
        },
      ],
      cta1: { label: "View all areas", href: "/areas" },
      cta2: { label: "Get a Free IT Assessment", href: "/get-quote?source=projects-consulting-areas" },
    },

    stats: [
      { kpi: "Fixed-scope", label: "Clear deliverables" },
      { kpi: "Runbooks", label: "Step-by-step execution" },
      { kpi: "Change windows", label: "Evenings/weekends" },
      { kpi: "Handover", label: "As-built documentation" },
    ],

    sections: [
      {
        heading: "Production-ready design and planning",
        body:
          "We plan projects the way they’ll be operated in real life: scope, dependencies, risks, communications, and acceptance criteria. You get a runbook and rollback plan—so stakeholders know what “done” means and what happens if anything goes sideways.",
        image: "/images/illus/network.svg",
        imageSide: "right",
      },
      {
        heading: "Migrations and decommissions done safely",
        body:
          "We execute migrations and retire legacy systems with a safety-first approach: backups and validation, staged cutovers where possible, and documented checkpoints. The goal is simpler infrastructure that’s easier to support and less risky long-term.",
        image: "/images/illus/servers.svg",
        imageSide: "left",
      },
      {
        heading: "Clean handover (or we can run it for you)",
        body:
          "If you have internal IT, we hand over with as-built docs and admin notes. If you want ongoing support, we can transition the project outcome into managed service with monitoring, patching, and helpdesk coverage.",
        image: "/images/illus/screens-2.svg",
        imageSide: "right",
      },
    ],

    problems: [
      "Projects run without clear acceptance criteria",
      "Cutovers happen without rollback steps",
      "Vendor coordination becomes chaotic",
      "Post-project documentation is missing or outdated",
      "Legacy systems linger and increase risk",
      "Stakeholders don’t know timelines or next actions",
    ],

    outcomes: [
      "Clear scope and milestones with acceptance checks",
      "Runbooks and rollback plans for safer change windows",
      "Simplified environment with less operational risk",
      "Clean handover pack that internal IT can operate",
      "Reduced disruption via staged execution where possible",
      "Better planning for future refresh and budgets",
    ],

    features: [
      { icon: "Wrench", title: "Network Refresh", desc: "Switches, Wi-Fi, VLANs/segmentation, and standard configs." },
      { icon: "Server", title: "Server Refresh / Decommission", desc: "Migrate workloads and retire legacy safely." },
      { icon: "Cloud", title: "Email / Tenant Moves", desc: "Cutovers, rebrands, and mailbox/data migrations." },
      { icon: "Cpu", title: "Directory Cleanup", desc: "AD/Entra cleanup, OU/GPO refactor, access hardening." },
      { icon: "BarChart3", title: "Cost Optimization", desc: "Licensing cleanup and vendor consolidation." },
      { icon: "Sparkles", title: "Automation", desc: "Scripting and lightweight workflow automation." },
    ],

    gallery: ["/images/illus/screens-1.svg", "/images/illus/screens-2.svg", "/images/illus/screens-3.svg"],

    steps: [
      {
        title: "Discovery",
        desc: "Workshops + current-state capture.",
        outputs: ["Requirements", "Risks & dependencies", "Success criteria"],
      },
      {
        title: "Plan",
        desc: "Design + cutover + rollback plan.",
        outputs: ["Runbook", "Backout plan", "Comms plan"],
      },
      {
        title: "Implement",
        desc: "Execution with change windows.",
        outputs: ["Acceptance checks", "As-built docs", "Validation steps"],
      },
      {
        title: "Handover",
        desc: "Docs + admin notes + support path.",
        outputs: ["Handover pack", "Warranty window", "Next-step roadmap"],
      },
    ],

    deliverables: [
      "Project scope + milestones + acceptance checks",
      "Cutover runbook + rollback plan",
      "As-built documentation + diagrams (where needed)",
      "Admin notes + access guidance",
      "Post-project validation checklist",
      "Short warranty/support path",
    ],

    tooling: [
      "Network tooling (switch/Wi-Fi configs)",
      "Cloud platforms (M365/Workspace)",
      "Identity directories (AD/Entra)",
      "Documentation + runbooks",
      "Monitoring/validation checks",
      "Ticketing for change tracking",
    ],

    timeline: [
      { when: "Week 1", title: "Discovery", desc: "Scope, inventory, risks" },
      { when: "Weeks 2–3", title: "Design & plan", desc: "Architecture, runbook, rollback" },
      { when: "Weeks 4–6", title: "Execution", desc: "Cutovers and validation" },
      { when: "Week 7", title: "Handover", desc: "Docs, admin notes, support path" },
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
      { "@type": "ListItem", position: 3, name: "Projects & Consulting", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "IT Projects & Consulting",
    serviceType: "IT Projects & Consulting",
    description:
      "Fixed-scope IT projects including audits, office moves, network refresh, migrations, directory cleanup, decommissions, and automation — delivered with runbooks, rollback plans, acceptance checks, and clean handover documentation.",
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
    name: `Projects & Consulting | ${brand}`,
    url: canonical,
    description:
      "Fixed-scope audits, moves, network refresh, directory cleanup, migrations, and decommissions — delivered with runbooks, rollback plans, acceptance checks, and clean handovers.",
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
