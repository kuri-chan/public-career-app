export const SITE_URL = "https://public-career-app.vercel.app";

// お問い合わせ用 Google フォームのURL
export const CONTACT_FORM_URL = "https://forms.gle/dS6GUMN55fWb6AyQ6";

// 職務経歴書フル版（Layer2）の申込フォーム（Tally＋Stripe決済 ¥1,480）
export const RESUME_FULL_URL = "https://tally.so/r/zx55Zg";

// 実アフィリエイトサービス（A8.net）
// url: 遷移先 / imgSrc: インプレッション計測用ピクセル（表示時に発火）
export const affiliateServices = {
  agentNavi: {
    id: "agentNavi",
    name: "転職エージェントナビ",
    url: "https://px.a8.net/svt/ejp?a8mat=4BADDJ+BFZZEA+5BJK+5YRHE",
    imgSrc: "https://www10.a8.net/0.gif?a8mat=4BADDJ+BFZZEA+5BJK+5YRHE",
  },
  skillHacks: {
    id: "skillHacks",
    name: "SkillHacks（スキルハックス）",
    url: "https://px.a8.net/svt/ejp?a8mat=4BAE5B+CXKZUA+4K3S+5YJRM",
    imgSrc: "https://www13.a8.net/0.gif?a8mat=4BAE5B+CXKZUA+4K3S+5YJRM",
  },
} as const;

export type AffiliateServiceId = keyof typeof affiliateServices;
