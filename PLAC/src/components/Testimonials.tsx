import React, { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

const TESTIMONIALS = [
  {
    name: 'Margaret H.',
    role: 'Retired Teacher, 67',
    avatar: 'MH',
    color: 'bg-sage/20 text-primary',
    quote: 'I came in sceptical and left in tears - the good kind. After my husband\'s diagnosis, I\'d forgotten what stillness felt like. The sound bath gave it back to me within the first session. I now attend weekly and volunteer to bring other patients from the oncology ward.',
    stars: 5,
  },
  {
    name: 'David K.',
    role: 'Software Engineer, 38',
    avatar: 'DK',
    color: 'bg-secondary/15 text-primary',
    quote: 'I was running on caffeine and cortisol for a decade. A colleague dragged me to a session almost as a joke. Three months later I sleep through the night, I\'m kinder at home, and I\'ve recommended it to half my team. The science makes sense - the experience is indescribable.',
    stars: 5,
  },
  {
    name: 'Priya S.',
    role: 'Oncology Nurse, 44',
    avatar: 'PS',
    color: 'bg-warm/60 text-primary',
    quote: 'As someone who works with cancer patients every day, I was moved to discover this community funds free sessions for them. But beyond the mission, the healing itself is real. I\'ve seen it change the quality of life for patients I work with. This is extraordinary work.',
    stars: 5,
  },
  {
    name: 'James R.',
    role: 'Financial Director, 52',
    avatar: 'JR',
    color: 'bg-primary/10 text-primary',
    quote: 'I manage stress for a living - other people\'s, anyway. I had none left for myself. The singing bowl sessions re-tuned something in me that I can\'t fully articulate. My blood pressure is down, my focus is up, and I actually enjoy Sunday mornings again.',
    stars: 5,
  },
  {
    name: 'Anika L.',
    role: 'Yoga Instructor, 29',
    avatar: 'AL',
    color: 'bg-sage/20 text-primary',
    quote: 'I thought I already had a strong practice. Sound healing went to places yoga couldn\'t reach. The combination of the two completely transformed my teaching - and my own relationship with peace.',
    stars: 5,
  },
  {
    name: 'Thomas B.',
    role: 'Cancer Survivor, 58',
    avatar: 'TB',
    color: 'bg-secondary/15 text-primary',
    quote: 'During chemo, the free sessions this community provided were the one hour each week I didn\'t feel like a patient. I felt like a person - whole, held, and at peace. I\'m now in remission and I continue the practice. It saved more than my body.',
    stars: 5,
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
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </motion.div>
  );
};

const Testimonials = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" className="py-24 px-6 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-warm/20 blur-3xl -translate-y-1/2"/>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <span className="font-sans text-sm font-semibold text-secondary tracking-widest uppercase">Real stories</span>
            <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3 mb-4 leading-tight">
              Voices from our community
            </h2>
            <p className="font-sans text-muted text-lg max-w-lg mx-auto">
              Professionals, caregivers, patients — peace looks different on everyone. Here's what they say.
            </p>
          </div>
        </FadeUp>

        {/* Featured large testimonial */}
        <FadeUp delay={0.15}>
          <div className="mb-10 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
                className="bg-primary rounded-3xl p-8 md:p-12 relative overflow-hidden"
              >
                {/* Quote mark */}
                <svg className="absolute top-6 right-8 w-16 h-16 text-accent/8" viewBox="0 0 64 64" fill="currentColor">
                  <path d="M10 40 Q10 20 30 20 L30 30 Q20 30 20 40 L30 40 L30 55 L10 55 Z"/>
                  <path d="M36 40 Q36 20 56 20 L56 30 Q46 30 46 40 L56 40 L56 55 L36 55 Z"/>
                </svg>
                <div className="flex items-start gap-6 mb-6">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-serif font-bold text-lg flex-shrink-0 ${TESTIMONIALS[active].color}`}>
                    {TESTIMONIALS[active].avatar}
                  </div>
                  <div>
                    <p className="font-serif text-lg text-accent font-semibold">{TESTIMONIALS[active].name}</p>
                    <p className="font-sans text-sm text-accent/60">{TESTIMONIALS[active].role}</p>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: TESTIMONIALS[active].stars }).map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="font-serif text-xl md:text-2xl text-accent/85 leading-relaxed italic">
                  "{TESTIMONIALS[active].quote}"
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center gap-2 mt-5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === active ? 'w-8 h-2.5 bg-secondary' : 'w-2.5 h-2.5 bg-warm hover:bg-secondary/40'
                  }`}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Grid of smaller testimonials */}
        <div className="grid md:grid-cols-3 gap-4">
          {TESTIMONIALS.filter((_, i) => i !== active).slice(0, 3).map((t, i) => (
            <FadeUp key={i} delay={0.2 + i * 0.1}>
              <button
                onClick={() => setActive(TESTIMONIALS.indexOf(t))}
                className="text-left w-full bg-background rounded-2xl p-6 border border-warm/60 hover:border-secondary/40 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-serif font-bold ${t.color}`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-primary">{t.name}</p>
                    <p className="font-sans text-xs text-muted">{t.role}</p>
                  </div>
                </div>
                <p className="font-sans text-sm text-muted leading-relaxed line-clamp-3 italic">
                  "{t.quote}"
                </p>
              </button>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;