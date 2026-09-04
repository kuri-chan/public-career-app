"use client";

import { useState } from "react";
import { RESUME_FULL_SET_URL, RESUME_FULL_URL } from "@/lib/links";
import {
  trackResumeCopy,
  trackResumeFullClick,
  trackResumeGenerate,
} from "@/lib/analytics";
import {
  achievementOptions,
  budgetOptions,
  buildResumeDraft,
  coordinationOptions,
  departments,
  emptyResumeInputs,
  isResumeInputsComplete,
  positions,
  yearsOptions,
  type ResumeDraft,
  type ResumeInputs,
  type ResumeOption,
} from "@/lib/resume";
import type { DiagnosisType } from "@/lib/types";

type Props = {
  type: DiagnosisType;
};

const FULL_READY = !RESUME_FULL_URL.includes("REPLACE_WITH_YOUR_FORM_ID");
const SET_READY = !RESUME_FULL_SET_URL.includes("REPLACE_WITH_SET_FORM_ID");

function labelOf(opts: ResumeOption[], id: string) {
  return opts.find((o) => o.id === id)?.label ?? "";
}

// ここまでの選択内容を、読みやすいラベルでフル版フォーム（Tally等）へ引き継ぐ
// （＝情報回収の橋渡し。Tally側で department/position/years/achievements の
//   Pre-fill パラメータを設定すると自動で埋まる想定だったが、Tally側でPrefillが
//   機能していないことが判明。パラメータ自体は無害なので残しているが、現状は
//   Tally側で同じ項目を改めて入力してもらう運用になっている）
function buildResumeFullUrl(baseUrl: string, type: DiagnosisType, inputs: ResumeInputs) {
  const params = new URLSearchParams({
    type,
    department: labelOf(departments, inputs.department),
    position: labelOf(positions, inputs.position),
    years: labelOf(yearsOptions, inputs.years),
    achievements: inputs.achievements
      .map((a) => labelOf(achievementOptions, a))
      .filter(Boolean)
      .join("、"),
  });
  return `${baseUrl}?${params.toString()}`;
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-brand-500 focus:outline-none"
      >
        <option value="">選択してください</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function CopyBlock({
  title,
  text,
  onCopy,
}: {
  title: string;
  text: string;
  onCopy: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy();
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // クリップボード不可環境では何もしない
    }
  };

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-bold text-slate-900">{title}</h4>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 rounded-lg border border-brand-600 px-3 py-1 text-xs font-semibold text-brand-700 transition hover:bg-brand-50"
        >
          {copied ? "コピーしました" : "コピー"}
        </button>
      </div>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
        {text}
      </p>
    </div>
  );
}

