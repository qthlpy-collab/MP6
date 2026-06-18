import { notFound } from "next/navigation";
import { LessonDetailView } from "@/components/lessons-view";
import { PageShell } from "@/components/page-shell";
import {
  getKanjiByIds,
  getLessonById,
  getVocabularyByIds,
  lessonBlocks,
} from "@/data/knowledge";

export function generateStaticParams() {
  return lessonBlocks.map((lesson) => ({ lessonId: lesson.id }));
}

export default async function LessonDetailPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);
  if (!lesson) notFound();

  const vocabulary = getVocabularyByIds(lesson.vocabularyIds);
  const kanjiByVocabulary = Object.fromEntries(
    vocabulary.map((item) => [item.id, getKanjiByIds(item.kanjiIds)]),
  );

  return (
    <PageShell>
      <LessonDetailView
        lesson={lesson}
        vocabulary={vocabulary}
        kanji={getKanjiByIds(lesson.kanjiIds)}
        kanjiByVocabulary={kanjiByVocabulary}
      />
    </PageShell>
  );
}
