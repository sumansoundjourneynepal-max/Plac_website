import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const PAINS = [
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 8v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    heading: 'You can't switch off',
    body: 'Emails at midnight, meetings before breakfast — your nervous system is permanently in overdrive, and "relaxation" feels like another item on the to-do list.',
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C9 4 5 8 5 13c0 4 2.5 7.5 6 9l3 2 3-2c3.5-1.5 6-5 6-9 0-5-4-9-9-9z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M10 14h8M14 10v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    heading: 'Stress has become your default',
    body: 'Tension in your shoulders, shallow breathing, a mind that won't quiet down — you know something needs to change, but nothing you've tried has stuck.',
  },
  {
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <path d="M7 14s2-4 7-4 7 4 7 4-2 4-7 4-7-4-7-4z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="14" cy="14" r="2" fill="currentColor"/>
        <path d="M4 4l20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    heading: 'You've lost sight of joy',
    body: 'Somewhere between the career, the responsibilities, and the constant noise, the lightness you used to feel has faded. You want it back — you just don't know how.',
  },
];

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

const PainSection = () => {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Soft background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-warm/30 blur-3xl -translate-y-1/2 translate-x-1/3"/>
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-sage/10 blur-3xl translate-y-1/3 -translate-x-1/4"/>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <span className="font-sans text-sm font-semibold text-secondary tracking-widest uppercase">Does this sound familiar?</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3 mb-4 leading-tight">
              The world doesn't stop. <br/>
              <em>But you can learn to.</em>
            </h2>
            <p className="font-sans text-muted text-lg max-w-xl mx-auto leading-relaxed">
              Millions of professionals carry invisible weight every single day. If any of this resonates, you're not alone — and there is a gentler way forward.
            </p>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {PAINS.map((pain, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <div className="group bg-cream rounded-3xl p-8 border border-warm/50 hover:border-secondary/40 hover:shadow-lg hover:shadow-secondary/10 transition-all duration-400 relative overflow-hidden">
                {/* Hover blob */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-secondary/5 group-hover:scale-150 transition-transform duration-500"/>
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-warm/60 flex items-center justify-center text-secondary mb-5 group-hover:bg-secondary/10 transition-colors">
                    {pain.icon}
                  </div>
                  <h3 className="font-serif text-xl text-primary mb-3">{pain.heading}</h3>
                  <p className="font-sans text-muted text-sm leading-relaxed">{pain.body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.5}>
          <div className="mt-16 bg-primary/5 border border-primary/10 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" viewBox="0 0 32 32" fill="none">
                <path d="M16 4C10 4 5 9 5 15c0 5 3.5 9.5 8.5 11L16 28l2.5-2C23.5 24.5 27 20 27 15c0-6-5-11-11-11z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11 15l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="font-serif text-xl text-primary mb-1">There is another way.</p>
              <p className="font-sans text-muted leading-relaxed">Sound healing has been used for thousands of years to reset the nervous system, ease anxiety, and restore the sense of peace that modern life erodes. And the best part? It works — deeply, measurably, and beautifully.</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default PainSection;