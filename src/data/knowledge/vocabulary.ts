import type { VocabularyBlock } from "./types";

export const vocabularyBlocks: VocabularyBlock[] = [
  {
    id: "gakusei",
    word: "学生",
    reading: "がくせい",
    meaning: "student",
    chineseMeaning: "学生",
    kanjiIds: ["gaku", "sei"],
    lessonIds: ["lesson-1"],
  },
  {
    id: "sensei",
    word: "先生",
    reading: "せんせい",
    meaning: "teacher",
    chineseMeaning: "老师",
    kanjiIds: ["sen", "sei"],
    lessonIds: ["lesson-1"],
  },
  {
    id: "nihon",
    word: "日本",
    reading: "にほん",
    meaning: "Japan",
    chineseMeaning: "日本",
    kanjiIds: ["nichi", "hon"],
    lessonIds: ["lesson-1"],
  },
  {
    id: "gakkou",
    word: "学校",
    reading: "がっこう",
    meaning: "school",
    chineseMeaning: "学校",
    kanjiIds: ["gaku", "kou"],
    lessonIds: ["lesson-1"],
  },
];
