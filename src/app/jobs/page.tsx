"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useApp } from "@/context/AppContext";
import { categoryLabels } from "@/lib/i18n";
import { listJobs } from "@/lib/storage";
import type { JobAd } from "@/lib/types";

export default function JobsPage() {
  const { lang, tr, dir, ready } = useApp();
  const [jobs, setJobs] = useState<JobAd[]>([]);

  useEffect(() => {
    if (!ready) return;
    setJobs(
      listJobs()
        .filter((j) => j.status === "active")
        .sort((a, b) => Number(b.featured) - Number(a.featured)),
    );
  }, [ready]);

  return (
    <div className="grain min-h-screen text-ink" dir={dir}>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-pine md:text-4xl">
              {tr("jobs")}
            </h1>
            <p className="mt-2 max-w-xl text-sm text-ink-soft">
              Paid job advertisements from households and companies. Workers
              browse free — no placement fee.
            </p>
          </div>
          <Link href="/post-job" className="btn-primary w-fit">
            {tr("postJob")}
          </Link>
        </div>

        <div className="mt-10 grid gap-4">
          {jobs.map((job) => (
            <article
              key={job.id}
              className="rounded-3xl border border-line bg-white p-5 md:p-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                {job.featured ? (
                  <span className="rounded-full bg-sun px-3 py-1 text-xs font-semibold text-pine-deep">
                    Featured ad
                  </span>
                ) : null}
                <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-pine">
                  {job.hirerType === "company" ? "Company" : "Household"}
                </span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-pine">
                {job.title}
              </h2>
              <p className="mt-1 text-sm text-ink-soft">
                {categoryLabels[job.category][lang]} · {job.city}
                {job.organizationName ? ` · ${job.organizationName}` : ""}
              </p>
              <p className="mt-3 text-sm text-ink-soft">{job.description}</p>
              <p className="mt-4 text-sm font-semibold text-leaf">{job.pay}</p>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
