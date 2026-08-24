import { emptyScores, type ScoreMap } from "./scores";
import { typePriority } from "./results";
import type { DiagnosisType, QuestionOption } from "./types";

export type { ScoreMap } from "./scores";
export { emptyScores } from "./scores";

export function tallyScores(answers: QuestionOption[]): ScoreMap {
  return answers.reduce((scores, answer) => {
    (Object.entries(answer.scores) as [DiagnosisType, number][]).forEach(
      ([type, value]) => {
        scores[type] += value;
      },
    );
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
