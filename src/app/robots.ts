import type { MetadataRoute } from "next";

import { IS_PRODUCTION, SITE_URL } from "@/lib/site";

/**
 * The crawl policy.
 *
 * A preview deployment refuses everything: it serves production's content on a
 * different hostname, which competes with production for the same queries.
 */
export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
