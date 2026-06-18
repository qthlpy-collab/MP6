"use client";

import { Volume2 } from "lucide-react";
import { useState } from "react";
import type { GrammarExample } from "@/types/grammar";
import { Button } from "@/components/ui/button";

export function GrammarExampleList({
  grammarId,
  examples,
}: {
  grammarId: string;
  examples: GrammarExample[];
}) {
  const [message, setMessage] = useState("");

  const speak = (text: string, index: number) => {
    const audio = document.getElementById(audioId(grammarId, index)) as HTMLAudioElement | null;
    if (audio) {
      audio.currentTime = 0;
      void audio.play().catch(() => {
        setMessage("If autoplay is blocked, use the audio controls below.");
      });
      return;
    }

    speakWithBrowser(text);
  };

  const speakWithBrowser = (text: string) => {
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      setMessage("This browser does not support speech playback.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.9;
    utterance.onstart = () => setMessage("Playing Japanese pronunciation...");
    utterance.onend = () => setMessage("");
    utterance.onerror = () => setMessage("Speech playback failed. Please try again.");
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-3">
      {message && <p className="text-sm text-primary">{message}</p>}
      {examples.map((example, index) => (
        <div key={example.japanese} className="rounded-lg border bg-background p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-semibold">{example.japanese}</p>
              <p className="mt-1 text-sm text-primary">{example.reading}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => speak(example.japanese, index)}
              aria-label={`Play pronunciation for ${example.japanese}`}
            >
              <Volume2 className="h-4 w-4" />
              Play
            </Button>
          </div>
          <audio
            id={audioId(grammarId, index)}
            controls
            preload="metadata"
            className="mt-3 h-10 w-full"
            src={`/audio/grammar/${grammarId}-example-${index + 1}.mp3`}
            onPlay={() => setMessage("Playing Japanese pronunciation...")}
            onEnded={() => setMessage("")}
            onError={() => setMessage("Audio file unavailable.")}
          >
            Speech playback is not supported.
          </audio>
        </div>
      ))}
    </div>
  );
}

function audioId(grammarId: string, index: number) {
  return `grammar-audio-${grammarId}-${index + 1}`;
}
