export type GrammarExample = {
  japanese: string;
  reading: string;
  chinese: string;
};

export type GrammarQuiz = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type GrammarPoint = {
  id: string;
  level: "N5";
  lesson: number;
  kanaOrder: string;
  title: string;
  pattern: string;
  explanation: Record<LanguageCode, string>;
  examples: GrammarExample[];
  commonMistakes: string[];
  usage: string;
  quiz: GrammarQuiz;
};
import type { LanguageCode } from "@/data/languages";
