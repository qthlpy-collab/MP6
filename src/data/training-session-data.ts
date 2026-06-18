import {
  getListeningContentByCategory,
  type ListeningContentCategory,
  type ListeningContentItem,
} from "@/data/listening-content";
import type { ListeningMode, ListeningTrainingItem } from "@/data/listening-data";

export type TrainingTopic =
  | "number-speed"
  | "time-speed"
  | "date-speed"
  | "weekday-speed"
  | "money-speed"
  | "shopping-scene"
  | "place-nouns"
  | "people-nouns"
  | "object-nouns"
  | "verb-speed";
export type TrainingDuration = 5 | 10 | 15;
export type TrainingLevel = "word" | "chunk" | "sentence";

export type TrainingStage = {
  id: string;
  title: string;
  description: string;
  itemMode: ListeningMode;
  questionCount: number;
  category: ListeningContentCategory;
  level: TrainingLevel;
};

export type TrainingQuestion = ListeningTrainingItem & {
  stageId: string;
  stageTitle: string;
  order: number;
};

export type TrainingSession = {
  id: string;
  topic: TrainingTopic;
  topicTitle: string;
  durationMinutes: TrainingDuration;
  level: TrainingLevel;
  levelLabel: string;
  stages: TrainingStage[];
  questions: TrainingQuestion[];
  totalQuestions: number;
};

export const trainingTopics: Array<{ value: TrainingTopic; label: string }> = [
  { value: "number-speed", label: "Number Recognition" },
  { value: "time-speed", label: "Time Recognition" },
  { value: "date-speed", label: "Date Recognition" },
  { value: "weekday-speed", label: "Weekday Recognition" },
  { value: "money-speed", label: "Money Recognition" },
  { value: "shopping-scene", label: "Shopping Scenarios" },
  { value: "place-nouns", label: "Place Nouns" },
  { value: "people-nouns", label: "People Nouns" },
  { value: "object-nouns", label: "Object Nouns" },
  { value: "verb-speed", label: "Verb Recognition" },
];

export const trainingDurations: TrainingDuration[] = [5, 10, 15];

export const trainingLevels: Array<{ value: TrainingLevel; label: string }> = [
  { value: "word", label: "Word" },
  { value: "chunk", label: "Chunk" },
  { value: "sentence", label: "Sentence" },
];

const numberSpeedPresets: Record<TrainingDuration, Record<TrainingLevel, TrainingStage[]>> = {
  5: {
    word: [
      makeStage("single", "Single-digit Training", "Quick recognition from 0–10", 10, "numbers-single", "single-number", "word"),
      makeStage("double", "Two-digit Training", "Basic recognition from 11–99", 5, "numbers-double", "single-number", "word"),
    ],
    chunk: [
      makeStage("number-string-4", "Number String Chunk", "Four-digit number strings", 8, "number-string-4", "number-string", "chunk"),
      makeStage("number-string-6", "Number String Chunk", "Six-digit number strings", 4, "number-string-6", "number-string", "chunk"),
    ],
    sentence: [makeStage("number-sentence", "Number Sentence Recognition", "Short sentences containing numbers", 6, "numbers-sentence", "phrase", "sentence")],
  },
  10: {
    word: [
      makeStage("single", "Single-digit Training", "Quick recognition from 0–10", 15, "numbers-single", "single-number", "word"),
      makeStage("double", "Two-digit Training", "Basic recognition from 11–99", 15, "numbers-double", "single-number", "word"),
    ],
    chunk: [
      makeStage("number-string-4", "Number String Chunk", "Four-digit number strings", 10, "number-string-4", "number-string", "chunk"),
      makeStage("number-string-8", "Number String Chunk", "Eight-digit number strings", 8, "number-string-8", "number-string", "chunk"),
    ],
    sentence: [makeStage("number-sentence", "Number Sentence Recognition", "Short sentences containing numbers", 8, "numbers-sentence", "phrase", "sentence")],
  },
  15: {
    word: [
      makeStage("single", "Single-digit Training", "Quick recognition from 0–10", 20, "numbers-single", "single-number", "word"),
      makeStage("double", "Two-digit Training", "Basic recognition from 11–99", 20, "numbers-double", "single-number", "word"),
      makeStage("triple", "Three-digit Training", "Recognition from 100–999", 10, "numbers-triple", "single-number", "word"),
    ],
    chunk: [
      makeStage("number-string-6", "Number String Chunk", "Six-digit number strings", 12, "number-string-6", "number-string", "chunk"),
      makeStage("number-string-10", "Number String Chunk", "Ten-digit number strings", 8, "number-string-10", "number-string", "chunk"),
      makeStage("phone", "Phone Number Chunk", "Eleven-digit phone numbers", 5, "phone-numbers", "number-string", "chunk"),
    ],
    sentence: [makeStage("number-sentence", "Number Sentence Recognition", "Short sentences containing numbers", 10, "numbers-sentence", "phrase", "sentence")],
  },
};

