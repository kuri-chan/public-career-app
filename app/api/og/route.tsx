import { ImageResponse } from "next/og";
import { isDiagnosisType } from "@/lib/diagnosis";
import { typeResults } from "@/lib/results";

export const runtime = "nodejs";

// Google Fonts から必要な文字だけをサブセットで取得（日本語をOG画像に描画するため）。
// 古いUAを送ることで woff2 ではなく truetype/opentype が返り、next/og(satori) で使える。
async function loadJapaneseFont(text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(
    text,
  )}`;
  const css = await (
    await fetch(url, {
      headers: {
        // 古いUA（旧Android）で truetype を返させる。satori は ttf/otf/woff に対応。
        "User-Agent":
          "Mozilla/5.0 (Linux; U; Android 2.3; en-us) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
      },
    })
  ).text();
  const match = css.match(
    /src: url\((.+?)\) format\('(opentype|truetype|woff)'\)/,
  );
  if (!match) throw new Error("font url not found in Google Fonts CSS");
  return await (await fetch(match[1])).arrayBuffer();
}

const BRAND = "#1e4f86";
const BRAND_BG = "#dceaf7";
const SLATE = "#334155";
const SLATE_SUB = "#64748b";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (!isDiagnosisType(type)) {
    return new Response("Not found", { status: 404 });
  }

  const result = typeResults[type];
  const rows = result.skillTranslations.slice(0, 3);

  const label = "公務員キャリアシフト診断";
  const heading = "あなたの経験を、民間のことばに翻訳すると";
  const footer = "koumuin-shift.com";

  const glyphs =
    label +
    heading +
    footer +
    result.name +
    rows.map((r) => r.from + r.to).join("") +
    "→";
  const font = await loadJapaneseFont(glyphs);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#ffffff",
          padding: "64px 72px",
          fontFamily: "NotoSansJP",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              backgroundColor: BRAND,
              color: "#ffffff",
              fontSize: "24px",
            }}
          >
            適
          </div>
          <div style={{ display: "flex", fontSize: "26px", color: SLATE_SUB }}>
            {label}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "28px",
            fontSize: "58px",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#0f172a",
          }}
        >
          {result.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "30px",
            fontSize: "28px",
            color: SLATE_SUB,
          }}
        >
          {heading}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "34px",
            gap: "18px",
          }}
        >
          {rows.map((r, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "30px",
                  color: SLATE,
                  width: "440px",
                }}
              >
                {r.from}
              </div>
              <div style={{ display: "flex", fontSize: "34px", color: BRAND }}>
                →
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "30px",
                  fontWeight: 700,
                  color: BRAND,
                  backgroundColor: BRAND_BG,
                  padding: "8px 20px",
                  borderRadius: "10px",
                }}
              >
                {r.to}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flex: 1 }} />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            fontSize: "24px",
            color: SLATE_SUB,
          }}
        >
          {footer}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "NotoSansJP", data: font, weight: 700, style: "normal" },
      ],
    },
  );
}
