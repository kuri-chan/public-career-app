import { redirect } from "next/navigation";
import { ResultView } from "@/components/ResultView";
import { isDiagnosisType } from "@/lib/diagnosis";
import { typeResults } from "@/lib/results";

type ResultPageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  const type = params.type ?? null;

  if (!isDiagnosisType(type)) {
    redirect("/diagnosis");
  }

  return <ResultView result={typeResults[type]} />;
}
