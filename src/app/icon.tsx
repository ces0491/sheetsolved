import { ImageResponse } from "next/og";

import { MARK, PALETTE } from "@/lib/brand";

/**
 * The favicon, generated from `brand.json` rather than stored as a file.
 *
 * A static icon is the one part of a mark that falls behind silently — nothing
 * imports it, so a stale one builds, deploys and serves without complaint.
 * Generating it here means there is no second copy of the geometry to go stale.
 *
 * The dark artwork is used at every size: a favicon cannot answer
 * `prefers-color-scheme`, and navy on a light chip is the pairing that survives
 * either tab strip.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
        width={30}
        height={30}
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
