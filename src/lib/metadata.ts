import type { Metadata } from "next";
import { getMedia, media } from "@/content/media";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/config";

/** Per-page metadata. `path` is "" for the homepage or e.g. "book/"; all URLs are relative to metadataBase (which
 *  includes the base path on GitHub Pages). */
export function pageMetadata(lang: Locale, { title, description, path = "" }: { title: string; description: string; path?: string }): Metadata {
  const og = getMedia(media.og);
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: { canonical: `${lang}/${path}`, languages: { da: `da/${path}`, en: `en/${path}`, "x-default": `da/${path}` } },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: lang === "da" ? "da_DK" : "en_GB",
      url: `${lang}/${path}`,
      title,
      description,
      images: [{ url: og.src.slice(1), width: og.width, height: og.height, alt: media.og.alt[lang] }],
    },
    // PROTOTYPE: keep out of search engines until launch.
    robots: { index: false, follow: false },
  };
}
