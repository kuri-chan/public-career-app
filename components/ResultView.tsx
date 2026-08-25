import Link from "next/link";
import type { TypeResult } from "@/lib/types";
import { ActionCards } from "./ActionCards";
import { ShareOnXButton } from "./ShareOnXButton";
const AFFILIATE_LINKS = {
  skillHacks: {
    url: "https://px.a8.net/svt/ejp?a8mat=4BAE5B+CXKZUA+4K3S+5YJRM",
    imgSrc: "https://www13.a8.net/0.gif?a8mat=4BAE5B+CXKZUA+4K3S+5YJRM",
  },
  agentNavi: {
    url: "https://px.a8.net/svt/ejp?a8mat=4BADDJ+BFZZEA+5BJK+5YRHE",
    imgSrc: "https://www10.a8.net/0.gif?a8mat=4BADDJ+BFZZEA+5BJK+5YRHE",
  },
};
const RECOMMENDATIONS = {
  "BizOps/PMタイプ": {
    title: "転職エージェントナビ",
    description: "プロのアドバイザーがあなたの適性を分析し、キャリアシフトを個別にサポート",
    linkKey: "agentNavi",
    buttonText: "無料カウンセリングを試す",
  },
  "AI活用/ノーコードタイプ": {
    title: "転職エージェントナビ",
    description: "IT・Web業界に強いアドバイザーがAI/ノーコード領域への転職を強力バックアップ",
    linkKey: "agentNavi",
    buttonText: "無料でキャリア相談する",
  },
  "リスキリング型": {
    title: "SkillHacks（スキルハックス）",
    description: "動画で学べる初心者向けプログラミング講座。基礎からしっかりスキルを習得",
    linkKey: "skillHacks",
    buttonText: "講座の詳細・受講ページを見る",
  },
} as const;
type ResultViewProps = {
  result: TypeResult;
};
export function ResultView({ result }: ResultViewProps) {
  // クリック計測用関数
  const handleAffiliateClick = (serviceName: string, resultType: string) => {
    console.log(`[Affiliate Click] Type: ${resultType}, Service: ${serviceName}`);
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "click_affiliate", {
        event_category: "affiliate",
        event_label: serviceName,
        result_type: resultType,
      });
    }
  };

  // 診断結果タイプに対応するおすすめ情報の取得
  const defaultRecommendation = RECOMMENDATIONS["BizOps/PMタイプ"];
  const recommendation =
    (result?.name && RECOMMENDATIONS[result.name as keyof typeof RECOMMENDATIONS]) ||
    defaultRecommendation;

  const linkData = recommendation
    ? AFFILIATE_LINKS[recommendation.linkKey]
    : AFFILIATE_LINKS.agentNavi;


  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <p className="text-xs font-medium tracking-wide text-brand-700">
          あなたの適性タイプ
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          {result.name}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          {result.tagline}
        </p>
        <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
          {result.summary}
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <h2 className="text-lg font-bold text-slate-900">
          {result.publicExperience.heading}
        </h2>
        <ul className="mt-5 space-y-4">
          {result.publicExperience.points.map((point) => (
            <li
              key={point.title}
              className="rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <p className="text-sm font-semibold text-brand-800">
                {point.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                {point.body}
              </p>
            </li>
          ))}
        </ul>
      </section>
      {/* おすすめ案件表示カード */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          あなたへのおすすめ
        </span>
        <h3 className="mt-2 text-lg font-bold text-slate-900">
          {recommendation.title}
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          {recommendation.description}
        </p>

        <a
          href={linkData.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleAffiliateClick(recommendation.title, result.name)}
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none"
        >
          {recommendation.buttonText}
          <img
            width="1"
            height="1"
            src={linkData.imgSrc}
            alt=""
            style={{ display: "none" }}
          />
        </a>
      </section>

      <ActionCards cards={result.actions} />

      <ShareOnXButton typeName={result.name} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/diagnosis"
          className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          もう一度診断する
        </Link>
        <Link
          href="/"
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-900"
        >
          トップへ戻る
        </Link>
      </div>
    </div>
  );
}
