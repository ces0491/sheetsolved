import type { Metadata } from "next";
import encodeQR from "qr";

import { Mark } from "@/components/logo";
import { PALETTE } from "@/lib/brand";
import { SITE, SITE_URL } from "@/lib/site";

/**
 * The card to hold up when someone asks for your details.
 *
 * It exists because the alternatives all cost something: a third-party card
 * app puts the card on somebody else's domain, and NameDrop shares a name and
 * one phone number or email rather than a website. A QR pointing at this
 * site's own vCard needs no app on either phone and works across platforms.
 *
 * **Not indexed, and not in the sitemap.** It is a tool rather than a page,
 * and its content is the contact details the home page already carries — a
 * second URL competing for the same query is worth less than the one it takes
 * traffic from.
 */
export const metadata: Metadata = {
  title: "Contact card",
  description: `Save ${SITE.owner}'s contact details.`,
  robots: { index: false, follow: true },
};

const VCARD_URL = `${SITE_URL}/contact.vcf`;

/*
 * Generated at build, so nothing about the card is stored as an image that
 * could go on pointing at an old URL — the same reason the favicon is a route
 * rather than a file.
 *
 * `crispEdges` because a QR scaled to a phone screen is read as squares, and
 * antialiasing along every module boundary is contrast the scanner does not
 * need to work around. The modules are the brand navy rather than the theme
 * foreground: this tile stays light in dark mode, because an inverted QR is
 * read by some scanners and not others.
 */
const QR_SVG = encodeQR(VCARD_URL, "svg", { border: 2, ecc: "medium" }).replace(
  "<svg ",
  `<svg fill="${PALETTE.navy}" shape-rendering="crispEdges" `,
);

export default function CardPage() {
  return (
    <section className="field flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6 py-16">
      <div className="enter w-full max-w-sm rounded-2xl border border-border bg-surface-raised p-8 text-center shadow-card sm:p-10">
        <Mark size={40} className="mx-auto text-accent" />

        <h1 className="mt-6 text-2xl font-semibold tracking-tight">{SITE.owner}</h1>
        <p className="mt-2 text-sm text-muted">
          {SITE.role} &middot; {SITE.name}
        </p>

        <div
          className="mx-auto mt-8 w-full max-w-[15rem] rounded-xl bg-white p-4"
          role="img"
          aria-label={`QR code linking to the contact card for ${SITE.owner}`}
          dangerouslySetInnerHTML={{ __html: QR_SVG }}
        />

        <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          Scan to save my details
        </p>

        <a
          href="/contact.vcf"
          className="mt-7 inline-flex w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-medium text-accent-contrast"
        >
          Add to contacts
        </a>

        <ul className="mt-7 space-y-2 text-sm">
          <li>
            <a
              href={`mailto:${SITE.email}`}
              className="underline-grow text-muted hover:text-foreground"
            >
              {SITE.email}
            </a>
          </li>
          <li>
            <a href={SITE_URL} className="underline-grow text-muted hover:text-foreground">
              {SITE_URL.replace(/^https?:[/][/]/, "")}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
