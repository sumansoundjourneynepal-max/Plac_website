"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Same palette and type system as the hero — Fraunces / Inter / IBM Plex
 * Mono, brass-copper-green trio — loaded globally via <link> tags in
 * index.html and mapped to --font-display / --font-body / --font-mono
 * in index.css (Vite doesn't support next/font).
 */

/**
 * Copy below carries the target phrases — Himalayan singing bowl,
 * handcrafted, ancient, sound healing — naturally inside real sentences
 * (the H2, the intro paragraph, one benefit description) rather than
 * stuffed into a keyword list. Search engines and real readers get the
 * same sentence.
 */
const BENEFITS = [
  {
    num: "01",
    title: "Deep, Restorative Calm",
    desc: "Sound frequencies slow brainwave activity from stressed beta to peaceful alpha and theta states — the same states reached in deep meditation, accessed in minutes, not years of practice.",
    accent: "brass",
  },
  {
    num: "02",
    title: "Clarity Without Effort",
    desc: "When your nervous system is no longer in fight-or-flight, decisions become clearer, creativity flows more freely, and the fog of chronic stress begins to lift.",
    accent: "green",
  },
  {
    num: "03",
    title: "Emotional Release",
    desc: "Vibration reaches the body at a cellular level, gently releasing emotions stored as tension. Many participants describe sessions as months of therapy condensed into an hour.",
    accent: "copper",
  },
  {
    num: "04",
    title: "Better Sleep",
    desc: "Regular sound healing retrains your body's sleep response. Members report falling asleep faster, sleeping more deeply, and waking genuinely refreshed.",
    accent: "brass",
  },
  {
    num: "05",
    title: "Community & Connection",
    desc: "Join a warm, non-judgmental community of like-minded people on the same journey. Group sessions carry a collective energy that amplifies individual healing.",
    accent: "green",
  },
  {
    num: "06",
    title: "Purposeful Living",
    desc: "Every class and handcrafted Himalayan singing bowl you purchase directly funds care for cancer patients. Your healing journey creates ripples of healing in others — a gift that gives twice.",
    accent: "copper",
  },
] as const;

const ACCENTS = {
  brass: { text: "text-[#A5722F]", bg: "bg-[#C08A3E]/12" },
  green: { text: "text-[#3F7259]", bg: "bg-[#5C9679]/12" },
  copper: { text: "text-[#8A5B2A]", bg: "bg-[#8A5B2A]/12" },
} as const;

// Structured data so search engines can read the offering directly,
// independent of the visual copy above. Product-level singing bowl
// listings should carry their own schema on their own pages — this is
// scoped to the service this section is actually describing.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Himalayan Singing Bowl Sound Healing",
  description:
    "Sound healing sessions using handcrafted Himalayan singing bowls, an ancient practice for stress relief, emotional release, and better sleep.",
  provider: {
    "@type": "Organization",
    name: "Dhun Bowls",
  },
};

const FadeUp = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      aria-labelledby="benefits-heading"
      className="relative overflow-hidden bg-[#F2E9DD] px-6 py-24 font-[family-name:var(--font-body)]"
    >
      {/* Structured data for this section's offering — read by crawlers, invisible to visitors */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Ambient warmth, same device as the hero's radial wash but faint on a light ground */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 85% 0%, rgba(192,138,62,0.10), transparent 60%), radial-gradient(ellipse 60% 50% at 5% 100%, rgba(92,150,121,0.08), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <FadeUp>
          <div className="mb-16 text-center">
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.28em] text-[#A5722F]">
              Ancient Himalayan Sound Healing
            </p>
            <h2
              id="benefits-heading"
              className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1A1410] md:text-5xl"
            >
              Six ways Himalayan singing bowl
              <br />
              <span className="italic text-[#A5722F]">
                sound healing transforms your life
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-body)] text-lg text-[#6B5A47]">
              Each handcrafted singing bowl carries an ancient Himalayan
              tradition into every sound healing session — our members carry
              that shift into every part of their day.
            </p>
          </div>
        </FadeUp>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => {
            const accent = ACCENTS[b.accent];
            return (
              <FadeUp key={b.num} delay={i * 0.1}>
                <article className="group flex h-full flex-col rounded-2xl border border-[#1A1410]/8 bg-white/50 p-7 transition-colors duration-300 hover:border-[#C08A3E]/30 hover:bg-white/80">
                  <div
                    className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full font-[family-name:var(--font-mono)] text-sm font-medium ${accent.bg} ${accent.text}`}
                    aria-hidden
                  >
                    {b.num}
                  </div>
                  <h3 className="mb-3 font-[family-name:var(--font-display)] text-xl text-[#1A1410]">
                    {b.title}
                  </h3>
                  <p className="flex-1 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[#6B5A47]">
                    {b.desc}
                  </p>
                </article>
              </FadeUp>
            );
          })}
        </div>

        {/* Impact banner — deliberately drops back into the hero's dark umber, so the
            one card in this light section that carries the most weight (the giving-back
            story) visually rhymes with the hero rather than sitting in another card
            that looks like the six above it. */}
        <FadeUp delay={0.4}>
          <div className="mt-16 rounded-2xl border border-[#C08A3E]/25 bg-[#1A1410] p-8 text-center md:p-12">
            <svg
              className="mx-auto mb-4 h-12 w-12 text-[#E8A659]"
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden
            >
              <path
                d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M16 24l5 5 11-10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="mb-3 font-[family-name:var(--font-display)] text-3xl text-[#F2E9DD]">
              Healing is also giving.
            </h3>
            <p className="mx-auto max-w-xl font-[family-name:var(--font-body)] leading-relaxed text-[#B8A996]">
              We donate a meaningful portion of every class booking and
              handcrafted singing bowl sale to provide free sound healing
              sessions and therapeutic tools to cancer patients in active
              treatment. When you heal, you help heal others.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-8 sm:flex-row">
              <div>
                <p className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#E8A659]">
                  340+
                </p>
                <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-[#8A7A66]">
                  Cancer patients supported
                </p>
              </div>
              <div className="hidden w-px bg-[#F2E9DD]/10 sm:block" />
              <div>
                <p className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#E8A659]">
                  $80K+
                </p>
                <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-[#8A7A66]">
                  Donated to patient care
                </p>
              </div>
              <div className="hidden w-px bg-[#F2E9DD]/10 sm:block" />
              <div>
                <p className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[#E8A659]">
                  12
                </p>
                <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-[#8A7A66]">
                  Partner hospitals
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}