// app/page.js
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Suspense } from "react";
import HomeFX from "@/components/HomeFX";
import ClientOfferPopup from "@/components/ClientOfferPopup";
import { site } from "@/lib/siteConfig";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";
import {
  Shield,
  Server,
  Cloud,
  Wrench,
  Smartphone,
  Users,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Lock,
  LineChart,
  Image as ImageIcon,
  Sparkles,
  Phone,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// SEO (server-side)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/`;

  // ✅ 3 cities (no Lehigh Valley as main keyword)
  const baseTitle = "Business IT Support in Allentown, Macungie & Emmaus, PA";
  const fullTitle = `${baseTitle} | Managed IT & Cybersecurity — ${brand}`;

  const description =
    "Fast, friendly managed IT services, 24/7 helpdesk and cybersecurity for small businesses in Allentown, Macungie & Emmaus, PA. Monitoring, patching, cloud, backup/DR and fixed-fee support.";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: fullTitle },
    description,
    keywords: [
      "business IT support Allentown PA",
      "business IT support Macungie PA",
      "business IT support Emmaus PA",
      "managed IT services Allentown",
      "managed IT services Macungie",
      "managed IT services Emmaus",
      "IT support Allentown",
      "IT support Macungie",
      "IT support Emmaus",
      "cybersecurity Allentown PA",
      "cybersecurity Macungie PA",
      "cybersecurity Emmaus PA",
      "24/7 helpdesk Allentown",
      "24/7 helpdesk Macungie",
      "24/7 helpdesk Emmaus",
      "backup and disaster recovery Allentown",
      "Microsoft 365 support Allentown",
    ],
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      type: "website",
      siteName: brand,
      images: [
        {
          url: "/og-image.png?v=7",
          width: 1200,
          height: 630,
          alt: `${brand} — Business IT Support`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.png?v=7"],
    },
    robots: { index: true, follow: true },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function Collage({ items = [], priority = false, ratio = "aspect-[16/11] md:aspect-[16/10]" }) {
  return (
    <div className={`relative ${ratio}`} data-io="up">
      {items[0] && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20 group">
          <Image
            src={items[0].src}
            alt={items[0].alt || ""}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
            sizes="(max-width:768px) 96vw, 560px"
          />
        </div>
      )}

      {items[1] && (
        <div className="absolute right-3 -bottom-5 w-[52%]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-xl rotate-[1.2deg] group">
            <Image
              src={items[1].src}
              alt={items[1].alt || ""}
              fill
              loading="lazy"
              decoding="async"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width:768px) 52vw, 320px"
            />
          </div>
        </div>
      )}
    </div>
  );
}

const Section = ({ id, children, className = "" }) => (
  <section id={id} className="relative scroll-mt-[90px]">
    <div className={`max-w-6xl mx-auto px-4 section-enter ${className}`}>{children}</div>
  </section>
);

const Title = ({ k, sub }) => (
  <div className="mb-5 md:mb-6" data-io="up">
    <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-cyan-300/80">{k}</div>
    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent">
      {sub}
    </h2>
  </div>
);

const Stat = ({ k, v }) => (
  <div
    className="rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center transition hover:-translate-y-0.5 hover:border-cyan-300/30"
    data-io="up"
  >
    <div className="text-xl font-bold text-cyan-300">{k}</div>
    <div className="text-slate-300 text-xs">{v}</div>
  </div>
);

