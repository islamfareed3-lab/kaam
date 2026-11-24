"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function SiteFooter() {
  const { tr } = useApp();

  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xl font-bold text-pine">
            {tr("brand")}
          </p>
          <p className="mt-2 text-sm text-ink-soft">{tr("tagline")}</p>
          <p className="mt-4 text-xs leading-relaxed text-ink-soft">
            kaamSet is a marketplace intermediary. Hirers remain the employer of
            record. Workers are not charged placement fees.
          </p>
        </div>
        <div className="text-sm text-ink-soft">
          <p className="font-semibold text-pine">{tr("legal")}</p>
          <div className="mt-3 flex flex-col gap-2">
            <Link href="/legal/terms">Terms of use</Link>
            <Link href="/legal/privacy">Privacy policy</Link>
            <Link href="/legal/worker-rights">Domestic worker rights (PK)</Link>
          </div>
        </div>
        <div className="text-sm text-ink-soft">
          <p className="font-semibold text-pine">{tr("earn")}</p>
          <div className="mt-3 flex flex-col gap-2">
            <Link href="/pricing">Commission & plans</Link>
            <Link href="/post-job">{tr("postJob")}</Link>
            <Link href="/join">{tr("join")}</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-ink-soft">
          © 2026 kaamSet. Built for domestic & household hiring in Pakistan.
        </p>
      </div>
    </footer>
  );
}
