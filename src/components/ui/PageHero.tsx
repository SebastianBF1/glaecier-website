import type { CSSProperties, ReactNode } from "react";
import type { MediaItem } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { Photo } from "@/components/ui/Photo";

/**
 * Full-screen photo hero for the site's inner pages – the same grammar as the homepage film hero (copy lower left over
 * a bottom-weighted gradient, transparent header via data-hero), so moving between pages feels like one place.
 */
export function PageHero({ item, locale, eyebrow, title, intro, children }: { item: MediaItem; locale: Locale; eyebrow: string; title: string; intro: string; children: ReactNode }) {
  const reveal = (step: number) => ({ "--d": `${0.25 + step * 0.12}s` }) as CSSProperties;
  return (
    <section data-hero aria-labelledby="page-title" className="hero-film relative isolate flex min-h-[34rem] items-end overflow-hidden bg-ink text-paper">
      <Photo item={item} locale={locale} sizes="100vw" priority className="absolute! inset-0 -z-20" imgClassName="hero-image" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-ink/55 via-ink/20 to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(28_27_25/0.85)_0%,rgb(28_27_25/0.5)_26%,rgb(28_27_25/0.12)_50%,transparent_64%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-ink/50 via-ink/10 via-40% to-transparent to-65% md:block" />

      <div className="container-page pb-[max(2.25rem,calc(env(safe-area-inset-bottom)+1.5rem))] sm:pb-14 md:pb-[clamp(3.5rem,9svh,6.5rem)]">
        <p className="eyebrow hero-reveal text-paper/85" style={reveal(0)}>
          {eyebrow}
        </p>
        <h1
          id="page-title"
          className="hero-reveal mt-5 max-w-4xl font-serif text-[2.625rem] leading-[1.02] font-light tracking-[-0.015em] text-balance [text-shadow:0_1px_20px_rgb(0_0_0/0.3)] sm:text-6xl md:text-7xl xl:text-8xl"
          style={reveal(1)}
        >
          {title}
        </h1>
        <p className="hero-reveal mt-5 max-w-xl text-base leading-relaxed text-paper/85 [text-shadow:0_1px_12px_rgb(0_0_0/0.4)] md:text-lg" style={reveal(2)}>
          {intro}
        </p>
        <div className="hero-reveal mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-x-3 md:mt-10" style={reveal(3)}>
          {children}
        </div>
      </div>
    </section>
  );
}
