// English copy – translation of da.ts. Same source markers apply (see da.ts and docs/content-audit.md).
import type { Dictionary } from "./da";

export const en: Dictionary = {
  meta: {
    title: "Glaecier – Sauna and community on the water in Copenhagen",
    description:
      "Glaecier is a floating sauna community in Copenhagen with a panorama sauna and a floating pool of filtered harbour water. Members’ club at Refshaleøen – Havnegade coming soon.",
  },
  prototype: {
    banner: "Preview of the new website – booking and login take place on glaecier.com.",
    bannerShort: "Preview · booking and login via glaecier.com",
  },
  nav: {
    label: "Main menu",
    skip: "Skip to content",
    menu: "Menu",
    close: "Close menu",
    book: "Book",
    login: "Login",
    home: "Glaecier – home",
    newTab: "(opens in a new tab)",
    language: { label: "Language", current: "EN", switchTo: "Dansk" },
    items: [
      { id: "membership", label: "Membership", children: [] },
      { id: "experiences", label: "Experiences", children: [] },
      {
        id: "private-corporate",
        label: "Private & Corporate",
        children: [
          { id: "private-hire", label: "Private Hire" },
          { id: "corporate-events", label: "Corporate Events" },
          { id: "brand-activations", label: "Brand Activations" },
        ],
      },
      { id: "our-story", label: "Our Story", children: [] },
    ],
  },
  hero: {
    line: "Sauna and bathing on the water in Copenhagen",
    tagline: "Calm sauna experiences on the water in Copenhagen – with a focus on wellbeing, health and community.",
    primary: "Membership",
    secondary: "Book Open Gus",
    video: { title: "A sanctuary on the water.", sub: "Sauna, bathing and community in Copenhagen.", membership: "Explore membership", scroll: "Scroll" },
    switcher: { label: "Hero variant (development only)", a: "A · Golden hour", b: "B · Nordic architecture", video: "Video" },
  },
  intro: {
    eyebrow: "Glaecier · Refshaleøen",
    statement: "Heat, cold and the harbour – in the middle of Copenhagen.",
    body: "A floating sauna community with a panorama sauna and a pool of filtered harbour water – a calm place to step away from the pace of the city.",
    details: [
      "Glaecier is a floating sauna community in Copenhagen, where calm, health and community meet all year round. A place on the water to step away from the pace of the city and be present in the middle of it all.",
      "The panorama sauna opens onto the harbour, and outside lies a floating pool of clean, filtered harbour water. Here you move between heat and cold in a simple, sensory experience.",
    ],
  },
  facilities: {
    eyebrow: "The place",
    heading: "A modern houseboat in the harbour",
    items: [
      { title: "The panorama sauna", body: "Heat with a view across the water." },
      { title: "The floating pool", body: "Clean, filtered harbour water – a natural transition from heat to cold." },
      { title: "Deck and lounge", body: "Pool deck, lounge and a cup of coffee." },
    ],
    details: {
      sauna: "The sauna opens onto the harbour, so the view across the water comes with you into the heat.",
      pool: "Clean, filtered harbour water makes a safe and natural transition from heat to cold.",
      lounge: "Unwind on the pool deck or in the lounge with a cup of coffee. Changing rooms and quiet spaces are part of it.",
    },
  },
  experiences: {
    eyebrow: "Experiences",
    heading: "Heat, scent and steam",
    lead: "Water and essential oils over hot stones, three rounds in the sauna and a dip in the pool in between.",
    featured: [
      { title: "Open Gus", access: "Bookable by everyone", meta: "Tuesday evenings · three rounds with a gusmaster", action: "Book Open Gus" },
      { title: "Member Gus", access: "Members only", meta: "By members, for members · booked in the app", action: "About membership" },
      { title: "Special experiences", access: "Upcoming", meta: "Member events and courses – details to follow", action: "" },
    ],
    cta: "Book Open Gus",
    details: {
      intro:
        "A gus is a sauna ritual in which water infused with essential oils is poured over the hot stones. Steam fills the room, and a gusmaster guides you through three rounds, cooling off in the pool in between.",
      items: [
        {
          title: "Open Gus",
          meta: "For non-members · Tuesdays 18:30–20:00 and 20:30–22:00",
          body: "Experience Glaecier without a membership: three sauna rounds of around 12 minutes, dips in the pool and light refreshments.",
        },
        {
          title: "Member Gus",
          meta: "For members · weekly, booked in the app",
          body: "Created by members, for members. Our gusmasters are volunteers from the community, and every session has its own energy.",
        },
        {
          title: "Gusmaster course",
          meta: "Upcoming · details to follow",
          body: "For the first time, Glaecier is opening a course in gus – the craft behind the heat, and how to create an experience people remember.",
        },
        { title: "Member events", meta: "For members", body: "As a member, you can join the community’s gatherings throughout the year." },
      ],
    },
  },
  membership: {
    eyebrow: "Membership",
    heading: "A community on the water",
    intro: "A private members’ club on the water – come whenever it suits you.",
    paths: [
      {
        label: "Refshaleøen",
        title: "The membership lobby",
        body: "Free and non-binding. Invitations are drawn at random – it is not a waiting list.",
        cta: "Join the lobby",
      },
      {
        label: "Havnegade · opening 2027",
        title: "Pre-registration",
        body: "No waiting list. Register without obligation and be among the first to hear when membership opens.",
        cta: "Pre-register",
      },
    ],
    price: "Priced by age, from 299 DKK/month",
    details: {
      intro:
        "Glaecier is a private members’ club. As a member you come when it suits you – up to 10 visits a month, including gus and member events.",
      lobby:
        "Joining the lobby is free and non-binding. Invitations are sent out at random to keep the community diverse – it is not a waiting list, and when you signed up makes no difference. Invited members attend a mandatory introduction before their membership starts.",
      havnegade:
        "At Havnegade, anyone can join without a waiting list. Register without obligation and be among the first to hear when membership opens.",
      facts: ["Up to 10 visits a month", "Priced by age – from 299 DKK/month", "Start-up fee 399 DKK · 3-month binding period"],
    },
  },
  locations: {
    eyebrow: "Locations",
    heading: "Refshaleøen – and soon Havnegade",
    refshaleoen: {
      name: "Refshaleøen",
      status: "Open",
      body: "At the end of the pier opposite La Banchina – surrounded by water, with a view across the city.",
    },
    havnegade: {
      name: "Havnegade",
      status: "Upcoming · expected to open early 2027 – to be confirmed",
      body: "Directly on the water in the heart of Copenhagen. Address and opening date to be confirmed.",
      placeholder: "Photography to follow",
    },
    hoursLink: "Opening hours",
    hoursLabel: "Members’ opening hours",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    hoursNote: "Tuesday evenings are reserved for Open Gus.",
    details: {
      refshaleoen: "Our first club sits at the end of the pier opposite La Banchina, surrounded by water with a view across Copenhagen.",
      havnegade:
        "Directly on the water in the heart of Copenhagen. Visits are registered through an app. Address, opening date and facilities will be confirmed later.",
    },
  },
  hire: {
    eyebrow: "Private & Corporate",
    heading: "Gather your people on the water",
    lead: "For selected occasions, we open Glaecier to private groups, companies and brands. Thursday evenings are the natural choice.",
    items: [
      { id: "private-hire", audience: "For private groups", title: "Private Hire", body: "Sauna and bathing for your own guests – at Glaecier’s calm pace." },
      { id: "corporate-events", audience: "For companies", title: "Corporate Events", body: "Heat, cold and time together by the harbour – a calm alternative to the meeting room." },
      { id: "brand-activations", audience: "For brands", title: "Brand Activations", body: "Partnerships with brands that share our values of calm, health and community." },
    ],
    cta: "Send an enquiry",
    details: {
      intro:
        "Events are not an everyday occurrence at Glaecier, but we welcome enquiries. Thursday evenings after 17:00 are the ideal time, and larger events can arrange exclusive use of the club.",
      privateHire: "Gather your own people around sauna and bathing. Glaecier is a quiet place, so we do not host stag or hen parties.",
    },
  },
  philosophy: {
    eyebrow: "Our story",
    statement: "A bathing house for today – in a tradition more than 250 years old.",
    body: "Copenhageners have bathed in the harbour for more than 250 years. We continue that tradition – calm, inclusive and in dialogue with our neighbours.",
    details: [
      "For more than 250 years, Copenhagen has had bathing houses along its harbour – from the first wooden bathhouses at Langebro and Rysensteen to the later public baths. Glaecier continues that tradition in a contemporary form.",
      "People meet here across age, background and circumstance – to be together or on their own. Through partnerships with NGOs and minority groups, we work to make the experience accessible to more people.",
      "Glaecier is a quiet place. Sauna and bathing are calm activities, and we develop the site in dialogue with our neighbours.",
    ],
  },
  book: {
    meta: {
      title: "Book Open Gus – Glaecier",
      description: "Open Gus is open to everyone – no membership needed. A guided saunagus with three rounds, dips in the pool and light refreshments at Refshaleøen.",
    },
    eyebrow: "Open Gus · Refshaleøen",
    title: "Your next pause begins here.",
    intro: "Open Gus is open to everyone – no membership needed. A one-hour guided saunagus with three sauna rounds, cooling dips in the pool and light refreshments.",
    primary: "See times and book",
    secondary: "What to expect",
    sessions: {
      eyebrow: "Choose your gus",
      heading: "Two sessions every Tuesday evening",
      body: "Pick a date and time in Glaecier's booking calendar, where you can see the gusmaster and the seats available for each evening.",
      card: {
        label: "Your reservation",
        experience: ["Experience", "Open Gus · for non-members"],
        day: ["Day", "Every Tuesday"],
        time: "Time",
        slots: [
          { name: "First session", time: "18:30–20:00" },
          { name: "Second session", time: "20:30–22:00" },
        ],
        capacity: ["Group", "Up to 26 guests"],
        gusmaster: ["Gusmaster", "Shown in the calendar"],
        cta: "See available seats and book",
        note: "The calendar, booking and payment are handled by Glaecier's official system on glaecier.com.",
      },
      stepsHeading: "How to book",
      steps: [
        { title: "Choose a date and time", body: "The calendar shows the coming Tuesdays with the gusmaster and seats available." },
        { title: "Choose your spots", body: "Enter your name, email and phone number – or log in if you have a profile." },
        { title: "Pay and arrive", body: "Complete the payment online and join us at Refshalevej 143." },
      ],
    },
    expect: {
      eyebrow: "What to expect",
      heading: "Heat, cold and calm",
      items: [
        { title: "The heat", body: "The gusmaster pours water infused with essential oils over the hot stones and guides you through three rounds of about 12 minutes in the panorama sauna." },
        { title: "The cold", body: "Between rounds you dip into the floating pool of clean, filtered harbour water." },
        { title: "The calm", body: "Afterwards there are light refreshments and time to land by the water." },
      ],
    },
    practical: {
      eyebrow: "Practical",
      heading: "Before you come",
      items: [
        { label: "Where", value: "Refshalevej 143, 1432 Copenhagen", note: "At the end of the pier, opposite La Banchina." },
        { label: "When", value: "Tuesdays 18:30–20:00 and 20:30–22:00" },
        { label: "Who", value: "Everyone – no membership needed" },
        { label: "Payment", value: "Online, when you book" },
      ],
      directions: "Get directions",
      faq: "FAQ",
      contact: "Questions? Write to",
    },
    member: {
      heading: "Want to come more often?",
      body: "As a member you come whenever it suits you – up to 10 visits a month, including gus and member events.",
      cta: "About membership",
    },
  },
  signup: {
    meta: {
      title: "Become a member – Glaecier",
      description: "Join the membership lobby at Refshaleøen or pre-register for Havnegade. Free and non-binding.",
    },
    eyebrow: "Become part of Glaecier",
    title: "Choose your place. Find your calm.",
    intro: "Sauna, harbour bathing and community in Copenhagen. Choose your location and sign up.",
    refshaleoen: {
      status: "Open · Membership lobby",
      name: "Refshaleøen",
      title: "Join the membership lobby",
      body: "Our first sauna community – on the water, overlooking Copenhagen.",
      points: [
        "Signing up is free and non-binding.",
        "Invitations are sent out at random to keep the community diverse and balanced.",
        "It's not a waiting list – everyone has an equal chance, whenever they signed up.",
        "Invited members attend a mandatory introduction before their membership starts.",
      ],
      cta: "Join the lobby",
    },
    havnegade: {
      status: "Opening 2027 · Pre-registration",
      name: "Havnegade",
      title: "Be there from the beginning",
      body: "A new free space on the water in the heart of the city – sauna, bathing and calm.",
      points: [
        "Havnegade is an upcoming location. The opening date and details will be confirmed later.",
        "Pre-registration is non-binding and simply registers your interest.",
        "You'll be among the first to hear when membership opens.",
      ],
      cta: "Pre-register",
      placeholder: "Photos to follow",
    },
    prices: {
      eyebrow: "Membership at Refshaleøen",
      heading: "Priced by age",
      tiers: [
        { who: "18–24 years & students", price: "299" },
        { who: "25–29 years & 65+ years", price: "349" },
        { who: "30–65 years", price: "449" },
      ],
      unit: "DKK / month",
      includes: "Up to 10 visits a month, including gus and member events.",
      terms: ["Start-up fee 399 DKK", "Initial binding period of three months", "One month's notice, effective from the 1st of the month"],
      termsLink: "Membership and subscription terms",
      havnegade: "Prices for Havnegade have not been published yet.",
    },
    steps: {
      eyebrow: "How to become a member",
      heading: "Three calm steps",
      items: [
        { title: "Join the lobby", body: "Free and non-binding – in Glaecier's official form." },
        { title: "Invitations are drawn at random", body: "Everyone in the lobby has an equal chance – at any time." },
        { title: "An introduction, and you're in", body: "Invited members attend a mandatory introduction before their membership starts." },
      ],
    },
    privacy: "You sign up in Glaecier's official form on glaecier.com, where you also accept the terms and privacy policy. This page stores no information.",
    gus: { heading: "Want to experience Glaecier without being a member?", cta: "Book Open Gus" },
  },
  footer: {
    signup: "Become a member",
    contact: "Contact",
    more: "More",
    faq: "FAQ",
    book: "Book Open Gus",
    login: "Member login",
    instagram: "Instagram",
    disclaimer: "Prototype of a new website – not the official glaecier.com.",
  },
};
