import React, { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { ShoppingCart, Menu, X, ChevronDown, ChevronUp } from "lucide-react"
import { useCart } from "../../context/CartContext"
import { useAuth } from "../../context/AuthContext"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // For Sound Instruments
const [isSoundDropdownOpen, setIsSoundDropdownOpen] = useState(false);
const soundTimeoutRef = useRef<number | null>(null);

// For About
const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
const aboutTimeoutRef = useRef<number | null>(null);

  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);


  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const getNavbarClasses = () => {
    if (isScrolled || isMenuOpen) {
      return "bg-navy/95 backdrop-blur-sm shadow-lg"
    }
    return "bg-navy/90 backdrop-blur-sm"
  }

  const handleLogout = () => {
    logout()
  }

  const handleSoundEnter = () => {
  if (soundTimeoutRef.current) clearTimeout(soundTimeoutRef.current);
  setIsSoundDropdownOpen(true);
};

const handleSoundLeave = () => {
  soundTimeoutRef.current = window.setTimeout(() => {
    setIsSoundDropdownOpen(false);
  }, 150);
};

const toggleSoundDropdown = () => {
  setIsSoundDropdownOpen((prev) => !prev);
};

const handleAboutEnter = () => {
  if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current);
  setIsAboutDropdownOpen(true);
};

const handleAboutLeave = () => {
  aboutTimeoutRef.current = window.setTimeout(() => {
    setIsAboutDropdownOpen(false);
  }, 150);
};

