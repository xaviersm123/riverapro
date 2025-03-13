import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnhancedTimelineStepProps {
  step: number;
  title: string;
  description: string;
  details: string;
  isLast?: boolean;
  reverse?: boolean;
}

const EnhancedTimelineStep: React.FC<EnhancedTimelineStepProps> = ({ step, title, description, details, isLast, reverse }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative flex flex-col md:flex-row items-center mb-12">
      {/* Timeline Line (Animated) */}
      {!isLast && (
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary-200 to-primary-600 hidden md:block"
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ top: '4rem', bottom: '-3rem' }}
        />
      )}

      {/* Left/Right Content */}
      <div
        className={`md:w-1/2 ${reverse ? 'md:pl-12 md:order-2' : 'md:pr-12 md:text-right md:order-1'}`}
      >
        <motion.div
          className="relative bg-white p-6 rounded-lg shadow-lg border-t-4 border-primary-600 cursor-pointer bg-opacity-90 backdrop-blur-sm"
          initial={{ opacity: 0, x: reverse ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)' }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white font-bold mb-4">
            {step}
          </div>
          <h3 className="text-xl font-bold mb-2 text-primary-800">{title}</h3>
          <p className="text-secondary-600">{description}</p>
        </motion.div>

        {/* Expanded Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-primary-50 p-4 rounded-lg mt-2 shadow-inner"
            >
              <p className="text-secondary-700">{details}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Central Milestone Dot */}
      <motion.div
        className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white absolute left-1/2 transform -translate-x-1/2 z-10"
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-4 h-4 rounded-full bg-white" />
      </motion.div>

      {/* Empty Space for Alignment */}
      <div className={`md:w-1/2 ${reverse ? 'md:order-1' : 'md:order-2'}`}></div>
    </div>
  );
};

export default EnhancedTimelineStep;