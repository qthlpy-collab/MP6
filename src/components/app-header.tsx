"use client";

import Link from "next/link";
import { BookOpenText, Dumbbell, FileText, Grid3X3, Headphones, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UiLanguageSwitcher } from "@/components/ui-language-switcher";
import { useUiLanguage } from "@/components/ui-language-provider";

export function AppHeader() {
  const { t } = useUiLanguage();

  return (
    <header className="sticky top-0 z-20 border-b border-ink/8 bg-[#fbf8f1]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-serif text-xl font-black text-white shadow-sm">
            日
          </div>
          <div>
            <p className="text-sm font-black tracking-tight text-ink">NIHONGO STUDIO</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-vermilion">Learn · Remember · Use</p>
          </div>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <BookOpenText className="h-4 w-4" />
                {t("vocabulary")}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/practice">
                <Dumbbell className="h-4 w-4" />
                Practice
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/grammar">
                <Languages className="h-4 w-4" />
                {t("grammar")}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/reading">
                <FileText className="h-4 w-4" />
                {t("reading")}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/listening">
                <Headphones className="h-4 w-4" />
                {t("listening")}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/kanji">
                <BookOpenText className="h-4 w-4" />
                {t("kanji")}
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/kana">
                <Grid3X3 className="h-4 w-4" />
                {t("kana")}
              </Link>
            </Button>
          </nav>
          <UiLanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
