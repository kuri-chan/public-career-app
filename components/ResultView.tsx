"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { affiliateServices } from "@/lib/links";
import { trackCtaClick, trackIntentSelect } from "@/lib/analytics";
import type { Cta, CtaKind, TypeResult } from "@/lib/types";
import { CareerSheetBuilder } from "./CareerSheetBuilder";
import { OptinCard } from "./OptinCard";
import { ShareOnXButton } from "./ShareOnXButton";

type ResultViewProps = {
  result: TypeResult;
};

const intentOptions: { kind: CtaKind; label: string }[] = [
  { kind: "transfer", label: "今すぐ転職したい" },
  { kind: "reskill", label: "まずスキルを伸ばしたい" },
  { kind: "content", label: "まだ迷っている" },
];

// 診断タイプ×選択した意図から「次の一手」を1文で合成する。
// 新しいコンテンツを大量に書き足すのではなく、既存の result データ（fitJobs等）を再利用する。
function getNextMoveText(result: TypeResult, intent: CtaKind | null): string {
  if (intent === "transfer") {
    return "まず、自分の経験を民間企業向けに翻訳して、応募できる求人を確認してみましょう。";
  }
  if (intent === "reskill") {
    const topJob = result.fitJobs[0]?.title ?? "気になる職種";
    return `まず、${topJob}など目指したい職種を決めて、今の経験に足りないスキルを特定しましょう。`;
  }
  return "まずは転職を決めるのではなく、自分の経験が民間でどう評価されるのかを知りましょう。";
}

