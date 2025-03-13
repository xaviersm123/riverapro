import React from 'react';
import { motion } from 'framer-motion';

interface ParallaxHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const ParallaxHero: React.FC<ParallaxHeroProps> = ({ title, subtitle, backgroundImage }) => {
  return (
    <section
      className="relative h-96 bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.div
        className="absolute inset-0 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-secondary-200"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default ParallaxHero;