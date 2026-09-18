// app/sitemap.xml/route.js
import { BASE_URL } from "@/lib/seoIds";

export const dynamic = "force-dynamic"; // optional but safe for sitemap

export async function GET() {
  const base = (BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const now = new Date().toISOString();

  const urls = [
    { loc: `${base}/`, changefreq: "weekly", priority: 1.0 },

    { loc: `${base}/about`, changefreq: "monthly", priority: 0.7 },
    { loc: `${base}/services`, changefreq: "weekly", priority: 0.8 },

    { loc: `${base}/services/managed-it`, changefreq: "monthly", priority: 0.8 },
    { loc: `${base}/services/cybersecurity`, changefreq: "monthly", priority: 0.8 },
    { loc: `${base}/services/cloud-workspace`, changefreq: "monthly", priority: 0.7 },
    { loc: `${base}/services/device-management`, changefreq: "monthly", priority: 0.7 },
    { loc: `${base}/services/projects-consulting`, changefreq: "monthly", priority: 0.7 },
    { loc: `${base}/services/vcio-strategy`, changefreq: "monthly", priority: 0.7 },
    { loc: `${base}/services/ai-workflows`, changefreq: "weekly", priority: 0.8 },

    { loc: `${base}/faqs`, changefreq: "monthly", priority: 0.6 },
    { loc: `${base}/areas`, changefreq: "monthly", priority: 0.6 },
    { loc: `${base}/gallery`, changefreq: "monthly", priority: 0.5 },
    { loc: `${base}/get-quote`, changefreq: "weekly", priority: 0.7 },

    { loc: `${base}/locations/allentown-pa`, changefreq: "monthly", priority: 0.6 },
    { loc: `${base}/locations/macungie-pa`, changefreq: "monthly", priority: 0.6 },
    { loc: `${base}/locations/emmaus-pa`, changefreq: "monthly", priority: 0.6 },
    { loc: `${base}/locations/broomall-pa`, changefreq: "monthly", priority: 0.7 },
    { loc: `${base}/locations/newtown-square-pa`, changefreq: "monthly", priority: 0.7 },
    { loc: `${base}/locations/havertown-pa`, changefreq: "monthly", priority: 0.7 },
    { loc: `${base}/locations/springfield-pa`, changefreq: "monthly", priority: 0.7 },
    { loc: `${base}/locations/media-pa`, changefreq: "monthly", priority: 0.7 },

    // ✅ Landing page
    { loc: `${base}/lp/allentown`, changefreq: "weekly", priority: 0.8 },

    { loc: `${base}/contact`, changefreq: "yearly", priority: 0.6 },
  ];

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n` +
          `    <loc>${u.loc}</loc>\n` +
          `    <lastmod>${now}</lastmod>\n` +
          `    <changefreq>${u.changefreq}</changefreq>\n` +
          `    <priority>${u.priority}</priority>\n` +
          `  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
