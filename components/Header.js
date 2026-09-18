// components/Header.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/lib/siteConfig";

const US_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/faqs", label: "FAQs" },
  { href: "/areas", label: "Areas" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/gallery", label: "Gallery" },
];

const UK_LINKS = [
  { href: "/uk", label: "Home" },
  { href: "/uk/about", label: "About" },
  { href: "/uk/services", label: "Services" },
  { href: "/uk/faqs", label: "FAQs" },
  { href: "/uk/areas", label: "Areas" },
  { href: "/uk/contact", label: "Contact" },
];

function BrandLogo({ size = 28, className = "", withText = false }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/logo.png"
        alt="Supreme IT Experts logo"
        width={size}
        height={size}
        priority
        sizes={`${size * 2}px`}
        className="object-contain"
        style={{ width: size, height: size }}
      />
      {withText && (
        <span className="hidden sm:inline text-[17px] font-semibold tracking-tight text-slate-100">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400">
            Supreme
          </span>{" "}
          IT Experts
        </span>
      )}
    </span>
  );
}

function isUkRolloutOn() {
  const v = String(process.env.NEXT_PUBLIC_UK_ROLLOUT || "").toLowerCase().trim();
  return v === "on" || v === "true" || v === "1";
}

export default function Header({ className = "" }) {
  const pathname = usePathname();

  const UK_ENABLED = isUkRolloutOn();
  const routeIsUk = pathname === "/uk" || pathname.startsWith("/uk/");
  const isUk = UK_ENABLED && routeIsUk;

  const LINKS = isUk ? UK_LINKS : US_LINKS;

  // ✅ prevent wrap: lg show fewer links, xl show all
  const LINKS_LG = LINKS.filter((l) => !["/gallery", "/areas", "/uk/areas"].includes(l.href));
  const LINKS_XL = LINKS;

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const brandHref = isUk ? "/uk" : "/";

  // Primary CTA
  // Delaware County + AI pages book the IT + AI Checkup; everything else keeps the IT assessment offer
  const CHECKUP_PATHS = [
    "/lp/it-ai-checkup",
    "/tools/",
    "/services/ai-workflows",
    "/locations/broomall-pa",
    "/locations/newtown-square-pa",
    "/locations/havertown-pa",
    "/locations/springfield-pa",
    "/locations/media-pa",
  ];
  const isCheckup = !isUk && CHECKUP_PATHS.some((p) => (pathname || "").startsWith(p));

  const ctaHref = isUk
    ? "/uk/contact"
    : isCheckup
    ? "/lp/it-ai-checkup?source=header#book"
    : site?.assessmentHref || "/lp/allentown#claim";
  const ctaText = isUk ? "Book a Call" : isCheckup ? "Free IT + AI Checkup" : "Free IT Assessment";
  const ctaShort = isUk ? "Book Call" : isCheckup ? "Free Checkup" : "Free Assessment";

  // Secondary Quote
  const quoteHref = isUk ? "/uk/contact" : "/get-quote";
  const quoteText = isUk ? "Get Quote" : "Pricing & Quote";

  // Region switch (optional)
  const regionSwitchHref = isUk ? "/" : "/uk";
  const regionSwitchText = isUk ? "US" : "UK";
  const regionSwitchTitle = isUk ? "Switch to United States" : "Switch to United Kingdom";

  return (
    <header
      className={`site-header sticky top-0 z-[100] border-b border-white/10 bg-slate-950/95 backdrop-blur-xl ${className}`}
    >
      <div className="h-[2px] bg-gradient-to-r from-cyan-500/50 via-fuchsia-500/40 to-cyan-500/50" />

      {/* ✅ 3-column layout: left logo | center menu | right CTAs */}
      <div className="max-w-6xl mx-auto px-4 py-2 grid grid-cols-[auto_1fr_auto] items-center gap-3 leading-none">
        {/* Left */}
        <Link href={brandHref} className="shrink-0" aria-label={isUk ? "Go to UK homepage" : "Go to US homepage"}>
          <BrandLogo size={40} withText />
        </Link>

        {/* Center (desktop menu centered) */}
        <nav className="hidden lg:flex justify-center">
          {/* lg: fewer links */}
          <div className="hidden lg:flex xl:hidden items-center gap-4 whitespace-nowrap">
            {LINKS_LG.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative py-1 text-sm transition-colors ${
                    active ? "text-cyan-300" : "text-slate-300 hover:text-cyan-300"
                  }`}
                >
                  {l.label}
                  <span
                    className={`pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 transition-transform ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* xl: all links */}
          <div className="hidden xl:flex items-center gap-5 whitespace-nowrap">
            {LINKS_XL.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative py-1 text-sm transition-colors ${
                    active ? "text-cyan-300" : "text-slate-300 hover:text-cyan-300"
                  }`}
                >
                  {l.label}
                  <span
                    className={`pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 transition-transform ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Right (desktop CTAs stay right) */}
        <div className="hidden lg:flex items-center gap-3 justify-end whitespace-nowrap">
          {UK_ENABLED && (
            <Link
              href={regionSwitchHref}
              className="rounded-lg px-3 py-2 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-slate-100 transition"
              title={regionSwitchTitle}
              aria-label={regionSwitchTitle}
            >
              {regionSwitchText}
            </Link>
          )}

          <Link
            href={quoteHref}
            className="rounded-lg px-3 py-2 text-sm font-semibold border border-white/10 bg-white/0 hover:bg-white/5 text-slate-100 transition"
          >
            {quoteText}
          </Link>

          <Link
            href={ctaHref}
            className="rounded-lg px-3.5 py-2 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
          >
            {ctaText}
          </Link>
        </div>

        {/* Mobile (right side) */}
        <div className="lg:hidden flex items-center gap-2 justify-end">
          <Link
            href={ctaHref}
            className="rounded-lg px-3 py-2 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
          >
            {ctaShort}
          </Link>

          {/* Drawer */}
          <input id="nav-toggle" type="checkbox" className="peer hidden" />
          <label htmlFor="nav-toggle" aria-label="Open menu" className="text-slate-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path
                fillRule="evenodd"
                d="M3.75 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          <label
            htmlFor="nav-toggle"
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto transition lg:hidden"
          />

          <div className="fixed right-0 top-0 z-50 h-auto w-[82%] max-w-xs bg-slate-950 border-l border-white/10 shadow-2xl shadow-black/50 translate-x-full peer-checked:translate-x-0 transition lg:hidden">
            <div className="p-6 bg-slate-950">
              <div className="flex items-center justify-between">
                <Link href={brandHref} className="font-semibold text-slate-100" aria-label="Go to homepage">
                  <BrandLogo size={26} className="translate-y-[1px]" />
                </Link>

                <label htmlFor="nav-toggle" aria-label="Close menu" className="text-slate-200 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>

              <div className="mt-4 grid gap-2">
                <Link
                  href={ctaHref}
                  onClick={() => document.getElementById('nav-toggle').checked = false}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition text-center"
                >
                  {ctaText}
                </Link>

                <Link
                  href={quoteHref}
                  onClick={() => document.getElementById('nav-toggle').checked = false}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-slate-100 transition text-center"
                >
                  {quoteText}
                </Link>
              </div>

              {UK_ENABLED && (
                <div className="mt-4">
                  <Link
                    href={regionSwitchHref}
                    onClick={() => document.getElementById('nav-toggle').checked = false}
                    className="rounded-lg px-3 py-2 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-slate-100 transition inline-flex"
                    aria-label={regionSwitchTitle}
                  >
                    {isUk ? "Switch to US" : "Switch to UK"}
                  </Link>
                </div>
              )}

              <div className="mt-6 grid gap-2">
                {LINKS.map((l) => {
                  const active = isActive(l.href);
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => document.getElementById('nav-toggle').checked = false}
                      className={`rounded-2xl px-3 py-3 text-sm font-medium transition ${
                        active
                          ? "text-cyan-300 bg-cyan-400/10"
                          : "text-slate-200 hover:bg-white/5 hover:text-cyan-300"
                      }`}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
