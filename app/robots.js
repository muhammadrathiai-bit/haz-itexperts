// app/robots.js
import { site } from "@/lib/siteConfig";

export const revalidate = 3600;

function isUkRolloutOn() {
  const v = String(process.env.UK_ROLLOUT || "").toLowerCase().trim();
  return v === "on" || v === "true" || v === "1";
}

export default function robots() {
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const ukOn = isUkRolloutOn();

  const disallow = [];
  // UK rollout OFF ho to /uk/ block
  if (!ukOn) disallow.push("/uk/");
  // Co-brandable partner give-aways (sent to referral partners by link; not meant for search results)
  disallow.push("/partners/");

  // ✅ Blog ko allow karna hai — so blog disallow REMOVE

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        ...(disallow.length ? { disallow } : {}),
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
