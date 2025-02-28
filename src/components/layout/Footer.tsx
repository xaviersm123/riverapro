import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-white font-display font-bold text-xl mb-4">
              <Home className="h-6 w-6" />
              <span>Elite Contractor</span>
            </Link>
            <p className="text-secondary-300 mb-6">
              Transforming spaces with exceptional craftsmanship and attention to detail since 2005.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-secondary-300 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-secondary-300 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-secondary-300 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-secondary-300 hover:text-primary-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-primary-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-secondary-300 hover:text-primary-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/projects" className="text-secondary-300 hover:text-primary-400 transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-primary-400 transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/quote" className="text-secondary-300 hover:text-primary-400 transition-colors">Get a Quote</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services#residential" className="text-secondary-300 hover:text-primary-400 transition-colors">Residential Construction</Link>
              </li>
              <li>
                <Link to="/services#commercial" className="text-secondary-300 hover:text-primary-400 transition-colors">Commercial Construction</Link>
              </li>
              <li>
                <Link to="/services#renovation" className="text-secondary-300 hover:text-primary-400 transition-colors">Renovation</Link>
              </li>
              <li>
                <Link to="/services#interior" className="text-secondary-300 hover:text-primary-400 transition-colors">Interior Design</Link>
              </li>
              <li>
                <Link to="/services#exterior" className="text-secondary-300 hover:text-primary-400 transition-colors">Exterior Design</Link>
              </li>
              <li>
                <Link to="/services#consultation" className="text-secondary-300 hover:text-primary-400 transition-colors">Consultation</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-400 mr-3 mt-0.5" />
                <span className="text-secondary-300">123 Construction Ave, Building City, BC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary-400 mr-3" />
                <a href="tel:+15551234567" className="text-secondary-300 hover:text-primary-400 transition-colors">(555) 123-4567</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary-400 mr-3" />
                <a href="mailto:info@elitecontractor.com" className="text-secondary-300 hover:text-primary-400 transition-colors">info@elitecontractor.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary-800 text-center md:flex md:justify-between md:items-center">
          <p className="text-secondary-400 text-sm">
            © {currentYear} Elite Contractor. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 text-sm text-secondary-400 space-x-6">
            <Link to="/privacy-policy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-primary-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;