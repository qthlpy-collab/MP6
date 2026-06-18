import { PageShell } from "@/components/page-shell";
import { PracticeStudio } from "@/components/practice-studio";

export default function PracticePage() {
  return (
    <PageShell>
      <section className="mb-8 max-w-3xl">
        <p className="eyebrow">N4 / N5 PRACTICE STUDIO</p>
        <h1 className="display-title mt-4">Turn familiar words into Japanese you can actually use.</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
          Practice random vocabulary, quick quizzes, sentence writing, and pronunciation in one
          focused workflow. No account is required, and recent activity stays in your browser.
        </p>
      </section>
      <PracticeStudio />
    </PageShell>
  );
}
