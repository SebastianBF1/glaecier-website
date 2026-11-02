import type { Dictionary } from "@/content/dictionaries";
import { media } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { pages } from "@/content/links";
import { buttonClass, InternalAction } from "@/components/ui/buttons";
import { Photo } from "@/components/ui/Photo";

/**
 * The page's one centred, symmetrical composition. It opens with the harbour at Holmen – where Copenhagen's
 * bathing tradition lives – dissolving into the section's deep harbour blue, so the colour change is the transition.
 */
export function Philosophy({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section id="our-story" aria-labelledby="philosophy-title" className="bg-harbour text-paper">
      <div className="relative h-[62svh] min-h-80 overflow-hidden">
        <Photo item={media.philosophy} locale={locale} sizes="100vw" effect="parallax" className="absolute! inset-0" />
        {/* Natural colour kept; a light blue wash and a long fade carry the photo into the section colour. */}
        <div aria-hidden="true" className="absolute inset-0 bg-harbour/35" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-harbour via-harbour/70 to-transparent" />
      </div>

      <div className="container-page relative -mt-28 flex flex-col items-center pb-28 text-center md:-mt-40 md:pb-44">
        <p className="eyebrow reveal text-fog">{t.philosophy.eyebrow}</p>
        <h2 id="philosophy-title" className="reveal mt-8 max-w-5xl font-serif text-[2.5rem] leading-[1.06] font-light tracking-[-0.015em] text-balance md:text-7xl">
          {t.philosophy.statement}
        </h2>
        <p className="reveal mt-10 max-w-xl text-lg leading-relaxed text-paper/85">{t.philosophy.body}</p>
        {/* A quiet invitation to close the story: the two ways in. */}
        <div className="reveal mt-14 flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
          <InternalAction href={pages.book(locale)} variant="solid">
            {t.hero.secondary}
          </InternalAction>
          <a href="#membership" className={buttonClass("text")}>
            {t.hero.video.membership}
          </a>
        </div>
      </div>
    </section>
  );
}
