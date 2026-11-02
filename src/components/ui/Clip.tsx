"use client";

import { useEffect, useRef } from "react";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * A short muted loop in place of a photo. The frame comes from `className`, like Photo. The poster stays for reduced
 * motion and Save-Data; otherwise the clip plays only while on screen (preload="none", so nothing loads before that).
 */
export function Clip({ src, poster, label, className = "" }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!video || saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.muted = true; // iOS needs the property, not just the attribute, for inline autoplay.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div role="img" aria-label={label} className={`img-reveal relative overflow-hidden bg-sand ${className}`}>
      <video
        ref={ref}
        src={`${base}${src}`}
        poster={`${base}${poster}`}
        muted
        loop
        playsInline
        disablePictureInPicture
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