const ServiceCard = ({ Icon, t, d, bullets = [], href }) => {
  const Card = (
    <div className="group p-6 rounded-2xl bg-white/[0.06] border border-white/10 transition hover:-translate-y-1 hover:shadow-xl hover:border-cyan-300/30">
      <div className="flex items-center gap-3">
        <span className="grid place-items-center size-10 rounded-xl bg-cyan-400/10 border border-cyan-300/20">
          <Icon className="h-5 w-5 text-cyan-300" />
        </span>
        <h3 className="font-semibold text-lg">{t}</h3>
      </div>

      <p className="text-sm text-slate-300 mt-2">{d}</p>

      {!!bullets.length && (
        <ul className="mt-3 space-y-1">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2 text-sm text-slate-300">
              <Sparkles className="h-4 w-4 text-cyan-300" /> {b}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-300">
        View details <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="block" aria-label={`${t} details`} data-io="up">
      {Card}
    </Link>
  ) : (
    <div data-io="up">{Card}</div>
  );
};

const Pill = ({ children, href }) =>
  href ? (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-200 transition"
    >
      {children} <ArrowRight className="h-3.5 w-3.5" />
    </Link>
  ) : (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
      {children}
    </span>
  );

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const areas = site?.areas?.length ? site.areas : ["Allentown, PA", "Macungie, PA", "Emmaus, PA"];
  const brand = site?.name || "Supreme IT Experts";

  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/`;

  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${baseUrl}/#breadcrumb`;
  const WEBPAGE_ID = `${baseUrl}/#webpage`;
  const FAQ_ID = `${baseUrl}/#faq`;

  const phoneRaw = site?.phone || "+1 610-500-9209";
  const phoneTel = `tel:${String(phoneRaw).replace(/[^\d+]/g, "")}`;
  const hidePhone = site?.hidePhone;

  const SERVICES = [
    {
      Icon: Shield,
      t: "Managed IT",
      d: "Helpdesk, patching, monitoring and reporting with clear SLAs.",
      bullets: ["Helpdesk workflows", "Proactive maintenance", "Monthly KPIs"],
      href: "/services/managed-it",
    },
    {
      Icon: Server,
      t: "Cybersecurity",
      d: "EDR/XDR, MFA/SSO, email security, backup/DR and practical hardening.",
      bullets: ["EDR/XDR coverage", "Identity hardening", "BCP/DR playbooks"],
      href: "/services/cybersecurity",
    },
    {
      Icon: Cloud,
      t: "Cloud & 365/Workspace",
      d: "Migrations, identity, MDM baselines and cost optimization.",
      bullets: ["Tenant security", "Licensing hygiene", "MDM baselines"],
      href: "/services/cloud-workspace",
    },
    {
      Icon: Wrench,
      t: "Projects & Consulting",
      d: "Audits, office moves, network refresh and cloud/server projects.",
      bullets: ["Network redesign", "Server refresh", "Zero-trust rollout"],
      href: "/services/projects-consulting",
    },
    {
      Icon: Smartphone,
      t: "Device Management",
      d: "Windows/Mac/iOS/Android baselines, app deploys and compliance.",
      bullets: ["Baseline config", "App catalogs", "Compliance checks"],
      href: "/services/device-management",
    },
    {
      Icon: Users,
      t: "vCIO / Strategy",
      d: "Quarterly roadmap, budget planning and measurable KPIs.",
      bullets: ["Roadmaps", "Budgeting", "Risk register"],
      href: "/services/vcio-strategy",
    },
  ];

  const areaLinks = {
    "Allentown, PA": "/locations/allentown-pa",
    "Macungie, PA": "/locations/macungie-pa",
    "Emmaus, PA": "/locations/emmaus-pa",
    "Broomall, PA": "/locations/broomall-pa",
    "Newtown Square, PA": "/locations/newtown-square-pa",
    "Havertown, PA": "/locations/havertown-pa",
    "Springfield, PA": "/locations/springfield-pa",
    "Media, PA": "/locations/media-pa",
  };

  // ✅ Balanced FAQs for Allentown + Macungie + Emmaus
  const FAQS = [
    {
      q: "Do you provide business IT support in Allentown, Macungie and Emmaus, PA?",
      a: "Yes. We provide business IT support across Allentown, Macungie and Emmaus with proactive monitoring, patching, clear SLAs, and onsite support when needed.",
    },
    {
      q: "Do you offer managed IT services in Allentown?",
      a: "Yes. Our managed IT services in Allentown include proactive monitoring, patch management, endpoint baselines, reporting, and a roadmap that keeps IT predictable.",
    },
    {
      q: "Do you offer managed IT services in Macungie, PA?",
      a: "Yes. We provide managed IT services in Macungie including monitoring, patching, helpdesk workflows, and security best practices tailored for small businesses.",
    },
    {
      q: "Do you support IT support in Emmaus, PA too?",
      a: "Yes. We provide IT support and managed services across Emmaus, Macungie, and Allentown — remote-first with onsite support when needed.",
    },
    {
      q: "Can you help with cybersecurity in Allentown?",
      a: "Yes. We strengthen identity and endpoint security with MFA/SSO guidance, endpoint protection, email security, and backup/disaster recovery planning.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: canonical,
        name: "Business IT Support in Allentown, Macungie & Emmaus, PA | Managed IT & Cybersecurity",
        isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID },
        breadcrumb: { "@id": BREADCRUMB_ID },
        about: { "@id": BUSINESS_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: new URL("/og-image.png?v=7", baseUrl).toString(),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
        itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: canonical }],
      },
      {
        "@type": "FAQPage",
        "@id": FAQ_ID,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: canonical,
        name: brand,
        publisher: { "@id": BUSINESS_ID },
      },
    ],
  };

  return (
    <div className="relative overflow-hidden bg-[#0b1220]">
      {/* ONE global background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-48 -left-48 size-[520px] rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute top-[18%] -right-56 size-[700px] rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute -bottom-72 left-[10%] size-[820px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_600px_at_50%_-10%,rgba(56,189,248,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_30%)]" />
      </div>

      <Script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ClientOfferPopup />

      {/* HERO */}
      <section id="hero" className="relative">
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-10 md:pt-14 md:pb-12 grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-8 md:gap-10 items-center">
          <div className="max-w-[62ch]">
            <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-cyan-300/80">
              Managed IT services & cybersecurity for SMBs in Allentown, Macungie & Emmaus
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mt-3 leading-[1.06] bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent">
              Business IT Support in Allentown, Macungie &amp; Emmaus, PA
            </h1>

            <div className="mt-3 text-base md:text-lg text-slate-200">
              Managed IT services &amp; cybersecurity for{" "}
              <span className="font-semibold text-slate-100">Allentown</span>,{" "}
              <span className="font-semibold text-slate-100">Macungie</span> and{" "}
              <span className="font-semibold text-slate-100">Emmaus</span>.
            </div>

            <p className="mt-4 text-sm md:text-base text-slate-300">
              {brand} helps small and mid-sized businesses reduce downtime with proactive monitoring, patching,
              practical security, and clear SLAs — remote-first with onsite help when needed across Allentown, Macungie
              and Emmaus.
            </p>

            <div className="mt-4 flex flex-wrap gap-2" data-io="up">
              <Pill href="/locations/allentown-pa">Allentown IT support</Pill>
              <Pill href="/locations/macungie-pa">Macungie IT support</Pill>
              <Pill href="/locations/emmaus-pa">Emmaus IT support</Pill>
              <Pill href="/locations/broomall-pa">Broomall &amp; Delaware County</Pill>
              <Pill href="/services/managed-it">Managed IT</Pill>
              <Pill href="/services/cybersecurity">Cybersecurity</Pill>
              <Pill href="/services/ai-workflows">New: AI Workflows</Pill>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href={site?.assessmentHref || "/lp/allentown#claim"}
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition text-center"
              >
                {site?.cta || "Get a Free IT Assessment"}
              </Link>

              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition text-center"
              >
                Pricing &amp; Quote
              </Link>

              {!hidePhone ? (
                <a
                  href={phoneTel}
                  className="rounded-xl px-5 py-3 font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              ) : null}
            </div>

            <div className="mt-3 text-xs text-slate-400">
              {hidePhone ? "No pressure — quick 15-min assessment to map risks + next steps." : "No pressure — quick 15-min call to map risks + next steps."}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <Stat k="<15 min" v="P1 response target" />
              <Stat k="24/7" v="Helpdesk & monitoring" />
              <Stat k="Onsite" v="Allentown + nearby" />
            </div>

            <div className="mt-5">
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-300 transition group"
              >
                Explore IT services{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="lg:pl-2">
            <Collage
              items={[
                { src: "/media/hero-1.jpg", alt: "Managed IT network cabling for businesses in Allentown, PA" },
                { src: "/media/hero-2.jpg", alt: "Cloud and devices managed by an MSP in Macungie and Emmaus, PA" },
              ]}
              ratio="aspect-[16/11] md:aspect-[16/10]"
              priority
            />
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent" />
      </section>

      {/* ABOUT */}
      <Section id="about" className="pt-10 pb-12 md:pt-12 md:pb-14">
        <Title k="About" sub="We keep your business running with managed IT and real security" />

        <p className="text-slate-300 max-w-3xl" data-io="up">
          We act as your IT department (or augment your in-house team) with{" "}
          <Link href="/services/managed-it" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
            managed IT services
          </Link>{" "}
          and{" "}
          <Link
            href="/services/cybersecurity"
            className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
          >
            cybersecurity
          </Link>
          , backed by documented playbooks, clear SLAs, and reporting leadership actually reads.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center mt-7">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              ["Playbooks", "Documented SOPs for repeatable results"],
              ["Visibility", "Monthly KPIs leadership actually reads"],
              ["Security-first", "Baselines + endpoint + backup/DR"],
            ].map(([t, d]) => (
              <div
                key={t}
                className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30"
                data-io="up"
              >
                <h3 className="font-medium text-sm">{t}</h3>
                <p className="text-slate-300 text-xs mt-1">{d}</p>
              </div>
            ))}
          </div>

          <div data-parallax="y" data-speed="0.12">
            <Collage
              items={[
                { src: "/media/rack.jpg", alt: "Server rack and network gear for business IT support" },
                { src: "/media/dashboard.jpg", alt: "IT monitoring dashboard for managed IT services" },
              ]}
              ratio="aspect-[4/3] md:aspect-[16/11]"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3" data-io="up">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            More about us <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={site?.assessmentHref || "/lp/allentown#claim"}
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
          >
            {site?.cta || "Free IT Assessment"} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services" className="py-12 md:py-14">
        <Title k="Services" sub="Managed IT, IT support and cybersecurity for SMBs" />
        <p className="text-slate-300 max-w-3xl" data-io="up">
          Choose fully-managed or co-managed IT. If you need business IT support in Allentown, Macungie, or Emmaus —
          including helpdesk support, Microsoft 365 hardening, cybersecurity, or backup planning — we can start quickly
          and stabilize your environment.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {SERVICES.map((p) => (
            <ServiceCard key={p.t} {...p} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3" data-io="up">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            All service details <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/get-quote"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10 transition"
          >
            Pricing &amp; Quote <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={site?.assessmentHref || "/lp/allentown#claim"}
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
          >
            {site?.cta || "Get a Free IT Assessment"} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* AI WORKFLOWS */}
      <Section id="ai" className="py-12 md:py-14">
        <Title k="New · IT + AI" sub="Stop losing time and customers to busywork" />
        <p className="text-slate-300 max-w-3xl" data-io="up">
          Practical AI for local businesses, set up safely by the same team that protects your IT. We start with a free
          30-minute IT + AI Checkup: you get a one-page report with your top 3 time and money leaks, your top 3 security
          gaps, and what we would fix first with a fixed price.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[
            {
              t: "AI Front Desk",
              d: "Missed calls get an instant text back. After-hours calls are answered and booked. Emergencies go straight to a person.",
            },
            {
              t: "Follow-ups & Reviews",
              d: "Every inquiry gets a fast reply, every estimate gets followed up, and every customer is asked for a review the compliant way.",
            },
            {
              t: "Secure AI for Your Team",
              d: "Copilot, Gemini, ChatGPT or Claude rolled out with the right permissions, a clear usage policy and hands-on training.",
            },
          ].map((c) => (
            <Link
              key={c.t}
              href="/services/ai-workflows"
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-400/5"
              data-io="up"
            >
              <h3 className="text-lg font-semibold text-slate-100">{c.t}</h3>
              <p className="mt-2 text-sm text-slate-300">{c.d}</p>
              <div className="mt-3 text-xs text-cyan-300">
                How it works <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3" data-io="up">
          <Link
            href="/lp/it-ai-checkup?source=home-ai"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
          >
            Book the free IT + AI Checkup <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/services/ai-workflows"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10 transition"
          >
            See AI Workflows <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/tools/email-security-check"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10 transition"
          >
            Free 10-second email security check <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* CASE STUDIES */}
      <Section id="wins" className="py-12 md:py-14">
        <Title k="How we work" sub="What well-run IT feels like day to day" />
        <div className="grid md:grid-cols-3 gap-6">
          <div data-io="up">
            <Collage
              items={[
                { src: "/media/work-1.jpg", alt: "Onsite IT support work for local businesses" },
                { src: "/media/rack.jpg", alt: "Network rack cleanup for managed IT clients" },
              ]}
            />
            <div className="mt-3">
              <h3 className="font-medium">Urgent issues first</h3>
              <p className="text-sm text-slate-300">Clear priorities, written procedures and a clean queue, so critical problems get a fast first response.</p>
            </div>
          </div>

          <div data-io="up">
            <Collage items={[{ src: "/media/dashboard.jpg", alt: "Monitoring tools used for managed IT services" }]} />
            <div className="mt-3">
              <h3 className="font-medium">Fleet visibility</h3>
              <p className="text-sm text-slate-300">Endpoint visibility + leadership KPIs that tell the truth.</p>
            </div>
          </div>

          <div data-io="up">
            <Collage
              items={[
                { src: "/media/team.jpg", alt: "IT support team collaborating on tickets and projects" },
                { src: "/media/work-2.jpg", alt: "Technician delivering onsite business IT support" },
              ]}
            />
            <div className="mt-3">
              <h3 className="font-medium">Onboarding without chaos</h3>
              <p className="text-sm text-slate-300">Device baselines and a predictable new-hire workflow, so day one just works.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* PROCESS */}
      <Section id="process" className="py-12 md:py-14">
        <Title k="Process" sub="A simple, measurable onboarding" />
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <ol className="relative border-s border-white/10 ps-6 space-y-7" data-io="up">
            {[
              { icon: Cpu, title: "Assess", text: "Discovery of users, devices, identity and risks in your IT environment." },
              { icon: Lock, title: "Stabilize", text: "Patch baseline, email protection, endpoint coverage and backup/DR planning." },
              { icon: LineChart, title: "Optimize", text: "Help desk workflows, SLAs, reporting and roadmap alignment with leadership." },
              { icon: Server, title: "Grow", text: "Projects, new hires, office moves, and cloud modernization with clear ownership." },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="ms-2">
                <span className="absolute -start-3.5 mt-1 grid place-items-center size-6 rounded-full bg-cyan-400/20 border border-cyan-300/40">
                  <Icon className="h-3.5 w-3.5 text-cyan-300" />
                </span>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/30">
                  <div className="font-semibold">{title}</div>
                  <p className="text-sm text-slate-300 mt-1">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div
            className="rounded-2xl overflow-hidden border border-white/10 group"
            data-parallax="y"
            data-speed="0.1"
            data-io="up"
          >
            <div className="relative w-full aspect-[16/16]">
              <Image
                src="/media/work-2.jpg"
                alt="Technician delivering onsite IT support"
                fill
                loading="lazy"
                decoding="async"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width:768px) 96vw, 640px"
              />
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-400 max-w-3xl" data-io="up">
          Have questions? Check our{" "}
          <Link href="/faqs" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
            FAQs
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
            contact us
          </Link>
          .
        </p>
      </Section>

      {/* TRUST */}
      <Section id="trust" className="py-12 md:py-14">
        <Title k="Trust" sub="Security-first and SLA-backed" />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["SLA", "P1 response target, clear escalation, and same-day handling for most issues"],
            ["Coverage", "Endpoint baselines plus monitored systems and reporting leadership reads"],
            ["Backups", "Backup planning, tested restores, and disaster recovery readiness"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5" data-io="up">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                <h3 className="font-medium">{t}</h3>
              </div>
              <p className="text-sm text-slate-300 mt-1">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="py-12 md:py-14">
        <Title k="FAQs" sub="Quick answers before you book a call" />
        <div className="grid md:grid-cols-2 gap-4">
          {FAQS.map((f) => (
            <div key={f.q} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5" data-io="up">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-2 text-sm text-slate-300">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" className="py-12 md:py-14">
        <Title k="Gallery" sub="Real work. Real environments." />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["/media/hero-1.jpg", "Managed IT cabling and network work for business environments"],
            ["/media/rack.jpg", "Clean, labeled network rack for small business IT support"],
            ["/media/dashboard.jpg", "Monitoring dashboard used in managed IT services"],
          ].map(([src, cap]) => (
            <figure
              key={src}
              className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
              data-io="up"
            >
              <div className="relative w-full aspect-[3/2] md:aspect-[16/10] group">
                <Image
                  src={src}
                  alt={cap}
                  fill
                  loading="lazy"
                  decoding="async"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  sizes="(max-width:768px) 96vw, 33vw"
                />
              </div>
              <figcaption className="px-3 py-2 text-xs text-slate-300 flex items-center gap-2">
                <ImageIcon className="h-3.5 w-3.5 text-cyan-300" /> {cap}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6" data-io="up">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            View full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* AREAS */}
      <Section id="areas" className="py-12 md:py-14">
        <Title k="Areas we serve" sub="Onsite and remote support across the Lehigh Valley and Delaware County" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {areas.map((a) => {
            const href = areaLinks[a] || "/areas";
            return (
              <Link
                key={a}
                href={href}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-400/5"
                data-io="up"
                aria-label={`IT services in ${a}`}
              >
                <h3 className="font-medium">{a}</h3>
                <div className="mt-1 text-xs text-slate-400">
                  View local coverage <span className="text-cyan-300">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section id="cta" className="py-12 md:py-14">
        <div
          className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 md:p-10 overflow-hidden relative"
          data-io="up"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -right-24 size-[360px] rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 size-[420px] rounded-full bg-fuchsia-500/10 blur-3xl" />
          </div>

          <div className="relative">
            <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-cyan-300/80">
              Ready to tighten IT and security?
            </div>

            <h2 className="mt-3 text-2xl md:text-4xl font-extrabold leading-tight text-slate-100">
              Get a clear plan for your IT, fast response, real SLAs, predictable costs.
            </h2>

            <p className="mt-3 text-slate-300 max-w-3xl">
              Start with a quick assessment and we’ll map gaps, risks, and next steps.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href={site?.assessmentHref || "/lp/allentown#claim"}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
              >
                {site?.cta || "Get a Free IT Assessment"} <ArrowRight className="h-4 w-4" />
              </Link>

              {!hidePhone ? (
                <a
                  href={phoneTel}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              ) : null}

              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition"
              >
                Pricing &amp; Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Suspense fallback={null}>
        <HomeFX />
      </Suspense>
    </div>
  );
}
