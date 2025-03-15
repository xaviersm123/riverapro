import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-16 bg-primary-600 text-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Transform Your Home?
          </motion.h2>
          
          <motion.p 
            className="text-lg text-primary-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Contact Rivera Pro today for a free consultation and quote on your residential remodeling or new construction project.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              to="/quote" 
              className="btn bg-white text-primary-600 hover:bg-primary-50 focus:ring-white"
            >
              Request a Quote
            </Link>
            
            <a 
              href="tel:+14042590577" 
              className="btn border-2 border-white text-white hover:bg-primary-700 focus:ring-white inline-flex items-center justify-center"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span>(404) 259-0577</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;