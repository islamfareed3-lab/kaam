/** Platform revenue model for kaamSet (PKR). Commission is charged to the hirer on successful hire. Workers are not charged placement fees. */

export const COMMISSION_RATE = 0.08; // 8% of agreed monthly/pay amount when hire completes

export const products = {
  verifiedBadge: {
    id: "verified",
    nameEn: "Verified profile",
    nameUr: "تصدیق شدہ پروفائل",
    priceLabel: "Rs 499 / month",
    amount: 499,
    blurbEn:
      "CNIC check badge, higher search rank, and trust signal for households and companies.",
    blurbUr:
      "شناختی کارڈ تصدیق، بہتر سرچ رینک، اور گھر و کمپنیوں کے لیے اعتماد کا نشان۔",
  },
  featuredListing: {
    id: "featured",
    nameEn: "Featured listing",
    nameUr: "نمایاں فہرست",
    priceLabel: "Rs 799 / week",
    amount: 799,
    blurbEn: "Appear at the top of browse results in your city and category.",
    blurbUr: "اپنے شہر اور زمرے میں تلاش کے نتائج میں سب سے اوپر آئیں۔",
  },
  jobAd: {
    id: "job-ad",
    nameEn: "Job advertisement",
    nameUr: "نوکری کا اشتہار",
    priceLabel: "Rs 1,499 / 14 days",
    amount: 1499,
    blurbEn:
      "Publish a household or company role to verified domestic workers.",
    blurbUr: "تصدیق شدہ گھریلو کارکنوں کے لیے نوکری پوسٹ کریں۔",
  },
  companyPlan: {
    id: "company-plan",
    nameEn: "Business hiring plan",
    nameUr: "کاروباری ہائرنگ پلان",
    priceLabel: "Rs 4,999 / month",
    amount: 4999,
    blurbEn:
      "For restaurants, offices, and hotels: unlimited job ads, priority matching, invoice-ready receipts.",
    blurbUr:
      "ریستوران، دفاتر اور ہوٹلز کے لیے: لامحدود اشتہارات، ترجیحی میچنگ، انوائس رسیدیں۔",
  },
  urgentBoost: {
    id: "urgent",
    nameEn: "Urgent hire boost",
    nameUr: "فوری ہائر بوسٹ",
    priceLabel: "Rs 699 / request",
    amount: 699,
    blurbEn: "Push your open role to available workers via SMS/WhatsApp alerts.",
    blurbUr: "دستیاب کارکنوں کو ایس ایم ایس / واٹس ایپ الرٹ بھیجیں۔",
  },
  backgroundAssist: {
    id: "background",
    nameEn: "Background-check assist",
    nameUr: "بیک گراؤنڈ چیک معاونت",
    priceLabel: "Rs 999 / check",
    amount: 999,
    blurbEn:
      "Guided CNIC + reference checklist before you confirm a hire (you remain the employer).",
    blurbUr:
      "ہائر کی تصدیق سے پہلے شناختی کارڈ اور ریفرنس چیک لسٹ (آپ ہی آجر رہتے ہیں)۔",
  },
  contractPack: {
    id: "contracts",
    nameEn: "Written contract pack",
    nameUr: "تحریری معاہدہ پیک",
    priceLabel: "Rs 299 / hire",
    amount: 299,
    blurbEn:
      "Urdu/English domestic-work agreement template aligned with Pakistan good practice.",
    blurbUr:
      "پاکستان کے بہترین طریقوں کے مطابق اردو/انگریزی گھریلو کام کا معاہدہ۔",
  },
} as const;

export function estimateCommission(payText: string): number {
  const digits = payText.replace(/[^\d]/g, "");
  const value = Number(digits || "0");
  if (!value) return 0;
  return Math.round(value * COMMISSION_RATE);
}
