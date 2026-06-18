import type { KanaCode } from "@/types/learning";

export const kanaCodes: KanaCode[] = [
  { kana: "あ", romaji: "a", codeWord: "Apple", imageSrc: "/images/kana/a.png", imageHint: "Apple", color: "bg-red-100" },
  { kana: "い", romaji: "i", codeWord: "Ink", imageSrc: "/images/kana/i.png", imageHint: "Ink", color: "bg-sky-100" },
  { kana: "う", romaji: "u", codeWord: "Umbrella", imageSrc: "/images/kana/u.png", imageHint: "Umbrella", color: "bg-zinc-100" },
  { kana: "え", romaji: "e", codeWord: "Egg", imageSrc: "/images/kana/e.png", imageHint: "Egg", color: "bg-yellow-100" },
  { kana: "お", romaji: "o", codeWord: "Orange", imageSrc: "/images/kana/o.png", imageHint: "Orange", color: "bg-orange-100" },
  { kana: "か", romaji: "ka", codeWord: "Kangaroo", imageSrc: "/images/kana/ka.png", imageHint: "Kangaroo", color: "bg-stone-100" },
  { kana: "き", romaji: "ki", codeWord: "King", imageSrc: "/images/kana/ki.png", imageHint: "King", color: "bg-amber-100" },
  { kana: "く", romaji: "ku", codeWord: "Cookie / Kung fu", imageSrc: "/images/kana/ku.png", imageHint: "Cookie / Kung fu", color: "bg-rose-100" },
  { kana: "け", romaji: "ke", codeWord: "Kettle", imageSrc: "/images/kana/ke.png", imageHint: "Kettle", color: "bg-orange-100" },
  { kana: "こ", romaji: "ko", codeWord: "Koala", imageSrc: "/images/kana/ko.png", imageHint: "Koala", color: "bg-lime-100" },
  { kana: "さ", romaji: "sa", codeWord: "Sand timer / Sun", imageSrc: "/images/kana/sa.png", imageHint: "Sand timer / Sun", color: "bg-cyan-100" },
  { kana: "し", romaji: "shi", codeWord: "Ship", imageSrc: "/images/kana/shi.png", imageHint: "Ship", color: "bg-lime-100" },
  { kana: "す", romaji: "su", codeWord: "Suit", imageSrc: "/images/kana/su.png", imageHint: "Suit", color: "bg-slate-100" },
  { kana: "せ", romaji: "se", codeWord: "Seashell", imageSrc: "/images/kana/se.png", imageHint: "Seashell", color: "bg-emerald-100" },
  { kana: "そ", romaji: "so", codeWord: "Soap", imageSrc: "/images/kana/so.png", imageHint: "Soap", color: "bg-sky-100" },
  { kana: "た", romaji: "ta", codeWord: "Tiger", imageSrc: "/images/kana/ta.png", imageHint: "Tiger", color: "bg-indigo-100" },
  { kana: "ち", romaji: "chi", codeWord: "Chicken", imageSrc: "/images/kana/chi.png", imageHint: "Chicken", color: "bg-yellow-100" },
  { kana: "つ", romaji: "tsu", codeWord: "Tsunami", imageSrc: "/images/kana/tsu.png", imageHint: "Tsunami", color: "bg-blue-100" },
  { kana: "て", romaji: "te", codeWord: "Teddy bear", imageSrc: "/images/kana/te.png", imageHint: "Teddy bear", color: "bg-purple-100" },
  { kana: "と", romaji: "to", codeWord: "Tomato / Tooth", imageSrc: "/images/kana/to.png", imageHint: "Tomato / Tooth", color: "bg-red-100" },
  { kana: "ど", romaji: "do", codeWord: "Tomato + Caterpillar", imageSrc: "/images/kana/to.png", imageHint: "Tomato + Caterpillar", color: "bg-orange-100" },
  { kana: "ば", romaji: "ba", codeWord: "Hat + Caterpillar", imageSrc: "/images/kana/ha.png", imageHint: "Hat + Caterpillar", color: "bg-yellow-100" },
  { kana: "や", romaji: "ya", codeWord: "Yarn", imageSrc: "/images/kana/ya.png", imageHint: "Yarn", color: "bg-teal-100" },
  { kana: "ゆ", romaji: "yu", codeWord: "Yukata", imageSrc: "/images/kana/yu.png", imageHint: "Yukata", color: "bg-blue-100" },
  { kana: "よ", romaji: "yo", codeWord: "Yo-yo", imageSrc: "/images/kana/yo.png", imageHint: "Yo-yo", color: "bg-cyan-100" },
  { kana: "ょ", romaji: "small yo", codeWord: "Yo-yo", imageSrc: "/images/kana/yo.png", imageHint: "Yo-yo", color: "bg-cyan-100" },
  { kana: "ら", romaji: "ra", codeWord: "Rabbit", imageSrc: "/images/kana/ra.png", imageHint: "Rabbit", color: "bg-red-100" },
  { kana: "り", romaji: "ri", codeWord: "Ring", imageSrc: "/images/kana/ri.png", imageHint: "Ring", color: "bg-amber-100" },
  { kana: "る", romaji: "ru", codeWord: "Ruby", imageSrc: "/images/kana/ru.png", imageHint: "Ruby", color: "bg-slate-100" },
  { kana: "れ", romaji: "re", codeWord: "Refrigerator", imageSrc: "/images/kana/re.png", imageHint: "Refrigerator", color: "bg-zinc-100" },
  { kana: "ろ", romaji: "ro", codeWord: "Robot", imageSrc: "/images/kana/ro.png", imageHint: "Robot", color: "bg-neutral-100" },
  { kana: "ん", romaji: "n", codeWord: "Nose", imageSrc: "/images/kana/n.png", imageHint: "Nose", color: "bg-neutral-100" },
  { kana: "が", romaji: "ga", codeWord: "Kangaroo + Caterpillar", imageSrc: "/images/kana/ka.png", imageHint: "Kangaroo + Caterpillar", color: "bg-stone-100" }
];

export function getKanaCode(kana: string) {
  return kanaCodes.find((item) => item.kana === kana);
}
