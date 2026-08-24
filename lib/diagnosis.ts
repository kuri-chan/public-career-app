import { typePriority } from "./results";
import type { DiagnosisType, QuestionOption } from "./types";

export type ScoreMap = Record<DiagnosisType, number>;

export function emptyScores(): ScoreMap {
  return { bizops: 0, ainocode: 0, reskill: 0 };
}

export function tallyScores(answers: QuestionOption[]): ScoreMap {
  return answers.reduce((scores, answer) => {
    scores[answer.type] += 1;
    return scores;
  }, emptyScores());
}

export function decideType(answers: QuestionOption[]): DiagnosisType {
  const scores = tallyScores(answers);
  const max = Math.max(...Object.values(scores));
  const tied = typePriority.filter((type) => scores[type] === max);
  return tied[0];
}

export function isDiagnosisType(value: string | null): value is DiagnosisType {
  return value === "bizops" || value === "ainocode" || value === "reskill";
}
