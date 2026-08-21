import Link from "next/link";

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
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="font-semibold">{SITE.name}</p>
          <p className="mt-2 text-sm text-muted">{SITE.location}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Elsewhere</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {destinations.map((p) => (
              <li key={p.slug}>
                <a
                  href={(p.links.live ?? p.links.docs)!}
                  className="text-muted hover:text-foreground"
                >
                  {p.name}
                </a>
              </li>
            ))}
            <li>
              <a href={SITE.github} className="text-muted hover:text-foreground">
                GitHub
              </a>
            </li>
            <li>
              <a href={SITE.linkedin} className="text-muted hover:text-foreground">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold">Get in touch</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className="text-muted hover:text-foreground">
                {SITE.email}
              </a>
            </li>
            <li>
              <a href={SITE.whatsappHref} className="text-muted hover:text-foreground">
                WhatsApp {SITE.whatsapp}
              </a>
            </li>
            <li>
              <Link href="/built" className="text-muted hover:text-foreground">
                What I have built
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
