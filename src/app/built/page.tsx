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
    <div className="mx-auto max-w-5xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd()) }}
      />

      <h1 className="text-4xl font-semibold tracking-tight">Built</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
        Consulting work belongs to the client, so this is the part I can show: tools, packages
        and writing built to the same standard. Where a project measures itself, the numbers are
        published beside it rather than summarised.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ORDERED_PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
