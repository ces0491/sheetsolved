import type { MetadataRoute } from "next";

import { CASE_STUDIES } from "@/content/projects";
import { SITE_URL } from "@/lib/site";

/**
 * Every page a crawler should know about, derived from the same collection the
 * pages are. A hand-written list would drift, and a page silently missing from
 * the sitemap looks identical to one that does not exist.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/built", ...CASE_STUDIES.map((p) => `/built/${p.slug}`)];

  return paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
