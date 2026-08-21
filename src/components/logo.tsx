import { MARK } from "@/lib/brand";
import { SITE } from "@/lib/site";

/**
 * The mark on its own.
 *
 * Colour comes from `currentColor` rather than a prop, so the mark takes the
 * colour of whatever it sits in and needs no dark-mode variant of its own.
 */
export function Mark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={MARK.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={MARK.strokeWidth}
      strokeLinejoin={MARK.strokeLinejoin}
      strokeLinecap={MARK.strokeLinecap}
      className={className}
      role="img"
      aria-label={`${SITE.name} mark`}
    >
      {MARK.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/**
 * The mark with the name beside it.
 *
 * The strapline is deliberately not part of this: a lockup carrying a sentence
 * cannot be used small, which is why the old logo files had a separate glyph
 * for the favicon in the first place.
 */
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <Mark size={size} className="text-accent" />
      <span className="text-lg font-semibold tracking-tight">{SITE.name}</span>
    </span>
  );
}
