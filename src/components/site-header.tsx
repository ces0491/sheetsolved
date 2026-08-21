import Link from "next/link";

import { SITE } from "@/lib/site";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/built", label: "Built" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-5">
        <Link href="/" className="font-semibold tracking-tight hover:text-accent">
          {SITE.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-6 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
