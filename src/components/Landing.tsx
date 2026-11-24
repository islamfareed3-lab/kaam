"use client";

import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useApp } from "@/context/AppContext";
import { products, COMMISSION_RATE } from "@/lib/pricing";
import { categoryLabels } from "@/lib/i18n";
import {
  IconCare,
  IconCook,
  IconDriver,
  IconHome,
  IconLeaf,
  IconSpark,
} from "@/components/Icons";

const services = [
  { id: "housekeeping", icon: IconHome },
  { id: "cooks", icon: IconCook },
  { id: "cleaners", icon: IconSpark },
  { id: "care", icon: IconCare },
  { id: "drivers", icon: IconDriver },
  { id: "gardeners", icon: IconLeaf },
] as const;

export default function Landing() {
  const { tr, lang } = useApp();

  return (
    <div className="grain min-h-screen text-ink">
      <SiteHeader />

      <main>
        <section className="relative min-h-[92vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=2000&q=80)",
            }}
          />
          <div className="hero-veil absolute inset-0" />
          <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:pb-24">
            <p className="animate-rise font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-8xl">
              {tr("brand")}
            </p>
            <h1 className="animate-rise-delay mt-4 max-w-2xl text-2xl font-semibold leading-tight text-white sm:text-3xl md:text-4xl">
              {tr("heroTitle")}
            </h1>
            <p className="animate-rise-late mt-4 max-w-xl text-base text-white/85 sm:text-lg">
              {tr("heroBody")}
            </p>
            <div className="animate-rise-late mt-8 flex flex-wrap gap-3">
              <Link href="/browse" className="btn-primary">
                {tr("browseWorkers")}
              </Link>
              <Link href="/join" className="btn-ghost">
                {tr("join")}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">
            {tr("services")}
          </p>
          <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-pine md:text-4xl">
            Domestic & household roles only
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Built for homes, and for workplaces that need the same kinds of
            support — restaurants, offices, hotels, and clinics.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ id, icon: Icon }) => (
              <Link
                key={id}
                href={`/browse?category=${id}`}
                className="category-tile rounded-2xl border border-line bg-mist/70 p-5"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-pine text-mint">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-pine">
                  {categoryLabels[id][lang]}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-line bg-mist/60 py-20">
          <div className="mx-auto max-w-6xl px-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">
              {tr("how")}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-pine md:text-4xl">
              Phone accounts. Clear roles. Written hires.
            </h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Pick language & role",
                  copy: "English or Urdu first. Then worker, household, or company.",
                },
                {
                  step: "02",
                  title: "Verify phone & profile",
                  copy: "Workers upload details and optional CNIC-backed verification.",
                },
                {
                  step: "03",
                  title: "Hire with commission clarity",
                  copy: `When a hire succeeds, hirers pay ${Math.round(COMMISSION_RATE * 100)}% platform commission. Workers pay no placement fee.`,
                },
              ].map((item) => (
                <li
                  key={item.step}
                  className="rounded-3xl border border-line bg-white p-6"
                >
                  <p className="font-[family-name:var(--font-display)] text-4xl font-bold text-mint">
                    {item.step}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold text-pine">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {item.copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">
            {tr("earn")}
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-pine md:text-4xl">
            Revenue built into fair hiring
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            {tr("commissionNote")} {tr("noPlacementFee")}
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.values(products)
              .slice(0, 6)
              .map((product) => (
                <article
                  key={product.id}
                  className="rounded-3xl border border-line bg-white p-5"
                >
                  <h3 className="font-semibold text-pine">
                    {lang === "ur" ? product.nameUr : product.nameEn}
                  </h3>
                  <p className="mt-2 text-sm font-bold text-leaf">
                    {product.priceLabel}
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">
                    {lang === "ur" ? product.blurbUr : product.blurbEn}
                  </p>
                </article>
              ))}
          </div>
          <Link href="/pricing" className="btn-primary mt-8 inline-flex">
            {tr("pricing")}
          </Link>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24">
          <div className="rounded-[2rem] bg-pine-deep p-8 text-white md:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">
              {tr("compliance")}
            </p>
            <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-bold md:text-4xl">
              Designed around Pakistan hiring norms
            </h2>
            <ul className="mt-6 grid gap-3 text-sm text-white/85 md:grid-cols-2">
              <li>18+ age confirmation required for every worker account</li>
              <li>CNIC encouraged for verified badges (no child labour)</li>
              <li>Platform is an intermediary — hirer is employer of record</li>
              <li>Written contract templates available before confirming hire</li>
              <li>Urdu & English at account creation and across the product</li>
              <li>Clear disclosure of commission and paid upgrades</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/legal/worker-rights" className="btn-primary">
                Worker rights
              </Link>
              <Link href="/join" className="btn-ghost">
                {tr("join")}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
