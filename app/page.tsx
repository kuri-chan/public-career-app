import Link from "next/link";

const highlights = [
  {
    title: "全5問・約2分",
    body: "1問ずつ選択肢を選ぶだけで進みます。進捗はプログレスバーで確認できます。",
  },
  {
    title: "3タイプに分類",
    body: "BizOps/PM、AI活用/ノーコード、リスキリング型。回答の傾向から中立に判定します。",
  },
  {
    title: "経験の翻訳つき",
    body: "起案・調整・予算管理が民間でどう評価されるかを、タイプ別に解説します。",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-10">
        <p className="text-xs font-medium tracking-wide text-brand-700">
          行政職員・公務員向け
        </p>
        <h1 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-4xl">
          キャリア・IT移行
          <br className="sm:hidden" />
          適性診断
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
          民間転職やITスキル移行で、自分はどの道が合いそうか。5つの質問から適性タイプを確認できます。回答はブラウザ内で処理します。
        </p>
        <Link
          href="/diagnosis"
          className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-brand-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-800 sm:w-auto"
        >
          診断をはじめる
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {highlights.map((item) => (
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
    </div>
  );
}
