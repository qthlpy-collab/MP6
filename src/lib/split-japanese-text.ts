export function splitJapaneseText(text: string): string[] {
  const normalized = text.replace(/\r\n?/g, "\n").trim();

  if (!normalized) {
    return [];
  }

  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("ja", { granularity: "sentence" });
    return Array.from(segmenter.segment(normalized), ({ segment }) => segment.trim()).filter(Boolean);
  }

  return normalized
    .split(/\n+/)
    .flatMap((line) => line.match(/[^。！？!?…]+[。！？!?…]*/g) ?? [])
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}
