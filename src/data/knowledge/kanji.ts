import type { KanjiBlock } from "./types";

export const kanjiBlocks: KanjiBlock[] = [
  {
    id: "gaku",
    kanji: "学",
    onyomi: ["がく"],
    kunyomi: ["まなぶ"],
    meaning: "study, learning",
    chineseMeaning: "学习",
    familyWords: [
      { word: "学生", reading: "がくせい", meaning: "student" },
      { word: "学校", reading: "がっこう", meaning: "school" },
      { word: "大学", reading: "だいがく", meaning: "university" },
    ],
    similarKanji: [],
    phoneticFamily: [],
  },
  {
    id: "sei",
    kanji: "生",
    onyomi: ["せい", "しょう"],
    kunyomi: ["いきる", "うまれる"],
    meaning: "life, birth, student",
    chineseMeaning: "生；生命；学生",
    familyWords: [
      { word: "学生", reading: "がくせい", meaning: "student" },
      { word: "先生", reading: "せんせい", meaning: "teacher" },
      { word: "生まれる", reading: "うまれる", meaning: "to be born" },
    ],
    similarKanji: [],
    phoneticFamily: [],
    advancedPattern: {
      componentPatternFamily: [
        {
          baseComponent: "生",
          relatedKanji: [
            { kanji: "姓", reading: "せい", meaning: "surname", chineseMeaning: "姓" },
            { kanji: "性", reading: "せい", meaning: "nature / gender", chineseMeaning: "性质、性别" },
            { kanji: "星", reading: "せい / ほし", meaning: "star", chineseMeaning: "星星" },
            { kanji: "産", reading: "さん / うむ", meaning: "produce / give birth", chineseMeaning: "生产、出生" },
          ],
          note: "These kanji are useful for noticing how 生 can appear in kanji related to birth, nature, or life patterns.",
        },
      ],
      meaningComponentFamily: [
        {
          baseComponent: "生",
          relatedKanji: [
            { kanji: "生", reading: "せい / いきる", meaning: "life / birth", chineseMeaning: "生、生命" },
            { kanji: "産", reading: "さん / うむ", meaning: "produce / give birth", chineseMeaning: "生产、出生" },
            { kanji: "育", reading: "いく / そだつ", meaning: "raise / grow", chineseMeaning: "养育、成长" },
          ],
          note: "This group helps learners connect 生 with life, birth, and growth-related meanings.",
        },
      ],
      similarPronunciationWords: [
        {
          reading: "せい",
          words: [
            { word: "学生", reading: "がくせい", meaning: "student", chineseMeaning: "学生" },
            { word: "先生", reading: "せんせい", meaning: "teacher", chineseMeaning: "老师" },
          ],
          note: "These words contain similar pronunciation patterns and are useful for listening and kanji recognition.",
        },
      ],
    },
  },
  {
    id: "sen",
    kanji: "先",
    onyomi: ["せん"],
    kunyomi: ["さき"],
    meaning: "before, ahead",
    chineseMeaning: "先；前方",
    familyWords: [
      { word: "先生", reading: "せんせい", meaning: "teacher" },
      { word: "先月", reading: "せんげつ", meaning: "last month" },
      { word: "先週", reading: "せんしゅう", meaning: "last week" },
    ],
    similarKanji: [],
    phoneticFamily: [],
  },
  {
    id: "nichi",
    kanji: "日",
    onyomi: ["にち", "じつ"],
    kunyomi: ["ひ", "か"],
    meaning: "day, sun, Japan",
    chineseMeaning: "日；太阳；日本",
    familyWords: [
      { word: "日本", reading: "にほん", meaning: "Japan" },
      { word: "日曜日", reading: "にちようび", meaning: "Sunday" },
      { word: "今日", reading: "きょう", meaning: "today" },
    ],
    similarKanji: [],
    phoneticFamily: [],
    advancedPattern: {
      componentPatternFamily: [
        {
          baseComponent: "日",
          relatedKanji: [
            { kanji: "明", reading: "めい / あかるい", meaning: "bright", chineseMeaning: "明亮" },
            { kanji: "時", reading: "じ / とき", meaning: "time", chineseMeaning: "时间" },
            { kanji: "曜", reading: "よう", meaning: "weekday", chineseMeaning: "星期" },
            { kanji: "晴", reading: "せい / はれる", meaning: "clear weather", chineseMeaning: "晴天" },
          ],
          note: "These kanji include 日 and often connect to sun, time, days, or brightness.",
        },
      ],
      meaningComponentFamily: [
        {
          baseComponent: "日",
          relatedKanji: [
            { kanji: "日", reading: "にち / ひ", meaning: "day / sun", chineseMeaning: "日、太阳" },
            { kanji: "明", reading: "めい / あかるい", meaning: "bright", chineseMeaning: "明亮" },
            { kanji: "昨", reading: "さく", meaning: "previous day", chineseMeaning: "昨天、过去" },
            { kanji: "曜", reading: "よう", meaning: "weekday", chineseMeaning: "星期" },
          ],
          note: "Kanji containing 日 are often related to day, time, sun, brightness, or calendar expressions.",
        },
      ],
      similarPronunciationWords: [
        {
          reading: "にち",
          words: [
            { word: "日曜日", reading: "にちようび", meaning: "Sunday", chineseMeaning: "星期日" },
            { word: "一日", reading: "いちにち", meaning: "one day", chineseMeaning: "一天" },
            { word: "毎日", reading: "まいにち", meaning: "every day", chineseMeaning: "每天" },
          ],
          note: "These words share the にち reading and often appear in date or calendar expressions.",
        },
        {
          reading: "に",
          words: [
            { word: "日本", reading: "にほん", meaning: "Japan", chineseMeaning: "日本" },
          ],
          note: "日本 uses a shortened reading pattern that learners should recognize early.",
        },
      ],
    },
  },
  {
    id: "hon",
    kanji: "本",
    onyomi: ["ほん"],
    kunyomi: ["もと"],
    meaning: "book, origin, main",
    chineseMeaning: "书；本；根本",
    familyWords: [
      { word: "日本", reading: "にほん", meaning: "Japan" },
      { word: "本", reading: "ほん", meaning: "book" },
      { word: "本屋", reading: "ほんや", meaning: "bookstore" },
    ],
    similarKanji: [],
    phoneticFamily: [],
  },
  {
    id: "kou",
    kanji: "校",
    onyomi: ["こう"],
    kunyomi: [],
    meaning: "school",
    chineseMeaning: "学校",
    familyWords: [
      { word: "学校", reading: "がっこう", meaning: "school" },
      { word: "高校", reading: "こうこう", meaning: "high school" },
      { word: "校長", reading: "こうちょう", meaning: "school principal" },
    ],
    similarKanji: [],
    phoneticFamily: [],
  },
  {
    id: "kokoro",
    kanji: "心",
    onyomi: ["しん"],
    kunyomi: ["こころ"],
    meaning: "heart, mind",
    chineseMeaning: "心；内心",
    familyWords: [
      { word: "安心", reading: "あんしん", meaning: "relief / peace of mind" },
      { word: "心配", reading: "しんぱい", meaning: "worry" },
      { word: "中心", reading: "ちゅうしん", meaning: "center" },
    ],
    similarKanji: [],
    phoneticFamily: [],
    advancedPattern: {
      componentPatternFamily: [
        {
          baseComponent: "心 / 忄",
          relatedKanji: [
            { kanji: "思", reading: "し / おもう", meaning: "think", chineseMeaning: "思考、想" },
            { kanji: "忘", reading: "ぼう / わすれる", meaning: "forget", chineseMeaning: "忘记" },
            { kanji: "急", reading: "きゅう / いそぐ", meaning: "hurry", chineseMeaning: "急、赶快" },
            { kanji: "情", reading: "じょう", meaning: "emotion", chineseMeaning: "感情" },
          ],
          note: "心 can appear at the bottom or as 忄 on the side, creating a visible component pattern.",
        },
      ],
      meaningComponentFamily: [
        {
          baseComponent: "心 / 忄",
          relatedKanji: [
            { kanji: "愛", reading: "あい", meaning: "love", chineseMeaning: "爱" },
            { kanji: "怒", reading: "ど / おこる", meaning: "anger", chineseMeaning: "怒、生气" },
            { kanji: "怨", reading: "えん / うらむ", meaning: "resentment", chineseMeaning: "怨恨" },
            { kanji: "思", reading: "し / おもう", meaning: "think", chineseMeaning: "思考、想" },
            { kanji: "悪", reading: "あく / わるい", meaning: "bad", chineseMeaning: "坏、恶" },
          ],
          note: "Kanji containing 心 or 忄 are often related to emotion, mind, or mental state.",
        },
      ],
      similarPronunciationWords: [
        {
          reading: "しん",
          words: [
            { word: "安心", reading: "あんしん", meaning: "relief / peace of mind", chineseMeaning: "安心" },
            { word: "中心", reading: "ちゅうしん", meaning: "center", chineseMeaning: "中心" },
            { word: "心配", reading: "しんぱい", meaning: "worry", chineseMeaning: "担心" },
          ],
          note: "These words help learners connect 心 with the しん sound in common vocabulary.",
        },
      ],
    },
  },
];
