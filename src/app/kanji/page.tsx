import { KanjiLibraryView } from "@/components/kanji-library-view";
import { PageShell } from "@/components/page-shell";
import { kanjiBlocks, getLessonsByKanjiId, getVocabularyByKanjiId } from "@/data/knowledge";

export default function KanjiLibraryPage() {
  const items = kanjiBlocks.map((kanji) => ({
    kanji,
    relatedVocabulary: getVocabularyByKanjiId(kanji.id),
    relatedLessons: getLessonsByKanjiId(kanji.id),
  }));

  return (
    <PageShell>
      <KanjiLibraryView items={items} />
    </PageShell>
  );
}
