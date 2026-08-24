import type { Question } from "./types";

export const questions: Question[] = [
  {
    id: "q1",
    title: "現在の職種・主な業務内容は？",
    options: [
      {
        id: "q1-a",
        label: "許認可・審査・窓口業務",
        scores: { reskill: 2, bizops: 1 },
      },
      {
        id: "q1-b",
        label: "予算・会計・契約業務",
        scores: { bizops: 2 },
      },
      {
        id: "q1-c",
        label: "政策企画・事業推進・プロジェクト調整",
        scores: { bizops: 2 },
      },
      {
        id: "q1-d",
        label: "インフラ・技術・専門職",
        scores: { ainocode: 2 },
      },
    ],
  },
  {
    id: "q2",
    title: "転職・副業で最も叶えたい「変化」は？",
    options: [
      {
        id: "q2-a",
        label: "年収アップ・個人の成果に応じた評価",
        scores: { bizops: 2 },
      },
      {
        id: "q2-b",
        label: "リモートワーク・柔軟な働き方",
        scores: { ainocode: 1, reskill: 1 },
      },
      {
        id: "q2-c",
        label: "自分の意思でプロジェクトを動かす裁量権",
        scores: { bizops: 2 },
      },
      {
        id: "q2-d",
        label: "AIや最新ITツールを駆使するスキルの獲得",
        scores: { ainocode: 2 },
      },
    ],
  },
  {
    id: "q3",
    title: "最も得意・抵抗がない作業スタンスは？",
    options: [
      {
        id: "q3-a",
        label: "ルールやマニュアルを読み込み、正確に運用する",
        scores: { reskill: 2 },
      },
      {
        id: "q3-b",
        label: "関係部署や利害関係者との合意形成・調整を行う",
        scores: { bizops: 2 },
      },
      {
        id: "q3-c",
        label: "正解がない中で、まず手を動かして試行錯誤する",
        scores: { ainocode: 2 },
      },
      {
        id: "q3-d",
        label: "データを分析し、業務の無駄を改善・仕組み化する",
        scores: { ainocode: 1, bizops: 1 },
      },
    ],
  },
  {
    id: "q4",
    title: "現在のAI・ITスキルのレベル感は？",
    options: [
      {
        id: "q4-a",
        label: "Excel/Wordは使えるが、特別なIT知識はない",
        scores: { reskill: 2 },
      },
      {
        id: "q4-b",
        label: "ChatGPT/Claudeなどを日常的に業務やプライベートで使っている",
        scores: { ainocode: 2 },
      },
      {
        id: "q4-c",
        label: "ノーコードツールやWebアプリ開発を触ったことがある",
        scores: { ainocode: 3 },
      },
    ],
  },
  {
    id: "q5",
    title: "移行期間（学習・準備）に割ける時間は？",
    options: [
      {
        id: "q5-a",
        label: "まずはリスクなく半年〜1年かけて準備したい（スクール・副業から）",
        scores: { reskill: 2 },
      },
      {
        id: "q5-b",
        label: "3ヶ月〜半年で即行動したい（直接転職）",
        scores: { bizops: 2 },
      },
    ],
  },
];
