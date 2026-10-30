"use client";

import { useEffect, useRef } from "react";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Muted, looping, decorative hero video. It only starts while on screen and when the visitor has not asked for
 * reduced motion or data saving; otherwise the poster (the clip's first frame) stays as the still image.
 * The poster is also what shows while loading, so there is no black flash before playback.
 */
export function AmbientVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!video || saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.muted = true; // React doesn't always render the muted attribute; iOS needs it for inline autoplay.
    // Hidden copies (display: none on the other orientation) never intersect, so they never download or play.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.preload = "auto";
        video.play().catch(() => {}); // blocked autoplay simply leaves the poster
      } else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={`${base}/media/hero-video.mp4`}
      poster={`${base}/media/hero-video-poster.jpg`}
      muted
      loop
      playsInline
      disablePictureInPicture
      preload="none"
      aria-hidden="true"
    />
  );
}
