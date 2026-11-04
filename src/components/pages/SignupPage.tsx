import type { Dictionary } from "@/content/dictionaries";
import { links, pages } from "@/content/links";
import { media } from "@/content/media";
import type { Locale } from "@/i18n/config";
import { buttonClass, ExternalAction, InternalAction } from "@/components/ui/buttons";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { SectionIntro } from "@/components/ui/SectionIntro";

type Props = { t: Dictionary; locale: Locale };

/** Hairline list of the facts that set a location apart. */
function Points({ items, tone }: { items: string[]; tone: "ink" | "paper" }) {
  return (
    <ul className={`mt-8 divide-y border-y text-[0.9375rem] leading-relaxed ${tone === "ink" ? "divide-ink/15 border-ink/15 text-stone" : "divide-paper/15 border-paper/15 text-paper/80"}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-4 py-3.5">
          <span aria-hidden="true" className={`mt-[0.7em] h-px w-4 shrink-0 ${tone === "ink" ? "bg-wood" : "bg-fog"}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Membership / sign-up. Both registrations stay in glaecier.com's own forms (they post to WordPress with a reCAPTCHA
 * bound to that domain, link the terms and privacy policy, and offer no API or approved embed), so this page explains
 * the two locations and hands over to the right form. It collects nothing itself. See docs/refinement-06.md.
 */
export function SignupPage({ t, locale }: Props) {
  const s = t.signup;
  return (
    <>
      <PageHero item={media.signup.hero} locale={locale} eyebrow={s.eyebrow} title={s.title} intro={s.intro}>
        <a href="#refshaleoen" className={buttonClass("solid", "max-sm:w-full")}>
          {s.refshaleoen.name}
        </a>
        <a href="#havnegade" className={buttonClass("text", "md:border md:border-current/60 md:bg-none md:px-7 md:py-4 md:hover:border-current md:hover:bg-paper/10")}>
          {s.havnegade.name}
        </a>
      </PageHero>

      {/* The two locations side by side: an open club (primary action) and an upcoming one (secondary action). */}
      <section aria-label={`${s.refshaleoen.name} · ${s.havnegade.name}`} className="bg-paper py-24 md:py-36">
        <div className="container-page grid gap-24 lg:grid-cols-2 lg:gap-10 xl:gap-16">
          <article id="refshaleoen" aria-labelledby="refshaleoen-title" className="scroll-mt-28">
            <Photo item={media.signup.refshaleoen} locale={locale} sizes="(min-width: 1024px) 45vw, 100vw" effect="reveal" className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]" />
            <div className="reveal mt-10">
              <p className="eyebrow flex items-center gap-3 text-wood">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-wood" />
                {s.refshaleoen.status}
              </p>
              <h2 id="refshaleoen-title" className="mt-4 font-serif text-5xl leading-none font-light md:text-6xl">
                {s.refshaleoen.name}
              </h2>
              <p className="mt-6 font-serif text-2xl leading-snug font-light">{s.refshaleoen.title}</p>
              <p className="mt-3 max-w-md leading-relaxed text-stone">{s.refshaleoen.body}</p>
              <Points items={s.refshaleoen.points} tone="ink" />
              <ExternalAction href={links.signupRefshaleoen} newTab={t.nav.newTab} variant="dark" className="mt-10 max-sm:w-full">
                {s.refshaleoen.cta}
                <span aria-hidden="true">↗</span>
              </ExternalAction>
            </div>
          </article>

          <article id="havnegade" aria-labelledby="havnegade-title" className="scroll-mt-28 lg:mt-32">
            <Photo item={media.signup.havnegade} locale={locale} sizes="(min-width: 1024px) 45vw, 100vw" effect="reveal" className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]" />
            <div className="reveal mt-10">
              <p className="eyebrow flex items-center gap-3 text-harbour">
                <span aria-hidden="true" className="size-1.5 rounded-full border border-harbour" />
                {s.havnegade.status}
              </p>
              <h2 id="havnegade-title" className="mt-4 font-serif text-5xl leading-none font-light md:text-6xl">
                {s.havnegade.name}
              </h2>
              <p className="mt-6 font-serif text-2xl leading-snug font-light">{s.havnegade.title}</p>
              <p className="mt-3 max-w-md leading-relaxed text-stone">{s.havnegade.body}</p>
              <Points items={s.havnegade.points} tone="ink" />
              <ExternalAction href={links.signupHavnegade} newTab={t.nav.newTab} variant="outline" className="mt-10 border-ink/60 hover:border-ink hover:bg-ink/5 max-sm:w-full">
                {s.havnegade.cta}
                <span aria-hidden="true">↗</span>
              </ExternalAction>
            </div>
          </article>
        </div>
      </section>

      {/* Prices (Refshaleøen). */}
      <section aria-labelledby="prices-title" className="bg-ink py-24 text-paper md:py-36">
        <div className="container-page grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <SectionIntro eyebrow={s.prices.eyebrow} heading={s.prices.heading} headingId="prices-title" className="text-fog [&_h2]:text-paper" />
            <p className="reveal mt-6 max-w-sm text-lg leading-relaxed text-paper/80">{s.prices.includes}</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <dl className="reveal border-t border-paper/20">
              {s.prices.tiers.map((tier) => (
                <div key={tier.who} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-paper/20 py-6 md:py-7">
                  <dt className="text-paper/85">{tier.who}</dt>
                  <dd className="font-serif font-light">
                    <span className="text-5xl tabular-nums md:text-6xl">{tier.price}</span> <span className="text-lg text-fog">{s.prices.unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <ul className="reveal mt-8 flex flex-col gap-2 text-sm text-fog sm:flex-row sm:flex-wrap sm:gap-x-8">
              {s.prices.terms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
            <div className="reveal mt-8 flex flex-col items-start gap-3">
              <ExternalAction href={links.membershipTerms} newTab={t.nav.newTab} variant="text" className="text-paper">
                {s.prices.termsLink}
              </ExternalAction>
              <p className="text-sm text-fog">{s.prices.havnegade}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works. */}
      <section aria-labelledby="steps-title" className="bg-paper py-24 md:py-36">
        <div className="container-page">
          <SectionIntro eyebrow={s.steps.eyebrow} heading={s.steps.heading} headingId="steps-title" className="max-w-3xl text-wood [&_h2]:text-ink" />
          <ol className="mt-14 grid gap-px bg-ink/15 md:mt-20 md:grid-cols-3">
            {s.steps.items.map((step, i) => (
              <li key={step.title} className="reveal bg-paper py-8 md:px-8 md:py-10 md:first:pl-0">
                <span className="font-serif text-5xl font-light text-wood/70 tabular-nums">0{i + 1}</span>
                <h3 className="mt-6 font-serif text-2xl font-light">{step.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="reveal mt-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-stone">{s.privacy}</p>
            <ExternalAction href={links.signupRefshaleoen} newTab={t.nav.newTab} variant="dark" className="shrink-0 max-sm:w-full">
              {s.refshaleoen.cta}
              <span aria-hidden="true">↗</span>
            </ExternalAction>
          </div>
        </div>
      </section>

      {/* Bridge to Open Gus. */}
      <section aria-labelledby="gus-title" className="bg-sand/60 py-20 md:py-28">
        <div className="container-page flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <h2 id="gus-title" className="reveal max-w-2xl font-serif text-4xl leading-[1.05] font-light md:text-5xl">
            {s.gus.heading}
          </h2>
          <InternalAction href={pages.book(locale)} variant="dark" className="reveal max-sm:w-full">
            {s.gus.cta}
          </InternalAction>
        </div>
      </section>
    </>
  );
}
