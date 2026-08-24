import { ImageResponse } from "next/og";

import { CASE_STUDIES, projectBySlug, STATUS_LABEL } from "@/content/projects";
import { MARK, PALETTE } from "@/lib/brand";
import { SITE } from "@/lib/site";

/**
 * The share card for one case study, generated from the same `brand.json` the
 * site-wide card is.
 *
 * A project link shared without this rendered the site-wide card, so every
 * project looked like every other project in a feed — the one place where the
 * name is the whole of what a reader has to go on.
 *
 * Typographic for the same reason as the site card: it appears at thumbnail
 * size beside other cards, and a legible name beats an illustration nobody
 * can read.
 */
/**
 * One image per slug, so `alt` is a single static string rather than a
 * per-project one. `generateImageMetadata` would give each card its own,
 * at the cost of a second dynamic segment (`[__metadata_id__]`) beneath a
 * route that only ever produces one image.
 */
export const alt = `A project built by ${SITE.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** One card per case study, matching the pages that exist. */
export function generateStaticParams() {
  return CASE_STUDIES.map((p) => ({ slug: p.slug }));
}

/**
 * The name sets its own size.
 *
 * `RTP — Rugby Tournament Predictor` is four times the length of `tidylearn`,
 * and one size for both either wraps the long name to three lines or leaves
 * the short one looking like body copy.
 */
function titleSize(name: string): number {
  if (name.length <= 12) return 92;
  if (name.length <= 22) return 76;
  return 60;
}

export default async function CaseStudyImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  return new ImageResponse(
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <svg
          width={88}
          height={88}
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

        {project && (
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: PALETTE.navy,
              border: `2px solid ${PALETTE.navy}`,
              borderRadius: 999,
              padding: "8px 22px",
            }}
          >
            {STATUS_LABEL[project.status]}
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: titleSize(project?.name ?? SITE.name),
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: PALETTE.ink,
            lineHeight: 1.05,
          }}
        >
          {project?.name ?? SITE.name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: PALETTE.navy,
            marginTop: 20,
            lineHeight: 1.35,
          }}
        >
          {project?.tagline ?? SITE.strapline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#5f6479",
          borderTop: `3px solid ${PALETTE.navy}`,
          paddingTop: 22,
        }}
      >
        <div style={{ display: "flex" }}>sheetsolved.com/built/{slug}</div>
        <div style={{ display: "flex" }}>{project?.stack.slice(0, 3).join("  ·  ")}</div>
      </div>
    </div>,
    size,
  );
}
