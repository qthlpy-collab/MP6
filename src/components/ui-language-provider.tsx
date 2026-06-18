"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getUiText, type UiLanguage, type UiTextKey } from "@/lib/i18n";

type UiLanguageContextValue = {
  language: UiLanguage;
  setLanguage: (language: UiLanguage) => void;
  t: (key: UiTextKey) => string;
};

const UiLanguageContext = createContext<UiLanguageContextValue | null>(null);

export function UiLanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<UiLanguage>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("ui-language");
    if (savedLanguage === "en" || savedLanguage === "ja") {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (nextLanguage: UiLanguage) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("ui-language", nextLanguage);
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: UiTextKey) => getUiText(language, key),
    }),
    [language],
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
