"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";

type Variant = "a" | "b";

/** Development-only toggle between hero options. `?hero=a` / `?hero=b` makes a variant linkable. */
export function HeroSwitcher({
  initial,
  labels,
  variants,
}: {
  initial: Variant;
  labels: { label: string; a: string; b: string };
  variants: Record<Variant, ReactNode>;
}) {
  const [variant, setVariant] = useState<Variant>(initial);

  useEffect(() => {
    const fromUrl = () => {
      const q = new URLSearchParams(window.location.search).get("hero");
      if (q === "a" || q === "b") setVariant(q);
    };
    fromUrl();
  }, []);

  const choose = (v: Variant) => {
    setVariant(v);
    const url = new URL(window.location.href);
    url.searchParams.set("hero", v);
    window.history.replaceState(null, "", url);
  };

  return (
    <>
      {/* Keyed so <picture> remounts: browsers don't re-pick an image when only <source> srcsets change. */}
      <Fragment key={variant}>{variants[variant]}</Fragment>
      <div
        role="group"
        aria-label={labels.label}
        className="fixed right-4 bottom-4 z-50 flex items-center gap-1 rounded-full bg-ink/85 p-1 text-[0.6875rem] text-paper shadow-lg backdrop-blur"
      >
        <span className="px-3 opacity-70">DEV</span>
        {(["a", "b"] as const).map((v) => (
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
