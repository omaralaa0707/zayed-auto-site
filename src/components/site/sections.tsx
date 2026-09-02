"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useZayed } from "@/content/schema-ext";
import {
  CARS,
  PANEL_IDS,
  FORECOURT_FRAME,
  PROFILE,
  type CarId,
  type PanelStatus,
} from "@/content/media";
import { PanelMap } from "@/components/webgl/panel-map";

/* ---------------------------------------------------------------- motion -- */

function useOnScreen<T extends HTMLElement>(rootMargin = "-8% 0px -8% 0px") {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}

const delayVar = (d: number) => ({ "--check-delay": `${d}ms` }) as CSSProperties;

/** This site's arrival: the check. Content is confirmed, not performed. */
function Check({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useOnScreen<HTMLElement>();
  const C = Tag as unknown as (p: Record<string, unknown>) => ReactElement;
  return (
    <C ref={ref} data-check="" className={className} style={delayVar(delay)}>
      {children}
    </C>
  );
}

function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const ref = useOnScreen<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-rule=""
      className={`h-px w-full origin-[left_center] bg-flag rtl:origin-[right_center] ${className ?? ""}`}
      style={delayVar(delay)}
    />
  );
}

/* -------------------------------------------------------------------- nav -- */

export function Nav() {
  const c = useZayed();
  const { locale, toggleLocale } = useLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-bay/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[80rem] items-center gap-5 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={c.brand.name}>
          <img src="/mark.svg" alt="" className="h-6 w-6" />
          <span className="font-display text-[0.98rem] font-semibold leading-none text-chalk">
            {c.brand.name}
          </span>
        </a>

        <nav className="ms-auto hidden items-center gap-6 sm:flex">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-2 text-[0.86rem] text-chalk-2 transition-colors hover:text-chalk"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={PROFILE.phoneHref}
          className="latin tnum ms-auto shrink-0 text-[0.88rem] font-medium text-flag transition-opacity hover:opacity-80 sm:ms-0"
        >
          {PROFILE.phone}
        </a>

        <button
          onClick={toggleLocale}
          className="shrink-0 border border-white/20 px-3 py-1.5 text-[0.72rem] text-chalk-2 transition-colors hover:border-flag hover:text-chalk"
          aria-label={c.a11y.toggleLanguage}
        >
          {locale === "ar" ? "EN" : "ع"}
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------- page -- */

export function Sections() {
  const c = useZayed();
  const [carId, setCarId] = useState<CarId>("hyundai-creta");
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const car = CARS.find((x) => x.id === carId) ?? CARS[0];

  const counts = PANEL_IDS.reduce(
    (acc, id) => {
      const s: PanelStatus = car.panels[id] ?? "unstated";
      acc[s] += 1;
      return acc;
    },
    { factory: 0, redone: 0, unstated: 0 } as Record<PanelStatus, number>,
  );

  return (
    <main>
      {/* ------------------------------------------------------------ hero -- */}
      <section id="top" className="w-full pt-16">
        <div className="mx-auto max-w-[80rem] px-5 py-14 sm:px-8 sm:py-20">
          <Check className="max-w-[42rem]">
            <p className="label text-chalk-2">{c.hero.eyebrow}</p>
            <h1 className="mt-4 font-display text-hero font-bold text-chalk">{c.hero.headline}</h1>
            <Rule className="mt-6 max-w-[10rem]" delay={140} />
            <p className="mt-6 text-lead leading-relaxed text-chalk-2">{c.hero.sub}</p>
          </Check>

          {/* The disclosure itself, given the weight it deserves. */}
          <Check delay={90} className="mt-12 border-s-2 border-flag ps-5 sm:ps-7">
            <p className="label text-flag">{c.hero.disclosureLead}</p>
            <p className="term mt-3 text-[clamp(1.5rem,4vw,2.6rem)] leading-snug text-chalk">
              {c.hero.disclosureQuote}
            </p>
            <p className="mt-4 max-w-[38rem] text-[0.95rem] leading-relaxed text-chalk-2">
              {c.hero.disclosureGloss}
            </p>
          </Check>

          <Check delay={140} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={PROFILE.phoneHref}
              className="inline-flex items-center gap-2 bg-flag px-6 py-3 text-[0.86rem] font-semibold text-bay transition-opacity hover:opacity-90"
            >
              {c.hero.primaryCta}
            </a>
            <a
              href="#cars"
              className="inline-flex items-center gap-2 border border-white/25 px-6 py-3 text-[0.86rem] font-semibold text-chalk transition-colors hover:border-flag hover:text-flag"
            >
              {c.hero.secondaryCta}
            </a>
          </Check>
        </div>
      </section>

      {/* ------------------------------------------------------------- map -- */}
      <section id="map" className="border-t border-white/10 bg-bay-2 py-20 sm:py-28">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Check className="max-w-[42rem]">
            <p className="label text-flag">{c.map.eyebrow}</p>
            <h2 className="mt-4 font-display text-display font-bold text-chalk">{c.map.heading}</h2>
            <Rule className="mt-5 max-w-[7rem]" delay={100} />
            <p className="mt-6 text-lead leading-relaxed text-chalk-2">{c.map.intro}</p>
          </Check>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-14">
            <Check delay={80}>
              {/* Which car's disclosure is being mapped. */}
              <div className="flex flex-wrap gap-2">
                {CARS.map((x) => (
                  <button
                    key={x.id}
                    onClick={() => setCarId(x.id)}
                    className={`border px-3.5 py-2 text-[0.84rem] transition-colors ${
                      x.id === carId
                        ? "border-flag text-chalk"
                        : "border-white/20 text-chalk-2 hover:border-white/40"
                    }`}
                  >
                    <span className="latin">{x.model}</span>
                  </button>
                ))}
              </div>

              <div className="relative mt-5 aspect-[4/3] w-full bg-bay-3 sm:aspect-[16/11]">
                <PanelMap
                  panels={car.panels}
                  paint={car.paint}
                  labels={c.map.panelNames}
                  alt={c.map.mapAlt}
                  onHoverLabel={setHoverLabel}
                  className="absolute inset-0 h-full w-full"
                />
                <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[0.8rem] text-chalk-2">
                  {hoverLabel ?? c.map.hoverHint}
                </p>
              </div>
            </Check>

            <Check delay={140}>
              <p className="label text-chalk-2">{car.marque}</p>
              <h3 className="latin mt-1 font-display text-[1.5rem] font-bold text-chalk">
                {car.model}
              </h3>

              <dl className="mt-6 space-y-3">
                {(["factory", "redone", "unstated"] as PanelStatus[]).map((s) => (
                  <div key={s} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <dt className="flex items-center gap-2.5 text-[0.9rem] text-chalk-2">
                      <span
                        aria-hidden="true"
                        className="h-3 w-3 shrink-0 rounded-sm"
                        style={{
                          background:
                            s === "redone"
                              ? "var(--color-chalk)"
                              : s === "factory"
                                ? car.paint
                                : "var(--color-bay-3)",
                          outline:
                            s === "redone"
                              ? "2px solid var(--color-flag)"
                              : s === "unstated"
                                ? "1px solid rgba(255,255,255,0.18)"
                                : "none",
                        }}
                      />
                      {c.map.statuses[s]}
                    </dt>
                    <dd className="tnum font-display text-[1.1rem] text-chalk">{counts[s]}</dd>
                  </div>
                ))}
              </dl>

              <p className="label mt-6 text-chalk-2">{c.cars.bodyLabel}</p>
              <p
                className={`mt-2 text-[1rem] leading-relaxed text-chalk ${car.wrote === "ar" ? "term" : ""}`}
                dir={car.wrote === "ar" ? "rtl" : "ltr"}
              >
                {car.bodyClaim}
              </p>

              <p className="mt-6 text-[0.84rem] leading-relaxed text-chalk-2">
                {c.map.unstatedNote}
              </p>
            </Check>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ cars -- */}
      <section id="cars" className="border-t border-white/10 bg-bay py-20 sm:py-28">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Check className="max-w-[42rem]">
            <p className="label text-flag">{c.cars.eyebrow}</p>
            <h2 className="mt-4 font-display text-display font-bold text-chalk">
              {c.cars.heading}
            </h2>
            <Rule className="mt-5 max-w-[7rem]" delay={100} />
            <p className="mt-6 text-lead leading-relaxed text-chalk-2">{c.cars.intro}</p>
          </Check>

          <div className="mt-12 space-y-12">
            {CARS.map((x, i) => (
              <Check
                key={x.id}
                as="article"
                delay={i * 70}
                className="grid gap-6 lg:grid-cols-2 lg:gap-10"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-bay-2">
                  <img
                    src={x.frame}
                    alt={`${x.marque} ${x.model}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  {/* Each car carries its own paint as its rule. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1"
                    style={{ background: x.paint }}
                  />
                </div>

                <div className="self-center">
                  <p className="label text-chalk-2">{x.marque}</p>
                  <h3 className="latin mt-1 font-display text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-chalk">
                    {x.model}
                  </h3>

                  <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                    <div>
                      <dt className="label text-chalk-3">{c.cars.yearLabel}</dt>
                      <dd className="tnum mt-0.5 text-[1rem] text-chalk">{x.year}</dd>
                    </div>
                    <div>
                      <dt className="label text-chalk-3">{c.cars.kmLabel}</dt>
                      <dd className="tnum mt-0.5 text-[1rem] text-chalk">{x.km}</dd>
                    </div>
                  </dl>

                  <p className="label mt-6 text-chalk-3">{c.cars.theirWords}</p>
                  <ul className="mt-2 space-y-1.5" dir={x.wrote === "ar" ? "rtl" : "ltr"}>
                    {x.lines.map((line) => (
                      <li
                        key={line}
                        className={`text-[0.98rem] leading-relaxed text-chalk ${x.wrote === "ar" ? "term" : ""}`}
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[0.74rem] text-chalk-3">
                    {x.wrote === "ar" ? c.cars.wroteAr : c.cars.wroteEn}
                  </p>

                  <p className="mt-5 max-w-[32rem] text-[0.9rem] leading-relaxed text-chalk-2">
                    {c.cars.notes[x.id]}
                  </p>

                  <a
                    href={x.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-[0.8rem] text-chalk-2 underline decoration-white/25 underline-offset-4 transition-colors hover:text-flag"
                  >
                    {c.cars.viewPost}
                  </a>
                </div>
              </Check>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ shop -- */}
      <section id="shop" className="border-t border-white/10 bg-bay-2 py-20 sm:py-28">
        <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
          <Check className="max-w-[42rem]">
            <p className="label text-flag">{c.shop.eyebrow}</p>
            <h2 className="mt-4 font-display text-display font-bold text-chalk">
              {c.shop.heading}
            </h2>
            <Rule className="mt-5 max-w-[7rem]" delay={100} />
          </Check>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-14">
            <Check delay={90}>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-bay-3">
                <img
                  src={FORECOURT_FRAME}
                  alt={c.shop.forecourtAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </Check>

            <Check delay={40}>
              <div className="space-y-4 text-[0.96rem] leading-relaxed text-chalk-2">
                {c.shop.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
                {c.about.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>

              <dl className="mt-7 space-y-4 border-t border-white/10 pt-5">
                <div>
                  <dt className="label text-chalk-3">{c.shop.runBy}</dt>
                  <dd className="latin mt-1 text-[1.05rem] text-chalk">{PROFILE.person}</dd>
                </div>
                <div>
                  <dt className="label text-chalk-3">{c.contact.addressLabel}</dt>
                  <dd className="mt-1 text-[1rem] text-chalk">{c.contact.address}</dd>
                </div>
                <div>
                  <dt className="label text-chalk-3">{c.contact.phoneLabel}</dt>
                  <dd className="mt-1">
                    <a
                      href={PROFILE.phoneHref}
                      className="latin tnum text-[1.05rem] text-chalk transition-colors hover:text-flag"
                    >
                      {PROFILE.phone}
                    </a>
                  </dd>
                </div>
              </dl>

              <p className="mt-5 inline-block border border-flag/45 px-3 py-1.5 text-[0.82rem] text-flag">
                {c.shop.downLabel}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={PROFILE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/25 px-5 py-2.5 text-[0.84rem] text-chalk transition-colors hover:border-flag hover:text-flag"
                >
                  Instagram
                </a>
                <a
                  href={PROFILE.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/25 px-5 py-2.5 text-[0.84rem] text-chalk transition-colors hover:border-flag hover:text-flag"
                >
                  {c.shop.tiktokCta}
                </a>
              </div>

              <div className="mt-7 flex gap-8 border-t border-white/10 pt-5">
                <div>
                  <p className="tnum font-display text-[1.6rem] font-bold leading-none text-chalk">
                    {PROFILE.followers}
                  </p>
                  <p className="label mt-1 text-chalk-3">{c.shop.followersLabel}</p>
                </div>
                <div>
                  <p className="tnum font-display text-[1.6rem] font-bold leading-none text-chalk">
                    {PROFILE.posts}
                  </p>
                  <p className="label mt-1 text-chalk-3">{c.shop.postsLabel}</p>
                </div>
              </div>
            </Check>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ----------------------------------------------------------------- footer -- */

export function Footer() {
  const c = useZayed();

  return (
    <footer className="border-t border-white/10 bg-bay">
      <div className="mx-auto max-w-[80rem] px-5 py-10 sm:px-8 sm:py-12">
        <div className="grid gap-8 md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] md:gap-14">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/mark.svg" alt="" className="h-6 w-6" />
              <span className="font-display text-[0.98rem] font-semibold text-chalk">
                {c.brand.name}
              </span>
            </div>
            <p className="mt-4 text-[0.88rem] text-chalk-2">{c.brand.tagline}</p>
            <a
              href={PROFILE.phoneHref}
              className="latin tnum mt-2 inline-block text-[0.95rem] text-chalk transition-colors hover:text-flag"
            >
              {PROFILE.phone}
            </a>
          </div>
          <div className="space-y-5">
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {c.nav.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="label text-chalk-2 transition-colors hover:text-flag"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="max-w-2xl space-y-2.5 border-t border-white/10 pt-5">
              <p className="text-[0.8rem] leading-relaxed text-chalk-2">{c.footer.disclaimer}</p>
              <p className="label text-chalk-3">{c.footer.rights}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