export function CareerSheetBuilder({ type }: Props) {
  const [inputs, setInputs] = useState<ResumeInputs>(emptyResumeInputs);
  const [draft, setDraft] = useState<ResumeDraft | null>(null);

  const complete = isResumeInputsComplete(inputs);

  function update<K extends keyof ResumeInputs>(key: K, value: ResumeInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  function toggleAchievement(id: string) {
    setInputs((prev) => ({
      ...prev,
      achievements: prev.achievements.includes(id)
        ? prev.achievements.filter((a) => a !== id)
        : [...prev.achievements, id],
    }));
  }

  function handleGenerate() {
    if (!complete) return;
    setDraft(buildResumeDraft(type, inputs));
    trackResumeGenerate(type, inputs);
  }

  return (
    <>
    <section
      id="resume-builder"
      className="scroll-mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8"
    >
      <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">
        無料 · STEP 1 をここで実行
      </span>
      <h2 className="mt-3 text-lg font-bold text-slate-900 sm:text-xl">
        あなたの経験を、職務経歴書のことばに変換する
      </h2>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">
        いくつか選ぶだけで、あなたの経験に沿った「職務要約・自己PR・職務経歴」のドラフトを作成します。登録不要・ブラウザ内で完結します。
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Select
          label="主な担当分野"
          value={inputs.department}
          options={departments}
          onChange={(v) => update("department", v)}
        />
        <Select
          label="役職・立場"
          value={inputs.position}
          options={positions}
          onChange={(v) => update("position", v)}
        />
        <Select
          label="経験年数"
          value={inputs.years}
          options={yearsOptions}
          onChange={(v) => update("years", v)}
        />
        <Select
          label="担当した予算規模"
          value={inputs.budget}
          options={budgetOptions}
          onChange={(v) => update("budget", v)}
        />
        <div className="sm:col-span-2">
          <Select
            label="調整・対応の主軸"
            value={inputs.coordination}
            options={coordinationOptions}
            onChange={(v) => update("coordination", v)}
          />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold text-slate-600">
          主な実績（あてはまるものを選択）
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {achievementOptions.map((a) => {
            const active = inputs.achievements.includes(a.id);
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => toggleAchievement(a.id)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-brand-400"
                }`}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={!complete}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {complete
          ? "職務経歴書を無料で作ってみる"
          : "上の項目を選ぶと作成できます"}
      </button>

      {draft ? (
        <div className="mt-6 space-y-3">
          <CopyBlock
            title="職務要約"
            text={draft.summary}
            onCopy={() => trackResumeCopy(type, "summary")}
          />
          {draft.strengths.length > 0 ? (
            <CopyBlock
              title="活かせる強み（自己PR）"
              text={[
                draft.strengthsLead,
                ...draft.strengths.map((s) => `・${s}`),
              ].join("\n")}
              onCopy={() => trackResumeCopy(type, "strengths")}
            />
          ) : null}
          {draft.experiences.length > 0 ? (
            <CopyBlock
              title="職務経歴の記述例"
              text={draft.experiences.map((e) => `■ ${e}`).join("\n\n")}
              onCopy={() => trackResumeCopy(type, "experiences")}
            />
          ) : null}

          <p className="text-[11px] leading-relaxed text-slate-400">
            ※【　】の箇所に、実際の事業名や数値を入れて仕上げてください。これはドラフト（下書き）です。
          </p>
        </div>
      ) : null}
    </section>

    {/* 完成版購入導線：無料ドラフトの生成有無に関係なく常に表示する独立セクション */}
    <section
      id="full-version"
      className="scroll-mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8"
    >
      <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
        あなたの履歴書・職務経歴書を作成する
      </h2>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">
        履歴書・職務経歴書は、転職活動の必需品です。今回の診断結果（経験の民間向け翻訳・相性の良い職種・具体的なキャリアアクション・不足スキルと補い方）をもとに、あなた専用に仕上げます。
      </p>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">
        どちらも、編集可能なWordファイル（.docx）でお届けします。
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {/* プランA：職務経歴書のみ */}
        <div className="flex flex-col rounded-xl border-2 border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <p className="text-xs font-semibold text-slate-500">職務経歴書のみ</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">¥1,480</p>
          <ul className="mt-3 flex-1 space-y-1 text-xs leading-relaxed text-slate-600">
            <li>・詳しい経歴に完全対応した、清書済みの職務経歴書一式</li>
            <li>・応募先の職種に合わせた自己PR・志望動機の調整</li>
            <li>・編集可能なWord（.docx）で納品</li>
          </ul>
          {FULL_READY ? (
            <a
              href={buildResumeFullUrl(RESUME_FULL_URL, type, inputs)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackResumeFullClick(type)}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-brand-600 bg-white px-4 py-3 text-sm font-bold text-brand-700 transition-colors hover:bg-brand-50"
            >
              職務経歴書を作成する
            </a>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-center text-xs text-slate-500">
              準備中です。近日公開予定です。
            </div>
          )}
        </div>

        {/* プランB：履歴書＋職務経歴書セット */}
        <div className="relative flex flex-col rounded-xl border-2 border-brand-500 bg-white p-4 shadow-md sm:p-5">
          <span className="absolute -top-3 left-4 rounded-full bg-brand-600 px-2.5 py-0.5 text-[10px] font-bold text-white">
            応募には両方必要です
          </span>
          <p className="text-xs font-semibold text-brand-700">履歴書＋職務経歴書セット</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">¥2,480</p>
          <ul className="mt-3 flex-1 space-y-1 text-xs leading-relaxed text-slate-600">
            <li>・職務経歴書一式（プランAと同内容）</li>
            <li>・履歴書の大枠（学歴・職歴・志望動機・自己PR欄）も作成</li>
            <li>・編集可能なWord（.docx）で納品。氏名・生年月日・住所欄はご自身でご記入いただきます</li>
          </ul>
          <p className="mt-2 text-[11px] leading-relaxed text-brand-700">
            履歴書は単体では提供しておらず、職務経歴書とまとめて作成することでこの価格を実現しています。
          </p>
          {SET_READY ? (
            <a
              href={buildResumeFullUrl(RESUME_FULL_SET_URL, type, inputs)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackResumeFullClick(type)}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-brand-700"
            >
              セットで作成する
            </a>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-center text-xs text-slate-500">
              準備中です。近日公開予定です。
            </div>
          )}
        </div>
      </div>

      <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
        上の無料ドラフトを作成済みの場合、その選択内容を引き継いで作成できます。
      </p>
    </section>
    </>
  );
}
