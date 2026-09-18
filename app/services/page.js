// app/services/page.js
// SERVER COMPONENT

import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ServicesTabs from "@/components/ServicesTabs";
import PricingRoi from "@/components/PricingRoi";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/siteConfig";
import { BUSINESS_ID, BASE_URL } from "@/lib/seoIds";
import {
  ShieldCheck,
  Server,
  Cloud,
  Wrench,
  Smartphone,
  Users,
  ArrowRight,
  ChevronRight,
  Sparkles,
  MapPin,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

// ---- SEO (server-side)
export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";

  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");

  const titleBase = "Managed IT Services & Cybersecurity in Allentown, PA";
  const fullTitle = `${titleBase} | ${brand}`;

  const description =
    "Managed IT, cybersecurity, cloud, and device management for SMBs in Allentown, PA — including Macungie and Emmaus. Helpdesk, monitoring, patching, backup/DR, and Microsoft 365 support.";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: "/services" },
    robots: { index: true, follow: true },

    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url: "/services",
      siteName: brand,
      images: [{ url: "/og-image.png?v=7", width: 1200, height: 630, alt: `${brand} — Services` }],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.png?v=7"],
    },
  };
}

// --- server-safe helpers
function cx(...a) {
  return a.filter(Boolean).join(" ");
}

const Badge = ({ children, tone = "cyan" }) => (
  <span
    className={cx(
      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium border",
      tone === "cyan" && "text-cyan-300 border-cyan-300/30 bg-cyan-400/10",
      tone === "fuchsia" && "text-fuchsia-300 border-fuchsia-300/30 bg-fuchsia-400/10",
      tone === "violet" && "text-violet-300 border-violet-300/30 bg-violet-400/10",
      tone === "emerald" && "text-emerald-300 border-emerald-300/30 bg-emerald-400/10",
      tone === "amber" && "text-amber-300 border-amber-300/30 bg-amber-400/10"
    )}
  >
    {children}
  </span>
);

