// GLAECIER's official systems. The website only links to them – booking, payment, sign-up and
// login stay on glaecier.com and Flexybox. All checked 2026-10-30 (HTTP 200; /signup/ redirects to /signup).
import type { Locale } from "@/i18n/config";

export const links = {
  /** Open Gus booking for non-members. */
  bookOpenGus: "https://glaecier.com/gus/",
  /** Flexybox member login. */
  memberLogin: "https://profile.flexybox.com/glaecier/sign-in",
  /** Refshaleøen membership lobby sign-up. */
  signupRefshaleoen: "https://glaecier.com/signup/",
  /** Havnegade pre-registration. */
  signupHavnegade: "https://glaecier.com/signup-havnegade/",
  faq: { da: "https://glaecier.com/faq/", en: "https://glaecier.com/en/faq-en/" } satisfies Record<Locale, string>,
} as const;
