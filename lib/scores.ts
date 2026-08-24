import type { DiagnosisType } from "./types";

export type ScoreMap = Record<DiagnosisType, number>;

export function emptyScores(): ScoreMap {
  return { bizops: 0, ainocode: 0, reskill: 0 };
}
