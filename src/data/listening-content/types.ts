export type ListeningContentDifficulty = "word" | "chunk" | "sentence" | "dialogue";

export type ListeningContentCategory =
  | "numbers-single"
  | "numbers-double"
  | "numbers-triple"
  | "numbers-sentence"
  | "number-string-4"
  | "number-string-6"
  | "number-string-8"
  | "number-string-10"
  | "phone-numbers"
  | "time"
  | "dates"
  | "weekdays"
  | "money"
  | "shopping"
  | "places"
  | "people"
  | "objects"
  | "verbs";

export type ListeningContentItem = {
  id: string;
  category: ListeningContentCategory;
  audioText: string;
  answer: string;
  kanaAnswer: string;
  difficulty: ListeningContentDifficulty;
};
