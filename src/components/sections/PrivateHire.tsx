import type { Dictionary } from "@/content/dictionaries";
import { media } from "@/content/media";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { buttonClass } from "@/components/ui/buttons";
import { Photo } from "@/components/ui/Photo";

export function PrivateHire({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section id="private-corporate" aria-labelledby="hire-title" className="bg-paper pb-28 md:pb-44">
      {/* Full-screen, low-lit image so the space reads as hospitality, not a conference venue */}
      <div className="relative isolate flex h-svh min-h-[34rem] items-end text-paper">
        <Photo item={media.hire.main} locale={locale} sizes="100vw" effect="parallax" className="absolute! inset-0 -z-10" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/65 via-ink/10 via-50% to-transparent" />
        <div className="container-page pb-12 md:pb-20">
          <p className="eyebrow reveal text-paper/85">{t.hire.eyebrow}</p>
          <h2 id="hire-title" className="reveal mt-5 max-w-4xl font-serif text-[2.75rem] leading-[1.02] font-light text-balance md:text-8xl">
            {t.hire.heading}
          </h2>
        </div>
      </div>

      <div className="container-page mt-20 grid gap-y-16 md:mt-28 lg:grid-cols-12 lg:gap-x-10">
        <div className="reveal max-w-xl lg:col-span-4">
          <p className="text-lg leading-relaxed text-stone">{t.hire.lead}</p>
          {/* Real, working contact route (as on the live site); no form is submitted. */}
          <a href={`mailto:${site.email}`} className={buttonClass("dark", "mt-10")}>
            {t.hire.cta}
          </a>
          <p className="mt-4 text-sm text-stone">{site.email}</p>
        </div>

        <ol className="lg:col-span-7 lg:col-start-6">
          {t.hire.items.map((item, i) => (
            <li key={item.id} id={item.id} className="group reveal grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-ink/15 py-8 sm:grid-cols-[2.5rem_1fr_9rem] md:py-10">
              <span className="eyebrow pt-3 text-wood">0{i + 1}</span>
              <div>
                <h3 className="font-serif text-3xl font-light md:text-4xl">{item.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-stone">{item.body}</p>
              </div>
              <Photo
                item={media.hire.items[i]}
                locale={locale}
                sizes="144px"
                className="hidden aspect-[4/5] sm:block"
                imgClassName="transition-transform duration-[1.2s] ease-calm group-hover:scale-[1.06]"
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
