import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "運営者情報｜公務員キャリアシフト診断",
  description: "「公務員キャリアシフト診断」の運営者情報ページです。",
};

export default function OperatorPage() {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">運営者情報</h1>

      <dl className="mt-6 divide-y divide-slate-100 text-sm sm:text-base">
        <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-4 sm:gap-4">
          <dt className="font-semibold text-slate-700">サイト名</dt>
          <dd className="text-slate-600 sm:col-span-3">公務員キャリアシフト診断</dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-4 sm:gap-4">
          <dt className="font-semibold text-slate-700">運営者</dt>
          <dd className="text-slate-600 sm:col-span-3">公務員キャリアシフト診断 運営</dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-4 sm:gap-4">
          <dt className="font-semibold text-slate-700">URL</dt>
          <dd className="text-slate-600 sm:col-span-3">{SITE_URL}</dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-4 sm:gap-4">
          <dt className="font-semibold text-slate-700">お問い合わせ</dt>
          <dd className="text-slate-600 sm:col-span-3">
            <Link href="/contact" className="text-brand-700 underline">
              お問い合わせフォーム
            </Link>
            よりご連絡ください。
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-4 sm:gap-4">
          <dt className="font-semibold text-slate-700">サイトの目的</dt>
          <dd className="leading-relaxed text-slate-600 sm:col-span-3">
            公務員（自治体職員・行政職）の方が、これまでの経験を民間で通用するスキル・職種・キャリアの選択肢として捉え直すための、無料・登録不要のキャリア診断サービスを提供しています。
          </dd>
        </div>
        <div className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-4 sm:gap-4">
          <dt className="font-semibold text-slate-700">広告について</dt>
          <dd className="leading-relaxed text-slate-600 sm:col-span-3">
            当サイトは、A8.net・バリューコマース・アクセストレード・もしもアフィリエイト等のアフィリエイトプログラムを利用しています。詳細は
            <Link href="/privacy" className="text-brand-700 underline">
              プライバシーポリシー
            </Link>
            をご覧ください。
          </dd>
        </div>
      </dl>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          トップへ戻る
        </Link>
      </div>
    </article>
  );
}
