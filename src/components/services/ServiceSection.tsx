import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface ServiceSectionProps {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  features: string[];
  image: string;
  reverse?: boolean;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ id, icon: Icon, title, description, features, image, reverse }) => {
  return (
    <div id={id} className={`py-16 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
        <motion.div
          initial={{ opacity: 0, x: reverse ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="rounded-lg overflow-hidden"
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: reverse ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-lg text-primary-600 mb-4">
            <Icon className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-secondary-600 mb-6">{description}</p>
          
          <h3 className="text-xl font-semibold mb-4">What We Provide:</h3>
          <ul className="space-y-3 mb-6">
            {features.map((feature) => (
              <li key={feature} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-secondary-700">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceSection;
