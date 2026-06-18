import { kanjiBlocks } from "./kanji";
import { lessonBlocks } from "./lessons";
import type { KanjiBlock, LessonBlock, VocabularyBlock } from "./types";
import { vocabularyBlocks } from "./vocabulary";

export { kanjiBlocks, lessonBlocks, vocabularyBlocks };
export type {
  AdvancedKanjiEntry,
  AdvancedWordEntry,
  KanjiBlock,
  KanjiFamilyWord,
  LessonBlock,
  VocabularyBlock,
} from "./types";

export function getLessonById(id: string): LessonBlock | undefined {
  return lessonBlocks.find((lesson) => lesson.id === id);
}

export function getVocabularyById(id: string): VocabularyBlock | undefined {
  return vocabularyBlocks.find((vocabulary) => vocabulary.id === id);
}

export function getVocabularyByIds(ids: string[]): VocabularyBlock[] {
  return ids.map(getVocabularyById).filter((item): item is VocabularyBlock => Boolean(item));
}

export function getKanjiById(id: string): KanjiBlock | undefined {
  return kanjiBlocks.find((kanji) => kanji.id === id);
}

export function getKanjiByIds(ids: string[]): KanjiBlock[] {
  return ids.map(getKanjiById).filter((item): item is KanjiBlock => Boolean(item));
}

export function getVocabularyByKanjiId(kanjiId: string): VocabularyBlock[] {
  return vocabularyBlocks.filter((vocabulary) => vocabulary.kanjiIds.includes(kanjiId));
}

export function getLessonsByKanjiId(kanjiId: string): LessonBlock[] {
  return lessonBlocks.filter((lesson) => lesson.kanjiIds.includes(kanjiId));
}

export function getLessonsByVocabularyId(vocabularyId: string): LessonBlock[] {
  return lessonBlocks.filter((lesson) => lesson.vocabularyIds.includes(vocabularyId));
}
