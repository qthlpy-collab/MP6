import { PageShell } from "@/components/page-shell";
import { PracticeStudio } from "@/components/practice-studio";

export default function PracticePage() {
  return (
    <PageShell>
      <section className="mb-8 max-w-3xl">
        <p className="eyebrow">N4 / N5 PRACTICE STUDIO</p>
        <h1 className="display-title mt-4">把认识的词，变成真正会用的日语。</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
          随机词汇、即时选择题、造句反馈与发音跟读集中在一个练习流程中。无需账号，也可以在浏览器中保留最近学习记录。
        </p>
      </section>
      <PracticeStudio />
    </PageShell>
  );
}
