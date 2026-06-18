export type PracticeVocabulary = {
  id: number;
  level: "N4" | "N5";
  word: string;
  reading: string;
  meaningCn: string;
  meaningEn: string;
  partOfSpeech: string;
  topic: string;
  exampleJp: string;
  exampleEn: string;
  collocationHint: string;
};

export const practiceVocabulary: PracticeVocabulary[] = [
  {
    id: 1,
    level: "N5",
    word: "食べる",
    reading: "たべる",
    meaningCn: "吃",
    meaningEn: "to eat",
    partOfSpeech: "verb",
    topic: "food",
    exampleJp: "私はパンを食べます。",
    exampleEn: "I eat bread.",
    collocationHint: "食べる usually takes を for the object.",
  },
  {
    id: 2,
    level: "N5",
    word: "飲む",
    reading: "のむ",
    meaningCn: "喝",
    meaningEn: "to drink",
    partOfSpeech: "verb",
    topic: "food",
    exampleJp: "水を飲みます。",
    exampleEn: "I drink water.",
    collocationHint: "Use 飲む with drinks such as 水、お茶、コーヒー.",
  },
  {
    id: 3,
    level: "N5",
    word: "行く",
    reading: "いく",
    meaningCn: "去",
    meaningEn: "to go",
    partOfSpeech: "verb",
    topic: "movement",
    exampleJp: "学校へ行きます。",
    exampleEn: "I go to school.",
    collocationHint: "A destination is commonly marked with へ or に.",
  },
  {
    id: 4,
    level: "N5",
    word: "学校",
    reading: "がっこう",
    meaningCn: "学校",
    meaningEn: "school",
    partOfSpeech: "noun",
    topic: "school",
    exampleJp: "私は学校へ行きます。",
    exampleEn: "I go to school.",
    collocationHint: "学校 is often paired with 行く.",
  },
  {
    id: 5,
    level: "N4",
    word: "必要",
    reading: "ひつよう",
    meaningCn: "必要",
    meaningEn: "necessary",
    partOfSpeech: "na-adjective / noun",
    topic: "daily",
    exampleJp: "日本語の勉強には練習が必要です。",
    exampleEn: "Practice is necessary for studying Japanese.",
    collocationHint: "Use 必要です or 必要があります.",
  },
  {
    id: 6,
    level: "N4",
    word: "説明",
    reading: "せつめい",
    meaningCn: "说明，解释",
    meaningEn: "explanation",
    partOfSpeech: "noun / suru-verb",
    topic: "school",
    exampleJp: "先生が文法を説明します。",
    exampleEn: "The teacher explains the grammar.",
    collocationHint: "説明 can become a verb with する.",
  },
  {
    id: 7,
    level: "N5",
    word: "見る",
    reading: "みる",
    meaningCn: "看",
    meaningEn: "to see / to watch",
    partOfSpeech: "verb",
    topic: "daily",
    exampleJp: "テレビを見ます。",
    exampleEn: "I watch TV.",
    collocationHint: "見る usually takes を for the object.",
  },
  {
    id: 8,
    level: "N4",
    word: "練習",
    reading: "れんしゅう",
    meaningCn: "练习",
    meaningEn: "practice",
    partOfSpeech: "noun / suru-verb",
    topic: "school",
    exampleJp: "毎日発音を練習します。",
    exampleEn: "I practice pronunciation every day.",
    collocationHint: "練習 can become a verb with する.",
  },
];
