import type { GrammarPoint } from "@/types/grammar";
import grammarJson from "../../data/grammar.json";

export const grammarPoints = grammarJson as GrammarPoint[];

export function getGrammarPoint(id: string) {
  return grammarPoints.find((point) => point.id === id);
}
