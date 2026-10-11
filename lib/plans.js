// lib/plans.js
// ✅ Single source of truth for the monthly plans shown at /plans, /plans/soho and /plans/personal.
// Prices are in USD and exclude any sales tax that applies. Change a number here and every page follows.

export const PLAN_ROUTES = {
  hub: "/plans",
  soho: "/plans/soho",
  personal: "/plans/personal",
};

// What every Basic plan does on each computer (same list for SOHO and Personal unless noted).
const BASIC_CORE = [
  "Round-the-clock monitoring through a small agent on each computer, with alerts that come to us",
  "Managed antivirus, with updates and scans watched for you",
  "Managed detection and response (EDR) for threats that get past antivirus",
  "Web filtering that blocks harmful sites",
  "Windows, macOS and common app updates installed for you",
  "Disk space, drive health and memory watched, so a failing drive is caught early",
  "A weekly automatic tune-up that clears temporary files",
  "Secure remote access, so help can start right away or at a time you choose",
];

export const SOHO = {
  name: "SupremeCare SOHO",
  audience: "Small offices and home-based businesses with up to 9 people",
  biggerNote: "Ten or more people? That is our SupremeCare plan, quoted after a free IT + AI Checkup.",
  tiers: [
    {
      key: "basic",
      name: "Basic",
      price: 50,
      unit: "per business computer, per month",
      setup: "$45 one-time setup per computer",
      extraPrice: "A personal-use-only computer on the same account is $36 per month.",
      summary: "We keep every PC or Mac watched, patched and protected. Hands-on help is billed at your subscriber rate.",
      includes: [
        ...BASIC_CORE,
        "A list of your hardware and software, kept up to date",
        "A monthly activity and health report",
        "Remote labor for operating-system updates and security-software problems",
        "A password manager, free for the first 3 months (then $5 per user per month if you keep it)",
      ],
      perks: [
        "Priority over non-subscribers",
        "20% off labor for anything the plan does not cover",
        "Malware cleanup with the installed tools, labor included when it can be done remotely",
        "Written records of your setup, so nothing lives in one person's head",
        "Quick questions under 10 minutes are free",
      ],
      notIncluded: [
        "On-demand troubleshooting and projects",
        "On-site work",
        "Adding and removing users, and network administration",
        "Installing or upgrading apps, and operating-system upgrades",
        "Email problems and email moves",
        "Hardware parts and repair, and setting up new devices",
        "Internet service setup",
        "Software licences, and troubleshooting individual apps",
      ],
    },
    {
      key: "remote",
      name: "Basic + Remote Help",
      price: 125,
      unit: "per person or PC, per month",
      setup: "$45 one-time setup per person or PC",
      summary: "Everything in Basic, plus all labor for covered requests that we can handle remotely.",
      includes: [
        "Everything in Basic",
        "All labor for covered service requests handled remotely",
        "Work that cannot be done remotely is done on-site at 20% off",
      ],
      conditions: ["3-month minimum", "$150 minimum monthly bill"],
      extraDevices: [
        { name: "Second computer for the same person (for example a travel laptop)", price: "$35 setup, then $50 per month" },
        { name: "Small server or network storage (NAS)", price: "$35 setup, then $129 to $299 per month, by size and role" },
        { name: "Office firewall or router", price: "$39 per month (up to 3 people) or $69 per month (4 to 9 people)" },
      ],
      notIncluded: [
        "Dispatch fee for on-site visits: $65 in Zone 1, $95 in Zone 2",
        "On-site labor (your 20% discount applies)",
        "Parts and software licences",
        "Support for your industry software, unless it is added to the agreement",
      ],
    },
  ],
  fees: [
    { name: "New account setup and onboarding", price: "$250 one-time" },
    { name: "Removing an existing antivirus or anti-malware product", price: "$25 one-time per computer" },
  ],
  addOns: [
    { name: "Remote firewall management", price: "$49 per month (up to 3 people), from $69 per month (4 to 10 people)" },
    { name: "Email security bundle: spam, phishing, identity and account-takeover protection", price: "$10 setup, then $15 per mailbox per month" },
    { name: "Network and peripheral support: modems, switches, Wi-Fi, printers, storage", price: "$150 to $250 per month, quoted" },
    { name: "Industry (line-of-business) software support", price: "$50 per month with Remote Help; billed by time on Basic" },
    { name: "On-site coverage (Remote Help only): no dispatch fees", price: "$100 to $250 per month, quoted" },
    { name: "Extended-hours coverage", price: "Quoted" },
    { name: "Microsoft 365 licences", price: "At Microsoft's published prices" },
    { name: "Application allow-listing: only approved programs can run", price: "$50 setup, then $10 per computer per month" },
  ],
  backup: [
    { name: "Managed online backup for a computer: unlimited cloud and local backup, old versions kept for 1 year", price: "$50 setup, then $25 per computer per month" },
    { name: "Managed online backup for a server, with disaster-recovery options", price: "$100 setup, then $250 per month" },
    { name: "File sync and share", price: "$50 setup; $10 per user per month (up to 10 GB), $25 (up to 100 GB) or $50 (unlimited, for 5 or more users); extra storage $0.35 per GB" },
    { name: "Microsoft 365 backup: mailbox, OneDrive and SharePoint", price: "$50 setup, then $6 per user per month" },
  ],
  labor: [
    { name: "Business", standard: "$225 per hour", subscriber: "$180 per hour" },
    { name: "Personal or home-based business", standard: "$190 per hour", subscriber: "$150 per hour" },
  ],
  laborNote: "Billed in 15-minute steps. Minimum 30 minutes for remote work and 1 hour on-site.",
  billing: [
    "Automatic monthly payment from a bank account at no extra cost, or by credit card with a 3% card fee (no fee on debit cards)",
    "Accounts with 1 or 2 people can prepay a year by check and save 5%",
    "No retainer and no deposit",
  ],
};

