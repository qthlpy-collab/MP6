import { PageShell } from "@/components/page-shell";
import { SentenceTeachingAssistant } from "@/components/sentence-teaching-assistant";

export default function ReadingPage() {
  return (
    <PageShell>
      <section className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold text-pink-600">教师阅读助手</p>
        <h1 className="text-gradient mt-3 text-4xl font-bold tracking-normal md:text-5xl">
          快速讲解日语句子
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          粘贴日语文本，自动拆分句子，并为选中的单句生成日语、中文或英语教学讲解。
        </p>
      </section>
      <SentenceTeachingAssistant />
    </PageShell>
  );
}
