// app/services/cybersecurity/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";
import { BUSINESS_ID, BASE_URL } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";

  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonicalAbs = `${baseUrl}/services/cybersecurity`;

  const fullTitle = `Cybersecurity Services in Allentown, PA | EDR/XDR, MFA & Backup/DR | ${brand}`;

  const description =
    "Cybersecurity for SMBs in Allentown (Macungie, Emmaus): identity hardening (MFA/Conditional Access), EDR/XDR, email protection, vulnerability management, and backup/DR with restore testing.";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: "/services/cybersecurity" },
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
          alt: `${brand} — Cybersecurity`,
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
  const canonical = `${baseUrl}/services/cybersecurity`;

  const faqs = [
    {
      q: "What’s included in your cybersecurity program?",
      a: "Identity hardening (MFA/Conditional Access guidance), endpoint defense (EDR/XDR), email protection, vulnerability management cadence, and backup/DR with restore testing—plus reporting and a security roadmap.",
    },
    {
      q: "Do you support incident response?",
      a: "Yes. We define response playbooks (containment, investigation, recovery) and can help coordinate actions using EDR/XDR workflows and recovery steps. We also run tabletop drills and keep an incident response plan current.",
    },
    {
      q: "Can you help with compliance-oriented SMBs?",
      a: "Yes. We align controls and documentation to practical best-practice frameworks (CIS/NIST concepts) and maintain evidence-friendly reporting, reviews, and policies.",
    },
    {
      q: "Is MFA enough by itself?",
      a: "MFA is critical, but you also need admin hygiene, secure device posture, email protection, and tested recovery. Most incidents are multi-step; defense should be layered.",
    },
    {
      q: "Do you provide phishing training?",
      a: "We support practical awareness: short training, baseline policies, and repeatable reminders. The goal is fewer risky clicks and better reporting habits, not long boring courses.",
    },
    {
      q: "How do restore tests work?",
      a: "We schedule restore tests to validate that backups can recover the right data within realistic timeframes. Results are documented so leadership knows what recovery looks like before an incident.",
    },
  ];

  const cfg = {
    title: "Cybersecurity Services",
    lede:
      "Identity-first security, modern endpoint defense, email protection, and tested recovery—built into a practical security program for small businesses.",
    hero: "/images/services/cyber-hero.svg",

    // ✅ NEW: Security-specific local internal linking block (renders in ServiceClientPage)
    localLinks: {
      eyebrow: "Areas we serve",
      title: "Cybersecurity coverage and free tools",
      desc: "Open your local page for coverage details, or test your own domain with our free email security check.",
      items: [
        {
          label: "Allentown, PA",
          href: "/locations/allentown-pa",
          desc: "Cybersecurity + managed IT for Allentown SMBs.",
        },
        {
          label: "Macungie, PA",
          href: "/locations/macungie-pa",
          desc: "MFA, EDR/XDR, email protection, and backup/DR.",
        },
        {
          label: "Emmaus, PA",
          href: "/locations/emmaus-pa",
          desc: "Security-first IT support with practical controls.",
        },
        {
          label: "Broomall & Delaware County, PA",
          href: "/locations/broomall-pa",
          desc: "Onsite security and IT support across Delaware County.",
        },
        {
          label: "Free tool: email security check",
          href: "/tools/email-security-check",
          desc: "See in 10 seconds whether scammers can send email as your business.",
        },
        {
          label: "Email Security Fix-in-a-Day",
          href: "/lp/email-security-fix",
          desc: "SPF, DKIM and DMARC set up properly. Fixed price, done remotely.",
        },
      ],
      cta1: { label: "View all areas", href: "/areas" },
      cta2: {
        label: "Book a 20-min Assessment",
        href: "/contact?type=assessment&source=cybersecurity-areas",
      },
    },

    stats: [
      { kpi: "MFA + CA", label: "Identity hardening" },
      { kpi: "EDR/XDR", label: "Endpoint defense" },
      { kpi: "Backup/DR", label: "Recoverability" },
      { kpi: "Quarterly", label: "Reviews & tabletop drills" },
    ],

    sections: [
      {
        heading: "Identity is the new perimeter",
        body:
          "Most incidents start with stolen credentials. We deploy MFA and strengthen access with Conditional Access guidance, device compliance, and least-privilege practices. Admin access is tightened with role separation and safer workflows so one compromised password doesn’t become a full breach.",
        image: "/images/illus/identity.svg",
        imageSide: "right",
      },
      {
        heading: "Detect fast, contain, and recover",
        body:
          "EDR/XDR provides visibility into suspicious behavior across endpoints. We help tune alerts, define response playbooks, and isolate affected devices quickly. Combine that with email security and awareness habits, and you reduce both technical and human risk over time.",
        image: "/images/illus/shield.svg",
        imageSide: "left",
      },
      {
        heading: "Backup is only real when restores are tested",
        body:
          "Backups that haven’t been tested fail when it matters most. We implement resilient backup/DR with restore testing and recovery notes—so recovery is predictable and business impact stays low. This turns uncertainty into evidence and action steps.",
        image: "/images/illus/screens-3.svg",
        imageSide: "right",
      },
    ],

    problems: [
      "Weak or inconsistent MFA; admins over-privileged",
      "Phishing and ransomware attempts increasing",
      "Backups exist but restores are untested",
      "Security policies and training aren’t operational",
      "Endpoints drift and patch posture isn’t visible",
      "No clear incident response workflow when alerts happen",
    ],

    outcomes: [
      "MFA + access standards across users and admins",
      "EDR/XDR tuned with response playbooks and escalation paths",
      "Backup/DR with restore testing and clear recovery notes",
      "A security cadence with reporting and continuous improvement",
      "Vulnerability management with prioritized remediation workflow",
      "Reduced repeat incidents through baseline hardening",
    ],

    features: [
      { icon: "Shield", title: "EDR/XDR", desc: "Deployment, tuning, and response playbooks." },
      { icon: "KeySquare", title: "Identity & MFA", desc: "Access standards + admin hygiene + Conditional Access guidance." },
      { icon: "AlertTriangle", title: "Vulnerability Mgmt", desc: "Scanning + prioritized remediation workflow." },
      { icon: "Fingerprint", title: "Email Protection", desc: "Anti-phishing, spoofing protection, policy hardening." },
      { icon: "Database", title: "Backup/DR", desc: "Resilient backups with restore testing and recovery notes." },
      { icon: "BookOpen", title: "Policies & Training", desc: "Practical controls aligned to CIS/NIST concepts." },
    ],

    gallery: ["/images/illus/screens-2.svg", "/images/illus/screens-3.svg", "/images/illus/screens-1.svg"],

    steps: [
      {
        title: "Baseline",
        desc: "Quick assessment and gap map against practical best practices.",
        outputs: ["Scorecard", "Prioritized security backlog", "Immediate quick wins list"],
      },
      {
        title: "Implement",
        desc: "MFA/access hardening, EDR/XDR, email protection, and backup improvements.",
        outputs: ["Policy set", "Rollout plan", "Alert routing and ownership"],
      },
      {
        title: "Operate",
        desc: "Alert tuning, patch/vuln cadence, and reporting that leadership can understand.",
        outputs: ["Monthly posture report", "Remediation tracker", "Trend notes"],
      },
      {
        title: "Review",
        desc: "Tabletop drills and evidence refresh for leadership/compliance needs.",
        outputs: ["IR playbook updates", "Quarterly review notes", "Next-quarter priorities"],
      },
    ],

    deliverables: [
      "Security scorecard + prioritized roadmap",
      "Incident response playbook & escalation paths",
      "Access standards (MFA/admin roles) guidance pack",
      "Vulnerability report + remediation priorities",
      "Backup/DR notes + restore test results",
      "Quarterly tabletop drill summary + action items",
    ],

    tooling: [
      "EDR/XDR",
      "Email security",
      "Identity (Entra/Google)",
      "Logging & alert routing",
      "Backup/DR + restore testing",
      "Patch/vulnerability visibility",
    ],

    timeline: [
      { when: "Weeks 1–2", title: "Baseline & quick wins", desc: "MFA/access + email hardening" },
      { when: "Weeks 3–6", title: "Deploy & tune", desc: "EDR/XDR + vuln cadence + backup hardening" },
      { when: "Quarterly", title: "Review & drills", desc: "Tabletops + reporting + roadmap updates" },
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
      { "@type": "ListItem", position: 3, name: "Cybersecurity", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Cybersecurity Services",
    serviceType: "Cybersecurity Services",
    description:
      "Identity hardening (MFA/Conditional Access), EDR/XDR, email protection, vulnerability management, and backup/DR with restore testing for small and mid-sized businesses.",
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
    name: `Cybersecurity Services in Allentown, PA | ${brand}`,
    description:
      "Cybersecurity for SMBs: identity hardening, EDR/XDR, email protection, vulnerability management, and backup/DR with restore testing.",
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
