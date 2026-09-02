export const SITE_URL = "https://public-career-app.vercel.app";

// お問い合わせ用 Google フォームのURL
export const CONTACT_FORM_URL = "https://forms.gle/dS6GUMN55fWb6AyQ6";

// 職務経歴書フル版（Layer2）の申込フォーム（Tally＋Stripe決済 ¥1,480）
export const RESUME_FULL_URL = "https://tally.so/r/zx55Zg";

// 実アフィリエイトサービス（提携中のみ掲載）
// url: 遷移先 / imgSrc: インプレッション計測用ピクセル（表示時に発火）
// A8.net / もしもアフィリエイト / バリューコマース の3ASPを収容。
export const affiliateServices = {
  // --- 転職エージェント ---
  groovementAgent: {
    id: "groovementAgent",
    name: "Groovement Agent",
    url: "https://px.a8.net/svt/ejp?a8mat=4BAGHF+728436+4SXU+NTRMQ",
    imgSrc: "https://www16.a8.net/0.gif?a8mat=4BAGHF+728436+4SXU+NTRMQ",
  },
  neoDaini: {
    id: "neoDaini",
    name: "第二新卒エージェントneo（ネオキャリア）",
    url: "https://px.a8.net/svt/ejp?a8mat=4BAITP+RDZDM+3Y6M+631SY",
    imgSrc: "https://www14.a8.net/0.gif?a8mat=4BAITP+RDZDM+3Y6M+631SY",
  },
  // --- キャリアコーチング / 相談 ---
  michinori: {
    id: "michinori",
    name: "Michinori for career（キャリアコーチング型転職エージェント）",
    url: "https://af.moshimo.com/af/c/click?a_id=5782994&p_id=7517&pc_id=21714&pl_id=94844",
    imgSrc:
      "https://i.moshimo.com/af/i/impression?a_id=5782994&p_id=7517&pc_id=21714&pl_id=94844",
  },
  zapass: {
    id: "zapass",
    name: "ZaPASS（キャリアコーチング）",
    url: "https://af.moshimo.com/af/c/click?a_id=5783000&p_id=5864&pc_id=16276&pl_id=75143",
    imgSrc:
      "https://i.moshimo.com/af/i/impression?a_id=5783000&p_id=5864&pc_id=16276&pl_id=75143",
  },
  careerPat: {
    id: "careerPat",
    name: "キャリパト",
    url: "https://af.moshimo.com/af/c/click?a_id=5782993&p_id=7422&pc_id=21397&pl_id=93522",
    imgSrc:
      "https://i.moshimo.com/af/i/impression?a_id=5782993&p_id=7422&pc_id=21397&pl_id=93522",
  },
  // --- スクール（学習） ---
  internetAcademy: {
    id: "internetAcademy",
    name: "インターネット・アカデミー（Web/プログラミングスクール）",
    url: "https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3779840&pid=892691086",
    imgSrc:
      "https://ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3779840&pid=892691086",
  },
} as const;

export type AffiliateServiceId = keyof typeof affiliateServices;
