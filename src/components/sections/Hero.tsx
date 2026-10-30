import { getImageProps } from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { getMedia, media, type MediaItem } from "@/content/media";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { buttonClass, PrototypeAction } from "@/components/ui/buttons";
import { Wordmark } from "@/components/ui/Wordmark";
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
          <PrototypeAction tag={t.prototype.tag} variant="text">
            {t.hero.secondary}
          </PrototypeAction>
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
            <PrototypeAction tag={t.prototype.tag} variant="outline">
              {t.hero.secondary}
            </PrototypeAction>
          </div>
        </div>
      </div>
    </HeroFrame>
  );
}

export function Hero(props: Props) {
  const variants = { a: <HeroGolden {...props} />, b: <HeroNordic {...props} /> };
  // Development only: compare both heroes. Production renders the chosen one without a switcher.
  if (process.env.NODE_ENV === "development") {
    return <HeroSwitcher initial={site.heroVariant} labels={props.t.hero.switcher} variants={variants} />;
  }
  return variants[site.heroVariant];
}
