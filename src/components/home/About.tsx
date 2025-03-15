import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  const highlights = [
    'Over 20 years of residential remodeling expertise',
    'Specialized craftsmanship in kitchens and bathrooms',
    'Fully licensed and insured professionals',
    'Sustainable materials for lasting quality',
    'Timely completion of every project',
    'Dedicated to customer satisfaction'
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
                src="https://images.pexels.com/photos/5974053/pexels-photo-5974053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Remodeled modern kitchen by Rivera Pro" 
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
              Rivera Pro is a premier residential remodeling company dedicated to transforming homes across Atlanta with exceptional craftsmanship. Our skilled team brings over two decades of experience to every kitchen, bathroom, and full-home remodel.
            </p>
            <p className="text-secondary-600 mb-8">
              We take pride in our meticulous attention to detail, use of high-quality materials, and commitment to completing projects on time and within budget. At Rivera Pro, your vision for a beautifully remodeled home is our priority.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-700">{item}</span>
                </div>
              ))}
            </div>
            
            <Link to="/about" className="btn-primary" aria-label="Learn more about Rivera Pro">
              Learn More About Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;