import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteName = "公務員キャリアシフト診断";
const description = "あなたの公務員としての経験や強みを活かせる民間IT・Web系のキャリア適性を診断します。";
const siteUrl = "https://public-career-app.vercel.app";
// ★ 画像URLの拡張子を .png から .jpeg に修正
const ogpImageUrl = `${siteUrl}/ogp.jpeg`; 

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: description,
  verification: {
    google: "--Sdex3gLGuoSfy2uybRT26sBtvUOvtP__C9qjlISqU",
  },
  openGraph: {
    title: siteName,
    description: description,
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: ogpImageUrl, // ★ 修正後のURLを使用
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: description,
    images: [ogpImageUrl], // ★ 修正後のURLを使用
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 antialiased`}>
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </body>
      {/* GA4 測定タグ */}
      <GoogleAnalytics gaId="G-Z2EDPM4P7Y" />
    </html>
  );
}