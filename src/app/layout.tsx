import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PALETTE } from "@/lib/brand";
import { organisationJsonLd, personJsonLd } from "@/lib/structured-data";
import { SITE, SITE_URL } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — ${SITE.strapline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.owner }],
  /*
   * The label under a home screen shortcut, which otherwise falls back to the
   * document title and gets truncated mid-strapline. `capable` is off on
   * purpose: it would open the shortcut without Safari's chrome, and a site
   * with outbound links needs the back button.
   */
  appleWebApp: { capable: false, title: SITE.name },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.strapline}`,
    description: SITE.description,
    url: "/",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.strapline}`,
    description: SITE.description,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        The brand colours reach CSS from brand.json rather than being restated
        in the stylesheet, so the accent and the mark cannot disagree. Set on
        <html> so the tokens exist before first paint.
      */}
      <style>{`:root{--brand-navy:${PALETTE.navy};--brand-navy-light:${PALETTE.navyLight}}`}</style>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}>
        {/* Identity a search engine and an answer engine can both read. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organisationJsonLd(), personJsonLd()]),
          }}
        />
        <Link
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-contrast"
        >
          Skip to content
        </Link>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {/*
          The client JavaScript on the site, and the reason the "no client JS"
          rule is stated with an exception rather than absolutely. Both scripts
          are served from this origin, under `/_vercel/`, rather than from a
          Vercel hostname, so neither adds a third-party origin — the property
          actually worth protecting, and the one the LinkedIn badge would have
          broken.

          Speed Insights reports field Core Web Vitals from real visits, which
          is the half a local Lighthouse run cannot tell you.
        */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
