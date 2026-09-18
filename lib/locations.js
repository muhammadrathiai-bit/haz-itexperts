// lib/locations.js
import { DELCO_LOCATIONS } from "./locationsDelco";

export const LOCATIONS = [
  {
    slug: "allentown-pa",
    city: "Allentown",
    state: "PA",
    title: "Managed IT Services in Allentown, PA",
    lede:
      "Fast, friendly managed IT and cybersecurity for small and mid-sized businesses in Allentown. Helpdesk, monitoring, patching, identity security, and backup/DR — with clear SLAs.",

    nearby: ["Macungie", "Emmaus"],

    copy: {
      paragraphs: [
        "Many businesses in Allentown and the Lehigh Valley experience the same pattern: everything works—until downtime, slow systems, Wi-Fi drops, or email access issues begin affecting the team. Supreme IT Experts provides remote-first managed IT support built for fast helpdesk response, proactive monitoring, consistent patching, and day-to-day Microsoft 365 assistance. The goal is simple: fewer disruptions, stable systems, and more productive workdays.",
        "Modern IT support isn’t only about fixing problems—it must include security. That’s why we use a cybersecurity-first approach: MFA and identity hardening, endpoint protection, backup + tested restores, and practical security baselines that reduce ransomware and data-loss risk. If you’re in Allentown and want predictable, secure IT support, book a free 20-minute IT assessment and we’ll share clear next steps and priority fixes.",
      ],
      primaryCtaText: "Free 20-min IT assessment",
      secondaryCtaText: "Contact us",
      microTrust:
        "Remote-first support for Allentown & Lehigh Valley businesses • Cybersecurity-first, practical fixes, predictable support.",
    },

    // ✅ Automotive / Dealership add-on (new)
    automotive: {
      title: "Automotive & dealership IT support in Allentown",
      text:
        "Dealerships and auto repair teams depend on stable networks, predictable devices, and secure access. If service-bay Wi-Fi drops, printers fail, or shared PCs keep acting up, operations slow down quickly. We help stabilize the foundation so your team can keep moving.",
      bullets: [
        "Service-bay Wi-Fi coverage + reliability improvements",
        "Network segmentation (staff vs guest vs cameras/IoT/printers)",
        "Shared PC baseline + safer sign-in practices (MFA guidance)",
        "Printer/scanner stability for paperwork-heavy workflows",
        "Backup + restore testing so recovery isn’t guesswork",
        "Security fundamentals that reduce phishing and account takeovers",
      ],
      ctaText: "Talk to us about dealership support",
      ctaHref: "/contact?type=assessment&source=location-automotive-allentown",
    },

    // ✅ ServiceSections (SEO headings)
    serviceSections: [
      {
        id: "managed-it-services-allentown",
        title: "Managed IT Services in Allentown, PA",
        sub: "For teams searching “managed IT services Allentown” or “IT management solutions”.",
        href: "/services/managed-it",
        text:
          "Our managed IT services in Allentown are built for predictable support: proactive monitoring, consistent patching, and a helpdesk process that reduces downtime. Instead of waiting for problems to spread, we stabilize systems and keep work moving.",
        bullets: [
          "Proactive monitoring + alerting",
          "Patch management + maintenance windows",
          "User support for day-to-day issues",
          "Clear ownership and ongoing improvements",
        ],
      },
      {
        id: "it-support-allentown",
        title: "IT Support in Allentown, PA",
        sub: "Matches intent like “IT support Allentown” and “IT services in Allentown PA”.",
        href: "/services/managed-it",
        text:
          "When something breaks—slow PCs, access issues, printer problems, or network trouble—fast support matters. We provide remote-first IT support for Allentown businesses, focusing on quick resolution and fewer repeat incidents.",
        bullets: [
          "Remote troubleshooting for PCs, access and apps",
          "Priority handling for urgent outages",
          "Root-cause fixes (not temporary patches)",
          "Reduced repeat tickets through standardization",
        ],
      },
      {
        id: "help-desk-solutions-allentown",
        title: "Help Desk Solutions in Allentown",
        sub: "Direct match for “help desk solutions in Allentown”.",
        href: "/services/managed-it",
        text:
          "A good help desk is a process, not a phone number. We keep response predictable, track issues, and ensure problems are resolved cleanly—so your team is not stuck waiting or re-reporting the same issue.",
        bullets: [
          "Ticketing + documented resolution steps",
          "User onboarding/offboarding assistance",
          "Access issues, email problems, app troubleshooting",
          "Clear escalation for complex problems",
        ],
      },
      {
        id: "cybersecurity-near-allentown",
        title: "Cybersecurity near Allentown, PA",
        sub: "Targets “cybersecurity near Allentown” + “cybersecurity testing in Allentown PA”.",
        href: "/services/cybersecurity",
        text:
          "We strengthen identity security, keep devices protected, and reduce common attack paths. For Allentown teams, we focus on practical security baselines that lower ransomware and account takeover risk—without making workflows painful.",
        bullets: [
          "MFA + identity hardening",
          "Endpoint protection + patching baselines",
          "Security reviews and priority gap fixes",
          "Monitoring to reduce risk and downtime",
        ],
      },
      {
        id: "microsoft-365-allentown",
        title: "Cloud & Microsoft 365 Support in Allentown",
        sub: "For searches like “Microsoft 365 support Allentown” and email issues.",
        href: "/services/cloud-workspace",
        text:
          "Email, Microsoft 365 access, security settings and tenant hygiene can become a constant distraction. We help Allentown businesses keep Microsoft 365 stable, secure, and easy to manage.",
        bullets: [
          "Microsoft 365 setup and troubleshooting",
          "Tenant security baselines and cleanup",
          "User access and mailbox issues",
          "Practical improvements without overcomplicating",
        ],
      },
      {
        id: "backup-planning-allentown",
        title: "Backup Planning & Disaster Recovery in Allentown",
        sub: "Matches “backup planning services Allentown”.",
        href: "/services/projects-consulting",
        text:
          "Backups are only useful if you can restore fast. We implement backup planning and recovery steps for Allentown businesses, including test restores so you know recovery works before it’s urgent.",
        bullets: [
          "Backup planning + retention strategy",
          "Disaster recovery priorities and steps",
          "Test restores to validate recovery",
          "Ransomware-ready baseline practices",
        ],
      },
    ],

    faqs: [
      {
        q: "Do you offer managed IT services in Allentown, PA?",
        a: "Yes. We provide remote-first managed IT support for Allentown and nearby Lehigh Valley areas, including helpdesk, monitoring, patching, Microsoft 365 support, and cybersecurity essentials.",
      },
      {
        q: "What types of businesses do you support in Allentown?",
        a: "We typically support small-to-mid sized businesses that need reliable IT, fast response, and predictable monthly coverage — from office teams to multi-device environments.",
      },
      {
        q: "How fast can you respond to IT issues?",
        a: "For most remote issues (email, PC performance, access, Microsoft 365, network troubleshooting), response is fast and urgent issues get priority handling.",
      },
      {
        q: "Do you provide cybersecurity along with IT support?",
        a: "Yes. Our approach is cybersecurity-first — we focus on MFA, endpoint protection, patching, monitoring, and practical security baselines that reduce risk and prevent avoidable incidents.",
      },
      {
        q: "Can you help with Microsoft 365 and email problems?",
        a: "Absolutely. We help with Microsoft 365 setup, user access, mail flow issues, security settings, and ongoing support.",
      },
      {
        q: "Do you offer backups and disaster recovery for Allentown businesses?",
        a: "Yes. We implement backup + recovery plans and encourage test restores so you actually know you can recover when it matters.",
      },
      {
        q: "What happens in the free 20-minute IT assessment?",
        a: "We ask a few quick questions, review your current setup/pain points, and share a short action plan: priority fixes, security gaps, and what a managed setup could look like.",
      },
    ],
  },

  {
    slug: "macungie-pa",
    city: "Macungie",
    state: "PA",
    title: "Managed IT Services in Macungie, PA",
    lede:
      "Reliable managed IT and security for growing teams in Macungie. Proactive support, hardened baselines, and predictable onboarding — without the chaos.",

    nearby: ["Allentown", "Emmaus"],

    copy: {
      paragraphs: [
        "Macungie teams usually want one thing most: predictable IT. When support is purely reactive, small issues turn into recurring interruptions—slow devices, access problems, Wi-Fi instability, and Microsoft 365 headaches. Our managed IT services for Macungie are designed around fast helpdesk support plus proactive monitoring and patching that reduces downtime.",
        "We also build security into the baseline: MFA, endpoint protection, standard configurations, and backup practices that reduce the risk of major incidents. Book a free 20-minute IT assessment and we’ll outline quick wins and longer-term improvements based on your current setup.",
      ],
      primaryCtaText: "Free 20-min IT assessment",
      secondaryCtaText: "Contact us",
      microTrust:
        "Macungie SMB-friendly support • Proactive monitoring + patching • Security-first fundamentals included.",
    },

    automotive: {
      title: "Automotive & dealership IT support near Macungie",
      text:
        "If you run a dealership, service center, or repair operation near Macungie, IT issues show up as real operational delays—slow shared PCs, printer issues, unstable Wi-Fi, or access problems that block staff. We help build a stable baseline.",
      bullets: [
        "Reliable Wi-Fi coverage for service bays and front desk areas",
        "Device standardization + fewer repeat issues",
        "Secure sign-in practices (MFA guidance) for shared environments",
        "Printer/scanner stability and cleanup",
        "Backup planning + restore testing",
        "Security basics that reduce phishing and downtime",
      ],
      ctaText: "Get an assessment for your shop",
      ctaHref: "/contact?type=assessment&source=location-automotive-macungie",
    },

    serviceSections: [
      {
        id: "business-it-support-macungie",
        title: "Business IT Support near Macungie, PA",
        sub: "Matches “business IT support near Macungie PA”.",
        href: "/services/managed-it",
        text:
          "We provide fast remote-first support for Macungie businesses, focused on consistent fixes and less downtime. The goal is to keep daily operations smooth and prevent recurring disruptions.",
        bullets: [
          "Helpdesk response for daily IT issues",
          "Proactive monitoring and maintenance",
          "Reduced downtime through patching",
          "Clean ownership and ongoing improvements",
        ],
      },
      {
        id: "managed-it-services-macungie",
        title: "Managed IT Services in Macungie, PA",
        sub: "For teams searching “managed IT services Macungie”.",
        href: "/services/managed-it",
        text:
          "Managed IT in Macungie means stable systems, predictable support, and proactive improvements. We standardize, patch consistently, and help your team avoid IT fire-fighting.",
        bullets: [
          "Monitoring + proactive maintenance",
          "Patching and device standardization",
          "User access and Microsoft 365 support",
          "Predictable service and support flow",
        ],
      },
      {
        id: "cybersecurity-macungie",
        title: "Cybersecurity Services in Macungie",
        sub: "Security baselines to reduce ransomware and account takeover risk.",
        href: "/services/cybersecurity",
        text:
          "We help Macungie businesses reduce security risk with MFA, endpoint protection, patching discipline, and practical baselines that match real-world SMB needs.",
        bullets: [
          "Identity hardening (MFA) + access control",
          "Endpoint protection and security baselines",
          "Patching and monitoring fundamentals",
          "Actionable improvements, not fluff",
        ],
      },
      {
        id: "microsoft-365-macungie",
        title: "Microsoft 365 Support in Macungie",
        sub: "Email, access, tenant security and troubleshooting.",
        href: "/services/cloud-workspace",
        text:
          "Microsoft 365 issues can slow the whole team. We help with setup, troubleshooting, security settings, and ongoing support so email and productivity stay stable.",
        bullets: [
          "Setup + troubleshooting and access fixes",
          "Tenant security baseline improvements",
          "Mail flow issues and user support",
          "Ongoing support and cleanup",
        ],
      },
      {
        id: "backup-dr-macungie",
        title: "Backup Planning & Disaster Recovery",
        sub: "Backups with tested restores and practical recovery steps.",
        href: "/services/projects-consulting",
        text:
          "We implement backup practices and recovery planning designed for real incidents. The focus is on knowing your restore works and minimizing recovery time.",
        bullets: [
          "Backup plan + retention strategy",
          "Test restores to validate recovery",
          "Disaster recovery priorities and steps",
          "Ransomware-ready fundamentals",
        ],
      },
      {
        id: "mdm-vcio-macungie",
        title: "Device Management (MDM) & vCIO / IT Strategy",
        sub: "MDM control + vCIO planning for growing teams.",
        href: "/services/vcio-strategy", // ✅ FIXED (was /services/vcio-it-strategy)
        text:
          "For Macungie teams that need structure: device management helps standardize policies, while vCIO strategy creates a roadmap and budget plan for IT maturity.",
        bullets: [
          "Device enrollment and compliance basics",
          "Standard configurations and policies",
          "Roadmap planning and priorities",
          "Budget and vendor alignment guidance",
        ],
      },
    ],

    faqs: [
      {
        q: "Do you support businesses in Macungie remotely?",
        a: "Yes — we deliver fast remote support for Macungie businesses, with proactive monitoring and clear ownership.",
      },
      {
        q: "Can you help reduce downtime and slow PCs?",
        a: "Yes — we improve performance by standardizing devices, patching consistently, and fixing root causes (not just quick patches).",
      },
      {
        q: "Do you offer Microsoft 365 support for Macungie teams?",
        a: "Yes — Microsoft 365 setup, troubleshooting, access fixes, and security baselines are part of our support options.",
      },
      {
        q: "Do you include cybersecurity with IT support?",
        a: "Yes — we focus on MFA guidance, endpoint protection, patching discipline, and practical security fundamentals.",
      },
      {
        q: "Do you offer backups and ransomware-ready recovery?",
        a: "Yes — we set up secure backups plus recovery steps, including test restores so you know recovery works.",
      },
      {
        q: "What happens in the free 20-minute assessment?",
        a: "We review your current pain points and share a short, practical plan: quick wins, priority fixes, and what a managed setup could look like.",
      },
    ],
  },

  {
    slug: "emmaus-pa",
    city: "Emmaus",
    state: "PA",
    title: "Managed IT Services in Emmaus, PA",
    lede:
      "Security-first managed IT and support for businesses in Emmaus. Helpdesk + patching + monitoring, plus strong identity and ransomware-ready backup practices.",

    nearby: ["Allentown", "Macungie"],

    copy: {
      paragraphs: [
        "Emmaus businesses rely on stable systems and quick support when something breaks—whether it’s email access, slow PCs, Wi-Fi drops, or login issues. Our managed IT services for Emmaus are built around fast helpdesk response and proactive maintenance that prevents recurring problems.",
        "Security is part of the service, not an add-on. We help strengthen identity with MFA, protect devices, keep systems patched, and improve backup readiness so teams are less exposed to ransomware and data loss. Start with a free 20-minute IT assessment to get a clear, practical improvement plan.",
      ],
      primaryCtaText: "Free 20-min IT assessment",
      secondaryCtaText: "Contact us",
      microTrust:
        "Emmaus support with security-first fundamentals • Fast response + proactive maintenance • Practical, SMB-friendly approach.",
    },

    automotive: {
      title: "Automotive & dealership IT support near Emmaus",
      text:
        "Automotive and dealership operations need reliable access, stable Wi-Fi, and predictable devices. We help Emmaus-area teams reduce repeat issues and tighten security without disrupting daily workflows.",
      bullets: [
        "Wi-Fi reliability improvements across the workspace",
        "Device standardization for fewer repeat tickets",
        "Shared PC + access hygiene (MFA guidance)",
        "Printer/scanner stability and setup cleanup",
        "Backups + restore testing for confidence",
        "Security fundamentals to reduce ransomware risk",
      ],
      ctaText: "Book an automotive IT assessment",
      ctaHref: "/contact?type=assessment&source=location-automotive-emmaus",
    },

    serviceSections: [
      {
        id: "tech-support-emmaus",
        title: "Tech Support in Emmaus, PA",
        sub: "Matches “tech support in Emmaus PA”.",
        href: "/services/managed-it",
        text:
          "We provide remote-first tech support for Emmaus businesses, with fast troubleshooting and fewer repeated problems. If your team struggles with recurring issues, we focus on stability and prevention.",
        bullets: [
          "Remote troubleshooting for daily issues",
          "Fast handling for access and email problems",
          "Proactive maintenance to reduce repeat incidents",
          "Clear support ownership and improvements",
        ],
      },
      {
        id: "managed-it-emmaus",
        title: "Managed IT Services in Emmaus, PA",
        sub: "Monitoring + patching + helpdesk for predictable operations.",
        href: "/services/managed-it",
        text:
          "Managed IT in Emmaus means consistent patching, proactive monitoring, and an organized helpdesk process. We reduce downtime and keep systems reliable for day-to-day work.",
        bullets: [
          "Monitoring + proactive maintenance",
          "Patch management and cleanup",
          "Helpdesk processes that scale",
          "Less downtime and smoother workdays",
        ],
      },
      {
        id: "cybersecurity-emmaus",
        title: "Cybersecurity near Emmaus",
        sub: "Identity + endpoint + patching baselines to reduce risk.",
        href: "/services/cybersecurity",
        text:
          "We strengthen identity security, protect devices, and reduce common gaps that lead to ransomware. The focus is practical: what actually lowers risk for SMB teams.",
        bullets: [
          "MFA and identity hardening",
          "Endpoint protection fundamentals",
          "Patching discipline and monitoring",
          "Prioritized fixes, not generic advice",
        ],
      },
      {
        id: "microsoft-365-emmaus",
        title: "Microsoft 365 Support in Emmaus",
        sub: "Setup, troubleshooting and tenant security baselines.",
        href: "/services/cloud-workspace",
        text:
          "Email and Microsoft 365 issues slow teams down. We help keep your tenant stable and secure so users can work without constant interruptions.",
        bullets: [
          "Email access and troubleshooting",
          "Tenant security baseline improvements",
          "User support and account changes",
          "Ongoing stability and clean configuration",
        ],
      },
      {
        id: "backup-dr-emmaus",
        title: "Backup & Disaster Recovery Planning",
        sub: "Backups that can restore fast when it matters.",
        href: "/services/projects-consulting",
        text:
          "We implement backup planning with test restores and recovery steps that are realistic. The goal is knowing you can recover, not just hoping backups exist.",
        bullets: [
          "Backup planning + retention strategy",
          "Test restores to validate recovery",
          "Recovery priorities and practical steps",
          "Ransomware-ready baseline practices",
        ],
      },
      {
        id: "mdm-vcio-emmaus",
        title: "MDM & vCIO / IT Strategy",
        sub: "Device policies + planning for predictable growth.",
        href: "/services/vcio-strategy", // ✅ FIXED (was /services/vcio-it-strategy)
        text:
          "MDM helps enforce consistent device policies, while vCIO planning gives teams a roadmap for improving IT over time. Great for Emmaus businesses that want structure and predictable progress.",
        bullets: [
          "Device enrollment and baseline policies",
          "Compliance checks and standard configurations",
          "Roadmap planning and priorities",
          "Budget/vendor alignment guidance",
        ],
      },
    ],

    faqs: [
      {
        q: "Do you provide IT support for Emmaus businesses?",
        a: "Yes — we provide managed IT support, monitoring, patching, and security-first guidance for teams in Emmaus.",
      },
      {
        q: "Do you help with Microsoft 365 and email security?",
        a: "Yes — Microsoft 365 setup, troubleshooting, access fixes, and tenant security baselines are included in our support options.",
      },
      {
        q: "What kind of cybersecurity services do you include?",
        a: "Identity hardening (MFA guidance), endpoint protection, patching discipline, monitoring, and practical security baselines to reduce risk.",
      },
      {
        q: "Can you help reduce recurring Wi-Fi and network issues?",
        a: "Yes — we troubleshoot root causes and improve reliability with better configs, coverage planning, and stability fixes.",
      },
      {
        q: "Do you offer backups and disaster recovery planning?",
        a: "Yes — we implement backups plus recovery steps and encourage test restores so recovery isn’t guesswork.",
      },
      {
        q: "What happens in the free 20-minute IT assessment?",
        a: "We review your pain points and share a short action plan: quick wins, priority fixes, and what a managed setup could look like.",
      },
    ],
  },

  // ✅ Delaware County / Main Line (see lib/locationsDelco.js)
  ...DELCO_LOCATIONS,
];

export function getLocationBySlug(slug) {
  return LOCATIONS.find((l) => l.slug === slug);
}
