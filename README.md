# Sheet Solved

The consultancy site for [Sheet Solved](https://sheetsolved.com), and the hub of
a four-property discoverability effort. Static Next.js, no client JavaScript on
any route.

## Why a repo rather than a page

Every project added from here on needs an entry, and that list only grows. The
site it replaces was assembled by clicking, and could not emit per-project
structured data, control canonical tags, or generate a sitemap from its own
content — which is the layer the whole effort operates at.

## The portfolio is data

`src/content/projects.ts` holds one typed entry per project. The `/built`
index, each case study, the footer's outbound links, the sitemap, the JSON-LD
and the Open Graph cards are all derived from it.

**Adding a project is adding an entry, never authoring a page.** Three
consequences worth knowing before you edit it:

- **Only a project with a `caseStudy` gets a page of its own.**
  `generateStaticParams` reads `CASE_STUDIES`. A generated page per project
  would give most of them a heading and a paragraph already shown on the index
  — a thin page competing with a better one for the same query.
- **Every figure in a case study carries its scope.** RTP's `70.9%` is
  published with "3,673 matches, 1871 to 2026", because that is not the
  accuracy to expect on a modern fixture. `CaseStudyFigure.note` exists for
  this, and a figure without one misleads.
- **The footer lists only projects with somewhere to send a reader**, derived
  rather than hand-listed, so a new entry appears without anyone remembering.

## The mark has one definition

`src/lib/brand.json` holds the palette and the geometry, stored resolved rather
than parametric. It is read by the `Mark` and `Logo` components, the favicon
route, the site-wide Open Graph card, the per-project cards, and the root
layout, which injects the brand navy as the CSS variable the stylesheet's
accent tokens read.

**There is no static icon file, deliberately.** Nothing imports a favicon, so a
stale one would build, deploy and serve without complaint. Generating it at
build means there is no second copy of the geometry to go stale.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

## Quality gates

```bash
npm run lint     # eslint; the --max-warnings 0 lives in the script, not in CI
npm run build    # type check runs inside this
```

`.github/workflows/ci.yml` runs both on every push and pull request to `main`,
on Node 24 to match the deployment runtime. There is no test suite.

## Configuration

`NEXT_PUBLIC_SITE_URL` is the only knob. `src/lib/site.ts` reads it first, and
the sitemap, robots policy, canonical URLs and structured data all follow. On a
production deployment it falls back to `https://sheetsolved.com`; a preview
advertises its own hostname so it cannot compete with production for the same
queries.

## Hub and spoke

Four properties, one brand, reciprocal links. Each spoke is its own repo on its
own subdomain.

| | subdomain | repo |
| --- | --- | --- |
| Hub | `sheetsolved.com` | [sheetsolved](https://github.com/ces0491/sheetsolved) |
| RTP | `rtp.` | [rugby-tournament-predictor](https://github.com/ces0491/rugby-tournament-predictor) |
| tidylearn | `tidylearn.` | [tidylearn](https://github.com/ces0491/tidylearn) |
| Ready Before Run | `rbr.` | [rbr](https://github.com/ces0491/rbr) |
| Blog | `blog.` | [tech-perspectives](https://github.com/ces0491/tech-perspectives) |

RTP is split by audience rather than by topic: `sheetsolved.com/built/rtp` is
the case study, written for clients, and `rtp.sheetsolved.com` is the
application, for the rugby audience arriving from search.
