"use client";

import Link from "next/link";
import { affiliateServices } from "@/lib/links";
import { trackCtaClick } from "@/lib/analytics";
import type { Cta, TypeResult } from "@/lib/types";
import { CareerSheetBuilder } from "./CareerSheetBuilder";
import { ShareOnXButton } from "./ShareOnXButton";

type ResultViewProps = {
  result: TypeResult;
};

function StarRating({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, rating));
  return (
    <span
      className="inline-flex items-center gap-0.5 text-brand-600"
      aria-label={`相性 5段階中${filled}`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < filled ? "fill-current" : "fill-slate-200"}`}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function ArrowDown() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-brand-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14" />
      <path d="M19 12l-7 7-7-7" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 13L13 7" />
      <path d="M8 7h5v5" />
    </svg>
  );
}

function CtaCard({
  cta,
  result,
  primary,
}: {
  cta: Cta;
  result: TypeResult;
  primary: boolean;
}) {
  const service = cta.service ? affiliateServices[cta.service] : undefined;

  const handleClick = () => {
    trackCtaClick({
      resultType: result.id,
      ctaKind: cta.kind,
      service: service?.id,
      label: cta.title,
    });
  };

  const containerClass = primary
    ? "rounded-2xl border-2 border-brand-500 bg-white p-5 shadow-lg sm:p-6"
    : "rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6";

  const buttonClass = primary
    ? "mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-6 py-4 text-base font-bold text-white shadow-md transition-colors hover:bg-brand-700 sm:text-lg"
    : "mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-brand-600 bg-white px-4 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50";

  return (
    <div className={containerClass}>
      <p className="text-xs font-medium text-slate-500">
        {cta.audience}人はこちら
      </p>
      <h3 className="mt-1.5 text-lg font-bold text-slate-900">{cta.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {cta.description}
      </p>

      {service ? (
        <a
          href={service.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className={buttonClass}
        >
          {cta.buttonLabel}
          <ExternalLinkIcon />
          <img
            width="1"
            height="1"
            src={service.imgSrc}
            alt=""
            style={{ display: "none" }}
          />
        </a>
      ) : (
        <Link
          href="/diagnosis"
          onClick={handleClick}
          className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          {cta.buttonLabel}
        </Link>
      )}

      {service ? (
        <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
          ※広告を含みます。まずは無料相談・無料体験で話を聞いてみるのがおすすめです。
        </p>
      ) : null}
    </div>
  );
}

export function ResultView({ result }: ResultViewProps) {
  if (!result) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-card">
        <p className="text-slate-600">診断データが見つかりませんでした。</p>
        <Link
          href="/diagnosis"
          className="mt-4 inline-block font-medium text-brand-600 underline"
        >
          もう一度診断を受ける
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section 1: ファーストビュー */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <p className="text-xs font-medium tracking-wide text-brand-700">
          あなたのキャリアタイプ
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          {result.name}
        </h1>
        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-800 sm:text-base">
          {result.tagline}
        </p>
        <p className="mt-4 rounded-xl bg-brand-50 p-4 text-sm leading-relaxed text-slate-700">
          {result.affirmation}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {result.summary}
        </p>
      </section>

      {/* Section 2: 経験 → 民間スキルの翻訳 */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          あなたの経験を、民間のことばに翻訳すると
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          公務員の経験と民間スキルは同じではありません。あくまで「活かせる可能性のある素地」としての翻訳です。
        </p>
        <ul className="mt-4 space-y-3">
          {result.skillTranslations.map((row, index) => (
            <li
              key={index}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                <span className="text-sm font-semibold text-slate-700">
                  {row.from}
                </span>
                <span className="hidden text-brand-400 sm:inline" aria-hidden="true">
                  →
                </span>
                <span className="inline-flex w-fit items-center rounded-md bg-brand-100 px-2 py-0.5 text-sm font-bold text-brand-800">
                  {row.to}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {row.note}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 3: 相性の良い職種 */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          相性の良い職種の候補
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          「向いている」と断定するものではなく、これまでの経験を活かしやすい方向性の目安です。
        </p>
        <div className="mt-4 space-y-3">
          {result.fitJobs.map((job, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold text-slate-900">{job.title}</h3>
                <span className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400">相性</span>
                  <StarRating rating={job.rating} />
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {job.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: キャリアシフトルート */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          公務員からのキャリアシフトルート
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          いきなり未経験IT人材になるのではなく、今の経験を足場に「横移動」していく考え方です。
        </p>
        <ol className="mt-4 flex flex-col items-stretch">
          {result.careerRoute.map((step, index) => (
            <li key={index} className="flex flex-col items-center">
              <div
                className={`w-full rounded-xl border p-3 text-center text-sm font-medium ${
                  index === 0
                    ? "border-slate-200 bg-slate-50 text-slate-600"
                    : index === result.careerRoute.length - 1
                      ? "border-brand-200 bg-brand-50 text-brand-800"
                      : "border-slate-100 bg-white text-slate-700"
                }`}
              >
                {step}
              </div>
              {index < result.careerRoute.length - 1 ? (
                <span className="py-1.5">
                  <ArrowDown />
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      {/* Section 5: あなたの次の一歩 */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          あなたの次の一歩
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          転職・リスキリング・現職継続のどれを選ぶ場合でも、まずはここから始めるのがおすすめです。
        </p>
        <div className="mt-4 space-y-4">
          {result.nextSteps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <span className="flex h-7 shrink-0 items-center justify-center rounded-full bg-brand-600 px-2.5 text-xs font-bold text-white">
                {index + 1}
              </span>
              <div>
                <p className="text-[11px] font-bold tracking-wide text-brand-700">
                  {step.step}
                </p>
                <h3 className="mt-0.5 font-bold text-slate-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 職務経歴書ドラフト生成（Layer 0+1） */}
      <CareerSheetBuilder type={result.id} />

      {/* Section 6: CTA（状況別） */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            あなたの状況に合わせて動いてみる
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            気になるものから見てみてください。どれも無料で始められます。
          </p>
        </div>
        {result.ctas.map((cta, index) => (
          <CtaCard
            key={index}
            cta={cta}
            result={result}
            primary={index === 0}
          />
        ))}
      </section>

      {/* SNSシェア */}
      <ShareOnXButton type={result.id} typeName={result.name} />

      {/* ナビゲーション */}
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
