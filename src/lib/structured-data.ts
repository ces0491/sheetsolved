import { PROJECTS, type Project } from "@/content/projects";
import { SITE, SITE_URL } from "@/lib/site";

/**
 * Machine-readable identity.
 *
 * This is the half of the site a search engine and an answer engine read
 * rather than render. It is derived from the same constants and the same
 * project collection the pages use, so it cannot describe a portfolio the
 * site does not show.
 */

export function organisationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organisation`,
    name: SITE.name,
    description: SITE.description,
    url: SITE_URL,
    email: SITE.email,
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pinelands",
      addressRegion: "Western Cape",
      addressCountry: "ZA",
    },
    founder: { "@id": `${SITE_URL}/#person` },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: SITE.owner,
    email: SITE.email,
    jobTitle: "Data and analytics consultant",
    url: SITE_URL,
    sameAs: [SITE.github],
    worksFor: { "@id": `${SITE_URL}/#organisation` },
  };
}

/**
 * One entry per project.
 *
 * `SoftwareSourceCode` rather than `SoftwareApplication` for anything without
 * a running instance: a package and a book are not applications, and claiming
 * otherwise is the kind of overreach that gets structured data ignored.
 */
export function projectJsonLd(project: Project) {
  const url = project.links.live ?? project.links.docs ?? project.links.source;
  return {
    "@context": "https://schema.org",
    "@type": project.links.live ? "SoftwareApplication" : "SoftwareSourceCode",
    name: project.name,
    description: project.summary,
    url,
    ...(project.links.live ? { applicationCategory: "BusinessApplication" } : {}),
    programmingLanguage: project.stack,
    author: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#organisation` },
  };
}

export function portfolioJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/built#collection`,
    name: `Built by ${SITE.name}`,
    url: `${SITE_URL}/built`,
    hasPart: PROJECTS.map((p) => projectJsonLd(p)),
  };
}
