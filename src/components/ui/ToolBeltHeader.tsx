import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Hammer, TreePine } from 'lucide-react';

const ToolBeltHeader: React.FC = () => {
  const tools = [
    { icon: Wrench, color: 'text-blue-600' },
    { icon: Hammer, color: 'text-gray-700' },
    { icon: TreePine, color: 'text-green-600' },
  ];

  return (
    <div className="bg-gray-800 py-4 sticky top-0 z-10 shadow-lg">
      <div className="container-custom flex justify-center items-center space-x-8">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ rotate: 15, scale: 1.2 }}
            className={`p-2 rounded-full bg-white shadow-md ${tool.color}`}
          >
            <tool.icon className="h-6 w-6" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ToolBeltHeader;