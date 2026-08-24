import type { Metadata } from "next";

import { ProjectCard } from "@/components/project-card";
import { ORDERED_PROJECTS } from "@/content/projects";
import { SITE } from "@/lib/site";
import { portfolioJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Built",
  description:
    "Software, packages and writing built by Sheet Solved — a rugby forecasting " +
    "engine, an R package on CRAN, a book on data science infrastructure, and more.",
  alternates: { canonical: "/built" },
  openGraph: {
    title: `Built | ${SITE.name}`,
    description:
      "Software, packages and writing built by Sheet Solved, from a forecasting " +
      "engine to a CRAN package.",
    url: "/built",
  },
};

export default function BuiltPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd()) }}
      />

      <section className="field overflow-hidden border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
          <div className="enter max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {ORDERED_PROJECTS.length} projects
            </p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">Built</h1>
            <p className="mt-7 text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              Consulting work belongs to the client, so this is the part I can show: tools, packages
              and writing built to the same standard. Where a project measures itself, the numbers
              are published beside it.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        {/*
          Named for a screen reader only. Every card heading is an `h3`, and
          without this the page steps straight from `h1` to `h3`.
        */}
        <h2 className="sr-only">All projects</h2>
        <div className="reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ORDERED_PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}
