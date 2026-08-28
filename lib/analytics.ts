// GA4 イベント送信ヘルパー（クライアント専用）
// gtag が無い環境（SSR / 未ロード / 計測ブロック）でも安全に no-op する。
import type { DiagnosisType } from "./types";

type GtagParams = Record<string, string | number | boolean | undefined>;

function sendEvent(name: string, params: GtagParams = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (typeof gtag !== "function") return;
  gtag("event", name, params);
}

// 診断開始
export function trackDiagnosisStart() {
  sendEvent("diagnosis_start");
}

// 各質問への回答
export function trackAnswerQuestion(
  questionId: string,
  optionId: string,
  index: number,
) {
  sendEvent("answer_question", {
    question_id: questionId,
    option_id: optionId,
    question_index: index,
  });
}

// 診断完了（結果タイプを付与）
export function trackDiagnosisComplete(type: DiagnosisType) {
  sendEvent("diagnosis_complete", { result_type: type });
}

// CTAクリック
// 既存の click_affiliate イベント名を維持しつつ、
// result_type / cta_type / service を付けて「どのタイプがどのCTAを押すか」を分析可能にする。
export function trackCtaClick(params: {
  resultType: DiagnosisType;
  ctaKind: string;
  service?: string;
  label?: string;
}) {
  // アフィリエイト（service あり）は従来通り click_affiliate として計測
  if (params.service) {
    sendEvent("click_affiliate", {
      event_category: "affiliate",
      event_label: params.service,
      result_type: params.resultType,
      cta_type: params.ctaKind,
    });
    return;
  }
  // 中立CTA（アフィリエイトなし）は別イベントで計測
  sendEvent("click_cta", {
    result_type: params.resultType,
    cta_type: params.ctaKind,
    event_label: params.label,
  });
}

// 職務経歴書ドラフト生成（Layer1インテイクの一次情報回収）
export function trackResumeGenerate(
  resultType: DiagnosisType,
  inputs: {
    department: string;
    position: string;
    years: string;
    budget: string;
    coordination: string;
    achievements: string[];
  },
) {
  sendEvent("resume_generate", {
    result_type: resultType,
    department: inputs.department,
    position: inputs.position,
    years: inputs.years,
    budget: inputs.budget,
    coordination: inputs.coordination,
    achievements: inputs.achievements.join(","),
    achievement_count: inputs.achievements.length,
  });
}

// ドラフトのコピー（利用意向の強いシグナル）
export function trackResumeCopy(resultType: DiagnosisType, block: string) {
  sendEvent("resume_copy", { result_type: resultType, block });
}
