import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ResultView } from "@/components/ResultView";
import { isDiagnosisType } from "@/lib/diagnosis";
import { typeResults } from "@/lib/results";

type ResultPageProps = {
  searchParams: Promise<{ type?: string }>;
};

// 結果タイプごとに OGP / Twitter カードを出し分け（シェアされた診断結果を "翻訳カード" として見せる）
export async function generateMetadata({
  searchParams,
}: ResultPageProps): Promise<Metadata> {
  const params = await searchParams;
  const type = params.type ?? null;
  if (!isDiagnosisType(type)) return {};

  const result = typeResults[type];
  const title = `私の公務員キャリア翻訳は「${result.name}」｜公務員キャリアシフト診断`;
  const description = result.tagline;
  const ogImage = `/api/og?type=${type}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  const type = params.type ?? null;

  if (!isDiagnosisType(type)) {
    redirect("/diagnosis");
  }

  return <ResultView result={typeResults[type]} />;
}
