/**
 * The portfolio, as data.
 *
 * One entry per project. The index page, each case study page, the sitemap and
 * the JSON-LD are all derived from this file, so adding a project means adding
 * an entry here rather than authoring a page. Nothing about a project is
 * written down twice.
 */

export interface ProjectLinks {
  /** The thing itself, running. */
  live?: string;
  /** Source, where it is public. */
  source?: string;
  /** Published documentation, where that is separate from the thing. */
  docs?: string;
  /** The CRAN listing, for a released R package. */
  cran?: string;
}

export interface CaseStudyFigure {
  label: string;
  value: string;
  /** What the figure is measured over. A number without its scope misleads. */
  note?: string;
}

export interface CaseStudySection {
  heading: string;
  body: string[];
  figures?: CaseStudyFigure[];
}

export interface Project {
  slug: string;
  name: string;
  /** One line, read in a list. */
  tagline: string;
  /** A paragraph, read on the project page. */
  summary: string;
  stack: string[];
  links: ProjectLinks;
  /** `live` is running and maintained, `released` has shipped, `ongoing` is still moving. */
  status: "live" | "released" | "ongoing";
  /** Ordering on the index, and which entries lead it. */
  featured: boolean;
  /** Present only where there is something worth reading at length. */
  caseStudy?: CaseStudySection[];
}