const toggleAboutDropdown = () => {
  setIsAboutDropdownOpen((prev) => !prev);
};



  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${getNavbarClasses()}`}>
      <div className="container-custom py-4 md:py-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gold transition-colors duration-300">
            OMSound Nepal
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium text-ivory hover:text-gold transition-colors duration-300">
            Home
          </Link>
        
          {/* 🔽 Sound Instruments Dropdown */}
          <div
  className="relative"
  onMouseEnter={handleSoundEnter}
  onMouseLeave={handleSoundLeave}
>
  <button
    onClick={toggleSoundDropdown}
    className="font-medium text-ivory hover:text-gold flex items-center gap-1"
  >
    Sound Instruments
    {isSoundDropdownOpen ? <ChevronUp /> : <ChevronDown />}
  </button>

  {isSoundDropdownOpen && (
    <div className="absolute mt-2 w-56 bg-navy/95 rounded-lg shadow-lg border py-2">
      <Link
        to="/sound-instruments/singing-bowl"
        onClick={() => setIsSoundDropdownOpen(false)}
        className="block px-4 py-2 text-ivory hover:bg-gold hover:text-navy transition-colors"
      >
        Singing Bowls
      </Link>

      <Link
        to="/sound-instruments/tingsha"
        onClick={() => setIsSoundDropdownOpen(false)}
        className="block px-4 py-2 text-ivory hover:bg-gold hover:text-navy transition-colors"
      >
        Tingsha
      </Link>

      <Link
        to="/sound-instruments/gong"
        onClick={() => setIsSoundDropdownOpen(false)}
        className="block px-4 py-2 text-ivory hover:bg-gold hover:text-navy transition-colors"
      >
        Gong
      </Link>
    </div>
  )}
</div>

            <Link to="/shop" className="font-medium text-ivory hover:text-gold transition-colors duration-300">
            Shop
          </Link>
            <div
  className="relative"
  onMouseEnter={handleAboutEnter}
  onMouseLeave={handleAboutLeave}
>
  <button
    onClick={toggleAboutDropdown}
    className="font-medium text-ivory hover:text-gold flex items-center gap-1"
  >
    About
    {isAboutDropdownOpen ? <ChevronUp /> : <ChevronDown />}
  </button>

  {isAboutDropdownOpen && (
    <div className="absolute mt-2 w-56 bg-navy/95 rounded-lg shadow-lg border py-2">
      <Link
        to="/about"
        onClick={() => setIsAboutDropdownOpen(false)}
        className="block px-4 py-2 text-ivory hover:bg-gold hover:text-navy transition-colors"
      >
        Our Story
      </Link>

      <Link
        to="/blog"
        onClick={() => setIsAboutDropdownOpen(false)}
        className="block px-4 py-2 text-ivory hover:bg-gold hover:text-navy transition-colors"
      >
        Blogs
      </Link>

      <Link
        to="/contact"
        onClick={() => setIsAboutDropdownOpen(false)}
        className="block px-4 py-2 text-ivory hover:bg-gold hover:text-navy transition-colors"
      >
        Contact Us
      </Link>
    </div>
  )}
</div>

           <Link to="/sound-healing" className="font-medium text-ivory hover:text-gold transition-colors duration-300">
            Sound Healing
          </Link>

          {/* <Link to="/about" className="font-medium text-ivory hover:text-gold transition-colors duration-300">
            Our Story
          </Link> */}
          {/* <Link to="/sound-healing" className="font-medium text-ivory hover:text-gold transition-colors duration-300">
            Sound Healing
          </Link> */}
          {/* <Link to="/contact" className="font-medium text-ivory hover:text-gold transition-colors duration-300">
            Contact Us
          </Link> */}

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-ivory hover:text-gold transition-colors">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="text-ivory hover:text-gold transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-ivory hover:text-gold transition-colors">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 border-2 border-gold text-gold hover:bg-gold hover:text-navy transition-colors rounded-md"
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-ivory hover:text-gold transition-colors duration-300" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Link to="/cart" className="relative mr-4">
            <ShoppingCart className="w-6 h-6 text-ivory transition-colors duration-300" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none text-ivory">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-navy/95 backdrop-blur-sm shadow-lg border-t border-ivory/20">
            <div className="container-custom py-4 flex flex-col space-y-4">
              <Link to="/" className="text-ivory font-medium py-2 hover:text-gold transition-colors">
                Home
              </Link>
              <Link to="/shop" className="text-ivory font-medium py-2 hover:text-gold transition-colors">
                Shop
              </Link>

              {/* Mobile Sound Instruments sub-links (no hover, just straight links) */}
            <div className="pt-3 mt-1">
  <button
    onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
    className="w-full flex items-center justify-between text-ivory font-medium py-2 hover:text-gold transition-colors"
  >
    Sound Instruments
    {isMobileDropdownOpen ? <ChevronUp /> : <ChevronDown />}
  </button>

  {/* Dropdown Menu */}
  {isMobileDropdownOpen && (
    <div className="pl-4 mt-2 space-y-2">
      <Link
        to="/sound-instruments/singing-bowl"
        onClick={() => setIsMenuOpen(false)}
        className="block text-ivory py-1 hover:text-gold transition-colors"
      >
        Singing Bowls
      </Link>

      <Link
        to="/sound-instruments/tingsha"
        onClick={() => setIsMenuOpen(false)}
        className="block text-ivory py-1 hover:text-gold transition-colors"
      >
        Tingsha
      </Link>

      <Link
        to="/sound-instruments/gong"
        onClick={() => setIsMenuOpen(false)}
        className="block text-ivory py-1 hover:text-gold transition-colors"
      >
        Gong
      </Link>
    </div>
  )}
</div>

              <Link to="/about" className="text-ivory font-medium py-2 hover:text-gold transition-colors">
                Our Story
              </Link>
              <Link to="/sound-healing" className="text-ivory font-medium py-2 hover:text-gold transition-colors">
                Sound Healing
              </Link>
              <Link to="/contact" className="text-ivory font-medium py-2 hover:text-gold transition-colors">
                Contact Us
              </Link>

              <div className="flex flex-col space-y-2 pt-4 border-t border-ivory/10">
                {user ? (
                  <>
                    <Link to="/dashboard" className="text-ivory hover:text-gold transition-colors py-2">
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-ivory hover:text-gold transition-colors py-2 text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-ivory hover:text-gold transition-colors py-2">
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-2 border-2 border-gold text-gold hover:bg-gold hover:text-navy transition-colors rounded-md text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
