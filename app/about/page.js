// app/about/page.js
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/siteConfig";
import { BUSINESS_ID, BASE_URL } from "@/lib/seoIds";
import {
  ShieldCheck,
  Headphones,
  Cloud,
  Bot,
  Timer,
  ClipboardCheck,
  Layers,
  ArrowRight,
  CheckCircle2,
  MapPin,
  FileText,
  HelpCircle,
  PhoneCall,
  Mail,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// SEO (server-side)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";

  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(
    /\/$/,
    ""
  );

  const titleBase = "About Supreme IT Experts";
  const fullTitle = `${titleBase} | Managed IT & Cybersecurity`;

  const description =
    "Meet the leadership and delivery team behind Supreme IT Experts. Senior-led managed IT, helpdesk support, and cybersecurity for SMBs across Allentown, Macungie & Emmaus — clear processes, fast response, and accountability.";

  const ogImage = "/og-image.png?v=7";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: "/about" },
    robots: { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url: "/about",
      siteName: brand,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — About` }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] ${className}`}
    >
      {children}
    </div>
  );
}

function IconRow({ icon: Icon, title, desc }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 rounded-xl border border-white/10 bg-white/5 p-2">
        <Icon className="h-4 w-4 text-cyan-300" />
      </div>
      <div>
        <div className="font-semibold text-slate-100">{title}</div>
        <p className="mt-1 text-sm text-slate-300 leading-7">{desc}</p>
      </div>
    </div>
  );
}

function LeaderCard({ name, role, subtitle, img, bullets }) {
  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex items-center gap-4 sm:w-[260px]">
          <div className="relative h-14 w-14 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <Image
              src={img}
              alt={`${name} avatar`}
              fill
              className="object-cover"
              sizes="56px"
              priority={false}
            />
          </div>
          <div>
            <div className="text-lg font-semibold leading-tight">{name}</div>
            <div className="text-sm text-cyan-300 font-medium">{role}</div>
            {subtitle ? <div className="text-xs text-slate-400 mt-0.5">{subtitle}</div> : null}
          </div>
        </div>

        <ul className="flex-1 space-y-2 text-sm text-slate-300">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5" />
              <span className="leading-7">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

function MiniLink({ href, icon: Icon, title, sub }) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:border-cyan-300/30 transition"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-lg border border-white/10 bg-white/5 p-2">
          <Icon className="h-4 w-4 text-cyan-300" />
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-slate-100 group-hover:text-cyan-300 transition">
            {title}
          </div>
          {sub ? <div className="mt-1 text-xs text-slate-400 leading-6">{sub}</div> : null}
        </div>
      </div>
    </Link>
  );
}

