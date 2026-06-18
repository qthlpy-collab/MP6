import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getKanaCode, kanaCodes } from "@/data/kana-codes";
import { words } from "@/data/words";

export function generateStaticParams() {
  return kanaCodes.map((item) => ({ kana: item.kana }));
}

export default async function KanaDetailPage({ params }: { params: Promise<{ kana: string }> }) {
  const { kana } = await params;
  const item = getKanaCode(decodeURIComponent(kana));
  if (!item) notFound();

  const relatedWords = words.filter((word) => word.kana.includes(item.kana)).slice(0, 12);

  return (
    <PageShell>
      <Button asChild variant="ghost" className="mb-6">
        <Link href="/kana"><ArrowLeft className="h-4 w-4" />Back to kana</Link>
      </Button>
      <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
        <Card>
          <CardHeader><CardTitle className="text-6xl text-primary">{item.kana}</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm uppercase text-muted-foreground">{item.romaji}</p>
            <p className="mt-2 text-2xl font-semibold">{item.codeWord}</p>
            <div className="relative mt-5 aspect-square overflow-hidden rounded-lg border bg-white">
              <Image src={item.imageSrc} alt={item.imageHint} fill className="object-contain" sizes="320px" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Related Words</CardTitle></CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {relatedWords.length ? relatedWords.map((word) => (
              <Link key={word.id} href={`/words/${word.id}`} className="rounded-lg border bg-background p-4 transition hover:border-primary">
                <p className="text-xl font-bold">{word.word}</p>
                <p className="mt-1 text-primary">{word.kana}</p>
                <p className="mt-2 text-sm text-muted-foreground">{word.meaningEn}</p>
              </Link>
            )) : <p className="text-muted-foreground">No related words yet.</p>}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
