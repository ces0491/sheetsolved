import Link from "next/link";

import { Logo } from "@/components/logo";
import { projectBySlug } from "@/content/projects";
import { COURSES, SITE } from "@/lib/site";

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

/**
 * The courses get an entry of their own for the same reason the blog does: a
 * reader looks for them by name, and they're a product rather than a project.
 *
 * `from` hides an entry below a breakpoint. At 360px four labels overflow the
 * header, and below `md` five push "Get in touch" onto three lines, so Courses
 * goes below `sm` and Practice below `md`. Courses stays reachable on a phone
 * from the home page's courses section and the footer.
 *
 * Writing goes below 375px. With three labels at 360px, a common Android width,
 * the name and the links had about 13px between them and read as one run of
 * text. With two, the name and links fit down to 320px with room between them.
 * The blog stays reachable from the home page's Writing section.
 *
 * The gaps are tighter below `sm`: in Geist the name and three labels need
 * 307px, and get 327 at 375px. The row is spread with `justify-between`, so the
 * gap after the name is a minimum and the space it actually gets is wider. From
 * `sm` to `md` the four labels and "Get in touch" are 1px too wide at 640px with
 * the desktop gap, so the labels sit a little closer until `md`.
 */
type From = "xs" | "sm" | "md";

const NAV: { href: string; label: string; external?: boolean; from?: From }[] = [
  { href: "/#services", label: "Services" },
  { href: "/built", label: "Built" },
  { href: COURSES.url, label: "Courses", external: true, from: "sm" },
  ...(BLOG ? [{ href: BLOG, label: "Writing", external: true, from: "xs" as const }] : []),
  { href: "/#practice", label: "Practice", from: "md" },
];

/** Whole class names, so Tailwind finds them in the source. `xs` is 375px, below `sm`. */
const SHOW_FROM: Record<From, string> = {
  xs: "hidden min-[375px]:block",
  sm: "hidden sm:block",
  md: "hidden md:block",
};

/**
 * The header stays with the reader.
 *
 * Translucent over a blur, so the ruled field behind the hero carries through
 * it instead of being cut off by a solid bar. The fallback is a solid
 * background, because a header that is merely transparent where
 * `backdrop-filter` is unsupported puts body copy under its own nav.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 supports-[backdrop-filter]:bg-background/70 supports-[backdrop-filter]:backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-6 py-4 sm:gap-6 sm:px-8">
        <Link
          href="/"
          aria-label={`${SITE.name}, home`}
          className="transition-opacity hover:opacity-80"
        >
          <Logo />
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav aria-label="Main">
            <ul className="flex items-center gap-2.5 text-sm sm:gap-6 md:gap-7">
              {NAV.map((item) => (
                <li key={item.href} className={item.from ? SHOW_FROM[item.from] : undefined}>
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
