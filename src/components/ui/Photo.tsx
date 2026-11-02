import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { getMedia, type MediaItem } from "@/content/media";

/**
 * A cropped photograph. The frame (aspect ratio / height) comes from `className`.
 * `effect`: "reveal" unveils the frame as it scrolls in; "parallax" drifts the image inside a fixed frame.
 * Both are CSS scroll-driven and switched off for reduced motion (see globals.css).
 */
export function Photo({
  item,
  locale,
  sizes,
  className = "",
  imgClassName = "",
  effect,
  priority = false,
}: {
  item: MediaItem;
  locale: Locale;
  sizes: string;
  className?: string;
  imgClassName?: string;
  effect?: "reveal" | "parallax";
  /** Above-the-fold (page hero): load eagerly with high fetch priority. */
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-sand ${effect === "reveal" ? "img-reveal" : effect === "parallax" ? "img-parallax" : ""} ${className}`}>
      <Image
        src={getMedia(item).src}
        alt={item.alt[locale]}
        fill
        sizes={sizes}
        {...(priority && { loading: "eager" as const, fetchPriority: "high" as const })}
        className={`object-cover ${imgClassName}`}
        style={{ objectPosition: item.position }}
      />
    </div>
  );
}
