import type { Dictionary } from "@/content/dictionaries";
import { media } from "@/content/media";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { buttonClass } from "@/components/ui/buttons";
import { Photo } from "@/components/ui/Photo";

/**
 * Hospitality rather than conference venue: a full-screen low-lit lounge, then a split with one warm, tall image
 * (sticky on large screens) beside a serif lead, the three offerings as a numbered list and the enquiry CTA.
 */
export function PrivateHire({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <section id="private-corporate" aria-labelledby="hire-title" className="bg-paper pb-28 md:pb-44">
      <div className="relative isolate flex h-svh min-h-[34rem] items-end text-paper">
        <Photo item={media.hire.main} locale={locale} sizes="100vw" effect="parallax" className="absolute! inset-0 -z-10" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/70 via-ink/10 via-50% to-transparent" />
        <div className="container-page pb-12 md:pb-20">
          <p className="eyebrow reveal text-paper/85">{t.hire.eyebrow}</p>
          <h2 id="hire-title" className="reveal mt-5 max-w-4xl font-serif text-[2.75rem] leading-[1.02] font-light tracking-[-0.015em] text-balance md:text-8xl">
            {t.hire.heading}
          </h2>
        </div>
      </div>

      <div className="container-page mt-20 grid gap-y-14 md:mt-32 lg:grid-cols-12 lg:gap-x-10">
        <Photo
          item={media.hire.detail}
          locale={locale}
          sizes="(min-width: 1024px) 40vw, 80vw"
          effect="reveal"
          className="aspect-[4/5] w-4/5 lg:sticky lg:top-32 lg:col-span-5 lg:w-full lg:self-start"
        />

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <p className="reveal max-w-xl font-serif text-2xl leading-snug font-light text-ink md:text-3xl">{t.hire.lead}</p>

          <ol className="mt-14 border-t border-ink/15">
            {t.hire.items.map((item, i) => (
              <li key={item.id} id={item.id} className="reveal grid scroll-mt-32 grid-cols-[2.75rem_1fr] border-b border-ink/15 py-8 md:py-10">
                <span className="eyebrow pt-3 text-wood">0{i + 1}</span>
                <div>
                  <h3 className="font-serif text-3xl font-light md:text-4xl">{item.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-stone">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Real, working contact route (as on the live site); no form is submitted. */}
          <div className="reveal mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href={`mailto:${site.email}`} className={buttonClass("dark")}>
              {t.hire.cta}
            </a>
            <a href={`mailto:${site.email}`} className="link-underline py-1 text-sm text-stone">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
