import type { Dictionary } from "@/content/dictionaries";
import { media } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { Photo } from "@/components/ui/Photo";

/** Typography-led pause after the hero: one statement, one sentence, one quiet human moment. */
export function Intro({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section aria-labelledby="intro-title" className="pt-24 pb-28 md:pt-40 md:pb-48">
      <div className="container-page grid gap-y-16 md:grid-cols-12 md:gap-x-10">
        <div className="md:col-span-11">
          <p className="eyebrow reveal text-wood">{t.intro.eyebrow}</p>
          <h2
            id="intro-title"
            className="reveal mt-7 font-serif text-[2.5rem] leading-[1.02] font-light tracking-[-0.02em] text-balance sm:text-6xl md:mt-9 md:text-7xl xl:text-[5.75rem]"
          >
            {t.intro.statement}
          </h2>
        </div>
        <Photo
          item={media.intro}
          locale={locale}
          sizes="(min-width: 768px) 25vw, 60vw"
          effect="reveal"
          className="aspect-[3/4] w-3/5 md:col-span-3 md:col-start-2 md:w-full"
        />
        <p className="reveal max-w-md self-end border-t border-ink/15 pt-6 text-lg leading-relaxed text-stone md:col-span-4 md:col-start-8">
          {t.intro.body}
        </p>
      </div>
    </section>
  );
}
