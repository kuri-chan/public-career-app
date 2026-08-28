import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_FORM_URL } from "@/lib/links";

export const metadata: Metadata = {
  title: "お問い合わせ｜公務員キャリアシフト診断",
  description: "「公務員キャリアシフト診断」へのお問い合わせページです。",
};

export default function ContactPage() {
  const formReady = !CONTACT_FORM_URL.includes("REPLACE_WITH_YOUR_FORM_ID");

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        お問い合わせ
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
        当サイトへのご質問・ご要望・掲載内容に関するお問い合わせは、下記のお問い合わせフォームより承ります。内容を確認のうえ、必要に応じてご入力いただいたメールアドレス宛にご返信いたします。
      </p>

      <div className="mt-6">
        {formReady ? (
          <a
            href={CONTACT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-700 sm:w-auto"
          >
            お問い合わせフォームを開く
          </a>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
            お問い合わせフォームは現在準備中です。近日中に公開いたします。
          </div>
        )}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-slate-400">
        いただいたお問い合わせへの対応には数日いただく場合があります。個人情報の取扱いについては
        <Link href="/privacy" className="text-brand-600 underline">
          プライバシーポリシー
        </Link>
        をご確認ください。
      </p>

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
