import type { HireRequest, JobAd, Lang, UserAccount } from "@/lib/types";
import { seedJobs, seedWorkers } from "@/lib/seed";

const KEYS = {
  session: "kaamset_session_id",
  users: "kaamset_users",
  jobs: "kaamset_jobs",
  hires: "kaamset_hires",
  lang: "kaamset_lang",
} as const;

function canUseStorage() {
  return typeof window !== "undefined";
}

function read<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getPreferredLang(): Lang {
  return read<Lang>(KEYS.lang, "en");
}

export function setPreferredLang(lang: Lang) {
  if (!canUseStorage()) return;
  localStorage.setItem(KEYS.lang, lang);
}

export function ensureSeedData() {
  if (!canUseStorage()) return;
  const users = read<UserAccount[]>(KEYS.users, []);
  if (users.length === 0) {
    write(KEYS.users, seedWorkers);
  }
  const jobs = read<JobAd[]>(KEYS.jobs, []);
  if (jobs.length === 0) {
    write(KEYS.jobs, seedJobs);
  }
}

export function listUsers(): UserAccount[] {
  ensureSeedData();
  return read<UserAccount[]>(KEYS.users, []);
}

export function saveUsers(users: UserAccount[]) {
  write(KEYS.users, users);
}

export function upsertUser(user: UserAccount) {
  const users = listUsers();
  const idx = users.findIndex((u) => u.id === user.id || u.phone === user.phone);
  if (idx >= 0) users[idx] = { ...users[idx], ...user, id: users[idx].id };
  else users.push(user);
  saveUsers(users);
  return users.find((u) => u.phone === user.phone)!;
}

export function findUserByPhone(phone: string) {
  return listUsers().find((u) => u.phone === phone);
}

export function getSessionUser(): UserAccount | null {
  if (!canUseStorage()) return null;
  const id = localStorage.getItem(KEYS.session);
  if (!id) return null;
  return listUsers().find((u) => u.id === id) ?? null;
}

export function setSession(userId: string | null) {
  if (!canUseStorage()) return;
  if (!userId) localStorage.removeItem(KEYS.session);
  else localStorage.setItem(KEYS.session, userId);
}

export function listWorkers() {
  return listUsers().filter((u) => u.role === "worker" && u.worker);
}

export function listJobs(): JobAd[] {
  ensureSeedData();
  return read<JobAd[]>(KEYS.jobs, []);
}

export function saveJobs(jobs: JobAd[]) {
  write(KEYS.jobs, jobs);
}

export function addJob(job: JobAd) {
  const jobs = listJobs();
  jobs.unshift(job);
  saveJobs(jobs);
}

export function listHires(): HireRequest[] {
  return read<HireRequest[]>(KEYS.hires, []);
}

export function saveHires(hires: HireRequest[]) {
  write(KEYS.hires, hires);
}

export function addHire(hire: HireRequest) {
  const hires = listHires();
  hires.unshift(hire);
  saveHires(hires);
}

export function updateHire(id: string, patch: Partial<HireRequest>) {
  const hires = listHires();
  const idx = hires.findIndex((h) => h.id === id);
  if (idx < 0) return;
  hires[idx] = { ...hires[idx], ...patch };
  saveHires(hires);
}

export function normalizePkPhone(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  let national = digits;
  if (national.startsWith("92")) national = national.slice(2);
  if (national.startsWith("0")) national = national.slice(1);
  if (!/^3\d{9}$/.test(national)) return null;
  return `+92${national}`;
}

export function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
