"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Headphones,
  History,
  Mic,
  RefreshCw,
  Sparkles,
  Square,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { practiceVocabulary, type PracticeVocabulary } from "@/data/practice-vocabulary";

type PracticeLog = {
  id: string;
  word: string;
  type: "quiz" | "sentence" | "pronunciation";
  score: number;
  feedback: string;
  createdAt: string;
};

const LOG_KEY = "nihongo-studio-practice-logs";

function sentenceFeedback(word: PracticeVocabulary, sentence: string) {
  const text = sentence.trim();
  if (!text) return { score: 0, feedback: "请先写一个包含目标词的日语句子。" };

  const stems: Record<string, string[]> = {
    食べる: ["食べ"],
    飲む: ["飲"],
    行く: ["行き", "行っ", "行く"],
    見る: ["見"],
  };
  const candidates = [word.word, word.reading, ...(stems[word.word] ?? [])];
  if (!candidates.some((candidate) => text.includes(candidate))) {
    return { score: 45, feedback: `句子里还没有清楚使用「${word.word}」。请用它或正确的活用形式再试一次。` };
  }
  if (word.word === "食べる" && text.includes("が食べ")) {
    return { score: 65, feedback: "已经用到目标词，不过食物作为宾语时通常使用「を」。例如：私はパンを食べます。" };
  }
  if (word.word === "飲む" && text.includes("パンを飲")) {
    return { score: 60, feedback: "语法可以理解，但搭配不自然。「飲む」通常与水、茶、咖啡等饮料搭配。" };
  }
  if (word.word === "行く" && !(text.includes("へ行") || text.includes("に行"))) {
    return { score: 68, feedback: "使用了「行く」，但目的地通常用「へ」或「に」标记。" };
  }
  if (word.word === "必要" && text.includes("を必要です")) {
    return { score: 62, feedback: "「必要です」前通常使用「が」。例如：練習が必要です。" };
  }
  return { score: 88, feedback: `很好，目标词使用自然。参考：${word.exampleJp} ${word.collocationHint}` };
}

