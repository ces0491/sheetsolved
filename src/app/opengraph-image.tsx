import { ImageResponse } from "next/og";

import { MARK, PALETTE } from "@/lib/brand";
import { SITE } from "@/lib/site";

/**
 * The card every shared link renders as, generated from the same mark and the
 * same site constants the pages use.
 *
 * Deliberately typographic rather than illustrated: the link is shared into a
 * feed beside other cards, and a legible name at thumbnail size beats an image
 * nobody can read.
 */
export const alt = `${SITE.name} — ${SITE.strapline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PALETTE.paper,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <svg
          width={104}
          height={104}
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

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 86,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: PALETTE.ink,
              lineHeight: 1.05,
            }}
          >
            {SITE.tagline}
          </div>
          <div style={{ fontSize: 36, color: PALETTE.navy, marginTop: 18 }}>
            {SITE.strapline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#5f6479",
            borderTop: `3px solid ${PALETTE.navy}`,
            paddingTop: 22,
          }}
        >
          sheetsolved.com
        </div>
      </div>
    ),
    size,
  );
}
