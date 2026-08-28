import type { DiagnosisType } from "./types";

// ============================================================
// 職務経歴書ドラフト生成（Layer 0+1）
// 診断タイプ × 選択式インテイクの組合せで、
// 一般論に留まらない「あなた仕様」のドラフトを合成する。
// DB・登録不要。全て純粋関数＋静的辞書で完結。
//
// 理論パターン数（1タイプあたり）:
//   部門(12) × 役職(4) × 経験年数(4) × 予算(4) × 調整(4) = 3,072
//   × 実績の組合せ(2^12 - 1 = 4,095) ≒ 約1,258万通り
//   さらに 記述例は役職で2分岐、自己PRは診断タイプで分岐。
// ============================================================

export type ResumeOption = { id: string; label: string };

export const departments: ResumeOption[] = [
  { id: "tax", label: "税務・徴収" },
  { id: "welfare", label: "福祉・保健・子育て" },
  { id: "general", label: "総務・人事・庶務" },
  { id: "policy", label: "企画・政策・広報" },
  { id: "finance", label: "財政・会計・契約" },
  { id: "construction", label: "建設・都市計画・インフラ" },
  { id: "industry", label: "産業振興・観光・農林" },
  { id: "education", label: "教育・文化・生涯学習" },
  { id: "window", label: "住民窓口・戸籍・国保年金" },
  { id: "disaster", label: "防災・危機管理" },
  { id: "it", label: "情報システム・情報政策" },
  { id: "other", label: "その他の行政事務" },
];

export const positions: ResumeOption[] = [
  { id: "staff", label: "担当（一般職）" },
  { id: "chief", label: "主任・主査" },
  { id: "kakari", label: "係長・係長級" },
  { id: "manager", label: "課長補佐以上" },
];

export const yearsOptions: ResumeOption[] = [
  { id: "y1", label: "3年未満" },
  { id: "y3", label: "3〜5年" },
  { id: "y6", label: "6〜10年" },
  { id: "y11", label: "11年以上" },
];

export const budgetOptions: ResumeOption[] = [
  { id: "none", label: "予算の直接担当なし" },
  { id: "small", label: "〜数千万円規模" },
  { id: "mid", label: "数千万〜1億円規模" },
  { id: "large", label: "1億円超" },
];

export const coordinationOptions: ResumeOption[] = [
  { id: "resident", label: "住民・窓口対応が中心" },
  { id: "business", label: "事業者・外部との折衝が多い" },
  { id: "internal", label: "庁内・部署間の調整が中心" },
  { id: "external", label: "議会・国/県との調整もある" },
];

export const achievementOptions: ResumeOption[] = [
  { id: "reform", label: "制度改正・条例対応" },
  { id: "dx", label: "システム更改・DX・業務効率化" },
  { id: "event", label: "イベント・事業の企画運営" },
  { id: "budget", label: "予算要求・執行管理" },
  { id: "consult", label: "窓口・相談・苦情対応" },
  { id: "plan", label: "計画・方針の策定" },
  { id: "subsidy", label: "補助金・交付金の事務" },
  { id: "adjust", label: "関係者との合意形成・調整" },
  { id: "data", label: "データ集計・分析" },
  { id: "pr", label: "広報・住民周知・情報発信" },
  { id: "hr", label: "人材育成・研修・OJT" },
  { id: "contract", label: "契約・入札・業者対応" },
];

export type ResumeInputs = {
  department: string;
  position: string;
  years: string;
  budget: string;
  coordination: string;
  achievements: string[];
};

export const emptyResumeInputs: ResumeInputs = {
  department: "",
  position: "",
  years: "",
  budget: "",
  coordination: "",
  achievements: [],
};

const DEPT_PHRASE: Record<string, string> = {
  tax: "住民税・徴収に関する業務",
  welfare: "福祉・保健・子育て支援の業務",
  general: "総務・人事・庶務の業務",
  policy: "企画・政策立案・広報の業務",
  finance: "財政・会計・契約の業務",
  construction: "建設・都市計画・インフラ管理の業務",
  industry: "産業振興・観光・農林分野の業務",
  education: "教育・文化・生涯学習の業務",
  window: "住民窓口・各種届出の業務",
  disaster: "防災・危機管理の業務",
  it: "情報システム・情報政策の業務",
  other: "行政事務全般",
};

const YEARS_PHRASE: Record<string, string> = {
  y1: "3年未満にわたり",
  y3: "3〜5年にわたり",
  y6: "6〜10年にわたり",
  y11: "11年以上にわたり",
};

