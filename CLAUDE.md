# CLAUDE.md — Sheet Solved

@AGENTS.md

## What this is

The hub of a four-property discoverability strategy, and the Sheet Solved
consultancy site. It replaces a GoDaddy Website Builder site that is **still
live on the apex domain** — see "The apex has not moved" below before touching
DNS.

- **Stack**: Next.js 16 (App Router), React 19, Tailwind 4, TypeScript, static
- **Repo**: `github.com/ces0491/sheetsolved` (public)
- **Vercel**: `vercel.com/cesaires-projects/sheetsolved`
- **No client JS on any route.** Every page is static or SSG

## Quality gates

```bash
npm run lint     # eslint, must be zero warnings as well as zero errors
npm run build    # type check runs inside this
```

There is no test suite and **no CI workflow yet**. Adding one is outstanding
work — the repo currently has gates nothing runs.

## Why this exists rather than a page on the old site

The hub is infrastructure, not a brochure. Every project added from here on
needs an entry, and that list only grows. Website Builder makes each of those a
page somebody assembles by clicking, and cannot emit per-project structured
data, control canonical tags, or generate a sitemap from its own content —
which is the exact layer the whole discoverability effort operates at.

## The portfolio is data

`src/content/projects.ts` is one typed entry per project. The `/built` index,
each case study, the footer's outbound links, the sitemap and the JSON-LD are
all derived from it.

**Adding a project is adding an entry, never authoring a page.** Nothing about
a project is written down twice. Three consequences:

- **Only a project with a `caseStudy` gets its own page.** `generateStaticParams`
  reads `CASE_STUDIES`. A generated page per project would give most of them a
  heading and a paragraph already shown on the index — a thin page competing
  with a better one for the same query.
- **Every figure in a case study carries its scope.** RTP's `70.9%` is published
  with "3,673 matches, 1871 to 2026" because that is not the accuracy to expect
  on a modern fixture. `CaseStudyFigure.note` exists for this; a figure without
  it misleads.
- **The footer lists only projects with somewhere to send a reader**, derived
  rather than hand-listed, so a new entry appears without anyone remembering.

## The mark has one definition

`src/lib/brand.json` holds the palette and the geometry, stored **resolved**
rather than parametric. It is read by:

- `src/components/logo.tsx` — the `Mark` and `Logo` components
- `src/app/icon.tsx` — the favicon, generated at build rather than stored
- `src/app/opengraph-image.tsx` — the share card
- `src/app/layout.tsx` — which injects `--brand-navy` / `--brand-navy-light` as
  CSS variables that `globals.css` reads for its accent tokens

Four things are load-bearing:

- **There is no static icon file, deliberately.** Nothing imports a favicon, so
  a stale one builds, deploys and serves without complaint. Generating it means
  there is no second copy of the geometry to go stale. Do not "simplify" this
  back to a committed `icon.svg`.
- **The site accent *is* the brand navy**, injected from `brand.json`. The
  scaffold shipped a teal accent and the site spent a commit fighting its own
  mark. The stylesheet must never restate a brand colour as a literal.
- **The mark takes `currentColor`**, so it needs no dark-mode variant — it
  inherits whatever it sits in. Dark lifts the accent to a periwinkle because
  the navy disappears against the dark ground.
- **The strapline is not part of the lockup.** A mark carrying a sentence
  cannot be used small, which is why the old brand folder already had a
  separate glyph for its favicon.

### The mark's geometry was chosen by looking, not by reasoning

The adopted mark is a cell with two open corners containing a squared C and a
T — the initials, and a route through the sheet. It replaces a six-stroke maze
whose channels were the same width as its strokes, so it filled in solid at
16px.

Two findings from that process are worth not repeating:

- **An earlier candidate read as the copy/duplicate icon.** A frame with open
  corners plus an interior L reads as two offset rounded squares, which is a
  common UI glyph. It was invisible in the path data and obvious on screen.
- **The C's foot and the T's stem compete for the same space.** The foot stops
  short and the T sits right of centre; that channel is the whole reason the
  mark still resolves at 16px. Lengthening the foot to "balance" it undoes the
  fix.

**Render a mark and look at it before adopting it.** Playwright's browsers are
cached locally; screenshot at 16, 24, 32 and 64px in both themes.

## The apex has not moved

`sheetsolved.com` still serves the GoDaddy Website Builder site. DNS is managed
at GoDaddy and holds ~15 records.

- **Preview on the Vercel URL first.** The apex `A` record changes last, once
  the new site has been seen and approved.
- **Never touch the MX records.** Moving the website does not require it, and
  that is how somebody breaks their own email.
- **`NEXT_PUBLIC_SITE_URL` is the only knob.** `src/lib/site.ts` reads it first;
  the sitemap, robots policy, canonical URLs and structured data all follow. It
  must be set to `https://sheetsolved.com` on Vercel production, or the sitemap
  publishes `localhost`.

## Hub and spoke

Four properties, one brand, reciprocal links. The hub is this repo; each spoke
is its own repo on its own subdomain.

| | subdomain | repo | state |
| --- | --- | --- | --- |
| Hub | `sheetsolved.com` | `sheetsolved` | built, apex not moved |
| RTP | `rtp.` | `rugby-tournament-predictor` | live on a `vercel.app` URL; needs SSR + metadata work |
| tidylearn | `tidylearn.` | `tidylearn` | pkgdown site built, in PR |
| Ready Before Run | `rbr.` | `rbr` | metadata landed, publishing |
| Blog | `blog.` | `tech-perspectives` | untouched |

All spokes CNAME to `ces0491.github.io` except RTP, which points at Vercel.

Two things about the arrangement:

- **RTP is split by audience, not by topic.** `sheetsolved.com/built/rtp` is the
  case study, written for clients; `rtp.sheetsolved.com` is the app, for the
  rugby audience arriving from search. It is the strongest portfolio piece —
  a running production system rather than a package or a book — and the pages
  carrying that argument (`/how-it-works`, `/model`, `/about`) are already
  server-rendered and indexable. The forecast pages are not, and that is the
  outstanding work there.
- **tidylearn's CRAN listing is the most valuable single asset.**
  `cran.r-project.org` is mirrored worldwide, and `URL:` in its `DESCRIPTION`
  now names the docs site. That link lands on the next release.

## Conventions that differ between these repos

**Check the branch and the repo's convention before committing.** They are not
the same:

- `rugby-tournament-predictor` — commit directly to `main`
- `tidylearn` — **feature branches and PRs into `main`**; it has a release
  history and is on CRAN
- `rbr`, `sheetsolved` — direct to `main`

This has already gone wrong once: a commit landed on tidylearn's
`feature/cloud-execution` because that was the checked-out branch, and
`git push origin main` then silently did nothing.

## Copy

- **First person singular throughout.** A consultancy of one whose contact
  section names one person is more credible in the singular, and the ported
  copy's "we" beside the new pages' "I" read as two authors.
- The hero, approach, services and experience copy is **ported from the live
  GoDaddy site**, lightly edited. It is not new writing, and rewriting it is a
  separate decision.
