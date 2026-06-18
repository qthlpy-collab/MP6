"use client";

import Link from "next/link";
import { ArrowRight, BookOpenCheck, Heart, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { GrammarPoint } from "@/types/grammar";
import { GrammarExplanation } from "@/components/grammar-explanation";
import { LanguageExplanationSelector } from "@/components/language-explanation-selector";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SortMode = "lesson" | "kana";
const STORAGE_KEY = "n5-grammar-favorites";

export function GrammarLibrary({ grammarPoints }: { grammarPoints: GrammarPoint[] }) {
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("lesson");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setFavorites(JSON.parse(saved) as string[]);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const visiblePoints = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return grammarPoints
      .filter((point) => {
        const matchesSearch =
          !normalized ||
          [point.title, point.pattern, ...Object.values(point.explanation)].some((value) =>
            value.toLocaleLowerCase().includes(normalized),
          );
        return matchesSearch && (!showFavorites || favorites.includes(point.id));
      })
      .sort((a, b) =>
        sortMode === "kana"
          ? a.kanaOrder.localeCompare(b.kanaOrder, "ja")
          : a.lesson - b.lesson || a.title.localeCompare(b.title, "ja"),
      );
  }, [favorites, grammarPoints, query, showFavorites, sortMode]);

  return (
    <div>
      <section className="mb-7 space-y-4">
        <div className="relative max-w-2xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search grammar name"
            className="h-12 w-full rounded-lg border border-blue-100 bg-white/90 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-blue-100 bg-blue-50/80 p-1">
            {(["lesson", "kana"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setSortMode(mode)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  sortMode === mode ? "bg-white text-primary shadow-sm" : "text-muted-foreground"
                }`}
              >
                {mode === "lesson" ? "Lesson Order" : "Kana Order"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowFavorites((current) => !current)}
            className={`inline-flex h-11 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition ${
              showFavorites
                ? "border-pink-200 bg-pink-50 text-pink-700"
                : "border-blue-100 bg-white/80 text-muted-foreground hover:text-pink-600"
            }`}
          >
            <Heart className={`h-4 w-4 ${showFavorites ? "fill-current" : ""}`} />
            Favorites ({favorites.length})
          </button>
          <LanguageExplanationSelector />
        </div>
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{visiblePoints.length}</span> of{" "}
          {grammarPoints.length} sample N5 grammar points
        </p>
      </section>

      {visiblePoints.length ? (
        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visiblePoints.map((point) => {
            const isFavorite = favorites.includes(point.id);
            return (
              <Card
                key={point.id}
                className="group flex h-full flex-col transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(37,99,235,0.13)]"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <Badge className="border-blue-100 bg-blue-50 text-primary">Lesson {point.lesson}</Badge>
                        <Badge className="border-pink-100 bg-pink-50 text-pink-700">{point.level}</Badge>
                      </div>
                      <CardTitle className="text-2xl transition-colors group-hover:text-primary">
                        {point.title}
                      </CardTitle>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(point.id)}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition ${
                        isFavorite
                          ? "border-pink-200 bg-pink-50 text-pink-600"
                          : "border-blue-100 bg-white text-muted-foreground hover:text-pink-600"
                      }`}
                      aria-label={isFavorite ? `Remove ${point.title} from favorites` : `Add ${point.title} to favorites`}
                    >
                      <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <div className="rounded-md border border-pink-100 bg-gradient-to-r from-blue-50 to-pink-50 p-3 text-sm font-semibold text-blue-950">
                    {point.pattern}
                  </div>
                  <div className="mt-4 line-clamp-6">
                    <GrammarExplanation explanation={point.explanation} compact />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <BookOpenCheck className="h-4 w-4 shrink-0 text-primary" />
                    <span className="line-clamp-1">{point.examples[0]?.japanese}</span>
                  </div>
                  <Link
                    href={`/grammar/${point.id}`}
                    className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-md border border-blue-100 bg-white/80 px-4 text-sm font-medium transition hover:border-blue-200 hover:bg-blue-50 hover:text-primary"
                  >
                    View grammar
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </section>
      ) : (
        <div className="rounded-lg border border-blue-100 bg-white/80 px-6 py-14 text-center">
          <p className="font-semibold">No grammar points found</p>
          <p className="mt-2 text-sm text-muted-foreground">Try another search or view all items.</p>
        </div>
      )}
    </div>
  );
}
