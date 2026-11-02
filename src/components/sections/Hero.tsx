import { getImageProps } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { getMedia, media, type MediaItem } from "@/content/media";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { pages } from "@/content/links";
import { buttonClass, InternalAction } from "@/components/ui/buttons";
import { Wordmark } from "@/components/ui/Wordmark";
import { HeroFilm } from "./HeroFilm";
import { HeroSwitcher } from "./HeroSwitcher";

type Props = { t: Dictionary; locale: Locale };

/** Full-screen art-directed photo (separate desktop/mobile crops) with content laid over it. */
function HeroFrame({ desktop, mobile, locale, scrim, children }: { desktop: MediaItem; mobile: MediaItem; locale: Locale; scrim: string; children: ReactNode }) {
  const d = getMedia(desktop);
  const m = getMedia(mobile);
  const common = { alt: desktop.alt[locale], sizes: "100vw", fetchPriority: "high" as const, loading: "eager" as const };
  const { props: { srcSet: desktopSet } } = getImageProps({ ...common, src: d.src, width: d.width, height: d.height });
  const { props: { srcSet: mobileSet, ...img } } = getImageProps({ ...common, src: m.src, width: m.width, height: m.height });

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex h-svh min-h-[36rem] items-end overflow-hidden bg-ink text-paper">
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopSet} />
        <source srcSet={mobileSet} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- art-directed <picture> per Next docs; alt comes from getImageProps */}
        <img
          {...img}
          className="hero-image absolute inset-0 -z-10 h-full w-full object-cover [object-position:var(--pos-m)] md:[object-position:var(--pos-d)]"
          style={{ "--pos-m": mobile.position, "--pos-d": desktop.position } as CSSProperties}
        />
      </picture>
      {/* Scrims only where text sits: the header band and the copy area. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-ink/45 to-transparent" />
      <div aria-hidden="true" className={`absolute inset-0 -z-10 ${scrim}`} />
      {children}
    </section>
  );
}

function Title() {
  return (
    <h1 id="hero-title">
      <span className="sr-only">Glaecier</span>
      <Wordmark className="w-full" />
    </h1>
  );
}

/** Option A – Golden hour: centred, warm, almost no text. */
function HeroGolden({ t, locale }: Props) {
  const { desktop, mobile } = media.heroes.a;
  return (
    <HeroFrame desktop={desktop} mobile={mobile} locale={locale} scrim="bg-gradient-to-t from-ink/60 via-ink/10 via-45% to-transparent">
      <div className="hero-copy container-page flex flex-col items-center pb-14 text-center md:pb-20">
        <div className="w-[min(80vw,46rem)]">
          <Title />
        </div>
        <p className="eyebrow mt-8 text-paper/90">{t.hero.line}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4">
          <a href="#membership" className={buttonClass("text")}>
            {t.hero.primary}
          </a>
          <InternalAction href={pages.book(locale)} variant="text">
            {t.hero.secondary}
          </InternalAction>
        </div>
      </div>
    </HeroFrame>
  );
}

/** Option B – Architectural Nordic: asymmetric, the deck and pergola carry the frame. */
function HeroNordic({ t, locale }: Props) {
  const { desktop, mobile } = media.heroes.b;
  return (
    <HeroFrame desktop={desktop} mobile={mobile} locale={locale} scrim="bg-gradient-to-t from-ink/55 via-ink/5 via-40% to-transparent">
      <div className="hero-copy container-page grid gap-10 pb-12 md:grid-cols-12 md:items-end md:pb-16">
        <div className="md:col-span-8 lg:col-span-7">
          <Title />
        </div>
        <div className="md:col-span-4 md:col-start-9 md:pb-3 lg:col-span-3 lg:col-start-10">
          <p className="max-w-xs font-serif text-xl leading-snug font-light md:text-2xl">{t.hero.line}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#membership" className={buttonClass("solid")}>
              {t.hero.primary}
            </a>
            <InternalAction href={pages.book(locale)} variant="outline">
              {t.hero.secondary}
            </InternalAction>
          </div>
        </div>
      </div>
    </HeroFrame>
  );
}

/**
 * Film hero (Refinement 05): the GLAECIER intro film, full-bleed on every screen – no frames, panels or borders.
 * Copy sits lower-left over a soft gradient that is strongest behind the text and clears towards the top right, so
 * the footage stays the main attraction. Source: "Glacier intro Final 1", 62.0–66.0 s + 67.48–89.8 s (26.3 s; the
 * pool-signage shot is cut) with the burned-in subtitle band cropped off; see docs/refinement-05.md.
 */
function HeroVideo({ t, locale }: Props) {
  const v = t.hero.video;
  const reveal = (step: number) => ({ "--d": `${0.3 + step * 0.12}s` }) as CSSProperties;
  return (
    <section data-hero aria-labelledby="hero-title" className="hero-film relative isolate flex min-h-[34rem] items-end overflow-hidden bg-ink text-paper">
      <HeroFilm />
      {/* Header band: just enough for the white navigation to read over bright frames. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-ink/55 via-ink/20 to-transparent" />
      {/* Copy area: a low, long fade from the bottom plus a gentle wash from the left on wide screens. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(28_27_25/0.88)_0%,rgb(28_27_25/0.55)_24%,rgb(28_27_25/0.18)_46%,transparent_62%)] md:bg-[linear-gradient(to_top,rgb(28_27_25/0.72)_0%,rgb(28_27_25/0.32)_28%,transparent_55%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-ink/55 via-ink/15 via-40% to-transparent to-65% md:block" />

      <div className="container-page pb-[max(2.25rem,calc(env(safe-area-inset-bottom)+1.5rem))] sm:pb-14 md:pb-[clamp(3.5rem,9svh,6.5rem)]">
        {/* A soft shadow keeps white type legible on the film's brightest, overcast frames without darkening it all. */}
        <div className="hero-reveal w-[min(62vw,24rem)] drop-shadow-[0_2px_24px_rgb(0_0_0/0.35)] md:w-[min(36vw,34rem)]" style={reveal(0)}>
          <Title />
        </div>
        <p className="hero-reveal mt-6 font-serif text-[1.75rem] leading-[1.15] font-light text-balance [text-shadow:0_1px_16px_rgb(0_0_0/0.35)] md:mt-7 md:text-4xl" style={reveal(1)}>
          {v.title}
        </p>
        <p className="hero-reveal mt-2 max-w-xs text-sm leading-relaxed text-paper/80 [text-shadow:0_1px_12px_rgb(0_0_0/0.4)] md:max-w-sm md:text-lg md:text-paper/90" style={reveal(2)}>
          {v.sub}
        </p>
        <div className="hero-reveal mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-x-7 md:mt-9 md:gap-x-3" style={reveal(3)}>
          {/* Full-width primary action on phones. */}
          <InternalAction href={pages.book(locale)} variant="solid" className="max-sm:w-full">
            {t.hero.secondary}
          </InternalAction>
          {/* Text link on phones (keeps the first screen compact), outlined button from md up. */}
          <a href="#membership" className={buttonClass("text", "md:border md:border-current/60 md:bg-none md:px-7 md:py-4 md:hover:border-current md:hover:bg-paper/10")}>
            {v.membership}
          </a>
        </div>
      </div>
    </section>
  );
}

export function Hero(props: Props) {
  const variants = { video: <HeroVideo {...props} />, b: <HeroNordic {...props} />, a: <HeroGolden {...props} /> };
  // Development only: compare the heroes. Production renders the chosen one without a switcher.
  if (process.env.NODE_ENV === "development") {
    return <HeroSwitcher initial={site.heroVariant} labels={props.t.hero.switcher} variants={variants} />;
  }
  return variants[site.heroVariant];
}
