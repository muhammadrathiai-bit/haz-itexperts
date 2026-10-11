// app/plans/_components/PlanParts.jsx
// Small building blocks shared by the plan pages. Server components: no client code needed.
import { CheckCircle2, Minus } from "lucide-react";

export function Glow() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-24 -left-24 size-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 size-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
    </div>
  );
}

export function CheckList({ items = [], className = "" }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((g) => (
        <li key={g} className="flex gap-3 text-sm text-slate-200">
          <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-cyan-300" aria-hidden="true" />
          <span>{g}</span>
        </li>
      ))}
    </ul>
  );
}

export function PlainList({ items = [], className = "", twoCols = false }) {
  return (
    <ul className={`${twoCols ? "grid md:grid-cols-2 gap-x-8 gap-y-2" : "space-y-2"} ${className}`}>
      {items.map((g) => (
        <li key={g} className="flex gap-3 text-sm text-slate-300">
          <Minus className="h-4 w-4 mt-1 shrink-0 text-slate-500" aria-hidden="true" />
          <span>{g}</span>
        </li>
      ))}
    </ul>
  );
}

// One plan tier: name, price, what it includes.
export function TierCard({ tier, reducedLabel, highlight = false, children }) {
  return (
    <div
      className={`rounded-2xl border p-6 flex flex-col ${
        highlight ? "border-cyan-300/30 bg-cyan-400/5" : "border-white/10 bg-white/5"
      }`}
    >
      <h3 className="text-lg font-semibold text-slate-100">{tier.name}</h3>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-4xl font-extrabold text-slate-100">${tier.price}</span>
        <span className="text-sm text-slate-300">{tier.unit}</span>
      </div>
      {tier.reduced ? (
        <p className="mt-2 text-sm text-cyan-200">
          {reducedLabel}: <span className="font-semibold">${tier.reduced}</span> {tier.unit}
        </p>
      ) : null}
      {tier.setup ? <p className="mt-2 text-sm text-slate-300">{tier.setup}</p> : null}
      {tier.extraPrice ? <p className="mt-1 text-sm text-slate-300">{tier.extraPrice}</p> : null}
      {tier.conditions?.length ? (
        <p className="mt-1 text-sm text-slate-300">{tier.conditions.join(" · ")}</p>
      ) : null}
      <p className="mt-4 text-sm text-slate-200">{tier.summary}</p>
      <CheckList items={tier.includes} className="mt-5" />
      {children}
    </div>
  );
}

// Rows of "what it is" and "what it costs". Stacks on a phone, two columns from md up.
export function PriceRows({ rows = [], showReduced = false, reducedLabel = "" }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 divide-y divide-white/10">
      {rows.map((r) => (
        <div key={r.name} className="p-4 md:p-5 grid md:grid-cols-[1.4fr_1fr] gap-1 md:gap-6">
          <div className="text-sm text-slate-200">{r.name}</div>
          <div className="text-sm text-slate-100 font-medium">
            {r.price}
            {showReduced && r.reduced ? (
              <span className="block text-cyan-200 font-normal">
                {reducedLabel}: {r.reduced}
              </span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Faqs({ items = [] }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
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
  );
}

export function TermsBlock({ terms, extra = [] }) {
  const lines = [terms.response, terms.hours, terms.surcharge, terms.holidays, terms.remote, ...extra, terms.tax];
  return <PlainList items={lines} />;
}
