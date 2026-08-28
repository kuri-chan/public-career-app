import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-600 sm:text-sm">
          <Link href="/" className="hover:text-brand-700 hover:underline">
            ホーム
          </Link>
          <Link href="/operator" className="hover:text-brand-700 hover:underline">
            運営者情報
          </Link>
          <Link href="/privacy" className="hover:text-brand-700 hover:underline">
            プライバシーポリシー
          </Link>
          <Link href="/contact" className="hover:text-brand-700 hover:underline">
            お問い合わせ
          </Link>
        </nav>
        <p className="mt-6 text-center text-[11px] leading-relaxed text-slate-400">
          当サイトは中立なアルゴリズムで診断を行っています。回答はブラウザ内で処理され、サーバーへ送信しません。結果は参考情報であり、就職・転職を保証するものではありません。当サイトはアフィリエイトプログラムを利用しています。
        </p>
        <p className="mt-3 text-center text-[11px] text-slate-400">
          © {new Date().getFullYear()} 公務員キャリアシフト診断
        </p>
      </div>
    </footer>
  );
}
