import React from 'react';
import logoImage from '../assets/PLAC.png';

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
              <img 
                src={logoImage} 
                alt="Peace Love & Art Community" 
                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
              />
              <span className="font-serif text-lg text-accent font-semibold">Peace Love & Art Community</span>
            </div>
            <p className="font-sans text-sm leading-relaxed mb-4 max-w-xs">
              Sound healing classes and tools that bring peace to your life - while every booking funds free care for cancer patients.
            </p>
            <p className="font-sans text-xs text-accent/40 mb-5">Sanepa, Lalitpur, Nepal</p>
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/peacelove_andartcommunity?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-accent/15 flex items-center justify-center text-accent/50 hover:text-secondary hover:border-secondary/40 transition-colors"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@peaceloveartcommuity?_r=1&_t=ZS-96jVO5dMPw4"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-accent/15 flex items-center justify-center text-accent/50 hover:text-secondary hover:border-secondary/40 transition-colors"
                aria-label="TikTok"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v12.7a2.85 2.85 0 1 1-5.45-2.36c.34-.52.74-.98 1.25-1.38V9.66a6.62 6.62 0 0 0-5.56 3.41 6.61 6.61 0 0 0 5.63 10.85 6.62 6.62 0 0 0 5.44-10.01V12.58a8.1 8.1 0 0 0 5.78 2.17v-3.68a4.9 4.9 0 0 1-1.63-.3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-sans text-xs font-semibold text-accent/90 uppercase tracking-widest mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="font-sans text-sm hover:text-secondary transition-colors">
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