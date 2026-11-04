// The single place where photographs are chosen for the homepage.
// To swap an image: drop the original in /assets/images, run `npm run media`, then change the slug here.
// Ungraded DSC originals are preferred over the graded/renamed copies for a consistent colour atmosphere.
// Rationale per choice lives in docs/asset-manifest.md.
import inventory from "./media-inventory.json";
import type { Locale } from "@/i18n/config";

export type Slug = keyof typeof inventory;

export type MediaItem = {
  slug: Slug;
  alt: Record<Locale, string>;
  /** CSS object-position, used when the frame crops the photo. */
  position?: string;
};

const m = (slug: Slug, da: string, en: string, position?: string): MediaItem => ({ slug, alt: { da, en }, position });

export const media = {
  heroes: {
    // Option A – Golden hour. Only a 1086×1448 phone photo exists; soft on large screens until the original file is supplied.
    a: {
      desktop: m(
        "whatsapp-image-2026-10-06-at-12-22-48",
        "Poolen under pergolaen ved solnedgang, med orange himmel spejlet i vandet",
        "The pool beneath the pergola at sunset, with the orange sky reflected in the water",
        "50% 40%",
      ),
      mobile: m(
        "whatsapp-image-2026-10-06-at-12-22-48",
        "Poolen under pergolaen ved solnedgang, med orange himmel spejlet i vandet",
        "The pool beneath the pergola at sunset, with the orange sky reflected in the water",
        "50% 50%",
      ),
    },
    // Option B – Architectural Nordic.
    b: {
      desktop: m(
        "dsc07485",
        "Trædækket, poolen og pergolaen på Refshaleøen ud mod havnen",
        "The timber deck, pool and pergola at Refshaleøen facing the harbour",
        "50% 62%",
      ),
      mobile: m("dsc07608", "Poolen set fra trappen, med pergola og havn bagved", "The pool seen from the steps, with the pergola and harbour beyond", "50% 60%"),
    },
  },
  // A quiet human moment straight after the hero: a guest by the window, seen through glass and reflections.
  intro: m(
    "solnedgang-over-havnen",
    "Solnedgang over havnen, set fra det våde trædæk med badestiger og pool",
    "Sunset over the harbour, seen from the wet timber deck with swim ladders and pool",
  ),
  // All supplied photos, including those showing people, are approved for publication (client, 2026-10-30).
  // Changing a slug here also means updating the public/media allow-list in .gitignore (`npm run check:export` catches misses).
  facilities: {
    sauna: m("dsc07850", "Panorama-saunaen med træbænke, sten og vinduer mod havnen", "The panorama sauna with timber benches, stones and windows to the harbour", "50% 55%"),
    pool: m("dsc07890", "Poolen med trappe og gelænder under dækkets pergola", "The pool with steps and handrail beneath the deck pergola", "50% 75%"),
    // Small water detail set against the pool frame.
    detail: m("dsc07504", "Poolens mosaikfliser under vandet", "The pool's mosaic tiles under the water", "40% 50%"),
    deck: m("dsc07963", "Dækket med liggestole og en glaspavillon ud mod vandet", "The deck with loungers and a glazed pavilion facing the water", "62% 50%"),
  },
  experiences: {
    // Phone clip (464×832, 7.9 s) shown at native size; a higher-resolution original would look sharper on large screens.
    clip: {
      src: "/media/experiences-gus.mp4",
      poster: "/media/experiences-gus-poster.jpg",
      alt: {
        da: "En gusmester ved vinduet og gæster på bænkene under en gus i panorama-saunaen",
        en: "A gusmaster by the window and guests on the benches during a gus in the panorama sauna",
      },
    },
    // Order matches experiences.featured in the dictionaries.
    featured: [
      m("dsc07593", "En gæst i saunaen ser ud over havnen", "A guest in the sauna looking out over the harbour", "50% 40%"),
      m("dsc08152", "Gæster i saunaen, set gennem grønne blade", "Guests in the sauna, seen through green leaves", "55% 50%"),
      m("dsc08088", "En gæst hviler mellem runderne", "A guest resting between rounds", "56% 50%"),
    ],
  },
  // Shown as a sticky, screen-height panel on large screens so the crop keeps the harbour and harbour bus in view.
  membership: m("dsc08126", "En gæst med saunahat ser ud over havnen og en gul havnebus", "A guest in a sauna hat looking out over the harbour and a yellow harbour bus", "60% 50%"),
  locations: {
    refshaleoen: m("dsc08017", "En liggestol i træ på dækket ud mod havnen", "A wooden lounger on the deck facing the harbour", "45% 60%"),
    // No photograph of Havnegade exists yet; the component renders a neutral placeholder.
  },
  hire: {
    main: m("dsc07799", "Varme pendellamper i loungen", "Warm pendant lamps in the lounge", "50% 40%"),
    // A brand morning on the deck: guests between rounds, then the event's welcome sign.
    guests: m("event-gaester-i-haandklaeder", "Gæster i stribede håndklæder hviler på trædækket mellem saunarunderne", "Guests in striped towels resting on the deck between sauna rounds"),
    event: m("event-velkomst-paa-daekket", "Velkomstskilt til et brand-arrangement på dækket, med produkter og håndklæder på podier", "Welcome sign for a brand event on the deck, with products and towels on plinths"),
  },
  // An archive photo of the old harbour opens the harbour-blue Our Story section: the 250-year tradition, shown.
  // Only a 555×349 copy exists (client, 2026-11-04); a larger scan would look sharper on wide screens.
  philosophy: m(
    "historisk-havn",
    "Historisk sort-hvid foto af havnen med badehus, robåde, en træbro og sejlskibe ved kajen",
    "Historic black-and-white photo of the harbour with a bathhouse, rowing boats, a timber bridge and sailing ships at the quay",
    "50% 28%",
  ),
  og: m("dsc07485", "Glaecier ved Refshaleøen", "Glaecier at Refshaleøen"),
  // Book Open Gus page (/book/).
  book: {
    hero: m("dsc07649", "En gusmester gør klar i saunaen med et håndklæde", "A gusmaster preparing in the sauna with a towel", "58% 40%"),
    heat: m("dsc07838", "Spanden med vand ved saunaens varme sten", "The water bucket by the sauna's hot stones", "50% 45%"),
    cold: m("dsc07898", "Trappen ned i den flydende pool under pergolaen", "The steps down into the floating pool beneath the pergola", "45% 70%"),
    rest: m("dsc08000", "Palmer i loungen med udsigt til poolen", "Palms in the lounge with a view of the pool", "45% 50%"),
    arrive: m("dsc07719", "Trappen ned til dækket med havnen og Holmen bagved", "The stairs down to the deck with the harbour and Holmen beyond", "40% 60%"),
  },
  // Membership / sign-up page (/signup/). No photograph of Havnegade exists; that card is typographic.
  signup: {
    hero: m("dsc07485", "Trædækket, poolen og pergolaen på Refshaleøen ud mod havnen", "The timber deck, pool and pergola at Refshaleøen facing the harbour", "50% 62%"),
    refshaleoen: m("dsc07608", "Poolen på Refshaleøen set fra trappen, med pergola og havn bagved", "The pool at Refshaleøen seen from the steps, with the pergola and harbour beyond", "50% 60%"),
  },
};

export const getMedia = (item: MediaItem) => inventory[item.slug];
