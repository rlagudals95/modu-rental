import type { Lead } from "@pmf/core";

type RequiredFeature = "basic" | "hot" | "ice";
type MonthlyBudgetBand = "under_30k" | "30k_to_50k" | "50k_to_70k" | "above_70k";
type ManagementPreference = "self" | "visit";
type InstallationSpace = "narrow" | "standard";

type RecommendationInput = {
  requiredFeature?: RequiredFeature;
  monthlyBudgetBand?: MonthlyBudgetBand;
  movingWithinTwoYears?: "yes" | "no";
  managementPreference?: ManagementPreference;
  installationSpace?: InstallationSpace;
  primaryConcern?: "price" | "maintenance" | "cancellation";
};

type ProductCandidate = {
  slug: string;
  name: string;
  monthlyFeeValue: number;
  monthlyFee: string;
  postDiscountFee: string;
  mandatoryMonths: number;
  totalMonths: number;
  totalEstimatedCost: string;
  managementType: "방문 관리" | "셀프 관리";
  caution: string;
  baseReason: string;
  supports: RequiredFeature[];
  suitableSpaces: InstallationSpace[];
};

export type RecommendationCard = {
  slug: string;
  name: string;
  monthlyFee: string;
  postDiscountFee: string;
  mandatoryMonths: number;
  totalMonths: number;
  totalEstimatedCost: string;
  managementType: "방문 관리" | "셀프 관리";
  caution: string;
  reason: string;
  score: number;
  scoreBreakdown: string[];
};

const productCatalog: ProductCandidate[] = [
  {
    slug: "aqua-slim-hot",
    name: "아쿠아 슬림 핫",
    monthlyFeeValue: 35900,
    monthlyFee: "월 35,900원",
    postDiscountFee: "월 42,900원",
    mandatoryMonths: 36,
    totalMonths: 60,
    totalEstimatedCost: "약 2,334,000원",
    managementType: "방문 관리",
    caution: "할인 종료 후 금액 상승 폭을 반드시 확인하세요.",
    baseReason: "예산 3~5만원 구간과 기본/온수 수요에 안정적으로 맞는 모델입니다.",
    supports: ["basic", "hot"],
    suitableSpaces: ["standard"],
  },
  {
    slug: "pure-ice-fit",
    name: "퓨어 아이스 핏",
    monthlyFeeValue: 49900,
    monthlyFee: "월 49,900원",
    postDiscountFee: "월 57,900원",
    mandatoryMonths: 48,
    totalMonths: 72,
    totalEstimatedCost: "약 3,808,800원",
    managementType: "방문 관리",
    caution: "의무사용기간이 길어 이사 가능성이 있으면 위약금 조건을 확인해야 합니다.",
    baseReason: "얼음 기능이 필요한 경우 후보군이 좁아져도 만족도가 높은 편입니다.",
    supports: ["basic", "hot", "ice"],
    suitableSpaces: ["standard"],
  },
  {
    slug: "self-mini-basic",
    name: "셀프 미니 베이직",
    monthlyFeeValue: 27900,
    monthlyFee: "월 27,900원",
    postDiscountFee: "월 32,900원",
    mandatoryMonths: 24,
    totalMonths: 48,
    totalEstimatedCost: "약 1,504,800원",
    managementType: "셀프 관리",
    caution: "셀프 필터 교체 주기 관리가 필요합니다.",
    baseReason: "1~2인 가구와 좁은 설치 공간에서 부담이 적은 입문형 모델입니다.",
    supports: ["basic"],
    suitableSpaces: ["narrow", "standard"],
  },
  {
    slug: "compact-hot-self",
    name: "컴팩트 핫 셀프",
    monthlyFeeValue: 32900,
    monthlyFee: "월 32,900원",
    postDiscountFee: "월 37,900원",
    mandatoryMonths: 30,
    totalMonths: 54,
    totalEstimatedCost: "약 1,992,600원",
    managementType: "셀프 관리",
    caution: "온수 사용량이 많으면 월 전기요금이 추가될 수 있습니다.",
    baseReason: "좁은 공간에서도 온수 기능을 쓰고 싶은 경우 균형이 좋은 모델입니다.",
    supports: ["basic", "hot"],
    suitableSpaces: ["narrow", "standard"],
  },
];

