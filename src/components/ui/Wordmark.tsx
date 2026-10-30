// Inline so the URL carries the GitHub Pages base path (a CSS class can't read it).
const mask = `url(${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/glaecier-wordmark.png) center / contain no-repeat`;

/** The real Glaecier wordmark (from glaecier.com), drawn as a mask so it takes the current text colour. */
export function Wordmark({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`block aspect-[3590/1010] bg-current ${className}`} style={{ mask, WebkitMask: mask }} />;
}
