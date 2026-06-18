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
  { value: "number-speed", label: "数字速听" },
  { value: "time-speed", label: "时间速听" },
  { value: "date-speed", label: "日期速听" },
  { value: "weekday-speed", label: "星期速听" },
  { value: "money-speed", label: "金额速听" },
  { value: "shopping-scene", label: "购物场景" },
  { value: "place-nouns", label: "地点名词速听" },
  { value: "people-nouns", label: "人物名词速听" },
  { value: "object-nouns", label: "物品名词速听" },
  { value: "verb-speed", label: "动词速听" },
];

export const trainingDurations: TrainingDuration[] = [5, 10, 15];

export const trainingLevels: Array<{ value: TrainingLevel; label: string }> = [
  { value: "word", label: "单词" },
  { value: "chunk", label: "词块" },
  { value: "sentence", label: "句子" },
];

const numberSpeedPresets: Record<TrainingDuration, Record<TrainingLevel, TrainingStage[]>> = {
  5: {
    word: [
      makeStage("single", "单数字训练", "0-10 快速反应", 10, "numbers-single", "single-number", "word"),
      makeStage("double", "两位数训练", "11-99 基础识别", 5, "numbers-double", "single-number", "word"),
    ],
    chunk: [
      makeStage("number-string-4", "数字串词块", "4位数字串", 8, "number-string-4", "number-string", "chunk"),
      makeStage("number-string-6", "数字串词块", "6位数字串", 4, "number-string-6", "number-string", "chunk"),
    ],
    sentence: [makeStage("number-sentence", "数字句子听辨", "含数字的短句", 6, "numbers-sentence", "phrase", "sentence")],
  },
  10: {
    word: [
      makeStage("single", "单数字训练", "0-10 快速反应", 15, "numbers-single", "single-number", "word"),
      makeStage("double", "两位数训练", "11-99 基础识别", 15, "numbers-double", "single-number", "word"),
    ],
    chunk: [
      makeStage("number-string-4", "数字串词块", "4位数字串", 10, "number-string-4", "number-string", "chunk"),
      makeStage("number-string-8", "数字串词块", "8位数字串", 8, "number-string-8", "number-string", "chunk"),
    ],
    sentence: [makeStage("number-sentence", "数字句子听辨", "含数字的短句", 8, "numbers-sentence", "phrase", "sentence")],
  },
  15: {
    word: [
      makeStage("single", "单数字训练", "0-10 快速反应", 20, "numbers-single", "single-number", "word"),
      makeStage("double", "两位数训练", "11-99 基础识别", 20, "numbers-double", "single-number", "word"),
      makeStage("triple", "三位数训练", "100-999 听辨", 10, "numbers-triple", "single-number", "word"),
    ],
    chunk: [
      makeStage("number-string-6", "数字串词块", "6位数字串", 12, "number-string-6", "number-string", "chunk"),
      makeStage("number-string-10", "数字串词块", "10位数字串", 8, "number-string-10", "number-string", "chunk"),
      makeStage("phone", "电话号码词块", "11位电话号码", 5, "phone-numbers", "number-string", "chunk"),
    ],
    sentence: [makeStage("number-sentence", "数字句子听辨", "含数字的短句", 10, "numbers-sentence", "phrase", "sentence")],
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
    "time-speed": makeContentTopicPresets("time", "时间听辨", "日语时间表达", "time"),
    "date-speed": makeContentTopicPresets("date", "日期听辨", "日语日期表达", "dates"),
    "weekday-speed": makeContentTopicPresets("weekday", "星期听辨", "日语星期表达", "weekdays"),
    "money-speed": makeContentTopicPresets("money", "金额听辨", "日语金额表达", "money"),
    "shopping-scene": makeContentTopicPresets("shopping", "购物场景听辨", "购物常用句子", "shopping"),
    "place-nouns": makeContentTopicPresets("places", "地点名词听辨", "N5 高频地点名词", "places"),
    "people-nouns": makeContentTopicPresets("people", "人物名词听辨", "N5 高频人物名词", "people"),
    "object-nouns": makeContentTopicPresets("objects", "物品名词听辨", "N5 高频物品名词", "objects"),
    "verb-speed": makeContentTopicPresets("verbs", "动词听辨", "N5 高频动词", "verbs"),
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
      word: [makeStage(`${idPrefix}-word`, `${title}：单词`, description, 6, category, "phrase", "word")],
      chunk: [makeStage(`${idPrefix}-chunk`, `${title}：词块`, description, 6, category, "phrase", "chunk")],
      sentence: [makeStage(`${idPrefix}-sentence`, `${title}：句子`, description, 6, category, "phrase", "sentence")],
    },
    10: {
      word: [makeStage(`${idPrefix}-word`, `${title}：单词`, description, 8, category, "phrase", "word")],
      chunk: [makeStage(`${idPrefix}-chunk`, `${title}：词块`, description, 8, category, "phrase", "chunk")],
      sentence: [makeStage(`${idPrefix}-sentence`, `${title}：句子`, description, 8, category, "phrase", "sentence")],
    },
    15: {
      word: [makeStage(`${idPrefix}-word`, `${title}：单词`, description, 10, category, "phrase", "word")],
      chunk: [makeStage(`${idPrefix}-chunk`, `${title}：词块`, description, 10, category, "phrase", "chunk")],
      sentence: [makeStage(`${idPrefix}-sentence`, `${title}：句子`, description, 10, category, "phrase", "sentence")],
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
