import Link from "next/link";

const translations = [
  { from: "庁内の部署間調整", to: "ステークホルダー調整" },
  { from: "起案・決裁", to: "企画・要件定義" },
  { from: "予算要求・執行", to: "プロジェクト予算管理" },
];

const steps = [
  { title: "あなたのキャリアタイプ", body: "回答の傾向から、中立なアルゴリズムで方向性を判定します。" },
  { title: "経験の民間スキルへの翻訳", body: "調整・起案・予算管理などが、民間で通じるどんなスキルの素地になるかを示します。" },
  { title: "相性の良い職種", body: "PMO・業務改善・カスタマーサクセスなど、具体的な職種候補まで落とし込みます。" },
  { title: "現実的なキャリアルート", body: "今の経験を足場に横移動する、無理のないステップを提示します。" },
  { title: "まず取るべき次の一歩", body: "転職・学習・現職継続のどれを選ぶ場合でも、最初にやることが分かります。" },
  { title: "職務経歴書のドラフト", body: "いくつか選ぶだけで、あなたの経験に沿った職務経歴書の下書きを作成できます。" },
];

const targets = [
  "民間への転職に関心はあるが、自分の経験が通用するか不安",
  "プログラミング未経験で、IT・Web業界は難しいと思っている",
  "職務経歴書に何を書けばいいか分からない",
  "今すぐ辞めるかは決めていない（現職を続ける選択肢も知りたい）",
];

const features = [
  { title: "全5問・約1分", body: "選択肢を選ぶだけ。会員登録も不要です。" },
  { title: "中立な判定", body: "回答傾向からアルゴリズムで判定。特定の結論に誘導しません。" },
  { title: "プライバシー配慮", body: "回答はブラウザ内で処理され、サーバーへ送信しません。" },
  { title: "転職ありきではない", body: "現職を続けながら準備する選択肢も一緒に提示します。" },
];

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-brand-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

function StartButton({ full = false }: { full?: boolean }) {
  return (
    <Link
      href="/diagnosis"
      className={`inline-flex items-center justify-center rounded-xl bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-800 sm:text-base ${
        full ? "w-full" : "w-full sm:w-auto"
      }`}
    >
      無料で診断をはじめる
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-10">
        <p className="text-xs font-medium tracking-wide text-brand-700">
          自治体職員・行政職の方へ ｜ 無料キャリア診断
        </p>
        <h1 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
          公務員の経験は、民間でどんなスキルになる？
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          庁内調整・起案・予算管理。あなたが積み上げてきた行政の経験を、民間で通じる形に翻訳し、相性の良い職種と次の一歩まで示します。
        </p>
        <p className="mt-3 text-sm font-medium text-slate-700">
          全5問・約1分・登録不要
        </p>
        <div className="mt-8">
          <StartButton />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          回答はブラウザ内で処理され、サーバーへ送信しません。結果は中立なアルゴリズムで判定します。
        </p>
      </section>

      {/* 翻訳サンプル */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          たとえば、こう翻訳できます
        </h2>
        <ul className="mt-4 space-y-2.5">
          {translations.map((t) => (
            <li
              key={t.from}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <span className="text-sm text-slate-600">{t.from}</span>
              <ArrowRight />
              <span className="inline-flex items-center rounded-md bg-brand-100 px-2 py-0.5 text-sm font-bold text-brand-800">
                {t.to}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-slate-500">
          あくまで活かせる素地としての翻訳です。過度な断定はせず、可能性として提示します。
        </p>
      </section>

      {/* 診断でわかること */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          診断でわかること
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          タイプ判定だけで終わらせず、次の行動まで一気通貫で示します。
        </p>
        <ol className="mt-4 space-y-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="font-bold text-slate-900">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* こんな方へ */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          こんな方に向いています
        </h2>
        <ul className="mt-4 space-y-2.5">
          {targets.map((t) => (
            <li key={t} className="flex items-start gap-3">
              <svg
                viewBox="0 0 20 20"
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 111.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm leading-relaxed text-slate-700">{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 特徴 */}
      <section className="grid gap-4 sm:grid-cols-2">
        {features.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <h2 className="text-sm font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {item.body}
            </p>
          </article>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="rounded-2xl border-2 border-brand-500 bg-white p-6 text-center shadow-card sm:p-8">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          あなたの経験を、民間のことばに翻訳してみませんか
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          5問・約1分・登録不要。まずは気軽に試せます。
        </p>
        <div className="mt-6">
          <StartButton />
        </div>
      </section>
    </div>
  );
}
