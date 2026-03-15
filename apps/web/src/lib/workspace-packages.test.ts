import { defineAbTestDefinitions } from "@pmf/ab-test";
import { readAbTestAssignmentsFromCookieHeader } from "@pmf/ab-test/client";
import { getAbTestAssignments } from "@pmf/ab-test/server";
import { createBehaviorLogger } from "@pmf/user-behavior-log";
import {
  BehaviorLoggerProvider,
  LogClick,
  LogImpression,
  LogPageView,
} from "@pmf/user-behavior-log/react";
import { describe, expect, it, vi } from "vitest";

describe("workspace package imports", () => {
  it("resolves shared package APIs from the web app", async () => {
    const definitions = defineAbTestDefinitions({
      independent: [
        {
          featureKey: "exp_home_copy",
          variants: [{ value: "control", weight: 100 }],
        },
      ],
    });

    expect(
      readAbTestAssignmentsFromCookieHeader(
        "exp_home_copy=control; unrelated=value",
        definitions,
      ),
    ).toEqual({
      exp_home_copy: "control",
    });

    expect(
      getAbTestAssignments(
        {
          getAll: () => [{ name: "exp_home_copy", value: "control" }],
        },
        definitions,
      ),
    ).toEqual({
      exp_home_copy: "control",
    });

    const send = vi.fn();
    const logger = createBehaviorLogger({
      send,
      getContext: () => ({
        path: "/",
      }),
    });

    await logger.pageView({
      metadata: {
        surface: "landing",
      },
    });

    await logger.click({
      eventName: "cta_clicked",
      element: {
        id: "hero-cta",
      },
    });

    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        eventName: "page_view",
        path: "/",
        metadata: {
          surface: "landing",
        },
      }),
    );
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        eventName: "cta_clicked",
        path: "/",
        element: {
          id: "hero-cta",
        },
      }),
    );

    expect(BehaviorLoggerProvider).toBeTypeOf("function");
    expect(LogClick).toBeTypeOf("function");
    expect(LogImpression).toBeTypeOf("function");
    expect(LogPageView).toBeTypeOf("function");
  });
});
