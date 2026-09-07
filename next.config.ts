import type { NextConfig } from "next";

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
    ];
  },
};

export default nextConfig;
