import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const CREDENTIALS = [
  'Certified Sound Healing Practitioners',
  'Partnered with 12 oncology departments',
  'Featured in Wellness Today & Mindful Living Magazine',
  'Founded by a cancer survivor & sound therapist',
];

const TEAM = [
  {
    initials: 'SA',
    name: 'Sophia Amir',
    role: 'Founder & Lead Practitioner',
    bio: 'A stage-3 cancer survivor who discovered sound healing during treatment in 2014. Sophia trained under masters in Nepal, India, and the UK before founding Peace Love & Art with a single singing bowl and a profound sense of purpose.',
    color: 'bg-secondary/20',
  },
  {
    initials: 'NL',
    name: 'Nathaniel Lowe',
    role: 'Senior Sound Therapist',
    bio: 'A classically trained musician and certified vibroacoustic therapist with 15 years of practice. Nathaniel leads our group sound baths and designs the therapeutic tool programmes used in partner hospitals.',
    color: 'bg-sage/20',
  },
  {
    initials: 'RO',
    name: 'Dr. Renata Olu',
    role: 'Wellness & Research Advisor',
    bio: 'A clinical psychologist specialising in mind-body medicine, Dr. Olu bridges the science and the practice — ensuring our work is grounded in evidence and continuously evolving.',
    color: 'bg-warm/60',
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

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-warm/20 blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"/>

      <div className="relative max-w-6xl mx-auto">
        {/* Origin story */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <FadeUp>
            <div>
              <span className="font-sans text-sm font-semibold text-secondary tracking-widest uppercase">Our story</span>
              <h2 className="font-serif text-4xl md:text-5xl text-primary mt-3 mb-6 leading-tight">
                Born from illness. <br />
                <em>Built for healing.</em>
              </h2>
              <p className="font-sans text-muted leading-relaxed mb-4">
                In 2014, our founder Sophia Amir sat in a hospital ward undergoing her third round of chemotherapy. A volunteer brought a Tibetan singing bowl and played it by her bedside. For the first time in months, Sophia felt peace.
              </p>
              <p className="font-sans text-muted leading-relaxed mb-4">
                After her recovery, she spent four years training with some of the world's foremost sound healers — and returned with a mission: to make this profound modality accessible to everyone, while ensuring cancer patients could experience it for free.
              </p>
              <p className="font-sans text-muted leading-relaxed mb-6">
                Today, Peace Love & Art is a community of over 1,200 members and growing — supported by certified practitioners, clinical advisors, and a network of 12 hospital partners.
              </p>
              <ul className="space-y-2">
                {CREDENTIALS.map((c, i) => (
                  <li key={i} className="flex items-center gap-3 font-sans text-sm text-text">
                    <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="relative">
              {/* Decorative circular composition */}
              <div className="relative w-full aspect-square max-w-sm mx-auto">
                <div className="absolute inset-0 rounded-full bg-warm/30 border border-warm"/>
                <div className="absolute inset-8 rounded-full bg-sage/10 border border-sage/20"/>
                <div className="absolute inset-16 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                  <div className="text-center px-6">
                    <svg className="w-16 h-16 mx-auto mb-3 text-primary" viewBox="0 0 64 64" fill="none">
                      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
                      <path d="M20 38 Q20 26 32 26 Q44 26 44 38 Q44 50 32 50 Q20 50 20 38Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M26 26 Q26 20 32 16 Q38 20 38 26" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <circle cx="32" cy="38" r="4" fill="currentColor" fillOpacity="0.3"/>
                      <circle cx="32" cy="38" r="2" fill="currentColor"/>
                    </svg>
                    <p className="font-serif text-sm text-primary italic">Founded 2015</p>
                    <p className="font-sans text-xs text-muted mt-1">London, UK</p>
                  </div>
                </div>
                {/* Orbiting badges */}
                {[
                  { label: '10+ yrs', deg: 0, color: 'bg-secondary text-cream' },
                  { label: '1,200+ members', deg: 120, color: 'bg-primary text-accent' },
                  { label: '340+ patients', deg: 240, color: 'bg-sage text-cream' },
                ].map((badge, i) => {
                  const angle = (badge.deg * Math.PI) / 180;
                  const r = 46;
                  const x = 50 + r * Math.cos(angle - Math.PI / 2);
                  const y = 50 + r * Math.sin(angle - Math.PI / 2);
                  return (
                    <div
                      key={i}
                      className={`absolute rounded-full px-3 py-1.5 text-xs font-sans font-semibold whitespace-nowrap ${badge.color} shadow-md`}
                      style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                      {badge.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Team */}
        <FadeUp>
          <h3 className="font-serif text-3xl text-primary text-center mb-10">The people behind the practice</h3>
        </FadeUp>
        <div className="grid md:grid-cols-3 gap-6">
          {TEAM.map((member, i) => (
            <FadeUp key={i} delay={i * 0.12}>
              <div className="bg-cream rounded-3xl p-7 border border-warm/60 hover:shadow-lg hover:shadow-warm/30 transition-all duration-300">
                <div className={`w-16 h-16 rounded-full ${member.color} flex items-center justify-center font-serif font-bold text-xl text-primary mb-4`}>
                  {member.initials}
                </div>
                <h4 className="font-serif text-xl text-primary mb-0.5">{member.name}</h4>
                <p className="font-sans text-xs text-secondary font-medium mb-3 tracking-wide uppercase">{member.role}</p>
                <p className="font-sans text-sm text-muted leading-relaxed">{member.bio}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;