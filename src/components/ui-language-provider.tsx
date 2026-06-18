"use client";

import { createContext, useContext, useMemo } from "react";
import { getUiText, type UiLanguage, type UiTextKey } from "@/lib/i18n";

type UiLanguageContextValue = {
  language: UiLanguage;
  setLanguage: (language: UiLanguage) => void;
  t: (key: UiTextKey) => string;
};

const UiLanguageContext = createContext<UiLanguageContextValue | null>(null);

export function UiLanguageProvider({ children }: { children: React.ReactNode }) {
  const language: UiLanguage = "en";

  const setLanguage = () => {};

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: UiTextKey) => getUiText(language, key),
    }),
    [],
  );

  return <UiLanguageContext.Provider value={value}>{children}</UiLanguageContext.Provider>;
}

export function useUiLanguage() {
  const context = useContext(UiLanguageContext);
  if (!context) {
    throw new Error("useUiLanguage must be used within UiLanguageProvider");
  }
  return context;
}
