import React from 'react';
import { motion } from 'framer-motion';

interface CraftsmanshipGaugeProps {
  value: number; // 0-100
  label: string;
}

const CraftsmanshipGauge: React.FC<CraftsmanshipGaugeProps> = ({ value, label }) => {
  return (
    <div className="mt-6">
      <p className="text-sm font-semibold text-secondary-700 mb-2">{label}</p>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-primary-500 to-primary-700 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>
      <p className="text-right text-sm text-primary-600 mt-1">{value}% Awesome</p>
    </div>
  );
};

export default CraftsmanshipGauge;