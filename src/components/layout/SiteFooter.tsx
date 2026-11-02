import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import { site } from "@/content/site";
import { locales, type Locale } from "@/i18n/config";
import { links, pages, type Page } from "@/content/links";
import { ExternalAction, InternalAction } from "@/components/ui/buttons";
import { Wordmark } from "@/components/ui/Wordmark";

/** A closing scene: wordmark and the two ways in, then contact, hours and language in a quiet grid. */
export function SiteFooter({ t, locale, page = "home" }: { t: Dictionary; locale: Locale; page?: Page }) {
  return (
    <footer className="bg-ink pt-24 pb-10 text-paper md:pt-32">
      <div className="container-page">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Wordmark className="w-[min(72vw,32rem)]" />
            <p className="mt-6 max-w-sm font-serif text-xl leading-snug font-light text-paper/80 md:text-2xl">{t.hero.video.sub}</p>
          </div>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <InternalAction href={pages.book(locale)} variant="solid" className="max-sm:w-full">
              {t.footer.book}
            </InternalAction>
            <ExternalAction href={links.memberLogin} newTab={t.nav.newTab} variant="text">
              {t.footer.login}
            </ExternalAction>
          </div>
        </div>

        <div className="mt-20 grid gap-12 border-t border-paper/15 pt-12 text-sm leading-relaxed sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 className="eyebrow text-fog">{t.footer.contact}</h2>
            <address className="mt-5 not-italic">
              {site.address.street}
              <br />
              {site.address.city}
            </address>
            <p className="mt-5 flex flex-col items-start gap-1">
              <a href={`mailto:${site.email}`} className="link-underline py-1">
                {site.email}
              </a>
              <a href={site.instagram.url} rel="noopener" className="link-underline py-1">
                {t.footer.instagram} {site.instagram.handle}
              </a>
            </p>
          </div>

          <div id="opening-hours" className="lg:col-span-4">
            <h2 className="eyebrow text-fog">{t.locations.hoursLabel}</h2>
            <dl className="mt-5 max-w-64">
              {site.hours.map(([open, close], i) => (
                <div key={i} className="flex justify-between border-b border-paper/10 py-1.5">
                  <dt>{t.locations.days[i]}</dt>
                  <dd className="tabular-nums">
                    {open}–{close}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 max-w-64 text-xs text-fog">{t.locations.hoursNote}</p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="eyebrow text-fog">{t.footer.more}</h2>
            <ul className="mt-5">
              <li>
                <InternalAction href={pages.signup(locale)} variant="text">
                  {t.footer.signup}
                </InternalAction>
              </li>
              <li>
                <ExternalAction href={links.faq[locale]} newTab={t.nav.newTab} variant="text">
                  {t.footer.faq}
                </ExternalAction>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="eyebrow text-fog">{t.nav.language.label}</h2>
            <ul className="mt-5 flex gap-5">
              {locales.map((l) => (
                <li key={l}>
                  <Link
                    prefetch={false}
                    href={pages[page](l)}
                    hrefLang={l}
                    lang={l}
                    aria-current={l === locale ? "page" : undefined}
                    className="eyebrow inline-block py-2 opacity-60 transition-opacity hover:opacity-100 aria-[current=page]:opacity-100"
                  >
                    {l === "da" ? "Dansk" : "English"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-paper/15 pt-6 text-xs text-fog sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
