import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, ChevronDown } from 'lucide-react';

// FooterSection Component for collapsible sections
const FooterSection = ({ title, children, initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <div className="footer-section">
      <button
        className="footer-header w-full text-left flex justify-between items-center py-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`footer-content-${title}`}
      >
        <h3 className="text-lg font-bold">{title}</h3>
        <ChevronDown
          className={`h-5 w-5 md:hidden ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}
        />
      </button>
      <div
        id={`footer-content-${title}`}
        className={`content overflow-hidden transition-max-height duration-300 ease-in-out ${
          isOpen ? 'max-h-96' : 'max-h-0'
        } md:max-h-none`}
      >
        {children}
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info - Open by default on mobile */}
          <FooterSection title="Company Info" initialOpen={true}>
            <Link
              to="/"
              className="flex items-center gap-2 text-white font-display font-bold text-xl mb-4"
              aria-label="Go to Rivera Pro homepage"
            >
              <Home className="h-6 w-6" />
              <span>Rivera Pro</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Transforming homes with exceptional craftsmanship in residential remodeling since 2005.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/riverapro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/riverapro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/riverapro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/riverapro"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </FooterSection>

          {/* Quick Links */}
          <FooterSection title="Quick Links">
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </FooterSection>

          {/* Our Services */}
          <FooterSection title="Our Services">
            <ul className="space-y-3">
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Kitchen Remodeling
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Bathroom Renovation
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  New Construction
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Home Additions
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Roofing
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Windows & Siding
                </Link>
              </li>
            </ul>
          </FooterSection>

          {/* Contact Us */}
          <FooterSection title="Contact Us">
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
                <span className="text-gray-400">
                  Atlanta, GA (Contact for exact address)
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-yellow-400 mr-3" />
                <a
                  href="tel:+14042590577"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  404-259-0577
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-yellow-400 mr-3" />
                <a
                  href="tel:+14043247464"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  404-324-7464
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-yellow-400 mr-3" />
                <a
                  href="mailto:Riverapro67@gmail.com"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  Riverapro67@gmail.com
                </a>
              </li>
            </ul>
          </FooterSection>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center md:flex md:justify-between md:items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Rivera Pro. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 text-sm text-gray-500 space-x-6">
            <Link to="/privacy-policy" className="hover:text-yellow-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-yellow-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;