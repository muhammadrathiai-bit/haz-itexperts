// lib/services.js
// ✅ Single source of truth for service internal linking (US + UK)

const SERVICE_PREFIX_US = "/services";
const SERVICE_PREFIX_UK = "/uk/services";

// ✅ Convert US service href -> UK service href
export function toUkServiceHref(href) {
  if (!href) return SERVICE_PREFIX_UK;
  if (href.startsWith(SERVICE_PREFIX_UK)) return href;
  if (href.startsWith(`${SERVICE_PREFIX_US}/`)) {
    return href.replace(`${SERVICE_PREFIX_US}/`, `${SERVICE_PREFIX_UK}/`);
  }
  if (href === SERVICE_PREFIX_US) return SERVICE_PREFIX_UK;
  return `/uk${href.startsWith("/") ? href : `/${href}`}`;
}

// ✅ Convert UK service href -> US service href (optional helper)
export function toUsServiceHref(href) {
  if (!href) return SERVICE_PREFIX_US;
  if (href.startsWith(SERVICE_PREFIX_US)) return href;
  if (href.startsWith(`${SERVICE_PREFIX_UK}/`)) {
    return href.replace(`${SERVICE_PREFIX_UK}/`, `${SERVICE_PREFIX_US}/`);
  }
  if (href === SERVICE_PREFIX_UK) return SERVICE_PREFIX_US;
  return href.replace(/^\/uk/, "");
}

// ✅ Services (US is canonical source)
export const SERVICES = [
  {
    key: "managed",
    slug: "managed-it",
    title: "Managed IT Services",
    href: "/services/managed-it",
    icon: "Shield",
    blurb: "Helpdesk, monitoring, patching, and reporting with clear SLAs.",
    tags: ["Helpdesk", "Patching", "Monitoring"],
  },
  {
    key: "security",
    slug: "cybersecurity",
    title: "Cybersecurity",
    href: "/services/cybersecurity",
    icon: "Lock",
    blurb: "EDR/XDR, identity hardening, email security, and backup/DR.",
    tags: ["EDR/XDR", "MFA", "Backup/DR"],
  },
  {
    key: "cloud",
    slug: "cloud-workspace",
    title: "Cloud & Microsoft 365",
    href: "/services/cloud-workspace",
    icon: "Cloud",
    blurb: "Migrations, tenant security baselines, and cost optimization.",
    tags: ["M365", "Migrations", "Governance"],
  },
  {
    key: "projects",
    slug: "projects-consulting",
    title: "IT Projects & Consulting",
    href: "/services/projects-consulting",
    icon: "Wrench",
    blurb: "Audits, network refresh, office moves, and modernization projects.",
    tags: ["Audits", "Migrations", "Network"],
  },
  {
    key: "mdm",
    slug: "device-management",
    title: "Device Management (MDM)",
    href: "/services/device-management",
    icon: "Laptop",
    blurb: "Zero-touch enrollment, hardening, patch & app management.",
    tags: ["Autopilot", "Jamf", "Compliance"],
  },
  {
    key: "ai",
    slug: "ai-workflows",
    title: "AI Workflows & Automation",
    href: "/services/ai-workflows",
    icon: "Sparkles",
    blurb: "Missed-call text-back, AI front desk, follow-ups, and paperwork automation — set up safely.",
    tags: ["AI Front Desk", "Automation", "Secure AI"],
    usOnly: true, // no /uk page yet
  },
  {
    key: "vcio",
    slug: "vcio-strategy",
    title: "vCIO / IT Strategy",
    href: "/services/vcio-strategy",
    icon: "LineChart",
    blurb: "Roadmaps, budgets, vendor consolidation, and KPI reporting.",
    tags: ["Roadmaps", "Budgets", "KPIs"],
  },
].map((s) => ({
  ...s,
  // ✅ computed convenience links
  ukHref: toUkServiceHref(s.href),
}));

// ✅ SEO-friendly internal linking suggestions (by key)
export const RELATED = {
  managed: ["security", "cloud", "mdm", "vcio"],
  security: ["managed", "cloud", "projects", "mdm"],
  cloud: ["managed", "security", "mdm", "projects"],
  projects: ["managed", "cloud", "security", "vcio"],
  mdm: ["managed", "security", "cloud", "vcio"],
  vcio: ["managed", "security", "cloud", "projects"],
  ai: ["managed", "security", "cloud", "vcio"],
};

// ✅ Helpers
// ✅ UK pages only list services that have a /uk page
export const UK_SERVICES = SERVICES.filter((s) => !s.usOnly);

export function getServiceByKey(key) {
  return SERVICES.find((s) => s.key === key) || null;
}

export function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug) || null;
}

export function getRelatedServices(key) {
  const rel = RELATED[key] || [];
  return rel.map((k) => getServiceByKey(k)).filter(Boolean);
}
