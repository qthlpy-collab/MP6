"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUiLanguage } from "@/components/ui-language-provider";
import type { KanjiBlock, LessonBlock, VocabularyBlock } from "@/data/knowledge";

type LessonListItem = {
  lesson: LessonBlock;
  vocabulary: VocabularyBlock[];
  kanji: KanjiBlock[];
};

export function LessonsView({ items }: { items: LessonListItem[] }) {
  const { t } = useUiLanguage();

  return (
    <>
      <section className="mb-8">
        <p className="text-sm font-semibold text-pink-600">{t("knowledgeBlocks")}</p>
        <h1 className="text-gradient mt-3 text-4xl font-bold">{t("lessonMap")}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">{t("lessonMapDescription")}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {items.map(({ lesson, vocabulary, kanji }) => (
          <Card key={lesson.id}>
            <CardHeader>
              <CardTitle>{lesson.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{lesson.textbookSource}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-semibold text-primary">{t("vocabulary")}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {vocabulary.map((item) => item.word).join(" / ")}
              </p>
              <p className="mt-4 text-sm font-semibold text-primary">{t("kanji")}</p>
              <p className="mt-2 text-2xl font-bold">{kanji.map((item) => item.kanji).join(" ")}</p>
              <Button asChild className="mt-5 w-full">
                <Link href={`/lessons/${lesson.id}`}>
                  {t("viewLessonBlocks")}
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

export function LessonDetailView({
  lesson,
  vocabulary,
  kanji,
  kanjiByVocabulary,
}: {
  lesson: LessonBlock;
  vocabulary: VocabularyBlock[];
  kanji: KanjiBlock[];
  kanjiByVocabulary: Record<string, KanjiBlock[]>;
}) {
  const { t } = useUiLanguage();

  return (
    <>
      <section className="mb-8">
        <p className="text-sm font-semibold text-pink-600">{t("lessonKnowledgeMap")}</p>
        <h1 className="text-gradient mt-3 text-4xl font-bold">{lesson.title}</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          {t("source")}: {lesson.textbookSource}. {t("lessonKnowledgeMapDescription")}
        </p>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>{t("vocabularyBlocks")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {vocabulary.map((item) => (
              <div key={item.id} className="rounded-lg border border-blue-100 bg-blue-50/60 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-2xl font-bold">{item.word}</p>
                    <p className="text-sm font-semibold text-primary">{item.reading}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.meaning}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {kanjiByVocabulary[item.id]?.map((kanjiItem) => (
                      <Button key={`${item.id}-${kanjiItem.id}`} asChild variant="secondary" size="sm">
                        <Link href={`/kanji/${kanjiItem.id}`}>{kanjiItem.kanji}</Link>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("lessonKanjiBlocks")}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {kanji.map((item) => (
              <Link
                key={item.id}
                href={`/kanji/${item.id}`}
                className="rounded-lg border border-blue-100 bg-white p-4 transition hover:border-blue-200 hover:bg-blue-50/70"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-4xl font-bold text-primary">{item.kanji}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
