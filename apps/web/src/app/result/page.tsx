import { listLeads } from "@pmf/db";

import { buildRecommendationCards } from "@/modules/recommendation/model/recommendation-result";
import { RecommendationResultPage } from "@/modules/recommendation/ui/recommendation-result-page";

type ResultPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const resolved = (await searchParams) ?? {};
  const leadIdParam = resolved.leadId;
  const leadId = Array.isArray(leadIdParam) ? leadIdParam[0] : leadIdParam;

  if (!leadId) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-slate-950">추천 결과를 찾을 수 없어요.</h1>
        <p className="mt-2 text-slate-600">랜딩에서 질문을 완료한 뒤 다시 확인해 주세요.</p>
      </div>
    );
  }

  const leads = await listLeads();
  const lead = leads.find((item) => item.id === leadId);

  if (!lead) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-slate-950">해당 리드를 찾지 못했습니다.</h1>
        <p className="mt-2 text-slate-600">다시 온보딩을 진행해 주세요.</p>
      </div>
    );
  }

  const cards = buildRecommendationCards(lead);

  return <RecommendationResultPage leadId={lead.id} leadName={lead.name} cards={cards} />;
}
