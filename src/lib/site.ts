/**
 * Everything the site needs to know about itself, defined once.
 *
 * The origin is read by the metadata base, the sitemap, the robots policy and
 * the structured data. Those four disagreeing would publish canonical URLs, a
 * crawl policy and a machine-readable identity pointing at different hosts.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "production"
    ? "https://sheetsolved.com"
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

/** Whether this deployment is the public production one. */
export const IS_PRODUCTION = process.env.VERCEL_ENV === "production";

export const SITE = {
  name: "Sheet Solved",
  tagline: "Spreadsheets, Solved!",
  strapline: "Simplified, scalable solutions",
  description:
    "Sheet Solved builds, refactors and automates spreadsheets, and converts " +
    "spreadsheet logic into code. Quantitative work for businesses from large " +
    "listed companies down to micro enterprises.",
  owner: "Cesaire Tobias",
  email: "cesaire@sheetsolved.com",
  whatsapp: "+27 61 510 4728",
  whatsappHref: "https://wa.me/27615104728",
  location: "Pinelands, Cape Town, South Africa",
  github: "https://github.com/ces0491",
} as const;

/** What the consultancy does, as listed on the home page. */
export const SERVICES = [
  {
    title: "Build and refactor",
    body: "New models built to hold up, and existing ones taken apart and put back together so they can be trusted.",
  },
  {
    title: "Automate",
    body: "The repetitive parts of a spreadsheet process removed, so the monthly cycle stops costing a week.",
  },
  {
    title: "Design workflows",
    body: "The path a number takes from source to report, made explicit and made shorter.",
  },
  {
    title: "Convert logic to code",
    body: "Business logic lifted out of a workbook and into something testable, versioned and scalable.",
  },
  {
    title: "Hybrid solutions",
    body: "Spreadsheets where a spreadsheet is right, code where it is not, and a clean seam between them.",
  },
  {
    title: "Dashboards",
    body: "Reporting that generates insight rather than consuming an afternoon assembling it.",
  },
] as const;
