import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/content/projects";
import { SERVICES, SITE } from "@/lib/site";

/**
 * The eyebrow above a section heading.
 *
 * Mono at label size against sans at display size is the whole typographic
 * system here — the site already loads two faces, and the second one is used
 * for the things that are labels rather than prose.
 */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent sm:tracking-[0.18em]">{children}</p>;
}

/**
 * The tagline splits at its own comma so the second half can carry the accent.
 *
 * Derived rather than stored as two strings, because the whole line is also
 * the Open Graph card's headline and the two must not be able to disagree.
 * A tagline without a comma simply renders as one piece.
 */
function Tagline() {
  const [head, ...rest] = SITE.tagline.split(/,\s*/);
  const tail = rest.join(", ");

  return (
    <h1 className="mt-6 text-pretty text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
      {head}
      {tail ? (
        <>
          ,<br />
          <span className="text-accent">{tail}</span>
        </>
      ) : null}
    </h1>
  );
}

export default function Home() {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <>
      <section className="field overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-28 sm:px-8 sm:pt-36 sm:pb-40">
          <div className="enter max-w-3xl">
            <SectionLabel>{SITE.eyebrow}</SectionLabel>
            <Tagline />
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              {SITE.intro}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm">
              <a
                href={`mailto:${SITE.email}`}
                className="rounded-full bg-accent px-6 py-3 font-medium text-accent-contrast shadow-card transition-all hover:-translate-y-px hover:shadow-lift"
              >
                Start a conversation
              </a>
              <Link
                href="/built"
                className="rounded-full border border-border-strong px-6 py-3 font-medium transition-colors hover:border-accent hover:bg-tint hover:text-accent"
              >
                See what I have built
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-28">
        <div className="reveal grid gap-8 lg:grid-cols-[19rem_1fr] lg:gap-20">
          <div>
            <SectionLabel>Approach</SectionLabel>
            <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
              Complex should not mean complicated.
            </h2>
          </div>
          <div className="max-w-2xl space-y-6 text-pretty text-lg leading-relaxed sm:text-xl">
            <p>
              I keep things simple. Your business carries real complexity, and modelling that
              complexity properly matters — but complex functionality should not be complex to
              use, to update, or to understand.
            </p>
            <p className="text-muted">
              Most of what I am asked to fix was not built badly. It was built once, quickly, for
              a situation that has since changed, and then relied on for years afterwards. The
              work is rarely about clever technique. It is about making the logic explicit enough
              that somebody other than its author can change it without breaking it.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
          <div className="reveal">
            <SectionLabel>Services</SectionLabel>
            <h2 className="mt-4 max-w-2xl text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
              Six things I am usually brought in to do.
            </h2>
          </div>

          {/*
            Laid out as cells sharing their rules. The gap is the border colour
            showing through, which gives clean shared edges at every breakpoint
            without a stray outer rule to correct for.
          */}
          <ul className="reveal mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <li
                key={service.title}
                className="group bg-surface-raised p-7 transition-colors hover:bg-tint sm:p-8"
              >
                <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-semibold tracking-tight">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="practice" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
          <div className="reveal grid gap-8 lg:grid-cols-[19rem_1fr] lg:gap-20">
            <div>
              <SectionLabel>Practice</SectionLabel>
              <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                Where the work is now.
              </h2>
            </div>
            <div className="max-w-2xl space-y-6 text-pretty leading-relaxed">
              <p className="text-lg sm:text-xl">
                I am the contracted technical lead for a music distribution company, responsible
                for the whole stack: an ETL pipeline ingesting streaming data from more than ten
                platforms into a time-series database, a client-facing dashboard, an internal
                admin system, and the CI that keeps all three honest.
              </p>
              <p className="text-muted">
                Before consulting, quantitative roles across asset management, management
                consulting, e-commerce and technology — for large listed companies down to micro
                enterprises.
              </p>
              <p className="rounded-xl border-l-2 border-accent bg-tint px-5 py-4 text-muted">
                The name is where this started. A spreadsheet is usually the first place a
                business writes its real logic down, so it is still where a good number of
                engagements begin. It is no longer where most of them end.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>Built</SectionLabel>
              <h2 className="mt-4 max-w-2xl text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                The same standards, applied to my own work.
              </h2>
            </div>
            <Link href="/built" className="underline-grow text-sm font-medium text-accent">
              All projects →
            </Link>
          </div>

          <p className="reveal mt-6 max-w-2xl text-pretty leading-relaxed text-muted">
            Consulting work belongs to the client, so these are what I can show. Each one is
            running, published, or both — and each shows the method rather than only the result.
          </p>

          <div className="reveal mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32">
          <div className="reveal field overflow-hidden rounded-3xl border border-border bg-surface-raised px-8 py-14 shadow-card sm:px-14 sm:py-20">
            <div className="max-w-2xl">
              <SectionLabel>Contact</SectionLabel>
              <h2 className="mt-4 text-pretty text-3xl font-semibold tracking-tight sm:text-4xl">
                Tell me what is not working.
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted">
                A process that costs too much attention, a number nobody can trace, a model that
                has outgrown where it lives. I will tell you what I would do about it before you
                have to commit to anything.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={`mailto:${SITE.email}`}
                  className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-contrast shadow-card transition-all hover:-translate-y-px hover:shadow-lift"
                >
                  {SITE.email}
                </a>
                <p className="text-sm text-muted">{SITE.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