const parseLeadMessage = (message?: string): RecommendationInput => {
  if (!message) {
    return {};
  }

  const pairs = message
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [key = "", value = ""] = item.split("=");
      return [key.trim(), value.trim()] as const;
    });

  const parsed = Object.fromEntries(pairs);

  return {
    requiredFeature: parsed.requiredFeature as RequiredFeature | undefined,
    monthlyBudgetBand: parsed.monthlyBudgetBand as MonthlyBudgetBand | undefined,
    movingWithinTwoYears: parsed.movingWithinTwoYears as "yes" | "no" | undefined,
    managementPreference: parsed.managementPreference as ManagementPreference | undefined,
    installationSpace: parsed.installationSpace as InstallationSpace | undefined,
    primaryConcern: parsed.primaryConcern as "price" | "maintenance" | "cancellation" | undefined,
  };
};

const budgetTarget = (band?: MonthlyBudgetBand) => {
  switch (band) {
    case "under_30k":
      return 30000;
    case "30k_to_50k":
      return 50000;
    case "50k_to_70k":
      return 70000;
    case "above_70k":
      return 90000;
    default:
      return 50000;
  }
};

const scoreCandidate = (candidate: ProductCandidate, input: RecommendationInput) => {
  let score = 0;
  const scoreBreakdown: string[] = [];

  const targetBudget = budgetTarget(input.monthlyBudgetBand);
  const budgetGap = Math.abs(candidate.monthlyFeeValue - targetBudget);
  const budgetScore = Math.max(0, 30 - Math.round(budgetGap / 2000));
  score += budgetScore;
  scoreBreakdown.push(`예산 적합 +${budgetScore}`);

  if (input.managementPreference) {
    const managementMatched =
      (input.managementPreference === "visit" && candidate.managementType === "방문 관리") ||
      (input.managementPreference === "self" && candidate.managementType === "셀프 관리");

    if (managementMatched) {
      score += 12;
      scoreBreakdown.push("관리 선호 일치 +12");
    }
  }

  if (input.installationSpace && candidate.suitableSpaces.includes(input.installationSpace)) {
    score += 8;
    scoreBreakdown.push("설치 공간 적합 +8");
  }

  if (input.movingWithinTwoYears === "yes") {
    const movingScore = Math.max(0, 22 - Math.round(candidate.mandatoryMonths / 2));
    score += movingScore;
    scoreBreakdown.push(`이사 리스크 반영 +${movingScore}`);
  }

  if (input.primaryConcern === "price") {
    const priceScore = Math.max(0, 20 - Math.round(candidate.monthlyFeeValue / 5000));
    score += priceScore;
    scoreBreakdown.push(`가격 민감도 반영 +${priceScore}`);
  }

  if (input.primaryConcern === "cancellation") {
    const cancellationScore = Math.max(0, 20 - Math.round(candidate.mandatoryMonths / 3));
    score += cancellationScore;
    scoreBreakdown.push(`해지 리스크 반영 +${cancellationScore}`);
  }

  return { score, scoreBreakdown };
};

export const buildRecommendationCards = (lead: Lead): RecommendationCard[] => {
  const input = parseLeadMessage(lead.message);

  const filteredByFeature = input.requiredFeature
    ? productCatalog.filter((candidate) => candidate.supports.includes(input.requiredFeature!))
    : productCatalog;

  const scored = filteredByFeature.map((candidate) => {
    const { score, scoreBreakdown } = scoreCandidate(candidate, input);

    return {
      ...candidate,
      score,
      scoreBreakdown,
    };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((candidate) => ({
      slug: candidate.slug,
      name: candidate.name,
      monthlyFee: candidate.monthlyFee,
      postDiscountFee: candidate.postDiscountFee,
      mandatoryMonths: candidate.mandatoryMonths,
      totalMonths: candidate.totalMonths,
      totalEstimatedCost: candidate.totalEstimatedCost,
      managementType: candidate.managementType,
      caution: candidate.caution,
      reason: candidate.baseReason,
      score: candidate.score,
      scoreBreakdown: candidate.scoreBreakdown,
    }));
};
