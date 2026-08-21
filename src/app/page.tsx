import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/content/projects";
import { SERVICES, SITE } from "@/lib/site";

export default function Home() {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="border-b border-border py-20 sm:py-28">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{SITE.tagline}</h1>
        <p className="mt-4 text-xl text-muted">{SITE.strapline}</p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <a
            href={`mailto:${SITE.email}`}
            className="rounded bg-accent px-4 py-2 font-medium text-accent-contrast hover:opacity-90"
          >
            Start a conversation
          </a>
          <Link
            href="/built"
            className="rounded border border-border px-4 py-2 font-medium hover:border-accent hover:text-accent"
          >
            See what I have built
          </Link>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Approach</h2>
        <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed">
          <p>
            I believe in keeping things simple. Your business comes with many complexities, and
            modelling those complexities matters. But complex functionality should not be complex
            to use, to update, or to understand.
          </p>
          <p>
            Let me unlock the true power of your spreadsheets by using programming principles to
            make your business logic robust, scalable and easy to use.
          </p>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 border-b border-border py-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Services</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div key={service.title}>
              <h3 className="font-semibold tracking-tight">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border py-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Experience</h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed">
          My experience spans quantitative roles across asset management, management consulting,
          e-commerce and technology. I have been building and refactoring spreadsheets in each of
          those industries, for large listed companies right down to micro enterprises.
        </p>
      </section>

      <section className="border-b border-border py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Built</h2>
          <Link href="/built" className="text-sm text-accent hover:underline">
            All projects
          </Link>
        </div>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed">
          The same standards applied to my own work. Each of these is running, published, or
          both — and each one shows the method rather than only the result.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 py-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Contact</h2>
        <dl className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-muted">Email</dt>
            <dd className="mt-1">
              <a href={`mailto:${SITE.email}`} className="hover:text-accent">
                {SITE.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">WhatsApp</dt>
            <dd className="mt-1">
              <a href={SITE.whatsappHref} className="hover:text-accent">
                {SITE.whatsapp}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Based in</dt>
            <dd className="mt-1">{SITE.location}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
