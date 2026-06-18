"use client";

import Image from "next/image";
import { CheckCircle2, Maximize2, Volume2, X, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { LearningWord, Quiz } from "@/types/learning";
import { getKanaCode } from "@/data/kana-codes";
import { KanjiStrokeOrder } from "@/components/kanji-stroke-order";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function WordTabs({ word }: { word: LearningWord }) {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid h-auto w-full grid-cols-2 gap-1 md:grid-cols-4">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="kanji">Kanji Study</TabsTrigger>
        <TabsTrigger value="memory">Code Memory</TabsTrigger>
        <TabsTrigger value="practice">Practice</TabsTrigger>
      </TabsList>

      <TabsContent value="basic">
        <BasicInfoTab word={word} />
      </TabsContent>
      <TabsContent value="kanji">
        <KanjiLearningTab word={word} />
      </TabsContent>
      <TabsContent value="memory">
        <MemoryEncodingTab word={word} />
      </TabsContent>
      <TabsContent value="practice">
        <PracticeTab word={word} />
      </TabsContent>
    </Tabs>
  );
}

function BasicInfoTab({ word }: { word: LearningWord }) {
  const [speechMessage, setSpeechMessage] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const speakJapanese = (text: string, fallbackPath: string) => {
    if (typeof window === "undefined") {
      return;
    }

    setSpeechMessage("");

    if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.onerror = () => playFallbackAudio(fallbackPath);
      window.speechSynthesis.speak(utterance);
      return;
    }

    playFallbackAudio(fallbackPath);
  };

  const playFallbackAudio = (path: string) => {
    const audio = audioRef.current;
    if (!audio) {
      setSpeechMessage("Speech not supported.");
      return;
    }

    audio.src = path;
    audio.currentTime = 0;
    void audio.play().catch(() => setSpeechMessage("Speech not supported."));
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <audio
        ref={audioRef}
        className="hidden"
        onPlay={() => setSpeechMessage("Playing pronunciation...")}
        onEnded={() => setSpeechMessage("")}
        onError={() => setSpeechMessage("Speech not supported.")}
      />
      <Card>
        <CardHeader>
          <CardTitle>Word Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <InfoItem label="Kanji" value={word.kanji} large />
          <InfoItem label="Kana" value={word.kana} large />
          <InfoItem label="English" value={word.meaningEn} />
          <InfoItem label="Chinese" value={word.meaningCn} />
          <InfoItem label="Code Path" value={word.codeSplit.map((item) => item.codeWord).join(" + ")} />
          {word.example && <div className="sm:col-span-2 rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Example sentence</p>
            <p className="mt-2 text-xl font-semibold">{word.example}</p>
            <p className="mt-1 text-sm text-muted-foreground">{word.exampleZh}</p>
          </div>}
          <div className="sm:col-span-2 space-y-3">
            <div>
              <p className="text-sm font-semibold">More Examples</p>
              {speechMessage && (
                <p className={`mt-1 text-sm ${speechMessage === "Speech not supported." ? "text-red-600" : "text-primary"}`}>
                  {speechMessage}
                </p>
              )}
            </div>
            {word.examples.map((example, index) => (
              <div key={`${word.id}-${example.japanese}`} className="rounded-lg border bg-background p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">{example.japanese}</p>
                    <p className="mt-1 text-sm text-primary">{example.furigana}</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => speakJapanese(example.japanese, `/audio/${word.id}-example-${index + 1}.mp3`)}
                  >
                    <Volume2 className="h-4 w-4" />
                    Play
                  </Button>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">English: {example.english}</p>
                <p className="mt-1 text-sm text-muted-foreground">Chinese: {example.chinese}</p>
                {word.hasImage && <audio
                  controls
                  preload="metadata"
                  className="mt-3 h-10 w-full"
                  src={`/audio/${word.id}-example-${index + 1}.mp3`}
                >
                  Speech not supported.
                </audio>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Learning Flow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {["Kana", "Code", "Story", "Image", "Animation", "Practice"].map((item, index) => (
            <div key={item} className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </div>
              <span className="font-medium">{item}</span>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="mt-4 w-full"
            onClick={() => speakJapanese(word.kana, `/audio/${word.id}-word.mp3`)}
          >
            <Volume2 className="h-4 w-4" />
            Play pronunciation
          </Button>
          {word.hasImage && <audio controls preload="metadata" className="h-10 w-full" src={`/audio/${word.id}-word.mp3`}>
            Speech not supported.
          </audio>}
        </CardContent>
      </Card>
    </div>
  );
}

function InfoItem({ label, value, large = false }: { label: string; value: string; large?: boolean }) {
  return (
    <div className="rounded-lg border bg-background p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={large ? "mt-2 text-3xl font-bold" : "mt-2 text-lg font-semibold"}>{value}</p>
    </div>
  );
}

function KanjiLearningTab({ word }: { word: LearningWord }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {word.kanjiInfo.map((item) => (
        <Card key={item.character}>
          <CardHeader>
            <div className="flex items-center gap-4">
              <button className="flex h-20 w-20 items-center justify-center rounded-lg border bg-background text-5xl font-bold">
                {item.character}
              </button>
              <div>
                <CardTitle>{item.character}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">{item.english}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm text-muted-foreground">Kanji breakdown</p>
              <p className="mt-2 text-lg font-semibold">{item.breakdown}</p>
            </div>
            <KanjiStrokeOrder character={item.character} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function MemoryEncodingTab({ word }: { word: LearningWord }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Code Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Kana breakdown</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {word.kanaSplit.map((kana) => (
                <Badge key={kana} className="bg-secondary text-base">
                  {kana}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            {word.codeSplit.map((item) => (
              <div key={`${item.kana}-${item.codeWord}`} className="flex items-center justify-between rounded-lg border bg-background p-3">
                <span className="text-2xl font-bold text-primary">{item.kana}</span>
                <span className="text-sm text-muted-foreground">Code word</span>
                <span className="font-semibold">{item.codeWord}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>{word.memoryTitle || "Memory Story"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 rounded-lg border bg-background p-4 text-sm leading-6 text-muted-foreground">
              {word.memorySummary || "Memory summary coming soon."}
            </p>
            <MemoryWordImage word={word} />
            <p className="rounded-lg bg-accent/70 p-5 text-lg leading-8">
              {word.originalStory || "Memory story coming soon."}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Kana Code Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {word.codeSplit.map((item) => {
                const code = getKanaCode(item.kana);
                return (
                  <div key={`${word.id}-${item.kana}-image`} className="rounded-lg border bg-background p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{item.kana}</span>
                      <span className="text-sm font-semibold">{item.codeWord}</span>
                    </div>
                    {code?.imageSrc ? (
                      <div className="relative h-36 overflow-hidden rounded-md bg-white">
                        <Image src={code.imageSrc} alt={code.imageHint} fill className="object-contain" sizes="240px" />
                      </div>
                    ) : (
                      <div className="flex h-36 items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
                        Source image pending
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MemoryWordImage({ word }: { word: LearningWord }) {
  const [missing, setMissing] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!word.imagePath || missing) {
    return (
      <div className="mb-4 flex aspect-video w-full items-center justify-center rounded-lg border bg-muted text-sm font-semibold text-muted-foreground">
        Image Coming Soon
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative mb-4 block aspect-video w-full overflow-hidden rounded-lg border bg-white shadow-soft"
        aria-label={`Open larger image for ${word.memoryTitle}`}
      >
        <Image
          src={word.imagePath}
          alt={word.memoryTitle}
          fill
          className="object-contain transition-transform group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 720px, 100vw"
          onError={() => setMissing(true)}
        />
        <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-background/90 text-foreground shadow-sm">
          <Maximize2 className="h-4 w-4" />
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/85"
          role="dialog"
          aria-modal="true"
          aria-label={`${word.memoryTitle} image preview`}
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/15 bg-zinc-950/95 px-4 py-3 text-white">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-4 text-sm font-semibold text-zinc-950"
              onClick={() => setOpen(false)}
            >
              Back to Memory
            </button>
            <p className="min-w-0 truncate text-sm font-semibold">{word.memoryTitle}</p>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/30 px-4 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
              aria-label="Close image preview"
            >
              <X className="h-4 w-4" />
              Close
            </button>
          </div>
          <button
            type="button"
            className="sr-only"
            onClick={() => setOpen(false)}
            aria-label="Close image preview"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex min-h-0 flex-1 items-center justify-center p-4">
          <div className="relative aspect-video max-h-full w-full max-w-6xl overflow-hidden rounded-lg bg-black shadow-soft" onClick={(event) => event.stopPropagation()}>
            <Image src={word.imagePath} alt={word.memoryTitle} fill className="object-contain" sizes="100vw" />
          </div>
          </div>
        </div>
      )}
    </>
  );
}

function PracticeTab({ word }: { word: LearningWord }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  return (
    <div className="space-y-5">
      {word.exercises.map((exercise, index) => {
        const selected = answers[index];
        const checked = Boolean(selected);
        const correct = selected === exercise.answer;
        return (
          <Card key={exercise.question}>
            <CardHeader>
              <CardTitle className="text-lg">Question {index + 1}</CardTitle>
              <p className="text-muted-foreground">{exercise.question}</p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {exercise.choices.map((choice) => (
                  <button
                    key={choice}
                    onClick={() => setAnswers((prev) => ({ ...prev, [index]: choice }))}
                    className={`rounded-lg border p-4 text-left font-medium transition-colors ${
                      selected === choice ? "border-primary bg-primary/10" : "bg-background hover:bg-muted"
                    }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
              {checked && (
                <div className={`mt-4 flex items-center gap-2 rounded-lg p-3 text-sm font-semibold ${correct ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                  {correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  {correct ? "Correct" : `Try again. The correct answer is: ${exercise.answer}`}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
      <Card>
        <CardHeader>
          <CardTitle>N5-style Quiz</CardTitle>
          <p className="text-sm text-muted-foreground">Choose an answer to see instant feedback.</p>
        </CardHeader>
        <CardContent className="space-y-5">
          {word.quizzes.map((quiz, index) => (
            <QuizQuestion
              key={`${word.id}-${quiz.type}-${index}`}
              quiz={quiz}
              index={index}
              selected={quizAnswers[index]}
              onSelect={(answer) => setQuizAnswers((prev) => ({ ...prev, [index]: answer }))}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function QuizQuestion({
  quiz,
  index,
  selected,
  onSelect,
}: {
  quiz: Quiz;
  index: number;
  selected?: string;
  onSelect: (answer: string) => void;
}) {
  const checked = Boolean(selected);
  const correct = selected === quiz.answer;

  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">Quiz {index + 1}</p>
        <Badge className="bg-secondary">{quiz.type.replace("_", " ")}</Badge>
      </div>
      <p className="text-sm text-muted-foreground">{quiz.question}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {quiz.options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`rounded-lg border p-3 text-left text-sm font-medium transition-colors ${
              selected === option ? "border-primary bg-primary/10" : "bg-card hover:bg-muted"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {checked && (
        <div className={`mt-4 rounded-lg p-3 text-sm ${correct ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          <div className="flex items-center gap-2 font-semibold">
            {correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {correct ? "Correct" : `Incorrect. Correct answer: ${quiz.answer}`}
          </div>
          <p className="mt-2 leading-6">{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
}