const POS_PHRASE: Record<string, string> = {
  staff: "担当者として",
  chief: "主任・主査として",
  kakari: "係長として担当業務を統括し、",
  manager: "課長補佐級として組織運営に関わりながら、",
};

const COORD_PHRASE: Record<string, string> = {
  resident: "住民対応を最前線で担い",
  business: "事業者や外部機関との折衝を重ね",
  internal: "複数部署にまたがる庁内調整を担い",
  external: "議会・国/県との調整も含めて関係者をまとめ",
};

const BUDGET_PHRASE: Record<string, string> = {
  none: "",
  small: "数千万円規模の予算を管理し、",
  mid: "数千万〜1億円規模の予算を管理し、",
  large: "1億円を超える予算を管理し、",
};

const ACH_NOUN: Record<string, string> = {
  reform: "制度改正・条例対応",
  dx: "システム更改・業務効率化",
  event: "事業・イベントの企画運営",
  budget: "予算要求・執行管理",
  consult: "窓口・相談対応",
  plan: "計画・方針の策定",
  subsidy: "補助金・交付金事務",
  adjust: "関係者との合意形成",
  data: "データ集計・分析",
  pr: "広報・住民周知",
  hr: "人材育成・研修",
  contract: "契約・入札事務",
};

const TYPE_CLOSING: Record<DiagnosisType, string> = {
  bizops:
    "これらの経験は、民間ではプロジェクト推進・業務企画の素地として捉え直すことができます。",
  ainocode:
    "これらの経験は、民間では業務改善・DX推進の実務経験として捉え直すことができます。",
  reskill:
    "これらの経験は、民間でも通じる正確な事務遂行と関係者連携の基盤として捉え直すことができます。",
};

// 自己PRの導入文（診断タイプで出し分け）
const TYPE_STRENGTH_LEAD: Record<DiagnosisType, string> = {
  bizops:
    "民間のプロジェクト推進・業務企画の観点では、特に次の強みが活かせます。",
  ainocode:
    "民間の業務改善・DX推進の観点では、特に次の強みが活かせます。",
  reskill: "民間で着実に価値を出していく観点では、特に次の強みが活かせます。",
};

// 選択された実績 → 民間向けの強み文（自己PR用）
const ACH_STRENGTH: Record<string, string> = {
  reform:
    "ルール変更を現場の運用に落とし込む力（業務プロセスの設計・改善の素地）",
  dx: "非効率な業務を見直し、仕組みで解決する力（業務改善・DX推進の素地）",
  event:
    "関係者を巻き込み、企画から実行まで完遂する力（プロジェクト推進の素地）",
  budget:
    "限られた予算で優先順位をつけて執行する力（コスト管理・進行管理の素地）",
  consult:
    "相手の課題を整理し、着地点を見つける力（顧客折衝・カスタマー対応の素地）",
  plan: "現状分析から方針を組み立てる力（企画・戦略立案の素地）",
  subsidy:
    "要件と根拠を正確に管理し、期限内に処理する力（オペレーション品質の素地）",
  adjust: "利害の異なる相手の合意を形成する力（ステークホルダー調整の素地）",
  data: "数値やデータをもとに現状を把握し、判断材料に変える力（データ活用の素地）",
  pr: "情報を分かりやすく整理して発信する力（広報・コンテンツ発信の素地）",
  hr: "後進の育成やチームの底上げに関わってきた経験（マネジメント・育成の素地）",
  contract:
    "要件・条件を正確に管理し、公正に手続きを進める力（調達・契約管理の素地）",
};

