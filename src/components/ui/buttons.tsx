import type { ReactNode } from "react";

const variants = {
  solid: "bg-paper text-ink px-7 py-4 hover:bg-sand",
  dark: "bg-ink text-paper px-7 py-4 hover:bg-harbour",
  outline: "border border-current/60 px-7 py-4 hover:border-current hover:bg-paper/10",
  /** Header booking button – filled, so it reads as the primary action next to plain nav links. */
  pillLight: "bg-paper text-ink px-4 py-2.5 hover:bg-sand",
  pillDark: "bg-ink text-paper px-4 py-2.5 hover:bg-harbour",
  text: "link-underline py-1",
} as const;

export type ButtonVariant = keyof typeof variants;

export const buttonClass = (variant: ButtonVariant, extra = "") =>
  `inline-flex items-center justify-center gap-2.5 whitespace-nowrap text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-[color,background-color,border-color,background-size,scale] duration-500 ease-calm active:scale-[0.985] motion-reduce:active:scale-100 ${variants[variant]} ${extra}`;

/** Link into one of GLAECIER's official systems (see src/content/links.ts). Opens in a new tab. */
export function ExternalAction({
  href,
  children,
  newTab,
  variant = "outline",
  className = "",
}: {
  href: string;
  children: ReactNode;
  /** Screen-reader note, e.g. "(opens in a new tab)". */
  newTab: string;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)}>
      {children}
      <span className="sr-only"> {newTab}</span>
    </a>
  );
}
