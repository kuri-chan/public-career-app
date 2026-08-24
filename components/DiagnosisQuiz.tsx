"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { decideType } from "@/lib/diagnosis";
import { questions } from "@/lib/questions";
import type { QuestionOption } from "@/lib/types";
import { ProgressBar } from "./ProgressBar";

export function DiagnosisQuiz() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionOption[]>([]);
  const question = questions[index];

  const canGoBack = index > 0;
  const selectedId = useMemo(
    () => answers[index]?.id,
    [answers, index],
  );

  function handleSelect(option: QuestionOption) {
    const nextAnswers = [...answers.slice(0, index), option];
    setAnswers(nextAnswers);

    if (index < questions.length - 1) {
      window.setTimeout(() => setIndex(index + 1), 180);
      return;
    }

    const type = decideType(nextAnswers);
    router.push(`/result?type=${type}`);
  }

  function handleBack() {
    if (!canGoBack) return;
    setIndex(index - 1);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
      <ProgressBar current={index + 1} total={questions.length} />

      <div className="mt-8">
        <p className="text-xs font-medium tracking-wide text-brand-700">
          QUESTION {String(index + 1).padStart(2, "0")}
        </p>
        <h1 className="mt-2 text-lg font-bold leading-relaxed text-slate-900 sm:text-2xl">
          {question.title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {question.description}
        </p>
      </div>

      <div className="mt-6 space-y-3" role="listbox" aria-label="回答の選択肢">
        {question.options.map((option, optionIndex) => {
          const isSelected = selectedId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => handleSelect(option)}
              className={`w-full rounded-xl border px-4 py-4 text-left transition sm:px-5 ${
                isSelected
                  ? "border-brand-600 bg-brand-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-brand-400 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-start gap-3">
                <span
                  className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    isSelected
                      ? "bg-brand-700 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <span className="text-sm leading-relaxed text-slate-800 sm:text-[15px]">
                  {option.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={!canGoBack}
          className="text-sm text-slate-500 underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:text-slate-300 disabled:no-underline"
        >
          前の質問に戻る
        </button>
        <p className="text-xs text-slate-400">選択肢をタップして進みます</p>
      </div>
    </section>
  );
}
