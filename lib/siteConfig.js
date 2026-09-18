// lib/siteConfig.js
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://supremeitexperts.com").replace(/\/$/, ""),

  name: "Supreme IT Experts",
  tagline: "Managed IT Services in Allentown, Macungie & Emmaus — Fast, Friendly, Fixed-Fee",

  bookingUrl: "https://calendly.com/your-link/15min",
  assessmentHref: "/lp/allentown#claim",

  // ✅ Primary site CTA
  cta: "Get a Free IT Assessment",

  // ✅ Contact (GLOBAL source of truth)
  email: "support@supremeitexperts.com",
  // Public business line (matches the Google Business Profile). WhatsApp stays on its own number.
  phone: "+1 610-500-9209",
  phoneTel: "tel:+16105009209", // ✅ stable tel link
  whatsapp: "+1 484-581-9691",
  hidePhone: false,

  address: "501 Hamilton St, Allentown, PA 18101",

  businessHours: {
    tz: "America/New_York",
    text: "Mon–Fri 9:00 AM – 6:00 PM ET",
    opens: "09:00",
    closes: "18:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },

  socials: {
    linkedin: "https://www.linkedin.com/company/supremeitexperts/",
    x: "https://x.com/supremeitexpert",
    facebook: "https://www.facebook.com/profile.php?id=61583432086306",
    instagram: "https://www.instagram.com/supremeitexperts/",
    tiktok: "https://www.tiktok.com/@supremeitexperts",
  },

  areas: [
    "Allentown, PA",
    "Macungie, PA",
    "Emmaus, PA",
    "Broomall, PA",
    "Newtown Square, PA",
    "Havertown, PA",
    "Springfield, PA",
    "Media, PA",
  ],
};
