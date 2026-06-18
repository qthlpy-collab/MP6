"use client";

import {
  BookOpenCheck,
  Check,
  ChevronRight,
  Languages,
  LoaderCircle,
  MessageSquareText,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { splitJapaneseText } from "@/lib/split-japanese-text";
import type {
  ExplanationLanguage,
  LocalizedText,
  SentenceAnalysis,
} from "@/types/sentence-analysis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const languageOptions: Array<{
  code: ExplanationLanguage;
  label: string;
  shortLabel: string;
}> = [
  { code: "ja", label: "日本語", shortLabel: "JA" },
  { code: "zh", label: "中文", shortLabel: "ZH" },
  { code: "en", label: "English", shortLabel: "EN" },
];

const sampleText =
  "昨日は雨が降っていましたが、今日はとてもいい天気です。授業が終わったら、友達と図書館へ行くつもりです。";

export function SentenceTeachingAssistant() {
  const [text, setText] = useState("");
  const [sentences, setSentences] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<ExplanationLanguage[]>([
    "ja",
    "zh",
    "en",
  ]);
  const [selectedSentence, setSelectedSentence] = useState("");
  const [analysis, setAnalysis] = useState<SentenceAnalysis | null>(null);
  const [loadingSentence, setLoadingSentence] = useState("");
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  const characterCount = useMemo(() => Array.from(text).length, [text]);

  useEffect(() => {
    if (analysis || error) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [analysis, error]);

  const toggleLanguage = (language: ExplanationLanguage) => {
    setSelectedLanguages((current) => {
      if (current.includes(language)) {
        if (current.length === 1) {
          return current;
        }
        setAnalysis(null);
        return current.filter((item) => item !== language);
      }
      setAnalysis(null);
      return [...current, language];
    });
  };

  const analyzeText = () => {
    const nextSentences = splitJapaneseText(text);
    setSentences(nextSentences);
    setSelectedSentence("");
    setAnalysis(null);
    setError(nextSentences.length ? "" : "Paste some Japanese text before analyzing.");
  };

  const analyzeSentence = async (sentence: string) => {
    setSelectedSentence(sentence);
    setLoadingSentence(sentence);
    setAnalysis(null);
    setError("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence }),
      });
      const result = (await response.json()) as SentenceAnalysis & { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to analyze this sentence.");
      }

      setAnalysis(result);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Unable to analyze this sentence.",
      );
    } finally {
      setLoadingSentence("");
    }
  };

  const reset = () => {
    setText("");
    setSentences([]);
    setSelectedSentence("");
    setAnalysis(null);
    setError("");
  };

  return (
    <div className="space-y-7">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-blue-100 bg-white/70">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquareText className="h-5 w-5 text-primary" />
                  Japanese text
                </CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">
                  Paste the material you want to discuss in class. It stays in this browser session.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setText(sampleText)}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Use sample
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="ここに日本語の文章を貼り付けてください。"
              className="min-h-64 w-full resize-y rounded-lg border border-blue-100 bg-white p-4 text-lg leading-8 outline-none transition placeholder:text-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/15"
              maxLength={12000}
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                {characterCount.toLocaleString()} / 12,000 characters
              </p>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" onClick={reset} disabled={!text && !sentences.length}>
                  <RotateCcw className="h-4 w-4" />
                  Clear
                </Button>
                <Button type="button" onClick={analyzeText} disabled={!text.trim()}>
                  <Sparkles className="h-4 w-4" />
                  Analyze Text
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-primary" />
              Explanation languages
            </CardTitle>
            <p className="text-sm leading-6 text-muted-foreground">
              Choose what the teacher sees. At least one language must remain selected.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {languageOptions.map((language) => {
              const checked = selectedLanguages.includes(language.code);
              return (
                <label
                  key={language.code}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition ${
                    checked
                      ? "border-primary bg-blue-50 text-blue-950"
                      : "border-blue-100 bg-white hover:bg-blue-50/60"
                  }`}
                >
                  <span>
                    <span className="block text-sm font-semibold">{language.label}</span>
                    <span className="text-xs text-muted-foreground">{language.shortLabel}</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleLanguage(language.code)}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded border ${
                      checked ? "border-primary bg-primary text-white" : "border-blue-200 bg-white"
                    }`}
                  >
                    {checked && <Check className="h-3.5 w-3.5" />}
                  </span>
                </label>
              );
            })}
            <div className="rounded-lg bg-muted p-3 text-xs leading-5 text-muted-foreground">
              Language choices and pasted text are kept in memory only and are cleared on refresh.
            </div>
          </CardContent>
        </Card>
      </section>

      {sentences.length > 0 && (
        <section>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-pink-600">Sentence list</p>
              <h2 className="mt-1 text-2xl font-bold">Choose a sentence to explain</h2>
            </div>
            <p className="text-sm text-muted-foreground">{sentences.length} sentences detected</p>
          </div>
          <div className="grid gap-3">
            {sentences.map((sentence, index) => {
              const loading = loadingSentence === sentence;
              const selected = selectedSentence === sentence;
              return (
                <button
                  key={`${index}-${sentence}`}
                  type="button"
                  onClick={() => void analyzeSentence(sentence)}
                  disabled={Boolean(loadingSentence)}
                  className={`group flex w-full items-start gap-4 rounded-lg border p-4 text-left shadow-sm transition ${
                    selected
                      ? "border-primary bg-blue-50/80 ring-2 ring-primary/10"
                      : "border-blue-100 bg-white/90 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-soft"
                  } disabled:cursor-wait`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-base font-medium leading-7">{sentence}</span>
                  {loading ? (
                    <LoaderCircle className="mt-1 h-5 w-5 animate-spin text-primary" />
                  ) : (
                    <ChevronRight className="mt-1 h-5 w-5 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {error && (
        <div ref={resultRef} role="alert" className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-700">
          <p className="font-semibold">Analysis could not be completed</p>
          <p className="mt-2 text-sm">{error}</p>
          {selectedSentence && (
            <Button
              type="button"
              variant="outline"
              className="mt-4 border-red-200 bg-white text-red-700 hover:bg-red-100"
              onClick={() => void analyzeSentence(selectedSentence)}
            >
              <Sparkles className="h-4 w-4" />
              重新分析
            </Button>
          )}
        </div>
      )}

      {loadingSentence && (
        <Card>
          <CardContent className="flex items-center gap-3 py-8">
            <LoaderCircle className="h-6 w-6 animate-spin text-primary" />
            <div>
              <p className="font-semibold">Preparing the teaching explanation...</p>
              <p className="mt-1 text-sm text-muted-foreground">Only the selected sentence was sent for analysis.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {analysis && !loadingSentence && (
        <div ref={resultRef}>
          <AnalysisResult analysis={analysis} selectedLanguages={selectedLanguages} />
        </div>
      )}
    </div>
  );
}

function AnalysisResult({
  analysis,
  selectedLanguages,
}: {
  analysis: SentenceAnalysis;
  selectedLanguages: ExplanationLanguage[];
}) {
  return (
    <section className="space-y-5" aria-live="polite">
      <div>
        <p className="text-sm font-semibold text-pink-600">AI teaching notes</p>
        <h2 className="mt-1 text-2xl font-bold">{analysis.sentence}</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sentence explanation</CardTitle>
        </CardHeader>
        <CardContent>
          <LocalizedBlocks content={analysis.explanations} languages={selectedLanguages} />
        </CardContent>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vocabulary breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analysis.vocabulary.map((item, index) => (
              <div key={`${item.surface}-${index}`} className="rounded-lg border bg-background p-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-xl font-bold">{item.surface}</span>
                  <span className="text-sm font-semibold text-primary">{item.reading}</span>
                  <span className="rounded bg-muted px-2 py-1 text-xs text-muted-foreground">
                    {item.partOfSpeech}
                  </span>
                </div>
                <div className="mt-3">
                  <LocalizedBlocks content={item.meanings} languages={selectedLanguages} compact />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grammar points</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {analysis.grammar.map((item, index) => (
              <div key={`${item.pattern}-${index}`} className="rounded-lg border bg-background p-4">
                <p className="font-bold text-primary">{item.pattern}</p>
                <div className="mt-3">
                  <LocalizedBlocks
                    content={item.explanations}
                    languages={selectedLanguages}
                    compact
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpenCheck className="h-5 w-5 text-primary" />
            Similar example sentences
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {analysis.similarExamples.map((example, index) => (
            <div key={`${example.japanese}-${index}`} className="rounded-lg border bg-background p-4">
              <p className="text-lg font-semibold leading-7">{example.japanese}</p>
              <div className="mt-3">
                <LocalizedBlocks
                  content={example.translations}
                  languages={selectedLanguages}
                  compact
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

function LocalizedBlocks({
  content,
  languages,
  compact = false,
}: {
  content: LocalizedText;
  languages: ExplanationLanguage[];
  compact?: boolean;
}) {
  return (
    <div className={compact ? "space-y-2" : "grid gap-3 md:grid-cols-3"}>
      {languages.map((language) => {
        const text = content[language];
        if (!text) return null;
        const languageOption = languageOptions.find((item) => item.code === language);
        return (
          <div
            key={language}
            className={compact ? "text-sm leading-6" : "rounded-lg border border-blue-100 bg-blue-50/40 p-4"}
          >
            <span className="mr-2 text-xs font-bold text-primary">{languageOption?.shortLabel}</span>
            <span className="text-muted-foreground">{text}</span>
          </div>
        );
      })}
    </div>
  );
}
