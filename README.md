# Sheet Solved

The consultancy site for [Sheet Solved](https://sheetsolved.com), and the hub of
a six-property discoverability effort. Static Next.js with no client
components of its own: the browser gets Next's runtime plus Vercel Web
Analytics and Speed Insights, all served from this origin, so the page requests
nothing from a third-party host.

## Why a repo rather than a page

Every project added from here on needs an entry, and that list only grows. The
site it replaces was assembled by clicking, and could not emit per-project
structured data, control canonical tags, or generate a sitemap from its own
content — which is the layer the whole effort operates at.

## The portfolio is data

`src/content/projects.ts` holds one typed entry per project. The `/built`
index, each case study, the footer's outbound links, the sitemap, the JSON-LD
and the Open Graph cards are all derived from it.

**Adding a project is adding an entry, never authoring a page.** What follows
from that, before you edit it:

- **Only a project with a `caseStudy` gets a page of its own.**
  `generateStaticParams` reads `CASE_STUDIES`. A generated page per project
  would give most of them a heading and a paragraph already shown on the index
  — a thin page competing with a better one for the same query.
- **Every figure in a case study carries its scope.** A percentage measured
  over a century and a half of mostly tier-two fixtures isn't the accuracy to
  expect on a modern Test. `CaseStudyFigure.note` exists for this, and a figure
  without one misleads.
- **A project that measures itself has its figures read, not copied.** The
  section sets `figuresFrom: "rtp-model"` and `src/lib/rtp.ts` reads
  `rtp.sheetsolved.com/api/model` at build, on the same one-hour window the
  blog feed uses. RTP scores its rating engine and its published forecast
  separately, so the panel reads both and labels them apart. The feature list
  is read too, and the notes state what a figure covers.
- **Counts about a spoke stay out of its entry.** A vendor count or a list of
  competitions goes stale without anything here noticing, so a summary describes
  the project and leaves the number to the project's own site.
- **The footer lists only projects with somewhere to send a reader**, derived
  rather than hand-listed, so a new entry appears without anyone remembering.
- **The home page, `/built` and the footer lead with the same three projects**,
  the first `LEADING_PROJECTS` of `ORDERED_PROJECTS`. On `/built` and in the
  footer, `MoreProjects` puts the others in a `<details>`, which keeps them in
  the served HTML as crawlable links with no client JavaScript. The home page
  links to `/built` instead.

## Metadata is per page

Every page names its own canonical. In the root layout it is inherited by any
page that does not override it, which had `/card` declaring itself the home
page — a missing canonical only fails to consolidate, a wrong one points a
crawler elsewhere.

Next merges metadata shallowly, so a page setting `openGraph` replaces the
layout's object rather than extending it. `/built` lost its `og:image`,
`og:site_name`, `og:type` and `og:locale` that way and shared with no card at
all. Spread `OPEN_GRAPH_BASE` from `src/lib/site.ts` and override what differs.

`sheetsolved.vercel.app` 308s to the apex, host-matched in `next.config.ts`:
Vercel goes on answering on a project's generated alias after a custom domain
is attached, and it was serving the whole site.

## The mark has one definition

`src/lib/brand.json` holds the palette and the geometry, stored resolved rather
than parametric. It is read by the `Mark` and `Logo` components, the favicon
route, the home screen icon, the site-wide Open Graph card, the per-project
cards, and the root layout, which injects the brand navy as the CSS variable
the stylesheet's accent tokens read.

**There is no static icon file, deliberately.** Nothing imports a favicon, so a
stale one would build, deploy and serve without complaint. Generating it at
build means there is no second copy of the geometry to go stale.

## The contact card is derived too

`/contact.vcf` is a vCard built in `src/lib/vcard.ts` from the same constants
the pages and the structured data read, and `/card` is a page showing a QR code
that points at it — the thing to hold up when someone asks for your details.

- **The QR is generated at build**, by `qr`, from `SITE_URL`. Nothing is stored
  as an image that could go on pointing at an old address, the same reason the
  favicon is a route rather than a file.
- **Its modules are the brand navy on a tile that stays light in dark mode.**
  An inverted QR is read by some scanners and not others.
- **`/card` is not indexed and not in the sitemap.** It is a tool rather than a
  page, and its content is contact detail the home page already carries.
- **The name and the address live in `OWNER_NAME` and `ADDRESS` in parts**,
  because the footer wants a sentence, the JSON-LD wants `PostalAddress` fields
  and a vCard wants semicolon-separated components. Assembling three shapes from
  one definition beats writing the address down three times.

## What the site says it does

The name is where the practice started. The copy is written so a reader leaves
knowing this builds data and software systems — pipelines, models, applications,
dashboards — with spreadsheet work as one service among several rather than the
frame around the others.

Two things carry that and are easy to undo by accident:

- **`SITE.description` in `src/lib/site.ts` is the machine-readable version of
  it.** It is the meta description, the Open Graph description and the
  `ProfessionalService` description in the JSON-LD. Narrowing it back to
  spreadsheets narrows all three at once.
- **The origin is explained once, in the Practice section, and nowhere else.**
  Repeating it in the hero, the services and the experience copy makes the site
  read as a spreadsheet consultancy that also does other things.

`SITE.tagline` continues the name's own construction — "Sheet Solved",
"Complexity, Solved." — so the name reads as the first of a pattern. It is also
the Open Graph card's headline, which is why it is one string rather than two:
the home page splits it at its own comma to colour the second half, and the card
cannot end up saying something different.

## The look is CSS, not components

There is no UI library, and nothing in the visual system runs on the client,
so it lives in `src/app/globals.css` as tokens and four small conventions.

- **Tints, rings and shadows are mixed from the accent** with `color-mix`,
  rather than being greys or blacks. A black shadow under a navy-tinted card is
  the single most common thing that makes an otherwise careful page look flat.
  A palette change in `brand.json` carries through all of them.
- **`.field` is the ruled backdrop.** The mark is a cell with two open corners;
  the backdrop is the rest of that sheet, dissolved by a mask before it reaches
  the edge so it reads as substrate rather than subject. It is one class, no
  markup and no image, and it is the visual half of the positioning argument.
- **Grids that share their rules use `gap-px` over a border-coloured
  background**, with each cell painted `surface-raised`. The services block and
  every figure grid are built this way: clean shared edges at every breakpoint,
  no stray outer rule to correct for, and a deliberate echo of a sheet.
- **The scroll-driven reveal moves but never fades.** Writing it the usual way,
  from `opacity: 0`, leaves a scroll timeline sitting at 0% for everything
  below the fold — so a print render, a crawler taking a screenshot, or a
  reader landing on an anchor gets a page of blank bands. On a site whose whole
  point is being found, that is not a trade worth making for a fade.

**Screenshot before adopting a visual change**, in both colour schemes.

## Running it

```bash
npm ci
npm run dev      # http://localhost:3000
```

## Quality gates

```bash
npm run lint           # eslint; the --max-warnings 0 lives in the script, not in CI
npm run format:check   # prettier
npm test               # vitest
npm run build          # type check runs inside this
```

`.github/workflows/ci.yml` runs all four on every push and pull request to
`main`, on Node 24 to match the deployment runtime. The tests cover the pure
functions in `src/lib`: the feed parser, the vCard, the RTP figures and the
structured data.

## Configuration

`NEXT_PUBLIC_SITE_URL` is the only knob. `src/lib/site.ts` reads it first, and
the sitemap, robots policy, canonical URLs and structured data all follow. On a
production deployment it falls back to `https://sheetsolved.com`; a preview
advertises its own hostname so it cannot compete with production for the same
queries.

## Hub and spoke

Six properties, one brand, reciprocal links. Each spoke is its own repo on its
own subdomain.

| | subdomain | repo |
| --- | --- | --- |
| Hub | `sheetsolved.com` | [sheetsolved](https://github.com/ces0491/sheetsolved) |
| RTP | `rtp.` | `rugby-tournament-predictor` (private) |
| Wood Wiz | `woodwiz.` | [wood-wiz](https://github.com/ces0491/wood-wiz) |
| tidylearn | `tidylearn.` | [tidylearn](https://github.com/ces0491/tidylearn) |
| Ready Before Run | `rbr.` | [rbr](https://github.com/ces0491/rbr) |
| Blog | `blog.` | [tech-perspectives](https://github.com/ces0491/tech-perspectives) |

RTP is split by audience rather than by topic: `sheetsolved.com/built/rtp` is
the case study, written for clients, and `rtp.sheetsolved.com` is the
application, for the rugby audience arriving from search.

[contriscape](https://github.com/ces0491/contriscape) and
[FX Tracker](https://github.com/ces0491/fx-tracker) also have subdomains,
`contriscape.` and `fx.`, and link back here, but they're portfolio entries
rather than any of the six.
