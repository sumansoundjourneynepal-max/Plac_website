import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/PLAC.png';

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Classes', href: '/classes' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#cta' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-primary/20 backdrop-blur-sm py-3'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div
            style={{ width: '64px', height: '64px' }}
            className="overflow-hidden flex items-center justify-center flex-shrink-0"
          >
            <img
              src={logo}
              alt="Peace Love & Art"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <span className="font-serif font-bold text-xl text-green-800 hover:text-secondary transition-colors">
            Peace Love & Art Community
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-sans text-sm font-medium tracking-wide text-green-800 hover:text-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 shadow-sm ${
              scrolled
                ? 'bg-primary text-white hover:bg-secondary'
                : 'bg-secondary text-cream hover:bg-primary hover:text-white'
            }`}
          >
            Admin Panel
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 text-green-800"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}/>
          <span className={`block w-6 h-0.5 bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}/>
          <span className={`block w-6 h-0.5 bg-current transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-md overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-green-800 font-medium py-1 border-b border-green-800/20 hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="bg-primary text-white text-center px-5 py-3 rounded-full font-semibold mt-2 hover:bg-secondary transition-colors"
              >
                Admin Panel
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;