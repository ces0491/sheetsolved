import type { ReactNode } from "react";

/**
 * The rest of a project list, behind a toggle.
 *
 * A `<details>`, because collapsed projects stay in the served HTML as crawlable
 * content and the toggle needs no JavaScript.
 *
 * The group is named because a card's hover state is `group-hover`, which
 * matches any `.group` above it. A plain `group` here would light up every card
 * in the list whenever the pointer was over any one of them.
 */
export function MoreProjects({
  className = "",
  summaryClassName,
  children,
}: {
  className?: string;
  summaryClassName: string;
  children: ReactNode;
}) {
  return (
    <details className={`group/more ${className}`}>
      <summary
        className={`w-fit cursor-pointer list-none [&::-webkit-details-marker]:hidden ${summaryClassName}`}
      >
        More projects{" "}
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 group-open/more:rotate-90"
        >
          →
        </span>
      </summary>
      {children}
    </details>
  );
}
