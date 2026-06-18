import { dateContent } from "@/data/listening-content/dates";
import { moneyContent } from "@/data/listening-content/money";
import { numberContent } from "@/data/listening-content/numbers";
import { objectContent } from "@/data/listening-content/objects";
import { peopleContent } from "@/data/listening-content/people";
import { placeContent } from "@/data/listening-content/places";
import { shoppingContent } from "@/data/listening-content/shopping";
import { timeContent } from "@/data/listening-content/time";
import type {
  ListeningContentCategory,
  ListeningContentDifficulty,
  ListeningContentItem,
} from "@/data/listening-content/types";
import { verbContent } from "@/data/listening-content/verbs";
import { weekdayContent } from "@/data/listening-content/weekdays";

export type { ListeningContentCategory, ListeningContentDifficulty, ListeningContentItem };

export const listeningContentLibrary: ListeningContentItem[] = [
  ...numberContent,
  ...timeContent,
  ...dateContent,
  ...weekdayContent,
  ...moneyContent,
  ...shoppingContent,
  ...placeContent,
  ...peopleContent,
  ...objectContent,
  ...verbContent,
];

export function getListeningContentByCategory(category: ListeningContentCategory) {
  return listeningContentLibrary.filter((item) => item.category === category);
}