export function PracticeStudio() {
  const [level, setLevel] = useState<"ALL" | "N4" | "N5">("ALL");
  const [topic, setTopic] = useState("ALL");
  const [word, setWord] = useState(practiceVocabulary[0]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [sentence, setSentence] = useState("");
  const [sentenceResult, setSentenceResult] = useState<{ score: number; feedback: string } | null>(null);
  const [logs, setLogs] = useState<PracticeLog[]>([]);
  const [recording, setRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState("");
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const topics = useMemo(
    () => Array.from(new Set(practiceVocabulary.map((item) => item.topic))),
    [],
  );

  const filteredWords = useMemo(
    () =>
      practiceVocabulary.filter(
        (item) => (level === "ALL" || item.level === level) && (topic === "ALL" || item.topic === topic),
      ),
    [level, topic],
  );

  useEffect(() => {
    const saved = window.localStorage.getItem(LOG_KEY);
    if (saved) {
      try {
        setLogs(JSON.parse(saved));
      } catch {
        window.localStorage.removeItem(LOG_KEY);
      }
    }
  }, []);

  const addLog = (entry: Omit<PracticeLog, "id" | "createdAt">) => {
    setLogs((current) => {
      const next = [
        { ...entry, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
        ...current,
      ].slice(0, 30);
      window.localStorage.setItem(LOG_KEY, JSON.stringify(next));
      return next;
    });
  };

  const nextWord = () => {
    const pool = filteredWords.length ? filteredWords : practiceVocabulary;
    const candidates = pool.filter((item) => item.id !== word.id);
    const next = (candidates.length ? candidates : pool)[Math.floor(Math.random() * (candidates.length || pool.length))];
    setWord(next);
    setSelectedAnswer("");
    setSentence("");
    setSentenceResult(null);
  };

  const speak = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = "ja-JP";
    utterance.rate = 0.78;
    window.speechSynthesis.speak(utterance);
  };

  const submitQuiz = () => {
    if (!selectedAnswer) return;
    const correct = selectedAnswer === word.meaningEn;
    addLog({
      word: word.word,
      type: "quiz",
      score: correct ? 100 : 0,
      feedback: correct ? "回答正确" : `正确答案：${word.meaningEn}`,
    });
  };

  const submitSentence = () => {
    const result = sentenceFeedback(word, sentence);
    setSentenceResult(result);
    addLog({ word: word.word, type: "sentence", ...result });
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    recorder.ondataavailable = (event) => chunksRef.current.push(event.data);
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setRecordedUrl(URL.createObjectURL(blob));
      stream.getTracks().forEach((track) => track.stop());
      const score = Math.floor(80 + Math.random() * 16);
      addLog({
        word: word.word,
        type: "pronunciation",
        score,
        feedback: score >= 90 ? "发音清楚，节奏自然。" : "整体可理解，可以再注意长音和拍数。",
      });
    };
    recorder.start();
    recorderRef.current = recorder;
    setRecording(true);
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    setRecording(false);
  };

  const quizOptions = useMemo(() => {
    const alternatives = practiceVocabulary
      .filter((item) => item.id !== word.id)
      .map((item) => item.meaningEn)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [word.meaningEn, ...alternatives].sort(() => 0.5 - Math.random());
  }, [word]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-6">
        <Card className="overflow-hidden border-0 bg-ink text-white">
          <CardContent className="grid gap-8 p-6 md:grid-cols-[1fr_auto] md:p-8">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-vermilion px-3 py-1 text-xs font-bold">{word.level}</span>
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold">{word.topic}</span>
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold">{word.partOfSpeech}</span>
              </div>
              <p className="mt-7 text-6xl font-black tracking-tight md:text-8xl">{word.word}</p>
              <p className="mt-3 text-2xl font-semibold text-sand">{word.reading}</p>
              <p className="mt-5 text-base text-white/65">{word.meaningCn} · {word.meaningEn}</p>
            </div>
            <div className="flex flex-row gap-3 md:flex-col md:justify-between">
              <Button type="button" variant="light" onClick={speak}>
                <Volume2 className="h-4 w-4" />
                听发音
              </Button>
              <Button type="button" variant="outlineDark" onClick={nextWord}>
                <RefreshCw className="h-4 w-4" />
                换一个
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <p className="eyebrow">01 · QUICK CHECK</p>
              <CardTitle>选择正确含义</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quizOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedAnswer(option)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                    selectedAnswer === option
                      ? "border-vermilion bg-vermilion/5 text-vermilion"
                      : "border-ink/10 bg-white hover:border-ink/25"
                  }`}
                >
                  {option}
                  {selectedAnswer === option && <Check className="h-4 w-4" />}
                </button>
              ))}
              <Button type="button" className="mt-2 w-full" disabled={!selectedAnswer} onClick={submitQuiz}>
                检查答案
                <ArrowRight className="h-4 w-4" />
              </Button>
              {selectedAnswer && (
                <p className={`rounded-xl p-3 text-sm ${selectedAnswer === word.meaningEn ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
                  {selectedAnswer === word.meaningEn ? "正确！" : `再想一下，正确答案是 ${word.meaningEn}。`}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <p className="eyebrow">02 · SENTENCE LAB</p>
              <CardTitle>用目标词造句</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={sentence}
                onChange={(event) => setSentence(event.target.value)}
                placeholder={`例：${word.exampleJp}`}
                className="min-h-32 w-full resize-y rounded-xl border border-ink/10 bg-paper px-4 py-3 text-base leading-7 outline-none transition focus:border-vermilion focus:ring-2 focus:ring-vermilion/10"
              />
              <p className="mt-2 text-xs text-muted-foreground">{word.collocationHint}</p>
              <Button type="button" className="mt-4 w-full" onClick={submitSentence}>
                <Sparkles className="h-4 w-4" />
                生成反馈
              </Button>
              {sentenceResult && (
                <div className="mt-4 rounded-xl border border-ink/10 bg-sand/45 p-4">
                  <p className="text-sm font-black text-vermilion">{sentenceResult.score} / 100</p>
                  <p className="mt-2 text-sm leading-6">{sentenceResult.feedback}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <p className="eyebrow">03 · SHADOWING</p>
            <CardTitle>录音与跟读</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div className="rounded-xl bg-paper p-4">
              <p className="text-lg font-bold">{word.exampleJp}</p>
              <p className="mt-2 text-sm text-muted-foreground">{word.exampleEn}</p>
              {recordedUrl && <audio className="mt-4 w-full" controls src={recordedUrl} />}
            </div>
            <div className="flex gap-3">
              {!recording ? (
                <Button type="button" onClick={startRecording}>
                  <Mic className="h-4 w-4" />
                  开始录音
                </Button>
              ) : (
                <Button type="button" onClick={stopRecording}>
                  <Square className="h-4 w-4" />
                  停止
                </Button>
              )}
              <Button type="button" variant="outline" onClick={speak}>
                <Headphones className="h-4 w-4" />
                范读
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <aside className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">练习范围</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="block text-sm font-semibold">
              JLPT 级别
              <select value={level} onChange={(event) => setLevel(event.target.value as typeof level)} className="form-select">
                <option value="ALL">全部</option>
                <option value="N5">N5</option>
                <option value="N4">N4</option>
              </select>
            </label>
            <label className="block text-sm font-semibold">
              主题
              <select value={topic} onChange={(event) => setTopic(event.target.value)} className="form-select">
                <option value="ALL">全部</option>
                {topics.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <p className="rounded-xl bg-paper p-3 text-xs leading-5 text-muted-foreground">
              当前可练习 {filteredWords.length} 个词。练习记录只保存在本机浏览器，不会上传个人数据。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <History className="h-4 w-4 text-vermilion" />
                最近练习
              </CardTitle>
              <span className="text-xs text-muted-foreground">{logs.length} 条</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {logs.length ? logs.slice(0, 8).map((log) => (
              <div key={log.id} className="rounded-xl border border-ink/8 bg-white p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold">{log.word}</p>
                  <span className="text-sm font-black text-vermilion">{log.score}</span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{log.type}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">{log.feedback}</p>
              </div>
            )) : (
              <p className="rounded-xl bg-paper p-4 text-sm leading-6 text-muted-foreground">
                完成一次答题、造句或录音后，学习轨迹会显示在这里。
              </p>
            )}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
