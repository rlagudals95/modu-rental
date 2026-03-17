import { ArrowRight, ShieldAlert, Sparkles } from "lucide-react";

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@pmf/ui";

import { RecommendationOnboardingShell } from "@/modules/recommendation/ui/recommendation-onboarding-shell";
import { TrackedLink } from "@/shared/ui/tracked-link";

const pains = [
  "월 렌탈료만 보면 비슷하지만 의무사용기간과 총계약기간은 크게 다릅니다.",
  "할인 종료 후 금액, 중도해지 조건은 비교 과정에서 자주 빠집니다.",
  "상담 전에 후보를 못 줄이면 같은 설명을 여러 번 반복하게 됩니다.",
] as const;

const values = [
  {
    title: "상황 기반 3개 추천",
    description: "가구 수, 이사 가능성, 예산, 필수 기능을 반영해 후보를 줄입니다.",
  },
  {
    title: "계약 리스크 요약",
    description: "월요금뿐 아니라 해지/의무사용기간 포인트를 함께 보여드립니다.",
  },
  {
    title: "상담 바로 연결",
    description: "추천 결과를 들고 상담에 넘어가 중복 설명 시간을 줄입니다.",
  },
] as const;

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
      <section className="mb-6 flex items-center justify-between rounded-2xl border border-border bg-white/90 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">모두의렌탈</p>
          <p className="text-xs text-slate-600">계약 리스크까지 보는 정수기 추천 상담</p>
        </div>
        <Button asChild size="sm" variant="outline">
          <TrackedLink href="/consult">상담 바로가기</TrackedLink>
        </Button>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-6">
          <Badge variant="accent">정수기 추천 MVP</Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              렌탈 계약, 대신 읽어드리고
              <span className="block text-primary">당신에게 맞는 3개만 추천합니다</span>
            </h1>
            <p className="text-lg leading-8 text-slate-600">
              모두의렌탈은 가격표만 보여주지 않습니다. 내 상황에서 주의해야 할 계약 조건까지
              먼저 정리해 결정 피로를 줄여줍니다.
            </p>
          </div>

          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle className="text-lg">왜 필요한가</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pains.map((pain) => (
                <div key={pain} className="flex items-start gap-2">
                  <ShieldAlert className="mt-0.5 h-4 w-4 text-primary" />
                  <p className="text-sm leading-6 text-slate-700">{pain}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-3 sm:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-border bg-white/80 p-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="mt-2 text-sm font-semibold text-slate-900">{value.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <TrackedLink
                href="/consult"
                eventProperties={{
                  source: "landing_consult_direct",
                }}
              >
                추천 결과로 상담 요청
                <ArrowRight className="ml-2 h-4 w-4" />
              </TrackedLink>
            </Button>
          </div>
        </div>

        <RecommendationOnboardingShell />
      </section>
    </div>
  );
}
