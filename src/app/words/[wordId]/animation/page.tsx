import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AnimationPanel } from "@/components/animation-panel";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { getWord, words } from "@/data/words";

export function generateStaticParams() {
  return words.map((word) => ({ wordId: word.id }));
}

export default async function WordAnimationPage({ params }: { params: Promise<{ wordId: string }> }) {
  const { wordId } = await params;
  const word = getWord(wordId);
  if (!word) notFound();

  return (
    <PageShell>
      <Button asChild variant="ghost" className="mb-6">
        <Link href={`/words/${word.id}`}><ArrowLeft className="h-4 w-4" />Back to {word.word}</Link>
      </Button>
      <h1 className="text-gradient mb-6 text-4xl font-bold">{word.word} Animation</h1>
      <AnimationPanel word={word} />
    </PageShell>
  );
}
