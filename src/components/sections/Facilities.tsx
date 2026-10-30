import type { Dictionary } from "@/content/dictionaries";
import { media } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { Photo } from "@/components/ui/Photo";

function Caption({ index, title, body, className = "" }: { index: number; title: string; body: string; className?: string }) {
  return (
    <div className={`reveal flex gap-6 ${className}`}>
      <span className="eyebrow pt-2 text-wood">0{index + 1}</span>
      <div>
        <h3 className="font-serif text-2xl font-light md:text-3xl">{title}</h3>
        <p className="mt-2 max-w-xs leading-relaxed text-stone">{body}</p>
      </div>
    </div>
  );
}

export function Facilities({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [sauna, pool, deck] = t.facilities.items;
  return (
    <section aria-labelledby="facilities-title" className="pb-28 md:pb-44">
      {/* Viewport-dominating lead image with the section title laid over it */}
      <div className="relative isolate flex h-svh min-h-[34rem] items-end text-paper">
        <Photo item={media.facilities.sauna} locale={locale} sizes="100vw" effect="parallax" className="absolute! inset-0 -z-10" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/55 via-transparent via-45% to-transparent" />
        <div className="container-page pb-12 md:pb-16">
          <p className="eyebrow reveal text-paper/85">{t.facilities.eyebrow}</p>
          <h2 id="facilities-title" className="reveal mt-5 max-w-3xl font-serif text-[2.5rem] leading-[1.05] font-light text-balance md:text-7xl">
            {t.facilities.heading}
          </h2>
        </div>
      </div>

      <div className="container-page">
        <Caption index={0} {...sauna} className="mt-10 md:ml-auto md:w-5/12" />

        <div className="mt-24 grid gap-y-20 md:mt-36 md:grid-cols-12 md:gap-x-10">
          <figure className="md:col-span-7">
            <Photo item={media.facilities.pool} locale={locale} sizes="(min-width: 768px) 58vw, 100vw" effect="reveal" className="-mx-5 aspect-[3/2] md:mx-0" />
            <figcaption>
              <Caption index={1} {...pool} className="mt-8" />
            </figcaption>
          </figure>
          <figure className="md:col-span-4 md:col-start-9 md:mt-56">
            <Photo item={media.facilities.deck} locale={locale} sizes="(min-width: 768px) 33vw, 80vw" effect="reveal" className="aspect-[4/5] w-4/5 md:w-full" />
            <figcaption>
              <Caption index={2} {...deck} className="mt-8" />
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
