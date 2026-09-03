import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title}｜公務員キャリアシフト診断`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
      <p className="text-xs font-medium tracking-wide text-brand-700">
        {article.cluster}
      </p>
      <h1 className="mt-2 text-2xl font-bold leading-snug text-slate-900 sm:text-3xl">
        {article.title}
      </h1>
      <p className="mt-2 text-xs text-slate-400">最終更新: {article.updated}</p>

      <div className="mt-6">
        <article.Body />
      </div>

      <div className="mt-8 border-t border-slate-100 pt-6">
        <Link
          href="/articles"
          className="text-sm font-medium text-brand-600 underline"
        >
          コラム一覧へ戻る
        </Link>
      </div>
    </article>
  );
}
