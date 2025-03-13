import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import CraftsmanshipGauge from '../ui/CraftsmanshipGauge';

interface EnhancedServiceSectionProps {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  features: string[];
  image: string;
  reverse?: boolean;
  tagline?: string;
}

const EnhancedServiceSection: React.FC<EnhancedServiceSectionProps> = ({
  id,
  icon: Icon,
  title,
  description,
  features,
  image,
  reverse,
  tagline,
}) => {
  return (
    <div id={id} className={`py-16 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: reverse ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-lg overflow-hidden shadow-xl group"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white text-center absolute bottom-4 left-0 right-0 font-semibold">
              {tagline}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-lg shadow-xl border-t-4 border-primary-600"
        >
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full text-white mb-6 animate-pulse">
            <Icon className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold mb-4 text-primary-800">{title}</h2>
          <p className="text-secondary-600 mb-6 text-lg">{description}</p>

          <h3 className="text-2xl font-semibold mb-4 text-primary-700">What We Deliver:</h3>
          <ul className="space-y-4 mb-6">
            {features.map((feature) => (
              <motion.li
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex items-start"
              >
                <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0 animate-bounce" />
                <span className="text-secondary-700 text-lg">{feature}</span>
              </motion.li>
            ))}
          </ul>
          <CraftsmanshipGauge value={95} label="Craftsmanship Level" />
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedServiceSection;