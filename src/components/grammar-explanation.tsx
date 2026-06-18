"use client";

import type { GrammarPoint } from "@/types/grammar";
import { availableLanguages } from "@/data/languages";
import { useExplanationLanguages } from "@/components/language-explanation-selector";

export function GrammarExplanation({
  explanation,
  compact = false,
}: {
  explanation: GrammarPoint["explanation"];
  compact?: boolean;
}) {
  const { selectedLanguages } = useExplanationLanguages();

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      {availableLanguages
        .filter((language) => selectedLanguages.includes(language.code))
        .map((language) => (
          <div
            key={language.code}
            className={
              compact
                ? "text-sm leading-6 text-muted-foreground"
                : "rounded-lg border border-blue-100 bg-white/70 p-4"
            }
          >
            <span className="mr-2 text-xs font-semibold uppercase text-primary">{language.shortLabel}</span>
            <span className={compact ? "" : "leading-8"}>{explanation[language.code]}</span>
          </div>
        ))}
    </div>
  );
}
