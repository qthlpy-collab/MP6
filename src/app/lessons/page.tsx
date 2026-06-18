import { LessonsView } from "@/components/lessons-view";
import { PageShell } from "@/components/page-shell";
import { getKanjiByIds, getVocabularyByIds, lessonBlocks } from "@/data/knowledge";

export default function LessonsPage() {
  const items = lessonBlocks.map((lesson) => ({
    lesson,
    vocabulary: getVocabularyByIds(lesson.vocabularyIds),
    kanji: getKanjiByIds(lesson.kanjiIds),
  }));

  return (
    <PageShell>
      <LessonsView items={items} />
    </PageShell>
  );
}
