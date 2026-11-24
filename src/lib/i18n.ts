import type { Lang } from "@/lib/types";

const dict = {
  brand: { en: "kaamSet", ur: "کام سیٹ" },
  tagline: {
    en: "Domestic & household work, hired the fair way.",
    ur: "گھریلو اور ہاؤس ہولڈ کام، منصفانہ طریقے سے۔",
  },
  heroTitle: {
    en: "Hire trusted domestic help for homes and workplaces.",
    ur: "گھر اور کام کی جگہوں کے لیے قابلِ اعتماد گھریلو مدد حاصل کریں۔",
  },
  heroBody: {
    en: "Workers join with a phone number. Households, restaurants, and offices hire with clear pay, written agreements, and Pakistan-first safeguards.",
    ur: "کارکن فون نمبر سے اکاؤنٹ بناتے ہیں۔ گھر، ریستوران اور دفاتر واضح تنخواہ، تحریری معاہدے اور پاکستان کے قانونی تحفظات کے ساتھ ہائر کرتے ہیں۔",
  },
  browseWorkers: { en: "Browse workers", ur: "کارکن دیکھیں" },
  postJob: { en: "Post a job ad", ur: "نوکری کا اشتہار" },
  join: { en: "Create account", ur: "اکاؤنٹ بنائیں" },
  login: { en: "Log in", ur: "لاگ اِن" },
  pricing: { en: "Pricing", ur: "قیمتیں" },
  dashboard: { en: "Dashboard", ur: "ڈیش بورڈ" },
  jobs: { en: "Job ads", ur: "نوکریاں" },
  legal: { en: "Legal", ur: "قانونی" },
  chooseLanguage: {
    en: "Choose your language",
    ur: "اپنی زبان منتخب کریں",
  },
  languageHint: {
    en: "You can change this later in your dashboard.",
    ur: "آپ بعد میں ڈیش بورڈ سے زبان بدل سکتے ہیں۔",
  },
  chooseRole: { en: "How will you use kaamSet?", ur: "آپ کام سیٹ کیسے استعمال کریں گے؟" },
  roleWorker: { en: "I am a worker", ur: "میں کارکن ہوں" },
  roleWorkerHint: {
    en: "Create a profile with your phone number and get hired for domestic work.",
    ur: "فون نمبر سے پروفائل بنائیں اور گھریلو کام کے لیے ہائر ہوں۔",
  },
  roleHousehold: { en: "I am hiring for a household", ur: "میں گھر کے لیے ہائر کر رہا/رہی ہوں" },
  roleHouseholdHint: {
    en: "Find housekeepers, cooks, cleaners, caregivers, and drivers.",
    ur: "گھریلو ملازم، باورچی، صفائی، نگہداشت اور ڈرائیور تلاش کریں۔",
  },
  roleCompany: { en: "I am hiring for a company", ur: "میں کمپنی کے لیے ہائر کر رہا/رہی ہوں" },
  roleCompanyHint: {
    en: "Restaurants, offices, hotels, and other workplaces.",
    ur: "ریستوران، دفاتر، ہوٹل اور دیگر کام کی جگہیں۔",
  },
  phoneTitle: { en: "Verify with your phone", ur: "فون سے تصدیق کریں" },
  phoneHint: {
    en: "Pakistan mobile numbers only (+92). We send a one-time code.",
    ur: "صرف پاکستانی موبائل نمبرز (+92)۔ ایک بار کا کوڈ بھیجا جاتا ہے۔",
  },
  sendOtp: { en: "Send code", ur: "کوڈ بھیجیں" },
  verifyOtp: { en: "Verify & continue", ur: "تصدیق کریں" },
  demoOtp: {
    en: "Demo code: 123456",
    ur: "ڈیمو کوڈ: 123456",
  },
  services: { en: "Services", ur: "خدمات" },
  how: { en: "How it works", ur: "طریقہ کار" },
  earn: { en: "How kaamSet earns", ur: "کام سیٹ کی آمدنی" },
  compliance: { en: "Pakistan compliance", ur: "پاکستان قانونی تقاضے" },
  logout: { en: "Log out", ur: "لاگ آؤٹ" },
  continue: { en: "Continue", ur: "آگے بڑھیں" },
  save: { en: "Save profile", ur: "پروفائل محفوظ کریں" },
  hire: { en: "Request hire", ur: "ہائر کی درخواست" },
  commissionNote: {
    en: "Successful hires include an 8% platform commission charged to the hirer.",
    ur: "کامیاب ہائر پر ہائرر سے 8% پلیٹ فارم کمیشن لیا جاتا ہے۔",
  },
  noPlacementFee: {
    en: "Workers are never charged a placement fee to get a job.",
    ur: "کارکنوں سے نوکری ملنے پر کوئی پلیسمنٹ فیس نہیں لی جاتی۔",
  },
} as const;

export type DictKey = keyof typeof dict;

export function t(lang: Lang, key: DictKey): string {
  return dict[key][lang];
}

export const categoryLabels: Record<
  string,
  { en: string; ur: string }
> = {
  housekeeping: { en: "Housekeeping", ur: "گھریلو کام" },
  cooks: { en: "Cooks", ur: "باورچی" },
  cleaners: { en: "Cleaners", ur: "صفائی" },
  care: { en: "Caregivers", ur: "نگہداشت" },
  drivers: { en: "Drivers", ur: "ڈرائیور" },
  laundry: { en: "Laundry help", ur: "لانڈری مدد" },
  gardeners: { en: "Gardeners", ur: "مالی" },
};

export const companyTypeLabels: Record<string, { en: string; ur: string }> = {
  restaurant: { en: "Restaurant", ur: "ریستوران" },
  office: { en: "Office", ur: "دفتر" },
  hotel: { en: "Hotel", ur: "ہوٹل" },
  hospital: { en: "Hospital / clinic", ur: "ہسپتال / کلینک" },
  school: { en: "School", ur: "اسکول" },
  other: { en: "Other workplace", ur: "دیگر" },
};
