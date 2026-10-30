import { ADDRESS, OWNER_NAME, SITE, SITE_URL } from "@/lib/site";

/**
 * The contact card, assembled from the same constants the pages and the
 * structured data read. A card that has to be edited separately is a card that
 * goes on handing out an old email address.
 *
 * vCard 3.0 rather than 4.0: iOS, Android and Outlook all import 3.0 without
 * argument, and nothing here needs a field 4.0 would express better.
 */

/**
 * The four characters a vCard value cannot carry literally. The backslash is
 * replaced first, or it escapes the escapes added after it.
 */
export function escape(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/**
 * Fold at 75 octets, per RFC 2426, continuation lines beginning with a space.
 * Long lines survive most parsers, but the description is comfortably over the
 * limit and there is no reason to find out which parser does not.
 *
 * Octets rather than characters because the description carries an em dash,
 * which is three of them. Walking by code point means a fold can't land inside
 * one.
 */
export function fold(line: string): string {
  const folded: string[] = [];
  let current = "";
  let octets = 0;

  for (const character of line) {
    const size = Buffer.byteLength(character);
    if (octets + size > 75) {
      folded.push(current);
      current = " ";
      octets = 1;
    }
    current += character;
    octets += size;
  }

  folded.push(current);
  return folded.join("\r\n");
}

/**
 * `item1.` and `item2.` are Apple's grouping syntax, which is what puts a
 * label beside a URL in Contacts rather than a second anonymous link.
 * Everything else drops the group prefix and keeps the URL.
 */
export function vcard(): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    // family;given;additional;prefixes;suffixes
    `N:${escape(OWNER_NAME.family)};${escape(OWNER_NAME.given)};;;`,
    `FN:${escape(SITE.owner)}`,
    `ORG:${escape(SITE.name)}`,
    `TITLE:${escape(SITE.role)}`,
    `EMAIL;TYPE=INTERNET,WORK:${escape(SITE.email)}`,
    `URL;TYPE=WORK:${escape(SITE_URL)}`,
    // pobox;extended;street;locality;region;postcode;country
    `ADR;TYPE=WORK:;;;${escape(ADDRESS.city)};${escape(ADDRESS.region)};;${escape(ADDRESS.country)}`,
    `NOTE:${escape(SITE.description)}`,
    `item1.URL:${escape(SITE.linkedinPersonal)}`,
    "item1.X-ABLabel:LinkedIn",
    `item2.URL:${escape(SITE.github)}`,
    "item2.X-ABLabel:GitHub",
    "END:VCARD",
  ];

  // CRLF is required by the spec rather than conventional, and some importers
  // do enforce it.
  return `${lines.map(fold).join("\r\n")}\r\n`;
}
