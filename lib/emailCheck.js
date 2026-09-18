// lib/emailCheck.js
// Reads PUBLIC DNS records only (MX, SPF, DMARC) and grades how easy a domain is to impersonate.
import { Resolver } from "node:dns/promises";

const DOMAIN_RE = /^(?=.{4,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/;

const PROVIDERS = [
  [/google\.com$|googlemail\.com$/, "Google Workspace"],
  [/outlook\.com$|protection\.outlook\.com$|office365\.us$/, "Microsoft 365"],
  [/secureserver\.net$/, "GoDaddy email"],
  [/privateemail\.com$/, "Namecheap Private Email"],
  [/zoho\.(com|eu)$/, "Zoho Mail"],
  [/pphosted\.com$|ppe-hosted\.com$/, "Proofpoint"],
  [/mimecast\.com$/, "Mimecast"],
  [/barracudanetworks\.com$/, "Barracuda"],
  [/ionos\.com$|kundenserver\.de$|perfora\.net$/, "IONOS"],
  [/emailsrvr\.com$/, "Rackspace Email"],
  [/icloud\.com$/, "iCloud Mail"],
  [/yahoodns\.net$/, "Yahoo / AT&T mail"],
  [/titan\.email$/, "Titan Mail"],
  [/websitewelcome\.com$|hostgator\.com$|bluehost\.com$/, "Web-host email"],
];

// Accepts "acme.com", "https://www.acme.com/contact" or "owner@acme.com"
export function normalizeDomain(input = "") {
  let d = String(input).trim().toLowerCase().slice(0, 300);
  if (d.includes("@")) d = d.split("@").pop();
  d = d.replace(/^[a-z][a-z0-9+.-]*:\/\//, "").split(/[/?#:\s]/)[0];
  d = d.replace(/^www\./, "").replace(/\.$/, "");
  return DOMAIN_RE.test(d) ? d : "";
}

function makeResolver() {
  const r = new Resolver({ timeout: 3500, tries: 2 });
  r.setServers(["1.1.1.1", "8.8.8.8"]);
  return r;
}

const NOT_FOUND = new Set(["ENOTFOUND", "ENODATA", "NXDOMAIN", "ENOENT"]);

// -> { records: string[] } when the lookup worked, { error: true } when DNS itself failed
async function txt(resolver, name) {
  try {
    const rows = await resolver.resolveTxt(name);
    return { records: rows.map((chunks) => chunks.join("")) };
  } catch (e) {
    if (NOT_FOUND.has(e?.code)) return { records: [] };
    return { records: [], error: true };
  }
}

async function mx(resolver, name) {
  try {
    const rows = await resolver.resolveMx(name);
    // a single "." exchange is a "null MX": the domain says it accepts no mail
    return { hosts: rows.filter((r) => r.exchange && r.exchange !== ".").sort((a, b) => a.priority - b.priority) };
  } catch (e) {
    if (NOT_FOUND.has(e?.code)) return { hosts: [] };
    return { hosts: [], error: true };
  }
}

function tags(record) {
  const out = {};
  record
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((pair) => {
      const i = pair.indexOf("=");
      if (i > 0) out[pair.slice(0, i).trim().toLowerCase()] = pair.slice(i + 1).trim();
    });
  return out;
}

function readSpf(records) {
  const found = records.filter((r) => /^v=spf1(\s|$)/i.test(r.trim()));
  if (!found.length) return { status: "missing", record: "" };
  if (found.length > 1) return { status: "multiple", record: found[0], count: found.length };

  const record = found[0].trim();
  const all = record.match(/(^|\s)([+\-~?]?)all(\s|$)/i);
  const hasRedirect = /(^|\s)redirect=/i.test(record);
  const q = all ? all[2] || "+" : "";
  const status = q === "-" ? "strict" : q === "~" ? "soft" : q === "?" ? "neutral" : q === "+" ? "open" : hasRedirect ? "redirect" : "no_all";
  return { status, record };
}

function readDmarc(records) {
  const found = records.filter((r) => /^v=dmarc1(\s*;|$)/i.test(r.trim()));
  if (!found.length) return { status: records.length ? "invalid" : "missing", record: records[0] || "" };
  if (found.length > 1) return { status: "multiple", record: found[0], count: found.length };

  const record = found[0].trim();
  const t = tags(record);
  const policy = (t.p || "").toLowerCase();
  if (!["none", "quarantine", "reject"].includes(policy)) return { status: "invalid", record };

  const pct = t.pct !== undefined && /^\d{1,3}$/.test(t.pct) ? Math.min(100, Number(t.pct)) : 100;
  return { status: policy, record, policy, pct, reports: Boolean(t.rua) };
}

export async function checkDomain(domain) {
  const resolver = makeResolver();
  const labels = domain.split(".");
  // naive organisational domain (last two labels); good enough for .com/.net/.org style names
  const parent = labels.length > 2 ? labels.slice(-2).join(".") : "";

  const [mxRes, spfRes, dmarcRes] = await Promise.all([mx(resolver, domain), txt(resolver, domain), txt(resolver, `_dmarc.${domain}`)]);

  let dmarc = readDmarc(dmarcRes.records);
  let inheritedFrom = "";
  if (dmarc.status === "missing" && parent) {
    const up = await txt(resolver, `_dmarc.${parent}`);
    const upRead = readDmarc(up.records);
    if (["none", "quarantine", "reject"].includes(upRead.status)) {
      // subdomains follow sp= when present, otherwise p=
      const sp = (tags(upRead.record).sp || "").toLowerCase();
      const policy = ["none", "quarantine", "reject"].includes(sp) ? sp : upRead.policy;
      dmarc = { ...upRead, status: policy, policy };
      inheritedFrom = parent;
    }
  }

  const dnsTrouble = Boolean(mxRes.error || spfRes.error || dmarcRes.error);
  const spf = readSpf(spfRes.records);
  const topHost = mxRes.hosts[0]?.exchange?.toLowerCase().replace(/\.$/, "") || "";
  const provider = topHost ? (PROVIDERS.find(([re]) => re.test(topHost)) || [])[1] || "" : "";

  const enforced = dmarc.status === "reject" || (dmarc.status === "quarantine" && dmarc.pct === 100);
  const partial = dmarc.status === "quarantine" && dmarc.pct < 100;
  const spfOk = ["strict", "soft", "redirect"].includes(spf.status);

  let level;
  if (dnsTrouble && !enforced) level = "unknown";
  else if (enforced && dmarc.status === "reject" && spfOk) level = "protected";
  else if (enforced) level = "mostly";
  else if (partial) level = "partial";
  else if (dmarc.status === "none") level = "monitoring";
  else level = "exposed";

  return {
    domain,
    level,
    receivesMail: mxRes.hosts.length > 0,
    provider,
    mailHost: topHost,
    spf,
    dmarc: { ...dmarc, inheritedFrom },
    checkedAt: new Date().toISOString(),
  };
}
