import Link from "next/link";

import { Logo } from "@/components/logo";
import { projectBySlug } from "@/content/projects";
import { SITE } from "@/lib/site";

/**
 * The blog gets a nav entry of its own.
 *
 * It was reachable only as "Tech Perspectives" in the footer's project list,
 * which is the right place for a portfolio entry and the wrong one for the
 * thing a reader looks for by name. "Writing" is also the anchor text a
 * crawler can read something into; a project title is not.
 *
 * The URL is read from the portfolio data rather than written here. The
 * footer derives its link the same way, and two copies of a hostname can
 * disagree about where the blog lives.
 */
const BLOG = projectBySlug("tech-perspectives")?.links.live;

/** `onlyWide` hides an entry below `sm`, where four labels do not fit. */
const NAV: { href: string; label: string; external?: boolean; onlyWide?: boolean }[] = [
  { href: "/#services", label: "Services" },
  { href: "/built", label: "Built" },
  ...(BLOG ? [{ href: BLOG, label: "Writing", external: true }] : []),
  { href: "/#practice", label: "Practice", onlyWide: true },
];

/**
 * The header stays with the reader.
 *
 * Translucent over a blur rather than opaque, so the ruled field behind the
 * hero carries through it instead of being cut off by a solid bar. The
 * fallback is a solid background, because a header that is merely transparent
 * where `backdrop-filter` is unsupported puts body copy under its own nav.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 supports-[backdrop-filter]:bg-background/70 supports-[backdrop-filter]:backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <Link
          href="/"
          aria-label={`${SITE.name}, home`}
          className="transition-opacity hover:opacity-80"
        >
          <Logo />
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav aria-label="Main">
            <ul className="flex items-center gap-4 text-sm sm:gap-7">
              {NAV.map((item) => (
                <li key={item.href} className={item.onlyWide ? "hidden sm:block" : undefined}>
                  {item.external ? (
                    <a href={item.href} className="underline-grow text-muted hover:text-foreground">
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="underline-grow text-muted hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={`mailto:${SITE.email}`}
            className="hidden rounded-full border border-hairline bg-tint px-4 py-1.5 text-sm font-medium text-accent transition-colors hover:border-accent hover:bg-accent hover:text-accent-contrast sm:inline-block"
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}
