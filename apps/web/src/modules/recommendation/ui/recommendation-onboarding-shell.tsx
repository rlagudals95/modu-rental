"use client";

import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from "@pmf/ui";
import { startTransition, useEffect, useMemo, useRef, useState } from "react";

import { submitLeadAction } from "@/modules/lead/actions/submit-lead-action";
import {
  createEmptyRecommendationDraft,
  getRecommendationNextStepId,
  getRecommendationProgress,
  recommendationDraftStorageKey,
  recommendationStepOrder,
  restoreRecommendationDraft,
  serializeRecommendationDraft,
  updateRecommendationDraft,
  type RecommendationOnboardingAnswers,
  type RecommendationStepId,
} from "@/modules/recommendation/model/onboarding-flow";
import { trackEventAction } from "@/shared/api/track-event-action";
import { getAnalyticsSessionId } from "@/shared/lib/analytics-session";

const stepQuestionMap: Record<Exclude<RecommendationStepId, "contact">, string> = {
  householdSize: "현재 함께 거주하는 인원은 몇 명인가요?",
  housingType: "거주 형태가 어떻게 되나요?",
  movingWithinTwoYears: "2년 내 이사 가능성이 있나요?",
  requiredFeature: "정수기에서 꼭 필요한 기능은 무엇인가요?",
  monthlyBudgetBand: "월 렌탈 예산은 어느 정도인가요?",
  managementPreference: "관리 방식은 어떤 쪽이 편한가요?",
  installationSpace: "설치 공간은 어떤 편인가요?",
  primaryConcern: "렌탈 계약에서 가장 걱정되는 건 무엇인가요?",
};

const optionMap = {
  householdSize: [
    { label: "1인", value: "one" },
    { label: "2인", value: "two" },
    { label: "3인 이상", value: "three_plus" },
  ],
  housingType: [
    { label: "자가", value: "owner" },
    { label: "전·월세", value: "jeonse_monthly" },
  ],
  movingWithinTwoYears: [
    { label: "네", value: "yes" },
    { label: "아니요", value: "no" },
  ],
  requiredFeature: [
    { label: "기본 정수", value: "basic" },
    { label: "온수", value: "hot" },
    { label: "얼음", value: "ice" },
  ],
  monthlyBudgetBand: [
    { label: "3만원 미만", value: "under_30k" },
    { label: "3~5만원", value: "30k_to_50k" },
    { label: "5~7만원", value: "50k_to_70k" },
    { label: "7만원 이상", value: "above_70k" },
  ],
  managementPreference: [
    { label: "셀프 관리", value: "self" },
    { label: "방문 관리", value: "visit" },
  ],
  installationSpace: [
    { label: "좁은 편", value: "narrow" },
    { label: "보통", value: "standard" },
  ],
  primaryConcern: [
    { label: "월 비용", value: "price" },
    { label: "관리 번거로움", value: "maintenance" },
    { label: "해지/위약금", value: "cancellation" },
  ],
} as const;

const messageByStep = (answers: RecommendationOnboardingAnswers): string =>
  [
    `householdSize=${answers.householdSize}`,
    `housingType=${answers.housingType}`,
    `movingWithinTwoYears=${answers.movingWithinTwoYears}`,
    `requiredFeature=${answers.requiredFeature}`,
    `monthlyBudgetBand=${answers.monthlyBudgetBand}`,
    `managementPreference=${answers.managementPreference}`,
    `installationSpace=${answers.installationSpace}`,
    `primaryConcern=${answers.primaryConcern}`,
  ].join("; ");

