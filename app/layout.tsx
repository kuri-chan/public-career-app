import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "公務員キャリアシフト診断",
  description: "あなたの公務員としての経験や強みを活かせる民間IT・Web系のキャリア適性を診断します。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
      </body>
      {/* GA4 測定タグ */}
      <GoogleAnalytics gaId="G-Z2EDPM4P7Y" />
    </html>
  );
}