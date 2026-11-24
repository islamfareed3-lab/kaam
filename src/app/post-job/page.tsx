"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useApp } from "@/context/AppContext";
import { categoryLabels } from "@/lib/i18n";
import { products } from "@/lib/pricing";
import { addJob, uid } from "@/lib/storage";
import type { ServiceCategory } from "@/lib/types";

export default function PostJobPage() {
  const router = useRouter();
  const { user, lang, tr, dir } = useApp();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ServiceCategory>("housekeeping");
  const [city, setCity] = useState("");
  const [pay, setPay] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!user || user.role === "worker") {
      router.push("/join");
      return;
    }

    if (!paid) {
      setError(
        `Demo checkout required: pay ${products.jobAd.priceLabel}${featured ? " + featured boost" : ""} to publish.`,
      );
      return;
    }

    const expires = new Date();
    expires.setDate(expires.getDate() + 14);

    addJob({
      id: uid("job"),
      ownerId: user.id,
      title,
      category,
      city,
      pay,
      description,
      hirerType: user.role === "company" ? "company" : "household",
      organizationName: user.hirer?.organizationName,
      createdAt: new Date().toISOString(),
      expiresAt: expires.toISOString(),
      featured,
      status: "active",
    });

    router.push("/jobs");
  }

  return (
    <div className="grain min-h-screen text-ink" dir={dir}>
      <SiteHeader />
      <main className="mx-auto max-w-xl px-5 py-12">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-pine">
          {tr("postJob")}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          {lang === "ur" ? products.jobAd.blurbUr : products.jobAd.blurbEn}{" "}
          ({products.jobAd.priceLabel})
        </p>

        {!user || user.role === "worker" ? (
          <p className="mt-8 rounded-2xl border border-line bg-white p-5 text-sm">
            Job ads are for households and companies.{" "}
            <Link href="/join" className="font-semibold text-pine underline">
              Create a hirer account
            </Link>
          </p>
        ) : (
          <form onSubmit={submit} className="mt-8 grid gap-3">
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job title"
              className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ServiceCategory)}
              className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
            >
              {Object.entries(categoryLabels).map(([id, labels]) => (
                <option key={id} value={id}>
                  {labels[lang]}
                </option>
              ))}
            </select>
            <input
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
            />
            <input
              required
              value={pay}
              onChange={(e) => setPay(e.target.value)}
              placeholder="Pay offer"
              className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
            />
            <textarea
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Hours, duties, live-in/out, contract notes"
              className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
            />
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              Feature this ad (+ Rs 799)
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4 text-sm">
              <input
                type="checkbox"
                checked={paid}
                onChange={(e) => setPaid(e.target.checked)}
              />
              I confirm demo payment of {products.jobAd.priceLabel}
              {featured ? " + featured boost" : ""}
            </label>
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <button type="submit" className="btn-primary w-fit">
              Publish job ad
            </button>
          </form>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