export function RecommendationOnboardingShell() {
  const [draft, setDraft] = useState(createEmptyRecommendationDraft());
  const [step, setStep] = useState<RecommendationStepId>("householdSize");
  const [isPending, setIsPending] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const hasTrackedOnboardingStart = useRef(false);

  useEffect(() => {
    const restored = restoreRecommendationDraft(localStorage.getItem(recommendationDraftStorageKey));
    if (restored) {
      setDraft(restored);
      const firstMissing = recommendationStepOrder.find((item) => {
        if (item === "contact") {
          return false;
        }

        return !restored.answers[item];
      });
      if (firstMissing) {
        setStep(firstMissing);
      } else {
        setStep("contact");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(recommendationDraftStorageKey, serializeRecommendationDraft(draft));
  }, [draft]);

  const progress = getRecommendationProgress(step);
  const currentOptions = step === "contact" ? null : optionMap[step];

  const isContactReady = useMemo(() => {
    const { name, phone, consent } = draft.answers;
    return Boolean(name?.trim() && phone?.trim() && consent);
  }, [draft.answers]);

  const trackOnboardingStartOnce = () => {
    if (hasTrackedOnboardingStart.current) {
      return;
    }

    hasTrackedOnboardingStart.current = true;
    void trackEventAction({
      eventName: "onboarding_started",
      path: "/",
      sessionId: getAnalyticsSessionId(),
      properties: {
        flow: "recommendation_onboarding",
      },
    });
  };

  const handleSelect = (value: string) => {
    if (step === "contact") {
      return;
    }

    trackOnboardingStartOnce();

    const nextDraft = updateRecommendationDraft(draft, {
      [step]: value,
    } as Partial<RecommendationOnboardingAnswers>);
    setDraft(nextDraft);

    const nextStep = getRecommendationNextStepId(step);
    if (nextStep) {
      setStep(nextStep);
    }
  };

  const onSubmit = () => {
    if (!isContactReady) {
      setServerMessage("연락처와 동의를 확인해 주세요.");
      return;
    }

    setServerMessage(null);
    setIsPending(true);

    startTransition(async () => {
      try {
        const result = await submitLeadAction(
          {
            name: draft.answers.name ?? "",
            phone: draft.answers.phone ?? "",
            email: draft.answers.email ?? "",
            productInterest: "정수기 AI 추천 상담",
            message: messageByStep(draft.answers),
            source: "landing_page",
            consent: Boolean(draft.answers.consent),
          },
          {
            sessionId: getAnalyticsSessionId(),
          },
        );

        if (!result.ok) {
          setServerMessage(result.message);
          return;
        }

        await trackEventAction({
          eventName: "onboarding_completed",
          path: "/",
          sessionId: getAnalyticsSessionId(),
          properties: {
            flow: "recommendation_onboarding",
            requiredFeature: draft.answers.requiredFeature,
            monthlyBudgetBand: draft.answers.monthlyBudgetBand,
            movingWithinTwoYears: draft.answers.movingWithinTwoYears,
            primaryConcern: draft.answers.primaryConcern,
          },
        });

        localStorage.removeItem(recommendationDraftStorageKey);
        if (result.nextPath) {
          window.location.href = result.nextPath;
          return;
        }

        setServerMessage("접수 완료! 지금 상담 요청으로 이어가면 추천 정확도를 더 높일 수 있어요.");
      } catch {
        setServerMessage("제출 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      } finally {
        setIsPending(false);
      }
    });
  };

  return (
    <Card className="border-primary/20 bg-white">
      <CardHeader>
        <p className="text-sm font-semibold text-primary">정수기 추천 온보딩</p>
        <CardTitle className="text-2xl">내 상황 입력하고 추천 상담 받기</CardTitle>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {step !== "contact" ? (
          <>
            <p className="text-sm text-slate-700">{stepQuestionMap[step]}</p>
            <div className="grid gap-2">
              {currentOptions?.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className="rounded-xl border border-border px-4 py-3 text-left text-sm transition hover:border-primary hover:bg-primary/5"
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">약 1분이면 끝나요.</p>
          </>
        ) : (
          <>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="recommend-name">이름</Label>
                <Input
                  id="recommend-name"
                  value={draft.answers.name ?? ""}
                  onChange={(event) =>
                    setDraft(updateRecommendationDraft(draft, { name: event.currentTarget.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="recommend-phone">전화번호</Label>
                <Input
                  id="recommend-phone"
                  value={draft.answers.phone ?? ""}
                  onChange={(event) =>
                    setDraft(updateRecommendationDraft(draft, { phone: event.currentTarget.value }))
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="recommend-email">이메일 (선택)</Label>
              <Input
                id="recommend-email"
                type="email"
                value={draft.answers.email ?? ""}
                onChange={(event) =>
                  setDraft(updateRecommendationDraft(draft, { email: event.currentTarget.value }))
                }
              />
            </div>

            <label className="flex items-start gap-2 rounded-xl border border-border bg-muted/50 p-3 text-sm">
              <input
                type="checkbox"
                className="mt-1"
                checked={Boolean(draft.answers.consent)}
                onChange={(event) =>
                  setDraft(updateRecommendationDraft(draft, { consent: event.currentTarget.checked }))
                }
              />
              개인정보 수집 및 상담 연락에 동의합니다.
            </label>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setStep("primaryConcern")}>
                이전
              </Button>
              <Button type="button" className="flex-1" disabled={isPending} onClick={onSubmit}>
                {isPending ? "접수 중..." : "추천 상담 접수"}
              </Button>
            </div>
          </>
        )}

        {serverMessage ? <p className="text-sm text-muted-foreground">{serverMessage}</p> : null}
      </CardContent>
    </Card>
  );
}
