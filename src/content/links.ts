// GLAECIER's official systems. The website only links to them – booking, payment, sign-up and
// login stay on glaecier.com and Flexybox. Checked 2026-11-02 (Refinement 06 audit, docs/refinement-06.md):
// none of them offers a public API or an approved embed, so the site's own /book/ and /signup/ pages introduce
// the step and hand over to these URLs.
import type { Locale } from "@/i18n/config";

export const links = {
  /** Open Gus calendar for non-members (live dates, gusmaster and seats; checkout via Flexybox). */
  bookOpenGus: "https://glaecier.com/gus/",
  /** Flexybox member login. */
  memberLogin: "https://profile.flexybox.com/glaecier/sign-in",
  /** Refshaleøen membership lobby sign-up form. */
  signupRefshaleoen: "https://glaecier.com/signup-refshaleoen/",
  /** Havnegade pre-registration form. */
  signupHavnegade: "https://glaecier.com/signup-havnegade/",
  /** Membership and subscription terms (linked from the official sign-up form). */
  membershipTerms: "https://glaecier.com/glaeciers-membership-and-subscription-terms/",
  faq: { da: "https://glaecier.com/faq/", en: "https://glaecier.com/en/faq-en/" } satisfies Record<Locale, string>,
  /** Directions to Refshalevej 143. */
  directions: "https://www.google.com/maps/search/?api=1&query=Glaecier%2C%20Refshalevej%20143%2C%201432%20K%C3%B8benhavn",
} as const;

/** The site's own pages. Next's Link adds the base path. */
export const pages = {
  home: (l: Locale) => `/${l}/`,
  book: (l: Locale) => `/${l}/book/`,
  signup: (l: Locale) => `/${l}/signup/`,
};
export type Page = "home" | "book" | "signup";
