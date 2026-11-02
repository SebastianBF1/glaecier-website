import type { Dictionary } from "@/content/dictionaries";
import { media } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { pages } from "@/content/links";
import { buttonClass, InternalAction } from "@/components/ui/buttons";
import { Clip } from "@/components/ui/Clip";
import { Photo } from "@/components/ui/Photo";
import { SectionIntro } from "@/components/ui/SectionIntro";

// Deliberately uneven frames so the three experiences read as an editorial spread, not a card row.
const frames = ["aspect-[3/4]", "aspect-square md:mt-28", "aspect-[4/5] md:mt-12"];

export function Experiences({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section id="experiences" aria-labelledby="experiences-title" className="bg-sand/60 py-28 md:py-44">
      <div className="container-page grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
        {/* Portrait frame on every screen: the clip is 9:16, so a landscape crop would lose most of it. */}
        <Clip
          src={media.experiences.clip.src}
          poster={media.experiences.clip.poster}
          label={media.experiences.clip.alt[locale]}
          className="-mx-5 aspect-[4/5] md:-mx-10 lg:col-span-7 lg:mr-0 lg:aspect-[6/7]"
        />
        <div className="max-w-xl lg:col-span-4 lg:col-start-9 lg:self-end lg:pb-8">
          <SectionIntro eyebrow={t.experiences.eyebrow} heading={t.experiences.heading} headingId="experiences-title" className="text-wood [&_h2]:text-ink" />
          <p className="reveal mt-6 text-lg leading-relaxed text-stone">{t.experiences.lead}</p>
          <div className="reveal mt-10">
            <InternalAction href={pages.book(locale)} variant="dark">
              {t.experiences.cta}
            </InternalAction>
          </div>
        </div>
      </div>

      <ul className="container-page mt-24 grid gap-14 sm:grid-cols-3 sm:gap-6 md:mt-36 md:gap-10">
        {t.experiences.featured.map((item, i) => (
          <li key={item.title} className="group reveal">
            <Photo
              item={media.experiences.featured[i]}
              locale={locale}
              sizes="(min-width: 640px) 30vw, 100vw"
              className={frames[i]}
              imgClassName="transition-transform duration-[1.2s] ease-calm group-hover:scale-[1.04]"
            />
            {/* Who it is for comes first, so public vs. members-only is clear at a glance. */}
            <p className="eyebrow mt-6 text-wood">{item.access}</p>
            <h3 className="mt-2 font-serif text-2xl font-light md:text-3xl">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">{item.meta}</p>
            {i === 0 && (
              <InternalAction href={pages.book(locale)} variant="text" className="mt-4">
                {item.action}
              </InternalAction>
            )}
            {i === 1 && (
              <a href="#membership" className={buttonClass("text", "mt-4")}>
                {item.action}
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
