export const availableLanguages = [
  { code: "ja", label: "日本語", shortLabel: "JA" },
  { code: "zh", label: "中文", shortLabel: "ZH" },
  { code: "en", label: "English", shortLabel: "EN" },
] as const;

export type LanguageCode = (typeof availableLanguages)[number]["code"];
