import type { NextConfig } from "next";

/** Where cranExploreR runs: Posit Connect Cloud's free plan, on Posit's host. */
const CRANEXPLORER_APP = "https://ces0491-cranexplorer.share.connect.posit.cloud";

const nextConfig: NextConfig = {
  /**
   * Vercel goes on answering on a project's generated alias after a custom
   * domain is attached, so `sheetsolved.vercel.app` was serving the whole
   * site alongside the apex — two hostnames carrying one set of pages, which
   * is the duplication every canonical tag here exists to prevent.
   *
   * The value is the exact production alias. Preview deployments get their own
   * generated hostnames, so they are untouched and go on serving themselves
   * for review — which is what `robots.ts` already assumes.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "sheetsolved.vercel.app" }],
        destination: "https://sheetsolved.com/:path*",
        permanent: true,
      },
      /*
       * Posit's free plan can't serve an app on a custom domain, so the
       * subdomain is a link this site controls and the app stays on Posit.
       * Temporary, because the app may move onto the subdomain itself on a
       * paid plan. Browsers cache a 308 indefinitely and would keep sending
       * returning visitors to the old address.
       */
      {
        source: "/:path*",
        has: [{ type: "host", value: "cranexplorer.sheetsolved.com" }],
        destination: `${CRANEXPLORER_APP}/:path*`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
