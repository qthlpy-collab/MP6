export const availableLanguages = [
  { code: "ja", label: "Japanese", shortLabel: "JA" },
  { code: "zh", label: "Chinese", shortLabel: "ZH" },
  { code: "en", label: "English", shortLabel: "EN" },
] as const;

export type LanguageCode = (typeof availableLanguages)[number]["code"];
