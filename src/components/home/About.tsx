import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    'Over 20 years of industry experience',
    'Award-winning designs and craftsmanship',
    'Fully licensed and insured professionals',
    'Sustainable building practices',
    'On-time and on-budget completion',
    'Exceptional customer satisfaction'
  ];

  return (
    <section id="about" className="section bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Construction team" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-6 rounded-lg hidden md:block">
              <p className="text-4xl font-bold">20+</p>
              <p className="text-sm">Years of Experience</p>
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Crafting Excellence Since 2005</h2>
            <p className="text-secondary-600 mb-6">
              Elite Contractor is a premier construction company dedicated to delivering exceptional quality and craftsmanship in every project. Our team of skilled professionals brings decades of combined experience to transform your vision into reality.
            </p>
            <p className="text-secondary-600 mb-8">
              We pride ourselves on our attention to detail, commitment to excellence, and ability to deliver projects on time and within budget. Our collaborative approach ensures that your unique needs and preferences are at the center of everything we do.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">{item}</span>
                </div>
              ))}
            </div>
            
            <Link to="/about" className="btn-primary">
              Learn More About Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;