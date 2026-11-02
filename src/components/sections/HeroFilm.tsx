"use client";

import { useEffect, useRef, useState } from "react";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const film = {
  desktop: `${base}/media/hero-film-desktop.mp4`, // 1920×924, landscape screens
  mobile: `${base}/media/hero-film-mobile.mp4`, // 720×1280 portrait window from the same footage
  posterDesktop: `${base}/media/hero-film-desktop-poster.jpg`,
  posterMobile: `${base}/media/hero-film-mobile-poster.jpg`,
};

/**
 * Full-bleed, muted, looping hero film. The poster (<picture>, so phones never fetch the desktop still) is the first
 * paint and the reduced-motion / data-saver / blocked-autoplay fallback. Only the file for the current orientation is
 * downloaded; it fades in over the poster once frames are playing, and pauses when the hero is off screen.
 */
export function HeroFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!video || saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.src = window.matchMedia("(orientation: portrait)").matches ? video.dataset.mobile! : video.dataset.desktop!;
    video.muted = true; // React doesn't always render the muted attribute; iOS needs it for inline autoplay.
    const onPlaying = () => setPlaying(true);
    video.addEventListener("playing", onPlaying);
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {}); // blocked autoplay simply leaves the poster
      else video.pause();
    });
    io.observe(video);
    return () => {
      io.disconnect();
      video.removeEventListener("playing", onPlaying);
    };
  }, []);

  return (
    <>
      <picture className="absolute inset-0 -z-20">
        <source media="(orientation: portrait)" srcSet={film.posterMobile} />
        <img src={film.posterDesktop} alt="" fetchPriority="high" className="h-full w-full object-cover" />
      </picture>
      {/* data-* carry the sources so the static export check can see them; src is set client-side per orientation. */}
      <video
        ref={ref}
        data-desktop={film.desktop}
        data-mobile={film.mobile}
        muted
        loop
        playsInline
        disablePictureInPicture
        preload="none"
        aria-hidden="true"
        className={`absolute inset-0 -z-20 h-full w-full object-cover transition-opacity duration-1000 ease-calm ${playing ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}
