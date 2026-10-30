"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";

/** Development-only toggle between hero options. `?hero=<key>` (e.g. `?hero=b`) makes a variant linkable. */
export function HeroSwitcher<K extends string>({
  initial,
  labels,
  variants,
}: {
  initial: K;
  labels: { label: string } & Record<K, string>;
  variants: Record<K, ReactNode>;
}) {
  const [variant, setVariant] = useState<K>(initial);
  const keys = Object.keys(variants) as K[];

  useEffect(() => {
    const fromUrl = () => {
      const q = new URLSearchParams(window.location.search).get("hero");
      if (q && q in variants) setVariant(q as K);
    };
    fromUrl();
  }, [variants]);

  const choose = (v: K) => {
    setVariant(v);
    const url = new URL(window.location.href);
    url.searchParams.set("hero", v);
    window.history.replaceState(null, "", url);
  };

  return (
    <>
      {/* Keyed so <picture>/<video> remount: browsers don't re-pick media when only <source> srcsets change. */}
      <Fragment key={variant}>{variants[variant]}</Fragment>
      <div
        role="group"
        aria-label={labels.label}
        className="fixed right-4 bottom-4 z-50 flex items-center gap-1 rounded-full bg-ink/85 p-1 text-[0.6875rem] text-paper shadow-lg backdrop-blur"
      >
        <span className="px-3 opacity-70">DEV</span>
        {keys.map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={variant === v}
            onClick={() => choose(v)}
            className="rounded-full px-3 py-1.5 transition-colors aria-pressed:bg-paper aria-pressed:text-ink"
          >
            {labels[v]}
          </button>
        ))}
      </div>
    </>
  );
}
