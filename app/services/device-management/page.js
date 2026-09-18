// app/services/device-management/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";
import { BUSINESS_ID, BASE_URL } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonicalAbs = `${baseUrl}/services/device-management`;

  const fullTitle = `Device Management (MDM) in Allentown, PA | Windows, Mac, iOS & Android | ${brand}`;

  const description =
    "Windows, macOS, iOS & Android device management for SMBs in Allentown, Macungie & Emmaus: zero-touch enrollment, security baselines, patch & app management, compliance reporting, and device lifecycle control.";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: "/services/device-management" },
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
          alt: `${brand} — Device Management`,
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
  const canonical = `${baseUrl}/services/device-management`;

  const faqs = [
    {
      q: "Which platforms do you manage?",
      a: "Windows, macOS, iOS, and Android—including zero-touch enrollment, baselines, patching, app deployment, and compliance reporting.",
    },
    {
      q: "Do you support BYOD devices?",
      a: "Yes. We can apply app protection and compliance policies so corporate data stays protected without overreaching on personal use.",
    },
    {
      q: "How fast do critical patches get applied?",
      a: "We follow a defined patch cadence with pilot rings and rollback planning. Critical updates are prioritized based on business impact and agreed response targets.",
    },
    {
      q: "Can you standardize new laptop setup for new hires?",
      a: "Yes. With Autopilot/ABM/Jamf we can ship devices directly to users so they enroll automatically and apply your standard apps, policies, and security settings.",
    },
    {
      q: "What happens if a device is lost or stolen?",
      a: "We follow a documented workflow: remote lock/wipe (as appropriate), session revocation, password/MFA resets, and incident notes for accountability and recovery.",
    },
    {
      q: "Do you manage app catalogs and software updates?",
      a: "Yes. We can manage app catalogs, update rings, maintenance windows, and rollback steps so updates stay controlled and users aren’t disrupted.",
    },
    {
      q: "Do you provide compliance reports?",
      a: "Yes. We report on patch posture, encryption, device compliance, and drift exceptions—so leadership knows where risk is increasing and what to fix next.",
    },
  ];

  const cfg = {
    title: "Device Management",
    lede:
      "Standardize devices across Windows, macOS, iOS, and Android with enrollment, baselines, patching, app catalogs, and compliance visibility—without slowing users down.",
    hero: "/images/services/device-hero.svg",

    // ✅ NEW: MDM-specific local internal linking block (renders in ServiceClientPage)
    localLinks: {
      eyebrow: "Areas we serve",
      title: "Device management coverage in your area",
      desc: "Open your local page for availability, coverage details, FAQs, and next steps.",
      items: [
        {
          label: "Allentown, PA",
          href: "/locations/allentown-pa",
          desc: "MDM + managed IT for Allentown SMBs.",
        },
        {
          label: "Macungie, PA",
          href: "/locations/macungie-pa",
          desc: "Autopilot/ABM enrollment + compliance reporting.",
        },
        {
          label: "Emmaus, PA",
          href: "/locations/emmaus-pa",
          desc: "Baselines, patch rings, and lifecycle control.",
        },
      ],
      cta1: { label: "View all areas", href: "/areas" },
      cta2: {
        label: "Book a 20-min Assessment",
        href: "/contact?type=assessment&source=device-management-areas",
      },
    },

    stats: [
      { kpi: "Zero-touch", label: "Autopilot / ABM" },
      { kpi: "Baselines", label: "Security standards" },
      { kpi: "Patching", label: "Cadence + rings" },
      { kpi: "Lifecycle", label: "Procure → retire" },
    ],

    sections: [
      {
        heading: "Zero-touch enrollment and consistent setup",
        body:
          "With Windows Autopilot, Jamf, and Apple Business Manager (ABM), new devices ship directly to users and enroll automatically. Standard build profiles reduce surprises and make onboarding repeatable across teams. This reduces setup time, eliminates inconsistent manual installs, and helps new hires start fast.",
        image: "/images/illus/enroll.svg",
        imageSide: "right",
      },
      {
        heading: "Compliance visibility (not just checkbox policies)",
        body:
          "Encryption, firewall, and patch posture stay visible through dashboards and reports. Exceptions are documented, time-bound, and reviewed—so policies remain practical and enforceable over time. You get clarity: which devices are drifting, what’s missing, and what to remediate first.",
        image: "/images/illus/compliance.svg",
        imageSide: "left",
      },
      {
        heading: "Apps, updates, and drift control",
        body:
          "We manage app catalogs, update rings, and compliance checks to reduce device drift. That means fewer helpdesk tickets, better performance, and faster recovery when something goes wrong. Updates become predictable and controlled instead of random disruptions.",
        image: "/images/illus/screens-1.svg",
        imageSide: "right",
      },
    ],

    problems: [
      "New laptops are configured manually and inconsistently",
      "Patching is irregular; device drift causes recurring issues",
      "No clear view of encryption, compliance, or missing updates",
      "Lost/stolen devices create panic and unclear actions",
      "Apps and permissions grow without standards",
      "Refresh cycles and inventory tracking are messy",
    ],

    outcomes: [
      "Standard builds across devices with repeatable onboarding",
      "Patch cadence with rings and predictable maintenance windows",
      "Visible compliance posture (encryption, updates, policies)",
      "Documented lost/stolen workflows with fast response steps",
      "Cleaner app catalogs and reduced device drift",
      "Better inventory/lifecycle visibility for refresh planning",
    ],

    features: [
      { icon: "Laptop", title: "MDM Enrollment", desc: "Autopilot, Jamf, ABM, and Android Enterprise enrollment." },
      { icon: "Lock", title: "Security Baselines", desc: "Encryption, firewall, allowlists, and compliance policies." },
      { icon: "Wrench", title: "Patch & Apps", desc: "OS/app updates with rings, maintenance windows, and rollback." },
      { icon: "AlertTriangle", title: "Lost / Stolen", desc: "Remote lock/wipe workflows and access response steps." },
      { icon: "LineChart", title: "Reporting", desc: "Patch posture, encryption coverage, drift and compliance trends." },
      { icon: "Users", title: "Lifecycle", desc: "Procure → assign → replace → retire → disposal guidance." },
    ],

    gallery: ["/images/illus/screens-1.svg", "/images/illus/screens-2.svg", "/images/illus/screens-3.svg"],

    steps: [
      {
        title: "Standardize",
        desc: "Define baseline policies, app standards, and ownership rules.",
        outputs: ["Baseline policy set", "App catalog plan", "Compliance targets"],
      },
      {
        title: "Enroll",
        desc: "Roll out zero-touch enrollment workflows and device mapping.",
        outputs: ["Enrollment runbook", "Asset mapping", "Pilot cohort validation"],
      },
      {
        title: "Operate",
        desc: "Run patch cadence, compliance checks, and exception reviews.",
        outputs: ["Patch rings + schedule", "Exception workflow", "Monthly posture report"],
      },
      {
        title: "Improve",
        desc: "Refine policies, reduce drift, and align with business growth.",
        outputs: ["Optimization backlog", "Refresh planning notes", "Quarterly review actions"],
      },
    ],

    deliverables: [
      "Enrollment runbook (Autopilot/ABM/Jamf)",
      "Baseline security policy set (encryption/firewall/compliance)",
      "Patch cadence + rings + maintenance windows",
      "App catalog and deployment standards",
      "Lost/stolen response workflow + access reset steps",
      "Monthly compliance/posture report",
      "Lifecycle notes (refresh + retire + disposal guidance)",
    ],

    tooling: [
      "Microsoft Intune",
      "Jamf + Apple Business Manager",
      "Windows Autopilot",
      "Android Enterprise",
      "Endpoint protection baseline (EDR/AV)",
      "Reporting dashboards",
      "Ticketing + SOP/runbooks",
    ],

    timeline: [
      { when: "Week 1", title: "Baselines", desc: "Policies, profiles, and standards" },
      { when: "Week 2", title: "Enrollment", desc: "Zero-touch setup + asset mapping" },
      { when: "Weeks 3–4", title: "Operate", desc: "Patch/app cadence + reporting" },
      { when: "Ongoing", title: "Improve", desc: "Exception reviews + policy tuning" },
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
      { "@type": "ListItem", position: 3, name: "Device Management", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Device Management",
    serviceType: "Endpoint & Mobile Device Management",
    description:
      "Zero-touch enrollment, security baselines, patch & app management, compliance reporting, and device lifecycle control for Windows, macOS, iOS, and Android.",
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
    name: `Device Management | ${brand}`,
    description:
      "Zero-touch enrollment, security baselines, patch & app management, compliance reporting, and device lifecycle control.",
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
