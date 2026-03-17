import { describe, expect, it } from "vitest";

import type { Lead } from "@pmf/core";

import { buildRecommendationCards } from "./recommendation-result";

const baseLead = {
  id: "lead_test",
  name: "테스터",
  phone: "01012341234",
  productInterest: "정수기",
  source: "landing_page",
  status: "new",
  tags: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
} as const satisfies Omit<Lead, "message">;

describe("buildRecommendationCards", () => {
  it("filters out products that do not support required feature", () => {
    const cards = buildRecommendationCards({
      ...baseLead,
      message: "requiredFeature=ice; monthlyBudgetBand=50k_to_70k",
    });

    expect(cards).toHaveLength(1);
    expect(cards[0]?.slug).toBe("pure-ice-fit");
  });

  it("returns score breakdown for rule-trace visibility", () => {
    const cards = buildRecommendationCards({
      ...baseLead,
      message:
        "requiredFeature=hot; monthlyBudgetBand=30k_to_50k; movingWithinTwoYears=yes; managementPreference=self; installationSpace=narrow; primaryConcern=cancellation",
    });

    expect(cards.length).toBeGreaterThan(0);
    expect(cards[0]?.score).toBeGreaterThan(0);
    expect(cards[0]?.scoreBreakdown.length).toBeGreaterThan(2);
  });
});
