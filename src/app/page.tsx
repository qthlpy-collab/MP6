import { PageShell } from "@/components/page-shell";
import { WordLibrary } from "@/components/word-library";
import { words } from "@/data/words";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Headphones, Languages, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <PageShell>
      <section className="relative mb-14 overflow-hidden rounded-[2rem] bg-ink px-6 py-10 text-white sm:px-10 md:py-14 lg:px-14">
        <div className="absolute -right-16 -top-28 h-80 w-80 rounded-full border-[46px] border-white/5" />
        <div className="absolute bottom-8 right-12 hidden text-[12rem] font-black leading-none text-white/[0.035] lg:block">語</div>
        <div className="relative max-w-3xl">
          <p className="eyebrow text-sand">AI-ASSISTED JAPANESE LEARNING</p>
          <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-[-0.04em] sm:text-5xl md:text-6xl">
            从“记住一个词”，<br />
            到<span className="text-sand">真正说出来。</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/65">
            词汇、语法、假名、汉字、听力、阅读与造句练习，被整理为一条清晰的学习路径。适合 JLPT N5–N4 自学与课堂演示。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="light" size="lg">
              <Link href="/practice">
                进入练习工作台
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outlineDark" size="lg">
              <Link href="/lessons">查看课程地图</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BrainCircuit, value: words.length, label: "记忆词汇", note: "图像与编码联想" },
          { icon: Languages, value: "N5", label: "语法体系", note: "例句、误区与测验" },
          { icon: Headphones, value: "4", label: "核心技能", note: "听说读写循环训练" },
          { icon: Sparkles, value: "AI", label: "句子讲解", note: "多语言教学反馈" },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-ink/10 bg-white/70 p-5">
            <item.icon className="h-5 w-5 text-vermilion" />
            <p className="mt-5 text-3xl font-black tracking-tight">{item.value}</p>
            <p className="mt-1 text-sm font-bold">{item.label}</p>
            <p className="mt-2 text-xs text-muted-foreground">{item.note}</p>
          </div>
        ))}
      </section>

      <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">VOCABULARY LIBRARY</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">从今天要记住的词开始。</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          搜索日语、罗马字、中文或英文，并用图像、故事和假名编码建立长期记忆。
        </p>
      </section>
      <WordLibrary words={words} />
    </PageShell>
  );
}
