# SCOPE — sheetsolved

## Purpose

The Sheet Solved consultancy site and the hub of the six-property discoverability
effort, so someone looking for this kind of help can find the practice and judge
it from what's been built.

## Done

This site is maintained rather than finished, so these are conditions that hold
on `main` and on the live site, not a one-off release.

- [ ] CI passes on `main`: lint, formatting, tests and build
- [ ] `npm audit` reports nothing, and no dependency is deprecated
- [ ] Each page names its own canonical, and the sitemap lists only pages meant
      to be indexed
- [ ] A live page requests nothing from a third-party origin
- [ ] A project's measured figures are read from the project, and each carries a
      note saying what it covers
- [ ] A claim about a spoke matches that spoke on the day it's written, and
      counts stay out of its entry
- [ ] Adding a project is one entry in `src/content/projects.ts`

## Out of scope

- Client components, a UI library, or a third-party script of any kind
- A contact form, CMS, comments or accounts
- Named client engagements, and a metrics band
- Hosting the spokes: the blog, the book, tidylearn's docs, RTP and Wood Wiz each
  live in their own repo
- Raising the DMARC policy, which is its own piece of work
- TypeScript 7, until `eslint-config-next` loads with it

## Bar

Production, for a static site. Quality gates run on every push, and copy is held
to the same evidence standard as code: a claim that can't be checked is cut.
No uptime target, on-call or load testing, because there's no server of ours to
keep up and Vercel serves the pages from cache.

## Decision

Ces, reviewing the live site after a deploy. A change isn't done until it's been
checked on the deployed page.

## Revision history

- 2026-10-30: initial scope
