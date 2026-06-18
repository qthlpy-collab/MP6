export type KanaCode = {
  kana: string;
  romaji: string;
  codeWord: string;
  imageSrc: string;
  imageHint: string;
  color: string;
};

export type Exercise = {
  question: string;
  choices: string[];
  answer: string;
};

export type ExampleSentence = {
  japanese: string;
  furigana: string;
  english: string;
  chinese: string;
};

export type Quiz = {
  type: "choose_kana" | "choose_meaning" | "fill_blank" | "choose_word";
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type KanjiInfo = {
  character: string;
  english: string;
  breakdown: string;
  strokeHint: string;
};

export type Word = {
  id: string;
  level: "N5";
  lesson: number;
  word: string;
  kana: string;
  romaji: string;
  meaningCn: string;
  meaningEn: string;
  examples: ExampleSentence[];
  memoryTitle: string;
  memorySummary: string;
  story: string;
  imagePath: string;
  videoPath: string;
  hasImage: boolean;
  hasVideo: boolean;
};

export type LearningWord = Word & {
  kanji: string;
  zh: string;
  en: string;
  example: string;
  exampleZh: string;
  kanaSplit: string[];
  codeSplit: {
    kana: string;
    codeWord: string;
  }[];
  originalStory: string;
  hasAnimation: boolean;
  kanjiInfo: KanjiInfo[];
  exercises: Exercise[];
  quizzes: Quiz[];
};
