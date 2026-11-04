import type { Dictionary } from "@/content/dictionaries";
import { media } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { pages } from "@/content/links";
import { InternalAction } from "@/components/ui/buttons";
import { Photo } from "@/components/ui/Photo";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function Membership({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [lobby, havnegade] = t.membership.paths;
  return (
    <section id="membership" aria-labelledby="membership-title" className="bg-ink text-paper">
      <div className="grid lg:min-h-svh lg:grid-cols-2">
        {/* On large screens the photo is a sticky, screen-height panel rather than stretching to the full height of the
            text column – that keeps a sensible crop (the guest and the harbour) instead of a face-only close-up. */}
        <div className="lg:relative">
          <Photo
            item={media.membership}
            locale={locale}
            sizes="(min-width: 1024px) 50vw, 100vw"
            effect="parallax"
            className="aspect-[4/5] md:aspect-[16/10] lg:sticky lg:top-0 lg:aspect-auto lg:h-svh"
          />
        </div>

        <div className="flex flex-col justify-center px-5 py-24 md:px-10 md:py-28 lg:px-14 lg:py-32 xl:px-24">
          <SectionIntro eyebrow={t.membership.eyebrow} heading={t.membership.heading} headingId="membership-title" className="text-fog [&_h2]:text-paper" />
          <p className="reveal mt-6 max-w-md text-lg leading-relaxed text-paper/85">{t.membership.intro}</p>
          {/* The proposition in three verified facts, set as a quiet hairline list. */}
          <ul className="reveal mt-10 max-w-lg divide-y divide-paper/15 border-y border-paper/15 text-sm text-paper/80">
            {t.membership.details.facts.map((fact) => (
              <li key={fact} className="py-3">
                {fact}
              </li>
            ))}
          </ul>

          {/* Two clearly different paths: the open club (primary, on the dark ground) and the upcoming Havnegade
              pre-registration (secondary, set apart in a harbour-blue panel that echoes its Locations card). */}
          <div className="mt-14 grid gap-10 2xl:grid-cols-2 2xl:items-start">
            <div className="reveal border-t border-paper/25 pt-7">
              <p className="eyebrow text-fog">{lobby.label}</p>
              <h3 className="mt-3 font-serif text-3xl font-light md:text-[2.125rem]">{lobby.title}</h3>
              <p className="mt-4 max-w-sm leading-relaxed text-paper/80">{lobby.body}</p>
              <InternalAction href={`${pages.signup(locale)}#refshaleoen`} variant="solid" className="mt-8 max-sm:w-full">
                {lobby.cta}
              </InternalAction>
            </div>
            <div className="reveal bg-harbour/70 p-7">
              <p className="eyebrow text-fog">{havnegade.label}</p>
              <h3 className="mt-3 font-serif text-[1.75rem] font-light">{havnegade.title}</h3>
              <p className="mt-4 max-w-sm leading-relaxed text-paper/80">{havnegade.body}</p>
              <InternalAction href={`${pages.signup(locale)}#havnegade`} variant="solid" className="mt-8 max-sm:w-full">
                {havnegade.cta}
              </InternalAction>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
