import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineMilestoneProps {
  step: number;
  title: string;
  description: string;
  details: string; // Additional details to show when expanded
  isLast?: boolean;
}

const TimelineMilestone: React.FC<TimelineMilestoneProps> = ({ step, title, description, details, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative flex items-center mb-8">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-12 h-full w-1 bg-primary-200 transform -translate-x-1/2" />
      )}

      {/* Milestone Dot */}
      <motion.div
        className="absolute left-6 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center cursor-pointer z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {step}
      </motion.div>

      {/* Milestone Content */}
      <div className="ml-20 w-full">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h3 className="text-xl font-bold mb-2 text-primary-700">{title}</h3>
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
              className="bg-primary-50 p-4 rounded-lg mt-2 ml-4 shadow-inner"
            >
              <p className="text-secondary-700">{details}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TimelineMilestone;