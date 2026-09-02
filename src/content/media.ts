/**
 * Zayed Auto is the smallest dealership in this series by a wide margin: 516
 * followers, twenty-three posts, one man — Eslam Zayed — and a handful of
 * cars on a forecourt in Beverly Hills, Sheikh Zayed.
 *
 * It is also the only one that volunteers a fault. On the Creta he writes
 * "فابريكا بالكامل معاده رفرفين امامي" — entirely factory, *two front wings
 * redone*. Every other dealer in this project publishes only what is good.
 * That disclosure is what this page is built around, so the panel map below
 * is transcribed from his words rather than assumed.
 *
 * `panels` marks only what he actually stated. Anything he did not speak to
 * is "unstated", and the page says so rather than filling it in.
 */

export type PanelStatus = "factory" | "redone" | "unstated";

export type PanelId =
  | "bonnet"
  | "roof"
  | "boot"
  | "wing-fl"
  | "wing-fr"
  | "door-fl"
  | "door-fr"
  | "door-rl"
  | "door-rr"
  | "quarter-l"
  | "quarter-r";

export const PANEL_IDS: PanelId[] = [
  "bonnet",
  "roof",
  "boot",
  "wing-fl",
  "wing-fr",
  "door-fl",
  "door-fr",
  "door-rl",
  "door-rr",
  "quarter-l",
  "quarter-r",
];

export type CarId = "merc-c180" | "mini-countryman" | "hyundai-creta";

export type Car = {
  id: CarId;
  marque: string;
  model: string;
  year: string;
  km: string;
  /** Sampled from the car in his own photograph. */
  paint: string;
  /** Which language he wrote this listing in. */
  wrote: "ar" | "en";
  /** His lines, verbatim, in the order he wrote them. */
  lines: string[];
  /** Only what he explicitly stated. */
  panels: Partial<Record<PanelId, PanelStatus>>;
  /** What he says about the bodywork, in his own words. */
  bodyClaim: string;
  frame: string;
  postUrl: string;
};

const post = (code: string) => `https://www.instagram.com/p/${code}/`;

export const CARS: Car[] = [
  {
    id: "merc-c180",
    marque: "Mercedes-Benz",
    model: "C180 AMG",
    year: "2010",
    km: "140,000 km",
    paint: "#b4223f",
    wrote: "ar",
    lines: [
      "أعلى فئة AMG",
      "مش محتاجة مصروف نهائي",
      "رخصة سنة",
      "مرور الشيخ زايد",
      "استيراد من الخارج",
      "فاميه على الرخصة",
    ],
    // He describes the licence and the import, not the panels.
    panels: {},
    bodyClaim: "استيراد من الخارج",
    frame: "/media/merc-c180.jpg",
    postUrl: post("DND3IRZshYD"),
  },
  {
    id: "mini-countryman",
    marque: "MINI",
    model: "Cooper Countryman",
    year: "2019",
    km: "85,000 km",
    paint: "#0c3e63",
    wrote: "en",
    lines: ["All factory paint without any scratches", "Full service done"],
    // "All factory paint" covers the whole shell, so every panel is stated.
    panels: {
      bonnet: "factory",
      roof: "factory",
      boot: "factory",
      "wing-fl": "factory",
      "wing-fr": "factory",
      "door-fl": "factory",
      "door-fr": "factory",
      "door-rl": "factory",
      "door-rr": "factory",
      "quarter-l": "factory",
      "quarter-r": "factory",
    },
    bodyClaim: "All factory paint without any scratches",
    frame: "/media/mini-countryman.jpg",
    postUrl: post("DND2AM8CoXA"),
  },
  {
    id: "hyundai-creta",
    marque: "Hyundai",
    model: "Creta",
    year: "2016",
    km: "—",
    paint: "#c3a253",
    wrote: "ar",
    lines: [
      "فابريكا بالكامل معاده رفرفين امامي",
      "صيانات كامله منتظمه",
      "مش محتاجه اي مصاريف",
      "متاح تقسيط بمقدم يبدأ من ٢٠٪",
    ],
    // The one disclosure in the whole series: factory throughout, except the
    // two front wings.
    panels: {
      bonnet: "factory",
      roof: "factory",
      boot: "factory",
      "wing-fl": "redone",
      "wing-fr": "redone",
      "door-fl": "factory",
      "door-fr": "factory",
      "door-rl": "factory",
      "door-rr": "factory",
      "quarter-l": "factory",
      "quarter-r": "factory",
    },
    bodyClaim: "فابريكا بالكامل معاده رفرفين امامي",
    frame: "/media/hyundai-creta.jpg",
    postUrl: post("DMvW9mdMOdv"),
  },
];

export const FORECOURT_FRAME = "/media/forecourt.jpg";

/** His published financing floor, from the Creta listing. */
export const MIN_DOWN_PCT = 20;

export const PROFILE = {
  instagram: "https://www.instagram.com/zayed_autoo/",
  tiktok: "https://www.tiktok.com/@eslamzayed37",
  phone: "01156888848",
  phoneHref: "tel:+201156888848",
  whatsappHref: "https://wa.me/201156888848",
  address: "Beverly Hills, Sheikh Zayed",
  addressAr: "بفرلي هيلز، الشيخ زايد",
  followers: "516",
  posts: "23",
  person: "Eslam Zayed",
} as const;
