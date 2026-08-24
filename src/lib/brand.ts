import brand from "./brand.json";

/**
 * The mark, defined once.
 *
 * `brand.json` holds the geometry resolved rather than parametric, so the
 * React component, the favicon route, the apple icon and the Open Graph image
 * all draw the same paths. Nothing derives the shape a second way, which is
 * the only arrangement in which the generated assets cannot drift from the
 * mark they are generated from.
 *
 * The mark is a cell with two open corners, containing a squared C and a T —
 * the initials, and a route through the sheet. Five strokes, with channels
 * roughly twice the stroke width so it still resolves at 16px.
 */
export const PALETTE = brand.palette;

/** Everything an <svg> needs except its size and its colour. */
export const MARK = {
  viewBox: brand.mark.viewBox,
  strokeWidth: brand.mark.strokeWidth,
  strokeLinejoin: brand.mark.strokeLinejoin as "round",
  strokeLinecap: brand.mark.strokeLinecap as "square",
  paths: brand.mark.paths,
} as const;
