import type { Dictionary } from "@/content/dictionaries";
import { media } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { Photo } from "@/components/ui/Photo";

/** Typography-led pause after the hero: one statement, one sentence, one small cold detail. */
export function Intro({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section aria-labelledby="intro-title" className="py-28 md:py-48">
      <div className="container-page grid gap-y-14 md:grid-cols-12 md:gap-x-10">
        <p className="eyebrow reveal text-wood md:col-span-12">{t.intro.eyebrow}</p>
        <h2
          id="intro-title"
          className="reveal font-serif text-[2.75rem] leading-[1.02] font-light tracking-[-0.015em] text-balance md:col-span-11 md:text-7xl xl:text-8xl"
        >
          {t.intro.statement}
        </h2>
        <Photo
          item={media.intro}
          locale={locale}
          sizes="(min-width: 768px) 25vw, 60vw"
          effect="reveal"
          className="aspect-[3/4] w-3/5 md:col-span-3 md:col-start-2 md:w-full"
        />
        <p className="reveal max-w-md self-end text-lg leading-relaxed text-stone md:col-span-4 md:col-start-8">{t.intro.body}</p>
      </div>
    </section>
  );
}
