import type { CaseStudyFigure } from "@/content/projects";
import { projectBySlug } from "@/content/projects";

/**
 * RTP's published measurements, read from RTP.
 *
 * The case study quotes figures the pipeline recomputes whenever the model is
 * retrained, so they are read the same way the home page reads the blog's
 * feed. A copied number and a current one look identical, and nothing on the
 * hub could notice the difference.
 *
 * RTP scores two things and the panel keeps them apart. The walk-forward
 * backtest scores the rating engine alone, over the whole record. The forward
 * holdout scores the blended forecast, which is what the site publishes.
 *
 * Notes state what a figure covers, because a judgement about a number goes
 * stale the way the number would. The feature list is read for the same
 * reason: a hand-kept one can outlive the features it names.
 */

const RTP = projectBySlug("rtp")?.links.live;

/** The checked values the panel renders. */
interface Measurements {
  forecast: { matches: number; since: string; accuracy: number; marginRmse: number };
  engine: { matches: number; period: string; accuracy: number; marginRmse: number };
  recent: { accuracy: number; halfLifeDays: number; effectiveMatches: number };
  features: { count: number; groups: string[] };
}

interface ModelPayload {
  model?: { features?: string[] };
  backtest?: {
    n_matches?: number;
    date_range?: string;
    accuracy?: number;
    margin_rmse?: number;
    recent_weighted?: {
      accuracy?: number;
      half_life_days?: number;
      effective_matches?: number;
    };
  };
  holdout?: {
    cutoff?: string;
    n_holdout?: number;
    blended?: { win_accuracy?: number; margin_rmse?: number };
  };
}

/**
 * Feature names to what a reader would call them. The first match wins, so
 * opponent strength and head-to-head are taken before the broader patterns
 * that would otherwise claim `avg_opponent_rating` and `h2h_home_win_rate`.
 */
const FEATURE_GROUPS: [RegExp, string][] = [
  [/opponent/, "opponent strength"],
  [/h2h/, "head-to-head"],
  [/rating/, "ratings"],
  [/rest_days/, "rest days"],
  [/hemisphere/, "hemisphere"],
  [/win_rate|scored|conceded|margin|momentum/, "form"],
];

/** A feature no pattern recognises shows as "other" rather than disappearing. */
function featureGroups(names: string[]): string[] {
  const groups = names.map(
    (name) => FEATURE_GROUPS.find(([pattern]) => pattern.test(name))?.[1] ?? "other",
  );
  return [...new Set(groups)];
}

const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

/** `1871-03-27 to 2026-08-29` reads as `1871 to 2026` beside a figure. */
function years(range: string | undefined): string | undefined {
  const match = /^(\d{4})-\d{2}-\d{2}\s+to\s+(\d{4})-\d{2}-\d{2}$/.exec(range ?? "");
  return match ? `${match[1]} to ${match[2]}` : undefined;
}

/**
 * Every field is checked before any of them is rendered.
 *
 * A partial payload has to produce the previous figures rather than a panel
 * reading `NaN%`, and a figure whose scope could not be read is exactly the
 * thing `CaseStudyFigure.note` exists to prevent — so a missing date range or
 * cutoff discards the whole set rather than publishing an unscoped percentage.
 */
function measurementsFrom(payload: ModelPayload): Measurements | undefined {
  const { model, backtest, holdout } = payload;
  const recent = backtest?.recent_weighted;
  const blended = holdout?.blended;
  const names = model?.features;
  const period = years(backtest?.date_range);
  const since = /^(\d{4})-\d{2}-\d{2}$/.exec(holdout?.cutoff ?? "")?.[1];

  if (
    !backtest ||
    !recent ||
    !holdout ||
    !blended ||
    !period ||
    !since ||
    !Array.isArray(names) ||
    !names.length ||
    !isNumber(backtest.accuracy) ||
    !isNumber(backtest.n_matches) ||
    !isNumber(backtest.margin_rmse) ||
    !isNumber(recent.accuracy) ||
    !isNumber(recent.half_life_days) ||
    !isNumber(recent.effective_matches) ||
    !isNumber(holdout.n_holdout) ||
    !isNumber(blended.win_accuracy) ||
    !isNumber(blended.margin_rmse)
  ) {
    return undefined;
  }

  return {
    forecast: {
      matches: holdout.n_holdout,
      since,
      accuracy: blended.win_accuracy,
      marginRmse: blended.margin_rmse,
    },
    engine: {
      matches: backtest.n_matches,
      period,
      accuracy: backtest.accuracy,
      marginRmse: backtest.margin_rmse,
    },
    recent: {
      accuracy: recent.accuracy,
      halfLifeDays: recent.half_life_days,
      effectiveMatches: recent.effective_matches,
    },
    features: { count: names.length, groups: featureGroups(names) },
  };
}

