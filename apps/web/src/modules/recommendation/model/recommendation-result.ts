import type { Lead } from "@pmf/core";

export type RecommendationCard = {
  slug: string;
  name: string;
  monthlyFee: string;
  postDiscountFee: string;
  mandatoryMonths: number;
  totalMonths: number;
  managementType: "방문 관리" | "셀프 관리";
  caution: string;
  reason: string;
};

const baseCards: RecommendationCard[] = [
  {
    slug: "aqua-slim-hot",
    name: "아쿠아 슬림 핫",
    monthlyFee: "월 35,900원",
    postDiscountFee: "월 42,900원",
    mandatoryMonths: 36,
    totalMonths: 60,
    managementType: "방문 관리",
    caution: "할인 종료 후 금액 상승 폭을 반드시 확인하세요.",
    reason: "예산 3~5만원 구간과 기본/온수 수요에 안정적으로 맞는 모델입니다.",
  },
  {
    slug: "pure-ice-fit",
    name: "퓨어 아이스 핏",
    monthlyFee: "월 49,900원",
    postDiscountFee: "월 57,900원",
    mandatoryMonths: 48,
    totalMonths: 72,
    managementType: "방문 관리",
    caution: "의무사용기간이 길어 이사 가능성이 있으면 위약금 조건을 확인해야 합니다.",
    reason: "얼음 기능이 필요한 경우 후보군이 좁아져도 만족도가 높은 편입니다.",
  },
  {
    slug: "self-mini-basic",
    name: "셀프 미니 베이직",
    monthlyFee: "월 27,900원",
    postDiscountFee: "월 32,900원",
    mandatoryMonths: 24,
    totalMonths: 48,
    managementType: "셀프 관리",
    caution: "셀프 필터 교체 주기 관리가 필요합니다.",
    reason: "1~2인 가구와 좁은 설치 공간에서 부담이 적은 입문형 모델입니다.",
  },
];

const parseLeadMessage = (message?: string): Record<string, string> => {
  if (!message) {
    return {};
  }

  const pairs: Array<[string, string]> = message
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [key = "", value = ""] = item.split("=");
      return [key.trim(), value.trim()] as [string, string];
    })
    .filter(([key]) => key.length > 0);

  return Object.fromEntries(pairs);
};

export const buildRecommendationCards = (lead: Lead): RecommendationCard[] => {
  const parsed = parseLeadMessage(lead.message);
  const concern = parsed.primaryConcern;
  const feature = parsed.requiredFeature;
  const moving = parsed.movingWithinTwoYears;

  const cards = [...baseCards];

  if (feature === "ice") {
    cards.sort((a, b) => (a.slug === "pure-ice-fit" ? -1 : b.slug === "pure-ice-fit" ? 1 : 0));
  } else if (feature === "basic") {
    cards.sort((a, b) =>
      a.slug === "self-mini-basic" ? -1 : b.slug === "self-mini-basic" ? 1 : 0,
    );
  }

  if (concern === "cancellation" || moving === "yes") {
    cards.sort((a, b) => a.mandatoryMonths - b.mandatoryMonths);
  }

  if (concern === "price") {
    cards.sort((a, b) =>
      Number(a.monthlyFee.replace(/[^0-9]/g, "")) - Number(b.monthlyFee.replace(/[^0-9]/g, "")),
    );
  }

  return cards.slice(0, 3);
};
