// lib/siteConfig.js
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://supremeitexperts.com").replace(/\/$/, ""),

  name: "Supreme IT Experts",
  tagline: "Managed IT Services in Allentown, Macungie & Emmaus — Fast, Friendly, Fixed-Fee",

  // /book redirects to the Google Calendar booking page (next.config.mjs)
  bookingUrl: "/book",
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

  // Registered business location (Delaware County). The street address is kept off the public site on purpose;
  // it is used in email footers and contracts, where it is required.
  address: {
    addressLocality: "Havertown",
    addressRegion: "PA",
    postalCode: "19083",
    addressCountry: "US",
  },

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

  // Google Business Profile. Review text is copied word for word from Google (checked Sep 26, 2026) and shown with
  // the reviewer's first name and last initial. Keep rating/reviewCount in step with the profile. No review markup
  // (schema) on purpose: Google does not allow self-served or copied reviews in structured data.
  google: {
    profileUrl: "https://maps.app.goo.gl/RCJh9BgN985hjuvG8",
    rating: 5.0,
    reviewCount: 3,
    reviews: [
      {
        author: "Kaylie M.",
        rating: 5,
        text: "Super friendly, helped set up and link all of my devices plus recommended a computer to best fit my mother’s needs as well! Definitely recommend SupremeIT Experts to anyone looking for IT services.",
      },
      {
        author: "Chaudhry A.",
        rating: 5,
        text: "I have found Muhammad to be THE Expert. Friendly, fast, and reliable.",
      },
    ],
  },

  areas: [
    "Allentown, PA",
    "Macungie, PA",
    "Emmaus, PA",
    "Broomall, PA",
    "Havertown, PA",
    "Springfield, PA",
    "Media, PA",
    "Philadelphia, PA",
    "Wilmington, DE",
  ],
};
