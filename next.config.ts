import type { NextConfig } from "next";

/** Where cranExploreR runs: Posit Connect Cloud's free plan, on Posit's host. */
const CRANEXPLORER_APP = "https://ces0491-cranexplorer.share.connect.posit.cloud";

/**
 * The site's own rule, enforced by the browser: nothing loads from another
 * origin. Fonts are self-hosted by `next/font`, and Vercel's two scripts are
 * served from `/_vercel/` here.
 *
 * `'unsafe-inline'` because the pages are static. Next writes inline scripts
 * into each page, and the alternative, a nonce, needs every page rendered per
 * request. The layout's inline `<style>` carrying the brand colours needs it
 * for styles.
 *
 * Off in development, where React needs `eval`, and on preview deployments,
 * where Vercel's toolbar loads from its own hosts. A local `next start` gets
 * it, so it can be checked before a push.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const ENFORCE_CSP = process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...(ENFORCE_CSP ? [{ key: "Content-Security-Policy", value: CSP }] : []),
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
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
