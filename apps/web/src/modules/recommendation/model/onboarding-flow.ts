export const recommendationDraftStorageKey = "modurent_recommendation_draft_v1";

export const recommendationStepOrder = [
  "householdSize",
  "housingType",
  "movingWithinTwoYears",
  "requiredFeature",
  "monthlyBudgetBand",
  "managementPreference",
  "installationSpace",
  "primaryConcern",
  "contact",
] as const;

export type RecommendationStepId = (typeof recommendationStepOrder)[number];

export type RecommendationOnboardingAnswers = {
  householdSize?: "one" | "two" | "three_plus";
  housingType?: "owner" | "jeonse_monthly";
  movingWithinTwoYears?: "yes" | "no";
  requiredFeature?: "basic" | "hot" | "ice";
  monthlyBudgetBand?: "under_30k" | "30k_to_50k" | "50k_to_70k" | "above_70k";
  managementPreference?: "self" | "visit";
  installationSpace?: "narrow" | "standard";
  primaryConcern?: "price" | "maintenance" | "cancellation";
  name?: string;
  phone?: string;
  email?: string;
  consent?: boolean;
};

export type RecommendationDraft = {
  version: 1;
  startedAt: string;
  updatedAt: string;
  answers: RecommendationOnboardingAnswers;
};

const nowIso = () => new Date().toISOString();

export const createEmptyRecommendationDraft = (): RecommendationDraft => {
  const now = nowIso();

  return {
    version: 1,
    startedAt: now,
    updatedAt: now,
    answers: {},
  };
};

export const getRecommendationNextStepId = (
  currentStepId: RecommendationStepId,
): RecommendationStepId | null => {
  const currentIndex = recommendationStepOrder.indexOf(currentStepId);

  if (currentIndex < 0 || currentIndex >= recommendationStepOrder.length - 1) {
    return null;
  }

  return recommendationStepOrder[currentIndex + 1];
};

export const getRecommendationProgress = (currentStepId: RecommendationStepId): number => {
  const currentIndex = recommendationStepOrder.indexOf(currentStepId);
  if (currentIndex < 0) {
    return 0;
  }

  return Math.round(((currentIndex + 1) / recommendationStepOrder.length) * 100);
};

export const updateRecommendationDraft = (
  draft: RecommendationDraft,
  patch: Partial<RecommendationOnboardingAnswers>,
): RecommendationDraft => ({
  ...draft,
  updatedAt: nowIso(),
  answers: {
    ...draft.answers,
    ...patch,
  },
});

const hasText = (value?: string) => Boolean(value && value.trim().length > 0);

export const isRecommendationReadyToSubmit = (answers: RecommendationOnboardingAnswers): boolean =>
  Boolean(
    answers.householdSize &&
      answers.housingType &&
      answers.movingWithinTwoYears &&
      answers.requiredFeature &&
      answers.monthlyBudgetBand &&
      answers.managementPreference &&
      answers.installationSpace &&
      answers.primaryConcern &&
      hasText(answers.name) &&
      hasText(answers.phone) &&
      answers.consent,
  );

export const serializeRecommendationDraft = (draft: RecommendationDraft): string =>
  JSON.stringify(draft);

export const restoreRecommendationDraft = (raw: string | null): RecommendationDraft | null => {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<RecommendationDraft>;
    if (parsed.version !== 1 || typeof parsed !== "object") {
      return null;
    }

    if (
      typeof parsed.startedAt !== "string" ||
      typeof parsed.updatedAt !== "string" ||
      typeof parsed.answers !== "object" ||
      parsed.answers === null
    ) {
      return null;
    }

    return {
      version: 1,
      startedAt: parsed.startedAt,
      updatedAt: parsed.updatedAt,
      answers: parsed.answers,
    };
  } catch {
    return null;
  }
};
