import Link from "next/link";

import { Mark } from "@/components/logo";
import { ORDERED_PROJECTS } from "@/content/projects";
import { SITE } from "@/lib/site";

/**
 * The footer carries the outbound links to every property.
 *
 * It is derived from the project collection rather than hand-listed, so a
 * project added to the data appears here without anyone remembering to add it.
 * Only projects with somewhere to send a reader are listed.
 */
export function SiteFooter() {
  const destinations = ORDERED_PROJECTS.filter((p) => p.links.live ?? p.links.docs);

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <span className="flex items-center gap-2.5">
              <Mark size={26} className="text-accent" />
              <span className="font-semibold tracking-tight">{SITE.name}</span>
            </span>
            <p className="mt-4 max-w-xs text-pretty text-sm leading-relaxed text-muted">
              {SITE.strapline}. Data and software consulting from {SITE.location}.
            </p>
          </div>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Elsewhere</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {destinations.map((p) => (
                <li key={p.slug}>
                  <a
                    href={(p.links.live ?? p.links.docs)!}
                    className="underline-grow text-muted hover:text-foreground"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
              <li>
                <a href={SITE.github} className="underline-grow text-muted hover:text-foreground">
                  GitHub
                </a>
              </li>
              {/*
                Both LinkedIn URLs, labelled. The site is written in the first
                person singular, so linking only a company page sends a reader
                looking for the person to the wrong one of the two.
              */}
              <li>
                <a href={SITE.linkedin} className="underline-grow text-muted hover:text-foreground">
                  LinkedIn — Sheet Solved
                </a>
              </li>
              <li>
                <a
                  href={SITE.linkedinPersonal}
                  className="underline-grow text-muted hover:text-foreground"
                >
                  LinkedIn — {SITE.owner}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="underline-grow text-muted hover:text-foreground"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <Link href="/card" className="underline-grow text-muted hover:text-foreground">
                  Contact card
                </Link>
              </li>
              <li>
                <Link href="/built" className="underline-grow text-muted hover:text-foreground">
                  What I have built
                </Link>
              </li>
              <li>
                <Link href="/#services" className="underline-grow text-muted hover:text-foreground">
                  Services
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <p className="font-mono text-xs text-muted">
            © {SITE.name}. {SITE.owner}.
          </p>
        </div>
      </div>
    </footer>
  );
}
