export const SITE_URL = "https://koumuin-shift.com";

// お問い合わせ用 Google フォームのURL
export const CONTACT_FORM_URL = "https://forms.gle/dS6GUMN55fWb6AyQ6";

// 職務経歴書フル版（Layer2）の申込フォーム（Tally＋Stripe決済）
// プランA：職務経歴書のみ ¥1,480（編集可能なWord/.docxで納品）
export const RESUME_FULL_URL = "https://tally.so/r/zx55Zg";
// プランB：履歴書＋職務経歴書セット ¥2,480（編集可能なWord/.docxで納品）
// 履歴書は単体販売しない＝セットでしか手に入らない構成。詳細は resume-full スキル参照。
export const RESUME_FULL_SET_URL = "https://tally.so/r/LZ2qqp";

// 結果保存メール登録の特典：履歴書・職務経歴書の無料雛形（公開の静的ファイル、個人情報は含まない）
export const RIREKISHO_TEMPLATE_URL = `${SITE_URL}/templates/rirekisho-hinagata.docx`;
export const SHOKUMU_KEIREKISHO_TEMPLATE_URL = `${SITE_URL}/templates/shokumu-keirekisho-hinagata.docx`;

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
  uzuzIt: {
    id: "uzuzIt",
    name: "ウズウズIT（IT/Webエンジニア就職・転職）",
    url: "https://px.a8.net/svt/ejp?a8mat=4BAITP+SKUL6+33T0+1BMW42",
    imgSrc: "https://www12.a8.net/0.gif?a8mat=4BAITP+SKUL6+33T0+1BMW42",
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
