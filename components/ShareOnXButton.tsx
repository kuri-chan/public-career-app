"use client";

import { SITE_URL } from "@/lib/links";

type ShareOnXButtonProps = {
  type: string;
  typeName: string;
};

function buildTweetUrl(type: string, typeName: string, base: string) {
  const resultUrl = `${base}/result?type=${type}`;
  const text = `公務員の経験は、民間だとこう「翻訳」できるらしい。\n私の診断結果は「${typeName}」でした。\n\n#公務員転職 #公務員キャリア\n${resultUrl}`;
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

export function ShareOnXButton({ type, typeName }: ShareOnXButtonProps) {
  const href = buildTweetUrl(type, typeName, SITE_URL);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        const origin = window.location.origin;
        if (origin === SITE_URL) return;
        // プレビュー/ローカル環境では実際の origin でURLを組み直す
        event.preventDefault();
        window.open(
          buildTweetUrl(type, typeName, origin),
          "_blank",
          "noopener,noreferrer",
        );
      }}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-4 text-sm font-bold text-white shadow-card transition hover:bg-black"
    >
      <XLogo />
      X（Twitter）で診断結果をシェアする
    </a>
  );
}

function XLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.726-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
