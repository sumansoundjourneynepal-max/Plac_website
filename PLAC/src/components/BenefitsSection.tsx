import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const BENEFITS = [
  {
    num: '01',
    title: 'Deep, Restorative Calm',
    desc: 'Sound frequencies slow brainwave activity from stressed beta to peaceful alpha and theta states - the same states reached in deep meditation, accessed in minutes, not years of practice.',
    color: 'bg-sage/15 text-sage',
  },
  {
    num: '02',
    title: 'Clarity Without Effort',
    desc: 'When your nervous system is no longer in fight-or-flight, decisions become clearer, creativity flows more freely, and the fog of chronic stress begins to lift.',
    color: 'bg-secondary/15 text-secondary',
  },
  {
    num: '03',
    title: 'Emotional Release',
    desc: 'Vibration reaches the body at a cellular level, gently releasing emotions stored as tension. Many participants describe sessions as months of therapy condensed into an hour.',
    color: 'bg-primary/10 text-primary',
  },
  {
    num: '04',
    title: 'Better Sleep',
    desc: 'Regular sound healing retrains your body\'s sleep response. Members report falling asleep faster, sleeping more deeply, and waking genuinely refreshed.',
    color: 'bg-warm/60 text-secondary',
  },
  {
    num: '05',
    title: 'Community & Connection',
    desc: 'Join a warm, non-judgmental community of like-minded people on the same journey. Group sessions carry a collective energy that amplifies individual healing.',
    color: 'bg-sage/15 text-sage',
  },
  {
    num: '06',
    title: 'Purposeful Living',
    desc: 'Every class and tool you purchase directly funds care for cancer patients. Your healing journey creates ripples of healing in others - a gift that gives twice.',
    color: 'bg-secondary/15 text-secondary',
  },
];

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-24 px-6 bg-primary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0 40 C360 0 720 80 1080 40 C1260 20 1380 30 1440 40 L1440 0 L0 0 Z" fill="#FAF7F2"/>
        </svg>
      </div>
      <div className="absolute -right-40 top-1/3 w-[500px] h-[500px] rounded-full border border-accent/5 pointer-events-none"/>
      <div className="absolute -right-60 top-1/3 w-[700px] h-[700px] rounded-full border border-accent/5 pointer-events-none"/>

      <div className="relative max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <span className="font-sans text-sm font-semibold text-secondary tracking-widest uppercase">What changes</span>
            <h2 className="font-serif text-4xl md:text-5xl text-accent mt-3 mb-4 leading-tight">
              Six ways sound healing <br />
              <em className="text-secondary">transforms your life</em>
            </h2>
            <p className="font-sans text-accent/65 text-lg max-w-xl mx-auto">
              Our members don't just feel better during sessions — they carry the shift into every part of their day.
            </p>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="group bg-accent/5 border border-accent/10 rounded-3xl p-7 hover:bg-accent/10 transition-all duration-300 h-full flex flex-col">
                <div className={`inline-flex w-10 h-10 rounded-xl items-center justify-center font-serif text-sm font-bold mb-4 ${b.color}`}>
                  {b.num}
                </div>
                <h3 className="font-serif text-xl text-accent mb-3">{b.title}</h3>
                <p className="font-sans text-accent/60 text-sm leading-relaxed flex-1">{b.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Impact Banner */}
        <FadeUp delay={0.4}>
          <div className="mt-16 rounded-3xl bg-secondary/20 border border-secondary/30 p-8 md:p-12 text-center">
            <svg className="w-12 h-12 mx-auto mb-4 text-secondary" viewBox="0 0 48 48" fill="none">
              <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M16 24l5 5 11-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3 className="font-serif text-3xl text-accent mb-3">Healing is also giving.</h3>
            <p className="font-sans text-accent/70 max-w-xl mx-auto leading-relaxed">
              We donate a meaningful portion of every class booking and tool sale to provide free sound healing sessions and therapeutic tools to cancer patients in active treatment. When you heal, you help heal others.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-8 mt-8">
              <div>
                <p className="font-serif text-4xl text-secondary font-bold">340+</p>
                <p className="font-sans text-xs text-accent/50 mt-1">Cancer patients supported</p>
              </div>
              <div className="w-px bg-accent/10 hidden sm:block"/>
              <div>
                <p className="font-serif text-4xl text-secondary font-bold">$80K+</p>
                <p className="font-sans text-xs text-accent/50 mt-1">Donated to patient care</p>
              </div>
              <div className="w-px bg-accent/10 hidden sm:block"/>
              <div>
                <p className="font-serif text-4xl text-secondary font-bold">12</p>
                <p className="font-sans text-xs text-accent/50 mt-1">Partner hospitals</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0 40 C360 80 720 0 1080 40 C1260 60 1380 50 1440 40 L1440 80 L0 80 Z" fill="#FAF7F2"/>
        </svg>
      </div>
    </section>
  );
};

export default BenefitsSection;