export default function AboutPage() {
  const brand = site?.name || "Supreme IT Experts";

  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(
    /\/$/,
    ""
  );
  const canonical = `${baseUrl}/about`;

  // JSON-LD (WebSite + BreadcrumbList + WebPage + Person nodes)
  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const WEBPAGE_ID = `${canonical}#webpage`;

  const leaders = [
    {
      name: "Muhammad Barkat Saifee",
      role: "Founder & CEO",
      subtitle: "Leadership • Strategy • Client Success",
      img: "/team/leader-barkat.png",
      bullets: [
        "Business-first IT leadership: clear ownership, priorities, and outcomes",
        "Focus on reliability + accountability so SMB owners always know what’s happening",
        "Senior-led standards across managed IT, security, and customer experience",
      ],
    },
    {
      name: "Muhammad Ahmad Rathi",
      role: "Operations Manager",
      subtitle: "MS Cloud Computing",
      img: "/team/leader-ahmad.png",
      bullets: [
        "Runs day-to-day operations to keep support responsive and consistent",
        "Change control + documentation discipline across client environments",
        "Cloud best practices for reliability, scalability, and modernization",
      ],
    },
    {
      name: "Muhammad Hazrat Rathi",
      role: "Head of Managed Services (MSP) & Automation",
      subtitle: "MS AI & Machine Learning",
      img: "/team/leader-hazrat.png",
      bullets: [
        "Owns MSP execution: monitoring, patching, endpoint standards, and automation",
        "Proactive prevention: reduce repeat tickets and recurring downtime",
        "Automation-driven workflows to improve response speed and consistency",
      ],
    },
  ];

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
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
          { "@type": "ListItem", position: 2, name: "About", item: canonical },
        ],
      },
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: canonical,
        name: `About | ${brand}`,
        description:
          "Meet the leadership and delivery team behind Supreme IT Experts. Senior-led managed IT, helpdesk support, and cybersecurity for SMBs across Allentown, Macungie & Emmaus.",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": BUSINESS_ID },
        breadcrumb: { "@id": BREADCRUMB_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: new URL("/og-image.png?v=7", baseUrl).toString(),
        },
      },
      ...leaders.map((p) => ({
        "@type": "Person",
        "@id": `${canonical}#${p.name.toLowerCase().replace(/\s+/g, "-")}`,
        name: p.name,
        jobTitle: p.role,
        worksFor: { "@id": BUSINESS_ID },
      })),
    ],
  };

  return (
    <>
      {/* ✅ JSON-LD */}
      <Script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="About us"
        title="Senior-led IT that’s clear, accountable, and security-first"
        sub={
          <>
            We help businesses in{" "}
            <Link href="/locations/allentown-pa" className="text-cyan-300 hover:underline">
              Allentown
            </Link>
            ,{" "}
            <Link href="/locations/macungie-pa" className="text-cyan-300 hover:underline">
              Macungie
            </Link>{" "}
            &{" "}
            <Link href="/locations/emmaus-pa" className="text-cyan-300 hover:underline">
              Emmaus
            </Link>{" "}
            reduce downtime, tighten security, and run predictable IT — without the chaos.
          </>
        }
        className="sm:px-5 md:px-6"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-5 md:px-6 pb-20 space-y-12">
        {/* ───────────────────────────────────────────── */}
        {/* HERO VISUAL STRIP */}
        {/* ───────────────────────────────────────────── */}
        <Reveal className="-mt-4">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 items-stretch">
            <Card className="p-6 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10">
              <p className="text-sm text-slate-200 leading-7">
                If you’re searching for{" "}
                <span className="font-semibold text-white">
                  cybersecurity experts in Allentown
                </span>{" "}
                or reliable{" "}
                <Link href="/services/managed-it" className="text-cyan-300 hover:underline">
                  managed IT services
                </Link>{" "}
                for your business — we’re built for SMB teams who want stability, fast help, and
                security that actually holds up.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>
                  <Layers className="h-3.5 w-3.5 text-cyan-300" />{" "}
                  <Link href="/services/managed-it" className="hover:underline">
                    Managed IT
                  </Link>
                </Pill>
                <Pill>
                  <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" />{" "}
                  <Link href="/services/cybersecurity" className="hover:underline">
                    Cybersecurity
                  </Link>
                </Pill>
                <Pill>
                  <Headphones className="h-3.5 w-3.5 text-cyan-300" />{" "}
                  <Link href="/services" className="hover:underline">
                    Helpdesk
                  </Link>
                </Pill>
                <Pill>
                  <Cloud className="h-3.5 w-3.5 text-cyan-300" />{" "}
                  <Link href="/services/cloud-workspace" className="hover:underline">
                    Cloud
                  </Link>
                </Pill>
              </div>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact?type=assessment&source=about-hero"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
                >
                  Get a free 20-min assessment <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/get-quote"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-300/30 hover:text-cyan-300 transition"
                >
                  Pricing & Quote
                </Link>
              </div>

              <p className="mt-3 text-xs text-slate-400 leading-6">
                Prefer location info? Browse{" "}
                <Link href="/areas" className="text-cyan-300 hover:underline">
                  areas we serve
                </Link>{" "}
                or see our local pages for{" "}
                <Link href="/locations/allentown-pa" className="text-cyan-300 hover:underline">
                  Allentown
                </Link>
                ,{" "}
                <Link href="/locations/macungie-pa" className="text-cyan-300 hover:underline">
                  Macungie
                </Link>{" "}
                and{" "}
                <Link href="/locations/emmaus-pa" className="text-cyan-300 hover:underline">
                  Emmaus
                </Link>
                .
              </p>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
              <div className="p-5 flex items-center justify-between">
                <div className="text-sm text-slate-200 font-semibold">Modern IT, security-first</div>
                <div className="text-xs text-slate-400">Lehigh Valley • PA</div>
              </div>

              <div className="relative h-[220px] sm:h-[260px] px-5 pb-5">
                <Image
                  src="/about/hero-cyber.svg"
                  alt="Cybersecurity and IT support illustration"
                  fill
                  className="object-contain opacity-95"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  priority={false}
                />
              </div>

              <div className="px-5 pb-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <div className="text-cyan-300 font-semibold">&lt;15 min</div>
                  <div className="text-xs text-slate-400 mt-1">Response target</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <div className="text-cyan-300 font-semibold">24/7</div>
                  <div className="text-xs text-slate-400 mt-1">Monitoring options</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                  <div className="text-cyan-300 font-semibold">Backups</div>
                  <div className="text-xs text-slate-400 mt-1">Tested restores</div>
                </div>
              </div>
            </Card>
          </div>
        </Reveal>

        {/* ───────────────────────────────────────────── */}
        {/* VISUAL HIGHLIGHTS (5 IMAGES) */}
        {/* ───────────────────────────────────────────── */}
        <Reveal>
          <section>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl font-semibold">What we actually deliver</h2>
                <p className="mt-2 text-sm text-slate-300 leading-7 max-w-2xl">
                  Not vague promises — real standards and repeatable delivery across{" "}
                  <Link href="/services/managed-it" className="text-cyan-300 hover:underline">
                    managed IT
                  </Link>
                  ,{" "}
                  <Link href="/services/cybersecurity" className="text-cyan-300 hover:underline">
                    cybersecurity
                  </Link>
                  ,{" "}
                  <Link href="/services/cloud-workspace" className="text-cyan-300 hover:underline">
                    cloud workspace
                  </Link>{" "}
                  and{" "}
                  <Link href="/services/device-management" className="text-cyan-300 hover:underline">
                    device management
                  </Link>
                  .
                </p>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-300/30 hover:text-cyan-300 transition"
              >
                View all services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid md:grid-cols-5 gap-3">
              {[
                {
                  img: "/about/hero-cyber.svg",
                  title: "Security baselines",
                  sub: "MFA, patching, endpoint hardening.",
                  href: "/services/cybersecurity",
                },
                {
                  img: "/about/ill-helpdesk.svg",
                  title: "Helpdesk support",
                  sub: "Fast response + clean escalation.",
                  href: "/services",
                },
                {
                  img: "/about/ill-cloud.svg",
                  title: "Cloud & identity",
                  sub: "Microsoft 365 + modern workflows.",
                  href: "/services/cloud-workspace",
                },
                {
                  img: "/about/ill-automation.svg",
                  title: "Automation",
                  sub: "Fewer repeats, faster fixes.",
                  href: "/services/vcio-strategy",
                },
                {
                  img: "/about/ill-infrastructure.svg",
                  title: "Infrastructure",
                  sub: "Networks, backups, monitoring.",
                  href: "/services/projects-consulting",
                },
              ].map((x) => (
                <Link
                  key={x.title}
                  href={x.href}
                  className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-300/30 transition overflow-hidden"
                >
                  <div className="relative h-[110px]">
                    <Image
                      src={x.img}
                      alt={x.title}
                      fill
                      className="object-contain p-2 opacity-95"
                      sizes="(max-width: 768px) 50vw, 180px"
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition">
                      {x.title}
                    </div>
                    <div className="mt-1 text-[11px] text-slate-400 leading-5">{x.sub}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ───────────────────────────────────────────── */}
        {/* STORY + PROCESS */}
        {/* ───────────────────────────────────────────── */}
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_0.95fr] gap-8 items-start">
            <section>
              <h2 className="text-2xl font-semibold">Our story</h2>
              <p className="mt-3 text-slate-300 leading-7">
                {brand} was built on a simple idea: SMBs deserve enterprise-grade reliability without
                enterprise complexity. Most teams don’t need more tools — they need a partner who
                answers fast, fixes root causes, and keeps systems secure over time.
              </p>
              <p className="mt-3 text-slate-300 leading-7">
                We support businesses across the Lehigh Valley with a practical approach: stabilize
                the basics (devices, network, backups), harden security (MFA, patching, endpoint
                protection), and keep operations smooth with clear reporting. If you’re comparing options,
                start here:{" "}
                <Link href="/services/managed-it" className="text-cyan-300 hover:underline">
                  Managed IT
                </Link>{" "}
                and{" "}
                <Link href="/services/cybersecurity" className="text-cyan-300 hover:underline">
                  Cybersecurity
                </Link>
                .
              </p>
              <p className="mt-3 text-slate-300 leading-7">
                Want proof + clarity? Check{" "}
                <Link href="/faqs" className="text-cyan-300 hover:underline">
                  FAQs
                </Link>{" "}
                and our{" "}
                <Link href="/blog" className="text-cyan-300 hover:underline">
                  blog
                </Link>{" "}
                for how we think, what we standardize, and what to expect.
              </p>
            </section>

            <Card className="p-6">
              <div className="text-sm text-slate-200 font-semibold">Simple 3-step approach</div>
              <div className="mt-4 grid gap-3">
                {[
                  { n: "1", t: "Assess", d: "Quick review + confirm scope in 2–3 questions." },
                  { n: "2", t: "Stabilize", d: "Fix the basics, reduce downtime, document." },
                  { n: "3", t: "Secure & improve", d: "Security baselines + measurable progress." },
                ].map((x) => (
                  <div key={x.t} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-400/10 text-xs font-bold text-cyan-300">
                        {x.n}
                      </span>
                      <div className="font-semibold text-slate-100">{x.t}</div>
                    </div>
                    <p className="mt-2 text-sm text-slate-300 leading-7">{x.d}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xs text-slate-400 leading-6">
                Next: see how we handle{" "}
                <Link href="/services/projects-consulting" className="text-cyan-300 hover:underline">
                  projects & consulting
                </Link>{" "}
                and{" "}
                <Link href="/services/vcio-strategy" className="text-cyan-300 hover:underline">
                  vCIO strategy
                </Link>
                .
              </div>
            </Card>
          </div>
        </Reveal>

        {/* ───────────────────────────────────────────── */}
        {/* BELIEFS / STANDARDS */}
        {/* ───────────────────────────────────────────── */}
        <Reveal>
          <section>
            <h2 className="text-2xl font-semibold">What we believe</h2>
            <div className="mt-5 grid md:grid-cols-2 gap-4">
              <Card className="p-5">
                <IconRow
                  icon={Timer}
                  title="Fast response + clear ownership"
                  desc='If it’s broken, we own it end-to-end. No finger-pointing. No “IT black box.”'
                />
              </Card>
              <Card className="p-5">
                <IconRow
                  icon={ShieldCheck}
                  title="Security-first by default"
                  desc="MFA, hardened endpoints, patching discipline, and practical baselines that reduce risk."
                />
              </Card>
              <Card className="p-5">
                <IconRow
                  icon={ClipboardCheck}
                  title="Simple communication"
                  desc="Plain-English updates, before/after change notes, and clear next steps."
                />
              </Card>
              <Card className="p-5">
                <IconRow
                  icon={Layers}
                  title="Predictable costs"
                  desc="Clear deliverables and planning — so you’re not surprised later."
                />
              </Card>
            </div>

            <p className="mt-4 text-slate-300 text-sm leading-7">
              Want the full deliverables? See our{" "}
              <Link
                href="/services"
                className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
              >
                IT services
              </Link>{" "}
              and how we structure{" "}
              <Link
                href="/services/managed-it"
                className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
              >
                managed IT
              </Link>
              .
            </p>
          </section>
        </Reveal>

        {/* ───────────────────────────────────────────── */}
        {/* WHO WE HELP + DELIVERY TEAM VISUAL */}
        {/* ───────────────────────────────────────────── */}
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_0.95fr] gap-8 items-start">
            <section>
              <h2 className="text-2xl font-semibold">Who we help</h2>
              <p className="mt-3 text-slate-300 leading-7">
                We’re a strong fit for teams with{" "}
                <span className="text-white font-semibold">10–100 users</span> that want stable IT,
                better security, and a clear plan — without hiring a full in-house IT department.
              </p>

              <ul className="mt-4 space-y-2 text-slate-300 text-sm">
                {[
                  "Teams dealing with frequent outages, slow devices, or messy networks",
                  "Owners worried about ransomware, phishing, and data loss",
                  "Businesses that need dependable support and predictable costs",
                ].map((x) => (
                  <li key={x} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5" />
                    <span className="leading-7">{x}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 text-sm text-slate-300 leading-7">
                If you’re local, start with your area:{" "}
                <Link href="/locations/allentown-pa" className="text-cyan-300 hover:underline">
                  Allentown IT support
                </Link>
                ,{" "}
                <Link href="/locations/macungie-pa" className="text-cyan-300 hover:underline">
                  Macungie managed IT
                </Link>
                ,{" "}
                <Link href="/locations/emmaus-pa" className="text-cyan-300 hover:underline">
                  Emmaus cybersecurity
                </Link>
                , or{" "}
                <Link href="/areas" className="text-cyan-300 hover:underline">
                  all service areas
                </Link>
                .
              </p>
            </section>

            <Card className="p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10" />
              <div className="relative">
                <div className="text-sm font-semibold text-slate-100">
                  Delivery team (the people who do the work)
                </div>
                <p className="mt-2 text-sm text-slate-300 leading-7">
                  Beyond leadership, we have a dedicated delivery team — helpdesk, infrastructure,
                  security, and cloud — following the same standards on every client.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2 font-semibold text-slate-100">
                      <Headphones className="h-4 w-4 text-cyan-300" />{" "}
                      <Link href="/services" className="hover:underline">
                        Helpdesk
                      </Link>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">Clean workflows + escalation</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2 font-semibold text-slate-100">
                      <ShieldCheck className="h-4 w-4 text-cyan-300" />{" "}
                      <Link href="/services/cybersecurity" className="hover:underline">
                        Security
                      </Link>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">Practical baselines</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2 font-semibold text-slate-100">
                      <Cloud className="h-4 w-4 text-cyan-300" />{" "}
                      <Link href="/services/cloud-workspace" className="hover:underline">
                        Cloud
                      </Link>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">Migrations + identity</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2 font-semibold text-slate-100">
                      <Bot className="h-4 w-4 text-cyan-300" />{" "}
                      <Link href="/services/device-management" className="hover:underline">
                        Device Mgmt
                      </Link>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">Standards + patching</p>
                  </div>
                </div>

                <div className="mt-5 relative h-[180px]">
                  <Image
                    src="/about/ill-helpdesk.svg"
                    alt="IT support team illustration"
                    fill
                    className="object-contain opacity-95"
                    sizes="(max-width: 1024px) 100vw, 420px"
                  />
                </div>

                <div className="mt-4 text-xs text-slate-400 leading-6">
                  Want to start? Use{" "}
                  <Link href="/contact" className="text-cyan-300 hover:underline">
                    contact
                  </Link>{" "}
                  or request a{" "}
                  <Link href="/get-quote" className="text-cyan-300 hover:underline">
                    quote
                  </Link>
                  .
                </div>
              </div>
            </Card>
          </div>
        </Reveal>

        {/* ───────────────────────────────────────────── */}
        {/* EXPLORE SERVICES (STRONG INTERNAL LINKING) */}
        {/* ───────────────────────────────────────────── */}
        <Reveal>
          <section>
            <h2 className="text-2xl font-semibold">Explore our services</h2>
            <p className="mt-2 text-sm text-slate-300 leading-7 max-w-2xl">
              If you’re deciding what you need, these pages break down scope, outcomes, and what’s
              included — so expectations stay clear.
            </p>

            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <MiniLink
                href="/services/managed-it"
                icon={Layers}
                title="Managed IT"
                sub="Monitoring, patching, standards, predictable support."
              />
              <MiniLink
                href="/services/cybersecurity"
                icon={ShieldCheck}
                title="Cybersecurity"
                sub="MFA, endpoint security, hardening, risk reduction."
              />
              <MiniLink
                href="/services/cloud-workspace"
                icon={Cloud}
                title="Cloud Workspace"
                sub="Microsoft 365, identity, secure collaboration."
              />
              <MiniLink
                href="/services/device-management"
                icon={Bot}
                title="Device Management"
                sub="Endpoint baselines, patching, compliance hygiene."
              />
              <MiniLink
                href="/services/projects-consulting"
                icon={FileText}
                title="Projects & Consulting"
                sub="Migrations, upgrades, network improvements."
              />
              <MiniLink
                href="/services/vcio-strategy"
                icon={ClipboardCheck}
                title="vCIO & Strategy"
                sub="Roadmaps, budgeting, alignment, planning."
              />
              <MiniLink
                href="/services"
                icon={ArrowRight}
                title="All Services"
                sub="See the full services hub."
              />
            </div>
          </section>
        </Reveal>

        {/* ───────────────────────────────────────────── */}
        {/* AREAS WE SERVE (STRONG INTERNAL LINKING) */}
        {/* ───────────────────────────────────────────── */}
        <Reveal>
          <section>
            <h2 className="text-2xl font-semibold">Areas we serve</h2>
            <p className="mt-2 text-sm text-slate-300 leading-7 max-w-2xl">
              Local pages help Google understand coverage and help customers find you faster.
            </p>

            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              <MiniLink
                href="/areas"
                icon={MapPin}
                title="All service areas"
                sub="Browse cities and coverage."
              />
              <MiniLink
                href="/locations/allentown-pa"
                icon={MapPin}
                title="Allentown, PA"
                sub="Managed IT + cybersecurity."
              />
              <MiniLink
                href="/locations/macungie-pa"
                icon={MapPin}
                title="Macungie, PA"
                sub="IT support for SMBs."
              />
              <MiniLink
                href="/locations/emmaus-pa"
                icon={MapPin}
                title="Emmaus, PA"
                sub="Security-first IT services."
              />
            </div>

            <div className="mt-4 text-xs text-slate-400 leading-6">
              Lead capture page:{" "}
              <Link href="/lp/allentown#claim" className="text-cyan-300 hover:underline">
                Allentown claim
              </Link>
              .
            </div>
          </section>
        </Reveal>

        {/* ───────────────────────────────────────────── */}
        {/* LEADERSHIP */}
        {/* ───────────────────────────────────────────── */}
        <Reveal>
          <section>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl font-semibold">Leadership</h2>
                <p className="mt-1 text-sm text-slate-300">
                  Senior-led accountability — backed by a real delivery team and documented standards.
                </p>
              </div>

              <Link
                href="/contact?type=assessment&source=about-leadership"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
              >
                Get a Free IT Assessment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-5 grid gap-4">
              {leaders.map((l) => (
                <LeaderCard key={l.name} {...l} />
              ))}
            </div>

            <div className="mt-4 text-xs text-slate-400 leading-6">
              Learn more:{" "}
              <Link href="/faqs" className="text-cyan-300 hover:underline">
                FAQs
              </Link>{" "}
              •{" "}
              <Link href="/blog" className="text-cyan-300 hover:underline">
                Blog
              </Link>{" "}
              •{" "}
              <Link href="/gallery" className="text-cyan-300 hover:underline">
                Gallery
              </Link>
              .
            </div>
          </section>
        </Reveal>

        {/* ───────────────────────────────────────────── */}
        {/* RESOURCES (MORE INTERNAL LINKS + EEAT SUPPORT) */}
        {/* ───────────────────────────────────────────── */}
        <Reveal>
          <section>
            <h2 className="text-2xl font-semibold">Next steps</h2>
            <p className="mt-2 text-sm text-slate-300 leading-7 max-w-2xl">
              If you’re evaluating an IT partner, these pages answer the common questions fast.
            </p>

            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              <MiniLink href="/contact" icon={PhoneCall} title="Contact" sub="Talk to a real human." />
              <MiniLink href="/get-quote" icon={FileText} title="Get a Quote" sub="Pricing & next steps." />
              <MiniLink href="/faqs" icon={HelpCircle} title="FAQs" sub="Clear answers, no fluff." />
              <MiniLink href="/blog" icon={FileText} title="Blog" sub="Guides + practical IT tips." />
            </div>

            <div className="mt-4 text-xs text-slate-400 leading-6">
              Prefer the main hub?{" "}
              <Link href="/" className="text-cyan-300 hover:underline">
                Home
              </Link>{" "}
              •{" "}
              <Link href="/services" className="text-cyan-300 hover:underline">
                Services
              </Link>{" "}
              •{" "}
              <Link href="/areas" className="text-cyan-300 hover:underline">
                Areas
              </Link>
              .
            </div>
          </section>
        </Reveal>

        {/* ───────────────────────────────────────────── */}
        {/* CTA */}
        {/* ───────────────────────────────────────────── */}
        <Reveal>
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-7">
            <h2 className="text-xl font-semibold">Ready for a clear IT plan?</h2>
            <p className="mt-2 text-sm text-slate-300 leading-7 max-w-2xl">
              If you want fewer surprises, stronger security, and faster support, start with a quick
              assessment — no pressure.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?type=assessment&source=about-cta"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
              >
                Get a Free IT Assessment <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-300/30 hover:text-cyan-300 transition"
              >
                Contact us
              </Link>
            </div>

            <p className="mt-3 text-xs text-slate-400 leading-6">
              Prefer location info? Browse{" "}
              <Link href="/areas" className="text-cyan-300 hover:underline">
                Areas we serve
              </Link>{" "}
              • See{" "}
              <Link href="/locations/allentown-pa" className="text-cyan-300 hover:underline">
                Allentown
              </Link>
              ,{" "}
              <Link href="/locations/macungie-pa" className="text-cyan-300 hover:underline">
                Macungie
              </Link>
              ,{" "}
              <Link href="/locations/emmaus-pa" className="text-cyan-300 hover:underline">
                Emmaus
              </Link>
              .
            </p>
          </section>
        </Reveal>
      </main>
    </>
  );
}
