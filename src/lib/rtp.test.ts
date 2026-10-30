import { describe, expect, it } from "vitest";

import { FALLBACK_FIGURES, figuresFromPayload } from "@/lib/rtp";

const PAYLOAD = {
  model: {
    features: [
      "rating_diff",
      "home_win_rate_5",
      "home_weighted_margin",
      "home_avg_opponent_rating",
      "h2h_home_win_rate",
      "h2h_home_avg_margin",
      "home_rest_days",
      "home_form_momentum",
      "home_hemisphere",
      "rating_diff_squared",
    ],
  },
  backtest: {
    n_matches: 9291,
    date_range: "1871-03-27 to 2026-10-24",
    accuracy: 0.7350123,
    margin_rmse: 21.4812,
    recent_weighted: { accuracy: 0.785, half_life_days: 90, effective_matches: 133 },
  },
  holdout: {
    cutoff: "2018-11-17",
    n_holdout: 1394,
    blended: { win_accuracy: 0.7683, margin_rmse: 21.2191 },
  },
};

const figure = (label: string) =>
  figuresFromPayload(PAYLOAD)?.find((candidate) => candidate.label === label);

describe("figuresFromPayload", () => {
  it("labels the forecast and the rating engine apart, each with its own scope", () => {
    expect(figure("Forecast: winner called")).toEqual({
      label: "Forecast: winner called",
      value: "76.8%",
      note: "1,394 matches since 2018, held out of training",
    });
    expect(figure("Rating engine: winner called")?.value).toBe("73.5%");
    expect(figure("Rating engine: winner called")?.note).toContain("9,291 matches, 1871 to 2026");
  });

  it("groups the features it is given, in the order they first appear", () => {
    expect(figure("Features in the blend")).toEqual({
      label: "Features in the blend",
      value: "10",
      note: "ratings, form, opponent strength, head-to-head, rest days, hemisphere",
    });
  });

  it("shows a feature no group recognises instead of dropping it", () => {
    const figures = figuresFromPayload({
      ...PAYLOAD,
      model: { features: ["rating_diff", "travel_km"] },
    });

    expect(figures?.at(-1)?.note).toBe("ratings, other");
  });

  it.each([
    ["no holdout", { holdout: undefined }],
    ["no feature list", { model: {} }],
    ["an empty feature list", { model: { features: [] } }],
    ["a date range it cannot read", { backtest: { ...PAYLOAD.backtest, date_range: "recently" } }],
    ["a holdout with no cutoff", { holdout: { ...PAYLOAD.holdout, cutoff: undefined } }],
    ["a value that isn't a number", { backtest: { ...PAYLOAD.backtest, accuracy: "0.73" } }],
  ])("discards the whole set given %s", (_, change) => {
    expect(figuresFromPayload({ ...PAYLOAD, ...change } as never)).toBeUndefined();
  });
});

describe("FALLBACK_FIGURES", () => {
  it("carries the same panel as a live read", () => {
    expect(FALLBACK_FIGURES.map((candidate) => candidate.label)).toEqual(
      figuresFromPayload(PAYLOAD)?.map((candidate) => candidate.label),
    );
  });

  it("dates each note, so a stale panel says so", () => {
    for (const { note } of FALLBACK_FIGURES) {
      expect(note).toMatch(/, as of \d{1,2} \w{3} \d{4}$/);
    }
  });
});
