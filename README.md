# Sheet Solved

The consultancy site for [Sheet Solved](https://sheetsolved.com), and the hub of
a four-property discoverability effort. Static Next.js, and no client
JavaScript beyond Vercel Web Analytics — which is served from this origin, so
the page still requests nothing from a third-party host.

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
- **The name and the address live in `SITE` in parts**, because the footer
  wants a sentence, the JSON-LD wants `PostalAddress` fields and a vCard wants
  semicolon-separated components. Assembling three shapes from one definition
  beats writing the address down three times.

## What the site says it does

The name is where the practice started, not the size of it. The copy is written
so a reader leaves knowing this builds data and software systems — pipelines,
models, applications, dashboards — with spreadsheet work as one service among
six rather than the frame around the others.

Two things carry that and are easy to undo by accident:

- **`SITE.description` in `src/lib/site.ts` is the machine-readable version of
  it.** It is the meta description, the Open Graph description and the
  `ProfessionalService` description in the JSON-LD. Narrowing it back to
  spreadsheets narrows all three at once.
- **The origin is explained once, in the Practice section, and nowhere else.**
  Repeating it in the hero, the services and the experience copy is what made
  the previous version read as a spreadsheet consultancy that also did other
  things.

`SITE.tagline` continues the name's own construction — "Sheet Solved",
"Complexity, Solved." — so the name reads as the first of a pattern. It is also
the Open Graph card's headline, which is why it is one string rather than two: the home page splits it at its own comma to
colour the second half, and the card cannot end up saying something different.

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
  point is being found, that is not a trade worth making for a fade. This was
  caught by screenshotting the built page, not by reading the CSS.

**Screenshot before adopting a visual change**, in both colour schemes. The
repo already learned this from the mark; it applies to the page too.

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
