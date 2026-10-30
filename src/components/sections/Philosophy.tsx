import type { Dictionary } from "@/content/dictionaries";
import { media } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { Photo } from "@/components/ui/Photo";

/** Centred, typography-led close: the only symmetrical composition on the page. */
export function Philosophy({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section id="our-story" aria-labelledby="philosophy-title" className="bg-harbour py-28 text-center text-paper md:py-44">
      <div className="container-page flex flex-col items-center">
        <p className="eyebrow reveal text-fog">{t.philosophy.eyebrow}</p>
        <h2 id="philosophy-title" className="reveal mt-8 max-w-5xl font-serif text-[2.5rem] leading-[1.08] font-light text-balance md:text-7xl">
          {t.philosophy.statement}
        </h2>
        <p className="reveal mt-10 max-w-xl text-lg leading-relaxed text-paper/85">{t.philosophy.body}</p>
        <Photo
          item={media.philosophy}
          locale={locale}
          sizes="(min-width: 768px) 30vw, 70vw"
          effect="reveal"
          className="mt-20 aspect-[4/5] w-2/3 max-w-sm md:mt-28"
        />
      </div>
    </section>
  );
}
