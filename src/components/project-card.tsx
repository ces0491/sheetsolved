import Link from "next/link";

import { STATUS_LABEL, type Project } from "@/content/projects";

/**
 * The status dot, as a static map.
 *
 * Written out rather than interpolated because Tailwind reads class names from
 * the source text — a template literal would produce a class nobody generated.
 */
const STATUS_DOT: Record<Project["status"], string> = {
  live: "bg-status-live",
  released: "bg-status-released",
  ongoing: "bg-status-ongoing",
};

/**
 * Everywhere a card can send a reader, best first.
 *
 * The order is the ranking: a case study says the most, a running instance
 * next, and the CRAN listing above a project's own documentation because it
 * is the page mirrored worldwide. The first entry becomes the card's primary
 * destination and the rest become the link row, so no project needs a rule of
 * its own and none can be listed twice.
 */
function destinations(project: Project): { href: string; label: string }[] {
  const { links } = project;
  return [
    ...(project.caseStudy?.length
      ? [{ href: `/built/${project.slug}`, label: "Read the case study" }]
      : []),
    ...(links.live ? [{ href: links.live, label: "Visit" }] : []),
    ...(links.cran ? [{ href: links.cran, label: "CRAN" }] : []),
    ...(links.docs ? [{ href: links.docs, label: "Documentation" }] : []),
    ...(links.source ? [{ href: links.source, label: "Source" }] : []),
  ];
}

/**
 * One project, in a list.
 *
 * A project with nowhere to send a reader is still shown, because the
 * portfolio is a record rather than a set of adverts.
 *
 * The primary destination stretches to cover the card, so the whole surface is
 * the target the hover state already promises it is. The secondary links sit
 * above it on the stacking order and keep their own.
 */
export function ProjectCard({ project }: { project: Project }) {
  const [primary, ...secondary] = destinations(project);
  const internal = primary?.href.startsWith("/");

  return (
    <article className="group relative flex flex-col rounded-2xl border border-border bg-surface-raised p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-hairline hover:shadow-lift">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold tracking-tight transition-colors group-hover:text-accent">
          {!primary ? (
            project.name
          ) : internal ? (
            <Link href={primary.href} className="after:absolute after:inset-0 after:rounded-2xl">
              {project.name}
            </Link>
          ) : (
            <a href={primary.href} className="after:absolute after:inset-0 after:rounded-2xl">
              {project.name}
            </a>
          )}
        </h3>
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 text-xs text-muted">
          <span aria-hidden className={`size-1.5 rounded-full ${STATUS_DOT[project.status]}`} />
          {STATUS_LABEL[project.status]}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">{project.tagline}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-surface px-2 py-0.5 font-mono text-[0.6875rem] text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm">
        {primary ? (
          <span className="font-medium text-accent">
            {primary.label}{" "}
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        ) : (
          <span className="text-muted">Private</span>
        )}

        {secondary.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="underline-grow relative z-10 text-muted hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
