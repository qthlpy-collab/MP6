"use client";

import { useUiLanguage } from "@/components/ui-language-provider";

export function UiLanguageSwitcher() {
  const { language, setLanguage, t } = useUiLanguage();

  return (
    <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
      <span>{t("language")}</span>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value === "ja" ? "ja" : "en")}
        className="rounded-md border border-blue-100 bg-white px-2 py-1 text-sm font-semibold text-foreground shadow-sm"
        aria-label={t("language")}
      >
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>
    </label>
  );
}
