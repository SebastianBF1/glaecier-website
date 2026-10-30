export const locales = ["da", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "da";

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);