// 選択された実績 → 職務経歴の記述例（役職で実務視点/統括視点に分岐、数値は【】プレースホルダ）
const ACH_EXAMPLE: Record<string, { junior: string; senior: string }> = {
  reform: {
    junior:
      "【対象制度】の改正に伴い、【所属課】で運用フローの見直しを担当。関係部署・住民への周知を実施し、【例：問い合わせ◯%削減】に貢献。",
    senior:
      "【対象制度】の改正対応を主導。【所属課】の運用フロー再構築と関係部署の合意形成をとりまとめ、【例：誤処理の防止／問い合わせ◯%削減】を実現。",
  },
  dx: {
    junior:
      "【対象業務】のシステム更改・効率化を担当。【例：処理時間を月◯時間削減】し、作業を標準化。",
    senior:
      "【対象業務】のシステム更改・効率化プロジェクトを推進。【例：月◯時間削減】と属人化の解消をチームで実現。",
  },
  event: {
    junior:
      "【事業・イベント名】の運営を担当。【例：来場◯名】の対応と関係先との調整を実施。",
    senior:
      "【事業・イベント名】を企画・統括。【例：来場◯名／◯団体】との調整を主導し、予算内で完遂。",
  },
  budget: {
    junior:
      "【担当事業】の予算執行を担当。【例：◯千万円規模】について計画的に管理。",
    senior:
      "【担当事業】の予算要求から執行までを管理。【例：◯千万円規模】を優先順位づけして統括。",
  },
  consult: {
    junior:
      "【対象分野】の窓口・相談対応を担当。【例：年間◯件】を処理し、正確な対応を徹底。",
    senior:
      "【対象分野】の相談対応体制を統括。【例：年間◯件】の対応品質と住民満足の両立を推進。",
  },
  plan: {
    junior: "【計画・方針名】の策定に参画。現状分析と資料作成を担当。",
    senior:
      "【計画・方針名】の策定を主導。現状分析から【例：◯か年計画】としてとりまとめ。",
  },
  subsidy: {
    junior:
      "【補助金・交付金名】の事務を担当。要件審査から支給まで【例：年間◯件】を正確に処理。",
    senior:
      "【補助金・交付金名】の事務を統括。【例：年間◯件・◯千万円】の適正処理と進行管理を主導。",
  },
  adjust: {
    junior:
      "【案件名】について、【例：◯部署】との調整を担当。関係者間の情報連携を実施。",
    senior:
      "【案件名】について、【例：◯部署・◯団体】の利害調整と合意形成を主導。橋渡し役を担当。",
  },
  data: {
    junior:
      "【対象業務】のデータ集計・分析を担当。【例：◯件のデータ】を整理し、資料化。",
    senior:
      "【対象業務】のデータ分析をもとに改善提案を主導。【例：◯%の改善】につなげる根拠を提示。",
  },
  pr: {
    junior:
      "【対象事業】の広報・住民周知を担当。【例：SNS・広報誌】での情報発信を実施。",
    senior:
      "【対象事業】の広報戦略を企画・主導。【例：閲覧◯件／申込◯%増】に貢献。",
  },
  hr: {
    junior: "新人・後進の育成やOJTを担当。【例：◯名】の指導を実施。",
    senior:
      "【所属課】の人材育成・研修を主導。【例：◯名規模】のチーム力向上に貢献。",
  },
  contract: {
    junior:
      "【対象案件】の契約・入札事務を担当。要件確認から手続きまでを正確に処理。",
    senior:
      "【対象案件】の契約・入札を統括。【例：◯件・◯千万円】の公正な手続きを主導。",
  },
};

const SENIOR_POSITIONS = ["kakari", "manager"];

export type ResumeDraft = {
  summary: string;
  strengthsLead: string;
  strengths: string[];
  experiences: string[];
};

export function isResumeInputsComplete(inputs: ResumeInputs): boolean {
  return Boolean(
    inputs.department &&
      inputs.position &&
      inputs.years &&
      inputs.coordination &&
      inputs.achievements.length > 0,
  );
}

export function buildResumeDraft(
  type: DiagnosisType,
  inputs: ResumeInputs,
): ResumeDraft {
  const dept = DEPT_PHRASE[inputs.department] ?? "行政事務全般";
  const years = YEARS_PHRASE[inputs.years] ?? "";
  const pos = POS_PHRASE[inputs.position] ?? "担当者として";
  const coord = COORD_PHRASE[inputs.coordination] ?? "関係者をまとめ";
  const budget = BUDGET_PHRASE[inputs.budget] ?? "";
  const senior = SENIOR_POSITIONS.includes(inputs.position);

  const achTop = inputs.achievements
    .slice(0, 3)
    .map((a) => ACH_NOUN[a])
    .filter(Boolean)
    .join("・");

  const summary =
    `地方自治体において${dept}に${years}従事してきました。` +
    `${pos}${budget}${coord}、${achTop || "行政運営"}などを担当。` +
    TYPE_CLOSING[type];

  const strengths = inputs.achievements
    .slice(0, 3)
    .map((a) => ACH_STRENGTH[a])
    .filter(Boolean);

  const experiences = inputs.achievements
    .slice(0, 4)
    .map((a) => ACH_EXAMPLE[a]?.[senior ? "senior" : "junior"])
    .filter(Boolean);

  return {
    summary,
    strengthsLead: TYPE_STRENGTH_LEAD[type],
    strengths,
    experiences,
  };
}
