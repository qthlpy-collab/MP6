import { getKanaCode } from "@/data/kana-codes";
import type { LearningWord, Quiz, Word } from "@/types/learning";
import wordsJson from "../../data/words.json";

const rawWords = wordsJson as Word[];

function makeQuizzes(word: Word): Quiz[] {
  return [
    {
      type: "choose_kana",
      question: `「${word.word}」の読み方はどれですか。`,
      options: [word.kana, "あした", "せんせい", "たべる"].filter(
        (option, index, options) => options.indexOf(option) === index,
      ),
      answer: word.kana,
      explanation: `${word.word} is read as ${word.kana}.`,
    },
    {
      type: "choose_meaning",
      question: `What does 「${word.word}」 mean?`,
      options: [word.meaningEn, "to study", "teacher", "tomorrow"].filter(
        (option, index, options) => options.indexOf(option) === index,
      ),
      answer: word.meaningEn,
      explanation: `${word.word} means ${word.meaningEn}.`,
    },
  ];
}

function enhanceWord(word: Word): LearningWord {
  const kanaSplit = Array.from(word.kana);
  const codeSplit = kanaSplit.map((kana) => ({
    kana,
    codeWord: getKanaCode(kana)?.codeWord ?? kana,
  }));
  const firstExample = word.examples[0];
  const kanjiCharacters = Array.from(word.word).filter((character) => /[\u3400-\u9fff]/u.test(character));

  return {
    ...word,
    kanji: word.word,
    zh: word.meaningCn,
    en: word.meaningEn,
    example: firstExample?.japanese ?? "",
    exampleZh: firstExample?.chinese ?? "",
    kanaSplit,
    codeSplit,
    originalStory: word.story,
    hasAnimation: word.hasVideo,
    kanjiInfo: kanjiCharacters.map((character) => ({
      character,
      english: word.meaningEn,
      breakdown: "Kanji component details coming soon.",
      strokeHint: "",
    })),
    exercises: [],
    quizzes: makeQuizzes(word),
  };
}

export const words: LearningWord[] = rawWords.map(enhanceWord);

export function getWord(id: string) {
  return words.find((word) => word.id === id);
}
