import { describe, expect, it } from "vitest";

import { PROJECTS } from "@/content/projects";
import { projectJsonLd } from "@/lib/structured-data";

const typeOf = (slug: string) => {
  const project = PROJECTS.find((candidate) => candidate.slug === slug);
  return project && projectJsonLd(project)["@type"];
};

describe("projectJsonLd", () => {
  it("types a project by what it is, whether or not it has a running site", () => {
    expect(typeOf("ready-before-run")).toBe("Book");
    expect(typeOf("tech-perspectives")).toBe("Blog");
    expect(typeOf("tidylearn")).toBe("SoftwareSourceCode");
    expect(typeOf("rtp")).toBe("SoftwareApplication");
  });

  it("gives an application category to applications and nothing else", () => {
    for (const project of PROJECTS) {
      expect(Boolean(projectJsonLd(project).applicationCategory)).toBe(
        project.kind === "application",
      );
    }
  });

  it("doesn't publish a stack as programming languages", () => {
    for (const project of PROJECTS) {
      expect(projectJsonLd(project)).not.toHaveProperty("programmingLanguage");
    }
  });
});
