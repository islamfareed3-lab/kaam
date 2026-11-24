export type Lang = "en" | "ur";

export type AccountRole = "worker" | "household" | "company";

export type CompanyType =
  | "restaurant"
  | "office"
  | "hotel"
  | "hospital"
  | "school"
  | "other";

export type ServiceCategory =
  | "housekeeping"
  | "cooks"
  | "cleaners"
  | "care"
  | "drivers"
  | "laundry"
  | "gardeners";

export type WorkerProfile = {
  fullName: string;
  city: string;
  category: ServiceCategory;
  experienceYears: number;
  expectedPay: string;
  bio: string;
  languagesSpoken: string[];
  cnic: string;
  photoDataUrl?: string;
  ageConfirmed18: boolean;
  verified: boolean;
  featuredUntil?: string;
  available: boolean;
};

export type HirerProfile = {
  fullName: string;
  city: string;
  organizationName?: string;
  companyType?: CompanyType;
  needs: ServiceCategory[];
};

export type UserAccount = {
  id: string;
  phone: string;
  lang: Lang;
  role: AccountRole;
  createdAt: string;
  worker?: WorkerProfile;
  hirer?: HirerProfile;
};

export type JobAd = {
  id: string;
  ownerId: string;
  title: string;
  category: ServiceCategory;
  city: string;
  pay: string;
  description: string;
  hirerType: "household" | "company";
  organizationName?: string;
  createdAt: string;
  expiresAt: string;
  featured: boolean;
  status: "active" | "filled" | "expired";
};

export type HireRequest = {
  id: string;
  workerId: string;
  hirerId: string;
  workerName: string;
  hirerName: string;
  category: ServiceCategory;
  city: string;
  proposedPay: string;
  message: string;
  status: "pending" | "accepted" | "completed" | "cancelled";
  commissionRate: number;
  commissionAmount?: number;
  createdAt: string;
  completedAt?: string;
};
