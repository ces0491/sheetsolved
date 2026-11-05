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
  /**
   * Where the figures come from, when the project publishes them itself.
   *
   * A project that measures itself is the one place a hand-copied number goes
   * stale without anyone noticing, so the section names a source and the page
   * reads it. The figures and their fallback live with the reader in
   * `src/lib/rtp.ts`; nothing about them is written down here.
   */
  figuresFrom?: "rtp-model";
}

export interface Project {
  slug: string;
  name: string;
  /** One line, read in a list. */
  tagline: string;
  /** A paragraph, read on the project page. */
  summary: string;
  /** What it is, which decides how the structured data describes it. */
  kind: "application" | "package" | "book" | "blog";
  /** Schema.org's `applicationCategory`, for an `application`. */
  category?:
    | "SportsApplication"
    | "ShoppingApplication"
    | "DeveloperApplication"
    | "EducationalApplication"
    | "FinanceApplication";
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
      "tournaments and publishes how well it has done. Ratings are Glicko-2, " +
      "computed from the match record. Tournaments are simulated five thousand " +
      "times. The whole pipeline runs unattended each morning and records what " +
      "each run changed.",
    kind: "application",
    category: "SportsApplication",
    stack: ["Python", "Glicko-2", "XGBoost", "SQLite", "Next.js", "TypeScript", "Vercel"],
    links: { live: "https://rtp.sheetsolved.com" },
    status: "live",
    featured: true,
    caseStudy: [
      {
        heading: "The problem with a published forecast",
        body: [
          "A forecast percentage says little without a record behind it: how " +
            "often past percentages were right, what the model can't see, and " +
            "what changed between yesterday's number and today's.",
          "RTP publishes that record. Its figures trace back to measurements, " +
            "and the measurements sit on the site beside the forecasts.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "Match results are ingested from public feeds into a database of " +
            "senior men's internationals going back to 1871. Glicko-2 ratings " +
            "are computed from that history point-in-time, so a rating never " +
            "sees a result that hadn't yet happened.",
          "Club rugby is rated the same way from its own record, back to 2015. " +
            "That record holds three populations that never meet, and none of " +
            "them plays the internationals, so each sits on a scale of its own " +
            "and a rating on one is meaningless held against another.",
          "A tournament is then simulated five thousand times. Fixtures already " +
            "played are locked at their real scores in every run, so a forecast " +
            "made mid-tournament is conditional on what has happened. The " +
            "simulation's own runs supply the margin distributions, the " +
            "qualification odds and the what-if scenarios, so those figures " +
            "can't disagree with the forecast.",
        ],
      },
      {
        heading: "What it measures about itself",
        body: [
          "The rating engine is scored by walk-forward backtest: re-rate the " +
            "whole history one match at a time, and predict each fixture using " +
            "only what was known before it was played.",
          "The forecast the site publishes blends those ratings with an XGBoost " +
            "model, so it's scored separately on a forward holdout: trained on " +
            "the matches before a cutoff, then scored on the ones it never saw. " +
            "Both are reported with the period they cover.",
        ],
        figuresFrom: "rtp-model",
      },
      {
        heading: "How it runs",
        body: [
          "No server does arithmetic. Endpoints read files that pipeline steps " +
            "wrote, so a forecast, the ratings behind it and the accuracy quoted " +
            "beside it all describe the same state of the database.",
          "The pipeline records its own failures. When a run aborts, the site " +
            "says so and names the step, so a reader can tell a failed run from " +
            "a quiet day.",
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
    kind: "package",
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
    kind: "book",
    stack: ["Quarto", "R", "Python"],
    links: {
      live: "https://rbr.sheetsolved.com",
      source: "https://github.com/ces0491/rbr",
    },
    status: "ongoing",
    featured: true,
  },
  {
    slug: "tokenwise",
    name: "tokenwise",
    tagline: "Which Claude Code model and effort level a piece of work needs.",
    summary:
      "A Claude Code plugin that recommends a model and effort level for each " +
      "phase of work: the exact commands to type, what the cheaper choice " +
      "gives up, and the failure that should send you up a tier. Its claims " +
      "are checked against a graded benchmark, with pass marks written down " +
      "before all but three of the results were read, and four of the original " +
      "eight didn't survive. Its own cost is measured too, and the docs chart " +
      "how small a task has to be before asking costs more than it saves.",
    kind: "package",
    stack: ["Claude Code", "Node.js"],
    links: {
      docs: "https://github.com/ces0491/tokenwise/blob/main/docs/guide.md",
      source: "https://github.com/ces0491/tokenwise",
    },
    status: "released",
    featured: true,
  },
  {
    slug: "tech-perspectives",
    name: "Tech Perspectives",
    tagline: "Ces's random twalks on tech and stats.",
    summary:
      "Writing on what AI assistance changes and what it doesn't, how computing " +
      "keeps swinging between central and local, and the R package work those " +
      "arguments get tested on — dependency risk, reporting, and a scoring band " +
      "that didn't hold.",
    kind: "blog",
    stack: ["Jekyll", "Markdown"],
    links: {
      live: "https://blog.sheetsolved.com",
      source: "https://github.com/ces0491/tech-perspectives",
    },
    status: "ongoing",
    featured: false,
  },
  {
    slug: "wood-wiz",
    name: "Wood Wiz",
    tagline: "Cape Town firewood, ranked by rand per kilogram.",
    summary:
      "Firewood is advertised by the bag, the crate and the load, which makes " +
      "vendors' prices impossible to compare at a glance. Wood Wiz normalises " +
      "all of them to rand per kilogram and puts delivery cost and stock status " +
      "beside the number. Storefronts across Shopify, WooCommerce and Wix are " +
      "scraped daily into a JSON file the site reads directly, so there's no " +
      "database to run.",
    kind: "application",
    category: "ShoppingApplication",
    stack: ["Next.js", "TypeScript", "Cheerio", "Zod", "Vercel"],
    links: {
      live: "https://woodwiz.sheetsolved.com",
      source: "https://github.com/ces0491/wood-wiz",
    },
    status: "live",
    featured: false,
  },
  {
    slug: "cranexplorer",
    name: "cranExploreR",
    tagline: "Whether a CRAN package is safe to depend on.",
    summary:
      "Choosing a dependency is a decision that's cheap to make and expensive " +
      "to undo: a package that loses its maintainer becomes a liability years " +
      "after it was added. cranExploreR reads CRAN's own APIs for download " +
      "history, release timeline, reverse dependencies and maintenance " +
      "signals, and combines them into a viability score so the question can " +
      "be answered before the dependency is taken on.",
    kind: "application",
    category: "DeveloperApplication",
    stack: ["R", "Shiny", "bslib", "plotly", "httr2"],
    links: {
      live: "https://019d3e9e-b1a7-77dc-9266-40ce0b717eb3.share.connect.posit.cloud/",
      source: "https://github.com/ces0491/cranExploreR",
    },
    status: "live",
    featured: false,
  },
  {
    slug: "contriscape",
    name: "contriscape",
    tagline: "Fly through a 3D city built from anyone's GitHub contributions.",
    summary:
      "Enter a GitHub username and that history becomes a city, one tower per " +
      "day, with alleys wide enough to fly a ship down. The autopilot replays " +
      "the history as a flight, so the city rises as the dates pass. Milestones " +
      "float over the days they happened, as badges to shoot. It reads GitHub's " +
      "API through a small proxy that keeps the token on the server, and caches " +
      "at the CDN so repeat visits don't touch GitHub at all.",
    kind: "application",
    category: "DeveloperApplication",
    stack: ["TypeScript", "three.js", "Vite", "GitHub GraphQL API", "Vercel"],
    links: {
      live: "https://contriscape.sheetsolved.com",
      source: "https://github.com/ces0491/contriscape",
    },
    status: "live",
    featured: true,
  },
  {
    slug: "fx-tracker",
    name: "FX Tracker",
    tagline: "Exchange rate forecasts, scored against what actually happened.",
    summary:
      "Daily exchange rates for any pair of currencies, with technical " +
      "indicators and forecasts from a range of statistical models, each drawn " +
      "as a fan of prediction intervals. Every forecast comes with its model's " +
      "track record: refitted each week over the past year, and scored against " +
      "the rate that followed and against simply assuming no change. Rates are " +
      "Frankfurter's blended daily rates from central banks, cached at the CDN, " +
      "and the models are tested against reference values computed in R.",
    kind: "application",
    category: "FinanceApplication",
    stack: ["JavaScript", "Next.js", "Recharts", "Frankfurter API", "Vitest", "Vercel"],
    links: {
      live: "https://fx.sheetsolved.com",
      source: "https://github.com/ces0491/fx-tracker",
    },
    status: "live",
    featured: false,
  },
  {
    slug: "sight-word-stories",
    name: "Sight Word Stories",
    tagline:
      "Illustrated stories built from the sight words a child is learning, to read together.",
    summary:
      "A grown-up picks the sight words a child is practising, by typing them, " +
      "uploading a list, scanning a page or choosing from the Dolch lists, and " +
      "the child gets a short story built around them, illustrated page by page " +
      "with the same characters throughout. The child taps any word to hear it, " +
      "or has a page read aloud with each word lit up as it's spoken, and " +
      "finishes with a word hunt. The classic engine builds a day in a child's " +
      "life from written scenes and draws each page in code, in the browser. An " +
      "optional AI mode writes the story with Claude instead, and the server " +
      "checks which sight words it used. Settings for ADHD, dyslexia, autism, " +
      "English learners and visual processing change how a story is shown. " +
      "Stories can be printed, or saved and shared by link.",
    kind: "application",
    category: "EducationalApplication",
    stack: [
      "JavaScript",
      "Next.js",
      "MongoDB",
      "NextAuth.js",
      "Claude API",
      "Tesseract.js",
      "Vercel",
    ],
    links: {
      live: "https://sight-word-app.vercel.app",
      source: "https://github.com/ces0491/sight-word-app",
    },
    status: "live",
    featured: false,
  },
];

/** Featured first, then the rest, each group keeping the order declared above. */
export const ORDERED_PROJECTS: Project[] = [
  ...PROJECTS.filter((p) => p.featured),
  ...PROJECTS.filter((p) => !p.featured),
];

/** How many projects a list leads with: one row on the index. */
export const LEADING_PROJECTS = 3;

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
