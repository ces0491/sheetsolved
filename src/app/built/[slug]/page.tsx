import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CASE_STUDIES, projectBySlug, STATUS_LABEL } from "@/content/projects";
import { SITE } from "@/lib/site";
import { projectJsonLd } from "@/lib/structured-data";

/**
 * Only projects carrying a case study get a page.
 *
 * A generated page per project would give most of them a heading and a
 * paragraph already shown on the index, which is a thin page competing with
 * a better one for the same query.
 */
export function generateStaticParams() {
  return CASE_STUDIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: `/built/${project.slug}` },
    openGraph: {
      title: `${project.name} | ${SITE.name}`,
      description: project.tagline,
      url: `/built/${project.slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project?.caseStudy?.length) notFound();

  const { links } = project;

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />

      <header className="field overflow-hidden border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
          <div className="enter">
            {/*
              The status sits on the top rule rather than beside the title: a
              name long enough to wrap pushes an inline badge onto a line of
              its own, where it reads as orphaned rather than as metadata.
            */}
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/built"
                className="underline-grow font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-foreground"
              >
                ← All projects
              </Link>
              <span className="shrink-0 rounded-full border border-border bg-surface-raised px-2.5 py-0.5 text-xs text-muted">
                {STATUS_LABEL[project.status]}
              </span>
            </div>

            <h1 className="mt-8 text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
              {project.name}
            </h1>

            <p className="mt-6 text-pretty text-lg leading-relaxed text-muted">
              {project.summary}
            </p>

            <ul className="mt-8 flex flex-wrap gap-1.5" aria-label="Built with">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-border bg-surface-raised px-2 py-0.5 font-mono text-[0.6875rem] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
              {links.live ? (
                <a
                  href={links.live}
                  className="rounded-full bg-accent px-5 py-2.5 font-medium text-accent-contrast shadow-card transition-all hover:-translate-y-px hover:shadow-lift"
                >
                  Visit {project.name.split(" ")[0]}
                </a>
              ) : null}
              {links.cran ? (
                <a href={links.cran} className="underline-grow text-muted hover:text-foreground">
                  CRAN
                </a>
              ) : null}
              {links.docs ? (
                <a href={links.docs} className="underline-grow text-muted hover:text-foreground">
                  Documentation
                </a>
              ) : null}
              {links.source ? (
                <a href={links.source} className="underline-grow text-muted hover:text-foreground">
                  Source
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        {project.caseStudy.map((section, index) => (
          <section key={section.heading} className="reveal mt-16 first:mt-0">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-3 text-pretty text-2xl font-semibold tracking-tight sm:text-3xl">
              {section.heading}
            </h2>
            <div className="mt-5 space-y-5 text-pretty leading-relaxed">
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            {section.figures ? (
              <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                {section.figures.map((figure) => (
                  <div key={figure.label} className="bg-surface-raised px-6 py-7">
                    <dt className="text-sm text-muted">{figure.label}</dt>
                    <dd className="mt-2 font-mono text-3xl font-semibold tracking-tight text-accent">
                      {figure.value}
                    </dd>
                    {/* A figure without its scope misleads, so the note is not optional in practice. */}
                    {figure.note ? (
                      <p className="mt-3 text-xs leading-relaxed text-muted">{figure.note}</p>
                    ) : null}
                  </div>
                ))}
              </dl>
            ) : null}
          </section>
        ))}

        <footer className="reveal mt-20 rounded-3xl border border-border bg-surface px-8 py-12 sm:px-12">
          <h2 className="text-pretty text-2xl font-semibold tracking-tight">
            Interested in work like this?
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted">
            The method is the same whatever the subject is — measure it, publish what you measured
            it over, and make the logic explicit enough to change safely.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a
              href={`mailto:${SITE.email}`}
              className="rounded-full bg-accent px-5 py-2.5 font-medium text-accent-contrast shadow-card transition-all hover:-translate-y-px hover:shadow-lift"
            >
              {SITE.email}
            </a>
            <Link href="/built" className="underline-grow text-muted hover:text-foreground">
              All projects
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
