import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "公務員からのキャリアシフト診断",
  description:
    "行政経験を「民間の即戦力スキル」に換算する5つの質問。BizOps/PM、AI活用/ノーコード、リスキリング型の適性を診断します。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e4f86",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.variable} font-sans`}>
        <div className="flex min-h-screen flex-col bg-slate-50">
          <Header />
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:py-12">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
