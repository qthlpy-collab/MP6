export type ExplanationLanguage = "ja" | "zh" | "en";

export type LocalizedText = Partial<Record<ExplanationLanguage, string>>;

export type VocabularyItem = {
  surface: string;
  reading: string;
  partOfSpeech: string;
  meanings: LocalizedText;
};

export type GrammarItem = {
  pattern: string;
  explanations: LocalizedText;
};

export type SimilarExample = {
  japanese: string;
  translations: LocalizedText;
};

export type SentenceAnalysis = {
  sentence: string;
  explanations: LocalizedText;
  vocabulary: VocabularyItem[];
  grammar: GrammarItem[];
  similarExamples: SimilarExample[];
};
