import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Film, ImageIcon } from "lucide-react";
import type { LearningWord } from "@/types/learning";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WordCard({ word }: { word: LearningWord }) {
  return (
    <Card className="group overflow-hidden transition-all hover:-translate-y-1 hover:border-vermilion/30 hover:shadow-[0_22px_55px_rgba(23,33,31,0.12)]">
      <div className="relative aspect-[16/9] border-b border-ink/5 bg-gradient-to-br from-paper to-sand/50">
        {word.imagePath ? (
          <Image
            src={word.imagePath}
            alt={word.memoryTitle || word.word}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
            <ImageIcon className="mb-2 h-6 w-6 text-vermilion/45" />
            <span className="text-xs font-medium">Image Coming Soon</span>
          </div>
        )}
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-3xl transition-colors group-hover:text-vermilion">{word.kanji}</CardTitle>
            <p className="mt-2 text-lg font-bold text-vermilion">{word.kana}</p>
            <p className="mt-2 text-sm font-semibold">{word.memoryTitle || word.romaji}</p>
          </div>
          {word.hasVideo ? (
            <Badge className="border-vermilion/20 bg-vermilion/10 text-vermilion">
              <Film className="mr-1 h-3 w-3" />
              Animation
            </Badge>
          ) : (
            <Badge className="bg-muted text-muted-foreground">No animation</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{word.meaningEn}</p>
        <p className="mt-1 text-xs text-muted-foreground">{word.meaningCn} · Lesson {word.lesson}</p>
        <p className="mt-1 text-sm font-medium">{word.kanaSplit.join(" + ")}</p>
        {word.memoryTitle && <div className="mt-4 flex flex-wrap gap-2">
          {word.codeSplit.map((item) => (
            <span
              key={`${word.id}-${item.kana}`}
              className="rounded-md border border-vermilion/10 bg-vermilion/5 px-2 py-1 text-xs font-semibold text-vermilion"
            >
              {item.kana} → {item.codeWord}
            </span>
          ))}
        </div>}
        <Button asChild className="mt-5 w-full">
          <Link href={`/words/${word.id}`}>
            Start learning
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
