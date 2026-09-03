import { vcard } from "@/lib/vcard";

/**
 * The contact card, served at a URL a QR code can point at.
 *
 * `force-static` because the card is built from constants: this is prerendered
 * once and served from the CDN like every other page here.
 *
 * The disposition is `inline` rather than `attachment` on purpose. iOS Safari
 * previews an inline `text/vcard` and offers "Add to Contacts"; as an
 * attachment the same file lands in Files, where it is one more step away from
 * the address book and easy to lose.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(vcard(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="cesaire-tobias.vcf"',
    },
  });
}
