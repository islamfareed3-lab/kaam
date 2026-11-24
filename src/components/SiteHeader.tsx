"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function SiteHeader() {
  const { tr, user, lang, setLang, logout } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-[#f7faf8]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-pine"
        >
          {tr("brand")}
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-ink-soft md:flex">
          <Link href="/browse" className="hover:text-pine">
            {tr("browseWorkers")}
          </Link>
          <Link href="/jobs" className="hover:text-pine">
            {tr("jobs")}
          </Link>
          <Link href="/pricing" className="hover:text-pine">
            {tr("pricing")}
          </Link>
          <Link href="/legal/worker-rights" className="hover:text-pine">
            {tr("legal")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-line bg-white p-0.5 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 ${lang === "en" ? "bg-pine text-white" : "text-ink-soft"}`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("ur")}
              className={`rounded-full px-2.5 py-1 ${lang === "ur" ? "bg-pine text-white" : "text-ink-soft"}`}
            >
              اردو
            </button>
          </div>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden rounded-full border border-line bg-white px-3 py-2 text-sm font-semibold text-pine sm:inline-flex"
              >
                {tr("dashboard")}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-full px-3 py-2 text-sm font-semibold text-ink-soft"
              >
                {tr("logout")}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full px-3 py-2 text-sm font-semibold text-pine sm:inline-flex"
              >
                {tr("login")}
              </Link>
              <Link href="/join" className="btn-primary text-sm">
                {tr("join")}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
