"use client";

import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useApp } from "@/context/AppContext";
import { categoryLabels } from "@/lib/i18n";
import {
  addHire,
  listWorkers,
  uid,
} from "@/lib/storage";
import type { UserAccount } from "@/lib/types";
import { COMMISSION_RATE, estimateCommission } from "@/lib/pricing";

function BrowseInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lang, tr, user, dir, ready } = useApp();
  const [workers, setWorkers] = useState<UserAccount[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(
    searchParams.get("category") || "all",
  );
  const [selected, setSelected] = useState<UserAccount | null>(null);
  const [message, setMessage] = useState("");
  const [proposedPay, setProposedPay] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!ready) return;
    setWorkers(listWorkers());
  }, [ready]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return workers
      .filter((w) => w.worker?.available)
      .filter((w) => category === "all" || w.worker?.category === category)
      .filter((w) => {
        if (!q || !w.worker) return true;
        return `${w.worker.fullName} ${w.worker.city} ${w.worker.category}`
          .toLowerCase()
          .includes(q);
      })
      .sort((a, b) => {
        const af = a.worker?.featuredUntil ? 1 : 0;
        const bf = b.worker?.featuredUntil ? 1 : 0;
        if (af !== bf) return bf - af;
        const av = a.worker?.verified ? 1 : 0;
        const bv = b.worker?.verified ? 1 : 0;
        return bv - av;
      });
  }, [workers, query, category]);

  function requestHire(event: FormEvent) {
    event.preventDefault();
    if (!user || user.role === "worker") {
      router.push("/join");
      return;
    }
    if (!selected?.worker) return;

    const commissionAmount = estimateCommission(
      proposedPay || selected.worker.expectedPay,
    );

    addHire({
      id: uid("hire"),
      workerId: selected.id,
      hirerId: user.id,
      workerName: selected.worker.fullName,
      hirerName:
        user.hirer?.organizationName || user.hirer?.fullName || "Hirer",
      category: selected.worker.category,
      city: selected.worker.city,
      proposedPay: proposedPay || selected.worker.expectedPay,
      message,
      status: "pending",
      commissionRate: COMMISSION_RATE,
      commissionAmount,
      createdAt: new Date().toISOString(),
    });

    setNotice(
      `Hire request sent. Estimated platform commission on success: Rs ${commissionAmount.toLocaleString()} (${Math.round(COMMISSION_RATE * 100)}%).`,
    );
    setSelected(null);
    setMessage("");
    setProposedPay("");
  }

  return (
    <div className="grain min-h-screen text-ink" dir={dir}>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-pine md:text-4xl">
          {tr("browseWorkers")}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft">
          Households and companies can explore domestic workers. Featured and
          verified profiles appear first. {tr("commissionNote")}
        </p>

        <div className="mt-8 flex flex-col gap-3 md:flex-row">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, city, role"
            className="w-full rounded-full border border-line bg-white px-4 py-3 text-sm md:max-w-sm"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-line bg-white px-4 py-3 text-sm"
          >
            <option value="all">All categories</option>
            {Object.entries(categoryLabels).map(([id, labels]) => (
              <option key={id} value={id}>
                {labels[lang]}
              </option>
            ))}
          </select>
        </div>

        {notice ? (
          <p className="mt-6 rounded-2xl border border-mint/40 bg-white px-4 py-3 text-sm text-pine">
            {notice}
          </p>
        ) : null}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((account) => {
            const worker = account.worker!;
            return (
              <article
                key={account.id}
                className="worker-card overflow-hidden rounded-3xl border border-line bg-white"
              >
                <div className="relative h-48 bg-mist">
                  {worker.photoDataUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={worker.photoDataUrl}
                      alt={worker.fullName}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                    {worker.verified ? (
                      <span className="rounded-full bg-pine px-3 py-1 text-xs font-semibold text-mint">
                        Verified
                      </span>
                    ) : null}
                    {worker.featuredUntil ? (
                      <span className="rounded-full bg-sun px-3 py-1 text-xs font-semibold text-pine-deep">
                        Featured
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-pine">
                    {worker.fullName}
                  </h2>
                  <p className="text-sm text-ink-soft">
                    {categoryLabels[worker.category][lang]} · {worker.city}
                  </p>
                  <p className="mt-3 text-sm text-ink-soft">{worker.bio}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-pine">
                        {worker.expectedPay}
                      </p>
                      <p className="text-xs text-ink-soft">
                        {worker.experienceYears} yrs ·{" "}
                        {worker.languagesSpoken.join(", ")}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="rounded-full bg-pine px-4 py-2 text-sm font-semibold text-white"
                      onClick={() => {
                        setSelected(account);
                        setProposedPay(worker.expectedPay);
                      }}
                    >
                      {tr("hire")}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {selected?.worker ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-pine-deep/50 p-4 backdrop-blur-sm sm:items-center">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-pine">
                  Hire {selected.worker.fullName}
                </h3>
                <p className="text-sm text-ink-soft">
                  Est. commission{" "}
                  {Math.round(COMMISSION_RATE * 100)}% ≈ Rs{" "}
                  {estimateCommission(
                    proposedPay || selected.worker.expectedPay,
                  ).toLocaleString()}
                </p>
              </div>
              <button type="button" onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
            <form className="mt-5 grid gap-3" onSubmit={requestHire}>
              <input
                value={proposedPay}
                onChange={(e) => setProposedPay(e.target.value)}
                placeholder="Proposed pay"
                className="rounded-2xl border border-line px-4 py-3 text-sm"
                required
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Hours, start date, household/company notes"
                className="rounded-2xl border border-line px-4 py-3 text-sm"
                required
              />
              <p className="text-xs text-ink-soft">
                Before completing a hire, use a written agreement. See Worker
                rights & contract pack on Pricing.
              </p>
              <button type="submit" className="btn-primary w-fit">
                {user && user.role !== "worker"
                  ? "Send hire request"
                  : "Sign up as hirer to continue"}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      <SiteFooter />
    </div>
  );
}

export default function BrowsePage() {
  return (
    <Suspense
      fallback={
        <div className="grain min-h-screen p-10 text-pine">Loading…</div>
      }
    >
      <BrowseInner />
    </Suspense>
  );
}
