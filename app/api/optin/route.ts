import { buildOptinEmail } from "@/lib/optin-email";
import { isDiagnosisType } from "@/lib/diagnosis";
import { typeResults } from "@/lib/results";
import {
  CONTACT_FORM_URL,
  RIREKISHO_TEMPLATE_URL,
  SHOKUMU_KEIREKISHO_TEMPLATE_URL,
  SITE_URL,
} from "@/lib/links";

/**
 * 結果保存メールの登録エンドポイント。
 * 金融事業プロジェクト（手取りラボ）app/api/optin/route.ts と同一設計（Brevo）。
 * 新規npm依存なし・素のfetchでBrevo REST APIを呼ぶ。
 *
 * 処理順：
 *   ① Brevo /v3/contacts で連絡先を upsert
 *   ② Brevo /v3/smtp/email で「結果を保存しました」メールを即時送信
 * ②が失敗しても①は成立させる（取りこぼし防止）。
 *
 * 必須環境変数（Vercel）：
 *   BREVO_API_KEY      … サーバー専用（NEXT_PUBLICを付けない）
 *   BREVO_LIST_ID       … このブランド専用の新規リストID（手取りラボのlist=3とは別に作成）
 *   OPTIN_SENDER_EMAIL  … 送信元メールアドレス（Brevoで検証済みドメインのもの）
 *   OPTIN_SENDER_NAME   … 送信元表示名（例：公務員キャリアシフト診断）
 *
 * 1週間後などの再訪促進メールは、このAPIでは送らない。Brevo側の
 * マーケティングオートメーション（このリストへの登録をトリガーに、
 * N日後に別メールを送る）で設定する運用を想定（外部ダッシュボード設定・コード不要）。
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BREVO_BASE = "https://api.brevo.com/v3";
// TODO: 独自ドメイン取得後、専用の配信解除アドレス（mailto）または
// ワンクリック配信解除エンドポイント（RFC 8058）に差し替える。
// それまでは実在するお問い合わせフォームへのリンクを暫定として使う。
const UNSUBSCRIBE = CONTACT_FORM_URL;

interface OptinBody {
  email?: unknown;
  consent?: unknown;
  type?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---- 簡易レート制限（同一IP・短時間の連投を抑止。サーバーレスのため best-effort） ----
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_HITS = 5;
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  HITS.set(ip, arr);
  return arr.length > MAX_HITS;
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function POST(req: Request): Promise<Response> {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  const senderEmail = process.env.OPTIN_SENDER_EMAIL;
  const senderName = process.env.OPTIN_SENDER_NAME || "公務員キャリアシフト診断";

  if (!apiKey || !listId || !senderEmail) {
    console.error("[optin] missing env (BREVO_API_KEY / BREVO_LIST_ID / OPTIN_SENDER_EMAIL)");
    return json({ ok: false, error: "provider_error" }, 502);
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return json({ ok: false, error: "rate_limited" }, 429);

  let body: OptinBody;
  try {
    body = (await req.json()) as OptinBody;
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) return json({ ok: false, error: "invalid_email" }, 400);
  if (body.consent !== true) return json({ ok: false, error: "consent_required" }, 400);

  const type = typeof body.type === "string" ? body.type : null;
  if (!isDiagnosisType(type)) return json({ ok: false, error: "bad_request" }, 400);
  const result = typeResults[type];

  // ---- ① 連絡先を upsert ----
  try {
    const res = await fetch(`${BREVO_BASE}/contacts`, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        listIds: [listId],
        attributes: {
          RESULT_TYPE: type,
          RESULT_TYPE_NAME: result.name,
        },
      }),
    });
    if (!res.ok && res.status !== 204) {
      const detail = await res.text().catch(() => "");
      console.error("[optin] contacts upsert failed", res.status, detail);
      return json({ ok: false, error: "provider_error" }, 502);
    }
  } catch (e) {
    console.error("[optin] contacts upsert threw", e);
    return json({ ok: false, error: "provider_error" }, 502);
  }

  // ---- ② 結果保存メールを即時送信（失敗しても①は成立） ----
  let emailSent = false;
  try {
    const mail = buildOptinEmail({
      typeName: result.name,
      tagline: result.tagline,
      resultUrl: `${SITE_URL}/result?type=${type}`,
      articlesUrl: `${SITE_URL}/articles`,
      rirekishoTemplateUrl: RIREKISHO_TEMPLATE_URL,
      shokumuKeirekishoTemplateUrl: SHOKUMU_KEIREKISHO_TEMPLATE_URL,
      unsubscribeUrl: UNSUBSCRIBE,
    });
    const res = await fetch(`${BREVO_BASE}/smtp/email`, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email }],
        subject: mail.subject,
        htmlContent: mail.html,
        textContent: mail.text,
        headers: { "List-Unsubscribe": `<${UNSUBSCRIBE}>` },
      }),
    });
    emailSent = res.ok;
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[optin] smtp/email failed", res.status, detail);
    }
  } catch (e) {
    console.error("[optin] smtp/email threw", e);
  }

  return json({ ok: true, emailSent }, 200);
}
