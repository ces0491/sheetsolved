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

/**
 * The name is where the practice started, not the size of it.
 *
 * `tagline` continues the name's own construction rather than restating it, so
 * "Sheet Solved" reads as the first of a pattern. It is the page's `<h1>` and the Open Graph card's headline, so the two
 * cannot say different things about what this is.
 */
export const SITE = {
  name: "Sheet Solved",
  tagline: "Complexity, Solved.",
  strapline: "Simplified, scalable solutions",
  /*
   * Short enough to hold one line at 390px. The location is carried by the
   * description, the contact block, the footer and the JSON-LD address, and
   * appending it here only bought a wrapped orphan above the fold.
   */
  eyebrow: "Data and software consultancy",
  /*
   * The spreadsheet origin is explained once, in the Practice section. This
   * used to end on "often that starts with a spreadsheet, it rarely ends with
   * one", which is the same antithesis the Practice pull-quote makes with more
   * room to make it.
   */
  intro:
    "I build the data and software systems a business actually runs on — the " +
    "pipeline that feeds it, the model behind the decision, and the application " +
    "that puts both in front of someone.",
  description:
    "Sheet Solved builds the data and software systems businesses run on — " +
    "pipelines, models, dashboards, and the spreadsheets worth keeping. " +
    "Quantitative consulting from Cape Town.",
  owner: "Cesaire Tobias",
  email: "cesaire@sheetsolved.com",
  location: "Pinelands, Cape Town, South Africa",
  github: "https://github.com/ces0491",
  /*
   * Two LinkedIn URLs, because the structured data describes two entities.
   * `linkedin` is the company page and belongs to the Organisation;
   * `linkedinPersonal` is the profile and belongs to the Person. One constant
   * serving both had the Person declaring a company page as itself, which is
   * the kind of claim that gets a whole entity graph ignored.
   */
  linkedin: "https://www.linkedin.com/company/sheet-solved/",
  linkedinPersonal: "https://www.linkedin.com/in/cesaire-tobias/",
} as const;

/**
 * What the consultancy does.
 *
 * Spreadsheet work is one entry rather than the frame around the other five,
 * and it is written as a judgement about when a spreadsheet is the right
 * answer.
 */
export const SERVICES = [
  {
    title: "Data pipelines",
    body: "Data pulled out of the systems it lives in and landed somewhere you can query it, on a schedule, without anyone watching.",
  },
  {
    title: "Models and forecasting",
    body: "Quantitative models that publish their own accuracy, so you know what to trust them for.",
  },
  {
    title: "Applications and dashboards",
    body: "Software and reporting that produce the answer, so nobody spends an afternoon assembling it.",
  },
  {
    title: "Automation",
    body: "The repetitive half of a monthly process removed, so the cycle stops costing a week of somebody's attention.",
  },
  {
    title: "Spreadsheets, done properly",
    body: "Built to hold up where a spreadsheet is the right answer, and lifted into code where it has stopped being one.",
  },
  {
    title: "Technical leadership",
    body: "Standing in as the technical lead a small team does not have: architecture, review, and the pipeline that enforces both.",
  },
] as const;