export const PERSONAL = {
  name: "SupremeCare Personal",
  audience: "Home computers used for personal, non-business things: PCs and Macs",
  reducedLabel: "Retired seniors and students",
  tiers: [
    {
      key: "basic",
      name: "Basic",
      price: 36,
      reduced: 32,
      unit: "per computer, per month",
      summary: "Your computer is watched, updated and protected in the background. Hands-on help is billed at your subscriber rate.",
      includes: [
        ...BASIC_CORE,
        "One in-depth malware scan each year, free",
        "Malware cleanup with the installed tools, labor included when it can be done remotely",
        "Priority over non-subscribers",
        "20% off labor for anything the plan does not cover",
        "Quick questions under 10 minutes are free",
        "Lower prices on our other services, such as online backup",
      ],
    },
    {
      key: "remote",
      name: "Basic + Remote Help",
      price: 65,
      reduced: 59,
      unit: "per computer, per month",
      summary: "Everything in Basic, plus the labor for any request we can handle remotely.",
      includes: [
        "Everything in Basic",
        "All labor for any request that can be handled remotely",
        "Plain how-to help for everyday computer tasks, and short advice calls",
      ],
    },
  ],
  setup: "$40 one-time setup per computer. Waived when we supply the computer.",
  annual: "Pay for a year up front and get one month free.",
  notIncluded: [
    "On-demand services that the plan does not list, remote or on-site",
    "Installing or upgrading software, and operating-system upgrades",
    "Email problems and email moves",
    "Hardware upgrades and repairs, including parts",
    "Adding a new computer, printer or other device",
    "Internet setup and troubleshooting",
    "Software licences",
    "Troubleshooting individual apps, such as Microsoft Office, iTunes or Quicken",
  ],
  addOns: [
    { name: "Managed online backup of the whole computer (Windows only): unlimited cloud storage and recovery if the computer dies", price: "$20 per month", reduced: "$18 per month" },
    { name: "Managed online backup for Microsoft 365: mailbox, OneDrive and similar data", price: "$6 per user per month", reduced: "$5.50 per user per month" },
  ],
  labor: { standard: "$190 per hour", subscriber: "$150 per hour" },
  laborNote:
    "Remote requests over 10 minutes are billed with a half-hour minimum, then in quarter hours. On-site visits have a 1-hour minimum, then quarter hours.",
  billing: [
    "Monthly plans are paid automatically: from a bank account at no extra cost, or by credit card with a 3% card fee (no fee on debit cards)",
    "Nothing is charged until you have approved a written agreement",
  ],
};

// The same for both plans. Our working hours are stated as they are today.
export const SERVICE_TERMS = {
  response: "Send a request any time, by phone or email. We answer by the next business day.",
  hours: "Remote sessions are scheduled Monday to Friday, 2:30 PM to 7:00 PM Eastern.",
  surcharge:
    "Same-day emergencies, later evenings and weekends are possible by arrangement, at 50% above your subscriber rate. We tell you the cost before we start. Planned maintenance is never surcharged.",
  holidays: "Closed on New Year's Day, Memorial Day, Independence Day, Labor Day, Thanksgiving and Christmas.",
  zones: [
    { name: "Zone 1", detail: "within 15 miles of Havertown: Delaware County, the Main Line and most of Philadelphia" },
    { name: "Zone 2", detail: "the rest of our on-site area, from the Lehigh Valley down to Wilmington, Delaware" },
  ],
  remote: "Remote help works anywhere in the United States.",
  tax: "Prices do not include any sales tax that applies.",
};
