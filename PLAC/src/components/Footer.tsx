import React from 'react';

const FOOTER_LINKS = {
  'Explore': ['Sound Bath Classes', 'One-on-One Sessions', 'Healing Tools', 'Online Library'],
  'Community': ['About Us', 'Our Mission', 'Patient Programme', 'Partner with Us'],
  'Support': ['FAQ', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
};

const Footer = () => {
  return (
    <footer className="bg-text text-accent/70">
      {/* Top wave */}
      <div className="bg-primary">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
          <path d="M0 30 C360 60 720 0 1080 30 C1260 45 1380 38 1440 30 L1440 60 L0 60 Z" fill="#1A2E26"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary border border-secondary/30 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C12 3 5 7 5 13a7 7 0 0 0 14 0c0-6-7-10-7-10z" fill="#F5ECD7" opacity="0.9"/>
                  <circle cx="12" cy="13" r="2.5" fill="#C4956A"/>
                </svg>
              </div>
              <span className="font-serif text-lg text-accent font-semibold">Peace Love & Art</span>
            </div>
            <p className="font-sans text-sm leading-relaxed mb-4 max-w-xs">
              Sound healing classes and tools that bring peace to your life - while every booking funds free care for cancer patients.
            </p>
            <p className="font-sans text-xs text-accent/40 mb-5">London, UK · Online worldwide</p>
            {/* Social links */}
            <div className="flex gap-3">
              {['Instagram', 'Facebook', 'YouTube'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full border border-accent/15 flex items-center justify-center text-accent/50 hover:text-secondary hover:border-secondary/40 transition-colors text-xs font-sans"
                  aria-label={s}
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-sans text-xs font-semibold text-accent/90 uppercase tracking-widest mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-sans text-sm hover:text-secondary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-accent/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-accent/35">
            © 2026 Peace Love and Art Community. All rights reserved.
          </p>
          <p className="font-sans text-xs text-accent/35 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary/60 inline-block"/>
            Every booking supports cancer patients
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;