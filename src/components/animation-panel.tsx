import { Hammer } from "lucide-react";
import type { LearningWord } from "@/types/learning";

export function AnimationPanel({ word }: { word: LearningWord }) {
  if (!word.videoPath) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border bg-card p-8 text-center">
        <Hammer className="mb-4 h-10 w-10 text-primary" />
        <h2 className="text-2xl font-semibold">Animation Coming Soon</h2>
        <p className="mt-2 text-sm text-muted-foreground">This word does not have an animation yet.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-card p-5">
      <video controls className="aspect-video w-full rounded-lg bg-zinc-950" src={word.videoPath}>
        Your browser does not support video playback.
      </video>
    </div>
  );
}
