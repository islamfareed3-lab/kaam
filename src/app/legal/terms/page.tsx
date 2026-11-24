"use client";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useApp } from "@/context/AppContext";

export default function TermsPage() {
  const { dir } = useApp();

  return (
    <div className="grain min-h-screen text-ink" dir={dir}>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-12 prose-like">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-pine">
          Terms of use
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
          <p>
            kaamSet provides an online marketplace that helps households and
            companies discover domestic and household workers in Pakistan. kaamSet
            is an intermediary only. The hirer is the employer of record for any
            engagement formed through the platform.
          </p>
          <p>
            Workers must be 18 years or older. Accounts require a Pakistan mobile
            number. Providing false CNIC details, posting illegal work, or
            facilitating child labour is prohibited and may result in account
            removal and referral to authorities.
          </p>
          <p>
            Successful hires may incur platform commission payable by the hirer,
            as disclosed at the time of the hire request. Optional paid products
            (verified badges, featured listings, job advertisements, business
            plans, contract packs, and related services) are billed separately.
            Workers are not charged a placement fee for obtaining work.
          </p>
          <p>
            Users agree to comply with applicable Pakistan federal and provincial
            labour, anti-trafficking, and data laws. Written employment terms
            between hirer and worker are strongly recommended before work starts.
          </p>
          <p>
            These terms are a product draft for the kaamSet MVP and should be
            reviewed by a Pakistan-qualified lawyer before commercial launch.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
