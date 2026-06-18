"use client";

import { Eye, EyeOff, Pause, Play, Shuffle, SkipForward, Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import {
  endPauses,
  groupPauses,
  numberKanaMap,
  numberStringLengths,
  singleNumberIntervals,
  type ListeningMode,
  type ListeningTrainingItem,
} from "@/data/listening-data";
import { getListeningContentByCategory } from "@/data/listening-content";
import {
  generateTrainingSession,
  trainingDurations,
  trainingLevels,
  trainingTopics,
  type TrainingDuration,
  type TrainingLevel,
  type TrainingSession,
  type TrainingTopic,
} from "@/data/training-session-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUiLanguage } from "@/components/ui-language-provider";

type OrderMode = "sequence" | "random";
type NumberStringLength = (typeof numberStringLengths)[number];

const wait = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));
const singleNumberContent = getListeningContentByCategory("numbers-single");

export function ListeningPractice() {
  const { language, t } = useUiLanguage();
  const [mode, setMode] = useState<ListeningMode>("single-number");
  const [orderMode, setOrderMode] = useState<OrderMode>("random");
  const [singleInterval, setSingleInterval] = useState<(typeof singleNumberIntervals)[number]>(1);
  const [stringLength, setStringLength] = useState<NumberStringLength>(11);
  const [groupPause, setGroupPause] = useState<(typeof groupPauses)[number]>(1.5);
  const [endPause, setEndPause] = useState<(typeof endPauses)[number]>(5);
  const [currentItem, setCurrentItem] = useState<ListeningTrainingItem>(() => makeSingleNumberItem(0));
  const [singleIndex, setSingleIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState("Ready for classroom listening practice.");
  const [trainingTopic, setTrainingTopic] = useState<TrainingTopic>("number-speed");
  const [trainingDuration, setTrainingDuration] = useState<TrainingDuration>(15);
  const [trainingLevel, setTrainingLevel] = useState<TrainingLevel>("word");
  const [trainingSession, setTrainingSession] = useState<TrainingSession | null>(null);
  const [trainingIndex, setTrainingIndex] = useState(0);
  const [trainingStartedAt, setTrainingStartedAt] = useState<number | null>(null);
  const [trainingSummary, setTrainingSummary] = useState<{
    topicTitle: string;
    completedQuestions: number;
    elapsedMinutes: number;
  } | null>(null);

  const stopRef = useRef(false);
  const trainingSessionRef = useRef<TrainingSession | null>(null);
  const trainingIndexRef = useRef(0);
  const trainingStartedRef = useRef(false);
  const trainingStartedAtRef = useRef<number | null>(null);

  const currentTrainingQuestion = trainingSession?.questions[trainingIndex];
  const trainingDurationLabels: Record<TrainingDuration, string> = {
    5: t("fiveMinutes"),
    10: t("tenMinutes"),
    15: t("fifteenMinutes"),
  };
  const trainingLevelLabels: Record<TrainingLevel, string> = {
    word: t("wordLevel"),
    chunk: t("chunkLevel"),
    sentence: t("sentenceLevel"),
  };
  const trainingTopicLabels = getTrainingTopicLabels(language);
  const estimatedRemainingMinutes = trainingSession
    ? Math.floor(
        ((trainingSession.totalQuestions - Math.min(trainingIndex + 1, trainingSession.totalQuestions)) /
          trainingSession.totalQuestions) *
          trainingSession.durationMinutes,
      )
    : null;

  const clearTrainingState = () => {
    trainingSessionRef.current = null;
    trainingIndexRef.current = 0;
    trainingStartedRef.current = false;
    trainingStartedAtRef.current = null;
    setTrainingSession(null);
    setTrainingIndex(0);
    setTrainingStartedAt(null);
    setTrainingSummary(null);
  };

  const stopPlayback = () => {
    stopRef.current = true;
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
  };

  const setModeAndQuestion = (nextMode: ListeningMode) => {
    stopPlayback();
    clearTrainingState();
    setMode(nextMode);
    setShowAnswer(false);
    setStatus("Mode updated. Click play to start.");
    if (nextMode === "single-number") {
      setCurrentItem(getNextSingleItem(orderMode, singleIndex));
    } else {
      setCurrentItem(makeNumberStringItem(stringLength));
    }
  };

  const updateTrainingTopic = (value: TrainingTopic) => {
    stopPlayback();
    clearTrainingState();
    setTrainingTopic(value);
    setStatus("Training topic updated. Generate a new plan.");
  };

  const updateTrainingDuration = (value: TrainingDuration) => {
    stopPlayback();
    clearTrainingState();
    setTrainingDuration(value);
    setStatus("Training duration updated. Generate a new plan.");
  };

  const updateTrainingLevel = (value: TrainingLevel) => {
    stopPlayback();
    clearTrainingState();
    setTrainingLevel(value);
    setStatus("Training level updated. Generate a new plan.");
  };

  const createTrainingPlan = () => {
    stopPlayback();
    const nextSession = generateTrainingSession({
      topic: trainingTopic,
      durationMinutes: trainingDuration,
      level: trainingLevel,
    });

    trainingSessionRef.current = nextSession;
    trainingIndexRef.current = 0;
    trainingStartedRef.current = false;
    trainingStartedAtRef.current = null;
    setTrainingSession(nextSession);
    setTrainingIndex(0);
    setTrainingStartedAt(null);
    setTrainingSummary(null);
    setCurrentItem(nextSession.questions[0]);
    setMode(nextSession.questions[0].mode);
    setShowAnswer(false);
    setStatus("Training plan generated. Click start training.");
  };

  const startTraining = () => {
    const nextSession =
      trainingSessionRef.current ??
      trainingSession ??
      generateTrainingSession({
        topic: trainingTopic,
        durationMinutes: trainingDuration,
        level: trainingLevel,
      });
    const firstQuestion = nextSession.questions[0];

    stopPlayback();
    const startedAt = Date.now();
    trainingSessionRef.current = nextSession;
    trainingIndexRef.current = 0;
    trainingStartedRef.current = true;
    trainingStartedAtRef.current = startedAt;
    setTrainingSession(nextSession);
    setTrainingIndex(0);
    setTrainingStartedAt(startedAt);
    setTrainingSummary(null);
    setCurrentItem(firstQuestion);
    setMode(firstQuestion.mode);
    setShowAnswer(false);
    setStatus("Training started. Playing question 1.");
    void playItem(firstQuestion, true);
  };

  const finishTraining = () => {
    const activeSession = trainingSessionRef.current ?? trainingSession;
    if (!activeSession) return;

    stopPlayback();
    const startedAt = trainingStartedAtRef.current ?? trainingStartedAt;
    const elapsedMinutes = startedAt ? Math.max(1, Math.round((Date.now() - startedAt) / 60000)) : 0;
    setTrainingSummary({
      topicTitle: activeSession.topicTitle,
      completedQuestions: activeSession.totalQuestions,
      elapsedMinutes,
    });
    trainingStartedRef.current = false;
    trainingStartedAtRef.current = null;
    setTrainingStartedAt(null);
    setStatus("Training complete.");
  };

  const playItem = async (item: ListeningTrainingItem, continueLoop: boolean) => {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setStatus("This browser does not support SpeechSynthesis.");
      return;
    }

    stopRef.current = false;
    setIsPlaying(true);
    setStatus("Playing...");

    try {
      if (item.mode === "number-string") {
        const groups = item.answer.split("-");
        for (let index = 0; index < groups.length; index += 1) {
          await speakText(groupToKana(groups[index]));
          if (stopRef.current) return;
          if (index < groups.length - 1) {
            setStatus(`Group pause: ${groupPause}s`);
            await wait(groupPause);
          }
        }
        if (continueLoop) {
          setStatus(`End pause: ${endPause}s`);
          await wait(endPause);
          if (!stopRef.current) nextQuestion(true);
        }
      } else {
        await speakText(item.audioText);
        if (stopRef.current) return;
        if (continueLoop) {
          await wait(singleInterval);
          if (!stopRef.current) nextQuestion(true);
        }
      }
    } catch {
      setStatus("Playback failed. Please try again.");
    } finally {
      if (!stopRef.current) setIsPlaying(false);
    }
  };

  const start = () => {
    stopPlayback();
    void playItem(currentItem, false);
  };

  const pause = () => {
    stopPlayback();
    setStatus("Paused.");
  };

  const replay = () => {
    stopPlayback();
    setStatus("Replaying.");
    void playItem(currentItem, false);
  };

  const nextQuestion = (continueLoop: boolean) => {
    stopPlayback();
    setShowAnswer(false);

    const activeSession = trainingSessionRef.current ?? trainingSession;
    if (activeSession && trainingStartedRef.current) {
      const nextIndex = trainingIndexRef.current + 1;
      if (nextIndex >= activeSession.questions.length) {
        finishTraining();
        return;
      }

      const nextItem = activeSession.questions[nextIndex];
      trainingIndexRef.current = nextIndex;
      setTrainingIndex(nextIndex);
      setCurrentItem(nextItem);
      setMode(nextItem.mode);
      setStatus(`Question ${nextIndex + 1} / ${activeSession.totalQuestions}`);
      if (continueLoop) void playItem(nextItem, true);
      return;
    }

    if (mode === "single-number") {
      const nextIndex = orderMode === "sequence" ? (singleIndex + 1) % singleNumberContent.length : singleIndex;
      const nextItem = getNextSingleItem(orderMode, nextIndex);
      setSingleIndex(nextIndex);
      setCurrentItem(nextItem);
      setStatus("Next question ready.");
      if (continueLoop) void playItem(nextItem, true);
    } else {
      const nextItem = makeNumberStringItem(stringLength);
      setCurrentItem(nextItem);
      setStatus("Next question ready.");
      if (continueLoop) void playItem(nextItem, true);
    }
  };

  const updateStringLength = (value: NumberStringLength) => {
    stopPlayback();
    clearTrainingState();
    setStringLength(value);
    if (mode === "number-string") {
      setCurrentItem(makeNumberStringItem(value));
      setShowAnswer(false);
      setStatus("Number string length updated.");
    }
  };

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader className="border-b border-blue-100 bg-white/70">
          <CardTitle>{t("trainingPlan")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <SelectControl
              label={t("trainingTopic")}
              options={trainingTopics.map((item) => ({ ...item, label: trainingTopicLabels[item.value] }))}
              value={trainingTopic}
              onChange={(value) => updateTrainingTopic(value as TrainingTopic)}
            />
            <SegmentedControl
              label={t("trainingDuration")}
              options={trainingDurations.map((value) => ({ value: String(value), label: trainingDurationLabels[value] }))}
              value={String(trainingDuration)}
              onChange={(value) => updateTrainingDuration(Number(value) as TrainingDuration)}
            />
            <SegmentedControl
              label={t("trainingLevel")}
              options={trainingLevels.map((item) => ({ ...item, label: trainingLevelLabels[item.value] }))}
              value={trainingLevel}
              onChange={(value) => updateTrainingLevel(value as TrainingLevel)}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outline" onClick={createTrainingPlan}>
              {t("generateTrainingPlan")}
            </Button>
            <Button type="button" onClick={startTraining}>
              <Play className="h-4 w-4" />
              {t("startTraining")}
            </Button>
          </div>

          {trainingSession ? (
            <div className="grid gap-3 rounded-lg border border-blue-100 bg-blue-50/60 p-5 md:grid-cols-4">
              <InfoBlock label="Current Training" value={`${trainingTopicLabels[trainingSession.topic]} (${trainingLevelLabels[trainingSession.level]})`} />
              <InfoBlock label="Current Stage" value={currentTrainingQuestion ? trainingLevelLabels[trainingSession.level] : "Not started"} />
              <InfoBlock
                label="Progress"
                value={`${Math.min(trainingIndex + 1, trainingSession.totalQuestions)} / ${trainingSession.totalQuestions}`}
              />
              <InfoBlock label="Estimated Remaining" value={`${estimatedRemainingMinutes ?? trainingSession.durationMinutes} min`} />
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-blue-200 bg-blue-50/40 p-5 text-sm text-muted-foreground">
              Select a topic, duration, and level, then generate a training plan.
            </div>
          )}

          {trainingSummary ? (
            <div className="rounded-lg border border-pink-100 bg-gradient-to-r from-pink-50 to-blue-50 p-5">
              <p className="text-sm font-semibold text-pink-600">Training Complete</p>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <InfoBlock label="Topic" value={trainingTopicLabels[trainingTopic]} />
                <InfoBlock label="Completed" value={`${trainingSummary.completedQuestions}`} />
                <InfoBlock label="Duration" value={`${trainingSummary.elapsedMinutes} min`} />
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>{t("trainingMode")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <SegmentedControl
              label={t("mode")}
              options={[
                { value: "single-number", label: language === "ja" ? "単数字" : "Single Number" },
                { value: "number-string", label: language === "ja" ? "数字列" : "Number String" },
              ]}
              value={mode}
              onChange={(value) => setModeAndQuestion(value as ListeningMode)}
            />

            <SegmentedControl
              label={t("order")}
              options={[
                { value: "random", label: t("random") },
                { value: "sequence", label: t("sequence") },
              ]}
              value={orderMode}
              onChange={(value) => setOrderMode(value as OrderMode)}
            />

            {mode === "single-number" ? (
              <SegmentedControl
                label={language === "ja" ? "間隔" : "Interval"}
                options={singleNumberIntervals.map((value) => ({ value: String(value), label: `${value}s` }))}
                value={String(singleInterval)}
                onChange={(value) => setSingleInterval(Number(value) as typeof singleInterval)}
              />
            ) : (
              <>
                <SegmentedControl
                  label={language === "ja" ? "数字列の長さ" : "String Length"}
                  options={numberStringLengths.map((value) => ({
                    value: String(value),
                    label: language === "ja" ? `${value}桁` : `${value} digits`,
                  }))}
                  value={String(stringLength)}
                  onChange={(value) => updateStringLength(Number(value) as NumberStringLength)}
                />
                <SegmentedControl
                  label={language === "ja" ? "グループ間の停止" : "Group Pause"}
                  options={groupPauses.map((value) => ({ value: String(value), label: `${value}s` }))}
                  value={String(groupPause)}
                  onChange={(value) => setGroupPause(Number(value) as typeof groupPause)}
                />
                <SegmentedControl
                  label={language === "ja" ? "問題後の停止" : "End Pause"}
                  options={endPauses.map((value) => ({ value: String(value), label: `${value}s` }))}
                  value={String(endPause)}
                  onChange={(value) => setEndPause(Number(value) as typeof endPause)}
                />
              </>
            )}
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-blue-100 bg-white/70">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-pink-600">{t("listeningSubtitle")}</p>
                <CardTitle className="mt-2">
                {currentTrainingQuestion
                    ? `${trainingTopicLabels[trainingTopic]} / ${trainingLevelLabels[trainingSession?.level ?? trainingLevel]}`
                    : mode === "single-number"
                      ? language === "ja"
                        ? "単数字: 0-10"
                        : "Single Number: 0-10"
                      : language === "ja"
                        ? "数字列: 電話番号 / 学籍番号 / 部屋番号"
                        : "Number String: phone / student ID / room number"}
                </CardTitle>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-sm font-semibold text-primary">
                <Shuffle className="h-4 w-4" />
                {orderMode === "random" ? t("random") : t("sequence")}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-5">
              <p className="text-sm text-muted-foreground">
                {language === "ja" ? "現在の問題 ID" : "Current Question ID"}
              </p>
              <p className="mt-2 font-mono text-sm text-primary">{currentItem.id}</p>
              <p className="mt-4 text-sm text-muted-foreground">{status}</p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
              <Button type="button" onClick={start} disabled={isPlaying}>
                <Play className="h-4 w-4" />
                {t("startPlayback")}
              </Button>
              <Button type="button" variant="outline" onClick={pause} disabled={!isPlaying}>
                <Pause className="h-4 w-4" />
                {t("pause")}
              </Button>
              <Button type="button" variant="outline" onClick={() => nextQuestion(false)}>
                <SkipForward className="h-4 w-4" />
                {t("next")}
              </Button>
              <Button type="button" variant="outline" onClick={replay}>
                <Volume2 className="h-4 w-4" />
                {t("replay")}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setShowAnswer((value) => !value)}>
                {showAnswer ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showAnswer ? t("hideAnswer") : t("showAnswer")}
              </Button>
            </div>

            <div className="rounded-lg border border-pink-100 bg-gradient-to-r from-blue-50 to-pink-50 p-6">
              <p className="text-sm font-semibold text-pink-600">{t("answerArea")}</p>
              {showAnswer ? (
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <AnswerBlock label="Numeric Answer" value={currentItem.answer} large />
                  <AnswerBlock label="Kana Answer" value={currentItem.kanaAnswer} />
                </div>
              ) : (
                <div className="mt-4 rounded-lg border border-dashed border-blue-200 bg-white/70 p-8 text-center text-muted-foreground">
                  Answers are hidden by default. Use {t("showAnswer")} when needed in class.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function speakText(text: string) {
  return new Promise<void>((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.95;
    utterance.onend = () => resolve();
    utterance.onerror = () => reject(new Error("speech failed"));
    window.speechSynthesis.speak(utterance);
  });
}

function getNextSingleItem(orderMode: OrderMode, currentIndex: number) {
  if (orderMode === "random") {
    const randomIndex = Math.floor(Math.random() * singleNumberContent.length);
    return contentItemToListeningItem(singleNumberContent[randomIndex], "single-number");
  }

  return contentItemToListeningItem(singleNumberContent[currentIndex % singleNumberContent.length], "single-number");
}

function makeSingleNumberItem(value: number): ListeningTrainingItem {
  return contentItemToListeningItem(singleNumberContent[value], "single-number");
}

function contentItemToListeningItem(
  item: (typeof singleNumberContent)[number],
  mode: ListeningMode,
): ListeningTrainingItem {
  return {
    id: item.id,
    mode,
    audioText: item.audioText,
    answer: item.answer,
    kanaAnswer: item.kanaAnswer,
  };
}

function makeNumberStringItem(length: NumberStringLength): ListeningTrainingItem {
  const categoryByLength = {
    4: "number-string-4",
    6: "number-string-6",
    8: "number-string-8",
    10: "number-string-10",
    11: "phone-numbers",
  } as const;
  const candidates = getListeningContentByCategory(categoryByLength[length]);
  const item = candidates[Math.floor(Math.random() * candidates.length)];

  return {
    id: `${item.id}-${Date.now()}`,
    mode: "number-string",
    audioText: item.audioText,
    answer: item.answer,
    kanaAnswer: item.kanaAnswer,
  };
}

function groupToKana(group: string) {
  return group
    .split("")
    .map((digit) => numberKanaMap[digit])
    .join(" ");
}

function getTrainingTopicLabels(language: "en" | "ja"): Record<TrainingTopic, string> {
  if (language === "ja") {
    return {
      "number-speed": "数字聴解",
      "time-speed": "時間聴解",
      "date-speed": "日付聴解",
      "weekday-speed": "曜日聴解",
      "money-speed": "金額聴解",
      "shopping-scene": "買い物場面",
      "place-nouns": "場所名詞",
      "people-nouns": "人物名詞",
      "object-nouns": "物の名詞",
      "verb-speed": "動詞聴解",
    };
  }

  return {
    "number-speed": "Number Listening",
    "time-speed": "Time Listening",
    "date-speed": "Date Listening",
    "weekday-speed": "Weekday Listening",
    "money-speed": "Money Listening",
    "shopping-scene": "Shopping Scene",
    "place-nouns": "Place Nouns",
    "people-nouns": "People Nouns",
    "object-nouns": "Object Nouns",
    "verb-speed": "Verb Listening",
  };
}

function SegmentedControl({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
              value === option.value
                ? "brand-gradient border-transparent text-white shadow-sm"
                : "border-blue-100 bg-white/80 text-muted-foreground hover:border-blue-200 hover:text-primary"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SelectControl({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-blue-100 bg-white/90 px-3 py-2 text-sm font-medium text-primary shadow-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function AnswerBlock({ label, value, large = false }: { label: string; value: string; large?: boolean }) {
  return (
    <div className="rounded-lg border bg-white/85 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={large ? "mt-2 text-4xl font-bold text-primary" : "mt-2 text-xl font-semibold"}>{value}</p>
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold text-primary">{value}</p>
    </div>
  );
}
