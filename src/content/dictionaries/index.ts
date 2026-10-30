import type { Locale } from "@/i18n/config";
import { da, type Dictionary } from "./da";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { da, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
export type { Dictionary };
