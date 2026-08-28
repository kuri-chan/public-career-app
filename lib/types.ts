import type { AffiliateServiceId } from "./links";

export type DiagnosisType = "bizops" | "ainocode" | "reskill";

export type QuestionOption = {
  id: string;
  label: string;
  scores: Partial<Record<DiagnosisType, number>>;
};

export type Question = {
  id: string;
  title: string;
  description?: string;
  options: QuestionOption[];
};

// Section2: 公務員経験 → 民間スキルの「翻訳」（断定ではなく可能性として表現）
export type SkillTranslation = {
  from: string; // 公務員での経験
  to: string; // 民間で活かせるスキル
  note: string; // 「素地として活かせる可能性」という翻訳の補足
};

// Section3: 相性の良い具体職種
export type FitJob = {
  title: string;
  rating: number; // 1-5（相性★の数）
  body: string;
};

// Section5: あなたの次の一歩（STEP）
export type NextStep = {
  step: string; // "STEP 1" など
  title: string;
  body: string;
};

// Section6: 状況別CTA（ユーザーが自己選択できる出し分け）
export type CtaKind = "transfer" | "reskill" | "content";

export type Cta = {
  kind: CtaKind;
  audience: string; // どんな状況の人向けか
  title: string;
  description: string;
  buttonLabel: string;
  service?: AffiliateServiceId; // 未指定＝中立の情報枠（アフィリエイトなし）
};

export type TypeResult = {
  id: DiagnosisType;
  name: string;
  // Section1: ファーストビュー
  tagline: string; // 一言でのキャリア方向性
  affirmation: string; // 公務員経験の肯定（断定を避ける）
  summary: string;
  // Section2: 経験→スキル変換表
  skillTranslations: SkillTranslation[];
  // Section3: 相性の良い職種
  fitJobs: FitJob[];
  // Section4: キャリアシフトルート
  careerRoute: string[];
  // Section5: 次の一歩
  nextSteps: NextStep[];
  // Section6: CTA（強調順にソート済み）
  ctas: Cta[];
};
