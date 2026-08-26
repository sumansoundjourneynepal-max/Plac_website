import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/PLAC.png';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Packages', href: '/packages' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#cta' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin, username, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ isolation: 'isolate' }}
    >
      {/* Solid white background — no blur, so no Chromium blur-seam artifact */}
      <div
        className={`absolute inset-0 -z-10 bg-white transition-shadow duration-500 ${
          scrolled ? 'shadow-lg' : ''
        }`}
      />

      <div
        className={`max-w-6xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-3'
        }`}
      >
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
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-sans text-sm font-medium tracking-wide text-green-800 hover:text-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn && isAdmin ? (
            <div className="flex items-center gap-3">
              <span className="font-sans text-sm text-green-800">Welcome, {username}!</span>
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
              <button
                onClick={handleLogout}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 shadow-sm ${
                  scrolled
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 shadow-sm ${
                scrolled
                  ? 'bg-primary text-white hover:bg-secondary'
                  : 'bg-secondary text-cream hover:bg-primary hover:text-white'
              }`}
            >
              Login
            </Link>
          )}
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
            className="md:hidden bg-white overflow-hidden relative shadow-lg"
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

              {isLoggedIn && isAdmin ? (
                <>
                  <div className="py-2 border-b border-green-800/20">
                    <p className="text-green-800 font-sans text-sm">Welcome, {username}!</p>
                  </div>
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="bg-primary text-white text-center px-5 py-3 rounded-full font-semibold hover:bg-secondary transition-colors"
                  >
                    Admin Panel
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                    }}
                    className="bg-red-600 text-white text-center px-5 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="bg-primary text-white text-center px-5 py-3 rounded-full font-semibold hover:bg-secondary transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="bg-secondary text-white text-center px-5 py-3 rounded-full font-semibold hover:bg-primary transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;