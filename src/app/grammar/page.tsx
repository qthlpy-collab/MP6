import { GrammarLibrary } from "@/components/grammar-library";
import { PageShell } from "@/components/page-shell";
import { grammarPoints } from "@/data/grammar";

export default function GrammarPage() {
  return (
    <PageShell>
      <section className="mb-8">
        <p className="text-sm font-semibold text-pink-600">JLPT N5 Grammar</p>
        <h1 className="text-gradient mt-3 text-4xl font-bold md:text-5xl">Grammar Library</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Browse structured N5 grammar notes with multilingual explanations, examples, common
          mistakes, usage, and practice.
        </p>
      </section>
      <GrammarLibrary grammarPoints={grammarPoints} />
    </PageShell>
  );
}
