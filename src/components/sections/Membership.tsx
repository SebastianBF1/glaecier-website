import type { Dictionary } from "@/content/dictionaries";
import { media } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { PrototypeAction } from "@/components/ui/buttons";
import { Photo } from "@/components/ui/Photo";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function Membership({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [lobby, havnegade] = t.membership.paths;
  return (
    <section id="membership" aria-labelledby="membership-title" className="bg-ink text-paper">
      <div className="grid lg:min-h-svh lg:grid-cols-2">
        <Photo
          item={media.membership}
          locale={locale}
          sizes="(min-width: 1024px) 50vw, 100vw"
          effect="parallax"
          className="aspect-[4/5] md:aspect-[16/10] lg:aspect-auto"
        />

        <div className="flex flex-col justify-center px-5 py-24 md:px-10 md:py-28 lg:px-14 lg:py-32 xl:px-24">
          <SectionIntro eyebrow={t.membership.eyebrow} heading={t.membership.heading} headingId="membership-title" className="text-fog [&_h2]:text-paper" />
          <p className="reveal mt-6 max-w-md text-lg leading-relaxed text-paper/85">{t.membership.intro}</p>

          <div className="mt-16 grid gap-12 2xl:grid-cols-2 2xl:gap-10">
            <div className="reveal border-t border-paper/25 pt-7">
              <p className="eyebrow text-fog">{lobby.label}</p>
              <h3 className="mt-3 font-serif text-3xl font-light">{lobby.title}</h3>
              <p className="mt-4 max-w-sm leading-relaxed text-paper/80">{lobby.body}</p>
              <PrototypeAction tag={t.prototype.tag} variant="solid" className="mt-8">
                {lobby.cta}
              </PrototypeAction>
            </div>
            <div className="reveal border-t border-paper/25 pt-7">
              <p className="eyebrow text-fog">{havnegade.label}</p>
              <h3 className="mt-3 font-serif text-3xl font-light">{havnegade.title}</h3>
              <p className="mt-4 max-w-sm leading-relaxed text-paper/80">{havnegade.body}</p>
              <PrototypeAction tag={t.prototype.tag} variant="text" className="mt-8">
                {havnegade.cta}
              </PrototypeAction>
            </div>
          </div>

          <p className="reveal mt-14 text-sm text-fog">{t.membership.price}</p>
        </div>
      </div>
    </section>
  );
}
