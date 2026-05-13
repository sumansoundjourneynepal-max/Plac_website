import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const STEPS = [
  {
    step: '1',
    title: 'Book a Free Consultation',
    desc: 'A gentle 20-minute conversation with one of our practitioners. No pressure — just an honest exploration of where you are and what might serve you best.',
    detail: 'Available online or in-person',
  },
  {
    step: '2',
    title: 'Choose Your Path',
    desc: 'Whether you prefer live group sound baths, one-to-one sessions, guided self-practice tools, or a blend — we design an experience that fits your life.',
    detail: 'Flexible scheduling, online & in-person',
  },
  {
    step: '3',
    title: 'Begin Your Practice',
    desc: 'Arrive, be held, and let the sound do the work. Most members notice a meaningful shift in their first session. Some describe it as the deepest rest they've felt in years.',
    detail: 'Beginner-friendly, all welcome',
  },
  {
    step: '4',
    title: 'Integrate & Deepen',
    desc: 'As peace becomes your baseline, not your exception, you\'ll have access to our community, ongoing classes, and tools that anchor the practice in your daily life.',
    detail: 'Lifetime community access',
  },
];

const OFFERINGS = [
  { name: 'Sound Bath Classes', desc: 'Live group immersions led by certified practitioners', icon: '🔔' },
  { name: '1-on-1 Sessions', desc: 'Personalised healing tailored to your nervous system', icon: '🎵' },
  { name: 'Healing Tools', desc: 'Singing bowls, tuning forks & guided audio programmes', icon: '✨' },
  { name: 'Online Library', desc: 'On-demand recordings for home practice anytime', icon: '🌿' },
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

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-sage/8 blur-3xl pointer-events-none"/>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 rounded-full bg-secondary/8 blur-3xl pointer-events-none"/>

      <div className="relative max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <span className="font-sans text-sm font-semibold text-secondary tracking-widest uppercase">The Journey</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3 mb-4 leading-tight">
              From chaos to calm, <br />
              <em>step by gentle step</em>
            </h2>
            <p className="font-sans text-muted text-lg max-w-lg mx-auto">
              No rigid programmes, no overwhelm. Just a thoughtful path, paced to you.
            </p>
          </div>
        </FadeUp>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[9.5%] right-[9.5%] h-px bg-gradient-to-r from-transparent via-warm to-transparent"/>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <FadeUp key={i} delay={i * 0.14}>
                <div className="relative group text-center md:text-left lg:text-center">
                  {/* Number */}
                  <div className="w-16 h-16 rounded-full bg-primary text-accent font-serif text-2xl font-bold flex items-center justify-center mx-auto lg:mx-auto mb-5 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <h3 className="font-serif text-xl text-primary mb-2">{step.title}</h3>
                  <p className="font-sans text-muted text-sm leading-relaxed mb-3">{step.desc}</p>
                  <span className="inline-block font-sans text-xs text-secondary bg-secondary/10 rounded-full px-3 py-1">
                    {step.detail}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Offerings grid */}
        <FadeUp delay={0.2}>
          <div className="mt-20">
            <h3 className="font-serif text-2xl text-primary text-center mb-8">What we offer</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {OFFERINGS.map((o, i) => (
                <div
                  key={i}
                  className="bg-cream rounded-2xl p-6 border border-warm/60 hover:border-secondary/40 hover:shadow-md hover:shadow-secondary/10 transition-all duration-300 text-center group"
                >
                  <div className="text-3xl mb-3">{o.icon}</div>
                  <h4 className="font-serif text-base text-primary mb-2">{o.name}</h4>
                  <p className="font-sans text-muted text-xs leading-relaxed">{o.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default HowItWorks;