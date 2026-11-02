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
 * Portrait screens: the clip fills the upper part and fades into a dark band that carries the copy, which keeps the
 * baked-in "quietude" (mid-height in the clip) well clear of the wordmark.
 * Landscape screens: the clip plays sharp in a framed panel (never upscaled beyond ~1.05×) against a sharp, dark
 * photograph of a window onto the harbour, with the copy on the left.
 */
function HeroVideo({ t }: Props) {
  const v = t.hero.video;
  const backdrop = media.heroVideoBackdrop;
  const b = getMedia(backdrop);
  const { props: { srcSet: backdropSet } } = getImageProps({ src: b.src, width: b.width, height: b.height, alt: "", sizes: "135vw" });
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex h-svh min-h-[36rem] items-end overflow-hidden bg-ink text-paper">
      {/* Portrait: full-width clip. Hidden (and never loaded or played) on landscape screens. */}
      <AmbientVideo className="absolute inset-x-0 top-0 -z-10 h-[86%] w-full object-cover md:landscape:hidden" />
      {/* Landscape: decorative backdrop. Only the landscape <source> carries the photo, so portrait screens get the
          1px placeholder and never download it (a hidden <img> alone would still be fetched). Enlarged from the left
          edge so the bright window sits behind the video panel and the copy rests on the dark interior wall. */}
      <picture className="absolute inset-0 -z-10 hidden overflow-hidden md:landscape:block">
        <source media="(orientation: landscape) and (min-width: 768px)" srcSet={backdropSet} sizes="135vw" />
        <img
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          alt=""
          className="h-full w-full origin-left scale-[1.35] object-cover"
          style={{ objectPosition: backdrop.position }}
        />
      </picture>
      {/* Right edge follows the page grid on wide screens (1440px container + 2.5rem padding). */}
      <div className="absolute right-[max(6vw,calc((100vw-1440px)/2+2.5rem))] bottom-[7svh] -z-10 hidden aspect-[464/832] h-[78svh] max-h-[52rem] overflow-hidden shadow-[0_40px_90px_-40px_rgb(0_0_0/0.8)] ring-1 ring-paper/15 md:landscape:block">
        <AmbientVideo className="h-full w-full object-cover" />
      </div>
      {/* Scrims only where text sits: the header band and the copy area. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-ink/50 to-transparent" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink from-15% via-ink/70 via-35% to-transparent to-60% md:landscape:bg-gradient-to-r md:landscape:from-ink/70 md:landscape:from-0% md:landscape:via-ink/35 md:landscape:via-45% md:landscape:to-ink/20 md:landscape:to-100%"
      />

      <div className="hero-copy container-page pb-12 md:pb-20">
        <div className="w-[min(68vw,30rem)] md:landscape:w-[min(42vw,40rem)]">
          <Title />
        </div>
        <p className="mt-6 font-serif text-[1.75rem] leading-tight font-light md:text-4xl">{v.title}</p>
        <p className="mt-2 text-paper/85 md:text-lg">{v.sub}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ExternalAction href={links.bookOpenGus} newTab={t.nav.newTab} variant="solid">
            {t.hero.secondary}
          </ExternalAction>
          <a href="#membership" className={buttonClass("outline")}>
            {v.membership}
          </a>
        </div>
      </div>

      <a
        href="#intro-title"
        className="eyebrow absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.625rem] text-paper/75 transition-colors hover:text-paper md:flex"
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
