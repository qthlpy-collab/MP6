# Nihongo Studio

一个整合式的 JLPT N5–N4 日语学习平台，由两个原型项目合并而成：

- Next.js 日语学习平台：词汇、语法、阅读、听力、汉字、假名、课程知识块
- N4/N5 练习 Demo：随机词汇、选择题、造句反馈、录音练习、学习记录

## 主要功能

- N5 词汇库与多语言搜索
- 图像、故事、假名编码记忆
- N5 语法库、例句和测验
- 汉字知识块与笔顺展示
- 假名编码学习
- 听力训练计划
- AI 日语句子讲解
- N4/N5 综合练习工作台
- 浏览器本地练习历史，不需要账号
- 响应式中、日、英混合教学界面

## 技术栈

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Gemini API（主要 AI 句子分析）
- OpenAI / Vercel AI Gateway（可选回退）

## 本地运行

```bash
npm install
cp .env.example .env.local
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)。

Windows PowerShell 可以使用：

```powershell
Copy-Item .env.example .env.local
npm run dev
```

AI 功能不是浏览静态学习内容的必要条件。没有配置 API Key 时，词汇、语法、听力和练习工作台仍然可以使用。

## 环境变量

```env
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
AI_GATEWAY_API_KEY=
```

请勿把真实密钥提交到 GitHub。

## 验证

```bash
npm run lint
npm run build
```

## 部署

推荐直接导入 Vercel：

1. 把项目推送到 GitHub。
2. 在 Vercel 中选择该仓库。
3. 添加需要的环境变量。
4. 使用默认 Next.js 构建设置部署。

## 数据与隐私

- 练习工作台的历史记录保存在浏览器 `localStorage`。
- 录音只在当前浏览器会话内生成预览 URL。
- 阅读助手只会把用户选择分析的句子发送给配置的 AI 服务。
- 项目不包含用户账号或生产数据库。

## 项目来源

本仓库合并并重构了：

- `ai-japanese-learning-platform-source-20260616`
- `n4n5_demo_project`

第二个项目的练习逻辑与词汇数据已移植到 Next.js 页面 `/practice`，不再需要单独启动 Node.js Demo 服务。
