import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
  delay?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  quote, 
  author, 
  role, 
  rating,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col"
    >
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-5 w-5 ${i < rating ? 'text-accent-500 fill-accent-500' : 'text-secondary-300'}`} 
          />
        ))}
      </div>
      <blockquote className="text-secondary-700 italic mb-6 flex-grow">"{quote}"</blockquote>
      <div>
        <p className="font-bold">{author}</p>
        <p className="text-sm text-secondary-500">{role}</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;