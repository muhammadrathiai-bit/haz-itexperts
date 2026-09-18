// lib/locationsDelco.js
// Delaware County / Main Line location pages (same shape as lib/locations.js entries).
// Shared service sections are generated per city; paragraphs, local notes and FAQs are written per city.

function slugId(city) {
  return city.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function sections(city, notes = {}) {
  const id = slugId(city);
  return [
    {
      id: `managed-it-services-${id}`,
      title: `Managed IT Services in ${city}, PA`,
      sub: notes.managedSub || `Predictable, fixed-fee IT support for ${city} offices and shops.`,
      href: "/services/managed-it",
      text:
        notes.managedText ||
        `Managed IT for ${city} businesses means someone owns the problem before it becomes downtime: monitoring, consistent patching, a helpdesk your staff will actually use, and a monthly report an owner can read in two minutes.`,
      bullets: [
        "Helpdesk with clear ownership of every ticket",
        "Proactive monitoring and patching",
        "Tested backups, not just scheduled ones",
        "Onsite visits when remote is not enough",
      ],
    },
    {
      id: `cybersecurity-${id}`,
      title: `Cybersecurity & Email Protection in ${city}`,
      sub: "The basics cyber-insurance applications now ask about.",
      href: "/services/cybersecurity",
      text:
        notes.securityText ||
        `Most attacks on small businesses start in the inbox. We set up multi-factor login, endpoint protection, and email anti-impersonation (SPF, DKIM and DMARC) so a scammer cannot send invoices that look like they came from you, and we make sure your backups can actually be restored.`,
      bullets: [
        "MFA and identity hardening",
        "Email anti-impersonation: SPF, DKIM, DMARC",
        "Endpoint protection with someone watching the alerts",
        "Cyber-insurance readiness",
      ],
    },
    {
      id: `ai-automation-${id}`,
      title: `AI Automation for ${city} Businesses`,
      sub: "Practical AI, set up safely by your IT and security team.",
      href: "/services/ai-workflows",
      text:
        notes.aiText ||
        `We put AI to work on the busywork: missed calls get an instant text back, after-hours calls are answered and booked, estimates get followed up, every customer is asked for a review, and paperwork is entered without retyping. Any AI that talks to your customers says it is an assistant, and you approve every script before it goes live.`,
      bullets: [
        "AI front desk and missed-call text-back",
        "Lead and estimate follow-up",
        "Review requests done the compliant way",
        "Secure rollout of Copilot, Gemini, ChatGPT or Claude",
      ],
    },
    {
      id: `microsoft-365-google-workspace-${id}`,
      title: "Microsoft 365 & Google Workspace Support",
      sub: "Email, files and sign-ins that simply work.",
      href: "/services/cloud-workspace",
      text: `Migrations off old email hosting, secure tenant baselines, license cleanup and day-to-day support for ${city} teams on Microsoft 365 or Google Workspace.`,
      bullets: [
        "Migrations from legacy or registrar-hosted email",
        "Secure baselines and sharing permissions",
        "License and cost cleanup",
        "Day-to-day user support",
      ],
    },
    {
      id: `compliance-${id}`,
      title: "Compliance Help: HIPAA, IRS WISP, FTC Safeguards",
      sub: "Plain-English help for regulated offices.",
      href: "/services/projects-consulting",
      text:
        "Dental and medical practices, tax and accounting firms, and auto dealers all have written security requirements. We help you put the practical controls and the paperwork in place without turning it into a six-month project.",
      bullets: [
        "Written Information Security Plan (WISP) support",
        "Risk review and remediation plan",
        "Device encryption and access controls",
        "Staff security awareness basics",
      ],
    },
  ];
}

function faqs(city, extra = []) {
  return [
    {
      q: `Are you actually local to ${city}?`,
      a: `Yes. We are based in Broomall, in Delaware County, and we come onsite across ${city} and the surrounding towns. Day-to-day support is remote-first because it is faster; onsite is there when it is needed.`,
    },
    {
      q: "What is the free IT + AI Checkup?",
      a: "A 30-minute visit. We look at how calls, scheduling and paperwork really flow, plus a quick security check. Within 48 hours you get a one-page report: your top 3 time and money leaks, your top 3 security gaps, and what we would fix first with a fixed price. You keep the report either way.",
    },
    ...extra,
    {
      q: "We already have an IT person. Can you still help?",
      a: "Yes. We can co-manage alongside internal IT or another provider, and the AI automation work is separate from IT support. If your IT is solid, the Checkup report will say so.",
    },
    {
      q: "Is AI safe to use with our customer data?",
      a: "It can be, if it is set up properly. We use business-grade tools, least-privilege access and a written AI usage policy. You own your accounts and data. We do not touch patient or other regulated records without the right agreements in place.",
    },
    {
      q: "How is pricing structured?",
      a: "Managed IT is a predictable per-user monthly fee. AI projects are fixed-price and agreed before we start, with an optional monthly care plan. You always see the math first.",
    },
  ];
}

function make({ slug, city, lede, nearby, paragraphs, microTrust, notes, extraFaqs }) {
  return {
    slug,
    city,
    state: "PA",
    title: `IT Support, Cybersecurity & AI Automation in ${city}, PA`,
    lede,
    nearby,
    copy: {
      paragraphs,
      primaryCtaText: "Free 30-min IT + AI Checkup",
      secondaryCtaText: "Contact us",
      microTrust,
    },
    serviceSections: sections(city, notes),
    faqs: faqs(city, extraFaqs),
  };
}

export const DELCO_LOCATIONS = [
  make({
    slug: "broomall-pa",
    city: "Broomall",
    lede:
      "Local IT support, cybersecurity and practical AI automation for Broomall businesses — from the trades offices off Abbott Drive to the professional suites on Sproul Road. We are based here, and we come to you.",
    nearby: ["Newtown Square", "Havertown", "Springfield", "Media"],
    paragraphs: [
      "Broomall runs on owner-operated businesses: HVAC, plumbing and electrical contractors in the business parks off Abbott Drive, Parkway Drive and Sussex Boulevard; auto shops along West Chester Pike; and dental, accounting, legal and insurance offices around Sproul Road and Lawrence Road. Most have the same two problems. The phone rings while everyone is on a job, and nobody is really in charge of the technology. Supreme IT Experts fixes both: managed IT and security so systems stay up and safe, and AI automation so calls, follow-ups and paperwork stop falling through the cracks.",
      "In September 2026 we reviewed the public email-security records of 136 local business domains around Broomall. About nine in ten had no enforced protection against someone sending email that pretends to be them — the way most fake-invoice scams begin, and usually a same-day fix. If you would like to know where your business stands, the 30-minute IT + AI Checkup is free, onsite, and you keep the one-page report either way.",
    ],
    microTrust:
      "Based in Broomall • Onsite across Marple Township and Delaware County • One accountable team for IT, security and AI.",
    notes: {
      managedSub: "For contractors, shops and offices across Marple Township.",
    },
    extraFaqs: [
      {
        q: "Do you work with contractors and trades businesses?",
        a: "Yes, they are a big part of who we help. For trades the first win is usually the phones: missed-call text-back and after-hours answering so a missed call is not a lost job, then estimate follow-up and review requests.",
      },
    ],
  }),

  make({
    slug: "newtown-square-pa",
    city: "Newtown Square",
    lede:
      "Managed IT, cybersecurity and practical AI automation for Newtown Square offices, practices and contractors along West Chester Pike and around Ellis Preserve.",
    nearby: ["Broomall", "Media", "Havertown", "Wayne"],
    paragraphs: [
      "Newtown Square has a mix you do not see everywhere: professional and medical offices, financial and accounting firms, med spas, and well-established roofing, remodeling and home-services companies up and down West Chester Pike. What they share is a small team doing a lot, with technology that grew piece by piece. We bring order to it — one accountable local team for helpdesk, security and the Microsoft 365 or Google Workspace setup your staff live in every day.",
      "Then we put AI to work where it pays back fastest: answering and texting back the calls you miss, following up every estimate and inquiry, asking every customer for a review, and cutting the retyping between your systems. It starts with a free 30-minute IT + AI Checkup at your office and a one-page report within 48 hours.",
    ],
    microTrust:
      "Minutes away in Broomall • Onsite across Newtown Township • Fixed prices and plain-English reports.",
    notes: {},
    extraFaqs: [
      {
        q: "Can you help a professional office roll out Copilot or Gemini safely?",
        a: "Yes. We clean up file permissions first so the AI cannot surface what people should not see, write a one-page usage policy, build prompts around your real tasks and train the team hands-on.",
      },
    ],
  }),

  make({
    slug: "havertown-pa",
    city: "Havertown",
    lede:
      "IT support, cybersecurity and AI automation for Havertown contractors, practices and family businesses — local, in person, and accountable.",
    nearby: ["Broomall", "Drexel Hill", "Ardmore", "Springfield"],
    paragraphs: [
      "Havertown is full of family-run businesses with loyal customers and busy phones: plumbers, electricians and heating companies, law and accounting offices along Eagle Road and Darby Road, and shops along West Chester Pike. Growth usually means the owner becomes the IT department at ten o'clock at night. We take that off your plate with managed IT and security at a predictable monthly fee — monitoring, patching, tested backups, and a helpdesk that answers.",
      "For busy service businesses the fastest return is usually the phone. In a 2025 CallRail survey of 1,000 US consumers, 78% said they had abandoned a business after an unanswered call and 82% said they would call a competitor instead. We set up missed-call text-back and after-hours AI answering on your own number, always identified as an assistant, with emergencies passed straight to a person. Start with a free 30-minute IT + AI Checkup.",
    ],
    microTrust:
      "Ten minutes away in Broomall • Onsite across Haverford Township • No long contracts.",
    notes: {},
    extraFaqs: [
      {
        q: "We use Jobber or Housecall Pro. Do we need new software?",
        a: "Usually not. We start with what you already pay for. Many field-service tools now include AI features that are switched off or set up badly. We configure, connect and monitor them, and only add something new when there is a clear reason.",
      },
    ],
  }),

  make({
    slug: "springfield-pa",
    city: "Springfield",
    lede:
      "Managed IT, cybersecurity and AI automation for Springfield (Delaware County) retailers, auto businesses and professional offices along Baltimore Pike and Sproul Road.",
    nearby: ["Broomall", "Media", "Havertown", "Drexel Hill"],
    paragraphs: [
      "Springfield's Baltimore Pike corridor is one of the busiest commercial strips in Delaware County: auto sales and service, retail, medical and dental practices, and the professional offices that support them. These businesses depend on point-of-sale systems, shared PCs, Wi-Fi that reaches the service bays, and email that customers trust. We keep all of it stable and secure with managed IT built for small teams, and we make sure your backups can actually be restored.",
      "We also help Springfield businesses use AI where it is safe and useful: service reminders and estimate follow-ups, review requests sent to every customer the compliant way, after-hours call answering, and a clear AI policy for staff. Auto dealers and any business arranging financing also have written security requirements under the FTC Safeguards Rule; we help with the practical controls and the paperwork. It starts with a free 30-minute IT + AI Checkup.",
    ],
    microTrust:
      "Local team based in Broomall • Onsite across Springfield Township • One number to call for IT, security and AI.",
    notes: {},
    extraFaqs: [
      {
        q: "Do you support auto repair shops and dealerships?",
        a: "Yes. Typical first steps are reliable service-bay Wi-Fi and shared-PC baselines, then missed-call text-back, service reminders and review requests. Dealers that arrange financing also need FTC Safeguards Rule controls, which we help put in place.",
      },
    ],
  }),

  make({
    slug: "media-pa",
    city: "Media",
    lede:
      "IT support, cybersecurity and AI automation for Media's law firms, accounting and title offices, practices and State Street businesses.",
    nearby: ["Springfield", "Newtown Square", "Broomall", "Swarthmore"],
    paragraphs: [
      "As the Delaware County seat, Media has an unusually high share of document-heavy offices: law firms near the courthouse, accounting and tax practices, title and insurance agencies, alongside the restaurants and shops on State Street. For these teams the risk is in the inbox and the file share. We lock down email against impersonation, enforce multi-factor login, make sure sensitive files are only visible to the right people, and provide a helpdesk that answers — all at a predictable monthly fee.",
      "AI is most useful here on intake and paperwork: capturing new-client inquiries after hours, chasing missing documents politely and automatically, summarizing and filing routine correspondence, and giving staff a safe, approved way to use tools like Copilot or ChatGPT. Tax and accounting firms also need a Written Information Security Plan; we help you put one in place before tax season. Start with a free 30-minute IT + AI Checkup.",
    ],
    microTrust:
      "Local team based in Broomall • Onsite across Media and central Delaware County • Confidentiality taken seriously.",
    notes: {},
    extraFaqs: [
      {
        q: "Can law and accounting firms use AI without risking client confidentiality?",
        a: "Yes, with the right setup: business-grade tools that do not train on your data, tight file permissions, a written usage policy, and human review of anything that goes to a client. We set that up and train your team.",
      },
    ],
  }),
];
