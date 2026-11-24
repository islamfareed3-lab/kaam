"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useApp } from "@/context/AppContext";
import { findUserByPhone, normalizePkPhone } from "@/lib/storage";

const DEMO_OTP = "123456";

export default function LoginPage() {
  const router = useRouter();
  const { tr, login, lang, dir } = useApp();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function sendCode(event: FormEvent) {
    event.preventDefault();
    setError("");
    const normalized = normalizePkPhone(phone);
    if (!normalized) {
      setError("Enter a valid Pakistan mobile number");
      return;
    }
    setPhone(normalized);
    setSent(true);
  }

  function verify(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (otp.trim() !== DEMO_OTP) {
      setError("Incorrect code");
      return;
    }
    const user = findUserByPhone(phone);
    if (!user) {
      setError(
        lang === "ur"
          ? "اکاؤنٹ نہیں ملا — پہلے سائن اپ کریں"
          : "No account found — create one first",
      );
      return;
    }
    login(user);
    router.push("/dashboard");
  }

  return (
    <div className="grain min-h-screen text-ink" dir={dir}>
      <SiteHeader />
      <main className="mx-auto max-w-md px-5 py-12">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-pine">
          {tr("login")}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">{tr("phoneHint")}</p>

        {!sent ? (
          <form onSubmit={sendCode} className="mt-8 grid gap-3">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="03XXXXXXXXX"
              className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
              required
            />
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <button type="submit" className="btn-primary w-fit">
              {tr("sendOtp")}
            </button>
          </form>
        ) : (
          <form onSubmit={verify} className="mt-8 grid gap-3">
            <p className="text-sm text-ink-soft">
              {phone} · {tr("demoOtp")}
            </p>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit code"
              className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
              required
            />
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <button type="submit" className="btn-primary w-fit">
              {tr("verifyOtp")}
            </button>
          </form>
        )}

        <p className="mt-8 text-sm text-ink-soft">
          New here?{" "}
          <Link href="/join" className="font-semibold text-pine underline">
            {tr("join")}
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
