"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

function kanjiToKanjiVgCode(character: string) {
  const codePoint = character.codePointAt(0);
  return codePoint ? codePoint.toString(16).padStart(5, "0") : "";
}

export function KanjiStrokeOrder({
  character,
  missingText = "Stroke data unavailable",
}: {
  character: string;
  missingText?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");
  const [replayKey, setReplayKey] = useState(0);
  const code = useMemo(() => kanjiToKanjiVgCode(character), [character]);

  useEffect(() => {
    let cancelled = false;

    async function loadSvg() {
      setStatus("loading");
      try {
        const response = await fetch(`/kanjivg/${code}.svg`);
        if (!response.ok) {
          throw new Error("KanjiVG SVG not found");
        }

        const raw = await response.text();
        const document = new DOMParser().parseFromString(raw, "image/svg+xml");
        const svg = document.querySelector("svg");

        if (!svg) {
          throw new Error("Invalid SVG");
        }

        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.setAttribute("aria-label", `${character} stroke order`);
        svg.setAttribute("role", "img");

        if (!cancelled) {
          setSvgMarkup(new XMLSerializer().serializeToString(svg));
          setStatus("ready");
        }
      } catch {
        if (!cancelled) {
          setSvgMarkup("");
          setStatus("missing");
        }
      }
    }

    loadSvg();
    return () => {
      cancelled = true;
    };
  }, [character, code]);

  useEffect(() => {
    if (!svgMarkup || !containerRef.current) {
      return;
    }

    const paths = Array.from(containerRef.current.querySelectorAll("path"));
    paths.forEach((path, index) => {
      const svgPath = path as SVGPathElement;
      const length = Math.ceil(svgPath.getTotalLength());
      svgPath.style.setProperty("--path-length", `${length}`);
      svgPath.style.setProperty("--path-delay", `${index * 0.28}s`);
    });
  }, [svgMarkup, replayKey]);

  return (
    <div className="rounded-lg border bg-background p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Real Stroke Order</p>
          <p className="text-xs text-muted-foreground">KanjiVG SVG stroke data</p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => setReplayKey((value) => value + 1)}>
          <RotateCcw className="h-4 w-4" />
          Replay
        </Button>
      </div>

      {status === "loading" && (
        <div className="flex aspect-square items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
          Loading stroke data...
        </div>
      )}

      {status === "missing" && (
        <div className="flex aspect-square items-center justify-center rounded-md bg-muted text-sm font-semibold text-muted-foreground">
          {missingText}
        </div>
      )}

      {status === "ready" && (
        <div
          key={replayKey}
          ref={containerRef}
          className="kanji-stroke-svg kanji-stroke-animate aspect-square overflow-hidden rounded-md bg-white p-3"
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Stroke data:{" "}
        <a className="underline" href="https://kanjivg.tagaini.net/" target="_blank" rel="noreferrer">
          KanjiVG
        </a>{" "}
        (CC BY-SA 3.0)
      </p>
    </div>
  );
}