// 選んだ意図に一致するCTAを1つだけメインに選ぶ（残りは「他の選択肢」に回す）。
// 「まだ迷っている」だけは、非アフィリの中立CTA（undecidedCta）を優先する＝
// 「次の一手」の文言（自分の経験を知る）と実際の遷移先を一致させるため。
function pickPrimaryCta(ctas: Cta[], intent: CtaKind | null): { primary: Cta; rest: Cta[] } {
  if (!intent) {
    return { primary: ctas[0], rest: ctas.slice(1) };
  }
  const matches = ctas.filter((c) => c.kind === intent);
  const primary =
    (intent === "content" ? matches.find((c) => !c.service) : undefined) ??
    matches[0] ??
    ctas[0];
  const rest = ctas.filter((c) => c !== primary);
  return { primary, rest };
}

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
  intent,
  primary,
}: {
  cta: Cta;
  result: TypeResult;
  intent: CtaKind | null;
  primary: boolean;
}) {
  const service = cta.service ? affiliateServices[cta.service] : undefined;

  const handleClick = () => {
    trackCtaClick({
      resultType: result.id,
      ctaKind: cta.kind,
      service: service?.id,
      label: cta.title,
      intent: intent ?? undefined,
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
        <a
          href="#resume-builder"
          onClick={handleClick}
          className={primary ? buttonClass : "mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"}
        >
          {cta.buttonLabel}
        </a>
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
  const [intent, setIntent] = useState<CtaKind | null>(null);
  const { primary: primaryCta, rest: restCtas } = useMemo(
    () => pickPrimaryCta(result?.ctas ?? [], intent),
    [result, intent],
  );
  const nextMoveText = useMemo(
    () => (result ? getNextMoveText(result, intent) : ""),
    [result, intent],
  );

  function handleIntentSelect(kind: CtaKind) {
    setIntent((prev) => (prev === kind ? null : kind));
    trackIntentSelect(result.id, kind);
  }

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
      {/* ① 診断結果（ファーストビュー） */}
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

      {/*
        ②③④：今の状況 → あなたの次の一手 → そのための具体的な選択肢
        「私は今、何をすればいい？」に、ここまでで答え切る一続きのブロック。
      */}
      <section className="space-y-6 rounded-2xl border-2 border-brand-500 bg-white p-5 shadow-lg sm:p-8">
        {/* ② 今の状況に近いもの */}
        <div>
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            今の状況に近いものを選んでください
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            選ばなくても、下は診断タイプに合わせた内容が表示されます。
          </p>
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="group"
            aria-label="今の状況を選ぶ"
          >
            {intentOptions.map((option) => {
              const active = intent === option.kind;
              return (
                <button
                  key={option.kind}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handleIntentSelect(option.kind)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    active
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-brand-400"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ③ あなたの次の一手 */}
        <div className="border-t border-brand-100 pt-5">
          <p className="text-[11px] font-bold tracking-wide text-brand-700">
            あなたの次の一手
          </p>
          <p className="mt-1 text-sm font-medium leading-relaxed text-slate-800 sm:text-base">
            {nextMoveText}
          </p>
        </div>

        {/* ④ そのための、具体的な選択肢 */}
        <div className="border-t border-brand-100 pt-5">
          <h3 className="text-sm font-bold text-slate-900">
            そのための、具体的な選択肢
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            この一歩を実行するなら、まずはこちらから。
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
            ＜PR＞このセクションにはアフィリエイト広告（各社サービスへの遷移）を含みます。
          </p>

          <div className="mt-4">
            <CtaCard cta={primaryCta} result={result} intent={intent} primary />
          </div>

          {restCtas.length > 0 ? (
            <details className="group mt-4 rounded-2xl border border-slate-200 bg-white open:bg-transparent">
              <summary className="cursor-pointer list-none px-5 py-3 text-sm font-semibold text-slate-600 marker:content-none">
                他の選択肢を見る（{restCtas.length}件）
              </summary>
              <div className="space-y-4 px-0 pb-1 pt-2">
                {restCtas.map((cta, index) => (
                  <CtaCard
                    key={`${intent ?? "default"}-${index}`}
                    cta={cta}
                    result={result}
                    intent={intent}
                    primary={false}
                  />
                ))}
              </div>
            </details>
          ) : null}
        </div>
      </section>

      {/* 完成版への軽いリンク（1箇所目・広告感を抑えた控えめな案内） */}
      <div className="rounded-xl border border-brand-100 bg-brand-50 px-5 py-3 text-center">
        <a
          href="#full-version"
          className="text-xs font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-800"
        >
          あなたの経歴に基づいた履歴書・職務経歴書を作成したい方はこちら
        </a>
      </div>

      {/* 次の一歩を3つのステップに分けると（③の一手を、実行手順に分解） */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          次の一手を、3つのステップに分けると
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          「あなたの次の一手」を、実際に進める手順に分解するとこの3つです。転職・リスキリング・現職継続のどれを選ぶ場合でも、まずはここから始めるのがおすすめです。
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

      {/* 結果保存メールへの軽いリンク（無料の雛形プレゼントを訴求） */}
      <div className="rounded-xl border border-brand-100 bg-brand-50 px-5 py-4 text-center">
        <p className="text-xs font-semibold text-slate-700">
          履歴書・職務経歴書の無料雛形をプレゼント
        </p>
        <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
          結果をメールで保存すると、すぐに使える雛形（Wordファイル）もお届けします。
        </p>

        <div className="mt-3 flex flex-wrap items-start justify-center gap-3">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex h-32 items-center justify-center bg-slate-50 sm:h-40">
              <img
                src="/templates/rirekisho-hinagata-preview.png"
                alt="履歴書 雛形のサンプル"
                className="h-full w-auto object-contain"
              />
            </div>
            <p className="border-t border-slate-100 bg-slate-50 py-1 text-center text-[10px] text-slate-500">
              履歴書
            </p>
          </div>
          <div className="w-28 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:w-36">
            <div className="flex h-32 items-center justify-center bg-slate-50 sm:h-40">
              <img
                src="/templates/shokumu-keirekisho-hinagata-preview.png"
                alt="職務経歴書 雛形のサンプル"
                className="h-full w-full object-contain"
              />
            </div>
            <p className="border-t border-slate-100 bg-slate-50 py-1 text-center text-[10px] text-slate-500">
              職務経歴書
            </p>
          </div>
        </div>

        <a
          href="#save-result"
          className="mt-3 inline-flex items-center justify-center rounded-xl border border-brand-600 bg-white px-5 py-2.5 text-xs font-semibold text-brand-700 hover:bg-brand-50"
        >
          結果と雛形をメールで受け取る
        </a>
      </div>

      {/* 職務経歴書ドラフト生成（無料体験）＋完成版購入導線（2箇所目・常時表示） */}
      <CareerSheetBuilder type={result.id} />

      {/* 経験の翻訳（根拠・情報量が多いため最初の1件のみ表示） */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          あなたの経験が、民間でどう活きるのか
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          公務員の経験と民間スキルは同じではありません。あくまで「活かせる可能性のある素地」としての翻訳です。
        </p>
        <ul className="mt-4 space-y-3">
          {result.skillTranslations.slice(0, 1).map((row, index) => (
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
        {result.skillTranslations.length > 1 ? (
          <details className="group mt-3 rounded-2xl border border-slate-200 bg-white open:bg-transparent">
            <summary className="cursor-pointer list-none px-5 py-3 text-sm font-semibold text-slate-600 marker:content-none">
              他の翻訳を見る（{result.skillTranslations.length - 1}件）
            </summary>
            <ul className="space-y-3 px-0 pb-1 pt-2">
              {result.skillTranslations.slice(1).map((row, index) => (
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
          </details>
        ) : null}
      </section>

      {/* 相性の良い職種（根拠・最初の1件のみ表示） */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          相性の良い職種の候補
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          「向いている」と断定するものではなく、これまでの経験を活かしやすい方向性の目安です。
        </p>
        <div className="mt-4 space-y-3">
          {result.fitJobs.slice(0, 1).map((job, index) => (
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
        {result.fitJobs.length > 1 ? (
          <details className="group mt-3 rounded-2xl border border-slate-200 bg-white open:bg-transparent">
            <summary className="cursor-pointer list-none px-5 py-3 text-sm font-semibold text-slate-600 marker:content-none">
              他の職種を見る（{result.fitJobs.length - 1}件）
            </summary>
            <div className="space-y-3 px-0 pb-1 pt-2">
              {result.fitJobs.slice(1).map((job, index) => (
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
          </details>
        ) : null}
      </section>

      {/* あなたのキャリアの可能性（旧: キャリアシフトルート。重要度を下げ、折りたたみ化） */}
      <details className="group rounded-2xl border border-slate-200 bg-white open:bg-transparent">
        <summary className="cursor-pointer list-none rounded-2xl px-5 py-4 shadow-card marker:content-none group-open:shadow-none sm:px-8">
          <span className="text-lg font-bold text-slate-900 sm:text-xl">
            あなたのキャリアの可能性を見る
          </span>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            「公務員→IT企業」という一本道ではなく、今の経験を起点に横移動できる可能性がある、という参考イメージです。
          </p>
        </summary>
        <div className="px-5 pb-6 sm:px-8">
          <ol className="mt-2 flex flex-col items-stretch">
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
        </div>
      </details>

      {/* ⑩ 結果保存（メール登録） */}
      <OptinCard type={result.id} />

      {/* ⑪ SNSシェア・ナビゲーション */}
      <ShareOnXButton type={result.id} typeName={result.name} />

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
