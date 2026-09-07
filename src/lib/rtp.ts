import type { CaseStudyFigure } from "@/content/projects";
import { projectBySlug } from "@/content/projects";

/**
 * RTP's published measurements, read from RTP.
 *
 * The case study quotes four figures the pipeline recomputes whenever the
 * model is retrained. Written down here they went stale silently and did: the
 * page published 70.9% over 3,673 matches while `/api/model` had moved to
 * 71.6% over 3,676, and recent form was out by six points. Nothing on the hub
 * could notice, because a copied number and a current one look identical.
 *
 * So they are read, the same way the home page reads the blog's feed. The
 * prose beside each figure stays here — "modern fixtures score better" is a
 * judgement about the numbers rather than one of them.
 */

const RTP = projectBySlug("rtp")?.links.live;

/**
 * The last figures read from RTP, published when the endpoint cannot be.
 *
 * A stale number that once was true beats an empty panel in a case study whose
 * whole argument is that every figure traces to a measurement. Confirmed
 * against `/api/model` on 2026-09-07.
 */
const FALLBACK_FIGURES: CaseStudyFigure[] = [
  {
    label: "Winner called correctly",
    value: "71.6%",
    note: "3,676 matches, 1871 to 2026 — the full international record",
  },
  {
    label: "Margin error",
    value: "16.8 pts RMSE",
    note: "same period; modern fixtures score better",
  },
  {
    label: "Recent form",
    value: "72.0%",
    note: "90-day half-life, an effective sample of 59 matches",
  },
  {
    label: "Features in the blend",
    value: "28",
    note: "rating gap, venue, rest, competition, form",
  },
];

interface ModelPayload {
  model?: { n_features?: number };
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
}

const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

/** `1871-03-27 to 2026-08-29` reads as `1871 to 2026` beside a figure. */
function years(range: string | undefined): string | undefined {
  const match = /^(\d{4})-\d{2}-\d{2}\s+to\s+(\d{4})-\d{2}-\d{2}$/.exec(range ?? "");
  return match ? `${match[1]} to ${match[2]}` : undefined;
}

const percent = (fraction: number) => `${(fraction * 100).toFixed(1)}%`;

/**
 * Every field is checked before any of them is rendered.
 *
 * A partial payload has to produce the previous figures rather than a panel
 * reading `NaN%`, and a figure whose scope could not be read is exactly the
 * thing `CaseStudyFigure.note` exists to prevent — so a missing date range
 * discards the whole set rather than publishing an unscoped percentage.
 */
function figuresFromPayload(payload: ModelPayload): CaseStudyFigure[] | undefined {
  const backtest = payload.backtest;
  const recent = backtest?.recent_weighted;
  const features = payload.model?.n_features;
  const period = years(backtest?.date_range);

  if (
    !backtest ||
    !recent ||
    !period ||
    !isNumber(backtest.accuracy) ||
    !isNumber(backtest.n_matches) ||
    !isNumber(backtest.margin_rmse) ||
    !isNumber(recent.accuracy) ||
    !isNumber(recent.half_life_days) ||
    !isNumber(recent.effective_matches) ||
    !isNumber(features)
  ) {
    return undefined;
  }

  return [
    {
      label: "Winner called correctly",
      value: percent(backtest.accuracy),
      note: `${backtest.n_matches.toLocaleString("en-GB")} matches, ${period} — the full international record`,
    },
    {
      label: "Margin error",
      value: `${backtest.margin_rmse.toFixed(1)} pts RMSE`,
      note: "same period; modern fixtures score better",
    },
    {
      label: "Recent form",
      value: percent(recent.accuracy),
      note: `${recent.half_life_days}-day half-life, an effective sample of ${recent.effective_matches} matches`,
    },
    {
      label: "Features in the blend",
      value: String(features),
      note: "rating gap, venue, rest, competition, form",
    },
  ];
}

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

    return figuresFromPayload(await response.json()) ?? FALLBACK_FIGURES;
  } catch (error) {
    // Published figures silently reverting to older ones is the failure this
    // whole module exists to catch, so it goes in the build log.
    console.warn(`[rtp] could not read ${RTP}/api/model —`, error);
    return FALLBACK_FIGURES;
  }
}
