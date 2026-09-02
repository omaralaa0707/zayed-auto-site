import type { ZayedContent } from "./schema-ext";
import { PROFILE, MIN_DOWN_PCT } from "./media";

export const en: ZayedContent = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "Zayed Auto",
    shortName: "Zayed",
    tagline: "Beverly Hills, Sheikh Zayed",
  },

  nav: [
    { label: "The panel map", href: "#map" },
    { label: "The cars", href: "#cars" },
    { label: "The shop", href: "#shop" },
  ],

  hero: {
    eyebrow: "516 followers · 23 posts · one forecourt",
    headline: "He tells you what has been redone",
    sub: "Zayed Auto is the smallest dealership in this series and the only one that volunteers a fault. On a 2016 Creta he writes that the car is factory throughout — and then names the two panels that are not.",
    primaryCta: "Call Eslam",
    secondaryCta: "See the cars",
    heroAlt: "A red Mercedes C180 AMG on Zayed Auto's forecourt in Beverly Hills, Sheikh Zayed.",
    disclosureLead: "In his own words",
    disclosureQuote: "فابريكا بالكامل معاده رفرفين امامي",
    disclosureGloss:
      "“Entirely factory — two front wings redone.” Fabrika means every panel still wears the paint it left the factory in. He claims it, and in the same breath takes two panels back out of the claim.",
  },

  about: {
    heading: "Zayed Auto",
    body: [
      "One shopfront on a parade in Beverly Hills, Sheikh Zayed, next to a bank branch. Six or so cars on the pavement outside, a hand-lettered sign above the door, and a phone number.",
    ],
  },

  services: { heading: "The cars", items: [] },
  gallery: { heading: "The cars", items: [] },

  map: {
    eyebrow: "What he actually said",
    heading: "Eleven panels, three answers",
    intro:
      "Egyptian used-car listings turn on one word: فابريكا, fabrika — original factory paint, panel by panel. Most sellers claim it for the whole car. This map marks only what he wrote, so a panel he never mentioned stays blank rather than being filled in.",
    statuses: {
      factory: "Factory paint",
      redone: "Redone — he says so",
      unstated: "He did not say",
    },
    panelNames: {
      bonnet: "Bonnet",
      roof: "Roof",
      boot: "Boot lid",
      "wing-fl": "Front wing, left",
      "wing-fr": "Front wing, right",
      "door-fl": "Front door, left",
      "door-fr": "Front door, right",
      "door-rl": "Rear door, left",
      "door-rr": "Rear door, right",
      "quarter-l": "Rear quarter, left",
      "quarter-r": "Rear quarter, right",
    },
    hoverHint: "Hover a panel to name it.",
    unstatedNote:
      "Grey panels are not a criticism. They are simply panels he did not write about, and this page will not invent an answer for them.",
    mapAlt: "A plan view of a car body split into eleven panels, with the two front wings lifted clear and marked as redone.",
  },

  cars: {
    eyebrow: "On the pavement",
    heading: "Three cars, in his colours",
    intro:
      "Nobody else in this series sells cars this colourful — a red C180, a blue Countryman with white stripes, a yellow Creta. Each one below is set in its own paint, sampled from his photograph of it.",
    theirWords: "His listing",
    wroteAr: "Posted in Arabic",
    wroteEn: "Posted in English",
    bodyLabel: "On the bodywork",
    yearLabel: "Year",
    kmLabel: "Odometer",
    viewPost: "See the post",
    notes: {
      "merc-c180":
        "He spends his lines on the paperwork rather than the panels: a year of licence left, registered at the Sheikh Zayed traffic department, imported, and in his own name.",
      "mini-countryman":
        "The only car he claims outright: all factory paint, no scratches. So every panel on the map is marked.",
      "hyundai-creta":
        "The disclosure. Factory throughout, except two front wings — and an instalment plan from twenty per cent down.",
    },
  },

  shop: {
    eyebrow: "The shop",
    heading: "A pavement, a sign, and a phone number",
    body: [
      "There is no showroom here. The cars stand on the paving outside a small commercial parade, photographed head-on from the road with a bank branch and a shop in the frame.",
      "That is the whole operation, and the page is built to match it: small, plain, and specific about what is known.",
    ],
    forecourtAlt: "Six cars parked on the paving outside Zayed Auto's shopfront in Beverly Hills.",
    followersLabel: "Followers",
    postsLabel: "Posts",
    runBy: "Run by",
    downLabel: `Instalments from ${MIN_DOWN_PCT}% down`,
    cta: "Call the shop",
    tiktokCta: "TikTok",
  },

  contact: {
    heading: "Talk to Eslam",
    addressLabel: "Where",
    address: PROFILE.address,
    phoneLabel: "Call or WhatsApp",
    phones: [PROFILE.phone],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Beverly+Hills+Sheikh+Zayed+Cairo",
    instagramUrl: PROFILE.instagram,
    cta: "Call the shop",
  },

  footer: {
    disclaimer:
      "A concept design, built as a demonstration. Not an official Zayed Auto site, and not affiliated with them. All photography, marks and quoted copy belong to Zayed Auto.",
    rights: "Concept by Claude",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
