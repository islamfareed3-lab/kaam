"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useApp } from "@/context/AppContext";
import {
  findUserByPhone,
  normalizePkPhone,
  uid,
} from "@/lib/storage";
import type {
  AccountRole,
  CompanyType,
  Lang,
  ServiceCategory,
  UserAccount,
} from "@/lib/types";
import { categoryLabels, companyTypeLabels } from "@/lib/i18n";

type Step = "language" | "role" | "phone" | "otp" | "profile" | "legal";

const DEMO_OTP = "123456";

export default function JoinPage() {
  const router = useRouter();
  const { lang, setLang, tr, login, dir } = useApp();
  const [step, setStep] = useState<Step>("language");
  const [role, setRole] = useState<AccountRole | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState<ServiceCategory>("housekeeping");
  const [experienceYears, setExperienceYears] = useState(1);
  const [expectedPay, setExpectedPay] = useState("");
  const [bio, setBio] = useState("");
  const [cnic, setCnic] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState<string>();
  const [organizationName, setOrganizationName] = useState("");
  const [companyType, setCompanyType] = useState<CompanyType>("restaurant");
  const [ageOk, setAgeOk] = useState(false);
  const [termsOk, setTermsOk] = useState(false);
  const [rightsOk, setRightsOk] = useState(false);

  const title = useMemo(() => {
    if (step === "language") return tr("chooseLanguage");
    if (step === "role") return tr("chooseRole");
    if (step === "phone" || step === "otp") return tr("phoneTitle");
    if (step === "profile") return lang === "ur" ? "پروفائل مکمل کریں" : "Complete your profile";
    return lang === "ur" ? "قانونی تصدیق" : "Legal acknowledgements";
  }, [step, tr, lang]);

  function pickLanguage(next: Lang) {
    setLang(next);
    setStep("role");
  }

  function submitPhone(event: FormEvent) {
    event.preventDefault();
    setError("");
    const normalized = normalizePkPhone(phone);
    if (!normalized) {
      setError(
        lang === "ur"
          ? "درست پاکستانی موبائل نمبر درج کریں (03XXXXXXXXX)"
          : "Enter a valid Pakistan mobile number (03XXXXXXXXX)",
      );
      return;
    }
    setPhone(normalized);
    setStep("otp");
  }

  function submitOtp(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (otp.trim() !== DEMO_OTP) {
      setError(lang === "ur" ? "غلط کوڈ" : "Incorrect code");
      return;
    }
    const existing = findUserByPhone(phone);
    if (existing) {
      login(existing);
      router.push("/dashboard");
      return;
    }
    setStep("profile");
  }

  function onPhotoChange(file?: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(String(reader.result));
    reader.readAsDataURL(file);
  }

  function submitProfile(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!fullName.trim() || !city.trim()) {
      setError(lang === "ur" ? "نام اور شہر ضروری ہیں" : "Name and city are required");
      return;
    }
    if (role === "worker" && !cnic.trim()) {
      setError(
        lang === "ur"
          ? "کارکن کے لیے شناختی کارڈ نمبر درکار ہے"
          : "Workers must enter a CNIC number",
      );
      return;
    }
    setStep("legal");
  }

  function finish() {
    if (!role || !ageOk || !termsOk || !rightsOk) {
      setError(
        lang === "ur"
          ? "تمام قانونی خانے چیک کریں"
          : "Please accept all legal acknowledgements",
      );
      return;
    }
    if (role === "worker" && !ageOk) return;

    const account: UserAccount = {
      id: uid(role === "worker" ? "w" : "h"),
      phone,
      lang,
      role,
      createdAt: new Date().toISOString(),
    };

    if (role === "worker") {
      account.worker = {
        fullName,
        city,
        category,
        experienceYears,
        expectedPay: expectedPay || "Negotiable",
        bio,
        languagesSpoken: lang === "ur" ? ["Urdu"] : ["English", "Urdu"],
        cnic,
        photoDataUrl,
        ageConfirmed18: true,
        verified: false,
        available: true,
      };
    } else {
      account.hirer = {
        fullName,
        city,
        organizationName: role === "company" ? organizationName : undefined,
        companyType: role === "company" ? companyType : undefined,
        needs: [category],
      };
    }

    login(account);
    router.push("/dashboard");
  }

  return (
    <div className="grain min-h-screen text-ink" dir={dir}>
      <SiteHeader />
      <main className="mx-auto max-w-xl px-5 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">
          {tr("join")}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-pine">
          {title}
        </h1>

        {step === "language" ? (
          <div className="mt-8 grid gap-3">
            <p className="text-sm text-ink-soft">{tr("languageHint")}</p>
            <button
              type="button"
              className="rounded-2xl border border-line bg-white p-5 text-left hover:border-leaf"
              onClick={() => pickLanguage("en")}
            >
              <p className="text-lg font-semibold text-pine">English</p>
              <p className="text-sm text-ink-soft">Continue in English</p>
            </button>
            <button
              type="button"
              className="rounded-2xl border border-line bg-white p-5 text-right hover:border-leaf"
              onClick={() => pickLanguage("ur")}
            >
              <p className="text-lg font-semibold text-pine">اردو</p>
              <p className="text-sm text-ink-soft">اردو میں جاری رکھیں</p>
            </button>
          </div>
        ) : null}

        {step === "role" ? (
          <div className="mt-8 grid gap-3">
            {(
              [
                ["worker", tr("roleWorker"), tr("roleWorkerHint")],
                ["household", tr("roleHousehold"), tr("roleHouseholdHint")],
                ["company", tr("roleCompany"), tr("roleCompanyHint")],
              ] as const
            ).map(([value, label, hint]) => (
              <button
                key={value}
                type="button"
                className="rounded-2xl border border-line bg-white p-5 text-start hover:border-leaf"
                onClick={() => {
                  setRole(value);
                  setStep("phone");
                }}
              >
                <p className="text-lg font-semibold text-pine">{label}</p>
                <p className="mt-1 text-sm text-ink-soft">{hint}</p>
              </button>
            ))}
          </div>
        ) : null}

        {step === "phone" ? (
          <form onSubmit={submitPhone} className="mt-8 grid gap-4">
            <p className="text-sm text-ink-soft">{tr("phoneHint")}</p>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="03XXXXXXXXX"
              className="rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-leaf/30"
              inputMode="tel"
              required
            />
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <button type="submit" className="btn-primary w-fit">
              {tr("sendOtp")}
            </button>
          </form>
        ) : null}

        {step === "otp" ? (
          <form onSubmit={submitOtp} className="mt-8 grid gap-4">
            <p className="text-sm text-ink-soft">
              Code sent to {phone}. {tr("demoOtp")}
            </p>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit code"
              className="rounded-2xl border border-line bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-leaf/30"
              inputMode="numeric"
              required
            />
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <button type="submit" className="btn-primary w-fit">
              {tr("verifyOtp")}
            </button>
          </form>
        ) : null}

        {step === "profile" ? (
          <form onSubmit={submitProfile} className="mt-8 grid gap-3">
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={lang === "ur" ? "پورا نام" : "Full name"}
              className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
            />
            <input
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={lang === "ur" ? "شہر" : "City"}
              className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
            />

            {role === "worker" ? (
              <>
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
                  type="number"
                  min={0}
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  placeholder="Years of experience"
                  className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
                />
                <input
                  value={expectedPay}
                  onChange={(e) => setExpectedPay(e.target.value)}
                  placeholder="Expected pay (e.g. Rs 30,000 / month)"
                  className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
                />
                <input
                  required
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  placeholder="CNIC (XXXXX-XXXXXXX-X)"
                  className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
                />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  placeholder="Short profile for households & companies"
                  className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
                />
                <label className="rounded-2xl border border-dashed border-line bg-white px-4 py-3 text-sm text-ink-soft">
                  Upload profile photo
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-2 block w-full text-xs"
                    onChange={(e) => onPhotoChange(e.target.files?.[0])}
                  />
                </label>
                {photoDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photoDataUrl}
                    alt="Preview"
                    className="h-28 w-28 rounded-2xl object-cover"
                  />
                ) : null}
              </>
            ) : null}

            {role === "company" ? (
              <>
                <input
                  required
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="Company / restaurant / office name"
                  className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
                />
                <select
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value as CompanyType)}
                  className="rounded-2xl border border-line bg-white px-4 py-3 text-sm"
                >
                  {Object.entries(companyTypeLabels).map(([id, labels]) => (
                    <option key={id} value={id}>
                      {labels[lang]}
                    </option>
                  ))}
                </select>
              </>
            ) : null}

            {role !== "worker" ? (
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
            ) : null}

            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <button type="submit" className="btn-primary w-fit">
              {tr("continue")}
            </button>
          </form>
        ) : null}

        {step === "legal" ? (
          <div className="mt-8 grid gap-4">
            <label className="flex gap-3 rounded-2xl border border-line bg-white p-4 text-sm">
              <input
                type="checkbox"
                checked={ageOk}
                onChange={(e) => setAgeOk(e.target.checked)}
              />
              <span>
                I confirm all workers on this account are 18+ and that child
                labour is prohibited under Pakistan law.
              </span>
            </label>
            <label className="flex gap-3 rounded-2xl border border-line bg-white p-4 text-sm">
              <input
                type="checkbox"
                checked={termsOk}
                onChange={(e) => setTermsOk(e.target.checked)}
              />
              <span>
                I agree to the{" "}
                <a className="underline" href="/legal/terms">
                  Terms
                </a>{" "}
                and{" "}
                <a className="underline" href="/legal/privacy">
                  Privacy Policy
                </a>
                . kaamSet is an intermediary; the hirer is the employer of
                record.
              </span>
            </label>
            <label className="flex gap-3 rounded-2xl border border-line bg-white p-4 text-sm">
              <input
                type="checkbox"
                checked={rightsOk}
                onChange={(e) => setRightsOk(e.target.checked)}
              />
              <span>
                I have read the{" "}
                <a className="underline" href="/legal/worker-rights">
                  Domestic worker rights
                </a>{" "}
                summary and understand commission is charged to hirers on
                successful hires (workers pay no placement fee).
              </span>
            </label>
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
            <button type="button" onClick={finish} className="btn-primary w-fit">
              {tr("save")}
            </button>
          </div>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
