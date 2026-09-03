import { ImageResponse } from "next/og";

import { MARK, PALETTE } from "@/lib/brand";

/**
 * The home screen icon, generated from `brand.json` like the favicon.
 *
 * Safari has no icon to use without this route, so it draws the first letter
 * of the site name on a grey tile instead — which is where the "S" came from.
 * Chrome on Android reads `apple-touch-icon` too, so one route covers both.
 *
 * Two things differ from `icon.tsx`, and both are properties of the platform:
 *
 * - **The background is painted.** iOS composites an apple-touch-icon onto
 *   black, so a transparent one arrives as a navy mark on a black tile.
 * - **The mark is inset.** iOS masks the square to a squircle. The mark is a
 *   cell whose two occupied corners run diagonally, which is exactly what a
 *   corner mask takes, so the artwork stops well short of the edge.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * The mark's own artwork fills 81% of its viewBox, so this draws it across 67%
 * of the tile — clear of the squircle, and large enough not to read as a logo
 * floating on a card.
 */
const MARK_SIZE = 148;

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: PALETTE.paper,
      }}
    >
      <svg
        width={MARK_SIZE}
        height={MARK_SIZE}
        viewBox={MARK.viewBox}
        fill="none"
        stroke={PALETTE.navy}
        strokeWidth={MARK.strokeWidth}
        strokeLinejoin={MARK.strokeLinejoin}
        strokeLinecap={MARK.strokeLinecap}
      >
        {MARK.paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </div>,
    size,
  );
}
