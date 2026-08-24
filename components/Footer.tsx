export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-8 text-center">
        <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
          当サイトは中立なアルゴリズムで診断を行っています
        </p>
        <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
          回答はブラウザ内で処理され、サーバーへ送信しません。結果は参考情報であり、就職・転職を保証するものではありません。
        </p>
      </div>
    </footer>
  );
}
