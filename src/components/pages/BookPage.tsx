import type { Dictionary } from "@/content/dictionaries";
import { links, pages } from "@/content/links";
import { media } from "@/content/media";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { buttonClass, ExternalAction, InternalAction } from "@/components/ui/buttons";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { SectionIntro } from "@/components/ui/SectionIntro";

type Props = { t: Dictionary; locale: Locale };

// Uneven frames, as in Experiences, so the three moments read as an editorial sequence rather than a card row.
const frames = ["aspect-[4/5]", "aspect-[4/5] md:mt-24", "aspect-[4/5] md:mt-12"];

/**
 * Book Open Gus. glaecier.com exposes no public availability API (the calendar is rendered server-side by its
 * Flexybox WordPress plugin, with no CORS access for other origins), so this page never shows dates, gusmasters or
 * seats itself: it presents the fixed, published schedule as a reservation summary and hands over to the official
 * calendar, where booking and payment happen. See docs/refinement-06.md.
 */
export function BookPage({ t, locale }: Props) {
  const b = t.book;
  const card = b.sessions.card;
  return (
    <>
      <PageHero item={media.book.hero} locale={locale} eyebrow={b.eyebrow} title={b.title} intro={b.intro}>
        <a href="#sessions" className={buttonClass("solid", "max-sm:w-full")}>
          {b.primary}
        </a>
        <a href="#expect" className={buttonClass("text", "md:border md:border-current/60 md:bg-none md:px-7 md:py-4 md:hover:border-current md:hover:bg-paper/10")}>
          {b.secondary}
        </a>
      </PageHero>

      {/* Choose your session: the published schedule as a reservation summary, then the official calendar. */}
      <section id="sessions" aria-labelledby="sessions-title" className="bg-paper py-24 md:py-40">
        <div className="container-page grid gap-y-16 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5 lg:pt-4">
            <SectionIntro eyebrow={b.sessions.eyebrow} heading={b.sessions.heading} headingId="sessions-title" className="text-wood [&_h2]:text-ink" />
            <p className="reveal mt-6 max-w-md text-lg leading-relaxed text-stone">{b.sessions.body}</p>

            <h3 className="eyebrow reveal mt-14 text-wood">{b.sessions.stepsHeading}</h3>
            <ol className="mt-6 border-t border-ink/15">
              {b.sessions.steps.map((step, i) => (
                <li key={step.title} className="reveal grid grid-cols-[2.75rem_1fr] border-b border-ink/15 py-6">
                  <span className="eyebrow pt-1 text-wood">0{i + 1}</span>
                  <div>
                    <p className="font-serif text-2xl font-light">{step.title}</p>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-stone">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <article aria-labelledby="reservation-title" className="reveal bg-ink p-7 text-paper sm:p-10 lg:sticky lg:top-32 xl:p-14">
              <h3 id="reservation-title" className="eyebrow text-fog">
                {card.label}
              </h3>
              <dl className="mt-8 divide-y divide-paper/15 border-y border-paper/15">
                {[card.experience, card.day].map(([label, value]) => (
                  <div key={label} className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <dt className="eyebrow pt-1 text-fog">{label}</dt>
                    <dd className="font-serif text-2xl font-light">{value}</dd>
                  </div>
                ))}
                <div className="grid gap-3 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="eyebrow pt-1 text-fog">{card.time}</dt>
                  <dd>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {card.slots.map((slot) => (
                        <li key={slot.time} className="border border-paper/20 px-4 py-4 xl:px-5">
                          <span className="eyebrow block text-fog">{slot.name}</span>
                          <span className="mt-2 block font-serif text-2xl leading-none font-light whitespace-nowrap tabular-nums xl:text-[1.75rem]">{slot.time}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                {[card.capacity, card.gusmaster].map(([label, value]) => (
                  <div key={label} className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                    <dt className="eyebrow pt-1 text-fog">{label}</dt>
                    <dd className="text-paper/85">{value}</dd>
                  </div>
                ))}
              </dl>
              <ExternalAction href={links.bookOpenGus} newTab={t.nav.newTab} variant="solid" className="mt-10 w-full text-center whitespace-normal!">
                {card.cta}
                <span aria-hidden="true">↗</span>
              </ExternalAction>
              <p className="mt-5 text-xs leading-relaxed text-fog">{card.note}</p>
            </article>
          </div>
        </div>
      </section>

      {/* What to expect: the three moments of a gus. */}
      <section id="expect" aria-labelledby="expect-title" className="bg-sand/60 py-24 md:py-40">
        <div className="container-page">
          <SectionIntro eyebrow={b.expect.eyebrow} heading={b.expect.heading} headingId="expect-title" className="max-w-3xl text-wood [&_h2]:text-ink" />
          <ol className="mt-16 grid gap-14 sm:grid-cols-3 sm:gap-6 md:mt-24 md:gap-10">
            {b.expect.items.map((item, i) => (
              <li key={item.title} className="reveal">
                <Photo item={[media.book.heat, media.book.cold, media.book.rest][i]} locale={locale} sizes="(min-width: 640px) 30vw, 100vw" className={frames[i]} />
                <p className="eyebrow mt-6 text-wood">0{i + 1}</p>
                <h3 className="mt-2 font-serif text-3xl font-light">{item.title}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-stone">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Practical information. */}
      <section aria-labelledby="practical-title" className="bg-paper py-24 md:py-40">
        <div className="container-page grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
          <Photo item={media.book.arrive} locale={locale} sizes="(min-width: 1024px) 40vw, 90vw" effect="reveal" className="aspect-[4/5] w-11/12 sm:w-3/4 lg:col-span-5 lg:w-full" />
          <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <SectionIntro eyebrow={b.practical.eyebrow} heading={b.practical.heading} headingId="practical-title" className="text-wood [&_h2]:text-ink" />
            <dl className="reveal mt-12 border-t border-ink/15">
              {b.practical.items.map((item) => (
                <div key={item.label} className="grid gap-1 border-b border-ink/15 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <dt className="eyebrow pt-1 text-wood">{item.label}</dt>
                  <dd>
                    <span className="text-lg">{item.value}</span>
                    {"note" in item && item.note && <span className="mt-1 block text-sm text-stone">{item.note}</span>}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="reveal mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ExternalAction href={links.directions} newTab={t.nav.newTab} variant="dark">
                {b.practical.directions}
              </ExternalAction>
              <ExternalAction href={links.faq[locale]} newTab={t.nav.newTab} variant="text">
                {b.practical.faq}
              </ExternalAction>
            </div>
            <p className="reveal mt-8 text-sm text-stone">
              {b.practical.contact}{" "}
              <a href={`mailto:${site.email}`} className="link-underline py-1 text-ink">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Bridge to membership. */}
      <section aria-labelledby="member-title" className="bg-harbour py-20 text-paper md:py-28">
        <div className="container-page flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="reveal max-w-xl">
            <h2 id="member-title" className="font-serif text-4xl leading-[1.05] font-light md:text-5xl">
              {b.member.heading}
            </h2>
            <p className="mt-5 leading-relaxed text-paper/80">{b.member.body}</p>
          </div>
          <InternalAction href={pages.signup(locale)} variant="outline" className="reveal max-sm:w-full">
            {b.member.cta}
          </InternalAction>
        </div>
      </section>
    </>
  );
}
