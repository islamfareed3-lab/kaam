"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useApp } from "@/context/AppContext";
import { COMMISSION_RATE, products } from "@/lib/pricing";

export default function PricingPage() {
  const { lang, tr, dir } = useApp();

  return (
    <div className="grain min-h-screen text-ink" dir={dir}>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-pine md:text-4xl">
          {tr("pricing")}
        </h1>
        <p className="mt-3 max-w-2xl text-ink-soft">
          kaamSet earns when hiring works — and through optional upgrades.
          Workers are never charged a placement fee to get a job.
        </p>

        <section className="mt-10 rounded-[2rem] border border-line bg-pine-deep p-8 text-white md:p-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">
            Success commission
          </h2>
          <p className="mt-3 max-w-2xl text-white/85">
            On every successful hire, the hirer (household or company) pays{" "}
            <strong>{Math.round(COMMISSION_RATE * 100)}%</strong> of the agreed
            pay amount as platform commission. Example: Rs 40,000/month role →
            Rs 3,200 commission when the hire is marked completed.
          </p>
        </section>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(products).map((product) => (
            <article
              key={product.id}
              className="rounded-3xl border border-line bg-white p-6"
            >
              <h3 className="text-lg font-semibold text-pine">
                {lang === "ur" ? product.nameUr : product.nameEn}
              </h3>
              <p className="mt-2 text-sm font-bold text-leaf">
                {product.priceLabel}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {lang === "ur" ? product.blurbUr : product.blurbEn}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-12 rounded-3xl border border-line bg-mist/70 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-pine">
            More ways this site can earn
          </h2>
          <ul className="mt-4 grid gap-2 text-sm text-ink-soft md:grid-cols-2">
            <li>Company subscriptions for restaurants & offices</li>
            <li>Urgent SMS/WhatsApp hire alerts</li>
            <li>Background-check facilitation fees</li>
            <li>Paid Urdu/English contract packs</li>
            <li>Sponsored category placements for staffing agencies</li>
            <li>Invoice/receipt tooling for business hirers</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/join" className="btn-primary">
              {tr("join")}
            </Link>
            <Link
              href="/post-job"
              className="rounded-full border border-line bg-white px-4 py-3 text-sm font-semibold text-pine"
            >
              {tr("postJob")}
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
