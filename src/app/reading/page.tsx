import { PageShell } from "@/components/page-shell";
import { SentenceTeachingAssistant } from "@/components/sentence-teaching-assistant";

export default function ReadingPage() {
  return (
    <PageShell>
      <section className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold text-pink-600">TEACHER READING ASSISTANT</p>
        <h1 className="text-gradient mt-3 text-4xl font-bold tracking-normal md:text-5xl">
          Explain Japanese sentences quickly
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Paste Japanese text, split it into sentences automatically, and generate structured
          teaching notes for any selected sentence.
        </p>
      </section>
      <SentenceTeachingAssistant />
    </PageShell>
  );
}
