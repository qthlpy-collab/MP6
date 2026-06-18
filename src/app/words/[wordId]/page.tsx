import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Film } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WordTabs } from "@/components/word-tabs";
import { getWord, words } from "@/data/words";

export function generateStaticParams() {
  return words.map((word) => ({ wordId: word.id }));
}

export default async function WordDetailPage({ params }: { params: Promise<{ wordId: string }> }) {
  const { wordId } = await params;
  const word = getWord(wordId);
  if (!word) notFound();

  return (
    <PageShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost"><Link href="/"><ArrowLeft className="h-4 w-4" />Back home</Link></Button>
        <Button asChild variant={word.videoPath ? "default" : "secondary"}>
          <Link href={`/words/${word.id}/animation`}><Film className="h-4 w-4" />{word.videoPath ? "Play animation" : "Animation Coming Soon"}</Link>
        </Button>
      </div>
      <section className="relative mb-8 overflow-hidden rounded-lg border border-blue-100 bg-white/95 p-6 shadow-soft">
        <div className="brand-gradient absolute inset-x-0 top-0 h-1" />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-gradient text-5xl font-bold">{word.kanji}</h1>
              <Badge className={word.hasVideo ? "border-blue-200 bg-blue-50 text-primary" : "bg-muted"}>
                {word.hasVideo ? "Animation available" : "Animation Coming Soon"}
              </Badge>
            </div>
            <p className="mt-3 text-2xl font-semibold text-primary">{word.kana}</p>
            <p className="mt-2 text-muted-foreground">{word.meaningEn} · {word.romaji}</p>
          </div>
          <div className="rounded-lg border border-pink-100 bg-gradient-to-r from-blue-50 to-pink-50 p-4 text-sm font-semibold text-blue-950">
            {word.kanaSplit.join(" + ")} → {word.codeSplit.map((item) => item.codeWord).join(" + ")}
          </div>
        </div>
      </section>
      <WordTabs word={word} />
    </PageShell>
  );
}
