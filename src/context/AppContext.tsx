"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang, UserAccount } from "@/lib/types";
import {
  ensureSeedData,
  getPreferredLang,
  getSessionUser,
  setPreferredLang,
  setSession,
  upsertUser,
} from "@/lib/storage";
import { t, type DictKey } from "@/lib/i18n";

type AppContextValue = {
  ready: boolean;
  lang: Lang;
  setLang: (lang: Lang) => void;
  user: UserAccount | null;
  refreshUser: () => void;
  login: (user: UserAccount) => void;
  logout: () => void;
  saveAccount: (user: UserAccount) => void;
  tr: (key: DictKey) => string;
  dir: "ltr" | "rtl";
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [lang, setLangState] = useState<Lang>("en");
  const [user, setUser] = useState<UserAccount | null>(null);

  useEffect(() => {
    ensureSeedData();
    const preferred = getPreferredLang();
    setLangState(preferred);
    document.documentElement.lang = preferred === "ur" ? "ur" : "en";
    document.documentElement.dir = preferred === "ur" ? "rtl" : "ltr";
    setUser(getSessionUser());
    setReady(true);
  }, []);

  const value = useMemo<AppContextValue>(() => {
    return {
      ready,
      lang,
      setLang: (next) => {
        setLangState(next);
        setPreferredLang(next);
        document.documentElement.lang = next === "ur" ? "ur" : "en";
        document.documentElement.dir = next === "ur" ? "rtl" : "ltr";
      },
      user,
      refreshUser: () => setUser(getSessionUser()),
      login: (account) => {
        const saved = upsertUser(account);
        setSession(saved.id);
        setUser(saved);
        setLangState(saved.lang);
        setPreferredLang(saved.lang);
      },
      logout: () => {
        setSession(null);
        setUser(null);
      },
      saveAccount: (account) => {
        const saved = upsertUser(account);
        setSession(saved.id);
        setUser(saved);
      },
      tr: (key) => t(lang, key),
      dir: lang === "ur" ? "rtl" : "ltr",
    };
  }, [ready, lang, user]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
