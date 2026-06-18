import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nihongo Studio — AI Japanese Learning",
  description: "An integrated JLPT N5–N4 learning studio for vocabulary, grammar, listening, reading, kanji, kana, and speaking practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
