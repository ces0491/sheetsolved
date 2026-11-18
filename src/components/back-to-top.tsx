/**
 * A way back to the top of a long page.
 *
 * A plain link to `#top`, the id on <body>, so it needs no client JavaScript
 * and keeps the site free of client components. Following it scrolls to the
 * top and moves the keyboard's starting point there too, so the next Tab
 * lands on the skip link.
 *
 * `.to-top` in globals.css keeps it hidden until the reader has scrolled most
 * of a screen, with a scroll-driven animation. Where that isn't supported it's
 * always shown. While hidden it's `visibility: hidden`, so it's out of the tab
 * order and the accessibility tree rather than an invisible stop.
 */
export function BackToTop() {
  return (
    <a
      href="#top"
      className="to-top fixed right-4 bottom-4 z-40 grid size-11 place-items-center rounded-full border border-border-strong bg-surface-raised text-muted shadow-card transition-colors hover:border-accent hover:text-accent print:hidden sm:right-6 sm:bottom-6"
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        width={18}
        height={18}
        fill="none"
        stroke="currentColor"
        strokeWidth={2.25}
        strokeLinecap="square"
        strokeLinejoin="round"
      >
        <path d="M12 19V6M6 11.5 12 5.5l6 6" />
      </svg>
      <span className="sr-only">Back to top</span>
    </a>
  );
}
