"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { trackOptinSubmit, trackOptinView } from "@/lib/analytics";
import type { DiagnosisType } from "@/lib/types";

// 結果保存（メール登録）カード。金融事業プロジェクト（手取りラボ）の
// OptinCard.tsx と同じ設計・同じ /api/optin パターンをこの事業向けに移植。
// 無料パスから初めて一次情報（メールアドレス）を回収する導線。

type Props = {
  type: DiagnosisType;
};

type Status = "idle" | "submitting" | "done" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function OptinCard({ type }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [emailSent, setEmailSent] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !fired.current) {
            fired.current = true;
            trackOptinView(type);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [type]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setErrorMsg("");

    if (!EMAIL_RE.test(email.trim())) {
      setErrorMsg("メールアドレスの形式をご確認ください。");
      return;
    }
    if (!consent) {
      setErrorMsg("プライバシーポリシーへの同意が必要です。");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/optin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), consent: true, type }),
      });
      const data: { ok?: boolean; emailSent?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));

      if (res.ok && data.ok) {
        trackOptinSubmit(type, data.emailSent !== false);
        setEmailSent(data.emailSent !== false);
        setStatus("done");
        return;
      }

      setErrorMsg(
        data.error === "invalid_email"
          ? "メールアドレスの形式をご確認ください。"
          : data.error === "rate_limited"
            ? "短時間に複数回送信されました。少し時間をおいてお試しください。"
            : "登録に失敗しました。時間をおいて再度お試しください。",
      );
      setStatus("error");
    } catch {
      setErrorMsg("通信に失敗しました。電波状況をご確認のうえ再度お試しください。");
      setStatus("error");
    }
  }

  return (
    <div ref={ref} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
        任意 ・ あとで見返したい方へ
      </span>
      <p className="mt-1 text-sm font-bold text-slate-900">
        結果をメールで保存する
      </p>
      <p className="mt-1 text-sm leading-relaxed text-slate-500">
        今の結果をあとから見返せるよう、リンクをメールでお送りします。売り込みはしません。
      </p>

      {status === "done" ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-bold text-slate-700">登録が完了しました。</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-500">
            {emailSent
              ? "結果を見返せるメールをお送りしました。数分たっても届かない場合は、迷惑メールフォルダをご確認ください。"
              : "結果を見返せるメールをお送りします。届かない場合は、迷惑メールフォルダをご確認ください。"}
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-4">
          <label htmlFor="optin-email" className="mb-1.5 block text-sm font-medium text-brand-800">
            メールで受け取る
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="optin-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "submitting"}
              className="w-full rounded-lg border border-brand-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="shrink-0 rounded-lg border border-brand-300 bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "submitting" ? "送信中…" : "結果を保存する"}
            </button>
          </div>

          <label className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-slate-600">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              disabled={status === "submitting"}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-brand-300 text-brand-600 focus:ring-brand-400"
            />
            <span>
              結果の保存とメール受け取りに同意します（
              <Link href="/privacy" className="underline decoration-brand-300 underline-offset-2">
                プライバシーポリシー
              </Link>
              ）。いつでも解除できます。
            </span>
          </label>

          {errorMsg && (
            <p className="mt-2 text-xs font-medium text-red-600" role="alert">
              {errorMsg}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