export function generateTrainingSession({
  topic,
  durationMinutes,
  level,
}: {
  topic: TrainingTopic;
  durationMinutes: TrainingDuration;
  level: TrainingLevel;
}): TrainingSession {
  const stages = getTrainingPlanPresets()[topic][durationMinutes][level];
  const levelLabel = trainingLevels.find((item) => item.value === level)?.label ?? level;
  const topicTitle = trainingTopics.find((item) => item.value === topic)?.label ?? topic;
  const questions = stages.flatMap((stage) => generateStageQuestions(stage));

  return {
    id: `training-${topic}-${durationMinutes}-${level}-${Date.now()}`,
    topic,
    topicTitle,
    durationMinutes,
    level,
    levelLabel,
    stages,
    questions,
    totalQuestions: questions.length,
  };
}

function getTrainingPlanPresets(): Record<TrainingTopic, Record<TrainingDuration, Record<TrainingLevel, TrainingStage[]>>> {
  return {
    "number-speed": numberSpeedPresets,
    "time-speed": makeContentTopicPresets("time", "Time Recognition", "Japanese time expressions", "time"),
    "date-speed": makeContentTopicPresets("date", "Date Recognition", "Japanese date expressions", "dates"),
    "weekday-speed": makeContentTopicPresets("weekday", "Weekday Recognition", "Japanese weekday expressions", "weekdays"),
    "money-speed": makeContentTopicPresets("money", "Money Recognition", "Japanese price expressions", "money"),
    "shopping-scene": makeContentTopicPresets("shopping", "Shopping Scenarios", "Common shopping sentences", "shopping"),
    "place-nouns": makeContentTopicPresets("places", "Place Nouns", "High-frequency N5 place nouns", "places"),
    "people-nouns": makeContentTopicPresets("people", "People Nouns", "High-frequency N5 people nouns", "people"),
    "object-nouns": makeContentTopicPresets("objects", "Object Nouns", "High-frequency N5 object nouns", "objects"),
    "verb-speed": makeContentTopicPresets("verbs", "Verb Recognition", "High-frequency N5 verbs", "verbs"),
  };
}

function generateStageQuestions(stage: TrainingStage): TrainingQuestion[] {
  const content = getListeningContentByCategory(stage.category).filter((item) => item.difficulty === stage.level);
  if (content.length === 0) {
    throw new Error(`No ${stage.level} listening content found for category: ${stage.category}`);
  }

  return Array.from({ length: stage.questionCount }, (_, index) => {
    const item = content[index % content.length];
    const trainingItem = contentItemToTrainingItem(item, stage.itemMode);

    return {
      ...trainingItem,
      id: `${stage.id}-${index + 1}-${trainingItem.id}`,
      stageId: stage.id,
      stageTitle: stage.title,
      order: index + 1,
    };
  });
}

function makeContentTopicPresets(
  idPrefix: string,
  title: string,
  description: string,
  category: ListeningContentCategory,
): Record<TrainingDuration, Record<TrainingLevel, TrainingStage[]>> {
  return {
    5: {
      word: [makeStage(`${idPrefix}-word`, `${title}: Word`, description, 6, category, "phrase", "word")],
      chunk: [makeStage(`${idPrefix}-chunk`, `${title}: Chunk`, description, 6, category, "phrase", "chunk")],
      sentence: [makeStage(`${idPrefix}-sentence`, `${title}: Sentence`, description, 6, category, "phrase", "sentence")],
    },
    10: {
      word: [makeStage(`${idPrefix}-word`, `${title}: Word`, description, 8, category, "phrase", "word")],
      chunk: [makeStage(`${idPrefix}-chunk`, `${title}: Chunk`, description, 8, category, "phrase", "chunk")],
      sentence: [makeStage(`${idPrefix}-sentence`, `${title}: Sentence`, description, 8, category, "phrase", "sentence")],
    },
    15: {
      word: [makeStage(`${idPrefix}-word`, `${title}: Word`, description, 10, category, "phrase", "word")],
      chunk: [makeStage(`${idPrefix}-chunk`, `${title}: Chunk`, description, 10, category, "phrase", "chunk")],
      sentence: [makeStage(`${idPrefix}-sentence`, `${title}: Sentence`, description, 10, category, "phrase", "sentence")],
    },
  };
}

function makeStage(
  id: string,
  title: string,
  description: string,
  questionCount: number,
  category: ListeningContentCategory,
  itemMode: ListeningMode,
  level: TrainingLevel,
): TrainingStage {
  return {
    id,
    title,
    description,
    itemMode,
    questionCount,
    category,
    level,
  };
}

function contentItemToTrainingItem(item: ListeningContentItem, mode: ListeningMode): ListeningTrainingItem {
  return {
    id: item.id,
    mode,
    audioText: item.audioText,
    answer: item.answer,
    kanaAnswer: item.kanaAnswer,
  };
}
