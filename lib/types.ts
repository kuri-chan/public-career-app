import type { AffiliateLinkId } from "./links";

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

export type ActionCard = {
  id: AffiliateLinkId;
  title: string;
  description: string;
  ctaLabel: string;
};

export type TypeResult = {
  id: DiagnosisType;
  name: string;
  tagline: string;
  summary: string;
  publicExperience: {
    heading: string;
    points: { title: string; body: string }[];
  };
  actions: ActionCard[];
};
