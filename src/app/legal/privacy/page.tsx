"use client";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useApp } from "@/context/AppContext";

export default function PrivacyPage() {
  const { dir } = useApp();

  return (
    <div className="grain min-h-screen text-ink" dir={dir}>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-pine">
          Privacy policy
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-soft">
          <p>
            kaamSet collects account data needed to operate the marketplace:
            phone number, language preference, role, profile details, CNIC for
            verification products, photos you upload, hire requests, and payment
            records for paid products.
          </p>
          <p>
            We use this information to authenticate users, show profiles and job
            ads, calculate commission on successful hires, prevent fraud and child
            labour risks, and improve the service. We do not sell personal data.
          </p>
          <p>
            This demo stores data in your browser (localStorage). A production
            launch should use secured servers in an appropriate jurisdiction,
            encrypted transport, access controls, and retention limits consistent
            with Pakistan law and PECA-related obligations.
          </p>
          <p>
            You may request correction or deletion of account data by contacting
            support once production contact channels are live. Hirers and workers
            remain responsible for any personal data they exchange offline.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
