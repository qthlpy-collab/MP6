"use client";

import { useUiLanguage } from "@/components/ui-language-provider";

export function ListeningIntro() {
  const { t } = useUiLanguage();

  return (
    <section className="mb-8 max-w-3xl">
      <p className="text-sm font-semibold text-pink-600">{t("listeningTitle")}</p>
      <h1 className="text-gradient mt-3 text-4xl font-bold tracking-normal md:text-5xl">
        {t("listeningSubtitle")}
      </h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        Use this classroom tool to generate short listening sessions, play Japanese audio, and reveal
        answers when needed.
      </p>
    </section>
  );
}
