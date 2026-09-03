import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "コラム｜公務員キャリアシフト診断",
  description:
    "公務員の経験を民間で通じる言葉に翻訳するためのヒントや、キャリアを考えるときの整理法を紹介します。",
};

export default function ArticlesIndexPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <p className="text-xs font-medium tracking-wide text-brand-700">
          コラム
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          公務員のキャリアを考えるヒント
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          経験の翻訳の仕方、職務経歴書の書き方、キャリアを考えるときの整理法などを紹介しています。
        </p>
      </section>

      <div className="space-y-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:border-brand-400 sm:p-6"
          >
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              {article.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {article.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
