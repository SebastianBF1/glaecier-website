import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries";
import { site } from "@/content/site";
import { locales, type Locale } from "@/i18n/config";
import { links } from "@/content/links";
import { ExternalAction } from "@/components/ui/buttons";
import { Wordmark } from "@/components/ui/Wordmark";

export function SiteFooter({ t, locale }: { t: Dictionary; locale: Locale }) {
  return (
    <footer className="bg-ink pt-20 pb-10 text-paper md:pt-28">
      <div className="container-page">
        <Wordmark className="w-[min(70vw,28rem)]" />

        <div className="mt-16 grid gap-12 text-sm leading-relaxed sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="eyebrow text-fog">{t.footer.contact}</h2>
            <address className="mt-4 not-italic">
              {site.address.street}
              <br />
              {site.address.city}
            </address>
            <p className="mt-4 space-y-1">
              <a href={`mailto:${site.email}`} className="block underline-offset-4 hover:underline">
                {site.email}
              </a>
              <a href={site.instagram.url} rel="noopener" className="block underline-offset-4 hover:underline">
                {t.footer.instagram} {site.instagram.handle}
              </a>
            </p>
          </div>

          <div id="opening-hours">
            <h2 className="eyebrow text-fog">{t.locations.hoursLabel}</h2>
            <dl className="mt-4">
              {site.hours.map(([open, close], i) => (
                <div key={i} className="flex max-w-60 justify-between">
                  <dt>{t.locations.days[i]}</dt>
                  <dd className="tabular-nums">
                    {open}–{close}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 max-w-60 text-xs text-fog">{t.locations.hoursNote}</p>
          </div>

          <div>
            <h2 className="eyebrow text-fog">{t.footer.more}</h2>
            <ul className="mt-4 flex flex-col items-start gap-2">
              <li>
                <ExternalAction href={links.faq[locale]} newTab={t.nav.newTab} variant="text">
                  {t.footer.faq}
                </ExternalAction>
              </li>
              <li>
                <ExternalAction href={links.bookOpenGus} newTab={t.nav.newTab} variant="text">
                  {t.footer.book}
                </ExternalAction>
              </li>
              <li>
                <ExternalAction href={links.memberLogin} newTab={t.nav.newTab} variant="text">
                  {t.footer.login}
                </ExternalAction>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-fog">{t.nav.language.label}</h2>
            <ul className="mt-4 flex gap-4">
              {locales.map((l) => (
                <li key={l}>
                  <Link prefetch={false}
                    href={`/${l}`}
                    hrefLang={l}
                    lang={l}
                    aria-current={l === locale ? "page" : undefined}
                    className="eyebrow py-1 underline-offset-[6px] aria-[current=page]:underline hover:underline"
                  >
                    {l === "da" ? "Dansk" : "English"}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-2 border-t border-paper/15 pt-6 text-xs text-fog sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>{t.footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
