export type LessonBlock = {
  id: string;
  title: string;
  textbookSource: string;
  vocabularyIds: string[];
  grammarIds: string[];
  kanjiIds: string[];
  listeningIds: string[];
  readingIds: string[];
};

export type VocabularyBlock = {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  chineseMeaning: string;
  kanjiIds: string[];
  lessonIds: string[];
};

export type KanjiFamilyWord = {
  word: string;
  reading: string;
  meaning: string;
};

export type AdvancedKanjiEntry = {
  kanji: string;
  reading: string;
  meaning: string;
  chineseMeaning: string;
};

export type AdvancedWordEntry = {
  word: string;
  reading: string;
  meaning: string;
  chineseMeaning: string;
};

export type ComponentPatternFamily = {
  baseComponent: string;
  relatedKanji: AdvancedKanjiEntry[];
  note: string;
};

export type MeaningComponentFamily = {
  baseComponent: string;
  relatedKanji: AdvancedKanjiEntry[];
  note: string;
};

export type SimilarPronunciationWordGroup = {
  reading: string;
  words: AdvancedWordEntry[];
  note: string;
};

export type KanjiAdvancedPattern = {
  componentPatternFamily: ComponentPatternFamily[];
  meaningComponentFamily: MeaningComponentFamily[];
  similarPronunciationWords: SimilarPronunciationWordGroup[];
};

export type KanjiBlock = {
  id: string;
  kanji: string;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  chineseMeaning: string;
  familyWords: KanjiFamilyWord[];
  similarKanji: string[];
  phoneticFamily: string[];
  advancedPattern?: KanjiAdvancedPattern;
};