const percent = (fraction: number) => `${(fraction * 100).toFixed(1)}%`;
const points = (rmse: number) => `${rmse.toFixed(1)} pts RMSE`;
const count = (matches: number) => matches.toLocaleString("en-GB");

function figuresFrom({ forecast, engine, recent, features }: Measurements): CaseStudyFigure[] {
  return [
    {
      label: "Forecast: winner called",
      value: percent(forecast.accuracy),
      note: `${count(forecast.matches)} matches since ${forecast.since}, held out of training`,
    },
    {
      label: "Forecast: margin error",
      value: points(forecast.marginRmse),
      note: "same holdout",
    },
    {
      label: "Rating engine: winner called",
      value: percent(engine.accuracy),
      note: `${count(engine.matches)} matches, ${engine.period}, by walk-forward backtest; mostly tier-two fixtures`,
    },
    {
      label: "Rating engine: margin error",
      value: points(engine.marginRmse),
      note: "same backtest",
    },
    {
      label: "Rating engine: recent form",
      value: percent(recent.accuracy),
      note: `${recent.halfLifeDays}-day half-life, an effective sample of ${recent.effectiveMatches} matches`,
    },
    {
      label: "Features in the blend",
      value: String(features.count),
      note: features.groups.join(", "),
    },
  ];
}

export function figuresFromPayload(payload: ModelPayload): CaseStudyFigure[] | undefined {
  const measurements = measurementsFrom(payload);
  return measurements && figuresFrom(measurements);
}

/** When `FALLBACK` was read from `/api/model`. */
const FALLBACK_AS_OF = "26 Oct 2026";

/**
 * The last values read from RTP, published when the endpoint cannot be.
 *
 * A stale number that once was true beats an empty panel in a case study whose
 * argument rests on its measurements, and the date on each note tells the
 * reader how stale it is.
 */
const FALLBACK: Measurements = {
  forecast: { matches: 1394, since: "2018", accuracy: 0.7683, marginRmse: 21.2191 },
  engine: { matches: 9291, period: "1871 to 2026", accuracy: 0.735, marginRmse: 21.4812 },
  recent: { accuracy: 0.785, halfLifeDays: 90, effectiveMatches: 133 },
  features: {
    count: 28,
    groups: ["ratings", "form", "opponent strength", "head-to-head", "rest days", "hemisphere"],
  },
};

export const FALLBACK_FIGURES: CaseStudyFigure[] = figuresFrom(FALLBACK).map((figure) => ({
  ...figure,
  note: `${figure.note}, as of ${FALLBACK_AS_OF}`,
}));

/**
 * The one-hour window is the same trade the blog feed makes: it needs nothing
 * from the other repository and recovers on its own however the model came to
 * be retrained. It also keeps the case study a static route with a revalidate
 * rather than turning it dynamic.
 */
export async function rtpFigures(): Promise<CaseStudyFigure[]> {
  if (!RTP) return FALLBACK_FIGURES;

  try {
    const response = await fetch(`${RTP}/api/model`, {
      next: { revalidate: 3600 },
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`model endpoint responded ${response.status}`);
    }

    const figures = figuresFromPayload(await response.json());
    if (!figures) throw new Error("model payload is missing a field");
    return figures;
  } catch (error) {
    // Published figures silently reverting to older ones is the failure this
    // whole module exists to catch, so it goes in the build log.
    console.warn(`[rtp] could not read ${RTP}/api/model —`, error);
    return FALLBACK_FIGURES;
  }
}
