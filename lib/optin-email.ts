/**
 * 結果保存メールの本文ビルダー（純関数）。
 * 金融事業プロジェクト（手取りラボ）の lib/couple/optin-email.ts と同じ設計を踏襲。
 * 送信自体は app/api/optin/route.ts が担う。ここは文面生成のみでテスト可能に切り出す。
 */

export interface OptinEmailInput {
  /** 診断タイプ名（例：BizOps / PM型） */
  typeName: string;
  /** タイプのタグライン（一言でのキャリア方向性） */
  tagline: string;
  /** 結果ページへの絶対URL（…/result?type=xxx） */
  resultUrl: string;
  /** コラム一覧への絶対URL */
  articlesUrl: string;
  /** 履歴書の雛形（.docx）への絶対URL */
  rirekishoTemplateUrl: string;
  /** 職務経歴書の雛形（.docx）への絶対URL */
  shokumuKeirekishoTemplateUrl: string;
  /** 配信解除リンク（フッター必須） */
  unsubscribeUrl: string;
}

export interface OptinEmail {
  subject: string;
  html: string;
  text: string;
}

function esc(v: string): string {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildOptinEmail(i: OptinEmailInput): OptinEmail {
  const subject = `【公務員キャリアシフト診断】あなたの結果（${i.typeName}）を保存しました`;

  const text = [
    "公務員キャリアシフト診断です。診断おつかれさまでした。",
    `あなたのキャリアタイプは「${i.typeName}」。${i.tagline}`,
    "",
    "結果はいつでもこちらから見返せます。",
    i.resultUrl,
    "",
    "▼ すぐに使える無料の雛形もご用意しました",
    `履歴書の雛形（Word）：${i.rirekishoTemplateUrl}`,
    `職務経歴書の雛形（Word）：${i.shokumuKeirekishoTemplateUrl}`,
    "",
    "転職・リスキリング・現職継続、どれを選ぶ場合でも急ぐ必要はありません。情報が揃ってから決めて大丈夫です。",
    "",
    "▼ 経験の翻訳や職務経歴書の書き方のヒント",
    i.articlesUrl,
    "",
    "――――――――――",
    "公務員キャリアシフト診断",
    `配信解除はこちら：${i.unsubscribeUrl}`,
  ].join("\n");

  const html = `<!doctype html>
<html lang="ja">
<body style="margin:0;padding:0;background:#f8fafc;">
  <div style="max-width:560px;margin:0 auto;padding:28px 22px;font-family:-apple-system,BlinkMacSystemFont,'Hiragino Sans','Noto Sans JP',sans-serif;color:#1e293b;line-height:1.75;font-size:15px;">
    <p style="margin:0 0 14px;">公務員キャリアシフト診断です。診断おつかれさまでした。</p>
    <p style="margin:0 0 20px;">
      あなたのキャリアタイプは「<strong>${esc(i.typeName)}</strong>」。<br>
      ${esc(i.tagline)}
    </p>

    <p style="margin:0 0 24px;">
      <a href="${esc(i.resultUrl)}"
         style="display:inline-block;background:#1e40af;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:10px;">
        結果を見返す
      </a>
    </p>

    <div style="border-top:1px solid #e2e8f0;margin:22px 0;"></div>

    <p style="margin:0 0 6px;font-weight:700;">すぐに使える無料の雛形もご用意しました</p>
    <p style="margin:0 0 8px;">
      <a href="${esc(i.rirekishoTemplateUrl)}" style="color:#1e40af;">履歴書の雛形（Word）</a>
    </p>
    <p style="margin:0 0 20px;">
      <a href="${esc(i.shokumuKeirekishoTemplateUrl)}" style="color:#1e40af;">職務経歴書の雛形（Word）</a>
    </p>

    <div style="border-top:1px solid #e2e8f0;margin:22px 0;"></div>

    <p style="margin:0 0 6px;font-weight:700;">転職を急ぐ必要はありません</p>
    <p style="margin:0 0 16px;">
      転職・リスキリング・現職継続、どれを選ぶ場合でも、情報が揃ってから決めて大丈夫です。
    </p>

    <p style="margin:0 0 24px;font-size:14px;">
      経験の翻訳や職務経歴書の書き方のヒントは<a href="${esc(i.articlesUrl)}" style="color:#1e40af;">コラム</a>でも紹介しています。
    </p>

    <div style="border-top:1px solid #e2e8f0;margin:24px 0 14px;"></div>
    <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.7;">
      公務員キャリアシフト診断<br>
      配信はいつでも解除できます。<a href="${esc(i.unsubscribeUrl)}" style="color:#94a3b8;">配信解除はこちら</a>
    </p>
  </div>
</body>
</html>`;

  return { subject, html, text };
}
