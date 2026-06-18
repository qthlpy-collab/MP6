import { notFound } from "next/navigation";
import { KanjiDetailView } from "@/components/kanji-detail-view";
import { PageShell } from "@/components/page-shell";
import {
  getKanjiById,
  getLessonsByKanjiId,
  getVocabularyByKanjiId,
  kanjiBlocks,
} from "@/data/knowledge";

export function generateStaticParams() {
  return kanjiBlocks.map((kanji) => ({ kanjiId: kanji.id }));
}

export default async function KanjiDetailPage({ params }: { params: Promise<{ kanjiId: string }> }) {
  const { kanjiId } = await params;
  const kanji = getKanjiById(kanjiId);
  if (!kanji) notFound();

  return (
    <PageShell>
      <KanjiDetailView
        kanji={kanji}
        relatedVocabulary={getVocabularyByKanjiId(kanji.id)}
        relatedLessons={getLessonsByKanjiId(kanji.id)}
      />
    </PageShell>
  );
}
