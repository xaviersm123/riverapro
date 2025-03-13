import React from 'react';
import { motion } from 'framer-motion';

interface CardServiceSectionProps {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  features: string[];
  image: string;
  index: number;
}

const CardServiceSection: React.FC<CardServiceSectionProps> = ({ id, icon: Icon, title, description, features, image, index }) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative group bg-white rounded-2xl shadow-lg overflow-hidden h-80 w-full max-w-sm mx-auto transform hover:shadow-2xl transition-all duration-300"
    >
      {/* Background Image with Radial Gradient */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `radial-gradient(circle at center, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${image})` }}
      />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center text-white z-10">
        {/* Icon with Glowing Effect */}
        <motion.div
          className="p-4 bg-primary-600 rounded-full mb-4"
          whileHover={{ scale: 1.1, rotate: 360, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="h-8 w-8" />
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-2">{title}</h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4">{description}</p>

        {/* Features on Hover */}
        <motion.div
          className="absolute inset-0 bg-primary-700 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <h4 className="text-lg font-semibold mb-3">What We Offer</h4>
          <ul className="space-y-2 text-sm">
            {features.map((feature) => (
              <li key={feature} className="flex items-center">
                <span className="mr-2">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CardServiceSection;