export const PROJECTS: Project[] = [
  {
    slug: "rtp",
    name: "RTP — Rugby Tournament Predictor",
    tagline: "A Monte Carlo forecasting engine for rugby tournaments, refreshed daily.",
    summary:
      "A rating engine, a simulator and a web application that forecasts rugby " +
      "tournaments and publishes how well it has actually done. Ratings are " +
      "Glicko-2, computed from every match on record. Tournaments are simulated " +
      "five thousand times. The whole pipeline runs unattended each morning and " +
      "records what each run changed.",
    stack: ["Python", "Glicko-2", "XGBoost", "SQLite", "Next.js", "TypeScript", "Vercel"],
    links: { live: "https://rtp.sheetsolved.com" },
    status: "live",
    featured: true,
    caseStudy: [
      {
        heading: "The problem with a published forecast",
        body: [
          "Anyone can publish a percentage. Far fewer publish how often their " +
            "percentages have been right, what the model cannot see, or what " +
            "changed between yesterday's number and today's.",
          "RTP was built the other way round. Every figure it shows traces back " +
            "to a measurement, and the measurements sit on the site beside the " +
            "forecasts rather than in a footnote nobody reaches.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "Match results are ingested from a public feed into a database holding " +
            "every senior men's international on record, back to 1871. Glicko-2 " +
            "ratings are computed from that history point-in-time, so a rating " +
            "never sees a result that had not yet happened.",
          "A tournament is then simulated five thousand times. Fixtures already " +
            "played are locked at their real scores in every run, so a forecast " +
            "made mid-tournament is conditional on what has actually happened. " +
            "The simulation's own runs supply the margin distributions, the " +
            "qualification odds and the what-if scenarios, which is why no two " +
            "numbers on the site can contradict one another.",
        ],
      },
      {
        heading: "What it measures about itself",
        body: [
          "The model is scored by walk-forward backtest: re-rate the whole " +
            "history one match at a time, and predict each fixture using only " +
            "what was known before it was played. That is the figure the site " +
            "publishes, and it is always reported with the period it covers.",
        ],
        figures: [
          {
            label: "Winner called correctly",
            value: "70.9%",
            note: "3,673 matches, 1871 to 2026 — the full record",
          },
          {
            label: "Margin error",
            value: "16.8 pts RMSE",
            note: "same period; modern fixtures score better",
          },
          {
            label: "Recent form",
            value: "78.3%",
            note: "90-day half-life, an effective sample of 59 matches",
          },
          {
            label: "Features in the blend",
            value: "28",
            note: "rating gap, venue, rest, competition, form",
          },
        ],
      },
      {
        heading: "The engineering that matters",
        body: [
          "No server does arithmetic. Every endpoint reads a file that a pipeline " +
            "step wrote, so a forecast, the ratings behind it and the accuracy " +
            "quoted beside it all describe one state of the database rather than " +
            "three taken at different moments.",
          "The pipeline records its own failures. When a run aborts, the site " +
            "says so and names the step, because a silent failure and a quiet " +
            "day look identical to a reader and only one of them is fine.",
        ],
      },
    ],
  },
  {
    slug: "tidylearn",
    name: "tidylearn",
    tagline: "One tidyverse-shaped interface over R's machine learning ecosystem.",
    summary:
      "An R package on CRAN giving a single consistent interface to R's machine " +
      "learning ecosystem, from reading data through modelling to publishing " +
      "results. The underlying algorithms are unchanged — glmnet, randomForest, " +
      "xgboost, e1071 and others do the work — and tidylearn makes them easier " +
      "to use together.",
    stack: ["R", "tidyverse", "glmnet", "xgboost", "randomForest", "ggplot2", "gt"],
    links: {
      cran: "https://cran.r-project.org/package=tidylearn",
      docs: "https://tidylearn.sheetsolved.com",
      source: "https://github.com/ces0491/tidylearn",
    },
    status: "released",
    featured: true,
  },
  {
    slug: "ready-before-run",
    name: "Ready Before Run()",
    tagline: "A practical guide to the infrastructure data science assumes you already have.",
    summary:
      "A book for people who arrived at data work from somewhere other than " +
      "computer science. It covers the ground between knowing the statistics and " +
      "being able to ship the work: the command line, reproducible environments, " +
      "data stores, version control, reporting, containers and deployment.",
    stack: ["Quarto", "R", "Python"],
    links: {
      live: "https://rbr.sheetsolved.com",
      source: "https://github.com/ces0491/rbr",
    },
    status: "ongoing",
    featured: true,
  },
  {
    slug: "tech-perspectives",
    name: "Tech Perspectives",
    tagline: "Writing on tooling, AI, and how technical work actually gets done.",
    summary:
      "Essays on the practice of building things — what AI assistance changes " +
      "and what it does not, how tooling fashions cycle, and where engineering " +
      "judgement still has to come from a person.",
    stack: ["Jekyll", "Markdown"],
    links: {
      live: "https://blog.sheetsolved.com",
      source: "https://github.com/ces0491/tech-perspectives",
    },
    status: "ongoing",
    featured: false,
  },
  {
    slug: "stockscreenr",
    name: "stockScreenR",
    tagline: "A dashboard for screening stocks.",
    summary:
      "An R dashboard for filtering and comparing listed equities against " +
      "screening criteria.",
    stack: ["R", "Shiny"],
    links: { source: "https://github.com/ces0491/stockScreenR" },
    status: "ongoing",
    featured: false,
  },
  {
    slug: "webscraper",
    name: "webScrapeR",
    tagline: "Utility functions for scraping data from the web.",
    summary:
      "An R package of helpers for retrieving and reshaping data from web sources.",
    stack: ["R"],
    links: { source: "https://github.com/ces0491/webScrapeR" },
    status: "ongoing",
    featured: false,
  },
  {
    slug: "fx-tracker",
    name: "FX Tracker",
    tagline: "Tracking and forecasting foreign exchange rates.",
    summary:
      "An application that tracks foreign exchange rates and forecasts them " +
      "across a set of machine learning algorithms.",
    stack: ["Python", "Machine learning"],
    links: { source: "https://github.com/ces0491/fx-tracker" },
    status: "ongoing",
    featured: false,
  },
];

/** Featured first, then the rest, each group keeping the order declared above. */
export const ORDERED_PROJECTS: Project[] = [
  ...PROJECTS.filter((p) => p.featured),
  ...PROJECTS.filter((p) => !p.featured),
];

export function projectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** The projects with something to read at length. Only these get their own page. */
export const CASE_STUDIES: Project[] = PROJECTS.filter((p) => p.caseStudy?.length);

/** Human labels for the status badge, kept beside the union they describe. */
export const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  released: "Released",
  ongoing: "Ongoing",
};
