import type { Question } from "./types";

export const questions: Question[] = [
  {
    id: "q1",
    title: "日々の業務で、いちばんやりがいを感じるのはどれですか？",
    description: "いまの仕事で自然と力が入る場面を選んでください。",
    options: [
      {
        id: "q1-a",
        label: "関係部署との調整や合意形成。関係者をまとめて物事を前に進めること",
        type: "bizops",
      },
      {
        id: "q1-b",
        label: "手作業の削減や仕組みづくり。業務を効率よく回す工夫を考えること",
        type: "ainocode",
      },
      {
        id: "q1-c",
        label: "新しい知識を学び、現場に少しずつ活かしていくこと",
        type: "reskill",
      },
    ],
  },
  {
    id: "q2",
    title: "民間転職で、いちばん活かしたい強みはどれですか？",
    description: "公務員としての経験のうち、アピールしたい軸を選んでください。",
    options: [
      {
        id: "q2-a",
        label: "起案・企画立案、予算管理、進捗管理など、案件を完遂した経験",
        type: "bizops",
      },
      {
        id: "q2-b",
        label: "Excelや既存システムを工夫して使った経験、ツールで現場を楽にした経験",
        type: "ainocode",
      },
      {
        id: "q2-c",
        label: "誠実さ、学習意欲、基礎的なPCスキル。これから専門性を伸ばしたい気持ち",
        type: "reskill",
      },
    ],
  },
  {
    id: "q3",
    title: "新しいITツールや制度が導入されるとき、あなたの反応は？",
    description: "変化への向き合い方から、適性の傾向を見ます。",
    options: [
      {
        id: "q3-a",
        label: "まず影響範囲と関係者を整理し、導入判断や調整から入る",
        type: "bizops",
      },
      {
        id: "q3-b",
        label: "まず自分で触って試し、使えそうなら現場に展開したくなる",
        type: "ainocode",
      },
      {
        id: "q3-c",
        label: "体系的な講座や教材で、基礎から順番に理解してから使いたい",
        type: "reskill",
      },
    ],
  },
  {
    id: "q4",
    title: "民間で目指したい働き方に近いのはどれですか？",
    description: "正解はありません。いまの本音に近いものを選んでください。",
    options: [
      {
        id: "q4-a",
        label: "プロジェクトを回し、関係者と成果責任を持って仕事を進めたい",
        type: "bizops",
      },
      {
        id: "q4-b",
        label: "AIやノーコードを使い、現場の業務そのものを変えたい",
        type: "ainocode",
      },
      {
        id: "q4-c",
        label: "専門スキルを身につけ、職種転換しながら安定してキャリアを伸ばしたい",
        type: "reskill",
      },
    ],
  },
  {
    id: "q5",
    title: "これから半年で、いちばん優先したいことは？",
    description: "直近の行動計画が、タイプ判定の決め手になります。",
    options: [
      {
        id: "q5-a",
        label: "実績の言語化。起案・調整・予算管理の経験を、民間向けに整理する",
        type: "bizops",
      },
      {
        id: "q5-b",
        label: "生成AIやノーコードで、今の業務を自動化・効率化してみる",
        type: "ainocode",
      },
      {
        id: "q5-c",
        label: "資格取得やプログラミング基礎など、学習の土台を固める",
        type: "reskill",
      },
    ],
  },
];
