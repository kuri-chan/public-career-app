import Link from "next/link";
import type { TypeResult } from "@/lib/types";
import { ActionCards } from "./ActionCards";
import { ShareOnXButton } from "./ShareOnXButton";

type ResultViewProps = {
  result: TypeResult;
};

export function ResultView({ result }: ResultViewProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <p className="text-xs font-medium tracking-wide text-brand-700">
          あなたの適性タイプ
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          {result.name}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          {result.tagline}
        </p>
        <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
          {result.summary}
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <h2 className="text-lg font-bold text-slate-900">
          {result.publicExperience.heading}
        </h2>
        <ul className="mt-5 space-y-4">
          {result.publicExperience.points.map((point) => (
            <li
              key={point.title}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <p className="text-sm font-semibold text-brand-800">
                {point.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                {point.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <ActionCards cards={result.actions} />

      <ShareOnXButton typeName={result.name} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/diagnosis"
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          もう一度診断する
        </Link>
        <Link
          href="/"
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-900"
        >
          トップへ戻る
        </Link>
      </div>
    </div>
  );
}
