import type { Metadata } from "next";
import Link from "next/link";

/**
 * The 404 page, for unmatched URLs and for `notFound()` in a route.
 *
 * Next's default is unstyled and offers no way on, and a stale link to the hub
 * lands here. No canonical: Next marks the page `noindex` itself.
 */
export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="field overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-28 sm:px-8 sm:pt-36 sm:pb-40">
        <div className="enter max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent sm:tracking-[0.18em]">
            404
          </p>
          <h1 className="mt-6 text-pretty text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            There&apos;s no page here.
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
            The link may be out of date, or mistyped.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm">
            <Link
              href="/"
              className="rounded-full bg-accent px-6 py-3 font-medium text-accent-contrast shadow-card transition-all hover:-translate-y-px hover:shadow-lift"
            >
              Go to the home page
            </Link>
            <Link
              href="/built"
              className="rounded-full border border-border-strong px-6 py-3 font-medium transition-colors hover:border-accent hover:bg-tint hover:text-accent"
            >
              See what I&apos;ve built
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
