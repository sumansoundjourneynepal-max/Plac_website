import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-primary overflow-hidden flex items-center">
      {/* Background organic blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute -top-24 -right-24 w-[600px] h-[600px] opacity-10" viewBox="0 0 600 600">
          <path d="M300,50 C420,50 550,150 550,300 C550,450 420,550 300,550 C180,550 50,450 50,300 C50,150 180,50 300,50 Z" fill="#F5ECD7"/>
        </svg>
        <svg className="absolute bottom-0 -left-32 w-[500px] h-[500px] opacity-10" viewBox="0 0 500 500">
          <path d="M250,30 C370,30 470,130 470,250 C470,370 370,470 250,470 C130,470 30,370 30,250 C30,130 130,30 250,30 Z" fill="#C4956A"/>
        </svg>
        {/* Concentric rings */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-5" viewBox="0 0 900 900">
          <circle cx="450" cy="450" r="400" fill="none" stroke="#F5ECD7" strokeWidth="1"/>
          <circle cx="450" cy="450" r="300" fill="none" stroke="#F5ECD7" strokeWidth="1"/>
          <circle cx="450" cy="450" r="200" fill="none" stroke="#F5ECD7" strokeWidth="1"/>
          <circle cx="450" cy="450" r="100" fill="none" stroke="#F5ECD7" strokeWidth="1"/>
        </svg>
        {/* Floating sound wave */}
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-[15%] opacity-20"
        >
          <svg width="120" height="80" viewBox="0 0 120 80">
            <path d="M10 40 Q30 10 50 40 Q70 70 90 40 Q110 10 130 40" stroke="#F5ECD7" strokeWidth="2" fill="none"/>
            <path d="M0 40 Q20 20 40 40 Q60 60 80 40 Q100 20 120 40" stroke="#C4956A" strokeWidth="1.5" fill="none" opacity="0.7"/>
          </svg>
        </motion.div>
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-32 left-[12%] opacity-15"
        >
          <svg width="80" height="60" viewBox="0 0 80 60">
            <path d="M5 30 Q20 5 35 30 Q50 55 65 30 Q80 5 95 30" stroke="#F5ECD7" strokeWidth="2" fill="none"/>
          </svg>
        </motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 bg-secondary/20 text-secondary border border-secondary/30 rounded-full px-4 py-1.5 text-sm font-sans font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary inline-block animate-pulse"/>
              Sound Healing · Community · Purpose
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-accent leading-[1.1] mb-6"
          >
            Find stillness <br />
            <em className="text-secondary not-italic">in a noisy</em> <br />
            world.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="font-sans text-lg text-accent/75 leading-relaxed mb-10 max-w-lg"
          >
            Our sound healing classes and tools help busy professionals aged 20–80 rediscover calm, clarity, and connection — and every booking directly funds care for cancer patients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#cta"
              className="group inline-flex items-center justify-center gap-2 bg-secondary text-cream px-8 py-4 rounded-full text-base font-semibold hover:bg-accent hover:text-primary transition-all duration-300 shadow-lg shadow-secondary/30"
            >
              Book a Free Consultation
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 border border-accent/30 text-accent px-8 py-4 rounded-full text-base font-medium hover:bg-accent/10 transition-all duration-300"
            >
              See How It Works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center gap-6 mt-10 pt-8 border-t border-accent/10"
          >
            <div className="text-center">
              <p className="font-serif text-3xl text-secondary font-bold">1,200+</p>
              <p className="font-sans text-xs text-accent/60 mt-0.5">Lives touched</p>
            </div>
            <div className="w-px h-10 bg-accent/10"/>
            <div className="text-center">
              <p className="font-serif text-3xl text-secondary font-bold">340+</p>
              <p className="font-sans text-xs text-accent/60 mt-0.5">Cancer patients supported</p>
            </div>
            <div className="w-px h-10 bg-accent/10"/>
            <div className="text-center">
              <p className="font-serif text-3xl text-secondary font-bold">98%</p>
              <p className="font-sans text-xs text-accent/60 mt-0.5">Feel more at peace</p>
            </div>
          </motion.div>
        </div>

        {/* Right: Visual element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: 'easeOut' }}
          className="hidden md:flex items-center justify-center"
        >
          <div className="relative w-80 h-80 lg:w-96 lg:h-96">
            {/* Outer glow ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-secondary/30"
            />
            {/* Mid ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-8 rounded-full border border-dashed border-accent/20"
            />
            {/* Center circle */}
            <div className="absolute inset-16 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20 flex items-center justify-center">
              <div className="text-center px-4">
                {/* Bowl icon */}
                <svg className="w-16 h-16 mx-auto mb-3 text-secondary" viewBox="0 0 80 60" fill="none">
                  <ellipse cx="40" cy="45" rx="32" ry="10" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
                  <path d="M8 30 Q8 50 40 50 Q72 50 72 30" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                  <path d="M15 30 Q15 44 40 44 Q65 44 65 30" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1"/>
                  {/* Vibration lines */}
                  <motion.path
                    d="M20 18 Q30 10 40 18 Q50 26 60 18"
                    stroke="#C4956A" strokeWidth="1.5" fill="none"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  />
                  <motion.path
                    d="M24 10 Q32 4 40 10 Q48 16 56 10"
                    stroke="#C4956A" strokeWidth="1" fill="none"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  />
                  <motion.path
                    d="M28 3 Q34 -1 40 3 Q46 7 52 3"
                    stroke="#C4956A" strokeWidth="0.8" fill="none"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                  />
                </svg>
                <p className="font-serif text-accent text-sm italic leading-relaxed">"Healing begins<br/>with sound"</p>
              </div>
            </div>
            {/* Orbiting dots */}
            {[0, 90, 180, 270].map((deg, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-secondary/60"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 0',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
              >
                <div
                  className="w-3 h-3 rounded-full bg-secondary/70"
                  style={{
                    transform: `rotate(${deg}deg) translateX(155px) translateY(-6px)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 40 C360 80 720 0 1080 40 C1260 60 1380 50 1440 40 L1440 80 L0 80 Z" fill="#FAF7F2"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;