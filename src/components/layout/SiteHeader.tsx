"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { site } from "@/content/site";
import { locales, type Locale } from "@/i18n/config";
import { PrototypeAction } from "@/components/ui/buttons";
import { Wordmark } from "@/components/ui/Wordmark";

type NavItem = Dictionary["nav"]["items"][number];
// Only what the header needs, so the full dictionary isn't serialised into the client bundle.
export type HeaderText = Pick<Dictionary, "nav" | "prototype">;

function LanguageSwitch({ t, locale, className = "" }: { t: HeaderText; locale: Locale; className?: string }) {
  return (
    <div role="group" aria-label={t.nav.language.label} className={`eyebrow flex items-center gap-1.5 ${className}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true" className="opacity-40">/</span>}
          <Link prefetch={false}
            href={`/${l}`}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "page" : undefined}
            className="py-2 opacity-55 transition-opacity hover:opacity-100 aria-[current=page]:opacity-100"
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}

/** Desktop disclosure for a nav item with children (Private & Corporate). Click, Enter/Space or hover opens; Esc closes. */
function NavGroup({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLLIElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <li
      ref={root}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onBlur={(e) => !root.current?.contains(e.relatedTarget as Node) && setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          button.current?.focus();
        }
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={`subnav-${item.id}`}
        onClick={() => setOpen((o) => !o)}
        className="eyebrow link-underline flex items-center gap-2 py-2 whitespace-nowrap"
      >
        {item.label}
        <svg aria-hidden="true" viewBox="0 0 10 6" className={`w-2.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      {/* pt-4 bridges the gap so the hover doesn't drop between button and panel */}
      <div
        id={`subnav-${item.id}`}
        // Visibility flips instantly on open (so links are focusable at once) and only after the fade on close.
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 duration-300 ease-calm ${
          open
            ? "visible translate-y-0 opacity-100 transition-[opacity,translate]"
            : "invisible -translate-y-1 opacity-0 transition-[opacity,translate,visibility]"
        }`}
      >
        <ul className="min-w-60 bg-paper py-3 text-ink shadow-[0_18px_40px_-20px_rgb(28_27_25/0.45)]">
          {item.children.map((child) => (
            <li key={child.id}>
              <a href={`#${child.id}`} onClick={() => setOpen(false)} className="block px-6 py-2.5 text-sm transition-colors hover:bg-sand/70">
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function SiteHeader({ t, locale }: { t: HeaderText; locale: Locale }) {
  const [solid, setSolid] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => dialog.current?.close();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,color,box-shadow] duration-700 ease-calm ${
        solid ? "bg-paper/92 text-ink shadow-[0_1px_0_rgb(28_27_25/0.08)] backdrop-blur-md" : "text-paper"
      }`}
    >
      <p className={`px-5 py-1 text-center text-[0.6875rem] tracking-wide transition-colors duration-700 ${solid ? "bg-sand/80" : "bg-ink/40"}`}>
        {t.prototype.banner}
      </p>

      <div className="container-page relative flex h-16 items-center gap-4 lg:h-20">
        <button
          type="button"
          className="eyebrow flex items-center gap-3 py-2 xl:hidden"
          aria-haspopup="dialog"
          aria-controls="site-menu"
          onClick={() => dialog.current?.showModal()}
        >
          <span aria-hidden="true" className="flex w-6 flex-col gap-[7px]">
            <span className="h-px bg-current" />
            <span className="h-px w-2/3 bg-current" />
          </span>
          <span className="max-sm:sr-only">{t.nav.menu}</span>
        </button>

        <Link prefetch={false}
          href={`/${locale}`}
          aria-label={t.nav.home}
          className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 xl:static xl:translate-x-0"
        >
          <Wordmark className="h-5 sm:h-6 lg:h-7" />
        </Link>

        <nav aria-label={t.nav.label} className="ml-12 hidden xl:block 2xl:ml-20">
          <ul className="flex items-center gap-8 2xl:gap-12">
            {t.nav.items.map((item) =>
              item.children.length ? (
                <NavGroup key={item.id} item={item} />
              ) : (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="eyebrow link-underline py-2 whitespace-nowrap">
                    {item.label}
                  </a>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-6 xl:gap-5 2xl:gap-7">
          <LanguageSwitch t={t} locale={locale} className="hidden xl:flex" />
          <PrototypeAction tag={t.prototype.tag} variant="text" className="max-lg:hidden">
            {t.nav.login}
          </PrototypeAction>
          <span aria-hidden="true" className="hidden h-5 w-px bg-current opacity-25 lg:max-xl:block 2xl:block" />
          <PrototypeAction tag={t.prototype.tag} variant={solid ? "pillDark" : "pillLight"}>
            {t.nav.book}
          </PrototypeAction>
        </div>
      </div>

      <dialog
        id="site-menu"
        ref={dialog}
        aria-label={t.nav.label}
        className="menu-dialog m-0 h-dvh max-h-none w-full max-w-none bg-ink text-paper backdrop:bg-ink/60"
      >
        <div className="container-page flex min-h-full flex-col pb-10">
          <div className="flex h-16 items-center justify-between lg:h-20">
            <Wordmark className="h-5 sm:h-6" />
            <button type="button" onClick={close} className="eyebrow flex items-center gap-3 py-2" autoFocus>
              {t.nav.close}
              <span aria-hidden="true" className="relative block size-4">
                <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav aria-label={t.nav.label} className="mt-10 md:mt-16">
            <ul className="space-y-2">
              {t.nav.items.map((item) => (
                <li key={item.id} className="menu-item">
                  <a href={`#${item.id}`} onClick={close} className="block py-2 font-serif text-4xl font-light md:text-5xl">
                    {item.label}
                  </a>
                  {item.children.length > 0 && (
                    <ul className="mt-1 mb-3 flex flex-wrap gap-x-6 gap-y-1 text-fog">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <a href={`#${child.id}`} onClick={close} className="block py-1.5 text-sm hover:text-paper">
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto space-y-8 pt-12">
            <div className="flex flex-wrap gap-3">
              <PrototypeAction tag={t.prototype.tag} variant="solid">
                {t.nav.book}
              </PrototypeAction>
              <PrototypeAction tag={t.prototype.tag} variant="outline">
                {t.nav.login}
              </PrototypeAction>
            </div>
            <div className="flex items-center justify-between border-t border-paper/20 pt-6 text-sm text-fog">
              <a href={`mailto:${site.email}`} className="hover:text-paper">
                {site.email}
              </a>
              <LanguageSwitch t={t} locale={locale} className="text-paper" />
            </div>
          </div>
        </div>
      </dialog>
    </header>
  );
}
