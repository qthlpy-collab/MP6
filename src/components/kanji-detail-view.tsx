"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KanjiStrokeOrder } from "@/components/kanji-stroke-order";
import { useUiLanguage } from "@/components/ui-language-provider";
import type {
  AdvancedKanjiEntry,
  AdvancedWordEntry,
  KanjiBlock,
  LessonBlock,
  VocabularyBlock,
} from "@/data/knowledge";

export function KanjiDetailView({
  kanji,
  relatedVocabulary,
  relatedLessons,
}: {
  kanji: KanjiBlock;
  relatedVocabulary: VocabularyBlock[];
  relatedLessons: LessonBlock[];
}) {
  const { t } = useUiLanguage();

  return (
    <>
      <div className="mb-6">
        <Button asChild variant="ghost">
          <Link href="/kanji">
            <ArrowLeft className="h-4 w-4" />
            {t("backToKanjiLibrary")}
          </Link>
        </Button>
      </div>

      <section className="relative mb-6 overflow-hidden rounded-lg border border-blue-100 bg-white/95 p-6 shadow-soft">
        <div className="brand-gradient absolute inset-x-0 top-0 h-1" />
        <p className="text-sm font-semibold text-pink-600">{t("kanjiKnowledgeBlock")}</p>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-6">
          <div>
            <h1 className="text-gradient text-7xl font-bold">{kanji.kanji}</h1>
            <p className="mt-4 text-xl font-semibold text-primary">{kanji.meaning}</p>
            <p className="mt-1 text-muted-foreground">{kanji.chineseMeaning}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {relatedLessons.map((lesson) => (
              <Badge key={lesson.id} className="border-blue-200 bg-blue-50 text-primary">
                {lesson.title}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Level 1 {t("basicRecognition")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-pink-50 p-8 text-center text-8xl font-bold text-primary">
              {kanji.kanji}
            </div>
            <InfoRow label={t("onyomi")} value={kanji.onyomi.join(" / ") || "Coming soon"} />
            <InfoRow label={t("kunyomi")} value={kanji.kunyomi.join(" / ") || "Coming soon"} />
            <InfoRow label={t("english")} value={kanji.meaning} />
            <InfoRow label={t("chinese")} value={kanji.chineseMeaning} />
            <KanjiStrokeOrder
              character={kanji.kanji}
              missingText="筆順データが見つかりません"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Level 2 {t("wordExpansion")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <section>
              <h2 className="text-sm font-semibold text-primary">{t("lessonVocabulary")}</h2>
              <div className="mt-3 space-y-2">
                {relatedVocabulary.map((vocabulary) => (
                  <div key={vocabulary.id} className="rounded-md border border-blue-100 bg-blue-50/60 p-3">
                    <p className="font-semibold">{vocabulary.word}</p>
                    <p className="text-sm text-muted-foreground">
                      {vocabulary.reading} / {vocabulary.meaning} / {vocabulary.chineseMeaning}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-sm font-semibold text-primary">{t("familyWords")}</h2>
              <div className="mt-3 space-y-2">
                {kanji.familyWords.map((familyWord) => (
                  <div
                    key={`${kanji.id}-${familyWord.word}`}
                    className="rounded-md border border-pink-100 bg-pink-50/70 p-3"
                  >
                    <p className="font-semibold">{familyWord.word}</p>
                    <p className="text-sm text-muted-foreground">
                      {familyWord.reading} / {familyWord.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Level 3 {t("patternDistinction")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {kanji.advancedPattern ? (
              <>
                <AdvancedKanjiFamilySection
                  title={t("componentPatternFamily")}
                  families={kanji.advancedPattern.componentPatternFamily}
                />
                <AdvancedKanjiFamilySection
                  title={t("meaningComponentFamily")}
                  families={kanji.advancedPattern.meaningComponentFamily}
                />
                <SimilarPronunciationSection groups={kanji.advancedPattern.similarPronunciationWords} />
              </>
            ) : (
              <div className="rounded-lg border border-dashed border-blue-200 bg-blue-50/60 p-4 text-sm text-muted-foreground">
                {t("advancedPatternComingSoon")}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

function AdvancedKanjiFamilySection({
  title,
  families,
}: {
  title: string;
  families: Array<{ baseComponent: string; relatedKanji: AdvancedKanjiEntry[]; note: string }>;
}) {
  const { t } = useUiLanguage();

  return (
    <section>
      <h2 className="text-sm font-semibold text-primary">{title}</h2>
      <div className="mt-3 space-y-3">
        {families.length ? (
          families.map((family) => (
            <div key={`${title}-${family.baseComponent}`} className="rounded-lg border border-blue-100 bg-blue-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("baseComponent")}
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">{family.baseComponent}</p>
              <KanjiEntryGrid entries={family.relatedKanji} />
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{family.note}</p>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-blue-200 bg-blue-50/60 p-4 text-sm text-muted-foreground">
            {t("advancedPatternComingSoon")}
          </div>
        )}
      </div>
    </section>
  );
}

function SimilarPronunciationSection({ groups }: { groups: Array<{ reading: string; words: AdvancedWordEntry[]; note: string }> }) {
  const { t } = useUiLanguage();

  return (
    <section>
      <h2 className="text-sm font-semibold text-primary">{t("similarPronunciationWords")}</h2>
      <div className="mt-3 space-y-3">
        {groups.length ? (
          groups.map((group) => (
            <div key={group.reading} className="rounded-lg border border-pink-100 bg-pink-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Reading</p>
              <p className="mt-1 text-2xl font-bold text-primary">{group.reading}</p>
              <WordEntryList entries={group.words} />
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{group.note}</p>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-blue-200 bg-blue-50/60 p-4 text-sm text-muted-foreground">
            {t("advancedPatternComingSoon")}
          </div>
        )}
      </div>
    </section>
  );
}

function KanjiEntryGrid({ entries }: { entries: AdvancedKanjiEntry[] }) {
  return (
    <div className="mt-3 grid gap-2">
      {entries.map((entry) => (
        <div key={`${entry.kanji}-${entry.reading}`} className="rounded-md border border-white/80 bg-white/85 p-3">
          <div className="flex items-start gap-3">
            <p className="text-3xl font-bold text-primary">{entry.kanji}</p>
            <div>
              <p className="text-sm font-semibold">{entry.reading}</p>
              <p className="text-sm text-muted-foreground">
                {entry.meaning} / {entry.chineseMeaning}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function WordEntryList({ entries }: { entries: AdvancedWordEntry[] }) {
  return (
    <div className="mt-3 space-y-2">
      {entries.map((entry) => (
        <div key={`${entry.word}-${entry.reading}`} className="rounded-md border border-white/80 bg-white/85 p-3">
          <p className="font-semibold">{entry.word}</p>
          <p className="text-sm text-muted-foreground">
            {entry.reading} / {entry.meaning} / {entry.chineseMeaning}
          </p>
        </div>
      ))}
    </div>
  );
}
