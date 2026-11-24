"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useApp } from "@/context/AppContext";
import { products } from "@/lib/pricing";
import {
  listHires,
  updateHire,
} from "@/lib/storage";
import type { HireRequest } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const { ready, user, saveAccount, tr, dir, lang } = useApp();
  const [hires, setHires] = useState<HireRequest[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace("/join");
      return;
    }
    setHires(listHires());
  }, [ready, user, router]);

  const myHires = useMemo(() => {
    if (!user) return [];
    return hires.filter(
      (h) => h.hirerId === user.id || h.workerId === user.id,
    );
  }, [hires, user]);

  if (!ready || !user) {
    return <div className="grain min-h-screen p-10 text-pine">Loading…</div>;
  }

  const account = user;

  function buyVerified() {
    if (!account.worker) return;
    saveAccount({
      ...account,
      worker: { ...account.worker, verified: true },
    });
    setNote(`Verified badge activated (${products.verifiedBadge.priceLabel}).`);
  }

  function buyFeatured() {
    if (!account.worker) return;
    const until = new Date();
    until.setDate(until.getDate() + 7);
    saveAccount({
      ...account,
      worker: { ...account.worker, featuredUntil: until.toISOString() },
    });
    setNote(`Featured listing live for 7 days (${products.featuredListing.priceLabel}).`);
  }

  function completeHire(hire: HireRequest) {
    updateHire(hire.id, {
      status: "completed",
      completedAt: new Date().toISOString(),
      commissionAmount: hire.commissionAmount,
    });
    setHires(listHires());
    setNote(
      `Hire marked successful. Platform commission: Rs ${(hire.commissionAmount || 0).toLocaleString()}.`,
    );
  }

  return (
    <div className="grain min-h-screen text-ink" dir={dir}>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-pine">
          {tr("dashboard")}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Signed in as {account.phone} · Role: {account.role} · Language:{" "}
          {account.lang === "ur" ? "اردو" : "English"}
        </p>

        {note ? (
          <p className="mt-6 rounded-2xl border border-mint/40 bg-white px-4 py-3 text-sm text-pine">
            {note}
          </p>
        ) : null}

        {account.role === "worker" && account.worker ? (
          <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-3xl border border-line bg-white p-6">
              <h2 className="text-xl font-semibold text-pine">Your profile</h2>
              <div className="mt-4 flex gap-4">
                {account.worker.photoDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={account.worker.photoDataUrl}
                    alt=""
                    className="h-24 w-24 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-mist text-sm text-ink-soft">
                    No photo
                  </div>
                )}
                <div>
                  <p className="font-semibold text-pine">
                    {account.worker.fullName}
                  </p>
                  <p className="text-sm text-ink-soft">
                    {account.worker.city} · {account.worker.category}
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">{account.worker.bio}</p>
                  <p className="mt-2 text-sm font-semibold text-leaf">
                    {account.worker.expectedPay}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs text-ink-soft">
                CNIC on file: {account.worker.cnic} · Browse free for jobs — no
                placement fee.
              </p>
              <Link href="/jobs" className="btn-primary mt-5 inline-flex">
                {tr("jobs")}
              </Link>
            </article>

            <article className="rounded-3xl border border-line bg-white p-6">
              <h2 className="text-xl font-semibold text-pine">Paid upgrades</h2>
              <p className="mt-2 text-sm text-ink-soft">
                Optional. These are marketing/trust products — not job
                placement fees.
              </p>
              <div className="mt-5 grid gap-3">
                <button
                  type="button"
                  onClick={buyVerified}
                  disabled={account.worker.verified}
                  className="rounded-2xl border border-line px-4 py-3 text-start text-sm disabled:opacity-50"
                >
                  <p className="font-semibold text-pine">
                    {lang === "ur"
                      ? products.verifiedBadge.nameUr
                      : products.verifiedBadge.nameEn}
                  </p>
                  <p className="text-ink-soft">
                    {products.verifiedBadge.priceLabel}
                    {account.worker.verified ? " · Active" : ""}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={buyFeatured}
                  className="rounded-2xl border border-line px-4 py-3 text-start text-sm"
                >
                  <p className="font-semibold text-pine">
                    {lang === "ur"
                      ? products.featuredListing.nameUr
                      : products.featuredListing.nameEn}
                  </p>
                  <p className="text-ink-soft">
                    {products.featuredListing.priceLabel}
                  </p>
                </button>
              </div>
            </article>
          </section>
        ) : null}

        {(account.role === "household" || account.role === "company") &&
        account.hirer ? (
          <section className="mt-10 rounded-3xl border border-line bg-white p-6">
            <h2 className="text-xl font-semibold text-pine">Hirer workspace</h2>
            <p className="mt-2 text-sm text-ink-soft">
              {account.hirer.fullName}
              {account.hirer.organizationName
                ? ` · ${account.hirer.organizationName}`
                : ""}{" "}
              · {account.hirer.city}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/browse" className="btn-primary">
                {tr("browseWorkers")}
              </Link>
              <Link
                href="/post-job"
                className="rounded-full border border-line px-4 py-3 text-sm font-semibold text-pine"
              >
                {tr("postJob")}
              </Link>
              <Link
                href="/pricing"
                className="rounded-full border border-line px-4 py-3 text-sm font-semibold text-pine"
              >
                Business plans
              </Link>
            </div>
          </section>
        ) : null}

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-pine">Hire activity</h2>
          <div className="mt-4 grid gap-3">
            {myHires.length === 0 ? (
              <p className="rounded-2xl border border-line bg-white p-5 text-sm text-ink-soft">
                No hire requests yet.
              </p>
            ) : (
              myHires.map((hire) => (
                <article
                  key={hire.id}
                  className="rounded-2xl border border-line bg-white p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-pine">
                        {hire.workerName} ← {hire.hirerName}
                      </p>
                      <p className="text-sm text-ink-soft">
                        {hire.city} · {hire.proposedPay} · {hire.status}
                      </p>
                      <p className="mt-2 text-sm text-ink-soft">{hire.message}</p>
                      <p className="mt-2 text-xs text-leaf">
                        Commission on success: Rs{" "}
                        {(hire.commissionAmount || 0).toLocaleString()} (
                        {Math.round(hire.commissionRate * 100)}%)
                      </p>
                    </div>
                    {account.role !== "worker" && hire.status === "pending" ? (
                      <button
                        type="button"
                        className="rounded-full bg-pine px-4 py-2 text-sm font-semibold text-white"
                        onClick={() => completeHire(hire)}
                      >
                        Mark hire successful
                      </button>
                    ) : null}
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
