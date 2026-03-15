import { ArrowRight, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@pmf/ui";

import { RecommendationOnboardingShell } from "@/modules/recommendation/ui/recommendation-onboarding-shell";
import { TrackedLink } from "@/shared/ui/tracked-link";

const pains = [
  "월 렌탈료는 비슷해 보여도 의무사용기간/총 계약기간이 크게 다릅니다.",
  "할인 종료 시점 이후 금액과 해지 조건이 비교 과정에서 자주 빠집니다.",
  "상담 전에 후보를 줄이지 못하면 결국 설명을 반복하게 됩니다.",
] as const;

const values = [
  {
    title: "내 상황 기반 추천",
    description: "가구 수, 이사 가능성, 예산, 관리 선호를 먼저 반영합니다.",
  },
  {
    title: "계약 리스크 우선 설명",
    description: "가격만이 아니라 해지/의무사용기간 포인트를 함께 보여줍니다.",
  },
  {
    title: "상담 전 shortlist",
    description: "상담에 들어가기 전에 후보를 줄여 결정 피로를 낮춥니다.",
  },
] as const;

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-20 pt-10">
      <section className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-6">
          <Badge variant="accent">모두의렌탈 · MVP</Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              렌탈 계약, 대신 읽어드리고
              <span className="block text-primary">딱 3개만 고를 수 있게</span>
              도와드립니다.
            </h1>
            <p className="text-lg leading-8 text-slate-600">
              모두의렌탈은 단순 가격 비교가 아니라, 내 상황에서 위험한 계약을 먼저 걸러내는
              추천 상담 흐름을 만듭니다.
            </p>
          </div>

          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle className="text-lg">왜 이 흐름이 필요한가</CardTitle>
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
                바로 상담 요청
                <ArrowRight className="ml-2 h-4 w-4" />
              </TrackedLink>
            </Button>
            <Button asChild variant="outline">
              <TrackedLink
                href="/admin"
                eventProperties={{
                  source: "landing_admin_preview",
                }}
              >
                운영 화면 보기
              </TrackedLink>
            </Button>
          </div>
        </div>

        <RecommendationOnboardingShell />
      </section>

      <section className="mt-16 rounded-3xl border border-border bg-white/80 p-6">
        <h2 className="text-xl font-semibold text-slate-950">현재 구현 상태</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-muted/40 p-4">
            <p className="text-sm font-semibold text-slate-900">이번 반영</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                서비스 중심 랜딩 카피/구조로 전환
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                추천 온보딩 질문 플로우 + 로컬 draft 복원
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                최종 연락처 접수와 상담 연결 시작점 마련
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-muted/40 p-4">
            <p className="text-sm font-semibold text-slate-900">다음 단계</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
                /result 라우트 연결 및 추천 3개 카드 렌더링
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
                리드 입력값 기반 추천 룰 엔진 연동
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 text-primary" />
                상담 handoff(leadId/product) prefill 고도화
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
