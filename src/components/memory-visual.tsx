import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MemoryVisual({ prompt, imageSrc, className }: { prompt: string; imageSrc?: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex min-h-64 flex-col items-center justify-center rounded-lg border bg-gradient-to-br from-white via-amber-50 to-teal-50 p-6 text-center",
        className,
      )}
    >
      {imageSrc ? (
        <div className="relative mb-4 h-56 w-full max-w-md overflow-hidden rounded-lg bg-white">
          <Image src={imageSrc} alt={prompt} fill className="object-contain" sizes="420px" />
        </div>
      ) : (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <ImageIcon className="h-8 w-8" />
        </div>
      )}
      <p className="text-sm font-semibold">Memory image area</p>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{prompt}</p>
    </div>
  );
}
