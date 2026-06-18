import { numberKanaMap } from "@/data/listening-data";
import type { ListeningContentItem } from "@/data/listening-content/types";

export const numberContent: ListeningContentItem[] = [
  ...makeNumberRange("numbers-single", 0, 10, "word"),
  ...makeNumberRange("numbers-double", 11, 99, "word"),
  ...makeNumberRange("numbers-triple", 100, 999, "word"),
  ...makeDigitStrings("number-string-4", ["1234", "5678", "2026", "3141"], "chunk"),
  ...makeDigitStrings("number-string-6", ["123456", "654321", "202608", "314159"], "chunk"),
  ...makeDigitStrings("number-string-8", ["12345678", "87654321", "20260608", "31415926"], "chunk"),
  ...makeDigitStrings("number-string-10", ["0901234567", "0802468135", "0705555012", "0909876543"], "chunk"),
  ...makePhoneNumbers(),
  ...makeNumberSentences(),
];

function makeNumberRange(
  category: ListeningContentItem["category"],
  min: number,
  max: number,
  difficulty: ListeningContentItem["difficulty"],
) {
  return Array.from({ length: max - min + 1 }, (_, index) => {
    const value = min + index;
    const answer = String(value);
    const kanaAnswer = numberToKana(value);

    return {
      id: `${category}-${answer}`,
      category,
      audioText: kanaAnswer,
      answer,
      kanaAnswer,
      difficulty,
    };
  });
}

function makePhoneNumbers(): ListeningContentItem[] {
  const values = [
    "090-1234-5678",
    "080-2468-1357",
    "070-5555-0123",
    "090-9876-5432",
    "080-1111-2222",
    "070-3333-4444",
    "090-2026-0608",
    "080-3141-5926",
    "070-8080-9090",
    "090-0000-1111",
  ];

  return values.map((answer, index) => ({
    id: `phone-number-${index + 1}`,
    category: "phone-numbers",
    audioText: answerToKana(answer),
    answer,
    kanaAnswer: answerToKana(answer),
    difficulty: "chunk",
  }));
}

function makeNumberSentences(): ListeningContentItem[] {
  return [
    {
      id: "number-sentence-1",
      category: "numbers-sentence",
      audioText: "りんごをみっつかいます。",
      answer: "りんごを3つ買います。",
      kanaAnswer: "りんごをみっつかいます。",
      difficulty: "sentence",
    },
    {
      id: "number-sentence-2",
      category: "numbers-sentence",
      audioText: "ろくじにかえります。",
      answer: "6時に帰ります。",
      kanaAnswer: "ろくじにかえります。",
      difficulty: "sentence",
    },
  ];
}

function makeDigitStrings(
  category: ListeningContentItem["category"],
  values: string[],
  difficulty: ListeningContentItem["difficulty"],
): ListeningContentItem[] {
  return values.map((value, index) => ({
    id: `${category}-${index + 1}`,
    category,
    audioText: answerToKana(formatNumberString(value)),
    answer: formatNumberString(value),
    kanaAnswer: answerToKana(formatNumberString(value)),
    difficulty,
  }));
}

function formatNumberString(value: string) {
  if (value.length === 11) return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
  if (value.length === 10) return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
  if (value.length === 8) return `${value.slice(0, 4)}-${value.slice(4)}`;
  if (value.length === 6) return `${value.slice(0, 3)}-${value.slice(3)}`;
  return value;
}

function answerToKana(answer: string) {
  return answer
    .split("")
    .map((character) => (character === "-" ? "・" : numberKanaMap[character]))
    .join("");
}

function numberToKana(value: number): string {
  if (value <= 10) return numberKanaMap[String(value)];
  if (value < 100) return twoDigitToKana(value);
  return threeDigitToKana(value);
}

function twoDigitToKana(value: number): string {
  const tens = Math.floor(value / 10);
  const ones = value % 10;
  const tensText = tens === 1 ? "じゅう" : `${numberKanaMap[String(tens)]}じゅう`;

  return ones === 0 ? tensText : `${tensText}${numberKanaMap[String(ones)]}`;
}

function threeDigitToKana(value: number): string {
  const hundreds = Math.floor(value / 100);
  const rest = value % 100;
  const hundredsText =
    {
      1: "ひゃく",
      3: "さんびゃく",
      6: "ろっぴゃく",
      8: "はっぴゃく",
    }[hundreds] ?? `${numberKanaMap[String(hundreds)]}ひゃく`;

  return rest === 0 ? hundredsText : `${hundredsText}${twoDigitToKana(rest)}`;
}
