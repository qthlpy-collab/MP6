export type ListeningMode = "single-number" | "number-string" | "phrase";

export type ListeningTrainingItem = {
  id: string;
  mode: ListeningMode;
  audioText: string;
  answer: string;
  kanaAnswer: string;
};

export const numberKanaMap: Record<string, string> = {
  "0": "ゼロ",
  "1": "いち",
  "2": "に",
  "3": "さん",
  "4": "よん",
  "5": "ご",
  "6": "ろく",
  "7": "しち",
  "8": "はち",
  "9": "きゅう",
  "10": "じゅう",
};

export const singleNumberItems: ListeningTrainingItem[] = Array.from({ length: 11 }, (_, index) => {
  const value = String(index);
  return {
    id: `single-number-${value}`,
    mode: "single-number",
    audioText: numberKanaMap[value],
    answer: value,
    kanaAnswer: numberKanaMap[value],
  };
});

export const singleNumberIntervals = [0.5, 1, 1.5, 2] as const;
export const numberStringLengths = [4, 6, 8, 10, 11] as const;
export const groupPauses = [1, 1.5, 2] as const;
export const endPauses = [3, 5, 8] as const;
