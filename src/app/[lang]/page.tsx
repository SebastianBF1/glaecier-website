import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/i18n/config";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Experiences } from "@/components/sections/Experiences";
import { Facilities } from "@/components/sections/Facilities";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Locations } from "@/components/sections/Locations";
import { Membership } from "@/components/sections/Membership";
import { Philosophy } from "@/components/sections/Philosophy";
import { PrivateHire } from "@/components/sections/PrivateHire";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  // Layout has already rejected unknown locales (dynamicParams = false).
  const locale = (await params).lang as Locale;
  const t = getDictionary(locale);
  const props = { t, locale };

  return (
    <>
      <SiteHeader t={{ nav: t.nav, prototype: t.prototype }} locale={locale} />
      <main id="main">
        <Hero {...props} />
        <Intro {...props} />
        <Facilities {...props} />
        <Experiences {...props} />
        <Membership {...props} />
        <Locations {...props} />
        <PrivateHire {...props} />
        <Philosophy {...props} />
      </main>
      <SiteFooter {...props} />
    </>
  );
}
