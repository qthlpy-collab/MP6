import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { GrammarExplanation } from "@/components/grammar-explanation";
import { GrammarExampleList } from "@/components/grammar-example-list";
import { GrammarQuiz } from "@/components/grammar-quiz";
import { LanguageExplanationSelector } from "@/components/language-explanation-selector";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGrammarPoint, grammarPoints } from "@/data/grammar";

export function generateStaticParams() {
  return grammarPoints.map((point) => ({ grammarId: point.id }));
}

export default async function GrammarDetailPage({
  params,
}: {
  params: Promise<{ grammarId: string }>;
}) {
  const { grammarId } = await params;
  const point = getGrammarPoint(grammarId);

  if (!point) notFound();

  return (
    <PageShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="ghost">
          <Link href="/grammar">
            <ArrowLeft className="h-4 w-4" />
            Back to grammar
          </Link>
        </Button>
        <LanguageExplanationSelector />
      </div>

      <section className="mb-6 rounded-lg border border-blue-100 bg-white/95 p-6 shadow-soft">
        <p className="text-sm font-semibold text-pink-600">Lesson {point.lesson} · {point.level}</p>
        <h1 className="text-gradient mt-3 text-4xl font-bold">{point.title}</h1>
        <p className="mt-4 rounded-lg bg-gradient-to-r from-blue-50 to-pink-50 p-4 text-lg font-semibold">
          {point.pattern}
        </p>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Explanation</CardTitle></CardHeader>
          <CardContent><GrammarExplanation explanation={point.explanation} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Usage</CardTitle></CardHeader>
          <CardContent><p className="leading-7 text-muted-foreground">{point.usage}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Examples</CardTitle></CardHeader>
          <CardContent><GrammarExampleList grammarId={point.id} examples={point.examples} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Common Mistakes</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {point.commonMistakes.map((mistake) => (
              <p key={mistake} className="rounded-lg border border-pink-100 bg-pink-50/60 p-3 text-sm">
                {mistake}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader><CardTitle>Practice</CardTitle></CardHeader>
        <CardContent><GrammarQuiz quiz={point.quiz} /></CardContent>
      </Card>
    </PageShell>
  );
}
