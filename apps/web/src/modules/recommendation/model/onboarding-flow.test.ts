import { describe, expect, it } from "vitest";

import {
  createEmptyRecommendationDraft,
  getRecommendationNextStepId,
  getRecommendationProgress,
  isRecommendationReadyToSubmit,
  recommendationStepOrder,
  restoreRecommendationDraft,
  serializeRecommendationDraft,
  updateRecommendationDraft,
} from "./onboarding-flow";

describe("recommendation onboarding flow model", () => {
  it("keeps the fixed step order and progression contract", () => {
    expect(recommendationStepOrder).toEqual([
      "householdSize",
      "housingType",
      "movingWithinTwoYears",
      "requiredFeature",
      "monthlyBudgetBand",
      "managementPreference",
      "installationSpace",
      "primaryConcern",
      "contact",
    ]);

    expect(getRecommendationNextStepId("householdSize")).toBe("housingType");
    expect(getRecommendationNextStepId("primaryConcern")).toBe("contact");
    expect(getRecommendationNextStepId("contact")).toBeNull();

    expect(getRecommendationProgress("householdSize")).toBe(11);
    expect(getRecommendationProgress("contact")).toBe(100);
  });

  it("restores a valid draft and rejects malformed payload", () => {
    const initial = createEmptyRecommendationDraft();
    const saved = updateRecommendationDraft(initial, {
      householdSize: "one",
      housingType: "jeonse_monthly",
      movingWithinTwoYears: "yes",
    });

    const restored = restoreRecommendationDraft(serializeRecommendationDraft(saved));
    expect(restored).toEqual(saved);

    expect(restoreRecommendationDraft("not-json")).toBeNull();
    expect(
      restoreRecommendationDraft(
        JSON.stringify({
          version: 2,
          startedAt: saved.startedAt,
          updatedAt: saved.updatedAt,
          answers: {},
        }),
      ),
    ).toBeNull();
  });

  it("returns submit readiness only when all required answers are present", () => {
    const ready = {
      householdSize: "two",
      housingType: "owner",
      movingWithinTwoYears: "no",
      requiredFeature: "hot",
      monthlyBudgetBand: "30k_to_50k",
      managementPreference: "visit",
      installationSpace: "standard",
      primaryConcern: "maintenance",
      name: "김형민",
      phone: "010-1111-2222",
      email: "hm@example.com",
      consent: true,
    } as const;

    expect(isRecommendationReadyToSubmit(ready)).toBe(true);
    expect(
      isRecommendationReadyToSubmit({
        ...ready,
        phone: "",
      }),
    ).toBe(false);
    expect(
      isRecommendationReadyToSubmit({
        ...ready,
        consent: false,
      }),
    ).toBe(false);
  });
});
