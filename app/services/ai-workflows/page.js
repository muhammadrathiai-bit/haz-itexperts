// app/services/ai-workflows/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";
import { BUSINESS_ID, BASE_URL } from "@/lib/seoIds";

const AREAS_SERVED = [
  "Broomall, PA",
  "Newtown Square, PA",
  "Havertown, PA",
  "Springfield, PA",
  "Media, PA",
  "Allentown, PA",
  "Macungie, PA",
  "Emmaus, PA",
];

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonicalAbs = `${baseUrl}/services/ai-workflows`;

  const fullTitle = `AI Automation for Small Business | AI Front Desk, Follow-ups & Secure AI Rollout | ${brand}`;

  const description =
    "Practical AI for local businesses, set up safely by an IT and security team: missed-call text-back, after-hours AI answering, lead and estimate follow-up, review requests, paperwork automation, and secure Copilot/Gemini/ChatGPT rollout. Free 30-minute IT + AI Checkup.";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: "/services/ai-workflows" },
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
          alt: `${brand} — AI Workflows & Automation`,
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
  const canonical = `${baseUrl}/services/ai-workflows`;

  const faqs = [
    {
      q: "What does it cost?",
      a: "The 30-minute IT + AI Checkup is free and you keep the one-page report. Projects are fixed-price and agreed before we start; most first projects are in the low thousands, plus an optional monthly care plan. You see the math first. If a fix will not pay for itself, we will tell you not to do it.",
    },
    {
      q: "Is my data safe?",
      a: "That is our day job. We are a managed IT and cybersecurity firm first. We use business-grade tools that do not train on your data where that option exists, set least-privilege access, and you own your accounts and your data. We do not touch patient records or other regulated data without the right agreements in place.",
    },
    {
      q: "Will AI replace my staff?",
      a: "No. It takes the work nobody has time for: the call that comes in while everyone is on a job, the estimate nobody followed up, the form typed into three systems. Your people handle the conversations that need a person.",
    },
    {
      q: "Do callers know they are talking to an AI?",
      a: "Yes, always. Any AI that talks to your customers says it is an assistant, and because Pennsylvania requires everyone's consent to record a call, the greeting says so up front. Emergencies and anything unusual go straight to a person.",
    },
    {
      q: "We already have an IT provider. Can you still help?",
      a: "Yes. The AI work is separate and we are happy to work alongside your current IT support. If the Checkup shows your IT is solid, the report will say so.",
    },
    {
      q: "How long does it take?",
      a: "Most first projects are live in two to three weeks. For the first two weeks after go-live a person reviews what the automation does, so problems are caught before your customers notice.",
    },
    {
      q: "I already use Jobber, Housecall Pro, QuickBooks or Microsoft 365. Do I need new software?",
      a: "Usually not. We start with what you already pay for. Many tools now include AI features that are simply switched off or set up badly. We configure, connect and monitor them, and only add something new when there is a clear reason.",
    },
  ];

  const cfg = {
    title: "AI Workflows & Automation",
    lede:
      "Stop losing time and customers to busywork. Practical AI for local businesses — missed calls, follow-ups, reviews and paperwork — set up safely by the same team that protects your IT.",
    hero: "/images/services/ai-hero.svg",

    localLinks: {
      eyebrow: "We come to you",
      title: "Free 30-minute IT + AI Checkup",
      desc: "Onsite in Delaware County and the Main Line, remote everywhere else. You get a one-page report in 48 hours: your top 3 time and money leaks, your top 3 security gaps, and what we would fix first with a fixed price.",
      items: [
        { label: "Broomall, PA", href: "/locations/broomall-pa", desc: "Our home base. Onsite checkups." },
        { label: "Newtown Square, PA", href: "/locations/newtown-square-pa", desc: "Offices and trades along West Chester Pike." },
        { label: "Havertown, PA", href: "/locations/havertown-pa", desc: "Contractors, practices and local shops." },
        { label: "Springfield, PA", href: "/locations/springfield-pa", desc: "Retail, auto and professional offices." },
        { label: "Media, PA", href: "/locations/media-pa", desc: "Law, accounting and county-seat offices." },
        { label: "Lehigh Valley", href: "/locations/allentown-pa", desc: "Allentown, Macungie and Emmaus (remote-first)." },
      ],
      cta1: { label: "Book the free Checkup", href: "/contact?type=assessment&source=ai-workflows" },
      cta2: { label: "View all areas", href: "/areas" },
    },

    stats: [
      { kpi: "Free", label: "30-min IT + AI Checkup" },
      { kpi: "2–3 weeks", label: "Typical first project" },
      { kpi: "Fixed", label: "Price agreed up front" },
      { kpi: "Yours", label: "Accounts and data stay yours" },
    ],

    sections: [
      {
        heading: "An AI front desk that never lets a call go cold",
        body:
          "In a 2025 CallRail survey of 1,000 US consumers, 78% said they had abandoned a business after an unanswered call and 82% said they would call a competitor instead; only 42% leave a voicemail. We set up missed-call text-back and after-hours AI answering on your own number: the caller is greeted, the job details are captured, an appointment is offered, and emergencies are passed straight to a person. The assistant always says it is an AI assistant, and every call is logged so you can see exactly what it handled.",
        image: "/images/illus/helpdesk.svg",
        imageSide: "right",
      },
      {
        heading: "Follow-ups, reviews and paperwork that run themselves",
        body:
          "Every new inquiry gets a fast reply. Every open estimate gets a polite, persistent follow-up until it is a yes or a no. Every customer is asked for a review at the right moment — all of them, the way Google and the FTC require — with replies drafted for your one-click approval. Forms, invoices and documents are read, sorted and entered into the systems you already use, so nobody types the same thing twice.",
        image: "/images/illus/screens-4.svg",
        imageSide: "left",
      },
      {
        heading: "Secure AI for your team, not shadow AI",
        body:
          "Your staff are probably already pasting work into ChatGPT. We roll out Copilot, Gemini, ChatGPT or Claude properly: clean up who can see which files first, write a one-page AI usage policy people will actually follow, build a prompt library around your real tasks, and train the team hands-on. Because we also run your IT and security, the AI is deployed with the same care as the rest of your systems.",
        image: "/images/illus/shield.svg",
        imageSide: "right",
      },
    ],

    problems: [
      "The phone rings while everyone is on a job — it goes to voicemail and they call the next company",
      "Estimates go out and nobody has time to follow up",
      "The office manager types the same details into three different systems",
      "Happy customers never get asked for a review",
      "Staff paste client information into AI tools and nobody has set any rules",
      "You have heard the AI pitch from strangers online and do not know who to trust",
    ],

    outcomes: [
      "Missed and after-hours calls are answered or texted back within seconds",
      "Every lead and estimate gets a consistent, friendly follow-up",
      "A steady stream of new Google reviews, requested the compliant way",
      "Hours of retyping and document chasing handed to automation",
      "A clear AI policy, trained staff and the right data permissions",
      "One accountable local team for IT, security and AI",
    ],

    features: [
      { icon: "Sparkles", title: "AI Front Desk", desc: "Missed-call text-back, after-hours answering and booking on your own number." },
      { icon: "Users", title: "Lead & Estimate Follow-up", desc: "Fast first replies and polite follow-ups until it is a yes or a no." },
      { icon: "BarChart3", title: "Review Autopilot", desc: "Every customer asked, replies drafted for approval, unhappy customers reach you first." },
      { icon: "BookOpen", title: "Inbox & Paperwork", desc: "Forms, invoices and documents read, sorted and entered without retyping." },
      { icon: "Lock", title: "Secure AI Rollout", desc: "Copilot, Gemini, ChatGPT or Claude with permissions cleanup, policy and training." },
      { icon: "Cpu", title: "Knowledge Assistant", desc: "Staff ask your SOPs, price book and handbook instead of interrupting the owner." },
    ],

    steps: [
      {
        title: "Free Checkup",
        desc: "30 minutes at your place. We look at how calls, scheduling and paperwork really flow, plus a quick security check. No access to your files needed.",
        outputs: ["One-page report in 48 hours", "Top 3 time and money leaks", "Top 3 security gaps"],
      },
      {
        title: "Fixed-price plan",
        desc: "We agree on the one number to improve, the scope and the price before anything starts.",
        outputs: ["Baseline metric captured", "Scope: what is in and out", "Price and payback math"],
      },
      {
        title: "Build & test",
        desc: "We build on your own accounts, test the edge cases, and you approve every script and message before go-live.",
        outputs: ["Test plan passed", "Your approval of scripts", "Staff walkthrough"],
      },
      {
        title: "Go live & watch",
        desc: "A person reviews what the automation does for the first two weeks. Then a monthly results report against the baseline.",
        outputs: ["2-week human review", "Monthly results report", "Tuning and small improvements"],
      },
    ],

    deliverables: [
      "One-page IT + AI Checkup report (free)",
      "Baseline metric and monthly results report",
      "Call flows, scripts and messages you approved",
      "Documentation of every automation and who owns which account",
      "AI acceptable-use policy and staff training (Secure AI Rollout)",
      "Compliance notes: AI disclosure, call-recording consent, text-message registration",
    ],

    tooling: [
      "Your existing phone number",
      "Jobber / Housecall Pro / QuickBooks",
      "Microsoft 365 Copilot",
      "Google Workspace Gemini",
      "ChatGPT / Claude",
      "Voice AI + SMS (registered)",
      "Workflow automation",
    ],

    timeline: [
      { when: "Day 1", title: "Free Checkup", desc: "Onsite walk-through + quick security check" },
      { when: "48 hours", title: "One-page report", desc: "Leaks, gaps, first fix with a fixed price" },
      { when: "Weeks 1–3", title: "Build, test, go live", desc: "Human review for the first two weeks" },
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
      { "@type": "ListItem", position: 3, name: "AI Workflows & Automation", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "AI Workflows & Automation",
    serviceType: "AI automation for small business",
    description:
      "Practical AI automation for small and mid-sized businesses: AI front desk and missed-call text-back, lead and estimate follow-up, review requests, document automation, and secure AI rollout with policy and training.",
    url: canonical,
    provider: { "@id": BUSINESS_ID },
    areaServed: AREAS_SERVED,
    offers: {
      "@type": "Offer",
      name: "Free 30-minute IT + AI Checkup",
      url: `${baseUrl}/contact?type=assessment&source=ai-workflows`,
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: `AI Workflows & Automation for Small Business | ${brand}`,
    description:
      "AI front desk, follow-ups, review requests, paperwork automation and secure AI rollout — set up safely by an IT and security team.",
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
