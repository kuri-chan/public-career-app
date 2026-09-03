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

// 職務経歴書フル版（Layer2＝有料）への遷移（購入意向の最重要シグナル）
export function trackResumeFullClick(resultType: DiagnosisType) {
  sendEvent("resume_full_click", { result_type: resultType });
}

// 状況フィルター選択（結果ページで「今の状況」を自己申告した意図シグナル）
export function trackIntentSelect(resultType: DiagnosisType, intent: string) {
  sendEvent("intent_select", { result_type: resultType, intent });
}

// 結果保存メール登録カードの表示（1回のみ計測）
export function trackOptinView(resultType: DiagnosisType) {
  sendEvent("optin_card_view", { result_type: resultType });
}

// 結果保存メールの登録送信（一次情報回収の成立シグナル）
export function trackOptinSubmit(resultType: DiagnosisType, emailSent: boolean) {
  sendEvent("optin_submit", { result_type: resultType, email_sent: emailSent });
}
