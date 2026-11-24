"use client";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useApp } from "@/context/AppContext";

export default function WorkerRightsPage() {
  const { dir } = useApp();

  return (
    <div className="grain min-h-screen text-ink" dir={dir}>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-pine">
          Domestic worker rights (Pakistan)
        </h1>
        <p className="mt-3 text-sm text-ink-soft">
          Plain-language summary for kaamSet users. This is not legal advice.
          Rules can differ by province and workplace type — get local counsel for
          commercial operations.
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink-soft">
          <section className="rounded-3xl border border-line bg-white p-5">
            <h2 className="font-semibold text-pine">Age & child labour</h2>
            <p className="mt-2">
              Workers on kaamSet must be 18+. Pakistan law prohibits child labour
              in hazardous and many domestic settings. Hirers must not engage
              minors through this platform.
            </p>
          </section>

          <section className="rounded-3xl border border-line bg-white p-5">
            <h2 className="font-semibold text-pine">Identity</h2>
            <p className="mt-2">
              CNIC details support verification badges and safer matching.
              Identity documents should be handled carefully and only for lawful
              employment checks.
            </p>
          </section>

          <section className="rounded-3xl border border-line bg-white p-5">
            <h2 className="font-semibold text-pine">Written terms</h2>
            <p className="mt-2">
              Before work starts, households and companies should agree pay,
              hours, rest days, duties, live-in/out arrangements, notice period,
              and who provides meals/transport. kaamSet offers optional contract
              packs to support this practice.
            </p>
          </section>

          <section className="rounded-3xl border border-line bg-white p-5">
            <h2 className="font-semibold text-pine">
              Islamabad Capital Territory note
            </h2>
            <p className="mt-2">
              The Islamabad Capital Territory Domestic Workers Act, 2022 sets
              registration and rights expectations for domestic workers in ICT.
              Other provinces may have different frameworks. Business hirers
              (restaurants, offices, hotels) may also have separate labour
              obligations.
            </p>
          </section>

          <section className="rounded-3xl border border-line bg-white p-5">
            <h2 className="font-semibold text-pine">Platform role</h2>
            <p className="mt-2">
              kaamSet connects parties and may charge hirers commission on
              successful hires, plus optional paid upgrades. kaamSet is not the
              employer. Workers are not charged placement fees. Abuse,
              trafficking indicators, or wage theft reports should be escalated
              to authorities.
            </p>
          </section>

          <section className="rounded-3xl border border-line bg-mist/80 p-5">
            <h2 className="font-semibold text-pine">Before commercial launch</h2>
            <ul className="mt-2 list-disc space-y-1 ps-5">
              <li>Lawyer review of terms, privacy, and commission model</li>
              <li>Real OTP provider + secure database (not browser storage)</li>
              <li>Payment gateway with Pakistan tax invoices</li>
              <li>Complaint / dispute workflow and content moderation</li>
              <li>Clear provincial coverage disclosures</li>
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
