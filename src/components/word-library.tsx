"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { LearningWord } from "@/types/learning";
import { WordCard } from "@/components/word-card";

const filters = [
  { value: "all", label: "All" },
  { value: "with-image", label: "With Image" },
  { value: "without-image", label: "Without Image" },
  { value: "with-animation", label: "With Animation" },
  { value: "without-animation", label: "Without Animation" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

export function WordLibrary({ words }: { words: LearningWord[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterValue>("all");

  const filteredWords = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return words.filter((word) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "with-image" && word.hasImage) ||
        (filter === "without-image" && !word.hasImage) ||
        (filter === "with-animation" && word.hasVideo) ||
        (filter === "without-animation" && !word.hasVideo);

      if (!matchesFilter || !normalizedQuery) {
        return matchesFilter;
      }

      return [word.word, word.kana, word.romaji, word.meaningCn, word.meaningEn].some((value) =>
        value.toLocaleLowerCase().includes(normalizedQuery),
      );
    });
  }, [filter, query, words]);

  return (
    <div>
      <section className="mb-7 space-y-4">
        <div className="relative max-w-2xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search word, kana, romaji, Chinese, or English"
            className="w-full rounded-full border border-ink/10 bg-white/90 py-3 pl-12 pr-5 text-sm shadow-sm outline-none transition focus:border-vermilion focus:ring-2 focus:ring-vermilion/10"
          />
        </div>

        <div className="flex flex-wrap gap-2" aria-label="Vocabulary filters">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                filter === item.value
                  ? "border-transparent bg-ink text-white shadow-sm"
                  : "border-ink/10 bg-white/70 text-muted-foreground hover:border-ink/25 hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filteredWords.length}</span> of {words.length} N5 words
        </p>
      </section>

      {filteredWords.length > 0 ? (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWords.map((word) => (
            <WordCard key={word.id} word={word} />
          ))}
        </section>
      ) : (
        <div className="rounded-2xl border border-ink/10 bg-white/80 px-6 py-14 text-center">
          <p className="font-semibold">No vocabulary found</p>
          <p className="mt-2 text-sm text-muted-foreground">Try another keyword or filter.</p>
        </div>
      )}
    </div>
  );
}
