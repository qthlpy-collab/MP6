"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUiLanguage } from "@/components/ui-language-provider";
import type { KanjiBlock, LessonBlock, VocabularyBlock } from "@/data/knowledge";

type KanjiLibraryItem = {
  kanji: KanjiBlock;
  relatedVocabulary: VocabularyBlock[];
  relatedLessons: LessonBlock[];
};

export function KanjiLibraryView({ items }: { items: KanjiLibraryItem[] }) {
  const { t } = useUiLanguage();

  return (
    <>
      <section className="mb-8">
        <p className="text-sm font-semibold text-pink-600">N5 {t("knowledgeBlocks")}</p>
        <h1 className="text-gradient mt-3 text-4xl font-bold">{t("kanjiLibrary")}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{t("kanjiLibraryDescription")}</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ kanji, relatedVocabulary, relatedLessons }) => (
          <Card
            key={kanji.id}
            className="group transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(37,99,235,0.13)]"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-5xl transition-colors group-hover:text-primary">
                  {kanji.kanji}
                </CardTitle>
                <Badge className="border-blue-200 bg-blue-50 text-primary">
                  {relatedLessons.length} lesson
                </Badge>
              </div>
              <p className="text-sm font-semibold text-primary">{kanji.onyomi.join(" / ")}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{kanji.meaning}</p>
              <p className="mt-1 text-sm text-muted-foreground">{kanji.chineseMeaning}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {relatedVocabulary.map((vocabulary) => (
                  <span
                    key={`${kanji.id}-${vocabulary.id}`}
                    className="rounded-md border border-pink-100 bg-pink-50 px-2 py-1 text-xs font-semibold text-pink-700"
                  >
                    {vocabulary.word}
                  </span>
                ))}
              </div>
              <Button asChild className="mt-5 w-full">
                <Link href={`/kanji/${kanji.id}`}>
                  {t("viewKanjiBlock")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
