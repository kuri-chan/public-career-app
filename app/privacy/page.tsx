import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜公務員キャリアシフト診断",
  description:
    "「公務員キャリアシフト診断」における個人情報の取扱い・アクセス解析・広告についての方針です。",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold text-slate-900 sm:text-xl">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-8">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        プライバシーポリシー
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
        公務員キャリアシフト診断（以下「当サイト」）は、利用者の個人情報を適切に取り扱うため、以下のとおりプライバシーポリシーを定めます。
      </p>

      <Section title="1. 診断の回答について">
        <p>
          当サイトの診断における質問への回答は、利用者のブラウザ内で処理され、当サイトのサーバーへ送信・保存されることはありません。診断結果や入力内容が第三者に共有されることはありません。
        </p>
      </Section>

      <Section title="2. 取得する情報と利用目的">
        <p>
          当サイトは、お問い合わせフォームを通じて、利用者が入力したお名前・メールアドレス・お問い合わせ内容等を取得する場合があります。これらの情報は、お問い合わせへの回答・ご連絡のためにのみ利用し、それ以外の目的では利用しません。
        </p>
      </Section>

      <Section title="3. アクセス解析ツールについて">
        <p>
          当サイトは、サイトの利用状況を把握するために Google
          が提供するアクセス解析ツール「Googleアナリティクス（GA4）」を利用しています。Googleアナリティクスはトラフィックデータの収集のために
          Cookie を使用します。このデータは匿名で収集されており、個人を特定するものではありません。
        </p>
        <p>
          この機能は Cookie
          を無効にすることで収集を拒否することができますので、お使いのブラウザの設定をご確認ください。詳細は
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-700 underline"
          >
            「ポリシーと規約｜Google」
          </a>
          をご覧ください。
        </p>
      </Section>

      <Section title="4. 広告・アフィリエイトプログラムについて">
        <p>
          当サイトは、第三者が提供するアフィリエイトプログラム（A8.net、バリューコマース、アクセストレード、もしもアフィリエイト等）を利用しています。これらのプログラムでは、広告主が提供する商品・サービス等の情報を掲載し、利用者がこれらを通じて申込・購入等を行った場合に、当サイトが広告主から成果報酬を受け取ることがあります。
        </p>
        <p>
          これらの第三者配信事業者は、利用者の興味に応じた広告表示や成果計測のために Cookie
          を使用する場合があります。Cookie
          はお使いのブラウザ設定から無効にすることができます。
        </p>
      </Section>

      <Section title="5. 第三者への提供">
        <p>
          当サイトは、法令に基づく場合を除き、取得した個人情報を利用者本人の同意なく第三者に提供することはありません。
        </p>
      </Section>

      <Section title="6. 免責事項">
        <p>
          当サイトの診断結果および掲載情報は、キャリアを考える上での参考情報として提供するものであり、就職・転職・収入の向上等を保証するものではありません。最終的な判断は利用者ご自身の責任において行ってください。
        </p>
        <p>
          当サイトからリンクやバナーによって移動できる外部サイトで提供される情報・サービスについて、当サイトは一切の責任を負いません。
        </p>
      </Section>

      <Section title="7. プライバシーポリシーの変更">
        <p>
          当サイトは、必要に応じて本ポリシーを変更することがあります。変更後のプライバシーポリシーは、本ページに掲載した時点から効力を生じるものとします。
        </p>
      </Section>

      <Section title="8. お問い合わせ">
        <p>
          本ポリシーに関するお問い合わせは、
          <Link href="/contact" className="text-brand-700 underline">
            お問い合わせフォーム
          </Link>
          よりご連絡ください。
        </p>
      </Section>

      <p className="mt-8 text-xs text-slate-400">制定日：2026年8月28日</p>

      <div className="mt-6">
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
