import type { Dictionary } from "@/content/dictionaries";
import { media } from "@/content/media";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { Photo } from "@/components/ui/Photo";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function Locations({ t, locale }: { t: Dictionary; locale: Locale }) {
  const { refshaleoen, havnegade } = t.locations;
  return (
    <section aria-labelledby="locations-title" className="py-28 md:py-44">
      <div className="container-page">
        <SectionIntro eyebrow={t.locations.eyebrow} heading={t.locations.heading} headingId="locations-title" className="max-w-3xl text-wood [&_h2]:text-ink" />

        <article aria-labelledby="loc-refshaleoen" className="mt-16 grid gap-y-10 md:mt-24 md:grid-cols-12 md:gap-x-10">
          <Photo
            item={media.locations.refshaleoen}
            locale={locale}
            sizes="(min-width: 768px) 66vw, 100vw"
            effect="reveal"
            className="-mx-5 aspect-[4/3] md:col-span-8 md:mx-0 md:aspect-[16/10]"
          />
          <div className="reveal md:col-span-4 md:self-end">
            <p className="eyebrow text-wood">{refshaleoen.status}</p>
            <h3 id="loc-refshaleoen" className="mt-3 font-serif text-4xl font-light">
              {refshaleoen.name}
            </h3>
            <p className="mt-4 max-w-sm leading-relaxed text-stone">{refshaleoen.body}</p>
            <address className="mt-6 not-italic leading-relaxed">
              {site.address.street}, {site.address.city}
            </address>
            <a href="#opening-hours" className="eyebrow link-underline mt-6 inline-block py-1">
              {t.locations.hoursLink}
            </a>
          </div>
        </article>

        <article aria-labelledby="loc-havnegade" className="mt-24 grid gap-y-8 md:mt-32 md:grid-cols-12 md:gap-x-10">
          <Photo
            item={media.locations.havnegade}
            locale={locale}
            sizes="(min-width: 768px) 25vw, 75vw"
            effect="reveal"
            className="aspect-[4/3] w-3/4 md:col-span-3 md:col-start-5 md:w-full"
          />
          <div className="reveal md:col-span-4 md:col-start-9 md:self-end">
            <p className="eyebrow text-wood">{havnegade.status}</p>
            <h3 id="loc-havnegade" className="mt-3 font-serif text-4xl font-light">
              {havnegade.name}
            </h3>
            <p className="mt-4 max-w-sm leading-relaxed text-stone">{havnegade.body}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
