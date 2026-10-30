import { PROJECTS, type Project } from "@/content/projects";
import { ADDRESS, SITE, SITE_URL } from "@/lib/site";

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
    sameAs: [SITE.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.region,
      addressCountry: ADDRESS.countryCode,
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
    jobTitle: SITE.role,
    url: SITE_URL,
    sameAs: [SITE.github, SITE.linkedinPersonal],
    worksFor: { "@id": `${SITE_URL}/#organisation` },
  };
}

/**
 * A project's type follows what it is, read from `kind`. Having a running site
 * doesn't make a book or a blog an application, and claiming otherwise is the
 * kind of overreach that gets structured data ignored.
 */
const SCHEMA_TYPE: Record<Project["kind"], string> = {
  application: "SoftwareApplication",
  package: "SoftwareSourceCode",
  book: "Book",
  blog: "Blog",
};

/**
 * One entry per project.
 *
 * `stack` is published as `keywords` because it mixes languages, libraries and
 * hosts, and only a few of its entries would be true of `programmingLanguage`.
 */
export function projectJsonLd(project: Project) {
  const url = project.links.live ?? project.links.docs ?? project.links.source;
  return {
    "@context": "https://schema.org",
    "@type": SCHEMA_TYPE[project.kind],
    name: project.name,
    description: project.summary,
    url,
    ...(project.category ? { applicationCategory: project.category } : {}),
    keywords: project.stack.join(", "),
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#organisation` },
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
