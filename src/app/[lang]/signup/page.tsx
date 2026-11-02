import type { Metadata } from "next";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SignupPage } from "@/components/pages/SignupPage";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  return pageMetadata(lang, { ...getDictionary(lang).signup.meta, path: "signup/" });
}

export default async function Signup({ params }: Props) {
  const locale = (await params).lang as Locale;
  const t = getDictionary(locale);
  return (
    <>
      <SiteHeader t={{ nav: t.nav, prototype: t.prototype }} locale={locale} page="signup" />
      <main id="main">
        <SignupPage t={t} locale={locale} />
      </main>
      <SiteFooter t={t} locale={locale} page="signup" />
    </>
  );
}
