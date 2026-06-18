import Link from "next/link";
import Image from "next/image";
import type { KanaCode } from "@/types/learning";
import { Card, CardContent } from "@/components/ui/card";

export function KanaCard({ item }: { item: KanaCode }) {
  return (
    <Link href={`/kana/${encodeURIComponent(item.kana)}`}>
      <Card className="group h-full transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(37,99,235,0.13)]">
        <CardContent className="grid grid-cols-[72px_1fr] gap-4 p-4">
          <div className="brand-gradient flex h-16 w-16 items-center justify-center rounded-lg text-3xl font-bold text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            {item.kana}
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground">{item.romaji}</p>
            <p className="text-lg font-semibold">{item.codeWord}</p>
            <div className="relative mt-3 h-20 overflow-hidden rounded-md border bg-white">
              <Image src={item.imageSrc} alt={item.imageHint} fill className="object-contain" sizes="180px" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
