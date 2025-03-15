import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center gap-2 font-display font-bold text-xl ${isScrolled ? 'text-black' : 'text-white'}`}
          aria-label="Go to Rivera Pro homepage"
        >
          <Home className={`h-6 w-6 ${isScrolled ? 'text-black' : 'text-white'}`} />
          <span>Rivera Pro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-base font-semibold transition-colors ${
                  isActive ? 'text-primary-600' : isScrolled ? 'text-primary-600 hover:text-primary-500' : 'text-white hover:text-primary-500'
                }`
              }
              end={item.path === '/'}
              aria-label={`Navigate to ${item.name}`}
            >
              {item.name}
            </NavLink>
          ))}
          <Link to="/quote" className="btn-primary text-white">
            Get a Quote
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${isScrolled ? 'text-black hover:text-primary-500' : 'text-white hover:text-primary-500'} transition-colors`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-white z-40 md:hidden"
            >
              <div className="flex flex-col h-full pt-20 px-6">
                <nav className="flex flex-col space-y-6 items-center">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `text-lg font-semibold transition-colors hover:text-primary-500 ${
                          isActive ? 'text-primary-600' : 'text-secondary-700'
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                      end={item.path === '/'}
                      aria-label={`Navigate to ${item.name}`}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                  <Link
                    to="/quote"
                    className="btn-primary w-full text-center mt-4 text-white"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Get a quote for your remodeling project"
                  >
                    Get a Quote
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;