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
  `inline-flex items-center justify-center gap-2.5 whitespace-nowrap text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-[color,background-color,border-color,background-size] duration-500 ease-calm ${variants[variant]} ${extra}`;

/**
 * A call to action that is not wired up yet. It is announced and styled as unavailable so the prototype
 * never passes itself off as working booking, login or application.
 */
export function PrototypeAction({
  children,
  tag,
  variant = "outline",
  className = "",
}: {
  children: ReactNode;
  tag: string;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-disabled="true"
      aria-describedby="prototype-note"
      className={buttonClass(variant, `cursor-not-allowed ${className}`)}
    >
      {children}
      <span className="rounded-full border border-current/50 px-1.5 py-px text-[0.5625rem] leading-tight tracking-[0.12em] opacity-75">
        {tag}
      </span>
    </button>
  );
}
