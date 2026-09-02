import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";
import type { CarId, PanelId, PanelStatus } from "./media";

/**
 * Zayed Auto is one man with a handful of cars who does something no other
 * dealership in this series does: he says what has been redone. The shared
 * schema has no vocabulary for a disclosure, a panel map, or a seller who is
 * also the shop.
 */
export type ZayedContent = SiteContent & {
  hero: SiteContent["hero"] & {
    heroAlt: string;
    disclosureLead: string;
    disclosureQuote: string;
    disclosureGloss: string;
  };
  map: {
    eyebrow: string;
    heading: string;
    intro: string;
    statuses: Record<PanelStatus, string>;
    panelNames: Record<PanelId, string>;
    hoverHint: string;
    unstatedNote: string;
    mapAlt: string;
  };
  cars: {
    eyebrow: string;
    heading: string;
    intro: string;
    theirWords: string;
    wroteAr: string;
    wroteEn: string;
    bodyLabel: string;
    yearLabel: string;
    kmLabel: string;
    viewPost: string;
    notes: Record<CarId, string>;
  };
  shop: {
    eyebrow: string;
    heading: string;
    body: string[];
    forecourtAlt: string;
    followersLabel: string;
    postsLabel: string;
    runBy: string;
    downLabel: string;
    cta: string;
    tiktokCta: string;
  };
};

export function useZayed() {
  return useContent() as ZayedContent;
}
