// src/components/ui/ProjectCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  imageUrl?: string;
  altText?: string;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  category,
  imageUrl,
  altText = title,
  delay = 0,
}) => {
  const displayImageUrl = imageUrl || '/images/placeholder-project.webp'; // Adjust path to your actual placeholder

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="overflow-hidden rounded-lg shadow-lg bg-white flex flex-col" // Added flex flex-col
    >
      <Link
        to={`/projects/${id}`}
        className="block group" // Re-added group here if you want subtle hover effects later, or remove if not needed
        title={`View details of ${title} project by Rivera Pro`}
      >
        {/* Image container */}
        {/* --- CHANGE HERE --- */}
        {/* Increased height values significantly */}
        <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden"> {/* Example: Larger heights */}
          <img
            src={displayImageUrl}
            alt={altText}
            // Added subtle zoom on hover (optional, remove group/group-hover if not desired)
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Static Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 md:p-6 lg:p-8"> {/* Adjusted gradient and padding */}
            <div className="text-white">
              <p className="text-base font-medium text-primary-300 mb-1">{category}</p>
              <h3 className="text-xl md:text-2xl font-bold leading-tight">{title}</h3>
              <div className="mt-3 flex items-center text-primary-300 text-base font-medium group-hover:text-primary-200 transition-colors"> {/* Example subtle hover on text */}
                <span>View Project</span>
                <ArrowRight className="ml-1.5 h-5 w-5" /> {/* Slightly larger icon */}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;