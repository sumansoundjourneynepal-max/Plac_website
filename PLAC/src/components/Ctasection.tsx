import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const FadeUp = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </motion.div>
  );
};

const CTASection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) setSubmitted(true);
  };

  return (
    <section id="cta" className="py-24 px-6 bg-primary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-0 right-0 w-full" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0 40 C360 0 720 80 1080 40 C1260 20 1380 30 1440 40 L1440 0 L0 0 Z" fill="#FAF7F2"/>
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-accent/5"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-accent/5"/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-accent/5"/>
        {/* Animated sound ripple */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-secondary/20"
          animate={{ scale: [1, 3, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeOut' }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <FadeUp>
          <span className="font-sans text-sm font-semibold text-secondary tracking-widest uppercase">Begin today</span>
          <h2 className="font-serif text-4xl md:text-6xl text-accent mt-3 mb-6 leading-tight">
            Your peace is <br />
            <em className="text-secondary">one conversation away.</em>
          </h2>
          <p className="font-sans text-accent/70 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Book a free 20-minute consultation with one of our practitioners. No obligation, no pressure — just a warm, honest conversation about where you are and how we might help.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="bg-accent/5 border border-accent/15 rounded-3xl p-8 md:p-10 text-left"
            >
              <h3 className="font-serif text-2xl text-accent text-center mb-6">Reserve Your Free Consultation</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-sans text-xs text-accent/60 mb-1.5 uppercase tracking-wide">Your name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah"
                    required
                    className="w-full bg-accent/10 border border-accent/20 rounded-xl px-4 py-3 font-sans text-accent placeholder-accent/30 focus:outline-none focus:border-secondary transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs text-accent/60 mb-1.5 uppercase tracking-wide">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full bg-accent/10 border border-accent/20 rounded-xl px-4 py-3 font-sans text-accent placeholder-accent/30 focus:outline-none focus:border-secondary transition-colors text-sm"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block font-sans text-xs text-accent/60 mb-1.5 uppercase tracking-wide">What brings you here? (optional)</label>
                <textarea
                  rows={3}
                  placeholder="I've been feeling overwhelmed and am looking for..."
                  className="w-full bg-accent/10 border border-accent/20 rounded-xl px-4 py-3 font-sans text-accent placeholder-accent/30 focus:outline-none focus:border-secondary transition-colors text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-secondary text-cream py-4 rounded-full font-sans font-semibold text-base hover:bg-accent hover:text-primary transition-all duration-300 shadow-lg shadow-secondary/30"
              >
                Book My Free Consultation →
              </button>
              <p className="font-sans text-xs text-accent/40 text-center mt-4">
                We respond within 24 hours. Your information is never shared.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-accent/5 border border-secondary/30 rounded-3xl p-12 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-secondary" fill="none" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 20l5 5 11-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-serif text-3xl text-accent mb-3">Thank you, {name}.</h3>
              <p className="font-sans text-accent/70 leading-relaxed">
                We've received your request and will be in touch within 24 hours to arrange your free consultation. Your journey to peace begins here.
              </p>
            </motion.div>
          )}
        </FadeUp>

        <FadeUp delay={0.35}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
            <div className="flex items-center gap-2 text-accent/50 font-sans text-sm">
              <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-1 9.5L4.5 8l1-1 1.5 1.5 3.5-3.5 1 1L7 10.5z" fill="currentColor"/></svg>
              Free, no obligation
            </div>
            <div className="flex items-center gap-2 text-accent/50 font-sans text-sm">
              <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-1 9.5L4.5 8l1-1 1.5 1.5 3.5-3.5 1 1L7 10.5z" fill="currentColor"/></svg>
              Online or in-person
            </div>
            <div className="flex items-center gap-2 text-accent/50 font-sans text-sm">
              <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-1 9.5L4.5 8l1-1 1.5 1.5 3.5-3.5 1 1L7 10.5z" fill="currentColor"/></svg>
              Response within 24hrs
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default CTASection;