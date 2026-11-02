import { getImageProps } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { getMedia, media, type MediaItem } from "@/content/media";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { links } from "@/content/links";
import { buttonClass, ExternalAction } from "@/components/ui/buttons";
import { Wordmark } from "@/components/ui/Wordmark";
import { AmbientVideo } from "./AmbientVideo";
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
          <ExternalAction href={links.bookOpenGus} newTab={t.nav.newTab} variant="text">
            {t.hero.secondary}
          </ExternalAction>
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
            <ExternalAction href={links.bookOpenGus} newTab={t.nav.newTab} variant="outline">
              {t.hero.secondary}
            </ExternalAction>
          </div>
        </div>
      </div>
    </HeroFrame>
  );
}

/**
 * Video hero – an evolution of Hero B. The only footage is a 464×832 portrait clip, so it is never stretched.
 * Landscape screens: one coordinate system (.hero-stage in globals.css) places a sharp photograph of a dark room
 * with a window onto the harbour, sizes the clip to exactly the height of that window opening and stands it inside
 * it, and aligns the copy's baseline with the window sill – so the clip reads as part of the view, not an inset.
 * The clip is shown at ≤1:1 (0.7–0.95× of native) and the photo at ≤1:1 of its 2560px file.
 * Portrait screens: the clip fills the upper part and fades into a dark band that carries the copy, keeping the
 * baked-in "quietude" (mid-height in the clip) well clear of the wordmark.
 */
function HeroVideo({ t }: Props) {
  const v = t.hero.video;
  const b = getMedia(media.heroVideoBackdrop);
  const { props: { srcSet: backdropSet } } = getImageProps({ src: b.src, width: b.width, height: b.height, alt: "", sizes: "(min-width: 1650px) 134vw, 156vw" });
  const reveal = (step: number) => ({ "--d": `${0.25 + step * 0.12}s` }) as CSSProperties;
  return (
    <section aria-labelledby="hero-title" className="hero-stage relative isolate flex h-svh min-h-[34rem] items-end overflow-hidden bg-ink text-paper">
      {/* Portrait: full-width clip fading into the copy band. Hidden (never loaded or played) on landscape screens. */}
      {/* On short phones the clip is cropped from the top (object-bottom), lifting "quietude" away from the logo. */}
      <AmbientVideo className="hero-fade absolute inset-x-0 top-0 -z-10 h-[86%] w-full object-cover [@media(max-height:700px)]:h-[78%] [@media(max-height:700px)]:object-bottom md:landscape:hidden" />
      {/* Landscape backdrop. Only the landscape <source> carries the photo, so portrait screens get the 1px
          placeholder and never download it (a hidden <img> alone would still be fetched). */}
      <picture className="hero-backdrop hero-fade -z-10 hidden md:landscape:block">
        <source media="(orientation: landscape) and (min-width: 768px)" srcSet={backdropSet} sizes="(min-width: 1650px) 134vw, 156vw" />
        <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="" className="h-full w-full object-cover" />
      </picture>
      {/* The clip, standing in the window opening; a slim dark mullion on its left ties it to the glazing. */}
      <div className="hero-panel hero-fade -z-10 hidden overflow-hidden border-l-[0.375rem] border-ink md:landscape:block">
        <AmbientVideo className="h-full w-full object-cover" />
      </div>
      {/* Scrims only where text sits: the header band and the copy area. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-ink/55 to-transparent" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink from-[16%] via-ink/75 via-[33%] to-transparent to-[58%] md:landscape:bg-gradient-to-r md:landscape:from-ink/80 md:landscape:from-0% md:landscape:via-ink/40 md:landscape:via-[30%] md:landscape:to-transparent md:landscape:to-[55%]"
      />

      <div className="hero-copy-pos container-page pb-10 sm:pb-14 md:landscape:pb-0">
        <div className="hero-reveal w-[min(58vw,24rem)] md:landscape:w-[min(38vw,36rem)]" style={reveal(0)}>
          <Title />
        </div>
        <p className="hero-reveal mt-5 font-serif text-[1.625rem] leading-tight font-light text-balance md:mt-7 md:text-4xl" style={reveal(1)}>
          {v.title}
        </p>
        <p className="hero-reveal mt-2 max-w-xs text-[0.9375rem] leading-relaxed text-paper/80 md:max-w-sm md:text-lg" style={reveal(2)}>
          {v.sub}
        </p>
        <div className="hero-reveal mt-7 flex flex-wrap items-center gap-x-7 gap-y-4 md:mt-9 md:gap-x-3" style={reveal(3)}>
          <ExternalAction href={links.bookOpenGus} newTab={t.nav.newTab} variant="solid">
            {t.hero.secondary}
          </ExternalAction>
          {/* Text link on phones (keeps the first screen compact), outlined button from md up. */}
          <a href="#membership" className={buttonClass("text", "md:border md:border-current/60 md:bg-none md:px-7 md:py-4 md:hover:border-current md:hover:bg-paper/10")}>
            {v.membership}
          </a>
        </div>
      </div>

      <a
        href="#intro-title"
        className="eyebrow absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.625rem] text-paper/75 transition-colors hover:text-paper md:flex md:landscape:hidden"
      >
        {v.scroll}
        <span aria-hidden="true" className="scroll-line" />
      </a>
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
