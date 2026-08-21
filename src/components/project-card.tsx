import Link from "next/link";

import { STATUS_LABEL, type Project } from "@/content/projects";

/**
 * One project, in a list.
 *
 * The card links to the case study where there is one and out to the thing
 * itself where there is not, so no card is ever a dead end. A project with
 * neither is still shown, because the portfolio is a record rather than a
 * set of adverts.
 */
export function ProjectCard({ project }: { project: Project }) {
  const caseStudy = project.caseStudy?.length ? `/built/${project.slug}` : undefined;
  const external = project.links.live ?? project.links.docs ?? project.links.cran ?? project.links.source;

  return (
    <article className="flex flex-col rounded-lg border border-border bg-surface p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold tracking-tight">{project.name}</h3>
        <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs text-muted">
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      <p className="mt-2 text-sm text-muted">{project.tagline}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Built with">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded border border-border px-1.5 py-0.5 text-xs text-muted">
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        {caseStudy ? (
          <Link href={caseStudy} className="font-medium text-accent hover:underline">
            Read the case study
          </Link>
        ) : null}
        {project.links.live ? (
          <a href={project.links.live} className="text-muted hover:text-foreground">
            Visit
          </a>
        ) : null}
        {project.links.cran ? (
          <a href={project.links.cran} className="text-muted hover:text-foreground">
            CRAN
          </a>
        ) : null}
        {project.links.docs ? (
          <a href={project.links.docs} className="text-muted hover:text-foreground">
            Documentation
          </a>
        ) : null}
        {project.links.source && !caseStudy ? (
          <a href={project.links.source} className="text-muted hover:text-foreground">
            Source
          </a>
        ) : null}
        {!caseStudy && !external ? <span className="text-muted">Private</span> : null}
      </div>
    </article>
  );
}
