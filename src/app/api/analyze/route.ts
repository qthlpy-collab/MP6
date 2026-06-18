import { NextResponse } from "next/server";
import { getVercelOidcToken } from "@vercel/oidc";
import type { ExplanationLanguage, SentenceAnalysis } from "@/types/sentence-analysis";

const supportedLanguages: ExplanationLanguage[] = ["ja", "zh", "en"];
const languageNames: Record<ExplanationLanguage, string> = {
  ja: "Japanese",
  zh: "Simplified Chinese",
  en: "English",
};

function localizedObjectSchema(languages: ExplanationLanguage[]) {
  return {
    type: "object",
    properties: Object.fromEntries(languages.map((language) => [language, { type: "string" }])),
    required: languages,
    additionalProperties: false,
  };
}

function analysisSchema(languages: ExplanationLanguage[]) {
  return {
    type: "object",
    properties: {
      sentence: { type: "string" },
      explanations: localizedObjectSchema(languages),
      vocabulary: {
        type: "array",
        items: {
          type: "object",
          properties: {
            surface: { type: "string" },
            reading: { type: "string" },
            partOfSpeech: { type: "string" },
            meanings: localizedObjectSchema(languages),
          },
          required: ["surface", "reading", "partOfSpeech", "meanings"],
          additionalProperties: false,
        },
      },
      grammar: {
        type: "array",
        items: {
          type: "object",
          properties: {
            pattern: { type: "string" },
            explanations: localizedObjectSchema(languages),
          },
          required: ["pattern", "explanations"],
          additionalProperties: false,
        },
      },
      similarExamples: {
        type: "array",
        items: {
          type: "object",
          properties: {
            japanese: { type: "string" },
            translations: localizedObjectSchema(languages),
          },
          required: ["japanese", "translations"],
          additionalProperties: false,
        },
      },
    },
    required: ["sentence", "explanations", "vocabulary", "grammar", "similarExamples"],
    additionalProperties: false,
  };
}

function extractOutputText(response: {
  output_text?: string;
  output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
}) {
  if (response.output_text) {
    return response.output_text;
  }

  return response.output
    ?.flatMap((item) => item.content ?? [])
    .find((content) => content.type === "output_text")
    ?.text;
}

function extractGeminiText(response: {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
}) {
  return response.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? "")
    .join("")
    .trim();
}

async function analyzeWithGemini(sentence: string, apiKey: string) {
  const models = [
    process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
  ].filter((model, index, allModels) => allModels.indexOf(model) === index);
  let lastError = "The Gemini request failed.";

  for (const model of models) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": apiKey,
          },
          body: JSON.stringify({
            systemInstruction: {
              parts: [
                {
                  text:
                    "You are a Japanese sentence teaching assistant for teachers. Analyze only the " +
                    "provided sentence. Be concise, accurate, classroom-ready, and appropriate for " +
                    "language learners. Do not infer or reproduce surrounding textbook content. " +
                    "Give readings in hiragana. Write every localized field in Japanese, Simplified " +
                    "Chinese, and English.",
                },
              ],
            },
            contents: [{ role: "user", parts: [{ text: sentence }] }],
            generationConfig: {
              responseMimeType: "application/json",
              responseJsonSchema: analysisSchema(supportedLanguages),
            },
          }),
        },
      );
      const body = (await response.json()) as {
        error?: { message?: string };
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };

      if (response.ok) {
        const outputText = extractGeminiText(body);
        if (!outputText) {
          throw new Error("Gemini returned no analysis.");
        }
        return JSON.parse(outputText) as SentenceAnalysis;
      }

      lastError = body.error?.message ?? `Gemini returned HTTP ${response.status}.`;
      const retryable = [429, 500, 503, 504].includes(response.status);
      if (!retryable) {
        throw new Error(lastError);
      }
      if (attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 700));
      }
    }
  }

  throw new Error(`${lastError} Please try again.`);
}

export async function POST(request: Request) {
  const geminiKey = process.env.GEMINI_API_KEY;
  let gatewayToken = process.env.AI_GATEWAY_API_KEY;

  if (!gatewayToken && process.env.VERCEL) {
    try {
      gatewayToken = await getVercelOidcToken();
    } catch {
      gatewayToken = undefined;
    }
  }

  const openAIKey = process.env.OPENAI_API_KEY;
  const apiKey = gatewayToken ?? openAIKey;
  const useGateway = Boolean(gatewayToken);

  if (!geminiKey && !apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured on the server." },
      { status: 503 },
    );
  }

  let body: { sentence?: unknown };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 });
  }

  const sentence = typeof body.sentence === "string" ? body.sentence.trim() : "";

  if (!sentence || sentence.length > 1000) {
    return NextResponse.json(
      { error: "Please provide one Japanese sentence of 1 to 1000 characters." },
      { status: 400 },
    );
  }

  const requestedLanguages = supportedLanguages
    .map((language) => languageNames[language])
    .join(", ");

  try {
    if (geminiKey) {
      const analysis = await analyzeWithGemini(sentence, geminiKey);
      analysis.sentence = sentence;
      return NextResponse.json(analysis);
    }

    const openAIResponse = await fetch(
      useGateway
        ? "https://ai-gateway.vercel.sh/v1/responses"
        : "https://api.openai.com/v1/responses",
      {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model:
          process.env.OPENAI_MODEL ??
          (useGateway ? "openai/gpt-5.4-mini" : "gpt-5.4-mini"),
        instructions:
          "You are a Japanese sentence teaching assistant for teachers. Analyze only the provided sentence. " +
          "Be concise, accurate, classroom-ready, and appropriate for language learners. " +
          "Do not infer or reproduce surrounding textbook content. Give readings in hiragana. " +
          `Write every localized field in all three languages: ${requestedLanguages}.`,
        input: sentence,
        text: {
          format: {
            type: "json_schema",
            name: "sentence_analysis",
            strict: true,
            schema: analysisSchema(supportedLanguages),
          },
        },
      }),
    });

    const responseBody = (await openAIResponse.json()) as {
      error?: { message?: string };
      output_text?: string;
      output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
    };

    if (!openAIResponse.ok) {
      return NextResponse.json(
        { error: responseBody.error?.message ?? "The AI request failed." },
        { status: openAIResponse.status },
      );
    }

    const outputText = extractOutputText(responseBody);

    if (!outputText) {
      return NextResponse.json({ error: "The AI returned no analysis." }, { status: 502 });
    }

    const analysis = JSON.parse(outputText) as SentenceAnalysis;
    analysis.sentence = sentence;

    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "The analysis service is temporarily unavailable.",
      },
      { status: 502 },
    );
  }
}
