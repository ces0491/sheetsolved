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
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />

      <Link href="/built" className="text-sm text-muted hover:text-foreground">
        &larr; All projects
      </Link>

      <header className="mt-6 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-semibold tracking-tight">{project.name}</h1>
          <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
            {STATUS_LABEL[project.status]}
          </span>
        </div>
        <p className="mt-4 text-lg leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Built with">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded border border-border px-2 py-0.5 text-xs text-muted">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {links.live ? (
            <a href={links.live} className="font-medium text-accent hover:underline">
              Visit {project.name.split(" ")[0]}
            </a>
          ) : null}
          {links.docs ? (
            <a href={links.docs} className="text-muted hover:text-foreground">
              Documentation
            </a>
          ) : null}
          {links.cran ? (
            <a href={links.cran} className="text-muted hover:text-foreground">
              CRAN
            </a>
          ) : null}
          {links.source ? (
            <a href={links.source} className="text-muted hover:text-foreground">
              Source
            </a>
          ) : null}
        </div>
      </header>

      {project.caseStudy.map((section) => (
        <section key={section.heading} className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
          <div className="mt-4 space-y-4 leading-relaxed">
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          {section.figures ? (
            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              {section.figures.map((figure) => (
                <div key={figure.label} className="rounded-lg border border-border bg-surface p-5">
                  <dt className="text-sm text-muted">{figure.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold tracking-tight">{figure.value}</dd>
                  {/* A figure without its scope misleads, so the note is not optional in practice. */}
                  {figure.note ? (
                    <p className="mt-2 text-xs leading-relaxed text-muted">{figure.note}</p>
                  ) : null}
                </div>
              ))}
            </dl>
          ) : null}
        </section>
      ))}

      <footer className="mt-16 border-t border-border pt-8">
        <p className="text-muted">
          Interested in work like this?{" "}
          <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
            {SITE.email}
          </a>
        </p>
      </footer>
    </article>
  );
}
