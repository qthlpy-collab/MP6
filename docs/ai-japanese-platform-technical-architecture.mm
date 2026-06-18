<?xml version="1.0" encoding="UTF-8"?>
<map version="1.0.1">
  <node TEXT="AI Japanese Learning Platform 技术架构">
    <node TEXT="前端技术栈" POSITION="right">
      <node TEXT="Next.js 15">
        <node TEXT="App Router"/>
        <node TEXT="Server Components"/>
        <node TEXT="Client Components"/>
        <node TEXT="Static Site Generation (SSG)"/>
        <node TEXT="Dynamic Routes"/>
        <node TEXT="API Routes"/>
      </node>
      <node TEXT="React 19">
        <node TEXT="Hooks"/>
        <node TEXT="Context Provider"/>
        <node TEXT="Component State"/>
      </node>
      <node TEXT="TypeScript">
        <node TEXT="Strict Type Checking"/>
        <node TEXT="Content Models"/>
        <node TEXT="Component Props"/>
      </node>
      <node TEXT="UI Layer">
        <node TEXT="Tailwind CSS"/>
        <node TEXT="Reusable Components">
          <node TEXT="Button"/>
          <node TEXT="Card"/>
          <node TEXT="Badge"/>
          <node TEXT="Tabs"/>
        </node>
        <node TEXT="Lucide Icons"/>
        <node TEXT="Responsive Layout"/>
      </node>
    </node>

    <node TEXT="应用路由层" POSITION="right">
      <node TEXT="Vocabulary">
        <node TEXT="/"/>
        <node TEXT="/words/[wordId]"/>
        <node TEXT="/words/[wordId]/animation"/>
      </node>
      <node TEXT="Grammar">
        <node TEXT="/grammar"/>
        <node TEXT="/grammar/[grammarId]"/>
      </node>
      <node TEXT="Reading">
        <node TEXT="/reading"/>
        <node TEXT="/api/analyze"/>
      </node>
      <node TEXT="Listening">
        <node TEXT="/listening"/>
      </node>
      <node TEXT="Kanji">
        <node TEXT="/kanji"/>
        <node TEXT="/kanji/[kanjiId]"/>
      </node>
      <node TEXT="Lessons">
        <node TEXT="/lessons"/>
        <node TEXT="/lessons/[lessonId]"/>
      </node>
      <node TEXT="Kana">
        <node TEXT="/kana"/>
        <node TEXT="/kana/[kana]"/>
      </node>
    </node>

    <node TEXT="Knowledge Blocks 数据架构" POSITION="right">
      <node TEXT="Lesson Block">
        <node TEXT="id"/>
        <node TEXT="title"/>
        <node TEXT="textbookSource"/>
        <node TEXT="vocabularyIds"/>
        <node TEXT="grammarIds"/>
        <node TEXT="kanjiIds"/>
        <node TEXT="listeningIds"/>
        <node TEXT="readingIds"/>
      </node>
      <node TEXT="Vocabulary Block">
        <node TEXT="id"/>
        <node TEXT="word"/>
        <node TEXT="reading"/>
        <node TEXT="meaning"/>
        <node TEXT="chineseMeaning"/>
        <node TEXT="kanjiIds"/>
        <node TEXT="lessonIds"/>
      </node>
      <node TEXT="Kanji Block">
        <node TEXT="Level 1: Basic Recognition">
          <node TEXT="kanji"/>
          <node TEXT="onyomi"/>
          <node TEXT="kunyomi"/>
          <node TEXT="meaning"/>
          <node TEXT="chineseMeaning"/>
          <node TEXT="stroke order placeholder"/>
        </node>
        <node TEXT="Level 2: Word Expansion">
          <node TEXT="lesson vocabulary"/>
          <node TEXT="familyWords"/>
        </node>
        <node TEXT="Level 3: Advanced Pattern">
          <node TEXT="Component Pattern Family"/>
          <node TEXT="Meaning Component Family"/>
          <node TEXT="Similar Pronunciation Words"/>
        </node>
      </node>
      <node TEXT="Relationship Queries">
        <node TEXT="Lesson → Vocabulary"/>
        <node TEXT="Lesson → Kanji"/>
        <node TEXT="Vocabulary → Kanji"/>
        <node TEXT="Kanji → Vocabulary"/>
        <node TEXT="Kanji → Lesson"/>
      </node>
    </node>

    <node TEXT="Listening Training Engine" POSITION="left">
      <node TEXT="Listening Content Library">
        <node TEXT="Numbers"/>
        <node TEXT="Time"/>
        <node TEXT="Dates"/>
        <node TEXT="Weekdays"/>
        <node TEXT="Money"/>
        <node TEXT="Shopping"/>
        <node TEXT="Places"/>
        <node TEXT="People"/>
        <node TEXT="Objects"/>
        <node TEXT="Verbs"/>
      </node>
      <node TEXT="Training Session">
        <node TEXT="Topic"/>
        <node TEXT="Duration">
          <node TEXT="5 min"/>
          <node TEXT="10 min"/>
          <node TEXT="15 min"/>
        </node>
        <node TEXT="Level">
          <node TEXT="Word"/>
          <node TEXT="Chunk"/>
          <node TEXT="Sentence"/>
          <node TEXT="Dialogue (reserved)"/>
        </node>
        <node TEXT="Stages"/>
        <node TEXT="Questions"/>
        <node TEXT="Progress"/>
        <node TEXT="Estimated Remaining Time"/>
      </node>
      <node TEXT="Browser Player">
        <node TEXT="SpeechSynthesis"/>
        <node TEXT="Play"/>
        <node TEXT="Pause"/>
        <node TEXT="Replay"/>
        <node TEXT="Next"/>
        <node TEXT="Show / Hide Answer"/>
        <node TEXT="Random / Sequence"/>
      </node>
      <node TEXT="Data Flow">
        <node TEXT="Topic × Level"/>
        <node TEXT="Content Category Filter"/>
        <node TEXT="Training Plan"/>
        <node TEXT="Player"/>
      </node>
    </node>

    <node TEXT="Reading Analysis" POSITION="left">
      <node TEXT="Teacher Input"/>
      <node TEXT="Sentence Splitting"/>
      <node TEXT="Clickable Sentence Cards"/>
      <node TEXT="Selected Sentence Only"/>
      <node TEXT="Next.js API Route"/>
      <node TEXT="Gemini API">
        <node TEXT="Japanese Explanation"/>
        <node TEXT="Chinese Explanation"/>
        <node TEXT="English Explanation"/>
        <node TEXT="Vocabulary Breakdown"/>
        <node TEXT="Grammar Points"/>
      </node>
      <node TEXT="Temporary In-memory Processing"/>
    </node>

    <node TEXT="UI Internationalization" POSITION="left">
      <node TEXT="Local i18n Dictionary"/>
      <node TEXT="UiLanguageProvider"/>
      <node TEXT="React Context"/>
      <node TEXT="English Default"/>
      <node TEXT="Japanese UI"/>
      <node TEXT="localStorage Persistence"/>
      <node TEXT="Learning Data Not Translated"/>
    </node>

    <node TEXT="数据与存储" POSITION="left">
      <node TEXT="Local TypeScript Data">
        <node TEXT="Knowledge Blocks"/>
        <node TEXT="Listening Content"/>
        <node TEXT="Grammar"/>
        <node TEXT="Kana"/>
      </node>
      <node TEXT="Local JSON">
        <node TEXT="Vocabulary Dataset"/>
      </node>
      <node TEXT="No Database"/>
      <node TEXT="No User Accounts"/>
      <node TEXT="No Uploaded Text Storage"/>
      <node TEXT="No Learning Records"/>
    </node>

    <node TEXT="部署与运行环境" POSITION="left">
      <node TEXT="Vercel">
        <node TEXT="Production Build"/>
        <node TEXT="Static CDN"/>
        <node TEXT="Serverless API"/>
        <node TEXT="Environment Variables"/>
      </node>
      <node TEXT="Browser Runtime">
        <node TEXT="React Hydration"/>
        <node TEXT="SpeechSynthesis"/>
        <node TEXT="localStorage"/>
      </node>
      <node TEXT="Production Domain">
        <node TEXT="ai-japanese-learning-platform-demo.vercel.app"/>
      </node>
    </node>

    <node TEXT="当前架构边界" POSITION="left">
      <node TEXT="No AI Content Generation for Kanji"/>
      <node TEXT="No Automatic Kanji Analysis"/>
      <node TEXT="No Student Client"/>
      <node TEXT="No Admin System"/>
      <node TEXT="No Authentication"/>
      <node TEXT="No Database"/>
    </node>
  </node>
</map>