export default async function ServicesPage() {
  const brand = site?.name || "Supreme IT Experts";

  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services`;

  // ✅ Areas block (Services → Areas → Locations)
  const AREAS_BLOCK = [
    {
      name: "Allentown, PA",
      slug: "allentown-pa",
      desc: "Managed IT services + help desk + cybersecurity for SMB teams. Fast remote response and clear deliverables.",
    },
    {
      name: "Macungie, PA",
      slug: "macungie-pa",
      desc: "Business IT support near Macungie — proactive monitoring, Microsoft 365 support, and security-first baselines.",
    },
    {
      name: "Emmaus, PA",
      slug: "emmaus-pa",
      desc: "IT support in Emmaus with predictable processes, patching, endpoint protection, and backup/recovery planning.",
    },
  ];

  const services = [
    {
      key: "managed",
      icon: ShieldCheck,
      title: "Managed IT Services",
      tier: { label: "Core", tone: "cyan" },
      desc: "Helpdesk, patching, monitoring, and reporting — with clear SLAs and predictable processes.",
      bullets: ["Helpdesk workflows", "Proactive maintenance", "Leadership KPIs"],
      deep: [
        ["Helpdesk", "Omni-channel support (email/chat/portal) with triage SOPs and CSAT."],
        ["Patch Management", "OS + app updates using pilot rings, maintenance windows, and rollback plans."],
        ["Monitoring", "Endpoint, server, network, and cloud signals with actionable alerts."],
      ],
      href: "/services/managed-it",
    },
    {
      key: "security",
      icon: Server,
      title: "Cybersecurity",
      tier: { label: "Security", tone: "fuchsia" },
      desc: "EDR/XDR, identity hardening, email security, and backup/DR — designed for SMB risk reduction.",
      bullets: ["EDR/XDR coverage", "Identity hardening", "BCP/DR playbooks"],
      deep: [
        ["EDR/XDR", "Managed detections, isolation, and response runbooks."],
        ["Identity", "MFA/SSO, conditional access, and least privilege."],
        ["Email", "Anti-phishing/impersonation controls plus SPF/DKIM/DMARC alignment."],
      ],
      href: "/services/cybersecurity",
    },
    {
      key: "cloud",
      icon: Cloud,
      title: "Cloud & Microsoft 365",
      tier: { label: "Cloud", tone: "violet" },
      desc: "Migrations, tenant security baselines, device enrollment, and cost optimization for 365/Workspace.",
      bullets: ["Tenant security", "License hygiene", "Automation"],
      deep: [
        ["Migrations", "Cutover or hybrid with communication plan + rollback."],
        ["Governance", "Secure baselines, retention, audit logs, and DLP guidance."],
        ["FinOps", "License cleanup, storage policies, and rightsizing."],
      ],
      href: "/services/cloud-workspace",
    },
    {
      key: "projects",
      icon: Wrench,
      title: "IT Projects & Consulting",
      tier: { label: "Project", tone: "amber" },
      desc: "Audits, network refresh, office moves, and server/cloud modernization — planned and delivered cleanly.",
      bullets: ["Security audits", "Network redesign", "Server refresh"],
      deep: [
        ["Audits", "Infrastructure, security, and process scorecards with a remediation plan."],
        ["Moves", "ISP, cabling, Wi-Fi planning, and cutover execution."],
        ["Servers", "AD, file/print, virtualization, and backup/DR modernization."],
      ],
      href: "/services/projects-consulting",
    },
    {
      key: "mdm",
      icon: Smartphone,
      title: "Device Management (MDM)",
      tier: { label: "Add-on", tone: "emerald" },
      desc: "Windows/Mac/iOS/Android configuration baselines, compliance, and app deployment with reporting.",
      bullets: ["Baseline config", "Compliance checks", "App catalogs"],
      deep: [
        ["Baselines", "Security controls per platform (policy + configuration standards)."],
        ["Provisioning", "Autopilot/ABM zero-touch rollouts and enrollment flows."],
        ["Health", "Drift detection, remediations, and compliance reporting."],
      ],
      href: "/services/device-management",
    },
    {
      key: "vcio",
      icon: Users,
      title: "vCIO / IT Strategy",
      tier: { label: "Strategy", tone: "violet" },
      desc: "Quarterly roadmap, budget planning, vendor alignment, and measurable KPIs for leadership.",
      bullets: ["Roadmaps", "Budgeting", "Risk register"],
      deep: [
        ["Roadmap", "Quarterly OKRs tied to business outcomes."],
        ["KPIs", "Board-friendly scorecards with action plans."],
        ["Vendors", "Stack review, contracts, and consolidation opportunities."],
      ],
      href: "/services/vcio-strategy",
    },
    {
      key: "ai",
      icon: Sparkles,
      title: "AI Workflows & Automation",
      tier: { label: "New", tone: "emerald" },
      desc: "Practical AI for local businesses — missed calls, follow-ups, reviews and paperwork — set up safely by your IT and security team.",
      bullets: ["AI front desk", "Follow-up automation", "Secure AI rollout"],
      deep: [
        ["AI Front Desk", "Missed-call text-back, after-hours answering and booking on your own number."],
        ["Follow-ups & Reviews", "Fast lead replies, estimate follow-up, and compliant review requests."],
        ["Secure AI Rollout", "Copilot, Gemini, ChatGPT or Claude with permissions cleanup, policy and training."],
      ],
      href: "/services/ai-workflows",
    },
  ];

  const servicesForClient = services.map(({ key, title, desc, bullets, deep, href }) => ({
    key,
    title,
    desc,
    bullets,
    deep,
    href,
  }));

  const breadcrumbsSchema = {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: canonical },
    ],
  };

  const webPageSchema = {
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: `Services | ${brand}`,
    description:
      "Managed IT services and cybersecurity for SMBs — helpdesk, monitoring, patching, cloud, device management, and strategy.",
    isPartOf: { "@id": `${baseUrl}/#website` },
    publisher: { "@id": BUSINESS_ID },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    mainEntity: { "@id": `${canonical}#servicelist` },
  };

  const itemListSchema = {
    "@type": "ItemList",
    "@id": `${canonical}#servicelist`,
    name: `${brand} Services`,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `${baseUrl}${s.href}`,
    })),
  };

  // ✅ Optional: areas list schema (lightweight internal signal)
  const areasItemListSchema = {
    "@type": "ItemList",
    "@id": `${canonical}#areas`,
    name: "Areas served",
    itemListElement: AREAS_BLOCK.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.name,
      url: `${baseUrl}/locations/${a.slug}`,
    })),
  };

  const areaServed = ["Allentown, PA", "Macungie, PA", "Emmaus, PA"];

  const serviceSchemas = services.map((s) => ({
    "@type": "Service",
    "@id": `${baseUrl}${s.href}#service`,
    name: s.title,
    description: s.desc,
    provider: { "@id": BUSINESS_ID },
    areaServed,
    serviceType: s.title,
    url: `${baseUrl}${s.href}`,
  }));

  const faqs = [
    {
      q: "Fully managed vs co-managed?",
      a: "We can run IT end-to-end or support your in-house team. Tooling, access, and SOPs are aligned either way.",
    },
    {
      q: "How do SLAs work?",
      a: "We define priorities (P1/P2/P3), response targets, and escalation. You also get regular KPI reporting.",
    },
    {
      q: "Can we start small and add modules?",
      a: "Yes. Most clients start with core managed IT, then add security and cloud/device modules as needs grow.",
    },
  ];

  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbsSchema,
      webPageSchema,
      itemListSchema,
      areasItemListSchema,
      ...serviceSchemas,
      faqSchema,
    ],
  };

  return (
    <>
      <JsonLd data={pageSchema} />

      <PageHero
        eyebrow="Services"
        title="Managed IT & cybersecurity for Allentown SMBs"
        sub="Pick the coverage you need: managed IT, cybersecurity, Microsoft 365, device management, and strategy. Simple onboarding. Clear deliverables."
      />

      {/* ✅ Intent paragraph (GSC queries -> correct pages) */}
      <section className="max-w-6xl mx-auto px-4 pt-4">
        <Reveal>
          <p className="text-sm text-slate-300">
            Looking for{" "}
            <span className="text-slate-100 font-medium">managed IT services in Allentown</span> or{" "}
            <span className="text-slate-100 font-medium">business IT support near Macungie, PA</span>?{" "}
            Start with your area:
            <span className="ml-2">
              <Link
                href="/locations/allentown-pa"
                className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
              >
                Allentown
              </Link>
              {", "}
              <Link
                href="/locations/macungie-pa"
                className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
              >
                Macungie
              </Link>
              {", "}
              <Link
                href="/locations/emmaus-pa"
                className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
              >
                Emmaus
              </Link>
            </span>
            . Or browse{" "}
            <Link href="/areas" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
              all service areas
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-4 pb-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">On this page</div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="#services-overview"
              className="text-sm rounded-full px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10"
            >
              Services overview
            </Link>
            <Link
              href="#services-deepdives"
              className="text-sm rounded-full px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10"
            >
              Compare services
            </Link>
            <Link
              href="#services-areas"
              className="text-sm rounded-full px-3 py-1.5 border border-cyan-300/20 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
            >
              Areas we serve
            </Link>
            <Link
              href="#services-pricing"
              className="text-sm rounded-full px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10"
            >
              Pricing & ROI
            </Link>
            <Link
              href="#services-faq"
              className="text-sm rounded-full px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10"
            >
              FAQs
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {services.map((s) => (
              <Link
                key={s.key}
                href={s.href}
                className="text-sm rounded-full px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10 text-sm text-slate-300 space-y-2">
        <p>This page gives you a clear overview of what we do. Open any service to see deliverables and what’s included.</p>

        <p>
          Looking for locations? See{" "}
          <Link href="/areas" className="text-cyan-300 hover:underline">
            Areas we serve
          </Link>
          . Want to talk first?{" "}
          <Link href="/contact" className="text-cyan-300 hover:underline">
            Contact us
          </Link>{" "}
          or request a{" "}
          <Link href="/get-quote" className="text-cyan-300 hover:underline">
            free IT assessment
          </Link>
          .
        </p>
      </section>

      <main className="max-w-6xl mx-auto px-4 pb-24">
        <section aria-labelledby="services-overview">
          <div className="flex items-end justify-between gap-3 flex-wrap">
            <div>
              <h2 id="services-overview" className="text-2xl md:text-3xl font-semibold">
                Managed IT & Core Services
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-3xl">
                Straightforward coverage for SMBs — led by our{" "}
                <Link href="/services/managed-it" className="text-cyan-300 hover:underline">
                  managed IT services
                </Link>
                , with security, fast support, and reporting.
              </p>
            </div>

            <Link
              href="/get-quote"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
            >
              Free IT Assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {services.map(({ key, icon: Icon, title, tier, desc, bullets, href }) => (
              <Reveal key={key}>
                <Link
                  href={href}
                  className="group block h-full p-6 rounded-2xl bg-gradient-to-br from-white/6 to-white/[0.03] border border-white/10 hover:border-cyan-300/30 transition relative overflow-hidden"
                  aria-label={`${title} details`}
                >
                  <div className="absolute -right-10 -top-10 size-36 rounded-full bg-cyan-500/10 blur-2xl group-hover:scale-125 transition" />

                  <div className="flex items-center gap-3">
                    <span className="grid place-items-center size-10 rounded-xl bg-cyan-400/10 border border-cyan-300/20">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-lg">{title}</h3>
                        <Badge tone={tier.tone}>{tier.label}</Badge>
                      </div>
                      <p className="text-sm text-slate-300 mt-1">{desc}</p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-1.5">
                    {bullets.map((b) => (
                      <li key={b} className="text-sm text-slate-300 flex gap-2">
                        <Sparkles className="h-4 w-4 text-cyan-300" /> {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-300">
                    Learn more <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ✅ NEW: Areas we serve (internal links boost) */}
        <section aria-labelledby="services-areas" className="mt-14">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Areas we serve</div>
                <h2 id="services-areas" className="text-2xl md:text-3xl font-semibold">
                  Local pages for faster ranking
                </h2>
                <p className="mt-2 text-sm text-slate-300 max-w-3xl">
                  If you searched “managed IT services” or “IT support near me”, open your city page. These pages are
                  built to match local intent and connect to the right service pages.
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Link
                  href="/areas"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  View all areas <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact?type=assessment&source=services-areas"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Book a 20-min Assessment <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {AREAS_BLOCK.map((a) => (
                <Link
                  key={a.slug}
                  href={`/locations/${a.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-cyan-300/30 hover:bg-cyan-400/10 transition"
                  aria-label={`Open ${a.name} location page`}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid place-items-center size-10 rounded-xl bg-white/10 border border-white/10">
                      <MapPin className="h-5 w-5 text-cyan-300" />
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-100">{a.name}</div>
                      <p className="mt-1 text-sm text-slate-300 leading-6">{a.desc}</p>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-200">
                        {[
                          "Managed IT services",
                          "Help desk support",
                          "Cybersecurity",
                        ].map((t) => (
                          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-300">
                        View location page <ExternalLink className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-white/10 bg-black/10 p-4 text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-cyan-300 mt-0.5" />
                <p>
                  Tip: These city pages internally link back to the exact services (Managed IT, Cybersecurity, M365,
                  MDM, Projects, Strategy) so Google gets a clean topic cluster.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="services-deepdives" className="mt-14">
          <h2 id="services-deepdives" className="text-2xl md:text-3xl font-semibold">
            Compare services
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-3xl">
            Quick comparison of deliverables — then open the service page for full details.
          </p>

          <Reveal className="mt-6">
            <ServicesTabs services={servicesForClient} />
          </Reveal>
        </section>

        <section aria-labelledby="services-pricing" className="mt-14">
          <h2 id="services-pricing" className="text-2xl md:text-3xl font-semibold">
            Pricing & ROI
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-3xl">
            Estimate cost based on user count and modules — then we confirm after discovery.
          </p>

          <Reveal className="mt-6">
            <PricingRoi />
          </Reveal>
        </section>

        <section aria-labelledby="services-faq" className="mt-14">
          <h2 id="services-faq" className="text-2xl md:text-3xl font-semibold">
            FAQs
          </h2>

          <Reveal className="mt-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="divide-y divide-white/10">
                {faqs.map(({ q, a }) => (
                  <details key={q} className="py-3 group">
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-2">
                      <span className="font-medium">{q}</span>
                      <svg className="h-4 w-4 transition group-open:rotate-180" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 15.5 6.5 10l1.4-1.4L12 12.7l4.1-4.1L17.5 10z" />
                      </svg>
                    </summary>
                    <p className="text-sm text-slate-300 mt-2">{a}</p>
                  </details>
                ))}
              </div>

              <p className="mt-4 text-sm text-slate-400">
                More questions? Visit{" "}
                <Link href="/faqs" className="text-cyan-300 hover:underline">
                  FAQs
                </Link>{" "}
                or{" "}
                <Link href="/contact" className="text-cyan-300 hover:underline">
                  contact us
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
