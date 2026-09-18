// app/tools/email-security-check/page.js
import Link from "next/link";
import PageHero from "@/components/PageHero";
import EmailCheckTool from "@/components/EmailCheckTool";
import { site } from "@/lib/siteConfig";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/tools/email-security-check`;

  // Keep brand out (layout template already adds it)
  const title = "Free Email Security Check — Can Someone Send Email as Your Business?";
  const description =
    "Type your business domain and see in 10 seconds whether scammers can send email that looks like it comes from you. Free SPF and DMARC check in plain English. No sign-up.";
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: brand,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — Free Email Security Check` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

const FAQS = [
  {
    q: "What does this check?",
    a: "Three public DNS records for your domain: MX (who handles your email), SPF (the list of systems allowed to send as you) and DMARC (the policy that tells other mail servers what to do with email that fails those checks). Anyone can read these records. We only read them; we never send anything to your domain.",
  },
  {
    q: "What does “Not protected” actually mean?",
    a: "It means your domain does not tell other mail servers to block email that pretends to be you. A scammer can put your address in the From line of a fake invoice or a “we changed our bank details” message, and your customers’ mail servers have no instruction to stop it. It does not mean you have been hacked.",
  },
  {
    q: "How common is this?",
    a: "Very. In September 2026 we reviewed the public records of 135 local business domains around Broomall, PA. 122 of them, about nine in ten, had no enforced DMARC policy. We never name the businesses.",
  },
  {
    q: "Can I just add a “reject” record myself?",
    a: "Please don’t jump straight to reject. If your invoicing tool, website form, newsletter or scheduling system sends email as you and is not set up correctly, a strict policy will block your own real email. The safe order is: list every sender, switch on signing (DKIM) for each, publish DMARC in watch-only mode, read the reports, then tighten to quarantine and reject.",
  },
  {
    q: "What can’t this tool see?",
    a: "DKIM keys (they are stored under names only your mail systems know), your spam-filter and login settings, and whether mailboxes already have suspicious forwarding rules. We look at those in the free IT + AI Checkup.",
  },
];

export default function EmailSecurityCheckPage() {
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Email Security Check",
        url: `${baseUrl}/tools/email-security-check`,
        applicationCategory: "SecurityApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        provider: { "@type": "Organization", name: site?.name || "Supreme IT Experts", url: baseUrl },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        compact
        eyebrow="Free tool · 10 seconds · no sign-up"
        title="Can someone send email as your business?"
        sub="Most fake-invoice and “we changed our bank details” scams start with an email that looks like it came from a real local business. Type your domain to see whether yours can be faked."
      />

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <EmailCheckTool source="email-check" />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">How the fix works</h2>
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          {[
            { n: "1", t: "List every sender", d: "Your mailbox provider, website forms, invoicing, scheduling and newsletter tools. Most offices have four to seven." },
            { n: "2", t: "Sign the real email", d: "Switch on DKIM signing and correct the SPF list for each sender, so genuine email proves it is yours." },
            { n: "3", t: "Watch for two weeks", d: "Publish DMARC in watch-only mode and read the reports to catch any sender that was missed." },
            { n: "4", t: "Block the fakes", d: "Tighten the policy to quarantine, then reject. Fake email stops landing; real email keeps flowing." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-cyan-300 text-sm font-semibold">Step {s.n}</div>
              <div className="mt-1 font-semibold text-slate-100">{s.t}</div>
              <p className="mt-2 text-sm text-slate-300">{s.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400">
          We ran these same steps on our own domain before offering them to anyone else.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">Questions people ask</h2>
        <div className="mt-6 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/5 p-5">
              <summary className="cursor-pointer list-none font-semibold text-slate-100 flex items-center justify-between gap-4">
                {f.q}
                <span className="text-cyan-300 transition group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-6 pb-20">
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-400/5 p-7 md:p-10">
          <h2 className="text-2xl md:text-3xl font-extrabold">Want the whole picture?</h2>
          <p className="mt-3 text-slate-300 max-w-3xl">
            The free 30-minute IT + AI Checkup covers email, backups, logins and devices, plus the busywork AI can take off
            your team. You get a one-page report with your top 3 security gaps, your top 3 time and money leaks, and what we
            would fix first at a fixed price. If your setup is solid, the report says so.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/lp/it-ai-checkup?source=email-check-page"
              className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2.5 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
            >
              Book the free IT + AI Checkup →
            </Link>
            <Link
              href="/services/cybersecurity"
              className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2.5 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10 transition"
            >
              See cybersecurity services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
