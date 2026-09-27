// components/GoogleReviews.jsx
// Real Google reviews from our Business Profile (data in lib/siteConfig.js), with a link to read them all on Google.
import { ExternalLink, Star } from "lucide-react";
import { site } from "@/lib/siteConfig";

const Stars = ({ n = 5, className = "h-4 w-4" }) => (
  <div className="flex items-center gap-0.5" aria-label={`${n} out of 5 stars`} role="img">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`${className} ${i < n ? "fill-amber-300 text-amber-300" : "text-slate-600"}`}
        aria-hidden="true"
      />
    ))}
  </div>
);

export default function GoogleReviews({ heading = "What people say on Google", className = "" }) {
  const g = site.google;
  if (!g?.reviews?.length) return null;
  return (
    <div className={className}>
      <div className={`flex flex-wrap items-end gap-4 ${heading ? "justify-between" : ""}`}>
        {heading && <h2 className="text-2xl md:text-3xl font-extrabold">{heading}</h2>}
        <a
          href={g.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 transition hover:border-cyan-300/30"
        >
          <span className="text-2xl font-bold text-slate-100">{g.rating.toFixed(1)}</span>
          <span>
            <Stars n={Math.round(g.rating)} />
            <span className="block text-xs text-slate-400">
              {g.reviewCount} Google {g.reviewCount === 1 ? "review" : "reviews"}
            </span>
          </span>
        </a>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {g.reviews.map((r) => (
          <figure key={r.author} className="rounded-2xl border border-white/10 bg-white/[0.06] p-6">
            <Stars n={r.rating} />
            <blockquote className="mt-3 text-sm md:text-base text-slate-200">“{r.text}”</blockquote>
            <figcaption className="mt-4 text-sm text-slate-400">
              <span className="font-semibold text-slate-200">{r.author}</span> · Google review
            </figcaption>
          </figure>
        ))}
      </div>

      <a
        href={g.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
      >
        Read all our reviews on Google <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
