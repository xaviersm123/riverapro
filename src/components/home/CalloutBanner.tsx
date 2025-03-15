import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CalloutBanner: React.FC = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80)' 
        }}
      ></div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0 md:mr-8"> {/* Added md:mr-8 for right margin on md screens */}
              <span className="text-primary-600 font-semibold text-sm">RIVERA PRO REMODELING</span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mt-2 mb-3">
                Elevate Your Atlanta Home with Expert Remodeling
              </h2>
              <p className="text-secondary-700 max-w-2xl text-base md:text-lg">
                Serving Buckhead, Midtown, Sandy Springs, and beyond, Rivera Pro specializes in kitchen, bathroom, 
                and full-home remodeling with unmatched craftsmanship. Get started with a free consultation today.
              </p>
            </div>
            
            <Link 
              to="/contact" 
              className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 transition-colors duration-300 text-white py-3 px-6 rounded-lg font-medium text-lg whitespace-nowrap hover:scale-105"
              aria-label="Get a free quote for your remodeling project"
            >
              Get a Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CalloutBanner;