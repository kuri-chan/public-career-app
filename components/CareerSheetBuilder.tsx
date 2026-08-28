"use client";

import { useState } from "react";
import { RESUME_FULL_URL } from "@/lib/links";
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
} from "@/lib/resume";
import type { DiagnosisType } from "@/lib/types";

type Props = {
  type: DiagnosisType;
};

const FULL_READY = !RESUME_FULL_URL.includes("REPLACE_WITH_YOUR_FORM_ID");

// ここまでの選択内容をフル版フォーム（Tally等）へ引き継ぐ（＝情報回収の橋渡し）
function buildResumeFullUrl(type: DiagnosisType, inputs: ResumeInputs) {
  const params = new URLSearchParams({
    type,
    department: inputs.department,
    position: inputs.position,
    years: inputs.years,
    budget: inputs.budget,
    coordination: inputs.coordination,
    achievements: inputs.achievements.join(","),
  });
  return `${RESUME_FULL_URL}?${params.toString()}`;
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
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
      <span className="inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">
        STEP 1 をここで実行
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
          ? "職務経歴書のドラフトを作成する"
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

          {/* Layer 2: 有料フル版への導線（詳細な経歴を入力→完成版／選択内容を引き継ぎ情報回収も兼ねる） */}
          <div className="rounded-xl border-2 border-brand-500 bg-white p-4 shadow-sm sm:p-5">
            <p className="text-sm font-bold text-slate-900">
              そのまま提出できる完成版（フル版）
            </p>
            <ul className="mt-2 space-y-1 text-xs leading-relaxed text-slate-600">
              <li>・あなたの詳しい経歴に完全対応した、清書済みの職務経歴書一式</li>
              <li>・応募先の職種に合わせた自己PR・志望動機の調整</li>
              <li>・PDFでダウンロードして、そのまま応募に使えます</li>
            </ul>
            {FULL_READY ? (
              <a
                href={buildResumeFullUrl(type, inputs)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackResumeFullClick(type)}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-700"
              >
                完成版の職務経歴書を作成する
              </a>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-center text-xs text-slate-500">
                準備中です。近日公開予定です。
              </div>
            )}
            <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
              ここまでの選択内容を引き継いで作成できます。
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
