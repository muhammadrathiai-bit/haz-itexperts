// app/layout.js
import "./globals.css";
import { site } from "@/lib/siteConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import FABs from "@/components/FABs";
import BackToTop from "@/components/BackToTop";

import Script from "next/script";
import { BASE_URL, BUSINESS_ID, uniq } from "@/lib/seoIds";

const BRAND = site?.name || "Supreme IT Experts";
const DEFAULT_DESC =
  "Managed IT for SMBs in Allentown, Macungie & Emmaus: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.";

const OG_IMAGE = new URL("/og-image.png?v=7", BASE_URL).toString();

const cleanPhone = (site?.phone || "+1 610-500-9209").replace(/[^\d+]/g, "");
const phoneE164 = cleanPhone.startsWith("+") ? cleanPhone : `+${cleanPhone}`;
const email = site?.email || "support@supremeitexperts.com";

// socials (if site.socials is an object)
const sameAs = uniq(Object.values(site?.socials || {}).filter(Boolean));

// ✅ Clean address: DO NOT include undefined keys in JSON-LD
const address = {
  "@type": "PostalAddress",
  addressLocality: site?.address?.addressLocality || "Havertown",
  addressRegion: site?.address?.addressRegion || "PA",
  addressCountry: site?.address?.addressCountry || "US",

  ...(site?.address?.streetAddress || site?.address?.street
    ? { streetAddress: site?.address?.streetAddress || site?.address?.street }
    : {}),

  ...(site?.address?.postalCode ? { postalCode: site.address.postalCode } : {}),
};

export const metadata = {
  metadataBase: new URL(BASE_URL),

  // ✅ IMPORTANT: global canonical remove (warna har page "/" ban jata)
  // alternates: { canonical: "/" },

  title: {
    default: `${BRAND} — Managed IT & Cybersecurity`,
    template: `%s — ${BRAND}`, 
  },

  description: DEFAULT_DESC,

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

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  openGraph: {
    title: `${BRAND} — Managed IT & Cybersecurity`,
    description: DEFAULT_DESC,
    url: BASE_URL, // ✅ was "/"
    siteName: BRAND,
    type: "website",
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: BRAND }],
  },

  twitter: {
    card: "summary_large_image",
    title: `${BRAND} — Managed IT & Cybersecurity`,
    description: DEFAULT_DESC,
    images: [OG_IMAGE],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export default function RootLayout({ children }) {
  // ✅ ONE business entity only (NO separate Organization object)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: `${BASE_URL}/`,
        name: BRAND,
        publisher: { "@id": BUSINESS_ID },
      },

      {
        "@type": ["LocalBusiness", "ITService"],
        "@id": BUSINESS_ID,
        name: BRAND,
        url: `${BASE_URL}/`,
        description:
          "Managed IT services, cybersecurity and practical AI automation for small and mid-sized businesses in Delaware County and the Lehigh Valley, PA.",
        telephone: phoneE164,
        email,
        priceRange: "$$",
        image: OG_IMAGE,
        logo: new URL("/logo.png", BASE_URL).toString(),
        sameAs,
        address,
        areaServed: site?.areas?.length ? site.areas : ["Havertown, PA", "Broomall, PA", "Allentown, PA"],

        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: phoneE164,
            email,
            availableLanguage: ["en"],
          },
        ],
      },
    ],
  };

  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-slate-100 antialiased isolate min-h-screen overflow-x-hidden">
        <Analytics />

        <Script
          id="global-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <Header className="site-header" />
        <main>{children}</main>
        <FABs />
        <BackToTop fabLift={50} />
        <Footer className="site-footer" />
      </body>
    </html>
  );
}
