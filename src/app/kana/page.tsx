import { KanaCard } from "@/components/kana-card";
import { PageShell } from "@/components/page-shell";
import { kanaCodes } from "@/data/kana-codes";

export default function KanaLibraryPage() {
  return (
    <PageShell>
      <section className="mb-8">
        <p className="text-sm font-semibold text-pink-600">Kana Encoding Library</p>
        <h1 className="text-gradient mt-3 text-4xl font-bold">Kana Code Library</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Click any kana to view its English code word, source image, and related sample words.
        </p>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kanaCodes.map((item) => <KanaCard key={`${item.kana}-${item.romaji}`} item={item} />)}
      </section>
    </PageShell>
  );
}
