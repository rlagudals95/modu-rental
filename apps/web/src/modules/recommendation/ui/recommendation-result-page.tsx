"use client";

import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@pmf/ui";

import type { RecommendationCard } from "@/modules/recommendation/model/recommendation-result";
import { trackEventAction } from "@/shared/api/track-event-action";
import { getAnalyticsSessionId } from "@/shared/lib/analytics-session";
import { TrackedLink } from "@/shared/ui/tracked-link";

type RecommendationResultPageProps = {
  leadId: string;
  leadName: string;
  cards: RecommendationCard[];
};

export function RecommendationResultPage({
  leadId,
  leadName,
  cards,
}: RecommendationResultPageProps) {
  useEffect(() => {
    void trackEventAction({
      eventName: "recommendation_result_viewed",
      path: "/result",
      sessionId: getAnalyticsSessionId(),
      leadId,
      properties: {
        recommendedSlugs: cards.map((card) => card.slug),
      },
    });
  }, [cards, leadId]);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
      <section className="space-y-3">
        <Badge variant="accent">추천 결과</Badge>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
          {leadName}님 상황에 맞춘 추천 3가지
        </h1>
        <p className="text-base text-slate-600">
          월 납부액뿐 아니라 의무사용기간, 계약기간, 해지 유의사항까지 함께 확인하세요.
        </p>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.slug} className="bg-white/95">
            <CardHeader>
              <CardTitle className="text-xl">{card.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{card.reason}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl border border-border bg-muted/40 p-3 text-sm">
                <p className="font-semibold text-slate-900">{card.monthlyFee}</p>
                <p className="text-slate-600">할인 종료 후 {card.postDiscountFee}</p>
                <p className="mt-1 text-slate-700">총 예상 납부액: {card.totalEstimatedCost}</p>
              </div>

              <ul className="space-y-1 text-sm text-slate-700">
                <li>의무사용기간: {card.mandatoryMonths}개월</li>
                <li>전체 계약기간: {card.totalMonths}개월</li>
                <li>관리 방식: {card.managementType}</li>
              </ul>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4" />
                  <p>{card.caution}</p>
                </div>
              </div>

              <Button asChild className="w-full">
                <TrackedLink
                  href={`/consult?leadId=${encodeURIComponent(leadId)}&productSlug=${encodeURIComponent(
                    card.slug,
                  )}&productName=${encodeURIComponent(card.name)}`}
                  eventProperties={{ source: "result_to_consult", productSlug: card.slug }}
                >
                  이 상품으로 상담 요청
                  <ArrowRight className="ml-2 h-4 w-4" />
                </TrackedLink>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-border bg-white/80 p-5">
        <div className="flex items-start gap-2 text-sm text-slate-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
          추천 결과를 들고 상담에 들어가면 같은 설명을 반복할 필요가 줄어듭니다.
        </div>
      </section>
    </div>
  );
}
