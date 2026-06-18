"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import type { GrammarQuiz as GrammarQuizType } from "@/types/grammar";

export function GrammarQuiz({ quiz }: { quiz: GrammarQuizType }) {
  const [selected, setSelected] = useState("");
  const correct = selected === quiz.answer;

  return (
    <div>
      <p className="font-semibold">{quiz.question}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {quiz.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setSelected(option)}
            className={`rounded-lg border p-3 text-left text-sm font-medium transition ${
              selected === option ? "border-primary bg-primary/10" : "border-blue-100 bg-white hover:bg-blue-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {selected && (
        <div className={`mt-4 rounded-lg p-4 text-sm ${correct ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          <div className="flex items-center gap-2 font-semibold">
            {correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {correct ? "Correct" : `Incorrect. Correct answer: ${quiz.answer}`}
          </div>
          <p className="mt-2 leading-6">{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
}
